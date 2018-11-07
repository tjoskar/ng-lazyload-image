export class Rect {
  static empty: Rect = new Rect(0, 0, 0, 0);

  left: number;
  top: number;
  right: number;
  bottom: number;

  constructor(left: number, top: number, right: number, bottom: number) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  static fromElement(element: HTMLElement): Rect {
    const { left, top, right, bottom } = element.getBoundingClientRect();

    if (left === 0 && top === 0 && right === 0 && bottom === 0) {
      return Rect.empty;
    } else {
      return new Rect(left, top, right, bottom);
    }
  }

  static fromWindow(_window: Window): Rect {
    return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
  }

  inflate(inflateBy: number) {
    this.left -= inflateBy;
    this.top -= inflateBy;
    this.right += inflateBy;
    this.bottom += inflateBy;
  }

  intersectsWith(rect: Rect): boolean {
    return rect.left < this.right && this.left < rect.right && rect.top < this.bottom && this.top < rect.bottom;
  }

  getIntersectionWith(rect: Rect): Rect {
    const left = Math.max(this.left, rect.left);
    const top = Math.max(this.top, rect.top);
    const right = Math.min(this.right, rect.right);
    const bottom = Math.min(this.bottom, rect.bottom);

    if (right >= left && bottom >= top) {
      return new Rect(left, top, right, bottom);
    } else {
      return Rect.empty;
    }
  }
}
