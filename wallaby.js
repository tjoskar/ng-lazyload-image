const path = require('path');
const wallabyWebpack = require('wallaby-webpack');

const webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
        'unit-test.bundle.js',
        'test/helpers/test-helper.js',
        'test/**/*.test.js'
    ],
    module: {
        loaders: [
            {test: /unit-test\.karma\.bundle\.js/, loader: 'null'}
        ]
    },
    devtool: 'source-map'
});

module.exports = () => {

    return {

        files: [
            {pattern: 'test/helpers/test-helper.ts', load: false, instrument: false},
            {pattern: 'unit-test.bundle.js', load: false, instrument: false},
            {pattern: 'unit-test.karma.bundle.js', load: false, instrument: false},
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'test/helpers/**/*.ts', load: false, instrument: false},
            {pattern: 'test/**/*.test.ts', ignore: true}
        ],

        tests: [
            {pattern: 'test/**/*test.ts', load: false}
        ],

        env: {
            kind: 'electron'
        },

        testFramework: 'mocha',

        postprocessor: webpackPostprocessor,

        setup: function() {
            window.__moduleBundler.loadTests();
        },

        debug: true
    };
};
