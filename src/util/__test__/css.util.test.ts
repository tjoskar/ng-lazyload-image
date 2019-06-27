import {
    addCssClassName,
    hasCssClassName,
    removeCssClassName
} from '../css.util';

describe('Utils function', () => {
    const element = {} as HTMLImageElement;

    beforeEach(() => {
        element.className = 'test1 test2';
    });

    it('Should remove css class name', () => {
        const expectCssClassName = 'test1 ';
        removeCssClassName(element, 'test2');

        expect(element.className).toBe(expectCssClassName);
    });

    it('Should add css class name', () => {
        const expectCssClassName = 'test1 test2 test3';
        addCssClassName(element, 'test3');

        expect(element.className).toBe(expectCssClassName);
    });

    it('Should not add css class name, because it already exists', () => {
        const expectCssClassName = 'test1 test2';
        addCssClassName(element, 'test2');

        expect(element.className).toBe(expectCssClassName);
    });

    it('Should return true when element contains the class name', () => {
        const result = hasCssClassName(element, 'test2');

        expect(result).toBe(true);
    });

    it(`Should return false when element don't contains the class name`, () => {
        const result = hasCssClassName(element, 'test3');

        expect(result).toBe(false);
    });
});
