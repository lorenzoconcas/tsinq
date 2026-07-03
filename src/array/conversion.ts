/**
 * Restituisce un Set contenente tutti gli elementi dell'array.
 */
export function toSet<T>(
    this: T[]
): Set<T> {
    return new Set(this)
}

/**
 * Converte l'array in una Map utilizzando il selettore come chiave.
 */
export function toMap<T, TKey>(
    this: T[],
    keySelector: (item: T) => TKey
): Map<TKey, T> {
    const result = new Map<TKey, T>()

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        result.set(keySelector(item), item)
    }

    return result
}

/**
 * Alias di toMap().
 */
export function toDictionary<T, TKey>(
    this: T[],
    keySelector: (item: T) => TKey
): Map<TKey, T> {
    const result = new Map<TKey, T>()

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        result.set(keySelector(item), item)
    }

    return result
}

/**
 * Converte l'array in un oggetto utilizzando il selettore come chiave.
 */
export function toObject<T, TKey extends PropertyKey>(
    this: T[],
    keySelector: (item: T) => TKey
): Record<TKey, T> {
    const result = {} as Record<TKey, T>

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        result[keySelector(item)] = item
    }

    return result
}

/**
 * Appiattisce un array di array di un livello.
 */
export function flatten<T>(
    this: T[]
): T extends readonly (infer U)[] ? U[] : T[] {
    const result: unknown[] = []

    for (let i = 0; i < this.length; i++) {
        const value = this[i]

        if (Array.isArray(value)) {
            for (let j = 0; j < value.length; j++) {
                result.push(value[j])
            }
        } else {
            result.push(value)
        }
    }

    return result as T extends readonly (infer U)[] ? U[] : T[]
}

/**
 * Restituisce una copia superficiale dell'array.
 */
export function clone<T>(
    this: T[]
): T[] {
    return [...this]
}

/**
 * Restituisce una copia profonda dell'array.
 *
 * Richiede il supporto a structuredClone().
 */
export function deepClone<T>(
    this: T[]
): T[] {
    return structuredClone(this)
}