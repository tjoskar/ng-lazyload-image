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
import { cssClassNames } from './constants';

export function isVisible(element: HTMLElement, threshold = 0, _window: Window, scrollContainer?: HTMLElement) {
    const elementBounds = Rect.fromElement(element);
    const windowBounds = Rect.fromWindow(_window);
    elementBounds.inflate(threshold);

    if (scrollContainer) {
        const scrollContainerBounds = Rect.fromElement(scrollContainer);
        const intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
        return elementBounds.intersectsWith(intersection);
    } else {
        return elementBounds.intersectsWith(windowBounds);
    }
}

export function isChildOfPicture(element: HTMLImageElement | HTMLDivElement): boolean {
    return Boolean(element.parentElement && element.parentElement.nodeName.toLowerCase() === 'picture');
}

export function isImageElement(element: HTMLImageElement | HTMLDivElement): element is HTMLImageElement {
    return element.nodeName.toLowerCase() === 'img';
}

function loadImage(element: HTMLImageElement | HTMLDivElement, imagePath: string, useSrcset: boolean): Observable<string> {
    let img: HTMLImageElement;
    if (isImageElement(element) && isChildOfPicture(element)) {
        const parentClone = element.parentNode.cloneNode(true) as HTMLPictureElement;
        img = parentClone.getElementsByTagName('img')[0];
        setSourcesToLazy(img);
        setImage(img, imagePath, useSrcset);
    } else {
        img = new Image();
        if (isImageElement(element) && element.sizes) {
            img.sizes = element.sizes;
        }
        if (useSrcset) {
            img.srcset = imagePath;
        } else {
            img.src = imagePath;
        }
    }

    return Observable
        .create(observer => {
            img.onload = () => {
                observer.next(imagePath);
                observer.complete();
            };
            img.onerror = err => {
                observer.error(null);
            };
        });
}

function setImage(element: HTMLImageElement | HTMLDivElement, imagePath: string, useSrcset: boolean) {
    if (isImageElement(element)) {
        if (useSrcset) {
            element.srcset = imagePath;
        } else {
            element.src = imagePath;
        }
    } else {
        element.style.backgroundImage = `url('${imagePath}')`;
    }
    return element;
}

function setSources(attrName: string) {
    return (image: HTMLImageElement) => {
        const sources = image.parentElement.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            const attrValue = sources[i].getAttribute(attrName);
            if (attrValue) {
                sources[i].srcset = attrValue;
            }
        }
    };
}

const setSourcesToDefault = setSources('defaultImage');
const setSourcesToLazy = setSources('lazyLoad');
const setSourcesToError = setSources('errorImage');

function setImageAndSources(setSourcesFn: (image: HTMLImageElement) => void) {
    return (element: HTMLImageElement | HTMLDivElement, imagePath: string, useSrcset: boolean) => {
        if (isImageElement(element) && isChildOfPicture(element)) {
            setSourcesFn(element);
        }
        if (imagePath) {
            setImage(element, imagePath, useSrcset);
        }
    };
}

const setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
const setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
const setImageAndSourcesToError = setImageAndSources(setSourcesToError);

function setLoadedStyle(element: HTMLImageElement | HTMLDivElement) {
    const styles = element.className
        .split(' ')
        .filter(s => !!s)
        .filter(s => s !== cssClassNames.loading);
    styles.push(cssClassNames.loaded);
    element.className = styles.join(' ');
    return element;
}

export function lazyLoadImage(element: HTMLImageElement | HTMLDivElement, imagePath: string, defaultImagePath: string, errorImgPath: string, offset: number, useSrcset: boolean = false, scrollContainer?: HTMLElement) {
    setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
    if (element.className && element.className.includes(cssClassNames.loaded)) {
        element.className = element.className.replace(cssClassNames.loaded, '');
    }

    return (scrollObservable: Observable<Event>) => {
        return scrollObservable
            .filter(() => isVisible(element, offset, window, scrollContainer))
            .take(1)
            .mergeMap(() => loadImage(element, imagePath, useSrcset))
            .do(() => setImageAndSourcesToLazy(element, imagePath, useSrcset))
            .map(() => true)
            .catch(() => {
                setImageAndSourcesToError(element, errorImgPath, useSrcset);
                element.className += ' ' + cssClassNames.failed;
                return Observable.of(false);
            })
            .do(() => setLoadedStyle(element));
    };
}
