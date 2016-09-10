
export function is<T>(value: T, expected: T, message?: string) {
    if (value !== expected) {
        throw new Error(message ? message : `${value} is not equal to ${expected}`);
    }
}
