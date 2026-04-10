Feature: Customer Registration Flow - New User Account Creation
  As a new customer visiting the retail website
  I want to create an account by providing my personal information
  So that I can make purchases, track orders, and save my preferences

  Background:
    Given I navigate to "https://retailwebsite.com"

  @registration @positive @smoke
  Scenario: AC1 - Access Registration Page
    Given I am on the homepage
    When I click on "Sign Up" button
    Then I should be redirected to the registration page
    And "Create Account" heading should be visible
    And "First Name" field should be visible
    And "Last Name" field should be visible
    And "Email Address" field should be visible
    And "Password" field should be visible
    And "Confirm Password" field should be visible
    And "Mobile Number" field should be visible
    And "Terms & Conditions" checkbox should be visible
    And "Create Account" button should be visible

  @registration @positive @smoke
  Scenario: AC2 - Successful Registration with Mandatory Fields
    Given I am on the registration page
    When I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.smith.{timestamp}@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I check "Terms & Conditions" checkbox
    And I click on "Create Account" button
    Then "Account created successfully" element should be visible
    And I should be redirected to the email verification page
    And "Email Verification" heading should be visible
    And "Please check your email" element should be visible

  @registration @negative @validation
  Scenario Outline: AC3 - Email Format Validation
    Given I am on the registration page
    When I type "<invalid_email>" into "Email Address" field
    And I click on "Last Name" field
    Then "Email Address" field should show validation error "Please enter a valid email address"
    And "Email Address" field should have class "error-highlight"

    Examples:
      | invalid_email |
      | test@         |
      | test.com      |
      | @test.com     |
      | test@domain   |

  @registration @validation @password
  Scenario Outline: AC4 - Password Strength Validation
    Given I am on the registration page
    When I type "<password>" into "Password" field
    Then "Password Strength Indicator" element should contain text "<strength_level>"

    Examples:
      | password           | strength_level |
      | 123456            | Weak           |
      | Test1234          | Medium         |
      | Test@1234Strong   | Strong         |

  @registration @validation @password
  Scenario: AC4 - Password Requirements Validation
    Given I am on the registration page
    When I type "weak" into "Password" field
    And I click on "Confirm Password" field
    Then "Password" field should show validation error "Password must be at least 8 characters with uppercase, lowercase, number, and special character"

  @registration @negative @validation
  Scenario: AC5 - Password Match Validation
    Given I am on the registration page
    When I type "Test@1234" into "Password" field
    And I type "Test@5678" into "Confirm Password" field
    And I click on "First Name" field
    Then "Confirm Password" field should show validation error "Passwords do not match"
    And "Create Account" button should be disabled

  @registration @negative @validation
  Scenario: AC6 - Duplicate Email Validation
    Given I am on the registration page
    When I type "existing.user@testemail.com" into "Email Address" field
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I check "Terms & Conditions" checkbox
    And I click on "Create Account" button
    Then "This email is already registered. Please login or use a different email" element should be visible
    And "Login" link should be visible

  @registration @validation @mobile
  Scenario Outline: AC7 - Mobile Number Validation
    Given I am on the registration page
    When I type "<mobile_number>" into "Mobile Number" field
    And I click on "First Name" field
    Then "Mobile Number" field should show validation error "<error_message>"

    Examples:
      | mobile_number    | error_message                        |
      | 12345           | Please enter a valid mobile number   |
      | abcdefghij      | Please enter a valid mobile number   |
      | +1 1234567890   | Please enter a valid mobile number   |

  @registration @validation @mobile
  Scenario: AC7 - Valid UK Mobile Number Formats
    Given I am on the registration page
    When I type "+44 7912345678" into "Mobile Number" field
    And I click on "First Name" field
    Then "Mobile Number" field should not show any validation error
    When I clear "Mobile Number" field
    And I type "07912345678" into "Mobile Number" field
    And I click on "First Name" field
    Then "Mobile Number" field should not show any validation error

  @registration @negative @validation
  Scenario Outline: AC8 - Mandatory Field Validation
    Given I am on the registration page
    When I click on "Create Account" button
    Then "<field_name>" field should show validation error "<error_message>"

    Examples:
      | field_name       | error_message              |
      | First Name       | First name is required     |
      | Last Name        | Last name is required      |
      | Email Address    | Email is required          |
      | Password         | Password is required       |
      | Mobile Number    | Mobile number is required  |

  @registration @negative @validation
  Scenario: AC9 - Terms & Conditions Validation
    Given I am on the registration page
    When I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.smith@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I click on "Create Account" button
    Then "You must accept the Terms & Conditions to proceed" element should be visible
    And the form should be invalid

  @registration @positive @optional
  Scenario: AC10 - Optional Newsletter Subscription
    Given I am on the registration page
    When I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.smith.newsletter@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I check "Terms & Conditions" checkbox
    And I check "Subscribe to newsletter" checkbox
    And I click on "Create Account" button
    Then "Account created successfully" element should be visible
    And I should be redirected to the email verification page

  @registration @positive @email
  Scenario: AC11 - Email Verification Link
    Given I have successfully registered with email "john.verification@testemail.com"
    When I check my email inbox
    Then I should receive a verification email within 2 minutes
    And the email should contain "Welcome John" text
    And the email should contain "Verify Email" button
    And the email should contain "valid for 24 hours" text
    When I click the "Verify Email" link in email
    Then I should be redirected to login page
    And "Email verified successfully. Please login." element should be visible

  @registration @navigation
  Scenario: AC12 - Already Have Account Link
    Given I am on the registration page
    When I click on "Already have an account? Login" link
    Then I should be redirected to the login page
    And "Login" heading should be visible
    And "Email" field should be visible
    And "Password" field should be visible

  @registration @negative @validation
  Scenario Outline: AC13 - Special Characters in Name Fields
    Given I am on the registration page
    When I type "<invalid_name>" into "<field_name>" field
    And I click on "Email Address" field
    Then "<field_name>" field should show validation error "Only letters, hyphens, and apostrophes are allowed"

    Examples:
      | field_name | invalid_name |
      | First Name | John123      |
      | First Name | John@Smith   |
      | First Name | John#        |
      | Last Name  | Smith123     |
      | Last Name  | Smith@       |
      | Last Name  | Smith$       |

  @registration @positive @validation
  Scenario: AC13 - Valid Special Characters in Name Fields
    Given I am on the registration page
    When I type "Mary-Jane" into "First Name" field
    And I type "O'Connor" into "Last Name" field
    And I click on "Email Address" field
    Then "First Name" field should not show any validation error
    And "Last Name" field should not show any validation error

  @registration @positive @session
  Scenario: AC14 - Session Timeout on Registration Page
    Given I am on the registration page
    When I wait 900 seconds
    And I type "John" into "First Name" field
    And I type "Smith" into "Last Name" field
    And I type "john.timeout@testemail.com" into "Email Address" field
    And I type "Test@1234" into "Password" field
    And I type "Test@1234" into "Confirm Password" field
    And I type "+44 7912345678" into "Mobile Number" field
    And I check "Terms & Conditions" checkbox
    And I click on "Create Account" button
    Then "Account created successfully" element should be visible
    And no session timeout error should be displayed

  @registration @positive @social @optional
  Scenario: AC15 - Social Media Registration with Google
    Given I am on the registration page
    When I click on "Sign up with Google" button
    Then I should be redirected to Google OAuth provider
    And "Sign in with Google" heading should be visible
    When I complete Google OAuth authorization
    Then my account should be created automatically
    And I should be redirected to the dashboard
    And "Welcome to Dashboard" element should be visible

  @registration @positive @social @optional
  Scenario: AC15 - Social Media Registration with Facebook
    Given I am on the registration page
    When I click on "Sign up with Facebook" button
    Then I should be redirected to Facebook OAuth provider
    And "Continue with Facebook" heading should be visible
    When I complete Facebook OAuth authorization
    Then my account should be created automatically
    And I should be redirected to the dashboard
    And "Welcome to Dashboard" element should be visible