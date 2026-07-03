type Predicate<T> = (item: T) => boolean
type Selector<T> = (item: T) => number
type KeySelector<T, TKey> = (item: T) => TKey

function compareKeys(a: unknown, b: unknown): number {
    if (Object.is(a, b)) {
        return 0
    }

    if (a == null) {
        return -1
    }

    if (b == null) {
        return 1
    }

    if (typeof a === 'number' && typeof b === 'number') {
        if (Number.isNaN(a)) {
            return Number.isNaN(b) ? 0 : 1
        }

        if (Number.isNaN(b)) {
            return -1
        }
    }

    return a < b ? -1 : 1
}

/**
 * Restituisce il numero di elementi dell'array.
 * Se viene specificata una condizione, conta solo gli elementi che la soddisfano.
 */
export function count<T>(
    this: T[],
    predicate?: Predicate<T>
): number {
    if (!predicate) {
        return this.length
    }

    let count = 0

    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i])) {
            count++
        }
    }

    return count
}

/**
 * Restituisce la somma degli elementi numerici.
 * Se viene specificato un selettore, somma il valore restituito da esso.
 */
// Overloads for sum
export function sum(this: number[]): number;
export function sum<T>(selector: Selector<T>): number;
export function sum<T>(this: T[] | number[], selector?: Selector<T>): number {
    let total = 0;
    if (selector === undefined) {
        const values = this as number[];
        for (let i = 0; i < values.length; i++) {
            total += values[i];
        }
        return total;
    }
    const values = this as T[];
    for (let i = 0; i < values.length; i++) {
        total += selector(values[i]);
    }
    return total;
}

/**
 * Restituisce la media degli elementi numerici.
 * Se l'array è vuoto restituisce undefined.
 */
// Overloads for average
export function average(this: number[]): number | undefined;
export function average<T>(selector: Selector<T>): number | undefined;
export function average<T>(this: T[] | number[], selector?: Selector<T>): number | undefined {
    if (this.length === 0) {
        return undefined;
    }
    let total = 0;
    if (selector === undefined) {
        const values = this as number[];
        for (let i = 0; i < values.length; i++) {
            total += values[i];
        }
    } else {
        const values = this as T[];
        for (let i = 0; i < values.length; i++) {
            total += selector(values[i]);
        }
    }
    return total / this.length;
}

/**
 * Restituisce il valore minimo.
 * Se l'array è vuoto restituisce undefined.
 */
// Overloads for min
export function min(this: number[]): number | undefined;
export function min<T>(selector: Selector<T>): number | undefined;
export function min<T>(this: T[] | number[], selector?: Selector<T>): number | undefined {
    if (this.length === 0) {
        return undefined;
    }
    let minimum: number;
    if (selector === undefined) {
        const values = this as number[];
        minimum = values[0];
        for (let i = 1; i < values.length; i++) {
            if (values[i] < minimum) {
                minimum = values[i];
            }
        }
    } else {
        const values = this as T[];
        minimum = selector(values[0]);
        for (let i = 1; i < values.length; i++) {
            const value = selector(values[i]);
            if (value < minimum) {
                minimum = value;
            }
        }
    }
    return minimum;
}

/**
 * Restituisce il valore massimo.
 * Se l'array è vuoto restituisce undefined.
 */
// Overloads for max
export function max(this: number[]): number | undefined;
export function max<T>(selector: Selector<T>): number | undefined;
export function max<T>(this: T[] | number[], selector?: Selector<T>): number | undefined {
    if (this.length === 0) {
        return undefined;
    }
    let maximum: number;
    if (selector === undefined) {
        const values = this as number[];
        maximum = values[0];
        for (let i = 1; i < values.length; i++) {
            if (values[i] > maximum) {
                maximum = values[i];
            }
        }
    } else {
        const values = this as T[];
        maximum = selector(values[0]);
        for (let i = 1; i < values.length; i++) {
            const value = selector(values[i]);
            if (value > maximum) {
                maximum = value;
            }
        }
    }
    return maximum;
}

/**
 * Aggrega gli elementi utilizzando un accumulatore.
 */
export function aggregate<T, TResult>(
    this: T[],
    seed: TResult,
    accumulator: (current: TResult, item: T) => TResult
): TResult {
    let result = seed

    for (let i = 0; i < this.length; i++) {
        result = accumulator(result, this[i])
    }

    return result
}

/**
 * Aggrega gli elementi restituendo tutti gli stati intermedi.
 */
export function scan<T>(
    this: T[],
    accumulator: (current: T, item: T) => T
): T[]

/**
 * Aggrega gli elementi a partire da un seed restituendo tutti gli stati intermedi.
 */
export function scan<T, TResult>(
    this: T[],
    seed: TResult,
    accumulator: (current: TResult, item: T) => TResult
): TResult[]

export function scan<T, TResult>(
    this: T[],
    seedOrAccumulator: TResult | ((current: T, item: T) => T),
    accumulator?: (current: TResult, item: T) => TResult
): T[] | TResult[] {
    if (accumulator === undefined) {
        if (this.length === 0) {
            return []
        }

        const reduce = seedOrAccumulator as (current: T, item: T) => T
        const result: T[] = [this[0]]
        let current = this[0]

        for (let i = 1; i < this.length; i++) {
            current = reduce(current, this[i])
            result.push(current)
        }

        return result
    }

    const result: TResult[] = []
    let current = seedOrAccumulator as TResult

    for (let i = 0; i < this.length; i++) {
        current = accumulator(current, this[i])
        result.push(current)
    }

    return result
}

/**
 * Restituisce l'elemento che produce la chiave minima.
 * Se l'array è vuoto restituisce undefined.
 */
export function minBy<T, TKey>(
    this: T[],
    selector: KeySelector<T, TKey>
): T | undefined {
    if (this.length === 0) {
        return undefined
    }

    let bestItem = this[0]
    let bestKey = selector(this[0])

    for (let i = 1; i < this.length; i++) {
        const currentItem = this[i]
        const currentKey = selector(currentItem)

        if (compareKeys(currentKey, bestKey) < 0) {
            bestItem = currentItem
            bestKey = currentKey
        }
    }

    return bestItem
}

/**
 * Restituisce l'elemento che produce la chiave massima.
 * Se l'array è vuoto restituisce undefined.
 */
export function maxBy<T, TKey>(
    this: T[],
    selector: KeySelector<T, TKey>
): T | undefined {
    if (this.length === 0) {
        return undefined
    }

    let bestItem = this[0]
    let bestKey = selector(this[0])

    for (let i = 1; i < this.length; i++) {
        const currentItem = this[i]
        const currentKey = selector(currentItem)

        if (compareKeys(currentKey, bestKey) > 0) {
            bestItem = currentItem
            bestKey = currentKey
        }
    }

    return bestItem
}
