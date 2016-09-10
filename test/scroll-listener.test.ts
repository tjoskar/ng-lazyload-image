import { is } from './helpers/assert';
import { expectObservable } from './helpers/marble-testing';
import { getScrollListener } from '../src/scroll-listener';

console.warn = () => undefined;

describe('Scroll listener', () => {

    it('Should return an empty observable', () => {
        // Arrange
        const element = {
            addEventListener: null
        };
        const expected = '|';

        // Act
        const listener = getScrollListener(element);

        expectObservable(listener).toBe(expected);
    });

});
