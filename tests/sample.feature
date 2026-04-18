Feature: SauceDemo Smoke Tests
  As a user of SauceDemo website
  I want to perform basic operations
  So that I can verify the core functionality works correctly

  @smoke @positive
  Scenario: Successful login and logout
    Given I navigate to "https://www.saucedemo.com/"
    When I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    Then "Products" element should be visible
    And "inventoryContainer" element should be visible
    When I click on "menuButton" element
    And I click on "Logout" link
    Then "Login" button should be visible

  @smoke @positive
  Scenario: Add product to cart and verify
    Given I navigate to "https://www.saucedemo.com/"
    When I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    Then "Products" element should be visible
    When I click on "addToCartBackpack" button
    Then "shoppingCartBadge" element should be visible
    And "shoppingCartBadge" element should contain text "1"
    When I click on "shoppingCartLink" element
    Then "cartContents" element should be visible
    And "Sauce Labs Backpack" element should be visible