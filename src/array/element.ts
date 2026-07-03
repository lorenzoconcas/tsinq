type Predicate<T> = (item: T, index: number) => boolean

/**
 * Restituisce il primo elemento dell'array.
 */
export function first<T>(this: T[]): T | undefined

/**
 * Restituisce il primo elemento che soddisfa la condizione.
 */
export function first<T>(
    this: T[],
    predicate: Predicate<T>
): T | undefined

export function first<T>(
    this: T[],
    predicate?: Predicate<T>
): T | undefined {
    if (!predicate) {
        return this[0]
    }

    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            return this[i]
        }
    }

    return undefined
}

/**
 * Alias di first(predicate).
 */
export function firstWhere<T>(
    this: T[],
    predicate: Predicate<T>
): T | undefined {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            return this[i]
        }
    }

    return undefined
}

/**
 * Restituisce il primo elemento non nullo né undefined.
 */
export function firstNonNull<T>(
    this: (T | null | undefined)[]
): T | undefined {
    for (let i = 0; i < this.length; i++) {
        const value = this[i]

        if (value !== null && value !== undefined) {
            return value
        }
    }

    return undefined
}

/**
 * Restituisce il primo elemento oppure il valore di default.
 */
export function firstOrDefault<T>(
    this: T[],
    defaultValue: T
): T

/**
 * Restituisce il primo elemento che soddisfa la condizione oppure il valore di default.
 */
export function firstOrDefault<T>(
    this: T[],
    predicate: Predicate<T>,
    defaultValue: T
): T

export function firstOrDefault<T>(
    this: T[],
    predicateOrDefault: Predicate<T> | T,
    defaultValue?: T
): T {
    if (typeof predicateOrDefault === 'function') {
        const predicate = predicateOrDefault as Predicate<T>

        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i], i)) {
                return this[i]
            }
        }

        return defaultValue as T
    }

    return this.length > 0
        ? this[0]
        : predicateOrDefault
}



/**
 * Restituisce l'ultimo elemento dell'array.
 */
export function last<T>(this: T[]): T | undefined

/**
 * Restituisce l'ultimo elemento che soddisfa la condizione.
 */
export function last<T>(
    this: T[],
    predicate: Predicate<T>
): T | undefined

export function last<T>(
    this: T[],
    predicate?: Predicate<T>
): T | undefined {
    if (!predicate) {
        return this.length > 0
            ? this[this.length - 1]
            : undefined
    }

    for (let i = this.length - 1; i >= 0; i--) {
        if (predicate(this[i], i)) {
            return this[i]
        }
    }

    return undefined
}

/**
 * Alias di last(predicate).
 */
export function lastWhere<T>(
    this: T[],
    predicate: Predicate<T>
): T | undefined {
    for (let i = this.length - 1; i >= 0; i--) {
        if (predicate(this[i], i)) {
            return this[i]
        }
    }

    return undefined
}
/**
 * Restituisce l'ultimo elemento non nullo né undefined.
 */
export function lastNonNull<T>(
    this: (T | null | undefined)[]
): T | undefined {
    for (let i = this.length - 1; i >= 0; i--) {
        const value = this[i]

        if (value !== null && value !== undefined) {
            return value
        }
    }

    return undefined
}
/**
 * Restituisce l'ultimo elemento oppure il valore di default.
 */
export function lastOrDefault<T>(
    this: T[],
    defaultValue: T
): T

/**
 * Restituisce l'ultimo elemento che soddisfa la condizione oppure il valore di default.
 */
export function lastOrDefault<T>(
    this: T[],
    predicate: Predicate<T>,
    defaultValue: T
): T

export function lastOrDefault<T>(
    this: T[],
    predicateOrDefault: Predicate<T> | T,
    defaultValue?: T
): T {
    if (typeof predicateOrDefault === 'function') {
        const predicate = predicateOrDefault as Predicate<T>

        for (let i = this.length - 1; i >= 0; i--) {
            if (predicate(this[i], i)) {
                return this[i]
            }
        }

        return defaultValue as T
    }

    return this.length > 0
        ? this[this.length - 1]
        : predicateOrDefault
}

/**
 * Restituisce l'unico elemento dell'array oppure undefined.
 * Se gli elementi sono diversi da uno, restituisce undefined.
 */
export function single<T>(this: T[]): T | undefined

/**
 * Restituisce l'unico elemento che soddisfa la condizione oppure undefined.
 * Se gli elementi trovati sono diversi da uno, restituisce undefined.
 */
