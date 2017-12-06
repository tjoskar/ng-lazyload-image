import { is, isNot } from './helpers/assert';
import { lazyLoadImage, isVisible } from '../src/lazyload-image';

console.warn = () => undefined;

describe('Lazy load image', () => {

    it('Should set default image if defined', () => {
        // Arrange
        const element = {
            nodeName: {
                toLowerCase: () => 'img',
            },
            src: ''
        };
        const imagePath = 'https://some-path/image.jpg';

        // Act
        const listener = lazyLoadImage(element as any, null, imagePath, null, 0);

        // Assert
        is(element.src, imagePath);
    });

    it('Should not set default image if not defined', () => {
        // Arrange
        const element = {
            nodeName: {
                toLowerCase: () => 'img',
            },
            src: ''
        };
        const imagePath = undefined;

        // Act
        const listener = lazyLoadImage(element as any, null, imagePath, null, 0);

        // Assert
        is(element.src, '');
    });

    describe('isVisible', () => {
        const _window = {
            innerHeight: 1000,
            innerWidth: 1000,
            pageXOffset: 0,
            pageYOffset: 0
        } as any;

        const generateElement = (top, left, height = 300, width = 300): any => ({
            getBoundingClientRect: () => ({
                top,
                left,
                right: left + width,
                bottom: top + height
            })
        });

        it('Should be vissible when top is inside viewport and no offset', () => {
            const element = generateElement(999, 100);

            const result = isVisible(element, 0, _window);

            is(result, true);
        });

        it('Should not be vissible when the image is outside viewport', () => {
            const element = generateElement(1001, 100);

            const result = isVisible(element, 0, _window);

            is(result, false);
        });

        it('Should be vissible when the image is outside viewport but have a offset', () => {
            const element = generateElement(-399, 100);
            debugger;
            const result = isVisible(element, 100, _window);

            is(result, true);
        });

        it('Should not be vissible when the image is inside viewport but have a offset', () => {
            const element = generateElement(901, 100);
            debugger;
            const result = isVisible(element, -100, _window);

            is(result, false);
        });

        it('Should be vissible when the image is inside viewport and have a offset', () => {
            const element = generateElement(899, 100);

            const result = isVisible(element, -100, _window);

            is(result, true);
        });

        it('Should not be vissible when the bottom of the image is inside viewport but have a offset', () => {
            const element = generateElement(-201, 100);

            const result = isVisible(element, -100, _window);

            is(result, false);
        });

        it('Should be vissible when the bottom of the image is inside viewport and have a offset', () => {
            const element = generateElement(-199, 100);
            debugger;
            const result = isVisible(element, -100, _window);

            is(result, true);
        });

        it('Should be vissible when the image is larger than the viewport', () => {
            const element = generateElement(-100, -100, 1200, 1200);
            debugger;
            const result = isVisible(element, 0, _window);

            is(result, true);
        });

        it('Should not be vissible when the image is to the left of the viewport', () => {
            const element = generateElement(100, -301);
            debugger;
            const result = isVisible(element, 0, _window);

            is(result, false);
        });

        it('Should not be vissible when the image is to the right of the viewport', () => {
            const element = generateElement(100, 1001);
            debugger;
            const result = isVisible(element, 0, _window);

            is(result, false);
        });

        it('Should be vissible when the left side is in viewport', () => {
            const element = generateElement(200, 899);
            debugger;
            const result = isVisible(element, -100, _window);

            is(result, true);
        });

        it('Should be vissible when the right side is in viewport', () => {
            const element = generateElement(200, -199);
            debugger;
            const result = isVisible(element, -100, _window);

            is(result, true);
        });

        it('Should be vissible when only left side with no corners is in the viewport', () => {
            const element = generateElement(-100, 500, 1200, 1200);
            debugger;
            const result = isVisible(element, 0, _window);

            is(result, true);
        });

        it('Should be vissible when only top side with no corners is in the viewport', () => {
            const element = generateElement(500, -100, 1200, 1200);
            debugger;
            const result = isVisible(element, 0, _window);

            is(result, true);
        });

        it('Should be vissible when only right side with no corners is in the viewport', () => {
            const element = generateElement(-100, -500, 1200, 1200);
            debugger;
            const result = isVisible(element, 0, _window);

            is(result, true);
        });

        it('Should be vissible when only bottom side with no corners is in the viewport', () => {
            const element = generateElement(-500, -100, 1200, 1200);
            debugger;
            const result = isVisible(element, 0, _window);

            is(result, true);
        });
    });

});
