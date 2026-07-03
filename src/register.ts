const registered = new WeakMap<object, Set<PropertyKey>>()

export function registerPrototypeMethod(
    prototype: object,
    name: PropertyKey,
    implementation: (...args: any[]) => any
): void {
    let methods = registered.get(prototype)

    if (!methods) {
        methods = new Set()
        registered.set(prototype, methods)
    }

    if (methods.has(name)) {
        return
    }

    if (!Object.hasOwn(prototype, name)) {
        Object.defineProperty(prototype, name, {
            value: implementation,
            writable: true,
            configurable: true,
            enumerable: false,
        })
    }

    methods.add(name)
}