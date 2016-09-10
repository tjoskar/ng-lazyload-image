declare var global;

export function hot(a: string) {
    if (!global.rxTestScheduler) {
        throw 'tried to use hot() in async test';
    }
    return global.rxTestScheduler.createHotObservable(a);
}

export function cold() {
    if (!global.rxTestScheduler) {
        throw 'tried to use cold() in async test';
    }
    return global.rxTestScheduler.createColdObservable.apply(global.rxTestScheduler, arguments);
}

export function expectObservable(abservable: any) {
    if (!global.rxTestScheduler) {
        throw 'tried to use expectObservable() in async test';
    }
    return global.rxTestScheduler.expectObservable(abservable);
}

export function expectSubscriptions() {
    if (!global.rxTestScheduler) {
        throw 'tried to use expectSubscriptions() in async test';
    }
    return global.rxTestScheduler.expectSubscriptions.apply(global.rxTestScheduler, arguments);
}

export const rxTestScheduler = global.rxTestScheduler;
