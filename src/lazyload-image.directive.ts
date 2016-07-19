import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Directive, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const scrollListeners = {};

// Only create one scroll listener per target and share the observable.
// Typical, there will only be one observable
const cretaeScrollListener = (scrollTarget): Observable<any> => {
    if (scrollTarget in scrollListeners) {
        return scrollListeners[scrollTarget];
    }
    scrollListeners[scrollTarget] = Observable.fromEvent(scrollTarget, 'scroll')
        .sampleTime(100)
        .startWith('')
        .do(() => console.log('scroll'))
        .share();
    return scrollListeners[scrollTarget];
};


@Directive({
    selector: '[lazyLoad]'
})
class LazyLoadImageDirective {
    @Input('lazyLoad') lazyImage; // The image to be lazy loaded
    @Input('src') defaultImg;     // The default image, this image will be displayed before the lazy-loded-image has been loaded
    // Chnage the node we should listen for scroll events on, default is window
    _scrollTarget = window;
    @Input() set scrollTarget(target) {
        this._scrollTarget = target || this._scrollTarget;
    };
    @Input() offset: number;      // The number of px a image should be loaded before it is in view port
    elementRef: ElementRef;
    scrollSubscription;

    constructor(el: ElementRef) {
        this.elementRef = el;
    }

    ngAfterContentInit() {
        this.scrollSubscription = cretaeScrollListener(this._scrollTarget)
            .filter(() => this.isVisible())
            .take(1)
            .switchMap(() => this.loadImage(this.lazyImage))
            .map(() => this.setImage(this.lazyImage))
            .finally(() => this.setLoadedStyle())
            .subscribe(
                () => this.ngOnDestroy(),
                error => {
                    this.setImage(this.defaultImg);
                    this.ngOnDestroy();
                }
            );
    }

    loadImage(image) {
        return Observable
            .create(observer => {
                const img = new Image();
                img.src = image;
                img.onload = () => {
                    observer.next(img);
                    observer.complete();
                };
                img.onerror = err => {
                    observer.error(err);
                    observer.complete();
                };
            });
    }

    setImage(image) {
        this.elementRef.nativeElement.src = image;
    }

    setLoadedStyle() {
        const styles = this.elementRef.nativeElement.className
            .split(' ')
            .filter(s => !!s)
            .filter(s => s !== 'ng2-lazyloading');
        styles.push('ng2-lazyloaded');
        this.elementRef.nativeElement.className = styles.join(' ');
    }

    isVisible() {
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        const threshold = (this.offset | 0);
        // Is the element in viewport and lager then viewport
        const elementLagerThenViewport = rect.top <= threshold && rect.bottom >= -threshold;
        // Is the top of the element in the viewport
        const topInsideViewport = rect.top >= 0 && rect.top <= window.innerHeight;
        // Is the bottom of the element in the viewport
        const belowInsideViewport = rect.bottom >= 0 && rect.bottom <= window.innerHeight;
        // Is the right side of the element in the viewport
        const rightsideInViewport = rect.right >= -threshold && (rect.right - threshold) <= window.innerWidth;
        // Is the left side of the element is the viewport
        const leftsideInViewport = rect.left >= -threshold && (rect.left - threshold) <= window.innerWidth;

        return (
            elementLagerThenViewport ||
            ((topInsideViewport || belowInsideViewport) &&
            (rightsideInViewport || leftsideInViewport))
        );
    }

    ngOnDestroy() {
        [this.scrollSubscription]
            .filter(subscription => subscription && !subscription.isUnsubscribed)
            .forEach(subscription => subscription.unsubscribe());
    }
}

export { LazyLoadImageDirective };
export default LazyLoadImageDirective;
