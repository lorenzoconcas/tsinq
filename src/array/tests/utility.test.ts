import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('sequenceEqual', () => {
    it('returns true when two arrays contain the same values in the same order', () => {
        expect([1, 2, 3].sequenceEqual([1, 2, 3])).toBe(true)
    })

    it('returns false when the lengths differ', () => {
        expect([1, 2, 3].sequenceEqual([1, 2])).toBe(false)
    })

    it('returns false when values differ at the same position', () => {
        expect([1, 2, 3].sequenceEqual([1, 4, 3])).toBe(false)
    })

    it('uses Object.is semantics for NaN and signed zero', () => {
        expect([NaN].sequenceEqual([NaN])).toBe(true)
        expect([0].sequenceEqual([-0])).toBe(false)
    })

    it('supports null and undefined values', () => {
        expect([null, undefined].sequenceEqual([null, undefined])).toBe(true)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.sequenceEqual([1, 2, 3]))
    })
})

describe('defaultIfEmpty', () => {
    it('returns a copy of the array when it is not empty', () => {
        const source = [1, 2, 3]
        const result = source.defaultIfEmpty(0)

        expect(result).toEqual([1, 2, 3])
        expect(result).not.toBe(source)
    })

    it('returns an array with the default value when the source is empty', () => {
        expect(([] as number[]).defaultIfEmpty(99)).toEqual([99])
    })

    it('can use null as the default value', () => {
        expect(([] as Array<number | null>).defaultIfEmpty(null)).toEqual([null])
    })

    it('preserves duplicate values', () => {
        expect([1, 1, 2].defaultIfEmpty(0)).toEqual([1, 1, 2])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.defaultIfEmpty(0))
    })
})

describe('indexWhere', () => {
    it('returns the index of the first matching element', () => {
        expect([1, 2, 3, 2].indexWhere((value) => value === 2)).toBe(1)
    })

    it('returns -1 when no element matches', () => {
        expect([1, 2, 3].indexWhere((value) => value > 10)).toBe(-1)
    })

    it('returns -1 for an empty array', () => {
        expect([].indexWhere(() => true)).toBe(-1)
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].indexWhere((_, index) => index === 2)).toBe(2)
    })

    it('can match null and undefined values', () => {
        expect([1, null, undefined].indexWhere((value) => value == null)).toBe(1)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.indexWhere((value) => value === 2))
    })
})

describe('indicesWhere', () => {
    it('returns the indices of all matching elements', () => {
        expect([1, 2, 3, 2].indicesWhere((value) => value === 2)).toEqual([1, 3])
    })

    it('returns an empty array when no element matches', () => {
        expect([1, 2, 3].indicesWhere((value) => value > 10)).toEqual([])
    })

    it('returns an empty array for an empty source', () => {
        expect([].indicesWhere(() => true)).toEqual([])
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c', 'd'].indicesWhere((_, index) => index % 2 === 0)).toEqual([0, 2])
    })

    it('can match null and undefined values', () => {
        expect([1, null, undefined].indicesWhere((value) => value == null)).toEqual([1, 2])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.indicesWhere((value) => value > 1))
    })
})

describe('binarySearch', () => {
    it('returns the index of a matching element in an ascending array', () => {
        expect([1, 2, 3, 4, 5].binarySearch(4)).toBe(3)
    })

    it('returns the first matching index when duplicate values are present', () => {
        expect([1, 2, 2, 2, 3].binarySearch(2)).toBe(1)
    })

    it('returns -1 when the item is not found', () => {
        expect([1, 2, 3, 4, 5].binarySearch(6)).toBe(-1)
    })

    it('returns -1 for an empty array', () => {
        expect(([] as number[]).binarySearch(1)).toBe(-1)
    })

    it('can find boundary elements', () => {
        expect([1, 2, 3, 4, 5].binarySearch(1)).toBe(0)
        expect([1, 2, 3, 4, 5].binarySearch(5)).toBe(4)
    })

    it('supports a custom comparer', () => {
        const source = [9, 7, 5, 3, 1]

        expect(source.binarySearch(5, (a, b) => b - a)).toBe(2)
    })

    it('supports searching objects with a custom comparer', () => {
        const source = [
            { id: 1 },
            { id: 2 },
            { id: 3 },
        ]

        expect(source.binarySearch({ id: 2 }, (a, b) => a.id - b.id)).toBe(1)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3, 4, 5]

        expectArrayUnchanged(source, () => source.binarySearch(3))
    })
})

