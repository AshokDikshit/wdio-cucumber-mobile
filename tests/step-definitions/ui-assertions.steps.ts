import { Then } from '@wdio/cucumber-framework';
import uiAssertions from '../support/uiAssertions';
// ===============================
// GLOBAL ASSERTIONS STEP DEFINITIONS
// ===============================
// This file contains only assertion steps (Then) that verify conditions
// For actions and operations, see global-actions.steps.ts
 
Then(/^"([^"]*)" should be visible$/, async (element: string) => {
    console.log(`Verifying ${element} should be visible`);
    await uiAssertions.verifyElementVisible(element);
});

Then(/^"([^"]*)" should not be visible$/, async (element: string) => {
    console.log(`Verifying ${element} should not be visible`);
    await uiAssertions.verifyElementNotVisible(element);
});

Then(/^"([^"]*)" should be displayed$/, async (element: string) => {
    console.log(`Verifying ${element} should be displayed`);
    await uiAssertions.verifyElementDisplayed(element);
});

Then(/^"([^"]*)" should be hidden$/, async (element: string) => {
    console.log(`Verifying ${element} should be hidden`);
    await uiAssertions.verifyElementHidden(element);
});

// Element State Assertions
Then(/^"([^"]*)" should be enabled$/, async (element: string) => {
    console.log(`Verifying ${element} should be enabled`);
    await uiAssertions.verifyElementEnabled(element);
});

Then(/^"([^"]*)" should be disabled$/, async (element: string) => {
    console.log(`Verifying ${element} should be disabled`);
    await uiAssertions.verifyElementDisabled(element);
});

Then(/^"([^"]*)" should be selected$/, async (element: string) => {
    console.log(`Verifying ${element} should be selected`);
    await uiAssertions.verifyElementSelected(element);
});

Then(/^"([^"]*)" should not be selected$/, async (element: string) => {
    console.log(`Verifying ${element} should not be selected`);
    await uiAssertions.verifyElementNotSelected(element);
});

Then(/^"([^"]*)" checkbox should be checked$/, async (element: string) => {
    console.log(`Verifying ${element} checkbox should be checked`);
    await uiAssertions.verifyCheckboxChecked(element);
});

Then(/^"([^"]*)" checkbox should be unchecked$/, async (element: string) => {
    console.log(`Verifying ${element} checkbox should be unchecked`);
    await uiAssertions.verifyCheckboxUnchecked(element);
});

// Text and Content Assertions
Then(/^"([^"]*)" should contain text "([^"]*)"$/, async (element: string, text: string) => {
    console.log(`Verifying ${element} should contain text "${text}"`);
    await uiAssertions.verifyElementContainsText(element, text);
});

Then(/^"([^"]*)" should not contain text "([^"]*)"$/, async (element: string, text: string) => {
    console.log(`Verifying ${element} should not contain text "${text}"`);
    // Implementation needed
});

Then(/^"([^"]*)" should have exact text "([^"]*)"$/, async (element: string, text: string) => {
    console.log(`Verifying ${element} should have exact text "${text}"`);
    await uiAssertions.verifyElementExactText(element, text);
});

Then(/^"([^"]*)" field should be empty$/, async (element: string) => {
    console.log(`Verifying ${element} field should be empty`);
    await uiAssertions.verifyFieldEmpty(element);
});

Then(/^"([^"]*)" should be empty$/, async (element: string) => {
    console.log(`Verifying ${element} should be empty`);
    await uiAssertions.verifyElementEmpty(element);
});

Then(/^"([^"]*)" should have value "([^"]*)"$/, async (element: string, value: string) => {
    console.log(`Verifying ${element} should have value "${value}"`);
    await uiAssertions.verifyElementValue(element, value);
});

Then(/^"([^"]*)" should have placeholder "([^"]*)"$/, async (element: string, placeholder: string) => {
    console.log(`Verifying ${element} should have placeholder "${placeholder}"`);
    await uiAssertions.verifyElementPlaceholder(element, placeholder);
});

// Attribute and Property Assertions
Then(/^"([^"]*)" should have attribute "([^"]*)" with value "([^"]*)"$/, async (element: string, attribute: string, value: string) => {
    console.log(`Verifying ${element} should have attribute "${attribute}" with value "${value}"`);
    await uiAssertions.verifyElementAttribute(element, attribute, value);
});

Then(/^"([^"]*)" should have class "([^"]*)"$/, async (element: string, className: string) => {
    console.log(`Verifying ${element} should have class "${className}"`);
    await uiAssertions.verifyElementHasClass(element, className);
});

Then(/^"([^"]*)" should not have class "([^"]*)"$/, async (element: string, className: string) => {
    console.log(`Verifying ${element} should not have class "${className}"`);
    await uiAssertions.verifyElementNotHasClass(element, className);
});

// Count and List Assertions
Then(/^there should be (\d+) "([^"]*)" elements$/, async (count: string, element: string) => {
    console.log(`Verifying there should be ${count} ${element} elements`);
    await uiAssertions.verifyElementCount(element, parseInt(count));
});

Then(/^there should be at least (\d+) "([^"]*)" elements$/, async (count: string, element: string) => {
    console.log(`Verifying there should be at least ${count} ${element} elements`);
    await uiAssertions.verifyElementCountAtLeast(element, parseInt(count));
});

