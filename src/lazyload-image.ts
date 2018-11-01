import {
    filter,
    tap,
    take,
    map,
    mergeMap,
    catchError,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HookSet, Attributes } from './types';

export function lazyLoadImage<E>(hookSet: HookSet<E>, attributes: Attributes) {
    return (scrollObservable: Observable<E>) => {
        return scrollObservable.pipe(
            filter(event => hookSet.isVisible({
                element: attributes.element,
                event: event,
                offset: attributes.offset,
                scrollContainer: attributes.scrollContainer
            })),
            take(1),
            mergeMap(() => hookSet.loadImage(attributes)),
            tap(() => hookSet.setLoadedImage(attributes)),
            map(() => true),
            catchError(() => {
                hookSet.setErrorImage(attributes);
                return of(false);
            }),
            tap(() => hookSet.finally(attributes))
        );
    };
}
