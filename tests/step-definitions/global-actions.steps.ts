import { Given, When, Then } from '@wdio/cucumber-framework';
import { $ } from '@wdio/globals';
const commonActions = require('../support/commonActions');
// ===============================
// GLOBAL ACTIONS STEP DEFINITIONS
// ===============================
// This file contains only action steps (Given/When) that perform operations
// For assertions and verifications, see global-assertions.steps.ts

// ===============================
// CLICK ACTIONS
// ===============================
When(/^I click on (\w+) (button|link|element)$/, async (elementName: string, elementType: string) => {
    console.log(`Clicking on ${elementName} ${elementType}`);
    await commonActions.clickOn(elementName, elementType);
});

When(/^I double click on (\w+) (button|link|element)$/, async (elementName: string, elementType: string) => {
    console.log(`Double clicking on ${elementName} ${elementType}`);
    await commonActions.doubleClickOn(elementName, elementType);
});

When(/^I right click on (\w+) (button|link|element)$/, async (elementName: string, elementType: string) => {
    console.log(`Right clicking on ${elementName} ${elementType}`);
    await commonActions.rightClickOn(elementName, elementType);
});

// ===============================
// DROPDOWN AND SELECTION ACTIONS
// ===============================
When(/^I select "([^"]*)" from (\w+) dropdown$/, async (option: string, elementName: string) => {
    console.log(`Selecting "${option}" from ${elementName} dropdown`);
    await commonActions.selectFromDropdown(elementName, option);
});

When(/^I select (\w+) option from (\w+) dropdown$/, async (option: string, elementName: string) => {
    console.log(`Selecting ${option} option from ${elementName} dropdown`);
    await commonActions.selectFromDropdown(elementName, option);
});

// ===============================
// HOVER AND FOCUS ACTIONS
// ===============================
When(/^I hover over (\w+) (button|link|element)$/, async (elementName: string, elementType: string) => {
    console.log(`Hovering over ${elementName} ${elementType}`);
    await commonActions.hoverOn(elementName, elementType);
});

When(/^I focus on (\w+) (field|input|element)$/, async (elementName: string, elementType: string) => {
    console.log(`Focusing on ${elementName} ${elementType}`);
    await commonActions.focusOn(elementName, elementType);
});

// ===============================
// SCROLL ACTIONS
// ===============================
When(/^I scroll to (\w+) (element|section)$/, async (elementName: string, elementType: string) => {
    console.log(`Scrolling to ${elementName} ${elementType}`);
    await commonActions.scrollTo(elementName, elementType);
});

When(/^I scroll to (\w+) and click$/, async (elementName: string) => {
    console.log(`Scrolling to ${elementName} and clicking`);
    await commonActions.scrollToAndClick(elementName);
});

When(/^I scroll to (\w+) and double click$/, async (elementName: string) => {
    console.log(`Scrolling to ${elementName} and double clicking`);
    await commonActions.scrollToAndDoubleClick(elementName);
});

When(/^I scroll to (\w+) and right click$/, async (elementName: string) => {
    console.log(`Scrolling to ${elementName} and right clicking`);
    await commonActions.scrollToAndRightClick(elementName);
});

When(/^I scroll (left|right|up|down) to (\w+) and click on (\w+)$/, async (direction: string, targetElement: string, clickElement: string) => {
    console.log(`Scrolling ${direction} to ${targetElement} and clicking on ${clickElement}`);
    await commonActions.scrollDirectionToAndClick(direction, targetElement, clickElement);
});

When(/^I scroll (left|right|up|down) by (\d+) pixels$/, async (direction: string, pixels: string) => {
    console.log(`Scrolling ${direction} by ${pixels} pixels`);
    await commonActions.scrollByPixels(direction, pixels);
});

// ===============================
// TOUCH AND GESTURE ACTIONS (Mobile)
// ===============================
When(/^I press and hold (\w+) (element|button)$/, async (elementName: string, elementType: string) => {
    console.log(`Pressing and holding ${elementName} ${elementType}`);
    await commonActions.pressAndHold(elementName, elementType);
});

When(/^I release the hold on (\w+) (element|button)$/, async (elementName: string, elementType: string) => {
    console.log(`Releasing hold on ${elementName} ${elementType}`);
    await commonActions.releaseHold(elementName, elementType);
});

When(/^I long press on (\w+) (element|button)$/, async (elementName: string, elementType: string) => {
    console.log(`Long pressing on ${elementName} ${elementType}`);
    await commonActions.longPress(elementName, elementType);
});

