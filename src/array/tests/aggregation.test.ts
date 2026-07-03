import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('count', () => {
    it('returns the number of items in the array', () => {
        expect([1, 2, 3].count()).toBe(3)
    })

    it('returns zero for an empty array', () => {
        expect([].count()).toBe(0)
    })

    it('counts only items that match the predicate', () => {
        expect([1, 2, 3, 4].count((value) => value % 2 === 0)).toBe(2)
    })

    it('counts duplicate values independently', () => {
        expect([1, 1, 2, 1].count((value) => value === 1)).toBe(3)
    })

    it('can count null and undefined values', () => {
        expect([null, 1, undefined].count((value) => value == null)).toBe(2)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.count())
    })
})

describe('sum', () => {
    it('sums numeric values', () => {
        expect([1, 2, 3].sum()).toBe(6)
    })

    it('returns zero for an empty numeric array', () => {
        expect([].sum()).toBe(0)
    })

    it('sums projected values', () => {
        expect([{ value: 1 }, { value: 2 }, { value: 3 }].sum((item) => item.value)).toBe(6)
    })

    it('supports negative values and duplicates', () => {
        expect([5, -2, -2].sum()).toBe(1)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.sum())
    })
})

describe('average', () => {
    it('returns the arithmetic mean of numeric values', () => {
        expect([2, 4, 6].average()).toBe(4)
    })

    it('returns undefined for an empty array', () => {
        expect([].average()).toBeUndefined()
    })

    it('averages projected values', () => {
        expect([{ value: 2 }, { value: 4 }, { value: 6 }].average((item) => item.value)).toBe(4)
    })

    it('supports duplicate values', () => {
        expect([3, 3, 3].average()).toBe(3)
    })

    it('does not mutate the original array', () => {
        const source = [2, 4, 6]

        expectArrayUnchanged(source, () => source.average())
    })
})

describe('min', () => {
    it('returns the smallest numeric value', () => {
        expect([3, 1, 2].min()).toBe(1)
    })

    it('returns undefined for an empty array', () => {
        expect([].min()).toBeUndefined()
    })

    it('returns the minimum projected value', () => {
        expect([{ value: 3 }, { value: 1 }, { value: 2 }].min((item) => item.value)).toBe(1)
    })

    it('supports duplicate and negative values', () => {
        expect([-1, -5, -5, 2].min()).toBe(-5)
    })

    it('does not mutate the original array', () => {
        const source = [3, 1, 2]

        expectArrayUnchanged(source, () => source.min())
    })
})

describe('max', () => {
    it('returns the largest numeric value', () => {
        expect([3, 1, 2].max()).toBe(3)
    })

    it('returns undefined for an empty array', () => {
        expect([].max()).toBeUndefined()
    })

    it('returns the maximum projected value', () => {
        expect([{ value: 3 }, { value: 1 }, { value: 2 }].max((item) => item.value)).toBe(3)
    })

    it('supports duplicate and negative values', () => {
        expect([-1, -5, -5, 2].max()).toBe(2)
    })

    it('does not mutate the original array', () => {
        const source = [3, 1, 2]

        expectArrayUnchanged(source, () => source.max())
    })
})

describe('aggregate', () => {
    it('aggregates values using the provided seed', () => {
        expect([1, 2, 3].aggregate(0, (current, item) => current + item)).toBe(6)
    })

    it('returns the seed for an empty array', () => {
        expect([].aggregate('seed', (current, item) => `${current}${item}`)).toBe('seed')
    })

    it('can build non-primitive results', () => {
        expect(
            ['a', 'b', 'c'].aggregate([] as string[], (current, item) => [...current, item.toUpperCase()])
        ).toEqual(['A', 'B', 'C'])
    })

    it('processes duplicate values in order', () => {
        expect([1, 1, 1].aggregate('', (current, item) => current + item.toString())).toBe('111')
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.aggregate(0, (current, item) => current + item))
    })
})
