const karmaDefault = require('./karma.default');

module.exports = config => {
    config.set(Object.assign({}, karmaDefault(config), {
        // Webpack please don't spam the console when running in karma!
        webpackServer: { noInfo: true },

        port: 9876,
        colors: false,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true
    }));
};
