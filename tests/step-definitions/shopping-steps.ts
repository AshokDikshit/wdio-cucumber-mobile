import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import ShoppingPage from '../pageobjects/shopping.page';

Given(/^I have installed and launched the General Store app$/, async () => {
    // App will be launched automatically via capabilities
    // Wait for the app to load
    await driver.pause(3000);
});

When(/^I select country as "(.*)"$/, async (country: string) => {
    await ShoppingPage.selectCountry(country);
});

When(/^I enter name as "(.*)"$/, async (name: string) => {
    await ShoppingPage.enterName(name);
});

When(/^I select gender as "(.*)"$/, async (gender: string) => {
    await ShoppingPage.selectGender(gender);
});

When(/^I tap on "Let's Shop" button$/, async () => {
    await ShoppingPage.tapLetsShop();
});

Then(/^I should be navigated to the shopping page$/, async () => {
    // Wait for navigation
    await driver.pause(2000);
    // Add assertion for successful navigation if needed
});

Then(/^I should see product listings$/, async () => {
    const isProductListVisible = await ShoppingPage.isProductListVisible();
    expect(isProductListVisible).toBe(true);
});