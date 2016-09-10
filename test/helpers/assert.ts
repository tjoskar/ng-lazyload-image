const equal = (a, b) => a === b;

export function is<T>(value: T, expected: T, message?: string) {
    if (!equal(value, expected)) {
        throw new Error(message ? message : `${value} is not equal to ${expected}`);
    }
}

export function isNot<T>(value: T, expected: T, message?: string) {
    if (equal(value, expected)) {
        throw new Error(message ? message : `${value} is equal to ${expected}`);
    }
}
