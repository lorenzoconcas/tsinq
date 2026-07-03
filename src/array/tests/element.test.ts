import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('first', () => {
    it('returns the first item in the array', () => {
        expect([1, 2, 3].first()).toBe(1)
    })

    it('returns the first matching item when a predicate is provided', () => {
        expect([1, 2, 3, 4].first((value) => value % 2 === 0)).toBe(2)
    })

    it('returns undefined for an empty array', () => {
        expect([].first()).toBeUndefined()
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].first((_, index) => index === 1)).toBe('b')
    })

    it('can return undefined as the actual first value', () => {
        expect([undefined, 1, 2].first()).toBeUndefined()
        expect([undefined, 1, 2].first((value) => value !== undefined)).toBe(1)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.first())
    })
})

describe('firstWhere', () => {
    it('returns the first matching item', () => {
        expect([1, 2, 3, 4].firstWhere((value) => value > 2)).toBe(3)
    })

    it('returns undefined when nothing matches', () => {
        expect([1, 2, 3].firstWhere((value) => value > 10)).toBeUndefined()
    })

    it('returns undefined for an empty array', () => {
        expect([].firstWhere(() => true)).toBeUndefined()
    })

    it('can match duplicate values', () => {
        expect([1, 2, 2, 3].firstWhere((value) => value === 2)).toBe(2)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.firstWhere((value) => value === 2))
    })
})

describe('firstNonNull', () => {
    it('returns the first non-null and non-undefined value', () => {
        expect([null, undefined, 3, 4].firstNonNull()).toBe(3)
    })

    it('returns undefined for an empty array', () => {
        expect([].firstNonNull()).toBeUndefined()
    })

    it('returns undefined when every value is nullish', () => {
        expect([null, undefined].firstNonNull()).toBeUndefined()
    })

    it('preserves duplicate values', () => {
        expect([null, 2, 2].firstNonNull()).toBe(2)
    })

    it('does not mutate the original array', () => {
        const source = [null, 1, 2]

        expectArrayUnchanged(source, () => source.firstNonNull())
    })
})

describe('firstOrDefault', () => {
    it('returns the first item when the array is not empty', () => {
        expect([1, 2, 3].firstOrDefault(99)).toBe(1)
    })

    it('returns the default value for an empty array', () => {
        const source: number[] = []

        expect(source.firstOrDefault(99)).toBe(99)
    })

    it('returns the first matching item when a predicate is provided', () => {
        expect([1, 2, 3, 4].firstOrDefault((value) => value > 2, 99)).toBe(3)
    })

    it('returns the default value when the predicate does not match anything', () => {
        expect([1, 2, 3].firstOrDefault((value) => value > 10, 99)).toBe(99)
    })

    it('can use null as a default value', () => {
        const source: Array<number | null> = []

        expect(source.firstOrDefault(null)).toBeNull()
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.firstOrDefault(0))
    })
})

describe('last', () => {
    it('returns the last item in the array', () => {
        expect([1, 2, 3].last()).toBe(3)
    })

    it('returns the last matching item when a predicate is provided', () => {
        expect([1, 2, 3, 4].last((value) => value % 2 === 0)).toBe(4)
    })

    it('returns undefined for an empty array', () => {
        expect([].last()).toBeUndefined()
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].last((_, index) => index < 2)).toBe('b')
    })

    it('can return undefined as the actual last value', () => {
        expect([1, 2, undefined].last()).toBeUndefined()
        expect([1, 2, undefined].last((value) => value !== undefined)).toBe(2)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.last())
    })
})

describe('lastWhere', () => {
    it('returns the last matching item', () => {
        expect([1, 2, 3, 4].lastWhere((value) => value < 4)).toBe(3)
    })

    it('returns undefined when nothing matches', () => {
        expect([1, 2, 3].lastWhere((value) => value > 10)).toBeUndefined()
    })

    it('returns undefined for an empty array', () => {
        expect([].lastWhere(() => true)).toBeUndefined()
    })

    it('can match duplicate values', () => {
        expect([1, 2, 2, 3].lastWhere((value) => value === 2)).toBe(2)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.lastWhere((value) => value === 2))
    })
})

describe('lastNonNull', () => {
    it('returns the last non-null and non-undefined value', () => {
        expect([1, null, 2, undefined].lastNonNull()).toBe(2)
    })

    it('returns undefined for an empty array', () => {
        expect([].lastNonNull()).toBeUndefined()
    })

    it('returns undefined when every value is nullish', () => {
        expect([null, undefined].lastNonNull()).toBeUndefined()
    })

    it('preserves duplicate values', () => {
        expect([2, 2, null].lastNonNull()).toBe(2)
    })

    it('does not mutate the original array', () => {
        const source = [1, null, 2]

        expectArrayUnchanged(source, () => source.lastNonNull())
    })
})

