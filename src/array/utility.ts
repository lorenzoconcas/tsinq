type Predicate<T, U extends T> = (item: T) => item is U
type SearchPredicate<T> = (item: T, index: number) => boolean
type Comparer<T> = (a: T, b: T) => number

function compareSequenceValues(a: unknown, b: unknown): number {
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

        if (Object.is(a, -0) && Object.is(b, 0)) {
            return -1
        }

        if (Object.is(a, 0) && Object.is(b, -0)) {
            return 1
        }

        return a < b ? -1 : 1
    }

    if (typeof a === 'bigint' && typeof b === 'bigint') {
        return a < b ? -1 : 1
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return a < b ? -1 : 1
    }

    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a ? 1 : -1
    }

    if (a instanceof Date && b instanceof Date) {
        const timeA = a.getTime()
        const timeB = b.getTime()

        if (timeA === timeB) {
            return 0
        }

        return timeA < timeB ? -1 : 1
    }

    const stringA = String(a)
    const stringB = String(b)

    if (stringA === stringB) {
        return 0
    }

    return stringA < stringB ? -1 : 1
}

function defaultComparer(a: unknown, b: unknown): number {
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
            return 1
        }

        if (Number.isNaN(b)) {
            return -1
        }

        return a < b ? -1 : 1
    }

    if (typeof a === 'bigint' && typeof b === 'bigint') {
        return a < b ? -1 : 1
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return a < b ? -1 : 1
    }

    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a ? 1 : -1
    }

    if (a instanceof Date && b instanceof Date) {
        const timeA = a.getTime()
        const timeB = b.getTime()

        if (timeA === timeB) {
            return 0
        }

        return timeA < timeB ? -1 : 1
    }

    const stringA = String(a)
    const stringB = String(b)

    if (stringA === stringB) {
        return 0
    }

    return stringA < stringB ? -1 : 1
}

/**
 * Restituisce true se i due array contengono gli stessi elementi nello stesso ordine.
 * Il confronto viene eseguito con Object.is().
 */
export function sequenceEqual<T>(
    this: T[],
    other: T[]
): boolean {
    if (this.length !== other.length) {
        return false
    }

    for (let i = 0; i < this.length; i++) {
        if (!Object.is(this[i], other[i])) {
            return false
        }
    }

    return true
}

/**
 * Restituisce una copia dell'array oppure un array contenente il valore di default se vuoto.
 */
export function defaultIfEmpty<T>(
    this: T[],
    defaultValue: T
): T[] {
    if (this.length === 0) {
        return [defaultValue]
    }

    const result: T[] = []

    for (let i = 0; i < this.length; i++) {
        result.push(this[i])
    }

    return result
}

/**
 * Restituisce l'indice del primo elemento che soddisfa la condizione.
 * Se nessun elemento la soddisfa, restituisce -1.
 */
export function indexWhere<T>(
    this: T[],
    predicate: SearchPredicate<T>
): number {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            return i
        }
    }

    return -1
}

/**
 * Restituisce gli indici di tutti gli elementi che soddisfano la condizione.
 */
export function indicesWhere<T>(
    this: T[],
    predicate: SearchPredicate<T>
): number[] {
    const result: number[] = []

    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) {
            result.push(i)
        }
    }

    return result
}

/**
 * Esegue una ricerca binaria su un array ordinato.
 * Restituisce l'indice del primo elemento trovato oppure -1 se assente.
 */
export function binarySearch<T>(
    this: T[],
    item: T,
    comparer?: Comparer<T>
): number {
    let low = 0
    let high = this.length - 1
    let foundIndex = -1
    const compare = comparer ?? defaultComparer as Comparer<T>

    while (low <= high) {
        const middle = low + Math.floor((high - low) / 2)
        const comparison = compare(this[middle], item)

        if (comparison === 0) {
            foundIndex = middle
            high = middle - 1
        } else if (comparison < 0) {
            low = middle + 1
        } else {
            high = middle - 1
        }
    }

    return foundIndex
}

/**
 * Restituisce i valori che compaiono più di una volta.
 * Ogni valore duplicato viene restituito una sola volta.
 * Il confronto viene eseguito con Object.is().
 */
export function findDuplicates<T>(
    this: T[]
): T[] {
    const seen: T[] = []
    const duplicates: T[] = []

    for (let i = 0; i < this.length; i++) {
        let alreadySeen = false

        for (let j = 0; j < seen.length; j++) {
            if (Object.is(seen[j], this[i])) {
                alreadySeen = true
                break
            }
        }

        if (!alreadySeen) {
            seen.push(this[i])
            continue
        }

        let alreadyDuplicated = false

        for (let j = 0; j < duplicates.length; j++) {
            if (Object.is(duplicates[j], this[i])) {
                alreadyDuplicated = true
                break
            }
        }

        if (!alreadyDuplicated) {
            duplicates.push(this[i])
        }
    }

    return duplicates
}

