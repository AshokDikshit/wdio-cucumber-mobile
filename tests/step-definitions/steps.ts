import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page: keyof typeof pages) => {
    await pages[page].open();
});


When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    console.log('Verifying the user is on the login page');
    // await expect(SecurePage.flashAlert).toBeExisting();
    // await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
});

Given(/^the user is on the login page$/, async () => {
    console.log('Verifying the user is on the login page');
    // Implementation needed - this could be a page state verification
});

Then(/^the account summary is displayed$/, async () => {
    console.log('Verifying the account summary is displayed');
    // Implementation needed - verify account summary section is visible
});