Then(/^there should be at most (\d+) "([^"]*)" elements$/, async (count: string, element: string) => {
    console.log(`Verifying there should be at most ${count} ${element} elements`);
    await uiAssertions.verifyElementCountAtMost(element, parseInt(count));
});

Then(/^"([^"]*)" list should contain "([^"]*)"$/, async (element: string, item: string) => {
    console.log(`Verifying ${element} list should contain "${item}"`);
    await uiAssertions.verifyListContains(element, item);
});

Then(/^"([^"]*)" list should not contain "([^"]*)"$/, async (element: string, item: string) => {
    console.log(`Verifying ${element} list should not contain "${item}"`);
    await uiAssertions.verifyListNotContains(element, item);
});

// Page and Navigation Assertions
Then(/^the page title should be "([^"]*)"$/, async (title: string) => {
    console.log(`Verifying the page title should be "${title}"`);
    await uiAssertions.verifyPageTitle(title);
});

Then(/^the current URL should contain "([^"]*)"$/, async (urlPart: string) => {
    console.log(`Verifying the current URL should contain "${urlPart}"`);
    await uiAssertions.verifyUrlContains(urlPart);
});

Then(/^the current URL should be "([^"]*)"$/, async (url: string) => {
    console.log(`Verifying the current URL should be "${url}"`);
    await uiAssertions.verifyUrl(url);
});

// Alert and Modal Assertions
Then(/^an alert should be present$/, async () => {
    console.log('Verifying an alert should be present');
    await uiAssertions.verifyAlertPresent();
});

Then(/^no alert should be present$/, async () => {
    console.log('Verifying no alert should be present');
    await uiAssertions.verifyNoAlertPresent();
});

Then(/^the alert text should be "([^"]*)"$/, async (text: string) => {
    console.log(`Verifying the alert text should be "${text}"`);
    await uiAssertions.verifyAlertText(text);
});

Then(/^a modal should be open$/, async () => {
    console.log('Verifying a modal should be open');
    await uiAssertions.verifyModalOpen();
});

Then(/^no modal should be open$/, async () => {
    console.log('Verifying no modal should be open');
    await uiAssertions.verifyNoModalOpen();
});

// Form Validation Assertions
Then(/^"([^"]*)" should show validation error "([^"]*)"$/, async (element: string, error: string) => {
    console.log(`Verifying ${element} should show validation error "${error}"`);
    await uiAssertions.verifyValidationError(element, error);
});

Then(/^"([^"]*)" should not show any validation error$/, async (element: string) => {
    console.log(`Verifying ${element} should not show any validation error`);
    await uiAssertions.verifyNoValidationError(element);
});

Then(/^the form should be valid$/, async () => {
    console.log('Verifying the form should be valid');
    await uiAssertions.verifyFormValid();
});

Then(/^the form should be invalid$/, async () => {
    console.log('Verifying the form should be invalid');
    await uiAssertions.verifyFormInvalid();
});

// Loading and State Assertions
Then(/^the page should be loaded$/, async () => {
    console.log('Verifying the page should be loaded');
    await uiAssertions.verifyPageLoaded();
});

Then(/^"([^"]*)" should be loading$/, async (element: string) => {
    console.log(`Verifying ${element} should be loading`);
    await uiAssertions.verifyElementLoading(element);
});

Then(/^"([^"]*)" should not be loading$/, async (element: string) => {
    console.log(`Verifying ${element} should not be loading`);
    await uiAssertions.verifyElementNotLoading(element);
});

// Mobile-specific Assertions
Then(/^the device orientation should be (landscape|portrait)$/, async (orientation: string) => {
    console.log(`Verifying the device orientation should be ${orientation}`);
    await uiAssertions.verifyDeviceOrientation(orientation);
});

Then(/^the keyboard should be visible$/, async () => {
    console.log('Verifying the keyboard should be visible');
    await uiAssertions.verifyKeyboardVisible();
});

Then(/^the keyboard should be hidden$/, async () => {
    console.log('Verifying the keyboard should be hidden');
    await uiAssertions.verifyKeyboardHidden();
});

// Wait-based Assertions
Then(/^"([^"]*)" should appear within (\d+) seconds$/, async (element: string, timeout: string) => {
    console.log(`Verifying ${element} should appear within ${timeout} seconds`);
    await uiAssertions.verifyElementAppearsWithin(element, parseInt(timeout));
});

Then(/^"([^"]*)" should disappear within (\d+) seconds$/, async (element: string, timeout: string) => {
    console.log(`Verifying ${element} should disappear within ${timeout} seconds`);
    await uiAssertions.verifyElementDisappearsWithin(element, parseInt(timeout));
});

// Style and Visual Assertions
Then(/^"([^"]*)" should have background color "([^"]*)"$/, async (element: string, color: string) => {
    console.log(`Verifying ${element} should have background color "${color}"`);
    await uiAssertions.verifyElementBackgroundColor(element, color);
});

Then(/^"([^"]*)" should have text color "([^"]*)"$/, async (element: string, color: string) => {
    console.log(`Verifying ${element} should have text color "${color}"`);
    await uiAssertions.verifyElementTextColor(element, color);
});

Then(/^"([^"]*)" should be positioned at coordinates \((\d+),(\d+)\)$/, async (element: string, x: string, y: string) => {
    console.log(`Verifying ${element} should be positioned at coordinates (${x},${y})`);
    await uiAssertions.verifyElementPosition(element, parseInt(x), parseInt(y));
});