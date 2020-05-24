import { IntersectionObserverHooks } from '../hooks';

describe('isVisible', () => {
  it('Should be visible if isIntersecting is true', () => {
    // Arrange
    const hooks = new IntersectionObserverHooks();
    const event = {
      isIntersecting: true,
    };

    // Act
    const result = hooks.isVisible(event);

    // Assert
    expect(result).toBe(true);
  });

  it('Should not be visible if isIntersecting is false', () => {
    // Arrange
    const hooks = new IntersectionObserverHooks();
    const event = {
      isIntersecting: false,
    };

    // Act
    const result = hooks.isVisible(event);

    // Assert
    expect(result).toBe(false);
  });
});
