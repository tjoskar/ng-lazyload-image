import { isPlatformServer } from '@angular/common';
import { AfterContentInit, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, Optional, Output, PLATFORM_ID } from '@angular/core';
import { Observable, ReplaySubject, Subscription, never } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { createHooks } from './hooks-factory';
import { lazyLoadImage } from './lazyload-image';
import { Attributes, HookSet, ModuleOptions, StateChange } from './types';
import { getNavigator } from './util';

@Directive({
  selector: '[lazyLoad]'
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
  @Output() onLoad: EventEmitter<boolean> = new EventEmitter(); // @deprecated use `onStateChange` instead.
  private propertyChanges$: ReplaySubject<Attributes>;
  private elementRef: ElementRef;
  private ngZone: NgZone;
  private loadSubscription?: Subscription;
  private debugSubscription?: Subscription;
  private hooks: HookSet<any>;
  private platformId: Object;

  constructor(el: ElementRef, ngZone: NgZone, @Inject(PLATFORM_ID) platformId: Object, @Optional() @Inject('options') options?: ModuleOptions) {
    this.elementRef = el;
    this.ngZone = ngZone;
    this.propertyChanges$ = new ReplaySubject();
    this.platformId = platformId;
    this.hooks = createHooks(platformId, options);
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
      onStateChange: this.onStateChange
    });
  }

  ngAfterContentInit() {
    // Don't do anything if SSR and the user isn't a bot
    if (isPlatformServer(this.platformId) && !this.hooks.isBot(getNavigator(), this.platformId)) {
      return null;
    }

    this.ngZone.runOutsideAngular(() => {
      this.loadSubscription = this.propertyChanges$
        .pipe(
          tap(attributes => attributes.onStateChange.emit({ reason: 'setup' })),
          tap(attributes => this.hooks.setup(attributes)),
          switchMap(attributes => {
            if (!attributes.imagePath) {
              return never();
            }
            return this.hooks.getObservable(attributes).pipe(lazyLoadImage(this.hooks, attributes));
          })
        )
        .subscribe(success => this.onLoad.emit(success));
    });
  }

  ngOnDestroy() {
    this.loadSubscription?.unsubscribe();
    this.debugSubscription?.unsubscribe();
  }
}
