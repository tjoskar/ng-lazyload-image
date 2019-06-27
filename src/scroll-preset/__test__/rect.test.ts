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
    expect(rect.left).toBe(element.getBoundingClientRect().left);
    expect(rect.top).toBe(element.getBoundingClientRect().top);
    expect(rect.right).toBe(element.getBoundingClientRect().right);
    expect(rect.bottom).toBe(element.getBoundingClientRect().bottom);
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
    expect(rect.left).toBe(0);
    expect(rect.top).toBe(0);
    expect(rect.right).toBe(_window.innerWidth);
    expect(rect.bottom).toBe(_window.innerHeight);
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
      expect(rect.left).toBe(left - inflateBy);
      expect(rect.top).toBe(top - inflateBy);
      expect(rect.right).toBe(right + inflateBy);
      expect(rect.bottom).toBe(bottom + inflateBy);
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
      expect(rect.left).toBe(left - inflateBy);
      expect(rect.top).toBe(top - inflateBy);
      expect(rect.right).toBe(right + inflateBy);
      expect(rect.bottom).toBe(bottom + inflateBy);
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
      expect(rect.left).toBe(left);
      expect(rect.top).toBe(top);
      expect(rect.right).toBe(right);
      expect(rect.bottom).toBe(bottom);
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
      expect(result).toBe(false);
    });

    it('Should not be true if first rectangle is on top side without intersecting', () => {
      // Arrange
      const rectA = new Rect(0, 21, 20, 41);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(false);
    });

    it('Should not be true if second rectangle is on left side without intersecting', () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(21, 0, 41, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(false);
    });

    it('Should not be true if second rectangle is on top side without intersecting', () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(0, 21, 20, 41);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(false);
    });

    it("Should be true if first rectangle's top left corner is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(10, 10, 30, 30);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it("Should be true if first rectangle's top right corner is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(-10, 10, 10, 30);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it("Should be true if first rectangle's bottom left corner is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(10, -10, 30, 10);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it("Should be true if first rectangle's bottom right corner is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(-10, -10, 10, 10);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });
    ////

    it("Should be true if second rectangle's top left corner is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(10, 10, 30, 30);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it("Should be true if second rectangle's top right corner is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(-10, 10, 10, 30);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it("Should be true if second rectangle's bottom left corner is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(10, -10, 30, 10);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it("Should be true if second rectangle's bottom right corner is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(-10, -10, 10, 10);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it("Should be true if first rectangle's side without corners is inside second rectangle", () => {
      // Arrange
      const rectA = new Rect(-10, -10, 10, 30);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it("Shoult be true if second rectangle's side without corners is inside first rectangle", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(-10, -10, 30, 10);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it('Should be true if first rectangle completely contains second rectangle', () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(5, 5, 15, 15);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
    });

    it('Should be true if second rectangle completely contains first rectangle', () => {
      // Arrange
      const rectA = new Rect(5, 5, 15, 15);
      const rectB = new Rect(0, 0, 20, 20);

      // Act
      const result = rectA.intersectsWith(rectB);

      // Assert
      expect(result).toBe(true);
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
      expect(result.top).toBe(10);
      expect(result.right).toBe(20);
      expect(result.bottom).toBe(20);
      expect(result.left).toBe(0);
    });

    it("Should return a correctly sized Rect if two Rect's intersect vertically", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(10, 0, 30, 20);

      // Act
      const result = rectA.getIntersectionWith(rectB);

      // Assert
      expect(result.top).toBe(0);
      expect(result.right).toBe(20);
      expect(result.bottom).toBe(20);
      expect(result.left).toBe(10);
    });

    it("Should return a correctly sized Rect if two Rect's intersect corners", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(10, 10, 30, 30);

      // Act
      const result = rectA.getIntersectionWith(rectB);

      // Assert
      expect(result.top).toBe(10);
      expect(result.right).toBe(20);
      expect(result.bottom).toBe(20);
      expect(result.left).toBe(10);
    });

    it("Should return an empty Rect if two Rect's don't intersect", () => {
      // Arrange
      const rectA = new Rect(0, 0, 20, 20);
      const rectB = new Rect(30, 30, 50, 50);

      // Act
      const result = rectA.getIntersectionWith(rectB);

      // Assert
      expect(result.top).toBe(0);
      expect(result.right).toBe(0);
      expect(result.bottom).toBe(0);
      expect(result.left).toBe(0);
    });
  });
});
