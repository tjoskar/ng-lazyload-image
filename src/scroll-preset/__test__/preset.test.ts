import { is } from '@tjoskar/assert';
import { isVisible } from '../preset';

describe('isVisible', () => {
  const getWindow = () =>
    ({
      innerHeight: 1000,
      innerWidth: 1000
    } as any);

  const generateElement = (top, left, height = 300, width = 300): any => ({
    getBoundingClientRect: () => ({
      top,
      left,
      right: left + width,
      bottom: top + height
    })
  });

  it('Should be vissible when top is inside viewport and no offset', () => {
    const attribute = {
      event: undefined,
      element: generateElement(999, 100),
      offset: 0
    };

    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should not be vissible when the image is outside viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(1001, 100),
      offset: 0
    };

    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it('Should be vissible when the image is outside viewport but have a offset', () => {
    const attribute = {
      event: undefined,
      element: generateElement(-399, 100),
      offset: 100
    };

    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should not be vissible when the image is inside viewport but have a offset', () => {
    const attribute = {
      event: undefined,
      element: generateElement(901, 100),
      offset: -100
    };
    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it('Should be vissible when the image is inside viewport and have a offset', () => {
    const attribute = {
      event: undefined,
      element: generateElement(899, 100),
      offset: -100
    };

    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should not be vissible when the bottom of the image is inside viewport but have a offset', () => {
    const attribute = {
      event: undefined,
      element: generateElement(-201, 100),
      offset: -100
    };

    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it('Should be vissible when the bottom of the image is inside viewport and have a offset', () => {
    const attribute = {
      event: undefined,
      element: generateElement(-199, 100),
      offset: -100
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should be vissible when the image is larger than the viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(-100, -100, 1200, 1200),
      offset: 0
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should not be vissible when the image is to the left of the viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(100, -301),
      offset: 0
    };
    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it('Should not be vissible when the image is to the right of the viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(100, 1001),
      offset: 0
    };
    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it('Should be vissible when the left side is in viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(200, 899),
      offset: -100
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should be vissible when the right side is in viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(200, -199),
      offset: -100
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should be vissible when only left side with no corners is in the viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(-100, 500, 1200, 1200),
      offset: 0
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should be vissible when only top side with no corners is in the viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(500, -100, 1200, 1200),
      offset: 0
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should be vissible when only right side with no corners is in the viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(-100, -500, 1200, 1200),
      offset: 0
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it('Should be vissible when only bottom side with no corners is in the viewport', () => {
    const attribute = {
      event: undefined,
      element: generateElement(-500, -100, 1200, 1200),
      offset: 0
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it("Should not be visible when image is horizontally in window's view, but not in scroll-container's", () => {
    const attribute = {
      event: undefined,
      element: generateElement(800, 0, 1200, 1200),
      offset: 0,
      scrollContainer: generateElement(0, 0, 700, 1200)
    };
    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it("Should not be visible when image is vertically in window's view, but not in scroll-container's", () => {
    const attribute = {
      event: undefined,
      element: generateElement(0, 800, 1200, 1200),
      offset: 0,
      scrollContainer: generateElement(0, 0, 1200, 700)
    };
    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it("Should not be visible when image is not in window's view, but is in scroll-container's", () => {
    const attribute = {
      event: undefined,
      element: generateElement(1400, 0, 1200, 1200),
      offset: 0,
      scrollContainer: generateElement(1300, 0, 1200, 1200)
    };
    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it("Should be visible when image is in window's and scroll-container's view", () => {
    const attribute = {
      event: undefined,
      element: generateElement(100, 0, 1200, 1200),
      offset: 0,
      scrollContainer: generateElement(0, 0, 700, 1200)
    };
    const result = isVisible(attribute, getWindow);

    is(result, true);
  });

  it("Should not be visible when image's rect is empty", () => {
    const attribute = {
      event: undefined,
      element: generateElement(0, 0, 0, 0),
      offset: 0
    };
    const result = isVisible(attribute, getWindow);

    is(result, false);
  });

  it("Should not be visible when image's rect is empty and has an offset", () => {
    const attribute = {
      event: undefined,
      element: generateElement(0, 0, 0, 0),
      offset: 100
    };
    const result = isVisible(attribute, getWindow);

    is(result, false);
  });
});
