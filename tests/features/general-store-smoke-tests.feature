Feature: General Store Mobile App - Smoke Tests
  As a user of the General Store mobile application
  I want to perform basic shopping operations
  So that I can verify the core functionality works correctly on mobile devices

  Background:
    # Given the General Store app is launched

  @smoke @critical @app-launch
  Scenario: App Launch and Initial UI Validation
    Then "General Store" element should be visible
    And "Let's Shop" button should be visible
    And "Enter name here" field should be visible
    And "Male" radio button should be visible
    And "Female" radio button should be visible
    And "countrySpinner" element should be visible

  @smoke @critical @user-registration
  Scenario: User Registration Flow with Valid Data
    When I type "John Doe" into "Enter name here" field
    And I click on "Male" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    Then "productList" element should be visible
    And "ADD TO CART" button should be visible

  @smoke @high @validation
  Scenario: User Registration Validation - Empty Name
    When I click on "Male" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    Then "Please enter your name" element should be visible

  @smoke @critical @product-catalog
  Scenario: Product Catalog Display and Navigation
    When I type "Jane Smith" into "Enter name here" field
    And I click on "Female" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    Then "productList" element should be visible
    And "ADD TO CART" button should be visible
    And "cartIcon" element should be visible

  @smoke @critical @add-to-cart
  Scenario: Add Single Product to Cart
    When I type "Mike Johnson" into "Enter name here" field
    And I click on "Male" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    And I wait for "productList" element to be visible
    When I click on "addToCartFirstProduct" element
    And I click on "cartIcon" element
    Then "productInCart" element should be visible
    And "cartTotal" element should be visible

  @smoke @high @multiple-products
  Scenario: Add Multiple Products to Cart
    When I type "Sarah Wilson" into "Enter name here" field
    And I click on "Female" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    And I wait for "productList" element to be visible
    When I click on "addToCartFirstProduct" element
    And I click on "addToCartSecondProduct" element
    And I click on "cartIcon" element
    Then "productInCart" element should be visible
    And "cartTotal" element should be visible

  @smoke @high @cart-management
  Scenario: Cart Total Calculation Verification
    When I type "David Brown" into "Enter name here" field
    And I click on "Male" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    And I wait for "productList" element to be visible
    When I click on "addToCartFirstProduct" element
    And I click on "addToCartSecondProduct" element
    And I click on "cartIcon" element
    Then "productInCart" element should be visible
    And "cartTotal" element should be visible
    And "cartTotal" element should contain text "$"

  @smoke @medium @terms-conditions
  Scenario: Terms and Conditions Checkbox Functionality
    When I type "Lisa Davis" into "Enter name here" field
    And I click on "Female" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    And I wait for "productList" element to be visible
    When I click on "addToCartFirstProduct" element
    And I click on "cartIcon" element
    Then "termsCheckbox" element should be visible
    When I click on "termsCheckbox" element
    Then "termsCheckbox" element should be checked

  @smoke @critical @e2e-flow
  Scenario: End-to-End Shopping Flow
    When I type "Robert Taylor" into "Enter name here" field
    And I click on "Male" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    And I wait for "productList" element to be visible
    When I click on "addToCartFirstProduct" element
    And I click on "addToCartSecondProduct" element
    And I click on "cartIcon" element
    Then "productInCart" element should be visible
    And "cartTotal" element should be visible
    When I click on "termsCheckbox" element
    Then "termsCheckbox" element should be checked
    # And the shopping flow should be completed successfully

  @smoke @medium @navigation
  Scenario: Navigation and Back Button Functionality
    When I type "Emma Anderson" into "Enter name here" field
    And I click on "Female" radio button
    And I click on "countrySpinner" element
    And I click on "Argentina" element
    And I click on "Let's Shop" button
    And I wait for "productList" element to be visible
    When I go back
    Then "Enter name here" field should be visible
    # And "Emma Anderson" should be visible in "Enter name here" field
    # When I click on "Let's Shop" button
    # Then "productList" element should be visible