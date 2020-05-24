import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { Attributes, Hooks } from './types';

export function lazyLoadImage<E>(hooks: Hooks<E>, attributes: Attributes) {
  return (evntObservable: Observable<E>): Observable<boolean> => {
    return evntObservable.pipe(
      tap((data) => attributes.onStateChange.emit({ reason: 'observer-emit', data })),
      filter((event) => hooks.isVisible(event, attributes)),
      take(1),
      tap(() => attributes.onStateChange.emit({ reason: 'start-loading' })),
      mergeMap(() => hooks.loadImage(attributes)),
      tap(() => attributes.onStateChange.emit({ reason: 'mount-image' })),
      tap((imagePath) => hooks.setLoadedImage(imagePath, attributes)),
      tap(() => attributes.onStateChange.emit({ reason: 'loading-succeeded' })),
      map(() => true),
      catchError((error) => {
        attributes.onStateChange.emit({ reason: 'loading-failed', data: error });
        hooks.setErrorImage(error, attributes);
        return of(false);
      }),
      tap(() => {
        attributes.onStateChange.emit({ reason: 'finally' });
        hooks.finally(attributes);
      })
    ) as Observable<boolean>;
  };
}
