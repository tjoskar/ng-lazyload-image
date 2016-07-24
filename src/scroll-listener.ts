import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Observable';

const scrollListeners = {};

// Only create one scroll listener per target and share the observable.
// Typical, there will only be one observable
export const getScrollListener = (scrollTarget): Observable<any> => {
    if (scrollTarget in scrollListeners) {
        return scrollListeners[scrollTarget];
    }
    scrollListeners[scrollTarget] = Observable.fromEvent(scrollTarget, 'scroll')
        .sampleTime(100)
        .share()
        .startWith('');
    return scrollListeners[scrollTarget];
};
