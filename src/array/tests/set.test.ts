import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('distinct', () => {
    it('removes duplicate values', () => {
        expect([1, 2, 2, 3, 1].distinct()).toEqual([1, 2, 3])
    })

    it('returns an empty array for an empty source', () => {
        expect([].distinct()).toEqual([])
    })

    it('deduplicates NaN values', () => {
        expect([NaN, NaN, 1].distinct()).toEqual([NaN, 1])
    })

    it('supports null and undefined values', () => {
        expect([null, null, undefined, undefined].distinct()).toEqual([null, undefined])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 2, 3]

        expectArrayUnchanged(source, () => source.distinct())
    })
})

describe('distinctBy', () => {
    it('removes duplicates based on the selected key', () => {
        const source = [
            { id: 1, group: 'a' },
            { id: 2, group: 'a' },
            { id: 3, group: 'b' },
        ]

        expect(source.distinctBy((item) => item.group)).toEqual([source[0], source[2]])
    })

    it('returns an empty array for an empty source', () => {
        expect([].distinctBy((value) => value)).toEqual([])
    })

    it('keeps the first item for duplicate keys', () => {
        const source = [
            { id: 1, group: 1 },
            { id: 2, group: 1 },
            { id: 3, group: 1 },
        ]

        expect(source.distinctBy((item) => item.group)).toEqual([source[0]])
    })

    it('supports nullish keys', () => {
        const source = [
            { id: 1, group: null },
            { id: 2, group: null },
            { id: 3, group: undefined },
        ]

        expect(source.distinctBy((item) => item.group)).toEqual([source[0], source[2]])
    })

    it('does not mutate the original array', () => {
        const source = [
            { id: 1, group: 'a' },
            { id: 2, group: 'a' },
        ]

        expectArrayUnchanged(source, () => source.distinctBy((item) => item.group))
    })
})

describe('union', () => {
    it('returns the union of two arrays', () => {
        expect([1, 2].union([2, 3, 4])).toEqual([1, 2, 3, 4])
    })

    it('returns a copy of the source when the other array is empty', () => {
        expect([1, 2].union([])).toEqual([1, 2])
    })

    it('keeps duplicate values already present in the source array', () => {
        expect([1, 1, 2].union([2, 3, 3])).toEqual([1, 1, 2, 3])
    })

    it('uses includes semantics for NaN', () => {
        expect([NaN].union([NaN, 1])).toEqual([NaN, 1])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2]

        expectArrayUnchanged(source, () => source.union([2, 3]))
    })
})

describe('intersect', () => {
    it('returns items present in both arrays', () => {
        expect([1, 2, 3].intersect([2, 3, 4])).toEqual([2, 3])
    })

    it('returns an empty array when one side is empty', () => {
        expect([1, 2].intersect([])).toEqual([])
    })

    it('returns distinct matches in the order of the first array', () => {
        expect([2, 1, 2, 3, 3].intersect([3, 2])).toEqual([2, 3])
    })

    it('uses includes semantics for NaN', () => {
        expect([NaN, 1].intersect([NaN, 2])).toEqual([NaN])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.intersect([2, 3]))
    })
})

describe('except', () => {
    it('returns items that are not present in the other array', () => {
        expect([1, 2, 3, 4].except([2, 4])).toEqual([1, 3])
    })

    it('returns a copy of the source when the other array is empty', () => {
        expect([1, 2].except([])).toEqual([1, 2])
    })

    it('preserves duplicates that are not removed', () => {
        expect([1, 1, 2, 3].except([2])).toEqual([1, 1, 3])
    })

    it('uses includes semantics for NaN', () => {
        expect([NaN, 1].except([NaN])).toEqual([1])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.except([2]))
    })
})
