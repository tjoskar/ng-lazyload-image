declare var window;

const isEqual = require('lodash.isequal');
import { TestScheduler } from 'rxjs/testing';

const glonly = window.it.only;

function stringifyFrame(x) {
    const value = x.notification.value === undefined ? '' : x.notification.value;
    return `${x.frame}\t${x.notification.kind}\t${value}\t${x.notification.hasValue}`;
}

const assertDeepEqualFrame = function (actual, expected) {
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

export const test = function test(description, cb, timeout) {
    if (cb.length === 0) {
        window.it.call(window.it, description, function () {
            window.rxTestScheduler = new TestScheduler(assertDeepEqualFrame);
            cb();
            window.rxTestScheduler.flush();
        });
    } else {
        window.it.apply(this, arguments);
    }
}.bind(window.it);

export const onlyTest = function onlyTest(description, cb, timeout) {
    if (cb.length === 0) {
        window.it.only.call(window.it.only, description, function () {
            window.rxTestScheduler = new TestScheduler(assertDeepEqualFrame);
            cb();
            window.rxTestScheduler.flush();
        });
    } else {
        window.it.only.apply(this, arguments);
    }
}.bind(window.it.only);

afterEach(() => {
    window.rxTestScheduler = null;
});
