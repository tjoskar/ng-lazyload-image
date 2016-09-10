const path = require('path');
const wallabyWebpack = require('wallaby-webpack');

const webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
        'unit-test.bundle.js',
        'test/**/*.test.js'
    ]
});

module.exports = () => {

    return {

        files: [
            {pattern: 'test/helpers/test-helper.ts', load: false},
            {pattern: 'unit-test.bundle.js', load: false},
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'test/**/*.ts', load: false},
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
