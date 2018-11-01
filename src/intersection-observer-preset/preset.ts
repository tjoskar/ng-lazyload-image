import { sharedPreset } from "../shared-preset/preset";
import { Attributes, GetObservableFn, HookSet, IsVisibleFn } from "../types";
import { getIntersectionObserver } from "./intersection-listener";

const isVisible: IsVisibleFn<IntersectionObserverEntry> = ({ event }) => {
    return event.isIntersecting;
}

const getObservable: GetObservableFn<IntersectionObserverEntry> = (attributes: Attributes) => {
    if (attributes.scrollObservable) {
        return attributes.scrollObservable;
    }
    return getIntersectionObserver(attributes);
}

export const intersectionObserverPreset: HookSet<IntersectionObserverEntry> = Object.assign({}, sharedPreset, {
    isVisible,
    getObservable
})