When(/^I swipe from (\w+) to (\w+)$/, async (fromElement: string, toElement: string) => {
    console.log(`Swiping from ${fromElement} to ${toElement}`);
    await commonActions.swipeFromTo(fromElement, toElement);
});

When(/^I swipe (left|right|up|down) on (\w+)$/, async (direction: string, elementName: string) => {
    console.log(`Swiping ${direction} on ${elementName}`);
    await commonActions.swipeDirection(direction, elementName);
});

When(/^I pinch in on (\w+)$/, async (elementName: string) => {
    console.log(`Pinching in on ${elementName}`);
    await commonActions.pinchIn(elementName);
});

When(/^I pinch out on (\w+)$/, async (elementName: string) => {
    console.log(`Pinching out on ${elementName}`);
    await commonActions.pinchOut(elementName);
});

When(/^I zoom in on (\w+)$/, async (elementName: string) => {
    console.log(`Zooming in on ${elementName}`);
    await commonActions.zoomIn(elementName);
});

When(/^I zoom out on (\w+)$/, async (elementName: string) => {
    console.log(`Zooming out on ${elementName}`);
    await commonActions.zoomOut(elementName);
});
// ===============================
// TEXT INPUT ACTIONS
// ===============================
When(/^I (type|enter) "([^"]*)" into (\w+) (field|input|textbox)$/, async (action: string, text: string, elementName: string, elementType: string) => {
    console.log(`Typing/Entering "${text}" into ${elementName} ${elementType}`);
    await commonActions.typeText(text, elementName, elementType);
});

When(/^I clear (\w+) (field|input|textbox)$/, async (elementName: string, elementType: string) => {
    console.log(`Clearing ${elementName} ${elementType}`);
    await commonActions.clearField(elementName, elementType);
});

When(/^I select all text in (\w+) (field|input|textbox)$/, async (elementName: string, elementType: string) => {
    console.log(`Selecting all text in ${elementName} ${elementType}`);
    await commonActions.selectAllText(elementName, elementType);
});

// ===============================
// CHECKBOX AND RADIO ACTIONS
// ===============================
When(/^I check (\w+) checkbox$/, async (elementName: string) => {
    console.log(`Checking ${elementName} checkbox`);
    await commonActions.checkCheckbox(elementName);
});

When(/^I uncheck (\w+) checkbox$/, async (elementName: string) => {
    console.log(`Unchecking ${elementName} checkbox`);
    await commonActions.uncheckCheckbox(elementName);
});

When(/^I select (\w+) radio button$/, async (elementName: string) => {
    console.log(`Selecting ${elementName} radio button`);
    await commonActions.selectRadioButton(elementName);
});



// ===============================
// NAVIGATION ACTIONS
// ===============================
When(/^I navigate to "([^"]*)"$/, async (url: string) => {
    console.log(`Navigating to "${url}"`);
    await commonActions.navigateTo(url);
});

When(/^I go back$/, async () => {
    console.log('Going back in browser');
    await commonActions.goBack();
});

When(/^I go forward$/, async () => {
    console.log('Going forward in browser');
    await commonActions.goForward();
});

When(/^I refresh the page$/, async () => {
    console.log('Refreshing the page');
    await commonActions.refreshPage();
});

When(/^I reload the page$/, async () => {
    console.log('Reloading the page');
    await commonActions.reloadPage();
});

When(/^I switch to tab (\d+)$/, async (tabIndex: string) => {
    console.log(`Switching to tab ${tabIndex}`);
    await commonActions.switchToTab(tabIndex);
});

When(/^I open new tab$/, async () => {
    console.log('Opening new tab');
    await commonActions.openNewTab();
});

When(/^I close current tab$/, async () => {
    console.log('Closing current tab');
    await commonActions.closeCurrentTab();
});



// ===============================
// WAIT ACTIONS
// ===============================
When(/^I wait for (\w+) to be visible$/, async (elementName: string) => {
    console.log(`Waiting for ${elementName} to be visible`);
    await commonActions.waitForVisible(elementName);
});

When(/^I wait for (\w+) to disappear$/, async (elementName: string) => {
    console.log(`Waiting for ${elementName} to disappear`);
    await commonActions.waitForDisappear(elementName);
});

When(/^I wait for (\w+) to be enabled$/, async (elementName: string) => {
    console.log(`Waiting for ${elementName} to be enabled`);
    await commonActions.waitForEnabled(elementName);
});

When(/^I wait for (\w+) to be clickable$/, async (elementName: string) => {
    console.log(`Waiting for ${elementName} to be clickable`);
    await commonActions.waitForClickable(elementName);
});

