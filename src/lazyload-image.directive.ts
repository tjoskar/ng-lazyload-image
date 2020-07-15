import { AfterContentInit, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, Output, PLATFORM_ID } from '@angular/core';
import { never, Observable, ReplaySubject, Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { lazyLoadImage } from './lazyload-image';
import { LAZYLOAD_IMAGE_HOOKS } from './token';
import { Attributes, Hooks, StateChange } from './types';

@Directive({
  selector: '[lazyLoad]',
})
export class LazyLoadImageDirective implements OnChanges, AfterContentInit, OnDestroy {
  @Input('lazyLoad') lazyImage!: string; // The image to be lazy loaded
  @Input() defaultImage?: string; // The image to be displayed before lazyImage is loaded
  @Input() errorImage?: string; // The image to be displayed if lazyImage load fails
  @Input() scrollTarget?: any; // Scroll container that contains the image and emits scoll events
  @Input() customObservable?: Observable<any>; // Pass your own event emitter
  @Input() offset?: number; // The number of px a image should be loaded before it is in view port
  @Input() useSrcset?: boolean; // Whether srcset attribute should be used instead of src
  @Input() decode?: boolean; // Decode the image before appending to the DOM
  @Input() debug?: boolean; // Will print some debug info when `true`
  @Output() onStateChange: EventEmitter<StateChange> = new EventEmitter(); // Emits an event on every state change
  private propertyChanges$: ReplaySubject<Attributes>;
  private elementRef: ElementRef;
  private ngZone: NgZone;
  private loadSubscription?: Subscription;
  private debugSubscription?: Subscription;
  private hooks: Hooks;
  private uid: string;

  constructor(el: ElementRef, ngZone: NgZone, @Inject(PLATFORM_ID) platformId: Object, @Inject(LAZYLOAD_IMAGE_HOOKS) hooks: Hooks) {
    this.elementRef = el;
    this.ngZone = ngZone;
    this.propertyChanges$ = new ReplaySubject();
    this.hooks = hooks;
    this.hooks.setPlatformId(platformId);
    this.uid = Math.random().toString(36).substr(2, 9);
  }

  ngOnChanges() {
    if (this.debug === true && !this.debugSubscription) {
      this.debugSubscription = this.onStateChange.subscribe((e: StateChange) => console.log(e));
    }

    this.propertyChanges$.next({
      element: this.elementRef.nativeElement,
      imagePath: this.lazyImage,
      defaultImagePath: this.defaultImage,
      errorImagePath: this.errorImage,
      useSrcset: this.useSrcset,
      offset: this.offset ? this.offset | 0 : 0,
      scrollContainer: this.scrollTarget,
      customObservable: this.customObservable,
      decode: this.decode,
      onStateChange: this.onStateChange,
      id: this.uid,
    });
  }

  ngAfterContentInit() {
    if (this.hooks.isDisabled()) {
      return null;
    }

    this.ngZone.runOutsideAngular(() => {
      this.loadSubscription = this.propertyChanges$
        .pipe(
          tap((attributes) => this.hooks.onAttributeChange(attributes)),
          tap((attributes) => attributes.onStateChange.emit({ reason: 'setup' })),
          tap((attributes) => this.hooks.setup(attributes)),
          switchMap((attributes) => {
            if (!attributes.imagePath) {
              return never();
            }
            return this.hooks.getObservable(attributes).pipe(lazyLoadImage(this.hooks, attributes));
          })
        )
        .subscribe({
          next: () => null,
        });
    });
  }

  ngOnDestroy() {
    this.propertyChanges$
      .pipe(take(1))
      .subscribe({ next: (attributes) => this.hooks.onDestroy(attributes) })
      .unsubscribe();
    this.loadSubscription?.unsubscribe();
    this.debugSubscription?.unsubscribe();
  }
}