/**
 * Restituisce true se tutti gli elementi soddisfano il type guard specificato.
 */
export function isCollectionOf<T, U extends T>(
    this: T[],
    predicate: Predicate<T, U>
): this is U[] {
    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i])) {
            return false
        }
    }

    return true
}

/**
 * Alias di isCollectionOf().
 */
export function isOfType<T, U extends T>(
    this: T[],
    predicate: Predicate<T, U>
): this is U[] {
    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i])) {
            return false
        }
    }

    return true
}

/**
 * Restituisce true se l'array è vuoto.
 */
export function isEmpty<T>(
    this: T[]
): boolean {
    return this.length === 0
}

/**
 * Restituisce true se l'array contiene almeno un elemento.
 */
export function isNotEmpty<T>(
    this: T[]
): boolean {
    return this.length > 0
}

/**
 * Esegue un'azione per ogni elemento passando anche l'indice corrente.
 */
export function forEachIndexed<T>(
    this: T[],
    action: (item: T, index: number) => void
): void {
    for (let i = 0; i < this.length; i++) {
        action(this[i], i)
    }
}

/**
 * Confronta due sequenze in ordine lessicografico.
 * Restituisce -1, 0 oppure 1.
 */
export function sequenceCompare<T>(
    this: T[],
    other: T[]
): number {
    const length = this.length < other.length
        ? this.length
        : other.length

    for (let i = 0; i < length; i++) {
        const comparison = compareSequenceValues(this[i], other[i])

        if (comparison !== 0) {
            return comparison
        }
    }

    if (this.length === other.length) {
        return 0
    }

    return this.length < other.length ? -1 : 1
}

/**
 * Restituisce una copia dell'array ruotata verso sinistra.
 */
export function rotateLeft<T>(
    this: T[],
    count: number
): T[] {
    if (this.length === 0) {
        return []
    }

    const normalizedCount = Math.trunc(count)
    let offset = normalizedCount % this.length

    if (offset < 0) {
        offset += this.length
    }

    const result: T[] = []

    for (let i = 0; i < this.length; i++) {
        result.push(this[(i + offset) % this.length])
    }

    return result
}

/**
 * Restituisce una copia dell'array ruotata verso destra.
 */
export function rotateRight<T>(
    this: T[],
    count: number
): T[] {
    if (this.length === 0) {
        return []
    }

    const normalizedCount = Math.trunc(count)
    let offset = normalizedCount % this.length

    if (offset < 0) {
        offset += this.length
    }

    const result: T[] = []
    const start = (this.length - offset) % this.length

    for (let i = 0; i < this.length; i++) {
        result.push(this[(start + i) % this.length])
    }

    return result
}

/**
 * Genera tutte le permutazioni dell'array.
 */
export function permutations<T>(
    this: T[]
): T[][] {
    const result: T[][] = []
    const current: T[] = []
    const used: boolean[] = []
    const source = this

    for (let i = 0; i < this.length; i++) {
        used.push(false)
    }

    const backtrack = (): void => {
        if (current.length === used.length) {
            const permutation: T[] = []

            for (let i = 0; i < current.length; i++) {
                permutation.push(current[i])
            }

            result.push(permutation)
            return
        }

        for (let i = 0; i < used.length; i++) {
            if (used[i]) {
                continue
            }

            used[i] = true
            current.push(source[i])
            backtrack()
            current.pop()
            used[i] = false
        }
    }

    if (this.length === 0) {
        return [[]]
    }

    backtrack()

    return result
}

/**
 * Restituisce il prodotto cartesiano tra la collezione corrente e un'altra collezione.
 */
export function cartesian<T, TSecond>(
    this: T[],
    other: TSecond[]
): Array<[T, TSecond]> {
    const result: Array<[T, TSecond]> = []

    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < other.length; j++) {
            result.push([this[i], other[j]])
        }
    }

    return result
}

/**
 * Estende l'array fino alla lunghezza richiesta utilizzando il valore specificato.
 */
export function pad<T>(
    this: T[],
    length: number,
    value: T
): T[] {
    const targetLength = Math.trunc(length)
    const result: T[] = []

    for (let i = 0; i < this.length; i++) {
        result.push(this[i])
    }

    if (targetLength <= result.length) {
        return result
    }

    for (let i = result.length; i < targetLength; i++) {
        result.push(value)
    }

    return result
}

/**
 * Ripete il contenuto dell'array per il numero di volte specificato.
 */
export function repeat<T>(
    this: T[],
    count: number
): T[] {
    const repetitions = Math.trunc(count)

    if (repetitions <= 0 || this.length === 0) {
        return []
    }

    const result: T[] = []

    for (let i = 0; i < repetitions; i++) {
        for (let j = 0; j < this.length; j++) {
            result.push(this[j])
        }
    }

    return result
}
