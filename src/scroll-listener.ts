import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';

const scrollListeners = {};

// Only create one scroll listener per target and share the observable.
// Typical, there will only be one observable per application
export const getScrollListener = (scrollTarget): Observable<any> => {
    if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
        console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
        return Observable.empty();
    }
    if (scrollTarget in scrollListeners) {
        return scrollListeners[scrollTarget];
    }

    const srollEvent = Observable.create(observer => {
        const eventName = 'scroll';
        const handler = event => observer.next(event);
        const options = { passive: true, capture: false };
        scrollTarget.addEventListener(eventName, handler, options);
        return () => scrollTarget.removeEventListener(eventName, handler, options);
    });

    scrollListeners[scrollTarget] = srollEvent
        .sampleTime(100)
        .share()
        .startWith('');
    return scrollListeners[scrollTarget];
};
