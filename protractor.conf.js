exports.config = {
    baseUrl: 'http://localhost:9000/',

    specs: [ 'e2e/**/*.js' ],
    framework: 'jasmine',
    directConnect: true,

    capabilities: {
        browserName: 'chrome'
    },

    // Ignore synchronization for angular 2
    onPrepare: () => browser.ignoreSynchronization = true,

    seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.51.0.jar",

    useAllAngular2AppRoots: true
};
