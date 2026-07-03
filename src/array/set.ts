type Selector<T, TKey> = (item: T) => TKey

/**
 * Restituisce un nuovo array senza elementi duplicati.
 */
export function distinct<T>(
    this: T[]
): T[] {
    return [...new Set(this)]
}

/**
 * Restituisce un nuovo array senza elementi duplicati in base alla chiave specificata.
 */
export function distinctBy<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): T[] {
    const result: T[] = []
    const keys = new Set<TKey>()

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        const key = selector(item)

        if (!keys.has(key)) {
            keys.add(key)
            result.push(item)
        }
    }

    return result
}

/**
 * Restituisce l'unione tra due array.
 */
export function union<T>(
    this: T[],
    other: T[]
): T[] {
    const result = [...this]

    for (let i = 0; i < other.length; i++) {
        if (!result.includes(other[i])) {
            result.push(other[i])
        }
    }

    return result
}

/**
 * Restituisce gli elementi presenti in entrambi gli array.
 */
export function intersect<T>(
    this: T[],
    other: T[]
): T[] {
    const result: T[] = []

    for (let i = 0; i < this.length; i++) {
        if (other.includes(this[i])) {
            result.push(this[i])
        }
    }

    return result.distinct()
}

/**
 * Restituisce gli elementi presenti nell'array corrente ma non nell'altro.
 */
export function except<T>(
    this: T[],
    other: T[]
): T[] {
    const result: T[] = []

    for (let i = 0; i < this.length; i++) {
        if (!other.includes(this[i])) {
            result.push(this[i])
        }
    }

    return result
}

/**
 * Restituisce l'unione tra due array confrontando gli elementi tramite la chiave specificata.
 */
export function unionBy<T, TKey>(
    this: T[],
    other: T[],
    selector: Selector<T, TKey>
): T[] {
    const result = [...this]
    const keys = new Set<TKey>()

    for (let i = 0; i < this.length; i++) {
        keys.add(selector(this[i]))
    }

    for (let i = 0; i < other.length; i++) {
        const item = other[i]
        const key = selector(item)

        if (!keys.has(key)) {
            keys.add(key)
            result.push(item)
        }
    }

    return result
}

/**
 * Restituisce gli elementi presenti in entrambi gli array confrontando la chiave specificata.
 */
export function intersectBy<T, TKey>(
    this: T[],
    other: T[],
    selector: Selector<T, TKey>
): T[] {
    const result: T[] = []
    const otherKeys = new Set<TKey>()
    const usedKeys = new Set<TKey>()

    for (let i = 0; i < other.length; i++) {
        otherKeys.add(selector(other[i]))
    }

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        const key = selector(item)

        if (otherKeys.has(key) && !usedKeys.has(key)) {
            usedKeys.add(key)
            result.push(item)
        }
    }

    return result
}

/**
 * Restituisce gli elementi dell'array corrente le cui chiavi non sono presenti nell'altro array.
 */
export function exceptBy<T, TKey>(
    this: T[],
    other: T[],
    selector: Selector<T, TKey>
): T[] {
    const result: T[] = []
    const otherKeys = new Set<TKey>()

    for (let i = 0; i < other.length; i++) {
        otherKeys.add(selector(other[i]))
    }

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        const key = selector(item)

        if (!otherKeys.has(key)) {
            result.push(item)
        }
    }

    return result
}
