Feature: General Store Shopping Application

  Scenario: Complete shopping flow with user details
    Given I have installed and launched the General Store app
    When I select country as "India"
    And I enter name as "Ashok Dikshit"
    And I select gender as "Male"
    And I tap on "Let's Shop" button
    Then I should be navigated to the shopping page
    And I should see product listings