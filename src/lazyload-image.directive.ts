import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Directive, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[lazyLoad]'
})
class LazyLoadImageDirective {
    @Input('lazyLoad') lazyImage;
    @Input('src') defaultImg;
    @Input() set scrollTarget(target) {
        this._scrollTarget = target || this._scrollTarget;
    };
    @Input() offset;
    _scrollTarget = window;
    elementRef: ElementRef;
    scrollSubscription;

    constructor(el: ElementRef) {
        this.elementRef = el;
    }

    ngAfterContentInit() {
        this.scrollSubscription = Observable
            .merge(
                Observable.of(1), // Fake a scroll event
                Observable.fromEvent(this._scrollTarget, 'scroll')
            )
            .sampleTime(100)
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
        return (
            (rect.top >= -threshold || rect.bottom >= -threshold) &&
            rect.left >= 0 &&
            (rect.bottom - rect.height - threshold) <= window.innerHeight &&
            (rect.right - rect.width - threshold) <= window.innerWidth
        );
    }

    ngOnDestroy() {
        [this.scrollSubscription]
            .filter(subscription => subscription && !subscription.isUnsubscribed)
            .forEach(subscription => subscription.unsubscribe());
    }
}

export {LazyLoadImageDirective};
export default LazyLoadImageDirective;