export function single<T>(
    this: T[],
    predicate: Predicate<T>
): T | undefined

export function single<T>(
    this: T[],
    predicate?: Predicate<T>
): T | undefined {
    let found: T | undefined
    let count = 0

    for (let i = 0; i < this.length; i++) {
        if (!predicate || predicate(this[i], i)) {
            found = this[i]
            count++

            if (count > 1) {
                return undefined
            }
        }
    }

    return found
}

/**
 * Restituisce l'unico elemento oppure il valore di default.
 */
export function singleOrDefault<T>(
    this: T[],
    defaultValue: T
): T

/**
 * Restituisce l'unico elemento che soddisfa la condizione oppure il valore di default.
 */
export function singleOrDefault<T>(
    this: T[],
    predicate: Predicate<T>,
    defaultValue: T
): T

export function singleOrDefault<T>(
    this: T[],
    predicateOrDefault: Predicate<T> | T,
    defaultValue?: T
): T {
    let found: T | undefined
    let count = 0

    if (typeof predicateOrDefault === 'function') {
        const predicate = predicateOrDefault as Predicate<T>

        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i], i)) {
                found = this[i]
                count++

                if (count > 1) {
                    return defaultValue as T
                }
            }
        }

        return found === undefined ? defaultValue as T : found
    }

    for (let i = 0; i < this.length; i++) {
        found = this[i]
        count++

        if (count > 1) {
            return predicateOrDefault
        }
    }

    return found === undefined ? predicateOrDefault : found
}

/**
 * Restituisce l'elemento all'indice specificato oppure undefined.
 */
export function elementAt<T>(
    this: T[],
    index: number
): T | undefined {
    return index >= 0 && index < this.length
        ? this[index]
        : undefined
}

/**
 * Restituisce l'elemento all'indice specificato oppure il valore di default.
 */
export function elementAtOrDefault<T>(
    this: T[],
    index: number,
    defaultValue: T
): T {
    return index >= 0 && index < this.length
        ? this[index]
        : defaultValue
}

/**
 * Restituisce il primo elemento dell'array.
 * Lancia un errore se l'array è vuoto.
 */
export function firstOrThrow<T>(this: T[]): T

/**
 * Restituisce il primo elemento che soddisfa la condizione.
 * Lancia un errore se nessun elemento la soddisfa.
 */
export function firstOrThrow<T>(
    this: T[],
    predicate: Predicate<T>
): T

export function firstOrThrow<T>(
    this: T[],
    predicate?: Predicate<T>
): T {
    if (!predicate) {
        if (this.length === 0) {
            throw new Error('Sequence contains no elements.')
        }

        return this[0]
    }

    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            return this[i]
        }
    }

    throw new Error('No element satisfies the condition.')
}

/**
 * Restituisce l'ultimo elemento dell'array.
 * Lancia un errore se l'array è vuoto.
 */
export function lastOrThrow<T>(this: T[]): T

/**
 * Restituisce l'ultimo elemento che soddisfa la condizione.
 * Lancia un errore se nessun elemento la soddisfa.
 */
export function lastOrThrow<T>(
    this: T[],
    predicate: Predicate<T>
): T

export function lastOrThrow<T>(
    this: T[],
    predicate?: Predicate<T>
): T {
    if (!predicate) {
        if (this.length === 0) {
            throw new Error('Sequence contains no elements.')
        }

        return this[this.length - 1]
    }

    for (let i = this.length - 1; i >= 0; i--) {
        if (predicate(this[i], i)) {
            return this[i]
        }
    }

    throw new Error('No element satisfies the condition.')
}

/**
 * Restituisce l'unico elemento dell'array.
 * Lancia un errore se il numero di elementi validi non è esattamente uno.
 */
export function singleOrThrow<T>(this: T[]): T

/**
 * Restituisce l'unico elemento che soddisfa la condizione.
 * Lancia un errore se il numero di elementi validi non è esattamente uno.
 */
export function singleOrThrow<T>(
    this: T[],
    predicate: Predicate<T>
): T

export function singleOrThrow<T>(
    this: T[],
    predicate?: Predicate<T>
): T {
    let found: T | undefined
    let count = 0

    for (let i = 0; i < this.length; i++) {
        if (!predicate || predicate(this[i], i)) {
            found = this[i]
            count++

            if (count > 1) {
                throw new Error('Sequence contains more than one matching element.')
            }
        }
    }

    if (count === 1) {
        return found as T
    }

    throw new Error('Sequence contains no matching element.')
}
