import { Injectable } from '@angular/core';
import { empty, Observable, of, Subject } from 'rxjs';
import { sampleTime, share, startWith } from 'rxjs/operators';
import { SharedHooks } from '../shared-hooks/hooks';
import { Attributes } from '../types';
import { Rect } from './rect';

@Injectable()
export class ScrollHooks extends SharedHooks<Event | string> {
  private readonly getWindow: () => Window;
  private readonly scrollListeners = new WeakMap<any, Observable<any>>();

  constructor(getWindow = () => window) {
    super();
    this.getWindow = getWindow;
  }

  getObservable(attributes: Attributes<Event | string>): Observable<Event | string> {
    if (this.skipLazyLoading()) {
      return of('load');
    } else if (attributes.customObservable) {
      return attributes.customObservable.pipe(startWith(''));
    } else if (attributes.scrollContainer) {
      return this.getScrollListener(attributes.scrollContainer);
    }
    return this.getScrollListener(this.getWindow());
  }

  isVisible(event: Event | string, attributes: Attributes): boolean {
    const elementBounds = Rect.fromElement(attributes.element);
    if (elementBounds === Rect.empty) {
      return false;
    }
    const windowBounds = Rect.fromWindow(this.getWindow());
    elementBounds.inflate(attributes.offset);

    if (attributes.scrollContainer) {
      const scrollContainerBounds = Rect.fromElement(attributes.scrollContainer);
      const intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
      return elementBounds.intersectsWith(intersection);
    } else {
      return elementBounds.intersectsWith(windowBounds);
    }
  }

  sampleObservable<T>(obs: Observable<T>, scheduler?: any): Observable<T | ''> {
    return obs.pipe(sampleTime(100, scheduler), share(), startWith(''));
  }

  // Only create one scroll listener per target and share the observable.
  // Typical, there will only be one observable per application
  getScrollListener = (scrollTarget?: HTMLElement | Window): Observable<Event | ''> => {
    if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
      console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
      return empty();
    }
    const scrollListener = this.scrollListeners.get(scrollTarget);
    if (scrollListener) {
      return scrollListener;
    }

    const srollEvent: Observable<Event> = Observable.create((observer: Subject<Event>) => {
      const eventName = 'scroll';
      const handler = (event: Event) => observer.next(event);
      const options = { passive: true, capture: false };
      scrollTarget.addEventListener(eventName, handler, options);
      return () => scrollTarget.removeEventListener(eventName, handler, options);
    });

    const listener = this.sampleObservable(srollEvent);
    this.scrollListeners.set(scrollTarget, listener);
    return listener;
  };
}
