const path = require('path');

module.exports = config => {
    return {
        basePath: '',
        frameworks: ['mocha'],
        exclude: [],
        files: [
            // Only specify one entry point
            // and require all tests in there
            { pattern: './unit-test.bundle.js', watched: false }
        ],
        preprocessors: {
            './test/helpers/test-helper.ts': ['webpack', 'sourcemap'],
            './unit-test.bundle.js': ['webpack', 'sourcemap']
        },

        webpack: {
            devtool: 'inline-source-map',
            mode: 'development',
            resolve: {
                extensions: ['.ts', '.js']
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'source-map-loader',
                        exclude: [
                            // these packages have problems with their sourcemaps
                            path.resolve(__dirname, 'node_modules/rxjs'),
                            path.resolve(__dirname, 'node_modules/@angular')
                        ]
                    },
                    {
                        test: /\.ts$/,
                        loader: 'awesome-typescript-loader',
                        query: {
                            doTypeCheck: false
                        }
                    }
                ],
                noParse: [/zone\.js\/dist\/.+/]
            }
        },

        // Webpack please don't spam the console when running in karma!
        webpackServer: { noInfo: true, stats: 'errors-only' },

        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: true,
        browsers: [
            'Electron'
        ],
        electronOpts: {
            title: 'Yoo boy!',
            show: false
        },
        singleRun: true
    };
};
