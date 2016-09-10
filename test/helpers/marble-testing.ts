declare var window;

export function hot(marbles: string, values?: any) {
    if (!window.rxTestScheduler) {
        throw 'tried to use hot() in async test';
    }
    return window.rxTestScheduler.createHotObservable(marbles, values);
}

export function cold() {
    if (!window.rxTestScheduler) {
        throw 'tried to use cold() in async test';
    }
    return window.rxTestScheduler.createColdObservable.apply(window.rxTestScheduler, arguments);
}

export function expectObservable(abservable: any) {
    if (!window.rxTestScheduler) {
        throw 'tried to use expectObservable() in async test';
    }
    return window.rxTestScheduler.expectObservable(abservable);
}

export function expectSubscriptions() {
    if (!window.rxTestScheduler) {
        throw 'tried to use expectSubscriptions() in async test';
    }
    return window.rxTestScheduler.expectSubscriptions.apply(window.rxTestScheduler, arguments);
}

export const getRxTestScheduler = () => window.rxTestScheduler;
