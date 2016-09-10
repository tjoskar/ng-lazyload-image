const karmaDefault = require('./karma.default');

module.exports = config => {
    config.set(Object.assign({}, karmaDefault(config)));
};
