function createSeededRandom(seed: number): () => number {
    let state = Number.isFinite(seed)
        ? Math.trunc(seed)
        : 0

    state = ((state % 4294967296) + 4294967296) % 4294967296

    return () => {
        state = (state * 1664525 + 1013904223) >>> 0
        return state / 4294967296
    }
}

function shuffleCore<T>(
    source: T[],
    random: () => number
): T[] {
    const result = [...source]

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1))
        const temp = result[i]

        result[i] = result[j]
        result[j] = temp
    }

    return result
}

/**
 * Restituisce una copia dell'array con gli elementi mescolati casualmente.
 */
export function shuffle<T>(this: T[]): T[]
export function shuffle<T>(this: T[], seed: number): T[]
export function shuffle<T>(
    this: T[],
    seed?: number
): T[] {
    if (seed === undefined) {
        return shuffleCore(this, Math.random)
    }

    return shuffleCore(this, createSeededRandom(seed))
}

/**
 * Restituisce un elemento casuale dell'array.
 * Se l'array è vuoto restituisce undefined.
 */
export function random<T>(
    this: T[]
): T | undefined {
    if (this.length === 0) {
        return undefined
    }

    const index = Math.floor(Math.random() * this.length)

    return this[index]
}

/**
 * Restituisce un elemento casuale dell'array oppure il valore di default.
 */
export function randomOrDefault<T>(
    this: T[],
    defaultValue: T
): T {
    if (this.length === 0) {
        return defaultValue
    }

    const index = Math.floor(Math.random() * this.length)

    return this[index]
}

/**
 * Restituisce un campione casuale senza ripetizioni.
 * Se il conteggio non viene specificato, restituisce un solo elemento.
 */
export function sample<T>(
    this: T[],
    count = 1
): T[] {
    if (this.length === 0) {
        return []
    }

    const normalizedCount = Math.floor(count)

    if (normalizedCount <= 0) {
        return []
    }

    const copy = [...this]

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = copy[i]

        copy[i] = copy[j]
        copy[j] = temp
    }

    const resultLength = normalizedCount < copy.length
        ? normalizedCount
        : copy.length
    const result: T[] = []

    for (let i = 0; i < resultLength; i++) {
        result.push(copy[i])
    }

    return result
}
