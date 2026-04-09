Feature: User Login
  As a registered user
  I want to log into my account
  So that I can access my banking services

  Background:
    When I navigate to "login-page"
    And I wait for page to load

  Scenario: Successful login with valid credentials
    When I type "validuser@example.com" into "username" field
    And I type "validpassword123" into "password" field
    And I click on "Login" button
    Then the current URL should contain "dashboard"
    Then "dashboard" should be visible
    And "userHeader" should contain text "Welcome"

  Scenario: Error message for invalid credentials
    When I type "invaliduser@example.com" into "username" field
    And I type "wrongpassword" into "password" field
    And I click on "Login" button
    Then "errorMessage" should contain text "Invalid credentials"
    And the current URL should contain "login"
    And "password" field should be empty

  Scenario: Mandatory field validation
    When I click on "Login" button
    Then "usernameValidation" should show validation error "Username is required"
    And "passwordValidation" should show validation error "Password is required"
    And the form should be invalid