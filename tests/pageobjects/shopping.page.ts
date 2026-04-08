import { $ } from '@wdio/globals';
import Page from './page';

class ShoppingPage extends Page {
    /**
     * Define selectors using resource-id and xpath based on actual UI dump
     */
    get countryDropdown() {
        return $('android=new UiSelector().resourceId("com.androidsample.generalstore:id/spinnerCountry")');
    }

    get nameField() {
        return $('android=new UiSelector().resourceId("com.androidsample.generalstore:id/nameField")');
    }

    get maleRadioButton() {
        return $('android=new UiSelector().resourceId("com.androidsample.generalstore:id/radioMale")');
    }

    get femaleRadioButton() {
        return $('android=new UiSelector().resourceId("com.androidsample.generalstore:id/radioFemale")');
    }

    get letsShopButton() {
        return $('android=new UiSelector().resourceId("com.androidsample.generalstore:id/btnLetsShop")');
    }

    get productList() {
        return $('android.widget.ListView');
    }

    get indiaOption() {
        return $('android=new UiSelector().text("India")');
    }

    /**
     * Methods to interact with the shopping page
     */
    async selectCountry(country: string) {
        await this.countryDropdown.click();
        if (country === 'India') {
            // Scroll down to find India in the dropdown list
            await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("India"))').click();
        }
    }

    async enterName(name: string) {
        await this.nameField.setValue(name);
    }

    async selectGender(gender: string) {
        if (gender.toLowerCase() === 'male') {
            await this.maleRadioButton.click();
        } else if (gender.toLowerCase() === 'female') {
            await this.femaleRadioButton.click();
        }
    }

    async tapLetsShop() {
        await this.letsShopButton.click();
    }

    async isProductListVisible() {
        return await this.productList.isDisplayed();
    }

    /**
     * Open the application (app should be installed via capabilities)
     */
    open() {
        // App will be launched automatically via capabilities
        return super.open('');
    }
}

export default new ShoppingPage();