export class Rect {
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

    static fromClientRect(clientRect: ClientRect): Rect {
        return new Rect(clientRect.left, clientRect.top, clientRect.right, clientRect.bottom);
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
        return (rect.left < this.right) &&
               (this.left < rect. right) &&
               (rect.top < this.bottom) &&
               (this.top < rect.bottom);
    }
}