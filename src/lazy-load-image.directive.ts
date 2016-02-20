import {Directive, ElementRef, Input} from 'angular2/core';
import {Observable, Subscription} from 'rxjs';

@Directive({
    selector: '[lazyLoad]'
})
class LazyLoadImageDirective {
    @Input('lazyLoad') lazyImage;
    @Input('src') defaultImg;
    @Input() offset;
    elementRef: ElementRef;
    scrollSubscription: Subscription;
    viewportSize = {
        height: 0,
        width: 0
    };

    constructor(el: ElementRef) {
        this.elementRef = el;
    }

    ngAfterContentInit() {
        this.updateViewportOffset();

        this.scrollSubscription = Observable
            .merge(
                Observable.of(1), // Fake a scroll event
                Observable.fromEvent(window, 'scroll')
            )
            .sampleTime(100)
            .filter(() => this.isVisible())
            .switchMap(() => this.loadImage(this.lazyImage))
            .map(() => this.setImage(this.lazyImage))
            .subscribe(
                () => this.ngOnDestroy(),
                error => {
                    this.setDefaultImage();
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

    setDefaultImage() {
        this.setImage(this.defaultImg);
    }

    isVisible() {
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            (rect.bottom - rect.height) <= this.viewportSize.height &&
            (rect.right - rect.width) <= this.viewportSize.width
        );
    }

    updateViewportOffset() {
        this.viewportSize.height = (window.innerHeight || document.documentElement.clientHeight) + (this.offset | 0);
        this.viewportSize.width = (window.innerWidth || document.documentElement.clientWidth) + (this.offset | 0);
    }

    ngOnDestroy() {
        [this.scrollSubscription]
            .filter(subscription => subscription && !subscription.isUnsubscribed)
            .forEach(subscription => subscription.unsubscribe());
    }
}

export {LazyLoadImageDirective};
export default LazyLoadImageDirective;
