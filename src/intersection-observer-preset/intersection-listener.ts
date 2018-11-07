import { empty, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Attributes } from '../types';
import { isWindowDefined } from '../util';

type ObserverOptions = {
  root?: Element;
  rootMargin?: string;
};

const observers = new WeakMap<Element | {}, IntersectionObserver>();

const intersectionSubject = new Subject<IntersectionObserverEntry>();

function loadingCallback(entrys: IntersectionObserverEntry[]) {
  entrys.forEach(entry => intersectionSubject.next(entry));
}

export const getIntersectionObserver = (attributes: Attributes) => {
  if (!attributes.scrollContainer && !isWindowDefined()) {
    return empty();
  }

  const options: ObserverOptions = {
    root: attributes.scrollContainer
  };
  if (attributes.offset) {
    options.rootMargin = `${attributes.offset}px`;
  }

  const scrollContainer = attributes.scrollContainer || window;

  let observer = observers.get(scrollContainer);

  if (!observer) {
    observer = new IntersectionObserver(loadingCallback, options);
    observers.set(scrollContainer, observer);
  }

  observer.observe(attributes.element);

  return Observable.create(obs => {
    const subscription = intersectionSubject.pipe(filter(entry => entry.target === attributes.element)).subscribe(obs);
    return () => {
      subscription.unsubscribe();
      observer.unobserve(attributes.element);
    };
  });
};
