Feature: SauceDemo Smoke Tests
  As a user of SauceDemo website
  I want to perform basic operations
  So that I can verify the core functionality works correctly

  @smoke @positive
  Scenario: Successful login and logout
    Given I navigate to "https://www.saucedemo.com/"
    When I type "standard_user" into "username" field
    And I type "secret_sauce" into "password" field
    And I click on "Login" button
    Then "Products" should be visible
    And "inventoryContainer" should be visible
    When I click on "menuButton" element
    And I click on "Logout" link
    Then "loginButton" should be visible

  @smoke @positive
  Scenario: Add product to cart and verify
    Given I navigate to "https://www.saucedemo.com/"
    When I type "standard_user" into "username" field
    And I type "secret_sauce" into "password" field
    And I click on "Login" button
    Then "Products" should be visible
    When I click on "addToCartBackpack" button
    Then "shoppingCartBadge" should be visible
    And "shoppingCartBadge" should contain text "1"
    When I click on "shoppingCartLink" element
    Then "cartContents" should be visible
    And "Sauce Labs Backpack" should be visible