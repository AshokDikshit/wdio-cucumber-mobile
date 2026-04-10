Feature: Login Functionality
  As a user of the application
  I want to be able to login with valid and invalid credentials
  So that I can access the secure area or see appropriate error messages

  @login @positive
  Scenario: Successful login with valid credentials
    Given I navigate to "https://the-internet.herokuapp.com/login"
    When I type "tomsmith" into "usernameField" field
    And I type "SuperSecretPassword!" into "passwordField" field
    And I click on "loginButton" button
    Then "Secure Area" heading should be visible
    And "Logout" button should be visible

  @login @negative
  Scenario: Failed login with invalid username
    Given I navigate to "https://the-internet.herokuapp.com/login"
    When I type "foobar" into "usernameField" field
    And I type "barfoo" into "passwordField" field
    And I click on "loginButton" button
    Then "errorMessage" element should be visible
    And "loginButton" button should be visible