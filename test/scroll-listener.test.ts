import { is, isNot } from './helpers/assert';
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

        // Assert
        expectObservable(listener).toBe(expected);
    });

    it('Should return the same observable for the same target', () => {
        // Arrange
        const element = {
            addEventListener: () => ({})
        };

        // Act
        const listener1 = getScrollListener(element);
        const listener2 = getScrollListener(element);

        // Assert
        is(listener1, listener2);
    });

    it('Should return diffrent observables for diffrent target', () => {
        // Arrange
        const element1 = {
            addEventListener: () => ({})
        };
        const element2 = {
            addEventListener: () => ({})
        };

        // Act
        const listener1 = getScrollListener(element1);
        const listener2 = getScrollListener(element2);

        // Assert
        isNot(listener1, listener2);
    });

});
