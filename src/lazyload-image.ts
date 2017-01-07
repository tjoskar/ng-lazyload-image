import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { getScrollListener } from './scroll-listener';

function isVisible(element: HTMLElement, threshold = 0, _window = window) {
    const rect = element.getBoundingClientRect();
    // Is the element in viewport but larger then viewport itself
    const elementLargerThenViewport = rect.top <= threshold && rect.bottom >= -threshold;
    // Is the top of the element in the viewport
    const topInsideViewport = rect.top >= 0 && rect.top <= _window.innerHeight;
    // Is the bottom of the element in the viewport
    const belowInsideViewport = rect.bottom >= 0 && rect.bottom <= _window.innerHeight;
    // Is the right side of the element in the viewport
    const rightsideInViewport = rect.right >= -threshold && (rect.right - threshold) <= _window.innerWidth;
    // Is the left side of the element is the viewport
    const leftsideInViewport = rect.left >= -threshold && (rect.left - threshold) <= _window.innerWidth;

    return (
        elementLargerThenViewport ||
        ((topInsideViewport || belowInsideViewport) &&
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
                console.log('On Error men OK!');
                observer.next(null);
                observer.complete();
                // observer.error(err);
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
        .filter(s => s !== 'ng2-lazyloading');
    styles.push('ng2-lazyloaded');
    element.className = styles.join(' ');
    return element;
}

export function lazyLoadImage(image: HTMLElement, imagePath: string, errorImgPath: string, offset: number) {
    return (scrollObservable: Observable<Event>) => {
        return scrollObservable
            .do(() => { console.log('Before filter'); })
            .filter(() => isVisible(image, offset))
            .do(() => { console.log('After filter'); })
            .take(1)
            .mergeMap(() => {
                console.log('Inside mergeMap');
                return loadImage(imagePath)
                    .do(img => {
                        if (img) {
                            setImage(image, imagePath);
                        } else {
                            setImage(image, errorImgPath);
                        }
                    })
                    .catch(() => {
                        console.log('Error! 2');
                        if (errorImgPath) {
                            setImage(image, errorImgPath);
                        }
                        return Observable.of(1);
                    });
            })
            // .do(() => setImage(image, imagePath) && console.log('Setting image'))
            // .catch(() => {
            //     console.log('Error!');
            //     if (errorImgPath) {
            //         setImage(image, errorImgPath);
            //     }
            //     return Observable.of(1);
            // })
            .do(() => {
                setLoadedStyle(image);
            });
    };
}
