import type { Options } from '@wdio/types';
import { sharedConfig, mergeConfigs } from './wdio.shared.conf';

// Mobile Native Application Configuration for WebDriverIO
// Supports both local and actual device testing
export const config: WebdriverIO.Config = mergeConfigs(sharedConfig, {
    // Specs patterns
    specs: [
        './tests/features/**/general-store.feature'
    ],

    // Exclude patterns
    exclude: [
        // 'path/to/excluded/files'
    ],

    // Maximum instances to run in parallel
    maxInstances: 1,

    // Capabilities for mobile native app testing
    // Note: Only one capability will be used at a time. Comment/uncomment as needed.
    capabilities: [
        // Android Native App - Emulator
        {
            platformName: 'Android',
            // browserName: 'Chrome',
            'appium:deviceName': 'Pixel 9 API 35',
            'appium:platformVersion': '15.0',
            'appium:automationName': 'UiAutomator2',
            'appium:app': './app/android/General-Store.apk',
            // 'appium:appPackage': 'com.androidsample.generalstore',
            // 'appium:appActivity': 'com.androidsample.generalstore.MainActivity'
            // 'appium:newCommandTimeout': 240,
            // 'appium:connectHardwareKeyboard': true,
            // // 'appium:avd': 'Pixel_7_API_33', // Configure your AVD name
            // 'appium:avdLaunchTimeout': 300000,
            // 'appium:autoGrantPermissions': true,
            // 'appium:noReset': false,
            // 'appium:fullReset': false,
            // 'appium:unicodeKeyboard': true,
            // 'appium:resetKeyboard': true,
            // 'appium:systemPort': 8200
        } as any,
        // // Android Native App - Real Device
        // {
        //     platformName: 'Android',
        //     'appium:platformVersion': '13.0', // Update based on your device
        //     'appium:deviceName': 'Real Android Device',
        //     'appium:automationName': 'UiAutomator2',
        //     'appium:app': process.env.ANDROID_APP_PATH || './apps/android/app-release.apk',
        //     'appium:appPackage': process.env.ANDROID_APP_PACKAGE || 'com.example.app',
        //     'appium:appActivity': process.env.ANDROID_APP_ACTIVITY || '.MainActivity',
        //     'appium:newCommandTimeout': 240,
        //     'appium:udid': process.env.ANDROID_UDID || 'auto', // Set device UDID in environment
        //     'appium:autoGrantPermissions': true,
        //     'appium:noReset': false,
        //     'appium:fullReset': false,
        //     'appium:unicodeKeyboard': true,
        //     'appium:resetKeyboard': true,
        //     'appium:systemPort': 8201
        // } as any,
        // // iOS Native App - Simulator
        // {
        //     platformName: 'iOS',
        //     'appium:platformVersion': '17.0',
        //     'appium:deviceName': 'iPhone 15',
        //     'appium:automationName': 'XCUITest',
        //     'appium:app': process.env.IOS_APP_PATH || './apps/ios/YourApp.app',
        //     'appium:bundleId': process.env.IOS_BUNDLE_ID || 'com.example.app',
        //     'appium:newCommandTimeout': 240,
        //     'appium:wdaLaunchTimeout': 300000,
        //     'appium:wdaConnectionTimeout': 240000,
        //     'appium:autoAcceptAlerts': true,
        //     'appium:autoDismissAlerts': false,
        //     'appium:noReset': false,
        //     'appium:fullReset': false,
        //     'appium:wdaLocalPort': 8100,
        //     'appium:webDriverAgentUrl': 'http://localhost:8100'
        // } as any,
        // // iOS Native App - Real Device
        // {
        //     platformName: 'iOS',
        //     'appium:platformVersion': '17.0', // Update based on your device
        //     'appium:deviceName': 'Real iPhone',
        //     'appium:automationName': 'XCUITest',
        //     'appium:app': process.env.IOS_APP_PATH || './apps/ios/YourApp.ipa',
        //     'appium:bundleId': process.env.IOS_BUNDLE_ID || 'com.example.app',
        //     'appium:newCommandTimeout': 240,
        //     'appium:udid': process.env.IOS_UDID || 'auto', // Set device UDID in environment
        //     'appium:xcodeOrgId': process.env.XCODE_ORG_ID, // Required for real device
        //     'appium:xcodeSigningId': process.env.XCODE_SIGNING_ID, // Required for real device
        //     'appium:updatedWDABundleId': process.env.WDA_BUNDLE_ID || 'com.example.WebDriverAgentRunner',
        //     'appium:wdaLaunchTimeout': 300000,
        //     'appium:wdaConnectionTimeout': 240000,
        //     'appium:autoAcceptAlerts': true,
        //     'appium:autoDismissAlerts': false,
        //     'appium:noReset': false,
        //     'appium:fullReset': false,
        //     'appium:wdaLocalPort': 8101,
        //     'appium:webDriverAgentUrl': 'http://localhost:8101'
        // } as any
    ],

    // Mobile Native specific timeout (longer for app startup)
    waitforTimeout: 15000,

    // Mobile Native specific hooks
    onPrepare: function (config, capabilities) {
        console.log('🚀 Starting Mobile Native App Testing...');
        console.log('📱 Capabilities:', JSON.stringify(capabilities, null, 2));

        // Validate app paths exist
        const fs = require('fs');
        if (Array.isArray(capabilities)) {
            capabilities.forEach((cap: any) => {
                if (cap['appium:app'] && !cap['appium:app'].startsWith('http')) {
                    if (!fs.existsSync(cap['appium:app'])) {
                        console.warn(`⚠️  App file not found: ${cap['appium:app']}`);
                        console.log('Please ensure the app file exists or set the correct path in environment variables.');
                    }
                }
            });
        }
    },

    onComplete: function (exitCode, config, capabilities, results) {
        console.log('✅ Mobile Native App Testing completed with exit code:', exitCode);
    }
});