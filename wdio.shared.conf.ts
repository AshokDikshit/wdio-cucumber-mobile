import type { Options } from '@wdio/types';

// Shared configuration for all WebDriverIO test environments
// This contains common properties used across web, mobile-web, and mobile-native configs
export const sharedConfig: Partial<WebdriverIO.Config> = {
    // Runner Configuration
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    // Test Configuration
    logLevel: 'info',
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },

    // Retry and Timeout Configuration
    bail: 0,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // Framework Configuration
    framework: 'cucumber',

    // Shared Cucumber Options
    cucumberOpts: {
        require: [
            './tests/step-definitions/**/*.ts'
        ],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
        format: [
            'json:./reports/cucumber-report.json'
        ]
    },

    // // Shared Services Configuration
    // services: [
    //     [
    //         'appium',
    //         {
    //             command: 'appium',
    //             args: {
    //                 address: 'localhost',
    //                 port: 4723,
    //                 relaxedSecurity: true,
    //                 log: './logs/appium.log'
    //             }
    //         }
    //     ]
    // ],
    // services: ['appium', 'visual'],
    services: ['appium'],
    // Shared Reporters Configuration
    reporters: ['spec'],

    // Shared Hook Functions
    beforeFeature: function (uri, feature) {
        console.log('🎯 Starting feature:', feature.name);
    },

    afterFeature: function (uri, feature) {
        console.log('✅ Feature completed:', feature.name);
    },

    beforeScenario: function (world, context) {
        console.log('🧪 Starting scenario:', world.pickle.name);
    },

    afterScenario: function (world, result, context) {
        if (result.passed) {
            console.log('✅ Scenario passed:', world.pickle.name);
        } else {
            console.log('❌ Scenario failed:', world.pickle.name);
            // Take screenshot on failure if browser is available
            if (typeof (global as any).browser !== 'undefined' && typeof (global as any).browser.saveScreenshot === 'function') {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const screenshotPath = `./screenshots/failed-${timestamp}.png`;
                try {
                    (global as any).browser.saveScreenshot(screenshotPath);
                    console.log('📷 Screenshot saved:', screenshotPath);
                } catch (error: any) {
                    console.log('⚠️  Could not save screenshot:', error?.message || error);
                }
            }
        }
    },

    beforeSession: function (config, capabilities, specs) {
        const cap = capabilities as any;
        console.log('📱 Starting session for:', cap.platformName, cap['appium:deviceName'] || cap.browserName);
        if (cap['appium:app'] || cap['appium:bundleId']) {
            console.log('📦 App:', cap['appium:app'] || cap['appium:bundleId']);
        }
    },

    afterSession: function (config, capabilities, specs) {
        const cap = capabilities as any;
        console.log('📱 Session ended for:', cap.platformName, cap['appium:deviceName'] || cap.browserName);
    }
};

// Utility function to merge configurations
export function mergeConfigs(baseConfig: Partial<WebdriverIO.Config>, ...configs: Partial<WebdriverIO.Config>[]): WebdriverIO.Config {
    return configs.reduce((merged, config) => {
        return {
            ...merged,
            ...config,
            // Deep merge for nested objects
            cucumberOpts: {
                ...merged.cucumberOpts,
                ...config.cucumberOpts
            },
            logLevels: {
                ...merged.logLevels,
                ...config.logLevels
            }
        };
    }, baseConfig) as WebdriverIO.Config;
}