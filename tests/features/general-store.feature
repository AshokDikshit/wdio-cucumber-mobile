Feature: General Store Mobile App E2E Testing
  As a user of the General Store mobile application
  I want to perform shopping operations
  So that I can verify the core functionality works correctly

  @sanity @smoke
  Scenario: Basic sanity test - App launch and navigation
    When I wait for "General Store" element to be visible
    Then "Let's Shop" button should be visible
    And "General Store" element should be visible
    And "Enter name here" element should be visible
    And "Male" radio button should be visible
    And "Female" radio button should be visible
    When I type "Ashok Dikshit" into "Enter name here" field
    When I click on "Let's Shop" button
