import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Attributes } from '../types';

type ObserverOptions = {
  root: Element | null;
  rootMargin?: string;
};

const observers = new WeakMap<Element | {}, IntersectionObserver>();

const intersectionSubject = new Subject<IntersectionObserverEntry>();

function loadingCallback(entrys: IntersectionObserverEntry[]) {
  entrys.forEach(entry => intersectionSubject.next(entry));
}

const uniqKey = {};

export const getIntersectionObserver = (attributes: Attributes): Observable<IntersectionObserverEntry> => {
  const scrollContainerKey = attributes.scrollContainer || uniqKey;
  const options: ObserverOptions = {
    root: attributes.scrollContainer || null
  };
  if (attributes.offset) {
    options.rootMargin = `${attributes.offset}px`;
  }

  let observer = observers.get(scrollContainerKey);

  if (!observer) {
    observer = new IntersectionObserver(loadingCallback, options);
    observers.set(scrollContainerKey, observer);
  }

  observer.observe(attributes.element);

  return Observable.create((obs: Subject<IntersectionObserverEntry>) => {
    const subscription = intersectionSubject.pipe(filter(entry => entry.target === attributes.element)).subscribe(obs);
    return () => {
      subscription.unsubscribe();
      observer!.unobserve(attributes.element);
    };
  });
};
