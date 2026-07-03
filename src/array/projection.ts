type Selector<T, TResult> = (item: T, index: number) => TResult

/**
 * Proietta ogni elemento dell'array in un nuovo valore.
 */
export function select<T, TResult>(
    this: T[],
    selector: Selector<T, TResult>
): TResult[] {
    const result: TResult[] = []

    for (let i = 0; i < this.length; i++) {
        result.push(selector(this[i], i))
    }

    return result
}

/**
 * Proietta ogni elemento in una collezione e ne appiattisce il risultato in un unico array.
 */
export function selectMany<T, TResult>(
    this: T[],
    selector: Selector<T, TResult[]>
): TResult[] {
    const result: TResult[] = []

    for (let i = 0; i < this.length; i++) {
        const values = selector(this[i], i)

        for (let j = 0; j < values.length; j++) {
            result.push(values[j])
        }
    }

    return result
}