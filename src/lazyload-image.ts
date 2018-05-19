import {
    filter,
    tap,
    take,
    map,
    mergeMap,
    catchError,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { getScrollListener } from './scroll-listener';
import { Rect } from './rect';
import { cssClassNames } from './constants';
import { hasCssClassName, removeCssClassName, addCssClassName } from './utils';

export function isVisible(element: HTMLElement, threshold = 0, _window: Window, scrollContainer?: HTMLElement) {
    const elementBounds = Rect.fromElement(element);
    if (elementBounds === Rect.empty) {
        return false;
    }
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

export function lazyLoadImage(element: HTMLImageElement | HTMLDivElement, imagePath: string, defaultImagePath: string, errorImgPath: string, offset: number, useSrcset: boolean = false, scrollContainer?: HTMLElement) {
    setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);

    if (hasCssClassName(element, cssClassNames.loaded)) {
        removeCssClassName(element, cssClassNames.loaded)
    }

    return (scrollObservable: Observable<Event>) => {
        return scrollObservable.pipe(
            filter(() => isVisible(element, offset, window, scrollContainer)),
            take(1),
            mergeMap(() => loadImage(element, imagePath, useSrcset)),
            tap(() => setImageAndSourcesToLazy(element, imagePath, useSrcset)),
            map(() => true),
            catchError(() => {
                setImageAndSourcesToError(element, errorImgPath, useSrcset);
                addCssClassName(element, cssClassNames.failed);
                return of(false);
            }),
            tap(() => addCssClassName(element, cssClassNames.loaded))
        );
    };
}
