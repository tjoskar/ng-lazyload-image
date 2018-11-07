import { is } from '@tjoskar/assert';
import { Rect } from '../rect';

describe('Rect', () => {
  it('Should create a correctly sized Rect from a ClientRect object', () => {
    // Arrange
    const element = {
      getBoundingClientRect: () => ({
        left: 100,
        top: 200,
        right: 300,
        bottom: 400
      })
    };

    // Act
    const rect = Rect.fromElement(element as HTMLElement);

    // Assert
    is(rect.left, element.getBoundingClientRect().left);
    is(rect.top, element.getBoundingClientRect().top);
    is(rect.right, element.getBoundingClientRect().right);
    is(rect.bottom, element.getBoundingClientRect().bottom);
  });

  it('Should create a correctly sized Rect from a Window object', () => {
    // Arrange
    const _window = {
      innerWidth: 100,
      innerHeight: 200
    };

    // Act
    const rect = Rect.fromWindow(_window as any);

    // Assert
    is(rect.left, 0);
    is(rect.top, 0);
    is(rect.right, _window.innerWidth);
    is(rect.bottom, _window.innerHeight);
  });

  describe('inflate', () => {
    it('Should inflate correctly with a positive value', () => {
      // Arrange
      const inflateBy = 70;
      const left = 0;
      const top = 0;
      const right = 100;
      const bottom = 100;
      const rect = new Rect(left, top, right, bottom);

      // Act
      rect.inflate(inflateBy);

      // Assert
      is(rect.left, left - inflateBy);
      is(rect.top, top - inflateBy);
      is(rect.right, right + inflateBy);
      is(rect.bottom, bottom + inflateBy);
    });

    it('Should inflate correctly with a negative value', () => {
      // Arrange
      const inflateBy = -70;
      const left = 0;
      const top = 0;
      const right = 100;
      const bottom = 100;
      const rect = new Rect(left, top, right, bottom);

      // Act
      rect.inflate(inflateBy);

      // Assert
      is(rect.left, left - inflateBy);
      is(rect.top, top - inflateBy);
      is(rect.right, right + inflateBy);
      is(rect.bottom, bottom + inflateBy);
    });

    it('Should should not change if 0 is passed', () => {
      // Arrange
      const inflateBy = 0;
      const left = 0;
      const top = 0;
      const right = 100;
      const bottom = 100;
      const rect = new Rect(left, top, right, bottom);

      // Act
      rect.inflate(inflateBy);

      // Assert
      is(rect.left, left);
      is(rect.top, top);
      is(rect.right, right);
      is(rect.bottom, bottom);
    });
  });

  describe('intersectsWith', () => {
    it('Should not be true if first rectangle is on left side without intersecting', () => {
      // Arrange
      const rectA = new Rect(21, 0, 41, 20);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, false);
    });

    it('Should not be true if first rectangle is on top side without intersecting', () => {
      // Arrange
      const rectA = new Rect(0, 21, 20, 41);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, false);
    });

    it('Should not be true if second rectangle is on left side without intersecting', () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(21, 0, 41, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, false);
    });

    it('Should not be true if second rectangle is on top side without intersecting', () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(0, 21, 20, 41);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, false);
    });

    it("Should be true if first rectangle's top left corner is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(10, 10, 30, 30);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it("Should be true if first rectangle's top right corner is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(-10, 10, 10, 30);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it("Should be true if first rectangle's bottom left corner is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(10, -10, 30, 10);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it("Should be true if first rectangle's bottom right corner is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(-10, -10, 10, 10);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });
    ////

    it("Should be true if second rectangle's top left corner is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(10, 10, 30, 30);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it("Should be true if second rectangle's top right corner is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(-10, 10, 10, 30);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it("Should be true if second rectangle's bottom left corner is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(10, -10, 30, 10);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it("Should be true if second rectangle's bottom right corner is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(-10, -10, 10, 10);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it("Should be true if first rectangle's side without corners is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(-10, -10, 10, 30);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it("Shoult be true if second rectangle's side without corners is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(-10, -10, 30, 10);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it('Should be true if first rectangle completely contains second rectangle', () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(5, 5, 15, 15);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });

    it('Should be true if second rectangle completely contains first rectangle', () => {
      // Arrange
      const rectA = new Rect(5, 5, 15, 15);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      is(result, true);
    });
  });

  describe('getIntersectionWith', () => {
    it("Should return a correctly sized Rect if two Rect's intersect horizontally", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(0, 10, 20, 30);

      // Act
      const result = rectA.getIntersectionWith(rectB);

      // Assert
      is(result.top, 10);
      is(result.right, 20);
      is(result.bottom, 20);
      is(result.left, 0);
    });

    it("Should return a correctly sized Rect if two Rect's intersect vertically", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(10, 0, 30, 20);

      // Act
      const result = rectA.getIntersectionWith(rectB);

      // Assert
      is(result.top, 0);
      is(result.right, 20);
      is(result.bottom, 20);
      is(result.left, 10);
    });

    it("Should return a correctly sized Rect if two Rect's intersect corners", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(10, 10, 30, 30);

      // Act
      const result = rectA.getIntersectionWith(rectB);

      // Assert
      is(result.top, 10);
      is(result.right, 20);
      is(result.bottom, 20);
      is(result.left, 10);
    });

    it("Should return an empty Rect if two Rect's don't intersect", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(30, 30, 50, 50);

      // Act
      const result = rectA.getIntersectionWith(rectB);

      // Assert
      is(result.top, 0);
      is(result.right, 0);
      is(result.bottom, 0);
      is(result.left, 0);
    });
  });
});
