type Predicate<T> = (item: T, index: number) => boolean

/**
 * Salta i primi n elementi.
 */
export function skip<T>(
    this: T[],
    count: number
): T[] {
    if (count <= 0) {
        return [...this]
    }

    const result: T[] = []

    for (let i = count; i < this.length; i++) {
        result.push(this[i])
    }

    return result
}

/**
 * Restituisce i primi n elementi.
 */
export function take<T>(
    this: T[],
    count: number
): T[] {
    if (count <= 0) {
        return []
    }

    const result: T[] = []

    const length = Math.min(count, this.length)

    for (let i = 0; i < length; i++) {
        result.push(this[i])
    }

    return result
}

/**
 * Salta gli elementi finché la condizione è vera.
 */
export function skipWhile<T>(
    this: T[],
    predicate: Predicate<T>
): T[] {
    let index = 0

    while (index < this.length && predicate(this[index], index)) {
        index++
    }

    const result: T[] = []

    for (let i = index; i < this.length; i++) {
        result.push(this[i])
    }

    return result
}

/**
 * Restituisce gli elementi finché la condizione è vera.
 */
export function takeWhile<T>(
    this: T[],
    predicate: Predicate<T>
): T[] {
    const result: T[] = []

    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i], i)) {
            break
        }

        result.push(this[i])
    }

    return result
}

/**
 * Divide l'array in blocchi della dimensione specificata.
 */
export function chunk<T>(
    this: T[],
    size: number
): T[][] {
    if (size <= 0) {
        throw new RangeError('Chunk size must be greater than zero.')
    }

    const result: T[][] = []

    for (let i = 0; i < this.length; i += size) {
        const group: T[] = []

        const end = Math.min(i + size, this.length)

        for (let j = i; j < end; j++) {
            group.push(this[j])
        }

        result.push(group)
    }

    return result
}

/**
 * Divide l'array in due gruppi:
 * - elementi che soddisfano la condizione;
 * - elementi che non la soddisfano.
 */
export function partition<T>(
    this: T[],
    predicate: Predicate<T>
): [T[], T[]] {
    const matches: T[] = []
    const others: T[] = []

    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            matches.push(this[i])
        } else {
            others.push(this[i])
        }
    }

    return [matches, others]
}

/**
 * Divide l'array ogni volta che la condizione risulta vera.
 * L'elemento che soddisfa la condizione viene utilizzato come separatore e non viene incluso nel risultato.
 */
export function split<T>(
    this: T[],
    predicate: Predicate<T>
): T[][] {
    const result: T[][] = []
    let current: T[] = []

    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            result.push(current)
            current = []
            continue
        }

        current.push(this[i])
    }

    result.push(current)

    return result
}

/**
 * Raggruppa gli elementi adiacenti che condividono la stessa chiave.
 */
export function chunkBy<T, TKey>(
    this: T[],
    selector: (item: T) => TKey
): T[][] {
    if (this.length === 0) {
        return []
    }

    const result: T[][] = []
    let currentKey = selector(this[0])
    let currentGroup: T[] = [this[0]]

    for (let i = 1; i < this.length; i++) {
        const item = this[i]
        const key = selector(item)

        if (Object.is(key, currentKey)) {
            currentGroup.push(item)
            continue
        }

        result.push(currentGroup)
        currentKey = key
        currentGroup = [item]
    }

    result.push(currentGroup)

    return result
}

/**
 * Restituisce tutte le finestre scorrevoli della dimensione specificata.
 */
export function window<T>(
    this: T[],
    size: number
): T[][] {
    const normalizedSize = Math.trunc(size)

    if (normalizedSize <= 0) {
        throw new RangeError('Window size must be greater than zero.')
    }

    if (normalizedSize > this.length) {
        return []
    }

    const result: T[][] = []
    const lastStart = this.length - normalizedSize

    for (let i = 0; i <= lastStart; i++) {
        const currentWindow: T[] = []

        for (let j = 0; j < normalizedSize; j++) {
            currentWindow.push(this[i + j])
        }

        result.push(currentWindow)
    }

    return result
}

/**
 * Restituisce coppie di elementi adiacenti.
 */
export function pairwise<T>(
    this: T[]
): [T, T][] {
    const result: [T, T][] = []

    for (let i = 0; i < this.length - 1; i++) {
        result.push([this[i], this[i + 1]])
    }

    return result
}

/**
 * Restituisce gli ultimi n elementi dell'array.
 */
export function takeLast<T>(
    this: T[],
    count: number
): T[] {
    const normalizedCount = Math.trunc(count)

    if (normalizedCount <= 0) {
        return []
    }

    const start = normalizedCount >= this.length
        ? 0
        : this.length - normalizedCount
    const result: T[] = []

    for (let i = start; i < this.length; i++) {
        result.push(this[i])
    }

    return result
}

/**
 * Salta gli ultimi n elementi dell'array.
 */
export function skipLast<T>(
    this: T[],
    count: number
): T[] {
    const normalizedCount = Math.trunc(count)

    if (normalizedCount <= 0) {
        return [...this]
    }

    const end = normalizedCount >= this.length
        ? 0
        : this.length - normalizedCount
    const result: T[] = []

    for (let i = 0; i < end; i++) {
        result.push(this[i])
    }

    return result
}
