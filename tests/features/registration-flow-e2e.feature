Feature: Customer Registration Flow - E2E Tests
  As a new customer visiting the retail website
  I want to create an account by providing my personal information
  So that I can make purchases, track orders, and save my preferences

  Background:
    Given I navigate to the homepage

  @e2e @positive @registration
  Scenario: Successful complete registration flow with email verification
    When I click on "Sign Up" button
    Then I should be on the registration page
    And "Registration Form" element should be visible
    When I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.smith.test@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I check "Accept Terms & Conditions" checkbox
    And I click on "Create Account" button
    Then "Account created successfully" message should be visible
    And I should be redirected to email verification page
    And I should receive verification email within 2 minutes
    When I click verification link in email
    Then I should be redirected to login page
    And "Email verified successfully. Please login." message should be visible

  @e2e @positive @navigation
  Scenario: Navigate to registration page from homepage
    When I click on "Register" button
    Then I should be on the registration page
    And "Registration Form" element should be visible
    And "First Name" field should be auto-focused
    And all mandatory fields should be visible

  @e2e @negative @validation
  Scenario: Registration attempt with duplicate email
    When I click on "Sign Up" button
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "existing.user@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I check "Accept Terms & Conditions" checkbox
    And I click on "Create Account" button
    Then "This email is already registered. Please login or use a different email" error message should be visible
    And "Login" link should be visible in error message

  @e2e @negative @validation
  Scenario: Registration form submission with missing mandatory fields
    When I click on "Sign Up" button
    And I click on "Create Account" button
    Then "First name is required" error message should be visible
    And "Last name is required" error message should be visible
    And "Email is required" error message should be visible
    And "Password is required" error message should be visible
    And "Mobile number is required" error message should be visible
    And the form should not submit

  @e2e @negative @validation
  Scenario: Password mismatch validation during registration
    When I click on "Sign Up" button
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.smith@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "DifferentPassword@123" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    Then "Passwords do not match" error message should be visible
    And "Create Account" button should be disabled

  @e2e @negative @validation
  Scenario: Registration without accepting terms and conditions
    When I click on "Sign Up" button
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.smith@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I click on "Create Account" button
    Then "You must accept the Terms & Conditions to proceed" error message should be visible
    And the form should not submit

  @e2e @validation @email
  Scenario Outline: Email format validation during registration
    When I click on "Sign Up" button
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "<invalid_email>" into "Email Address" field
    And I click on "Password" field
    Then "Please enter a valid email address" error message should be visible
    And "Email Address" field should be highlighted in red

    Examples:
      | invalid_email |
      | test@         |
      | @test.com     |
      | test.com      |
      | test@domain   |

  @e2e @validation @mobile
  Scenario Outline: Mobile number validation during registration
    When I click on "Sign Up" button
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.smith@testemail.com" into "Email Address" field
    And I type "<invalid_mobile>" into "Mobile Number" field
    And I click on "Password" field
    Then "Please enter a valid mobile number" error message should be visible

    Examples:
      | invalid_mobile |
      | 12345         |
      | abcdefghij    |
      | +1 1234567890 |

  @e2e @validation @names
  Scenario Outline: Special characters validation in name fields
    When I click on "Sign Up" button
    And I type "<invalid_name>" into "First Name" field
    And I click on "Last Name" field
    Then "Only letters, hyphens, and apostrophes are allowed" error message should be visible

    Examples:
      | invalid_name |
      | John123      |
      | John@Smith   |
      | John#Test    |

  @e2e @navigation
  Scenario: Navigate to login page from registration page
    When I click on "Sign Up" button
    Then I should be on the registration page
    When I click on "Already have an account? Login" link
    Then I should be redirected to login page

  @e2e @optional @newsletter
  Scenario: Registration with newsletter subscription
    When I click on "Sign Up" button
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.newsletter@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I check "Subscribe to newsletter" checkbox
    And I check "Accept Terms & Conditions" checkbox
    And I click on "Create Account" button
    Then "Account created successfully" message should be visible
    And email should be added to newsletter subscription list

  @e2e @social @optional
  Scenario: Registration using Google OAuth
    When I click on "Sign Up" button
    And I click on "Sign up with Google" button
    Then I should be redirected to Google OAuth provider
    When I authorize with Google account
    Then my account should be created automatically
    And I should be redirected to dashboard

  @e2e @session
  Scenario: Registration form behavior during extended session
    When I click on "Sign Up" button
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I wait for 16 minutes
    And I type "john.session@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I check "Accept Terms & Conditions" checkbox
    And I click on "Create Account" button
    Then "Account created successfully" message should be visible
    And no session timeout error should occur