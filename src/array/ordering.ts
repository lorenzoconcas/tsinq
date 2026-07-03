type Selector<T, TKey> = (item: T) => TKey

function compare(a: any, b: any): number {
    if (a === b) {
        return 0
    }

    if (a == null) {
        return -1
    }

    if (b == null) {
        return 1
    }

    return a < b ? -1 : 1
}

/**
 * Ordina gli elementi in ordine crescente.
 */
export function orderBy<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): T[] {
    return [...this].sort((a, b) => compare(selector(a), selector(b)))
}

/**
 * Ordina gli elementi in ordine decrescente.
 */
export function orderByDescending<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): T[] {
    return [...this].sort((a, b) => compare(selector(b), selector(a)))
}

/**
 * Ordina ulteriormente gli elementi in ordine crescente.
 *
 * Attualmente equivale a orderBy().
 */
export function thenBy<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): T[] {
    return [...this].sort((a, b) => compare(selector(a), selector(b)))
}

/**
 * Ordina ulteriormente gli elementi in ordine decrescente.
 *
 * Attualmente equivale a orderByDescending().
 */
export function thenByDescending<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): T[] {
    return [...this].sort((a, b) => compare(selector(b), selector(a)))
}

/**
 * Restituisce una copia dell'array con gli elementi in ordine inverso.
 */
export function reverseCopy<T>(
    this: T[]
): T[] {
    return [...this].reverse()
}