import type { Options } from '@wdio/types';

export const config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    port: 4723,
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // of the configuration file being run.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // The path of the spec files will be resolved relative from the directory of
    // of the config file unless it's absolute.
    //
    specs: [
        './tests/features/**/login.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
    capabilities: [{
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'Android',
        browserName: 'Chrome',

        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '15.0',
        'appium:automationName': 'UiAutomator2',
        'appium:chromedriverAutodownload': true,
        'appium:chromedriverChromeMappingFile': './chromedriver-mapping.json',
        'appium:udid': 'emulator-5554',
        // Additional Appium options to ensure proper connection
        'appium:newCommandTimeout': 300,
        'appium:connectHardwareKeyboard': true,
        'appium:noReset': true,
        'appium:fullReset': false,
        // Chrome options for Appium (use only appium:chromeOptions for mobile web testing)
        'appium:chromeOptions': {
            w3c: false,
            args: [
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-web-security',
                '--remote-debugging-port=0'
            ]
        }
    } as any],

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/lighthouse-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    // baseUrl: 'http://localhost:8080',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['appium', 'visual'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',

    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        ['json', {
            outputDir: './test-results',
            outputFileFormat: function(options: any) {
                return `results-${options.cid}.json`;
            }
        }],
        ['junit', {
            outputDir: './test-results',
            outputFileFormat: function(options: any) {
                return `results-${options.cid}.xml`;
            }
        }],
        ['html-nice', {
            outputDir: './test-results/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Execution Report',
            linkScreenshots: true,
            showInBrowser: false,
            collapseTests: false,
            useOnAfterCommandForScreenshot: false
        }]
    ],

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./tests/step-definitions/*.steps.ts'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> Only execute the scenarios with name matching the expression (repeatable).
        name: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false,
        // Cucumber formatters for generating test results
        format: [
            'pretty',
            ['json', './test-results/cucumber-report.json'],
            ['html', './test-results/cucumber-report.html'],
            ['junit', './test-results/cucumber-junit.xml'],

            ['@cucumber/pretty-formatter', './test-results/cucumber-pretty.txt'],
            ['rerun', './test-results/rerun.txt']
        ],
        // Publish results to Cucumber Reports (optional)

        publish: false
    },


    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        const fs = require('fs');
        const path = require('path');
        
        // Clean up previous test results
        const resultsDir = './test-results';
        const allureResultsDir = './allure-results';
        const allureReportDir = './allure-report';
        
        // Remove existing result directories
        [resultsDir, allureResultsDir, allureReportDir].forEach(dir => {
            if (fs.existsSync(dir)) {
                fs.rmSync(dir, { recursive: true, force: true });
                console.log(`Cleaned up previous results: ${dir}`);
            }
        });
        
        // Create fresh result directories
        [resultsDir, `${resultsDir}/html-reports`].forEach(dir => {
            fs.mkdirSync(dir, { recursive: true });
        });
        
        console.log('Test result directories prepared for new execution');
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialize specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {string} cid      capability id (e.g 0-0)
     * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {object} specs    specs to be run in the worker process
     * @param  {object} args     object that will be merged with the main configuration once worker is initialized
     * @param  {object} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just after a worker process has exited.
     * @param  {string} cid      capability id (e.g 0-0)
     * @param  {number} exitCode 0 - success, 1 - fail
     * @param  {object} specs    specs to be run in the worker process
     * @param  {number} retries  number of retries used
     */
    // onWorkerEnd: function (cid, exitCode, specs, retries) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {string} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {string} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Cucumber Hooks
     *
     * Runs before a Cucumber Feature.
     * @param {string}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // beforeFeature: function (uri, feature) {
    // },
    /**
     *
     * Runs before a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
     * @param {object}                 context  Cucumber World object
     */
    // beforeScenario: function (world, context) {
    // },
    /**
     *
     * Runs before a Cucumber Step.
     * @param {Pickle.IPickleStep} step     step data
     * @param {IPickle}            scenario scenario pickle
     * @param {object}             context  Cucumber World object
     */
    // beforeStep: function (step, scenario, context) {
    // },
    /**
     *
     * Runs after a Cucumber Step.
     * @param {Pickle.IPickleStep} step             step data
     * @param {IPickle}            scenario         scenario pickle
     * @param {object}             result           results object containing scenario results
     * @param {boolean}            result.passed    true if scenario has passed
     * @param {string}             result.error     error stack if scenario failed
     * @param {number}             result.duration  duration of scenario in milliseconds
     * @param {object}             context          Cucumber World object
     */
    // afterStep: function (step, scenario, result, context) {
    // },
    /**
     *
     * Runs after a Cucumber Scenario.
     * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
     * @param {object}                 result           results object containing scenario results
     * @param {boolean}                result.passed    true if scenario has passed
     * @param {string}                 result.error     error stack if scenario failed
     * @param {number}                 result.duration  duration of scenario in milliseconds
     * @param {object}                 context          Cucumber World object
     */
    // afterScenario: function (world, result, context) {
    // },
    /**
     *
     * Runs after a Cucumber Feature.
     * @param {string}                   uri      path to feature file
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    // afterFeature: function (uri, feature) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {string} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {number} result 0 - command success, 1 - command error
     * @param {object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {object} exitCode 0 - success, 1 - fail
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    
    // onComplete: function(exitCode, config, capabilities, results) {
    //     const fs = require('fs');
    //     const path = require('path');
        
    //     // Ensure test-results directory exists
    //     const resultsDir = './test-results';
    //     if (!fs.existsSync(resultsDir)) {
    //         fs.mkdirSync(resultsDir, { recursive: true });
    //     }
        
    //     // Generate consolidated test summary
    //     const summary = {
    //         timestamp: new Date().toISOString(),
    //         exitCode: exitCode,
    //         totalSpecs: results.specs?.length || 0,
    //         totalTests: results.tests || 0,
    //         passed: results.passed || 0,
    //         failed: results.failed || 0,
    //         skipped: results.skipped || 0,
    //         duration: results.duration || 0,
    //         capabilities: capabilities,
    //         specs: results.specs || []
    //     };
        
    //     // Write summary to JSON file
    //     const summaryPath = path.join(resultsDir, 'test-summary.json');
    //     fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
        
    //     // Log test completion status
    //     console.log('\n=== TEST EXECUTION COMPLETED ===');
    //     console.log(`Exit Code: ${exitCode}`);
    //     console.log(`Total Tests: ${summary.totalTests}`);
    //     console.log(`Passed: ${summary.passed}`);
    //     console.log(`Failed: ${summary.failed}`);
    //     console.log(`Skipped: ${summary.skipped}`);
    //     console.log(`Duration: ${summary.duration}ms`);
    //     console.log(`\nTest results saved to: ${resultsDir}`);
    //     console.log('================================\n');
        
    //     // Generate Cucumber summary report
    //     if (fs.existsSync('./test-results/cucumber-report.json')) {
    //         console.log('\nProcessing Cucumber JSON report...');
    //         try {
    //             const cucumberJsonPath = './test-results/cucumber-report.json';
    //             const cucumberSummaryPath = './test-results/cucumber-summary.json';
                
    //             // Read and process the JSON report
    //             const cucumberData = JSON.parse(fs.readFileSync(cucumberJsonPath, 'utf8'));
                
    //             // Generate summary statistics
    //             let totalScenarios = 0;
    //             let passedScenarios = 0;
    //             let failedScenarios = 0;
    //             let skippedScenarios = 0;
                
    //             cucumberData.forEach((feature: any) => {
    //                 if (feature.elements) {
    //                     feature.elements.forEach((scenario: any) => {
    //                         totalScenarios++;
    //                         const steps = scenario.steps || [];
    //                         const hasFailedStep = steps.some((step: any) => step.result && step.result.status === 'failed');
    //                         const hasSkippedStep = steps.some((step: any) => step.result && step.result.status === 'skipped');
                            
    //                         if (hasFailedStep) {
    //                             failedScenarios++;
    //                         } else if (hasSkippedStep) {
    //                             skippedScenarios++;
    //                         } else {
    //                             passedScenarios++;
    //                         }
    //                     });
    //                 }
    //             });
                
    //             const cucumberSummary = {
    //                 timestamp: new Date().toISOString(),
    //                 totalFeatures: cucumberData.length,
    //                 totalScenarios,
    //                 passedScenarios,
    //                 failedScenarios,
    //                 skippedScenarios,
    //                 successRate: totalScenarios > 0 ? ((passedScenarios / totalScenarios) * 100).toFixed(2) + '%' : '0%'
    //             };
                
    //             fs.writeFileSync(cucumberSummaryPath, JSON.stringify(cucumberSummary, null, 2));
    //             console.log(`Cucumber summary generated at: ${cucumberSummaryPath}`);
    //         } catch (error: any) {
    //             console.log('Warning: Could not process Cucumber JSON report:', error?.message || 'Unknown error');
    //         }
    //     }
        
    //     // Generate Allure report if allure-results exist (without opening)
    //     if (fs.existsSync('./allure-results')) {
    //         console.log('\nGenerating Allure report...');
    //         try {
    //             const { execSync } = require('child_process');
    //             // Generate report without opening it automatically
    //             execSync('npx allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
    //             console.log('Allure report generated at: ./allure-report');
    //             console.log('To open the report, run: npm run allure:open');
    //         } catch (error) {
    //             console.log('Note: Install allure-commandline to generate Allure reports: npm install -g allure-commandline');
    //         }
    //     }
        
    //     // Display report locations
    //     console.log('\n=== AVAILABLE REPORTS ===');
    //     if (fs.existsSync('./test-results/cucumber-report.html')) {
    //         console.log('📊 Cucumber HTML Report: ./test-results/cucumber-report.html');
    //     }
    //     if (fs.existsSync('./test-results/cucumber-report.json')) {
    //         console.log('� Cucumber JSON Report: ./test-results/cucumber-report.json');
    //     }
    //     if (fs.existsSync('./test-results/cucumber-summary.json')) {
    //         console.log('📈 Cucumber Summary: ./test-results/cucumber-summary.json');
    //     }
    //     if (fs.existsSync('./allure-report/index.html')) {
    //         console.log('🎯 Allure Report: ./allure-report/index.html');
    //     }
    //     if (fs.existsSync('./test-results/html-reports/report.html')) {
    //         console.log('📋 HTML Nice Report: ./test-results/html-reports/report.html');
    //     }
    //     console.log('==========================');
    // },

    /**
    * Gets executed when a refresh happens.
    * @param {string} oldSessionId session ID of the old session
    * @param {string} newSessionId session ID of the new session
    */
    // onReload: function(oldSessionId, newSessionId) {
    // }
    /**
    * Hook that gets executed before a WebdriverIO assertion happens.
    * @param {object} params information about the assertion to be executed
    */
    // beforeAssertion: function(params) {
    // }
    /**
    * Hook that gets executed after a WebdriverIO assertion happened.
    * @param {object} params information about the assertion that was executed, including its results
    */
    // afterAssertion: function(params) {
    // }
}
