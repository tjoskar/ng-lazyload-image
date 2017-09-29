import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { getScrollListener } from './scroll-listener';

export function isVisible(element: HTMLElement, threshold = 0, _window = window) {
    const { top, bottom, left, right } = element.getBoundingClientRect();
    const height = _window.innerHeight;
    const width = _window.innerWidth;
    // Is the element in viewport but larger then viewport itself
    const elementLargerThenViewport = top <= -threshold && bottom >= (height + threshold) && left <= -threshold && right >= (width + threshold);
    // Is the top of the element in the viewport
    const topInsideViewport = top <= (height + threshold) && top >= -threshold;
    // Is the bottom of the element in the viewport
    const bottomInsideViewport = bottom >= -threshold && bottom <= (height + threshold);
    // Is the right side of the element in the viewport
    const rightsideInViewport = right >= -threshold && right <= (width + threshold);
    // Is the left side of the element is the viewport
    const leftsideInViewport = left <= (width + threshold) && left >= -threshold;

    return (
        elementLargerThenViewport ||
        ((topInsideViewport || bottomInsideViewport) &&
        (rightsideInViewport || leftsideInViewport))
    );
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
