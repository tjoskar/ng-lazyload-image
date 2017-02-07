import 'rxjs/add/operator/let';
import {Directive, ElementRef, Input, NgZone, SimpleChanges, OnChanges, OnDestroy} from '@angular/core';
import {getScrollListener} from './scroll-listener';
import {lazyLoadImage} from './lazyload-image';
import {WindowService} from "./window.service";

declare const global: any; // To make AoT compiler (ngc) happy

@Directive({
  selector: '[lazyLoad]'
})
export class LazyLoadImageDirective implements OnChanges, OnDestroy {
  @Input('lazyLoad') lazyImage;   // The image to be lazy loaded
  @Input() errorImage: string;    // The image to be displayed if lazyImage load fails
  @Input() scrollTarget; // Change the node we should listen for scroll events on, default is window
  @Input() scrollObservable;      // Pass your own scroll emitter
  @Input() offset: number;        // The number of px a image should be loaded before it is in view port
  elementRef: ElementRef;
  ngZone: NgZone;
  scrollSubscription;
  window;

  constructor(el: ElementRef, ngZone: NgZone, window: WindowService) {
    this.elementRef = el;
    this.ngZone = ngZone;
    // Get window object, fallback for Universal
    this.window = window.nativeWindow || (<any>global);
    this.scrollTarget = this.window;
  }

  ngOnChanges(changes: SimpleChanges) {

    let chngImg = changes['lazyImage'];
    if (chngImg) {
      let currImg = chngImg.currentValue;
      let prevImg = chngImg.previousValue;

      if (currImg !== prevImg) {
        this.ngZone.runOutsideAngular(() => {
          if (this.scrollObservable) {
            this.scrollSubscription = this.scrollObservable
              .startWith('')
              .let(lazyLoadImage(this.elementRef.nativeElement, currImg, this.errorImage, this.offset, this.window))
              .subscribe(() => {
              });
          } else {
            this.scrollSubscription = getScrollListener(this.scrollTarget)
              .let(lazyLoadImage(this.elementRef.nativeElement, currImg, this.errorImage, this.offset, this.window))
              .subscribe(() => {
              });
          }
        });
      }
    }

  }

  ngOnDestroy() {
    [this.scrollSubscription]
      .filter(subscription => subscription && !subscription.isUnsubscribed)
      .forEach(subscription => subscription.unsubscribe());
  }
}
