import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, debounceTime, startWith } from 'rxjs/operators';
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
import { isWindowDefined } from './utils';

interface LazyLoadImageDirectiveProps {
    lazyImage: string;
    defaultImage: string;
    errorImage: string;
    scrollTarget: any;
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
    @Input() scrollTarget: any;     // Scroll container that contains the image and emits scoll events
    @Input() scrollObservable;      // Pass your own scroll emitter
    @Input() offset: number;        // The number of px a image should be loaded before it is in view port
    @Input() useSrcset: boolean;    // Whether srcset attribute should be used instead of src
    @Output() onLoad: EventEmitter<boolean> = new EventEmitter(); // Callback when an image is loaded
    private propertyChanges$: ReplaySubject<LazyLoadImageDirectiveProps>;
    private elementRef: ElementRef;
    private ngZone: NgZone;
    private scrollSubscription;
    private debounceTime: any;

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
            offset: this.offset | 0,
            useSrcset: this.useSrcset
        });
    }

    ngAfterContentInit() {
        // Disable lazy load image in server side
        if (!isWindowDefined()) {
            return null;
        }

        this.ngZone.runOutsideAngular(() => {
            let scrollObservable: Observable<Event>;
            if (this.scrollObservable) {
                scrollObservable = this.scrollObservable.pipe(startWith(''));
            } else {
                const windowTarget = isWindowDefined() ? window : undefined;
                scrollObservable = getScrollListener(this.scrollTarget || windowTarget);
            }
            this.scrollSubscription = this.propertyChanges$.pipe(
                this.debounceTime ? this.debounceTime(10) : map(v => { this.debounceTime = debounceTime; return v }),
                switchMap(props => scrollObservable.pipe(
                    lazyLoadImage(
                        this.elementRef.nativeElement,
                        props.lazyImage,
                        props.defaultImage,
                        props.errorImage,
                        props.offset,
                        props.useSrcset,
                        props.scrollTarget
                    )
                ))
            ).subscribe(success => this.onLoad.emit(success));
        });
    }

    ngOnDestroy() {
        [this.scrollSubscription]
            .filter(subscription => subscription && !subscription.isUnsubscribed)
            .forEach(subscription => subscription.unsubscribe());
    }
}
