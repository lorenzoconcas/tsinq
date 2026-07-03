
export interface Group<TKey, TValue> {
    key: TKey
    items: TValue[]
}

declare global {
    interface Array<T> {
        // -------------------------------------------------------------------------
        // Filtering
        // -------------------------------------------------------------------------

        where(predicate: (item: T, index: number) => boolean): T[]
        ofType<U>(type: new (...args: any[]) => U): U[]

        // -------------------------------------------------------------------------
        // Projection
        // -------------------------------------------------------------------------

        select<TResult>(selector: (item: T, index: number) => TResult): TResult[]
        selectMany<TResult>(selector: (item: T, index: number) => TResult[]): TResult[]

        // -------------------------------------------------------------------------
        // Quantifiers
        // -------------------------------------------------------------------------

        any(predicate?: (item: T, index: number) => boolean): boolean
        all(predicate: (item: T, index: number) => boolean): boolean
        none(predicate?: (item: T, index: number) => boolean): boolean
        one(predicate: (item: T, index: number) => boolean): boolean
        contains(value: T): boolean

        // -------------------------------------------------------------------------
        // Element
        // -------------------------------------------------------------------------

        first(): T | undefined
        firstNonNull(): T
        first(predicate: (item: T, index: number) => boolean): T | undefined

        firstWhere(predicate: (item: T, index: number) => boolean): T | undefined

        firstOrDefault(defaultValue: T): T
        firstOrDefault(
            predicate: (item: T, index: number) => boolean,
            defaultValue: T
        ): T

        last(): T | undefined
        lastNonNull(): T
        last(predicate: (item: T, index: number) => boolean): T | undefined

        lastWhere(predicate: (item: T, index: number) => boolean): T | undefined

        lastOrDefault(defaultValue: T): T
        lastOrDefault(
            predicate: (item: T, index: number) => boolean,
            defaultValue: T
        ): T

        single(): T | undefined
        single(predicate: (item: T, index: number) => boolean): T | undefined

        singleOrDefault(defaultValue: T): T
        singleOrDefault(
            predicate: (item: T, index: number) => boolean,
            defaultValue: T
        ): T

        firstOrThrow(): T
        firstOrThrow(predicate: (item: T, index: number) => boolean): T

        lastOrThrow(): T
        lastOrThrow(predicate: (item: T, index: number) => boolean): T

        singleOrThrow(): T
        singleOrThrow(predicate: (item: T, index: number) => boolean): T

        elementAt(index: number): T | undefined
        elementAtOrDefault(index: number, defaultValue: T): T

        // -------------------------------------------------------------------------
        // Ordering
        // -------------------------------------------------------------------------

        orderBy<TKey>(selector: (item: T) => TKey): T[]
        orderByDescending<TKey>(selector: (item: T) => TKey): T[]

        thenBy<TKey>(selector: (item: T) => TKey): T[]
        thenByDescending<TKey>(selector: (item: T) => TKey): T[]

        reverseCopy(): T[]

        // -------------------------------------------------------------------------
        // Aggregation
        // -------------------------------------------------------------------------

        count(predicate?: (item: T) => boolean): number

        sum(selector?: (item: T) => number): number
        average(selector?: (item: T) => number): number

        min(selector?: (item: T) => number): number | undefined
        max(selector?: (item: T) => number): number | undefined

        aggregate<TResult>(
            seed: TResult,
            accumulator: (current: TResult, item: T) => TResult
        ): TResult

        scan(
            accumulator: (current: T, item: T) => T
        ): T[]

        scan<TResult>(
            seed: TResult,
            accumulator: (current: TResult, item: T) => TResult
        ): TResult[]

        minBy<TKey>(selector: (item: T) => TKey): T | undefined
        maxBy<TKey>(selector: (item: T) => TKey): T | undefined

        // -------------------------------------------------------------------------
        // Set operations
        // -------------------------------------------------------------------------

        distinct(): T[]
        distinctBy<TKey>(selector: (item: T) => TKey): T[]

        union(other: T[]): T[]
        intersect(other: T[]): T[]
        except(other: T[]): T[]

        unionBy<TKey>(other: T[], selector: (item: T) => TKey): T[]
        intersectBy<TKey>(other: T[], selector: (item: T) => TKey): T[]
        exceptBy<TKey>(other: T[], selector: (item: T) => TKey): T[]

        // -------------------------------------------------------------------------
        // Partitioning
        // -------------------------------------------------------------------------

        skip(count: number): T[]
        take(count: number): T[]

        skipWhile(predicate: (item: T, index: number) => boolean): T[]
        takeWhile(predicate: (item: T, index: number) => boolean): T[]

        chunk(size: number): T[][]

        chunkBy<TKey>(selector: (item: T) => TKey): T[][]

        window(size: number): T[][]

        pairwise(): [T, T][]

        partition(predicate: (item: T, index: number) => boolean): [T[], T[]]

        split(predicate: (item: T, index: number) => boolean): T[][]

        takeLast(count: number): T[]
        skipLast(count: number): T[]

        // -------------------------------------------------------------------------
        // Grouping
        // -------------------------------------------------------------------------

        groupBy<TKey>(
            selector: (item: T) => TKey
        ): Map<TKey, T[]>

        groupAdjacent<TKey>(
            selector: (item: T) => TKey
        ): Group<TKey, T>[]

        toLookup<TKey>(
            selector: (item: T) => TKey
        ): Map<TKey, T[]>

        indexBy<TKey>(
            selector: (item: T) => TKey
        ): Map<TKey, T>

        countBy<TKey>(
            selector: (item: T) => TKey
        ): Map<TKey, number>

        // -------------------------------------------------------------------------
        // Join / Zip
        // -------------------------------------------------------------------------

        join(separator?: string): string

        zip<TSecond, TResult>(
            second: TSecond[],
            selector: (first: T, second: TSecond) => TResult
        ): TResult[]

        zipLongest<TSecond>(
            second: TSecond[]
        ): Array<[T | undefined, TSecond | undefined]>

        zipLongest<TSecond, TResult>(
            second: TSecond[],
            selector: (first: T | undefined, second: TSecond | undefined) => TResult
        ): TResult[]

        joinBy<TInner, TKey, TResult>(
            inner: TInner[],
            outerKeySelector: (outer: T) => TKey,
            innerKeySelector: (inner: TInner) => TKey,
            resultSelector: (outer: T, inner: TInner) => TResult
        ): TResult[]

        leftJoin<TInner, TKey, TResult>(
            inner: TInner[],
            outerKeySelector: (outer: T) => TKey,
            innerKeySelector: (inner: TInner) => TKey,
            resultSelector: (outer: T, inner: TInner | undefined) => TResult
        ): TResult[]

        innerJoin<TInner, TKey, TResult>(
            inner: TInner[],
            outerKeySelector: (outer: T) => TKey,
            innerKeySelector: (inner: TInner) => TKey,
            resultSelector: (outer: T, inner: TInner) => TResult
        ): TResult[]

        // -------------------------------------------------------------------------
        // Conversion
        // -------------------------------------------------------------------------

        toSet(): Set<T>

        toMap<TKey>(
            keySelector: (item: T) => TKey
        ): Map<TKey, T>

        toDictionary<TKey>(
            keySelector: (item: T) => TKey
        ): Map<TKey, T>

        toObject<TKey extends PropertyKey>(
            keySelector: (item: T) => TKey
        ): Record<TKey, T>

        flatten(): T extends readonly (infer U)[] ? U[] : T[]

        clone(): T[]

        deepClone(): T[]

        // -------------------------------------------------------------------------
        // Sequence
        // -------------------------------------------------------------------------

        sequenceEqual(other: T[]): boolean
        sequenceCompare(other: T[]): number

        append(item: T): T[]
        prepend(item: T): T[]

        defaultIfEmpty(defaultValue: T): T[]

        rotateLeft(count: number): T[]
        rotateRight(count: number): T[]

        permutations(): T[][]

        cartesian<TSecond>(other: TSecond[]): Array<[T, TSecond]>

        pad(length: number, value: T): T[]

        repeat(count: number): T[]

        // -------------------------------------------------------------------------
        // Search
        // -------------------------------------------------------------------------

        indexWhere(predicate: (item: T, index: number) => boolean): number

        indicesWhere(predicate: (item: T, index: number) => boolean): number[]

        binarySearch(
            item: T,
            comparer?: (a: T, b: T) => number
        ): number

        // -------------------------------------------------------------------------
        // Modification
        // -------------------------------------------------------------------------

        insert(index: number, item: T): T[]

        remove(item: T): T[]

        removeWhere(predicate: (item: T, index: number) => boolean): T[]

        replace(oldItem: T, newItem: T): T[]

        replaceWhere(
            predicate: (item: T, index: number) => boolean,
            newValue: T
        ): T[]

        move(from: number, to: number): T[]

        swap(indexA: number, indexB: number): T[]

        // -------------------------------------------------------------------------
        // Randomization
        // -------------------------------------------------------------------------

        shuffle(): T[]
        shuffle(seed: number): T[]

        random(): T | undefined

        randomOrDefault(defaultValue: T): T

        sample(count?: number): T[]

        // -------------------------------------------------------------------------
        // Analysis
        // -------------------------------------------------------------------------

        findDuplicates(): T[]

        isCollectionOf<U>(
            predicate: (item: T) => item is U
        ): this is U[]

        isOfType<U>(
            predicate: (item: T) => item is U
        ): this is U[]

        isEmpty(): boolean

        isNotEmpty(): boolean

        // -------------------------------------------------------------------------
        // Utility
        // -------------------------------------------------------------------------

        forEachIndexed(
            action: (item: T, index: number) => void
        ): void
    }
}
