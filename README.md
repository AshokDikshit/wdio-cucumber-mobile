# WebDriverIO Cucumber Mobile Automation Framework

A comprehensive test automation framework built with WebDriverIO and Cucumber for mobile and web application testing. This framework follows text-based locator strategy for better traceability between UI and automation code.

## 📋 Table of Contents

- [Framework Overview](#framework-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Locator Strategy](#locator-strategy)
- [Step Definitions](#step-definitions)
- [Feature Files](#feature-files)
- [Test Stories](#test-stories)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Best Practices](#best-practices)
- [Mobile Testing](#mobile-testing)

## 🔍 Framework Overview

This automation framework is designed with the following principles:

- **Text-based locators**: Prioritize element identification using visible text, placeholders, and labels
- **Modular step definitions**: Reusable step definitions organized by functionality (built-in and custom)
- **Dynamic locator management**: Intelligent fallback from text-based to custom locators
- **Cross-platform support**: Works with both mobile native, mobile web, and desktop web applications
- **BDD approach**: Behavior-driven development using Gherkin syntax
- **Multi-environment support**: Separate configurations for different testing environments

## 📁 Project Structure

```
wdio-bdd-mobile-test/
├── app/                             # Mobile applications for testing
│   ├── android/
│   │   └── General-Store.apk        # Android test application
│   └── ios/                         # iOS applications directory
├── tests/
│   ├── features/                    # Gherkin feature files
│   │   ├── mobile-banking-statements.feature
│   │   ├── registration-flow.feature
│   │   ├── registration-flow-e2e.feature
│   │   └── saucedemo-smoke.feature
│   ├── step-definitions/            # Step definition files
│   │   ├── built-in/                # Framework built-in step definitions
│   │   │   ├── ui-actions.steps.ts  # Action steps (Given/When)
│   │   │   └── ui-assertions.steps.ts # Assertion steps (Then)
│   │   └── custom/                  # Project-specific step definitions
│   │       └── registration.steps.ts # Custom registration steps
│   ├── locators/                    # Locator configuration files
│   │   ├── web/
│   │   │   ├── sample-locator.yaml  # Web locators sample
│   │   │   └── saucedemo-locators.yaml # SauceDemo specific locators
│   │   └── native/
│   │       ├── sample-locator.yaml  # Mobile native locators sample
│   │       └── mobile-banking-statements.yaml # Mobile banking locators
│   ├── support/                     # Support utilities
│   │   ├── uiActions.ts             # UI action utilities
│   │   ├── uiAssertions.ts          # UI assertion utilities
│   │   ├── locatorManager.ts        # Locator management
│   │   ├── commonUtils.ts           # Common utilities
│   │   └── generate-cucumber-report.js # Report generation script
│   ├── test-stories/                # Test scenarios and acceptance criteria
│   │   ├── mobile-banking-screen.txt
│   │   ├── registration-flow.txt
│   │   ├── registration-flow-output.txt
│   │   └── user-login.txt
│   └── sample.feature               # Sample feature file for reference
├── backup/                          # Backup files directory
├── wdio.conf.ts                     # Main WebDriverIO configuration
├── wdio.shared.conf.ts              # Shared configuration settings
├── wdio.mobile-native.conf.ts       # Mobile native testing configuration
├── wdio.mobile-native.bs.conf.ts    # BrowserStack mobile native configuration
├── wdio.mobile-web.conf.ts          # Mobile web testing configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Android SDK (for mobile testing)
- Appium server
- Java JDK (for Android testing)
- Xcode (for iOS testing on macOS)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wdio-bdd-mobile-test
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your configuration
```

4. Start Appium server:
```bash
appium
```

5. Run tests:
```bash
# Web tests
npm run wdio

# Mobile native tests
npm run wdio:mobile-native

# Mobile web tests
npm run wdio:mobile-web
```

## ⚙️ Configuration

The framework supports multiple testing environments through different configuration files:

### Configuration Files

- **`wdio.conf.ts`**: Main configuration file for web testing
- **`wdio.shared.conf.ts`**: Shared settings across all configurations
- **`wdio.mobile-native.conf.ts`**: Mobile native app testing configuration
- **`wdio.mobile-native.bs.conf.ts`**: BrowserStack mobile native testing
- **`wdio.mobile-web.conf.ts`**: Mobile web browser testing

### Environment Variables

Create a `.env` file based on `.env.example` for environment-specific settings:

```bash
# Device configuration
DEVICE_NAME=Pixel 9 API 35
PLATFORM_VERSION=15.0
APP_PATH=./app/android/General-Store.apk

# BrowserStack configuration
BS_USERNAME=your_username
BS_ACCESS_KEY=your_access_key
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

#### Web Locators (`tests/locators/web/`)
```yaml
# saucedemo-locators.yaml
common:
  menuButton: "//button[@id='react-burger-menu-btn']"
  inventoryContainer: "//div[@id='inventory_container']"
  shoppingCartBadge: "//span[@class='shopping_cart_badge']"
```

#### Native Mobile Locators (`tests/locators/native/`)
```yaml
# mobile-banking-statements.yaml
common:
  accountBalance: "//android.widget.TextView[@resource-id='account_balance']"
  transactionList: "//android.widget.RecyclerView[@resource-id='transaction_list']"
  filterButton: "//android.widget.Button[@content-desc='Filter transactions']"
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

## 📝 Step Definitions

Step definitions are organized into two categories:

### Built-in Step Definitions (`tests/step-definitions/built-in/`)

Framework-provided, reusable step definitions:

#### UI Actions (`ui-actions.steps.ts`)
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
```

#### UI Assertions (`ui-assertions.steps.ts`)
```typescript
// Visibility checks
Then(/^"([^"]*)" element should be visible$/, async (elementName) => {
    await uiAssertions.shouldBeVisible(elementName);
});

// Text content verification
Then(/^"([^"]*)" element should contain text "([^"]*)"$/, 
    async (elementName, expectedText) => {
    await uiAssertions.shouldContainText(elementName, expectedText);
});
```

### Custom Step Definitions (`tests/step-definitions/custom/`)

Project-specific step definitions for specialized functionality:

```typescript
// tests/step-definitions/custom/registration.steps.ts
import { Given, When, Then } from '@wdio/cucumber-framework';

When(/^I fill registration form with valid data$/, async () => {
    // Custom registration logic
});
```

## 📋 Feature Files

Feature files are organized by functionality and follow Gherkin syntax:

### Available Feature Files

- **`mobile-banking-statements.feature`**: Mobile banking transaction scenarios
- **`registration-flow.feature`**: User registration scenarios
- **`registration-flow-e2e.feature`**: End-to-end registration testing
- **`saucedemo-smoke.feature`**: Smoke tests for SauceDemo application

### Example Feature File

```gherkin
Feature: Mobile Banking Statements
  As a mobile banking user
  I want to view my account statements
  So that I can track my transactions

  @mobile @banking @smoke
  Scenario: View account balance
    Given I open the mobile banking app
    When I login with valid credentials
    And I navigate to "Statements" section
    Then "Account Balance" element should be visible
    And "Transaction History" element should be visible

  @mobile @banking @positive
  Scenario: Filter transactions by date
    Given I am on the statements page
    When I click on "Filter" button
    And I select date range "Last 30 days"
    And I click on "Apply Filter" button
    Then filtered transactions should be displayed
```

## 📖 Test Stories

The `tests/test-stories/` directory contains detailed test scenarios and acceptance criteria:

- **`mobile-banking-screen.txt`**: Mobile banking test scenarios
- **`registration-flow.txt`**: Registration flow requirements
- **`registration-flow-output.txt`**: Registration flow test results
- **`user-login.txt`**: User login test scenarios

These files serve as:
- Requirements documentation
- Test case references
- Acceptance criteria definitions
- Manual testing guidelines

## 🏃‍♂️ Running Tests

### Basic Commands

```bash
# Run all web tests
npm run wdio

# Run mobile native tests
npm run wdio:mobile-native

# Run mobile web tests
npm run wdio:mobile-web

# Run tests on BrowserStack
npm run wdio:mobile-native:bs

# Run specific feature
npm run wdio -- --spec=tests/features/mobile-banking-statements.feature

# Run tests with specific tags
npm run wdio -- --cucumberOpts.tagExpression='@mobile and @banking'

# Generate test report
npm run report
```

### Test Execution by Environment

#### Web Testing
```bash
# Desktop web browsers
npm run wdio
```

#### Mobile Native Testing
```bash
# Local device/emulator
npm run wdio:mobile-native

# BrowserStack cloud testing
npm run wdio:mobile-native:bs
```

#### Mobile Web Testing
```bash
# Mobile browsers
npm run wdio:mobile-web
```

## 📊 Reporting

The framework generates comprehensive HTML reports:

```bash
# Generate Cucumber HTML report
node tests/support/generate-cucumber-report.js
```

Reports include:
- Test execution summary
- Step-by-step results with screenshots
- Feature and scenario statistics
- Execution timeline
- Environment details
- Failed test analysis

## 📱 Mobile Testing

### Mobile Application Setup

The framework includes test applications in the `app/` directory:

- **Android**: `app/android/General-Store.apk`
- **iOS**: `app/ios/` (for iOS applications)

### Mobile Testing Capabilities

1. **Native App Testing**: Test native mobile applications
2. **Mobile Web Testing**: Test web applications on mobile browsers
3. **Cross-platform Support**: Android and iOS testing
4. **Cloud Testing**: BrowserStack integration for device coverage

### Mobile-Specific Locators

Use platform-specific locators in `tests/locators/native/`:

```yaml
# Android locators
android:
  loginButton: "//android.widget.Button[@text='Login']"
  usernameField: "//android.widget.EditText[@resource-id='username']"

# iOS locators
ios:
  loginButton: "//XCUIElementTypeButton[@name='Login']"
  usernameField: "//XCUIElementTypeTextField[@name='username']"
```

## ✅ Best Practices

### 1. Project Organization

**DO:**
- Keep built-in and custom step definitions separate
- Use descriptive feature file names
- Organize locators by platform (web/native)
- Document test scenarios in test-stories

**DON'T:**
- Modify built-in step definitions
- Mix web and mobile locators
- Create overly complex feature files

### 2. Locator Strategy

**DO:**
- Prioritize text-based element identification
- Use platform-specific locator files
- Group related locators logically
- Test locators across different devices

**DON'T:**
- Hardcode locators in step definitions
- Use brittle locator strategies
- Create duplicate locators

### 3. Step Definitions

**DO:**
- Reuse built-in step definitions
- Create custom steps for specific business logic
- Use clear, descriptive step patterns
- Handle mobile-specific interactions

**DON'T:**
- Duplicate existing functionality
- Create platform-specific step definitions unnecessarily
- Mix actions and assertions

### 4. Feature Files

**DO:**
- Use appropriate tags (@mobile, @web, @smoke)
- Write platform-agnostic scenarios when possible
- Keep scenarios focused and independent
- Use meaningful scenario descriptions

**DON'T:**
- Create dependencies between scenarios
- Use technical implementation details
- Write overly long scenarios

### 5. Mobile Testing

**DO:**
- Test on multiple devices and OS versions
- Use cloud testing for broader coverage
- Handle mobile-specific gestures and interactions
- Consider network conditions and performance

**DON'T:**
- Test only on one device type
- Ignore platform-specific behaviors
- Assume web locators work on mobile

## 🔧 Adding New Test Scenarios

### 1. Create Test Story
Document requirements in `tests/test-stories/`:
```
# new-feature.txt
Feature: New Feature Testing

Scenario 1: Basic functionality
- User navigates to feature
- User performs action
- System responds appropriately
```

### 2. Create Feature File
```gherkin
# tests/features/new-feature.feature
Feature: New Feature
  @web @mobile @smoke
  Scenario: Test new functionality
    Given I navigate to the new feature
    When I perform the required action
    Then the expected result should be displayed
```

### 3. Add Custom Locators (if needed)
```yaml
# tests/locators/web/new-feature-locators.yaml
common:
  newFeatureButton: "//button[@data-testid='new-feature']"
  resultContainer: "//div[@class='result-container']"
```

### 4. Create Custom Steps (if needed)
```typescript
// tests/step-definitions/custom/new-feature.steps.ts
When(/^I perform the required action$/, async () => {
    // Custom implementation
});
```

## 🆘 Troubleshooting

### Common Issues

1. **Mobile app not launching**:
   - Verify app path in configuration
   - Check device/emulator connectivity
   - Ensure Appium server is running

2. **Element not found on mobile**:
   - Use Appium Inspector to verify locators
   - Check for platform-specific differences
   - Consider timing issues with mobile rendering

3. **Configuration issues**:
   - Verify environment variables in `.env`
   - Check platform-specific configuration files
   - Ensure proper capabilities are set

### Debug Tips

- Use Appium Inspector for mobile element inspection
- Enable detailed logging in configuration files
- Take screenshots: `await browser.saveScreenshot('./debug.png')`
- Use browser pause for debugging: `await browser.pause(5000)`
- Check device logs for mobile-specific issues

---

## 📞 Support

For questions or issues:
1. Check test stories for requirements clarity
2. Review similar implementations in existing features
3. Consult platform-specific documentation
4. Create detailed bug reports with device/browser information
5. Include screenshots and logs for mobile issues

---

*This framework supports comprehensive testing across web and mobile platforms. The organized structure ensures maintainability and scalability for growing test suites. Happy testing! 🚀*