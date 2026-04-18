import type { Options } from '@wdio/types';
import { sharedConfig, mergeConfigs } from './wdio.shared.conf';
import * as fs from 'fs';

// Global variable to identify application type for locator management
(global as any).appType = 'native';

// Mobile Native Application Configuration for WebDriverIO
// Supports both local and actual device testing
export const config: WebdriverIO.Config = mergeConfigs(sharedConfig, {
    // Specs patterns
    specs: [
        './tests/features/**/general-store-smoke-tests.feature'
    ],

    user: process.env.BROWSERSTACK_USERNAME || 'ashokdikshit_Sn4umM',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'Rdq1smAQ9b5bP5aNK7Jh',

    hostname: 'hub.browserstack.com',

    services: [
        [
            'browserstack',
            {
                accessibility: false,
                buildIdentifier: '1.0.1',
                browserstackLocal: true,
                opts: { forcelocal: false, localIdentifier: "webdriverio-appium-app-browserstack-repo" },
                app: process.env.BROWSERSTACK_APP_PATH || 'bs://1c6d6ca971416eb8ec16c3ea70bc672bd07c12d2',
                testObservability: true,
                testObservabilityOptions: {
                    buildTag: ['bstack_sample'],
                },
                // Disable Percy if not needed or configure properly
                percy: process.env.PERCY_TOKEN ? {
                    token: process.env.PERCY_TOKEN
                } : false
            }
        ]
    ],

    capabilities: [{
        'bstack:options': {
            projectName: "BrowserStack Samples",
            buildName: 'General Store Smoke Tests - Android',
            sessionName: 'BStack parallel webdriverio-appium',
            debug: true,
            networkLogs: true
        },
        platformName: 'Android',
        'appium:deviceName': 'Samsung Galaxy S22',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BROWSERSTACK_APP_PATH || 'bs://1c6d6ca971416eb8ec16c3ea70bc672bd07c12d2'
    }],

    maxInstances: 10,
    // Exclude patterns
    exclude: [
        // 'path/to/excluded/files'
    ],

    // Mobile Native specific timeout (longer for app startup)
    waitforTimeout: 15000,

    // Mobile Native specific hooks
    onPrepare: function (config, capabilities) {
        console.log('🚀 Starting Mobile Native App Testing...');
        console.log('📱 Capabilities:', JSON.stringify(capabilities, null, 2));

        // Validate app paths exist
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