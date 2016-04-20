exports.config = {
    baseUrl: 'http://localhost:9000/',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    specs: [ 'e2e/**/*.js' ],
    framework: 'jasmine',
    

    capabilities: {
        browserName: 'chrome'
    },

    // Ignore synchronization for angular 2
    onPrepare: () => browser.ignoreSynchronization = true,

    useAllAngular2AppRoots: true
};
