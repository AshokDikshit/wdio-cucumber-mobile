import type { Options } from '@wdio/types';
import { sharedConfig, mergeConfigs } from './wdio.shared.conf';

// Mobile Web Configuration for WebDriverIO
// Supports both emulator and actual device testing
export const config: WebdriverIO.Config = mergeConfigs(sharedConfig, {
    // Specs patterns
    specs: [
        './tests/features/**/saucedemo-smoke.feature'
    ],

    // Exclude patterns
    exclude: [
        // 'path/to/excluded/files'
    ],

    // Maximum instances to run in parallel
    maxInstances: 1,

    // Capabilities for mobile web testing
    // Note: Only one capability will be used at a time. Comment/uncomment as needed.
    capabilities: [
        // Android Chrome - Emulator
        {
            platformName: 'Android',
            browserName: 'Chrome',
            'appium:deviceName': 'Pixel 9 API 35',
            'appium:platformVersion': '15.0',
            'appium:automationName': 'UiAutomator2',

            'goog:chromeOptions': {
                args: ['--no-sandbox', '--disable-dev-shm-usage']
            },
            // Force classic protocol, BiDi protocol is throwing some 404 error though still works fine with the tests
            'wdio:enforceWebDriverClassic': true

            // 'appium:chromedriverExecutable': './node_modules/chromedriver/lib/chromedriver/chromedriver',
            // 'appium:newCommandTimeout': 240,
            // 'appium:connectHardwareKeyboard': true,
            // 'appium:avd': 'Pixel_7_API_33', // Configure your AVD name
            // 'appium:avdLaunchTimeout': 300000,
            // 'appium:chromeOptions': {
            //     w3c: false,
            //     args: [
            //         '--disable-web-security',
            //         '--disable-features=VizDisplayCompositor',
            //         '--no-sandbox'
            //     ]
            // }
        } as any,
        // // Android Chrome - Real Device
        // {
        //     platformName: 'Android',
        //     'appium:platformVersion': '13.0', // Update based on your device
        //     'appium:deviceName': 'Real Android Device',
        //     'appium:automationName': 'UiAutomator2',
        //     browserName: 'Chrome',
        //     'appium:chromedriverExecutable': './node_modules/chromedriver/lib/chromedriver/chromedriver',
        //     'appium:newCommandTimeout': 240,
        //     'appium:udid': process.env.ANDROID_UDID || 'auto', // Set device UDID in environment
        //     'appium:chromeOptions': {
        //         w3c: false,
        //         args: [
        //             '--disable-web-security',
        //             '--disable-features=VizDisplayCompositor'
        //         ]
        //     }
        // } as any,
        // // iOS Safari - Simulator
        // {
        //     platformName: 'iOS',
        //     'appium:platformVersion': '17.0',
        //     'appium:deviceName': 'iPhone 15',
        //     'appium:automationName': 'XCUITest',
        //     browserName: 'Safari',
        //     'appium:newCommandTimeout': 240,
        //     'appium:wdaLaunchTimeout': 300000,
        //     'appium:wdaConnectionTimeout': 240000,
        //     'appium:safariInitialUrl': 'about:blank',
        //     'appium:safariAllowPopups': true,
        //     'appium:safariIgnoreFraudWarning': true

        // } as any,
        // // iOS Safari - Real Device
        // {
        //     platformName: 'iOS',
        //     'appium:platformVersion': '17.0', // Update based on your device
        //     'appium:deviceName': 'Real iPhone',
        //     'appium:automationName': 'XCUITest',
        //     browserName: 'Safari',
        //     'appium:newCommandTimeout': 240,
        //     'appium:udid': process.env.IOS_UDID || 'auto', // Set device UDID in environment
        //     'appium:xcodeOrgId': process.env.XCODE_ORG_ID, // Required for real device
        //     'appium:xcodeSigningId': process.env.XCODE_SIGNING_ID, // Required for real device
        //     'appium:wdaLaunchTimeout': 300000,
        //     'appium:wdaConnectionTimeout': 240000,
        //     'appium:safariInitialUrl': 'about:blank',
        //     'appium:safariAllowPopups': true,
        //     'appium:safariIgnoreFraudWarning': true
        // } as any
    ],
    // // Set a base URL for convenient URL navigation
    // baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',

    // Default timeout for all waitFor* commands
    waitforTimeout: 10000,

    // Mobile Web specific hooks
    onPrepare: function (config, capabilities) {
        console.log('🚀 Starting Mobile Web Testing...');
        console.log('📱 Capabilities:', JSON.stringify(capabilities, null, 2));
    },

    onComplete: function (exitCode, config, capabilities, results) {
        console.log('✅ Mobile Web Testing completed with exit code:', exitCode);
    }
});