// Include all modules that we need to execute the test cases

Error.stackTraceLimit = 5;
require('core-js/es7/reflect');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');

if (window.__karma__) {
    require('./unit-test.karma.bundle');
}
