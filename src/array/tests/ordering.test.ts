import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('orderBy', () => {
    it('sorts values in ascending order', () => {
        expect([3, 1, 2].orderBy((value) => value)).toEqual([1, 2, 3])
    })

    it('returns an empty array for an empty source', () => {
        expect([].orderBy((value) => value)).toEqual([])
    })

    it('keeps the sort stable when keys are duplicated', () => {
        const source = [
            { id: 'a', rank: 2 },
            { id: 'b', rank: 1 },
            { id: 'c', rank: 1 },
            { id: 'd', rank: 2 },
        ]

        expect(source.orderBy((item) => item.rank).map((item) => item.id)).toEqual([
            'b',
            'c',
            'a',
            'd',
        ])
    })

    it('places nullish keys before defined keys', () => {
        const source = [
            { id: 'defined', rank: 2 },
            { id: 'null', rank: null },
            { id: 'undefined', rank: undefined },
            { id: 'low', rank: 1 },
        ]

        expect(source.orderBy((item) => item.rank).map((item) => item.id)).toEqual([
            'null',
            'undefined',
            'low',
            'defined',
        ])
    })

    it('does not mutate the original array', () => {
        const source = [3, 1, 2]

        expectArrayUnchanged(source, () => source.orderBy((value) => value))
    })
})

describe('orderByDescending', () => {
    it('sorts values in descending order', () => {
        expect([3, 1, 2].orderByDescending((value) => value)).toEqual([3, 2, 1])
    })

    it('returns an empty array for an empty source', () => {
        expect([].orderByDescending((value) => value)).toEqual([])
    })

    it('keeps the sort stable when keys are duplicated', () => {
        const source = [
            { id: 'a', rank: 2 },
            { id: 'b', rank: 3 },
            { id: 'c', rank: 3 },
            { id: 'd', rank: 1 },
        ]

        expect(source.orderByDescending((item) => item.rank).map((item) => item.id)).toEqual([
            'b',
            'c',
            'a',
            'd',
        ])
    })

    it('places nullish keys after defined keys', () => {
        const source = [
            { id: 'defined', rank: 2 },
            { id: 'null', rank: null },
            { id: 'undefined', rank: undefined },
            { id: 'high', rank: 3 },
        ]

        expect(source.orderByDescending((item) => item.rank).map((item) => item.id)).toEqual([
            'high',
            'defined',
            'null',
            'undefined',
        ])
    })

    it('does not mutate the original array', () => {
        const source = [3, 1, 2]

        expectArrayUnchanged(source, () => source.orderByDescending((value) => value))
    })
})

describe('thenBy', () => {
    it('sorts values in ascending order when used directly', () => {
        expect([3, 1, 2].thenBy((value) => value)).toEqual([1, 2, 3])
    })

    it('keeps the sort stable when keys are duplicated', () => {
        const source = [
            { id: 'a', rank: 2 },
            { id: 'b', rank: 1 },
            { id: 'c', rank: 1 },
        ]

        expect(source.thenBy((item) => item.rank).map((item) => item.id)).toEqual(['b', 'c', 'a'])
    })

    it('documents the current chained behavior, which re-sorts from scratch', () => {
        // TODO: update this expectation when thenBy becomes a true secondary sort.
        const source = [
            { id: 'a', primary: 1, secondary: 2 },
            { id: 'b', primary: 2, secondary: 1 },
            { id: 'c', primary: 1, secondary: 1 },
        ]

        expect(
            source
                .orderBy((item) => item.primary)
                .thenBy((item) => item.secondary)
                .map((item) => item.id)
        ).toEqual(['c', 'b', 'a'])
    })

    it('does not mutate the original array', () => {
        const source = [3, 1, 2]

        expectArrayUnchanged(source, () => source.thenBy((value) => value))
    })
})

describe('thenByDescending', () => {
    it('sorts values in descending order when used directly', () => {
        expect([3, 1, 2].thenByDescending((value) => value)).toEqual([3, 2, 1])
    })

    it('keeps the sort stable when keys are duplicated', () => {
        const source = [
            { id: 'a', rank: 2 },
            { id: 'b', rank: 3 },
            { id: 'c', rank: 3 },
        ]

        expect(source.thenByDescending((item) => item.rank).map((item) => item.id)).toEqual([
            'b',
            'c',
            'a',
        ])
    })

    it('documents the current chained behavior, which re-sorts from scratch', () => {
        // TODO: update this expectation when thenByDescending becomes a true secondary sort.
        const source = [
            { id: 'a', primary: 1, secondary: 1 },
            { id: 'b', primary: 2, secondary: 3 },
            { id: 'c', primary: 1, secondary: 2 },
        ]

        expect(
            source
                .orderBy((item) => item.primary)
                .thenByDescending((item) => item.secondary)
                .map((item) => item.id)
        ).toEqual(['b', 'c', 'a'])
    })

    it('does not mutate the original array', () => {
        const source = [3, 1, 2]

        expectArrayUnchanged(source, () => source.thenByDescending((value) => value))
    })
})

describe('reverseCopy', () => {
    it('returns the array in reverse order', () => {
        expect([1, 2, 3].reverseCopy()).toEqual([3, 2, 1])
    })

    it('returns an empty array for an empty source', () => {
        expect([].reverseCopy()).toEqual([])
    })

    it('preserves duplicate values', () => {
        expect([1, 2, 2, 3].reverseCopy()).toEqual([3, 2, 2, 1])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.reverseCopy())
    })
})
