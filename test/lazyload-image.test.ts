import { is, isNot } from './helpers/assert';
import { lazyLoadImage } from '../src/lazyload-image';

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

});
