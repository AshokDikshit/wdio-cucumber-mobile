import type { Options } from '@wdio/types';
import { sharedConfig, mergeConfigs } from './wdio.shared.conf';

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
                app: process.env.BROWSERSTACK_APP_PATH || 'bs://a74c90f419175b631a82dfc62a1de0950189849e',
                testObservability: true,
                testObservabilityOptions: {
                    buildTag: ['bstack_sample'],
                }
            }
        ]
    ],

    capabilities: [{
        'bstack:options': {
            platformName: 'Android',
            deviceName: 'Google Pixel 8',
            osVersion: "14.0"
        }
    },
{
        'bstack:options': {
            projectName: "BrowserStack Samples",
            buildName: 'browserstack build',
            sessionName: 'BStack parallel webdriverio-appium',
            debug: true,
            networkLogs: true,
            source: 'webdriverio:appium-sample-sdk:v1.0'
        }
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