export function toPromise<T>(fn: T) {
    return new Promise<T>((resolve) => {
        fn
    })
}