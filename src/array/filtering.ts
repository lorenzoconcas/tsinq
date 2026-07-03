type Predicate<T> = (item: T, index: number) => boolean

/**
 * Restituisce un nuovo array contenente tutti gli elementi che soddisfano la condizione.
 */
export function where<T>(
    this: T[],
    predicate: Predicate<T>
): T[] {
    return this.filter(predicate)
}

/**
 * Restituisce un nuovo array contenente solo gli elementi che sono istanze del tipo specificato.
 */
export function ofType<T, U extends T>(
    this: T[],
    type: new (...args: any[]) => U
): U[] {
    return this.filter((item): item is U => item instanceof type)
}