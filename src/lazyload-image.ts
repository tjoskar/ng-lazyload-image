import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { getScrollListener } from './scroll-listener';
import { Rect } from './rect';

export function isVisible(element: HTMLElement, threshold = 0, _window = window) {
    const elementBounds = Rect.fromElement(element);
    const windowBounds = Rect.fromWindow(_window);
    elementBounds.inflate(threshold);
    
    return elementBounds.intersectsWith(windowBounds);
}

function loadImage(imagePath: string): Observable<HTMLImageElement> {
    return Observable
        .create(observer => {
            const img = new Image();
            img.src = imagePath;
            img.onload = () => {
                observer.next(imagePath);
                observer.complete();
            };
            img.onerror = err => {
                observer.error(null);
            };
        });
}

function setImage(element: HTMLElement, imagePath: string) {
    const isImgNode = element.nodeName.toLowerCase() === 'img';
    if (isImgNode) {
        (<HTMLImageElement>element).src = imagePath;
    } else {
        element.style.backgroundImage = `url('${imagePath}')`;
    }
    return element;
}

function setLoadedStyle(element: HTMLElement) {
    const styles = element.className
        .split(' ')
        .filter(s => !!s)
        .filter(s => s !== 'ng-lazyloading');
    styles.push('ng-lazyloaded');
    element.className = styles.join(' ');
    return element;
}

export function lazyLoadImage(image: HTMLElement, imagePath: string, defaultImagePath: string, errorImgPath: string, offset: number) {
    if (defaultImagePath) {
        setImage(image, defaultImagePath);
    }
    if (image.className && image.className.includes('ng-lazyloaded')) {
        image.className = image.className.replace('ng-lazyloaded', '');
    }
    return (scrollObservable: Observable<Event>) => {
        return scrollObservable
            .filter(() => isVisible(image, offset))
            .take(1)
            .mergeMap(() => loadImage(imagePath))
            .do(() => setImage(image, imagePath))
            .map(() => true)
            .catch(() => {
                if (errorImgPath) {
                    setImage(image, errorImgPath);
                }
                image.className += ' ng-failed-lazyloaded';
                return Observable.of(false);
            })
            .do(() => setLoadedStyle(image));
    };
}
