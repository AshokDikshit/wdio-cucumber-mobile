Feature: General Store Mobile App E2E Testing
  As a user of the General Store mobile application
  I want to perform shopping operations
  So that I can verify the core functionality works correctly

  @sanity @smoke
  Scenario: Basic sanity test - App launch and navigation
    Given I wait for "Let's Shop" button to be visible
    Then "Let's Shop" button should be visible
    And "General Store" element should be visible
    And I type "Test User" into "nameField" field
    When I click on "Let's Shop" button
    Then "countrySpinner" element should be visible
    And "nameField" element should be visible
    And "genderRadioGroup" element should be visible

  # @positive @e2e
  # Scenario: Complete purchase flow with valid user details
  #   Given I wait for "Let's Shop" button to be visible
  #   When I click on "Let's Shop" button
  #   And I click on "countrySpinner" element
  #   And I click on "Argentina" element
  #   And I type "John Doe" into "nameField" field
  #   And I click on "maleRadio" element
  #   And I click on "Let's Shop" button
  #   Then "productList" element should be visible
  #   When I click on "addToCartFirstProduct" element
  #   And I click on "cartIcon" element
  #   Then "productInCart" element should be visible
  #   When I click on "termsCheckbox" element
  #   And I click on "Visit to the website to complete purchase" button
  #   Then "General Store" element should be visible

  # @positive @cart
  # Scenario: Add multiple products to cart and verify total
  #   Given I wait for "Let's Shop" button to be visible
  #   When I click on "Let's Shop" button
  #   And I click on "countrySpinner" element
  #   And I click on "Argentina" element
  #   And I type "Jane Smith" into "nameField" field
  #   And I click on "femaleRadio" element
  #   And I click on "Let's Shop" button
  #   Then "productList" element should be visible
  #   When I click on "addToCartFirstProduct" element
  #   And I click on "addToCartSecondProduct" element
  #   And I click on "cartIcon" element
  #   Then "productInCart" element should be visible
  #   And "cartTotal" element should be visible
  #   And "cartTotal" element should contain text "$"

  # @negative @validation
  # Scenario: Attempt to proceed without entering required name field
  #   Given I wait for "Let's Shop" button to be visible
  #   When I click on "Let's Shop" button
  #   And I click on "countrySpinner" element
  #   And I click on "Argentina" element
  #   And I click on "maleRadio" element
  #   And I click on "Let's Shop" button
  #   Then "Please enter your name" element should be visible