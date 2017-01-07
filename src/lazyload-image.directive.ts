import 'rxjs/add/operator/let';
import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { getScrollListener } from './scroll-listener';
import { lazyLoadImage } from './lazyload-image';

@Directive({
    selector: '[lazyLoad]'
})
export class LazyLoadImageDirective {
    @Input('lazyLoad') lazyImage;   // The image to be lazy loaded
    @Input() errorImage;            // The image to be displayed if lazyImage load fails
    @Input() scrollTarget = window; // Chnage the node we should listen for scroll events on, default is window
    @Input() offset: number;        // The number of px a image should be loaded before it is in view port
    elementRef: ElementRef;
    ngZone: NgZone;
    scrollSubscription;

    constructor(el: ElementRef, ngZone: NgZone) {
        this.elementRef = el;
        this.ngZone = ngZone;
    }

    ngAfterContentInit() {
        this.ngZone.runOutsideAngular(() => {
            this.scrollSubscription = getScrollListener(this.scrollTarget)
                .let(lazyLoadImage(this.elementRef.nativeElement, this.lazyImage, this.errorImage, this.offset))
                .subscribe();
        });
    }

    ngOnDestroy() {
        [this.scrollSubscription]
            .filter(subscription => subscription && !subscription.isUnsubscribed)
            .forEach(subscription => subscription.unsubscribe());
    }
}
