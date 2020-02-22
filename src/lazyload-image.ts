import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { Attributes, HookSet } from './types';

export function lazyLoadImage<E>(hookSet: HookSet<E>, attributes: Attributes) {
  return (evntObservable: Observable<E>): Observable<boolean> => {
    return evntObservable.pipe(
      tap(data => attributes.onStateChange.emit({ reason: 'observer-emit', data })),
      filter(event =>
        hookSet.isVisible({
          element: attributes.element,
          event: event,
          offset: attributes.offset,
          scrollContainer: attributes.scrollContainer
        })
      ),
      take(1),
      tap(() => attributes.onStateChange.emit({ reason: 'start-loading' })),
      mergeMap(() => hookSet.loadImage(attributes)),
      tap(() => attributes.onStateChange.emit({ reason: 'mount-image' })),
      tap(imagePath =>
        hookSet.setLoadedImage({
          element: attributes.element,
          imagePath,
          useSrcset: attributes.useSrcset
        })
      ),
      tap(() => attributes.onStateChange.emit({ reason: 'loading-succeeded' })),
      map(() => true),
      catchError(error => {
        attributes.onStateChange.emit({ reason: 'loading-failed', data: error });
        hookSet.setErrorImage(attributes);
        return of(false);
      }),
      tap(() => {
        attributes.onStateChange.emit({ reason: 'finally' });
        hookSet.finally(attributes);
      })
    ) as Observable<boolean>;
  };
}
