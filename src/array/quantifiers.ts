type Predicate<T> = (item: T, index: number) => boolean

/**
 * Restituisce true se almeno un elemento soddisfa la condizione.
 * Se la condizione non viene specificata, restituisce true se l'array contiene almeno un elemento.
 */
export function any<T>(
    this: T[],
    predicate?: Predicate<T>
): boolean {
    if (!predicate) {
        return this.length > 0
    }

    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            return true
        }
    }

    return false
}

/**
 * Restituisce true se tutti gli elementi soddisfano la condizione.
 */
export function all<T>(
    this: T[],
    predicate: Predicate<T>
): boolean {
    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i], i)) {
            return false
        }
    }

    return true
}

/**
 * Restituisce true se nessun elemento soddisfa la condizione.
 * Se la condizione non viene specificata, restituisce true se l'array è vuoto.
 */
export function none<T>(
    this: T[],
    predicate?: Predicate<T>
): boolean {
    if (!predicate) {
        return this.length === 0
    }

    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            return false
        }
    }

    return true
}

/**
 * Restituisce true se l'array contiene il valore specificato.
 * Il confronto viene eseguito con Object.is().
 */
export function contains<T>(
    this: T[],
    value: T
): boolean {
    for (let i = 0; i < this.length; i++) {
        if (Object.is(this[i], value)) {
            return true
        }
    }

    return false
}

/**
 * Restituisce true se esattamente un elemento soddisfa la condizione.
 */
export function one<T>(
    this: T[],
    predicate: Predicate<T>
): boolean {
    let count = 0

    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i], i)) {
            continue
        }

        count++

        if (count > 1) {
            return false
        }
    }

    return count === 1
}
