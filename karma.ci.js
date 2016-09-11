const karmaDefault = require('./karma.default');

module.exports = config => {
    // Browsers to run on Sauce Labs
    const customLaunchers = {
        'SL_Chrome': {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 10',
            version: 'latest'
        },
        'SL_Edge': {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            platform: 'Windows 10',
            version: 'latest'
        },
        'SL_FireFox': {
            base: 'SauceLabs',
            browserName: 'firefox',
            platform: 'Windows 10',
            version: 'latest'
        }
    };

    config.set(Object.assign({}, karmaDefault(config), {
        // Webpack please don't spam the console when running in karma!
        webpackServer: { noInfo: true },

        reporters: ['dots', 'saucelabs'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        sauceLabs: {
            testName: 'Angular lazy load images',
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
            username: process.env.SAUCE_USERNAME,
            accessKey: process.env.SAUCE_ACCESS_KEY,
            startConnect: false
        },
        captureTimeout: 120000,
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        singleRun: true,
        autoWatch: false
    }));
};
