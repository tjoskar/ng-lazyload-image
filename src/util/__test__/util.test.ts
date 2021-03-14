import { findSrcSetPath } from '../util';

describe('Find srcset path', () => {
  test('Get first url from a src set', () => {
    // Arrange
    const srcset = 'elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w';

    // Act
    const result = findSrcSetPath(srcset);

    // Assert
    expect(result).toBe('elva-fairy-480w.jpg');
  });

  test('Get first url from a src set with no given size', () => {
    // Arrange
    const srcset = 'elva-fairy-480w.jpg, elva-fairy-800w.jpg 800w';

    // Act
    const result = findSrcSetPath(srcset);

    // Assert
    expect(result).toBe('elva-fairy-480w.jpg');
  });

  test('Get first url from a src', () => {
    // Arrange
    const srcset = 'elva-fairy-480w.jpg';

    // Act
    const result = findSrcSetPath(srcset);

    // Assert
    expect(result).toBe('elva-fairy-480w.jpg');
  });
});
