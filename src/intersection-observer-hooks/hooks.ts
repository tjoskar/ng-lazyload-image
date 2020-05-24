import { Observable, of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SharedHooks } from '../shared-hooks/hooks';
import { Attributes } from '../types';

export class IntersectionObserverHooks extends SharedHooks<{ isIntersecting: boolean }> {
  private readonly observers = new WeakMap<Element | {}, IntersectionObserver>();
  private readonly intersectionSubject = new Subject<IntersectionObserverEntry>();
  private readonly uniqKey = {};

  getObservable(attributes: Attributes<{ isIntersecting: boolean }>) {
    if (this.isBot()) {
      return of({ isIntersecting: true });
    }
    if (attributes.customObservable) {
      return attributes.customObservable;
    }
    const scrollContainerKey = attributes.scrollContainer || this.uniqKey;
    const options: ObserverOptions = {
      root: attributes.scrollContainer || null,
    };
    if (attributes.offset) {
      options.rootMargin = `${attributes.offset}px`;
    }

    let observer = this.observers.get(scrollContainerKey);

    if (!observer) {
      observer = new IntersectionObserver((entrys) => this.loadingCallback(entrys), options);
      this.observers.set(scrollContainerKey, observer);
    }

    observer.observe(attributes.element);

    return Observable.create((obs: Subject<IntersectionObserverEntry>) => {
      const subscription = this.intersectionSubject.pipe(filter((entry) => entry.target === attributes.element)).subscribe(obs);
      return () => {
        subscription.unsubscribe();
        observer!.unobserve(attributes.element);
      };
    });
  }

  isVisible(event: { isIntersecting: boolean }): boolean {
    return event.isIntersecting;
  }

  private loadingCallback(entrys: IntersectionObserverEntry[]) {
    entrys.forEach((entry) => this.intersectionSubject.next(entry));
  }
}

interface ObserverOptions {
  root: Element | null;
  rootMargin?: string;
}