describe('findDuplicates', () => {
    it('returns values that appear more than once', () => {
        expect([1, 2, 1, 3, 2, 1].findDuplicates()).toEqual([1, 2])
    })

    it('returns an empty array when no duplicates exist', () => {
        expect([1, 2, 3].findDuplicates()).toEqual([])
    })

    it('returns an empty array for an empty source', () => {
        expect([].findDuplicates()).toEqual([])
    })

    it('uses Object.is semantics for NaN and signed zero', () => {
        expect([NaN, NaN, 1].findDuplicates()).toEqual([NaN])
        expect([0, -0, 0, -0].findDuplicates()).toEqual([0, -0])
    })

    it('can detect duplicate null and undefined values', () => {
        expect([null, undefined, null, undefined].findDuplicates()).toEqual([null, undefined])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 1, 3]

        expectArrayUnchanged(source, () => source.findDuplicates())
    })
})

describe('isCollectionOf', () => {
    it('returns true when every item satisfies the type guard', () => {
        const source: Array<number | string> = [1, 2, 3]

        expect(source.isCollectionOf((value): value is number => typeof value === 'number')).toBe(true)
    })

    it('returns false when at least one item does not satisfy the type guard', () => {
        const source: Array<number | string> = [1, '2', 3]

        expect(source.isCollectionOf((value): value is number => typeof value === 'number')).toBe(false)
    })

    it('returns true for an empty array', () => {
        const source: Array<number | string> = []

        expect(source.isCollectionOf((value): value is number => typeof value === 'number')).toBe(true)
    })

    it('works with nullish values', () => {
        const source: Array<number | null | undefined> = [1, null]

        expect(source.isCollectionOf((value): value is number => typeof value === 'number')).toBe(false)
    })
})

describe('isOfType', () => {
    it('returns true when every item satisfies the type guard', () => {
        const source: Array<number | string> = [1, 2, 3]

        expect(source.isOfType((value): value is number => typeof value === 'number')).toBe(true)
    })

    it('returns false when at least one item does not satisfy the type guard', () => {
        const source: Array<number | string> = [1, '2', 3]

        expect(source.isOfType((value): value is number => typeof value === 'number')).toBe(false)
    })

    it('returns true for an empty array', () => {
        const source: Array<number | string> = []

        expect(source.isOfType((value): value is number => typeof value === 'number')).toBe(true)
    })

    it('works with nullish values', () => {
        const source: Array<number | null | undefined> = [1, undefined]

        expect(source.isOfType((value): value is number => typeof value === 'number')).toBe(false)
    })
})

describe('isEmpty', () => {
    it('returns true for an empty array', () => {
        expect([].isEmpty()).toBe(true)
    })

    it('returns false for a non-empty array', () => {
        expect([1].isEmpty()).toBe(false)
    })
})

describe('isNotEmpty', () => {
    it('returns true for a non-empty array', () => {
        expect([1].isNotEmpty()).toBe(true)
    })

    it('returns false for an empty array', () => {
        expect([].isNotEmpty()).toBe(false)
    })
})

describe('forEachIndexed', () => {
    it('invokes the action for each item with its index', () => {
        const result: string[] = []

        ;['a', 'b', 'c'].forEachIndexed((item, index) => {
            result.push(`${index}:${item}`)
        })

        expect(result).toEqual(['0:a', '1:b', '2:c'])
    })

    it('does nothing for an empty array', () => {
        let calls = 0

        ;[].forEachIndexed(() => {
            calls++
        })

        expect(calls).toBe(0)
    })

    it('supports null and undefined values', () => {
        const result: Array<number | null | undefined> = []

        ;([null, undefined] as Array<number | null | undefined>).forEachIndexed((item) => {
            result.push(item)
        })

        expect(result).toEqual([null, undefined])
    })

    it('does not mutate the original array by itself', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.forEachIndexed(() => undefined))
    })
})
