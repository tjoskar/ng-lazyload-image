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
        const left = _window.pageXOffset;
        const top = _window.pageYOffset;
        const right = _window.pageXOffset + _window.innerWidth;
        const bottom = _window.pageYOffset + _window.innerHeight;

        return new Rect(left, top, right, bottom);
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