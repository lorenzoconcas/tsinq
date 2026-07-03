type Selector<T, TKey> = (item: T) => TKey

function buildLookup<TItem, TKey>(
    items: TItem[],
    selector: Selector<TItem, TKey>
): Map<TKey, TItem[]> {
    const result = new Map<TKey, TItem[]>()

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const key = selector(item)
        let group = result.get(key)

        if (!group) {
            group = []
            result.set(key, group)
        }

        group.push(item)
    }

    return result
}

/**
 * Raggruppa gli elementi in base alla chiave restituita dal selettore.
 */
export function groupBy<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): Map<TKey, T[]> {
    const result = new Map<TKey, T[]>()

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        const key = selector(item)

        let group = result.get(key)

        if (!group) {
            group = []
            result.set(key, group)
        }

        group.push(item)
    }

    return result
}

/**
 * Raggruppa gli elementi adiacenti che condividono la stessa chiave.
 *
 * A differenza di groupBy(), vengono creati gruppi distinti
 * quando la stessa chiave ricompare successivamente.
 */
export function groupAdjacent<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): Map<TKey, T[]> {
    const result = new Map<TKey, T[]>()

    if (this.length === 0) {
        return result
    }

    let currentKey = selector(this[0])
    let currentGroup: T[] = [this[0]]

    for (let i = 1; i < this.length; i++) {
        const item = this[i]
        const key = selector(item)

        if (Object.is(key, currentKey)) {
            currentGroup.push(item)
            continue
        }

        result.set(currentKey, currentGroup)

        currentKey = key
        currentGroup = [item]
    }

    result.set(currentKey, currentGroup)

    return result
}

/**
 * Alias di groupBy().
 */
export function toLookup<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): Map<TKey, T[]> {
    const result = new Map<TKey, T[]>()

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        const key = selector(item)

        let group = result.get(key)

        if (!group) {
            group = []
            result.set(key, group)
        }

        group.push(item)
    }

    return result
}

/**
 * Combina due array elemento per elemento.
 */
export function zip<T, TSecond, TResult>(
    this: T[],
    second: TSecond[],
    selector: (first: T, second: TSecond) => TResult
): TResult[] {
    const result: TResult[] = []

    const length = Math.min(this.length, second.length)

    for (let i = 0; i < length; i++) {
        result.push(selector(this[i], second[i]))
    }

    return result
}

/**
 * Indicizza gli elementi in una mappa utilizzando la chiave restituita dal selettore.
 * In caso di chiavi duplicate, prevale l'ultimo elemento.
 */
export function indexBy<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): Map<TKey, T> {
    const result = new Map<TKey, T>()

    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        result.set(selector(item), item)
    }

    return result
}

/**
 * Conta quanti elementi appartengono a ciascuna chiave.
 */
export function countBy<T, TKey>(
    this: T[],
    selector: Selector<T, TKey>
): Map<TKey, number> {
    const result = new Map<TKey, number>()

    for (let i = 0; i < this.length; i++) {
        const key = selector(this[i])
        const count = result.get(key)

        result.set(key, count === undefined ? 1 : count + 1)
    }

    return result
}

/**
 * Esegue un inner join tra la collezione corrente e quella specificata.
 */
export function joinBy<T, TInner, TKey, TResult>(
    this: T[],
    inner: TInner[],
    outerKeySelector: Selector<T, TKey>,
    innerKeySelector: Selector<TInner, TKey>,
    resultSelector: (outer: T, inner: TInner) => TResult
): TResult[] {
    const result: TResult[] = []
    const lookup = buildLookup(inner, innerKeySelector)

    for (let i = 0; i < this.length; i++) {
        const outerItem = this[i]
        const key = outerKeySelector(outerItem)
        const group = lookup.get(key)

        if (!group) {
            continue
        }

        for (let j = 0; j < group.length; j++) {
            result.push(resultSelector(outerItem, group[j]))
        }
    }

    return result
}

/**
 * Esegue un left join tra la collezione corrente e quella specificata.
 */
export function leftJoin<T, TInner, TKey, TResult>(
    this: T[],
    inner: TInner[],
    outerKeySelector: Selector<T, TKey>,
    innerKeySelector: Selector<TInner, TKey>,
    resultSelector: (outer: T, inner: TInner | undefined) => TResult
): TResult[] {
    const result: TResult[] = []
    const lookup = buildLookup(inner, innerKeySelector)

    for (let i = 0; i < this.length; i++) {
        const outerItem = this[i]
        const key = outerKeySelector(outerItem)
        const group = lookup.get(key)

        if (!group || group.length === 0) {
            result.push(resultSelector(outerItem, undefined))
            continue
        }

        for (let j = 0; j < group.length; j++) {
            result.push(resultSelector(outerItem, group[j]))
        }
    }

    return result
}

/**
 * Esegue un inner join tra la collezione corrente e quella specificata.
 */
export function innerJoin<T, TInner, TKey, TResult>(
    this: T[],
    inner: TInner[],
    outerKeySelector: Selector<T, TKey>,
    innerKeySelector: Selector<TInner, TKey>,
    resultSelector: (outer: T, inner: TInner) => TResult
): TResult[] {
    const result: TResult[] = []
    const lookup = buildLookup(inner, innerKeySelector)

    for (let i = 0; i < this.length; i++) {
        const outerItem = this[i]
        const key = outerKeySelector(outerItem)
        const group = lookup.get(key)

        if (!group) {
            continue
        }

        for (let j = 0; j < group.length; j++) {
            result.push(resultSelector(outerItem, group[j]))
        }
    }

    return result
}

/**
 * Combina due array elemento per elemento fino alla collezione più lunga.
 */
export function zipLongest<T, TSecond>(
    this: T[],
    second: TSecond[]
): Array<[T | undefined, TSecond | undefined]>

/**
 * Combina due array elemento per elemento fino alla collezione più lunga
 * utilizzando un selettore per il risultato.
 */
export function zipLongest<T, TSecond, TResult>(
    this: T[],
    second: TSecond[],
    selector: (first: T | undefined, second: TSecond | undefined) => TResult
): TResult[]

export function zipLongest<T, TSecond, TResult>(
    this: T[],
    second: TSecond[],
    selector?: (first: T | undefined, second: TSecond | undefined) => TResult
): Array<[T | undefined, TSecond | undefined]> | TResult[] {
    const result: Array<[T | undefined, TSecond | undefined]> | TResult[] = []
    const length = this.length > second.length ? this.length : second.length

    for (let i = 0; i < length; i++) {
        const first = i < this.length ? this[i] : undefined
        const secondItem = i < second.length ? second[i] : undefined

        if (selector) {
            ;(result as TResult[]).push(selector(first, secondItem))
        } else {
            ;(result as Array<[T | undefined, TSecond | undefined]>).push([first, secondItem])
        }
    }

    return result
}
