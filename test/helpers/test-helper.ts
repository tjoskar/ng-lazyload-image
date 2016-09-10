declare var window;

const isEqual = require('lodash.isequal');
import './rx-operations';
import { TestScheduler } from 'rxjs/testing/TestScheduler';

window.rxTestScheduler = null;

const glit = window.it;
const glonly = window.it.only;

function stringifyFrame(x) {
    const value = x.notification.value === undefined ? '' : x.notification.value;
    return `${x.frame}\t${x.notification.kind}\t${value}\t${x.notification.hasValue}`;
}

const assertDeepEqualFrame = function(actual, expected) {
    const equal = isEqual(actual, expected);
    let message = '';
    if (!equal && Array.isArray(actual) && Array.isArray(expected)) {
        message = '\nExpected \n';
        message += 'frame\tkind\tvalue\thasValue\n';
        actual.forEach(x => {
            message += stringifyFrame(x) + '\n';
        });
        message += '\nTo equal \n';
        message += 'frame\tkind\tvalue\thasValue\n';
        expected.forEach(x => {
            message += stringifyFrame(x) + '\n';
        });
    }

    if (!equal) {
        throw new Error(message || 'Frames not equal!');
    }
};

window.it = function(description, cb, timeout) {
    if (cb.length === 0) {
        glit.call(glit, description, function() {
            window.rxTestScheduler = new TestScheduler(assertDeepEqualFrame);
            cb();
            window.rxTestScheduler.flush();
        });
    } else {
        glit.apply(this, arguments);
    }
}.bind(glit);

window.it.asDiagram = function() {
    return window.it;
};

window.it.only = function(description, cb, timeout) {
    if (cb.length === 0) {
        glonly.call(glonly, description, function() {
            window.rxTestScheduler = new TestScheduler(assertDeepEqualFrame);
            cb();
            window.rxTestScheduler.flush();
        });
    } else {
        glonly.apply(this, arguments);
    }
}.bind(glonly);

afterEach(() => {
    window.rxTestScheduler = null;
});
