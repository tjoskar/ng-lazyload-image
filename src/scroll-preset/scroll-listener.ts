import { empty, Observable } from 'rxjs';
import { sampleTime, share, startWith } from 'rxjs/operators';
import { isWindowDefined } from '../util';

const scrollListeners = new WeakMap<any, Observable<any>>();

export function sampleObservable(obs: Observable<any>, scheduler?: any) {
  return obs.pipe(
    sampleTime(100, scheduler),
    share(),
    startWith('')
  );
}

// Only create one scroll listener per target and share the observable.
// Typical, there will only be one observable per application
export const getScrollListener = (scrollTarget): Observable<Event | String> => {
  if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
    if (isWindowDefined()) {
      console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
    }
    return empty();
  }
  if (scrollListeners.has(scrollTarget)) {
    return scrollListeners.get(scrollTarget);
  }

  const srollEvent = Observable.create(observer => {
    const eventName = 'scroll';
    const handler = event => observer.next(event);
    const options = { passive: true, capture: false };
    scrollTarget.addEventListener(eventName, handler, options);
    return () => scrollTarget.removeEventListener(eventName, handler, options);
  });

  const listener = sampleObservable(srollEvent);
  scrollListeners.set(scrollTarget, listener);
  return listener;
};
