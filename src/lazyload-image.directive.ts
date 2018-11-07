import {
    AfterContentInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Optional,
    Output
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { cretateHooks } from './hooks-factory';
import { lazyLoadImage } from './lazyload-image';
import { Attributes, HookSet, ModuleOptions } from './types';
import { isWindowDefined } from './util';

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
  private propertyChanges$: ReplaySubject<Attributes>;
  private elementRef: ElementRef;
  private ngZone: NgZone;
  private scrollSubscription;
  private hooks: HookSet<any>;

  constructor(el: ElementRef, ngZone: NgZone, @Optional() @Inject('options') options?: ModuleOptions) {
    this.elementRef = el;
    this.ngZone = ngZone;
    this.propertyChanges$ = new ReplaySubject();
    this.hooks = cretateHooks(options);
  }

  ngOnChanges() {
    this.propertyChanges$.next({
      element: this.elementRef.nativeElement,
      imagePath: this.lazyImage,
      defaultImagePath: this.defaultImage,
      errorImagePath: this.errorImage,
      useSrcset: this.useSrcset,
      offset: this.offset | 0,
      scrollContainer: this.scrollTarget,
      scrollObservable: this.scrollObservable
    });
  }

  ngAfterContentInit() {
    // Disable lazy load image in server side
    if (!isWindowDefined()) {
      return null;
    }

    this.ngZone.runOutsideAngular(() => {
      this.scrollSubscription = this.propertyChanges$.pipe(
        tap(attributes => this.hooks.setup(attributes)),
        switchMap(attributes => this.hooks.getObservable(attributes).pipe(lazyLoadImage(this.hooks, attributes)))
      ).subscribe(success => this.onLoad.emit(success));
    });
  }

  ngOnDestroy() {
    [this.scrollSubscription]
      .filter(subscription => subscription && !subscription.isUnsubscribed)
      .forEach(subscription => subscription.unsubscribe());
  }
}