describe('lastOrDefault', () => {
    it('returns the last item when the array is not empty', () => {
        expect([1, 2, 3].lastOrDefault(99)).toBe(3)
    })

    it('returns the default value for an empty array', () => {
        const source: number[] = []

        expect(source.lastOrDefault(99)).toBe(99)
    })

    it('returns the last matching item when a predicate is provided', () => {
        expect([1, 2, 3, 4].lastOrDefault((value) => value < 4, 99)).toBe(3)
    })

    it('returns the default value when the predicate does not match anything', () => {
        expect([1, 2, 3].lastOrDefault((value) => value > 10, 99)).toBe(99)
    })

    it('can use undefined as a default value', () => {
        const source: Array<number | undefined> = []

        expect(source.lastOrDefault(undefined)).toBeUndefined()
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.lastOrDefault(0))
    })
})

describe('single', () => {
    it('returns the only item in the array', () => {
        expect([42].single()).toBe(42)
    })

    it('returns the only matching item when a predicate is provided', () => {
        expect([1, 2, 3].single((value) => value === 2)).toBe(2)
    })

    it('returns undefined for an empty array', () => {
        expect([].single()).toBeUndefined()
    })

    it('returns undefined when more than one item matches', () => {
        expect([1, 2, 2, 3].single((value) => value === 2)).toBeUndefined()
    })

    it('returns undefined when the source has multiple items without a predicate', () => {
        expect([1, 2].single()).toBeUndefined()
    })

    it('can return null as the single matching value', () => {
        expect([1, null, 3].single((value) => value == null)).toBeNull()
    })

    it('does not mutate the original array', () => {
        const source = [42]

        expectArrayUnchanged(source, () => source.single())
    })
})

describe('singleOrDefault', () => {
    it('returns the only item in the array', () => {
        expect([42].singleOrDefault(0)).toBe(42)
    })

    it('returns the only matching item when a predicate is provided', () => {
        expect([1, 2, 3].singleOrDefault((value) => value === 2, 0)).toBe(2)
    })

    it('returns the default value for an empty array', () => {
        const source: number[] = []

        expect(source.singleOrDefault(0)).toBe(0)
    })

    it('returns the default value when more than one item matches', () => {
        expect([1, 2, 2, 3].singleOrDefault((value) => value === 2, 0)).toBe(0)
    })

    it('returns the default value when the source has multiple items without a predicate', () => {
        expect([1, 2].singleOrDefault(0)).toBe(0)
    })

    it('can use null as a default value', () => {
        const source: Array<number | null> = []

        expect(source.singleOrDefault(null)).toBeNull()
    })

    it('does not mutate the original array', () => {
        const source = [42]

        expectArrayUnchanged(source, () => source.singleOrDefault(0))
    })
})

describe('elementAt', () => {
    it('returns the item at the specified index', () => {
        expect(['a', 'b', 'c'].elementAt(1)).toBe('b')
    })

    it('returns undefined for an empty array', () => {
        expect([].elementAt(0)).toBeUndefined()
    })

    it('returns undefined for a negative index', () => {
        expect([1, 2, 3].elementAt(-1)).toBeUndefined()
    })

    it('returns undefined for an out-of-range index', () => {
        expect([1, 2, 3].elementAt(3)).toBeUndefined()
    })

    it('can return null and undefined values', () => {
        expect([null, undefined].elementAt(0)).toBeNull()
        expect([null, undefined].elementAt(1)).toBeUndefined()
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.elementAt(1))
    })
})

describe('elementAtOrDefault', () => {
    it('returns the item at the specified index', () => {
        expect(['a', 'b', 'c'].elementAtOrDefault(1, 'x')).toBe('b')
    })

    it('returns the default value for an empty array', () => {
        const source: string[] = []

        expect(source.elementAtOrDefault(0, 'x')).toBe('x')
    })

    it('returns the default value for a negative index', () => {
        expect([1, 2, 3].elementAtOrDefault(-1, 99)).toBe(99)
    })

    it('returns the default value for an out-of-range index', () => {
        expect([1, 2, 3].elementAtOrDefault(10, 99)).toBe(99)
    })

    it('can return null as the actual array value', () => {
        expect(([null] as Array<string | null>).elementAtOrDefault(0, 'fallback')).toBeNull()
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.elementAtOrDefault(1, 0))
    })
})
