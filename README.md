# WebDriverIO Cucumber Mobile Automation Framework

A comprehensive test automation framework built with WebDriverIO and Cucumber for mobile and web application testing. This framework follows text-based locator strategy for better traceability between UI and automation code.

## 📋 Table of Contents

- [Framework Overview](#framework-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Locator Strategy](#locator-strategy)
- [Step Definitions](#step-definitions)
- [Feature Files](#feature-files)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Best Practices](#best-practices)

## 🔍 Framework Overview

This automation framework is designed with the following principles:

- **Text-based locators**: Prioritize element identification using visible text, placeholders, and labels
- **Modular step definitions**: Reusable step definitions organized by functionality
- **Dynamic locator management**: Intelligent fallback from text-based to custom locators
- **Cross-platform support**: Works with both mobile and web applications
- **BDD approach**: Behavior-driven development using Gherkin syntax

## 📁 Project Structure

```
wdio-cucumber-mobile/
├── tests/
│   ├── features/                    # Gherkin feature files
│   │   ├── login.feature
│   │   ├── registration-flow.feature
│   │   └── saucedemo-smoke.feature
│   ├── step-definitions/            # Step definition files
│   │   ├── ui-actions.steps.ts      # Action steps (Given/When)
│   │   ├── ui-assertions.steps.ts   # Assertion steps (Then)
│   │   └── registration.steps.ts    # Custom registration steps
│   ├── locators/                    # Locator configuration files
│   │   ├── web/
│   │   │   └── locator.yaml         # Web locators
│   │   └── native/
│   │       └── locator.yaml         # Mobile native locators
│   ├── support/                     # Support utilities
│   │   ├── uiActions.ts             # UI action utilities
│   │   ├── uiAssertions.ts          # UI assertion utilities
│   │   ├── locatorManager.ts        # Locator management
│   │   └── commonUtils.ts           # Common utilities
│   └── test-stories/                # Test scenarios and acceptance criteria
├── wdio.conf.ts                     # WebDriverIO configuration
├── generate-cucumber-report.js      # Report generation script
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Android SDK (for mobile testing)
- Appium server

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wdio-cucumber-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start Appium server:
```bash
appium
```

4. Run tests:
```bash
npm run wdio
```

## 🎯 Locator Strategy

The framework uses a hierarchical locator strategy for better maintainability and readability:

### 1. Text-Based Locators (Primary)

Elements are identified using their visible text, placeholders, or labels:

```gherkin
# Examples of text-based identification
When I click on "Login" button
When I type "john@example.com" into "Email" field
Then "Welcome" element should be visible
```

### 2. Custom Locators (Fallback)

When text-based identification isn't possible, custom locators are stored in YAML files:

```yaml
# tests/locators/web/locator.yaml
common:
  menuButton: "//button[@id='react-burger-menu-btn']"
  inventoryContainer: "//div[@id='inventory_container']"
  shoppingCartBadge: "//span[@class='shopping_cart_badge']"
  passwordStrengthIndicator: "//div[@class='password-strength-indicator']"
```

### 3. Locator Manager Logic

The `locatorManager.ts` handles dynamic locator resolution:

```typescript
// Priority order:
// 1. Check for saved locator in YAML
// 2. Create text-based locator
// 3. Apply element type-specific logic

const selector = await locatorManager.getSelector("Login", "button");
```

#### Element Type Mapping:

- **Button**: `//button[contains(text(),'Login')] | //*[@role='button'][contains(text(),'Login')]`
- **Input Field**: `//input[@type='text' and contains(@placeholder,'Email')]`
- **Link**: `//a[contains(text(),'Sign Up')] | //*[@role='link'][contains(text(),'Sign Up')]`
- **Generic**: `//*[contains(text(),'Welcome')]`

## 📝 Step Definitions

Step definitions are organized into logical groups:

### UI Actions (`ui-actions.steps.ts`)

Handles user interactions:

```typescript
// Click actions
When(/^I click on "([^"]*)" (button|link|element)$/, async (elementName, elementType) => {
    await uiActions.clickOn(elementName, elementType);
});

// Text input
When(/^I (type|enter) "([^"]*)" into "([^"]*)" (field|input|textbox)$/, 
    async (action, text, elementName, elementType) => {
    await uiActions.typeText(text, elementName, elementType);
});

// Navigation
Given(/^I navigate to "([^"]*)"$/, async (url) => {
    await uiActions.navigateTo(url);
});
```

### UI Assertions (`ui-assertions.steps.ts`)

Handles verifications:

```typescript
// Visibility checks
Then(/^"([^"]*)" element should be visible$/, async (elementName) => {
    await uiAssertions.shouldBeVisible(elementName);
});

// Text content verification
Then(/^"([^"]*)" element should contain text "([^"]*)")$/, 
    async (elementName, expectedText) => {
    await uiAssertions.shouldContainText(elementName, expectedText);
});
```

### Custom Step Definitions

Create new step definition files for specific features:

```typescript
// tests/step-definitions/registration.steps.ts
import { Given, When, Then } from '@wdio/cucumber-framework';

When(/^I fill registration form with valid data$/, async () => {
    // Custom registration logic
});
```

## 📋 Feature Files

Feature files follow Gherkin syntax with text-based element identification:

```gherkin
Feature: User Registration
  As a new user
  I want to register an account
  So that I can access the application

  @smoke @positive
  Scenario: Successful user registration
    Given I navigate to "https://example.com/register"
    When I type "John Doe" into "Full Name" field
    And I type "john@example.com" into "Email" field
    And I type "SecurePass123!" into "Password" field
    And I type "SecurePass123!" into "Confirm Password" field
    And I click on "Register" button
    Then "Welcome" element should be visible
    And "Registration successful" element should be visible

  @negative
  Scenario: Registration with invalid email
    Given I navigate to "https://example.com/register"
    When I type "John Doe" into "Full Name" field
    And I type "invalid-email" into "Email" field
    And I click on "Register" button
    Then "Please enter a valid email" element should be visible
```

### Feature File Guidelines:

1. **Use descriptive scenario names**
2. **Apply appropriate tags** (`@smoke`, `@positive`, `@negative`)
3. **Prioritize text-based element identification**
4. **Keep scenarios focused and atomic**
5. **Use Background for common setup steps**

## 🏃‍♂️ Running Tests

### Basic Commands

```bash
# Run all tests
npm run wdio

# Run specific feature
npm run wdio -- --spec=tests/features/login.feature

# Run tests with specific tags
npm run wdio -- --cucumberOpts.tagExpression='@smoke'

# Generate test report
npm run report
```

### Configuration

Update `wdio.conf.ts` for different environments:

```typescript
// Mobile configuration
capabilities: [{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Pixel 9 API 35',
    'appium:platformVersion': '15.0',
    'appium:automationName': 'UiAutomator2'
}]

// Specify test files
specs: [
    './tests/features/**/login.feature'
]
```

## 📊 Reporting

The framework generates comprehensive HTML reports:

```bash
# Generate Cucumber HTML report
node generate-cucumber-report.js
```

Reports include:
- Test execution summary
- Step-by-step results
- Screenshots for failures
- Execution timeline
- Feature and scenario statistics

## ✅ Best Practices

### 1. Locator Strategy

**DO:**
- Use visible text for element identification
- Add custom locators only when text-based approach fails
- Group related locators in YAML categories
- Use descriptive locator names

**DON'T:**
- Hardcode locators in step definitions
- Use complex XPath expressions unnecessarily
- Modify existing step definition files

### 2. Step Definitions

**DO:**
- Reuse existing step definitions
- Create new files for missing functionality
- Use clear, descriptive step patterns
- Handle waits and timeouts appropriately

**DON'T:**
- Duplicate existing step definitions
- Create overly specific steps
- Mix actions and assertions in single steps

### 3. Feature Files

**DO:**
- Write clear, business-readable scenarios
- Use appropriate Gherkin keywords
- Apply meaningful tags for test organization
- Keep scenarios independent

**DON'T:**
- Create dependencies between scenarios
- Use technical implementation details
- Write overly long scenarios

### 4. Maintenance

**DO:**
- Regularly review and update locators
- Maintain consistent naming conventions
- Document custom implementations
- Keep test data separate from test logic

**DON'T:**
- Ignore failing tests
- Let technical debt accumulate
- Skip code reviews for test changes

## 🔧 Adding New Locators

When text-based identification isn't possible:

1. **Identify the element** that can't be found by text
2. **Add to locator.yaml**:
   ```yaml
   common:
     newElementName: "//xpath/or/css/selector"
   ```
3. **Use in feature file**:
   ```gherkin
   When I click on "newElementName" element
   ```
4. **Test the locator** to ensure it works reliably

## 🆘 Troubleshooting

### Common Issues:

1. **Element not found**:
   - Verify element text/locator
   - Check if element is visible
   - Add appropriate waits

2. **Step definition not found**:
   - Check step pattern syntax
   - Verify file is in step-definitions folder
   - Ensure proper imports

3. **Locator not working**:
   - Test locator in browser dev tools
   - Check for dynamic content
   - Consider adding to locator.yaml

### Debug Tips:

- Enable detailed logging in `wdio.conf.ts`
- Use browser pause for debugging: `await browser.pause(5000)`
- Take screenshots: `await browser.saveScreenshot('./debug.png')`
- Check element properties: `await element.getAttribute('class')`

---

## 📞 Support

For questions or issues:
1. Check existing documentation
2. Review similar implementations in the codebase
3. Consult the team's testing guidelines
4. Create detailed bug reports with steps to reproduce

---

*This framework is designed to make test automation accessible, maintainable, and reliable. Happy testing! 🚀*
