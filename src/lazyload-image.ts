import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { Attributes, HookSet } from './types';

export function lazyLoadImage<E>(hookSet: HookSet<E>, attributes: Attributes) {
  return (scrollObservable: Observable<E>) => {
    return scrollObservable.pipe(
      filter(event =>
        hookSet.isVisible({
          element: attributes.element,
          event: event,
          offset: attributes.offset,
          scrollContainer: attributes.scrollContainer
        })
      ),
      take(1),
      mergeMap(() => hookSet.loadImage(attributes)),
      tap(imagePath =>
        hookSet.setLoadedImage({
          element: attributes.element,
          imagePath,
          useSrcset: attributes.useSrcset
        })
      ),
      map(() => true),
      catchError(() => {
        hookSet.setErrorImage(attributes);
        return of(false);
      }),
      tap(() => hookSet.finally(attributes))
    );
  };
}
