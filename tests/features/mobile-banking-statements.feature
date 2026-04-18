Feature: Manage Banking Statements Screen
  As a bank customer
  I want to view and manage my account statements in one place
  So that I can track my transactions, download records, and maintain financial visibility

  Background:
    Given I navigate to the Manage Statements screen
    And I wait for "Manage Statements" heading to be visible

  @positive @statements
  Scenario: View available statements by month/year
    When the screen loads
    Then "Statement List" section should be visible
    And "Statement Item" element should be visible
    And there should be at least 1 "Statement Item" elements

  @positive @filter
  Scenario: Filter statements by date range
    Given I am on the Manage Statements screen
    When I click on "Start Date" field
    And I select "01/01/2024" from date picker
    And I click on "End Date" field
    And I select "31/03/2024" from date picker
    And I click on "Apply Filter" button
    Then "Filtered Statement List" section should be visible
    And "Statement Item" element should be visible
    And "Date Range Applied" element should contain text "01/01/2024 - 31/03/2024"

  @positive @download
  Scenario: Download statement in PDF format
    Given I am on the Manage Statements screen
    And "Statement Item" element should be visible
    When I click on first "Statement Item" element
    And I click on "Download" button
    And I select "PDF" from "Format" dropdown
    And I click on "Confirm Download" button
    Then "Download Success" element should be visible
    And "Download Success" element should contain text "Statement downloaded successfully"

  @positive @download
  Scenario: Download statement in CSV format
    Given I am on the Manage Statements screen
    And "Statement Item" element should be visible
    When I click on first "Statement Item" element
    And I click on "Download" button
    And I select "CSV" from "Format" dropdown
    And I click on "Confirm Download" button
    Then "Download Success" element should be visible
    And "Download Success" element should contain text "Statement downloaded successfully"

  @positive @email
  Scenario: Send statement via email
    Given I am on the Manage Statements screen
    And "Statement Item" element should be visible
    When I click on first "Statement Item" element
    And I click on "Send via Email" button
    And I wait for "Email Confirmation" element to be visible
    And I click on "Confirm Send" button
    Then "Email Success" element should be visible
    And "Email Success" element should contain text "Statement sent to registered email address"

  @negative @nodata
  Scenario: No statements available for selected period
    Given I am on the Manage Statements screen
    When I click on "Start Date" field
    And I select "01/01/2020" from date picker
    And I click on "End Date" field
    And I select "31/01/2020" from date picker
    And I click on "Apply Filter" button
    Then "No Data Message" element should be visible
    And "No Data Message" element should contain text "No statements available"
    And "Statement List" section should not be visible

  @business-rules @access
  Scenario: User can only access their own account statements
    Given I am on the Manage Statements screen
    When the screen loads
    Then "Statement List" section should be visible
    And "User Account Info" element should contain text "Your Account Statements"
    And "Statement Item" element should be visible

  @business-rules @history-limit
  Scenario: Statement history limited to 7 years
    Given I am on the Manage Statements screen
    When I click on "Start Date" field
    Then "Date Picker" element should be visible
    And "Earliest Date" element should contain text "7 years ago"

  @business-rules @default-view
  Scenario: Default view shows last 3 months of statements
    Given I navigate to the Manage Statements screen
    When the screen loads
    Then "Statement List" section should be visible
    And "Default Period" element should contain text "Last 3 months"
    And "Statement Item" element should be visible