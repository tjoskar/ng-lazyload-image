import { startWith } from 'rxjs/operators';
import { sharedPreset } from '../shared-preset/preset';
import { Attributes, GetObservableFn, HookSet, IsVisibleFn } from '../types';
import { Rect } from './rect';
import { getScrollListener } from './scroll-listener';

export const isVisible: IsVisibleFn<Event | string> = ({ element, offset, scrollContainer }, getWindow = () => window) => {
  const elementBounds = Rect.fromElement(element);
  if (elementBounds === Rect.empty) {
    return false;
  }
  const windowBounds = Rect.fromWindow(getWindow());
  elementBounds.inflate(offset);

  if (scrollContainer) {
    const scrollContainerBounds = Rect.fromElement(scrollContainer);
    const intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
    return elementBounds.intersectsWith(intersection);
  } else {
    return elementBounds.intersectsWith(windowBounds);
  }
};

const getObservable: GetObservableFn<Event | string> = (attributes: Attributes) => {
  if (attributes.customObservable) {
    return attributes.customObservable.pipe(startWith(''));
  }
  if (attributes.scrollContainer) {
    return getScrollListener(attributes.scrollContainer);
  }
  return getScrollListener(window);
};

export const scrollPreset: HookSet<Event | string> = Object.assign({}, sharedPreset, {
  isVisible,
  getObservable
});
