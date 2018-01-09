export function isWindowExists() {
    return typeof window !== 'undefined';
}

export const cssClassNames = {
    loaded: 'ng-lazyloaded',
    loading: 'ng-lazyloading',
    failed: 'ng-failed-lazyloaded',
}
