import { sharedPreset } from '../shared-preset/preset';
import { Attributes, GetObservableFn, HookSet, IsVisibleFn } from '../types';
import { getIntersectionObserver } from './intersection-listener';

export const isVisible: IsVisibleFn<IntersectionObserverEntry> = ({ event }) => {
  return event.isIntersecting;
};

export const getObservable: GetObservableFn<IntersectionObserverEntry> = (attributes: Attributes, _getInterObserver = getIntersectionObserver) => {
  if (attributes.customObservable) {
    return attributes.customObservable;
  }
  return _getInterObserver(attributes);
};

export const intersectionObserverPreset: HookSet<IntersectionObserverEntry> = Object.assign({}, sharedPreset, {
  isVisible,
  getObservable
});
