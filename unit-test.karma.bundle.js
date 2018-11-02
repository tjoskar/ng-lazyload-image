// Require all modules ending in ".test" from the
// current directory and all subdirectories
var testContext = require.context('./src', true, /\.test\.ts/);

// For each module, call the context function
// that will require the file and load it up here.
testContext.keys().forEach(testContext);
