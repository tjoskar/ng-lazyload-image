import 'rxjs/add/operator/let';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { getScrollListener } from './scroll-listener';
import { lazyLoadImage } from './lazyload-image';

const target = typeof window !== 'undefined' ? window : undefined;

interface LazyLoadImageDirectiveProps {
    lazyImage: string;
    defaultImage: string;
    errorImage: string;
    scrollTarget: Object;
    scrollObservable: Observable<Event>;
    offset: number;
    useSrcset: boolean;
}

@Directive({
    selector: '[lazyLoad]'
})
export class LazyLoadImageDirective implements OnChanges, AfterContentInit, OnDestroy {
    @Input('lazyLoad') lazyImage;   // The image to be lazy loaded
    @Input() defaultImage: string;  // The image to be displayed before lazyImage is loaded
    @Input() errorImage: string;    // The image to be displayed if lazyImage load fails
    @Input() scrollTarget = target; // Change the node we should listen for scroll events on, default is window
    @Input() scrollObservable;      // Pass your own scroll emitter
    @Input() offset: number;        // The number of px a image should be loaded before it is in view port
    @Input() useSrcset: boolean;    // Whether srcset attribute should be used instead of src
    @Output() onLoad: EventEmitter<boolean> = new EventEmitter(); // Callback when an image is loaded
    private propertyChanges$: ReplaySubject<LazyLoadImageDirectiveProps>;
    private elementRef: ElementRef;
    private ngZone: NgZone;
    private platformId: string;
    private scrollSubscription;

    constructor(el: ElementRef, ngZone: NgZone) {
        this.elementRef = el;
        this.ngZone = ngZone;
        this.propertyChanges$ = new ReplaySubject();
    }

    ngOnChanges(changes?: SimpleChanges) {
        this.propertyChanges$.next({
            lazyImage: this.lazyImage,
            defaultImage: this.defaultImage,
            errorImage: this.errorImage,
            scrollTarget: this.scrollTarget,
            scrollObservable: this.scrollObservable,
            offset: this.offset,
            useSrcset: this.useSrcset
        });
    }

    ngAfterContentInit() {
        /**
         * Disable lazy load image in server side
         * @see https://github.com/tjoskar/ng-lazyload-image/issues/178
         * @see https://github.com/tjoskar/ng-lazyload-image/issues/183
         */
        if (typeof window === 'undefined') {
            return null;
        }

        this.ngZone.runOutsideAngular(() => {
            let scrollObservable: Observable<Event>;
            if (this.scrollObservable) {
                scrollObservable = this.scrollObservable.startWith('');
            } else {
                scrollObservable = getScrollListener(this.scrollTarget);
            }
            this.scrollSubscription = this.propertyChanges$
                .debounceTime(10)
                .switchMap(props => scrollObservable.let(
                    lazyLoadImage(
                        this.elementRef.nativeElement,
                        props.lazyImage,
                        props.defaultImage,
                        props.errorImage,
                        props.offset,
                        props.useSrcset
                    )
                ))
                .subscribe(success => this.onLoad.emit(success));
        });
    }

    ngOnDestroy() {
        [this.scrollSubscription]
            .filter(subscription => subscription && !subscription.isUnsubscribed)
            .forEach(subscription => subscription.unsubscribe());
    }
}
