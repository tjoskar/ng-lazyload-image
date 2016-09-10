// Include all modules that we need to execute the test cases

Error.stackTraceLimit = 5;
require('core-js/es7/reflect');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');

// Require all modules ending in ".spec" from the
// current directory and all subdirectories
var testContext = require.context('./test', true, /\.test\.ts/);

// For each module, call the context function
// that will require the file and load it up here.
testContext.keys().forEach(testContext);
