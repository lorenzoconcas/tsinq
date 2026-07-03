

type Predicate<T> = (item: T, index: number) => boolean

/**
 * Restituisce un nuovo array con l'elemento aggiunto in coda.
 */
export function append<T>(
    this: T[],
    item: T
): T[] {
    return [...this, item]
}

/**
 * Restituisce un nuovo array con l'elemento aggiunto in testa.
 */
export function prepend<T>(
    this: T[],
    item: T
): T[] {
    return [item, ...this]
}

/**
 * Inserisce un elemento all'indice specificato.
 */
export function insert<T>(
    this: T[],
    index: number,
    item: T
): T[] {
    const result: T[] = []

    const position = Math.max(0, Math.min(index, this.length))

    for (let i = 0; i < position; i++) {
        result.push(this[i])
    }

    result.push(item)

    for (let i = position; i < this.length; i++) {
        result.push(this[i])
    }

    return result
}

/**
 * Rimuove la prima occorrenza dell'elemento.
 */
export function remove<T>(
    this: T[],
    item: T
): T[] {
    const result: T[] = []
    let removed = false

    for (let i = 0; i < this.length; i++) {
        if (!removed && Object.is(this[i], item)) {
            removed = true
            continue
        }

        result.push(this[i])
    }

    return result
}

/**
 * Rimuove tutti gli elementi che soddisfano la condizione.
 */
export function removeWhere<T>(
    this: T[],
    predicate: Predicate<T>
): T[] {
    const result: T[] = []

    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i], i)) {
            result.push(this[i])
        }
    }

    return result
}

/**
 * Sostituisce la prima occorrenza dell'elemento.
 */
export function replace<T>(
    this: T[],
    oldItem: T,
    newItem: T
): T[] {
    const result: T[] = []
    let replaced = false

    for (let i = 0; i < this.length; i++) {
        if (!replaced && Object.is(this[i], oldItem)) {
            result.push(newItem)
            replaced = true
        } else {
            result.push(this[i])
        }
    }

    return result
}

/**
 * Sostituisce tutti gli elementi che soddisfano la condizione.
 */
export function replaceWhere<T>(
    this: T[],
    predicate: Predicate<T>,
    newValue: T
): T[] {
    const result: T[] = []

    for (let i = 0; i < this.length; i++) {
        result.push(predicate(this[i], i) ? newValue : this[i])
    }

    return result
}

/**
 * Sposta un elemento da un indice ad un altro.
 */
export function move<T>(
    this: T[],
    from: number,
    to: number
): T[] {
{
    if (
        from < 0 ||
        from >= this.length ||
        to < 0 ||
        to >= this.length ||
        from === to
    ) {
        return [...this]
    }

    const result: T[] = []
    const item = this[from]

    for (let i = 0; i < this.length; i++) {
        if (i === from) {
            continue
        }

        if (i === to) {
            result.push(item)
        }

        result.push(this[i])
    }

    if (to === this.length - 1) {
        result.push(item)
    }

    return result
}
}

/**
 * Scambia due elementi.
 */
export function swap<T>(
    this: T[],
    indexA: number,
    indexB: number
): T[] {
    const result = [...this]

    if (
        indexA < 0 ||
        indexA >= result.length ||
        indexB < 0 ||
        indexB >= result.length ||
        indexA === indexB
    ) {
        return result
    }

    ;[result[indexA], result[indexB]] = [result[indexB], result[indexA]]

    return result
}