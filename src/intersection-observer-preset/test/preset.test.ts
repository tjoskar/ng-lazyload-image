import { is } from '@tjoskar/assert';
import { getObservable, isVisible } from '../preset';

describe('isVisible', () => {
  it('Should be visible if isIntersecting is true', () => {
    // Arrange
    const args = {
      event: {
        isIntersecting: true
      }
    };

    // Act
    const result = isVisible(args as any);

    // Assert
    is(result, true);
  });

  it('Should not be visible if isIntersecting is false', () => {
    // Arrange
    const args = {
      event: {
        isIntersecting: false
      }
    };

    // Act
    const result = isVisible(args as any);

    // Assert
    is(result, false);
  });
});

describe('getObservable', () => {
  it('Should return custom observable if giving one', () => {
    // Arrange
    const observable = {};

    // Act
    const result = (getObservable as any)({ scrollObservable: observable } as any, null);

    // Assert
    is(result, observable);
  });

  it('Should return IntersectionObserver', () => {
    // Arrange
    const observable = {};
    const getIntersectionObserver = () => observable;

    // Act
    const result = (getObservable as any)({} as any, getIntersectionObserver);

    // Assert
    is(result, observable);
  });
});