When(/^I wait (\d+) seconds$/, async (seconds: string) => {
    console.log(`Waiting ${seconds} seconds`);
    await commonActions.waitSeconds(seconds);
});

When('I wait for page to load', async () => {
    console.log('Waiting for page to load');
    await commonActions.waitForPageLoad();
});

// ===============================
// FILE UPLOAD ACTIONS
// ===============================
When(/^I upload file "([^"]*)" to (\w+)$/, async (filePath: string, elementName: string) => {
    console.log(`Uploading file "${filePath}" to ${elementName}`);
    await commonActions.uploadFile(filePath, elementName);
});

When(/^I select file "([^"]*)" from file picker$/, async (filePath: string) => {
    console.log(`Selecting file "${filePath}" from file picker`);
    await commonActions.selectFileFromPicker(filePath);
});



// ===============================
// ALERT AND MODAL ACTIONS
// ===============================
When(/^I accept the alert$/, async () => {
    console.log('Accepting the alert');
    await commonActions.acceptAlert();
});

When(/^I dismiss the alert$/, async () => {
    console.log('Dismissing the alert');
    await commonActions.dismissAlert();
});

When(/^I type "([^"]*)" in alert prompt$/, async (text: string) => {
    console.log(`Typing "${text}" in alert prompt`);
    await commonActions.typeInAlert(text);
});

When(/^I close the modal$/, async () => {
    console.log('Closing the modal');
    await commonActions.closeModal();
});

When(/^I click outside the modal$/, async () => {
    console.log('Clicking outside the modal');
    await commonActions.clickOutsideModal();
});



// ===============================
// MOBILE-SPECIFIC ACTIONS
// ===============================
When(/^I rotate device to (landscape|portrait)$/, async (orientation: string) => {
    console.log(`Rotating device to ${orientation}`);
    await commonActions.rotateDevice(orientation);
});

When(/^I shake the device$/, async () => {
    console.log('Shaking the device');
    await commonActions.shakeDevice();
});

When(/^I lock the device$/, async () => {
    console.log('Locking the device');
    await commonActions.lockDevice();
});

When(/^I unlock the device$/, async () => {
    console.log('Unlocking the device');
    await commonActions.unlockDevice();
});

When(/^I put app in background for (\d+) seconds$/, async (seconds: string) => {
    console.log(`Putting app in background for ${seconds} seconds`);
    await commonActions.putAppInBackground(seconds);
});

When(/^I bring app to foreground$/, async () => {
    console.log('Bringing app to foreground');
    await commonActions.bringAppToForeground();
});

When(/^I take a screenshot$/, async () => {
    console.log('Taking a screenshot');
    await commonActions.takeScreenshot();
});

When(/^I hide keyboard$/, async () => {
    console.log('Hiding keyboard');
    await commonActions.hideKeyboard();
});

When(/^I show keyboard$/, async () => {
    console.log('Showing keyboard');
    await commonActions.showKeyboard();
});

// ===============================
// FORM ACTIONS
// ===============================
When(/^I submit the form$/, async () => {
    console.log('Submitting the form');
    await commonActions.submitForm();
});

When(/^I reset the form$/, async () => {
    console.log('Resetting the form');
    await commonActions.resetForm();
});

When(/^I fill form with:$/, async (dataTable: any) => {
    console.log('Filling form with data table:', dataTable.raw());
    await commonActions.fillFormWithData(dataTable);
});



// ===============================
// KEYBOARD ACTIONS
// ===============================
When(/^I press (Enter|Tab|Escape|Space|Backspace|Delete) key$/, async (key: string) => {
    console.log(`Pressing ${key} key`);
    await commonActions.pressKey(key);
});

When(/^I press key combination "([^"]*)"$/, async (keys: string) => {
    console.log(`Pressing key combination "${keys}"`);
    await commonActions.pressKeyCombination(keys);
});



// ===============================
// DRAG AND DROP ACTIONS
// ===============================
When(/^I drag (\w+) to (\w+)$/, async (sourceElement: string, targetElement: string) => {
    console.log(`Dragging ${sourceElement} to ${targetElement}`);
    await commonActions.dragToElement(sourceElement, targetElement);
});

When(/^I drag (\w+) by offset \((\d+),(\d+)\)$/, async (elementName: string, x: string, y: string) => {
    console.log(`Dragging ${elementName} by offset (${x},${y})`);
    await commonActions.dragByOffset(elementName, x, y);
});

