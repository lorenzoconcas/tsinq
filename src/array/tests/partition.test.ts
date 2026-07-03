import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('skip', () => {
    it('skips the requested number of items', () => {
        expect([1, 2, 3, 4].skip(2)).toEqual([3, 4])
    })

    it('returns an empty array when skipping the entire array', () => {
        expect([1, 2].skip(2)).toEqual([])
    })

    it('returns a copy when the count is zero or negative', () => {
        expect([1, 2, 3].skip(0)).toEqual([1, 2, 3])
        expect([1, 2, 3].skip(-1)).toEqual([1, 2, 3])
    })

    it('preserves duplicate values', () => {
        expect([1, 1, 2, 2].skip(1)).toEqual([1, 2, 2])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.skip(1))
    })
})

describe('take', () => {
    it('takes the requested number of items', () => {
        expect([1, 2, 3, 4].take(2)).toEqual([1, 2])
    })

    it('returns the whole array when the count is larger than the length', () => {
        expect([1, 2].take(10)).toEqual([1, 2])
    })

    it('returns an empty array when the count is zero or negative', () => {
        expect([1, 2, 3].take(0)).toEqual([])
        expect([1, 2, 3].take(-1)).toEqual([])
    })

    it('preserves duplicate values', () => {
        expect([1, 1, 2, 2].take(3)).toEqual([1, 1, 2])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.take(2))
    })
})

describe('skipWhile', () => {
    it('skips values while the predicate is true', () => {
        expect([1, 2, 3, 1].skipWhile((value) => value < 3)).toEqual([3, 1])
    })

    it('returns an empty array when all items match', () => {
        expect([1, 2, 3].skipWhile((value) => value < 10)).toEqual([])
    })

    it('returns the whole array when the first item does not match', () => {
        expect([3, 1, 2].skipWhile((value) => value < 3)).toEqual([3, 1, 2])
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].skipWhile((_, index) => index < 2)).toEqual(['c'])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.skipWhile((value) => value < 2))
    })
})

describe('takeWhile', () => {
    it('takes values while the predicate is true', () => {
        expect([1, 2, 3, 1].takeWhile((value) => value < 3)).toEqual([1, 2])
    })

    it('returns an empty array when the first item does not match', () => {
        expect([3, 1, 2].takeWhile((value) => value < 3)).toEqual([])
    })

    it('returns the whole array when all items match', () => {
        expect([1, 2, 3].takeWhile((value) => value < 10)).toEqual([1, 2, 3])
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].takeWhile((_, index) => index < 2)).toEqual(['a', 'b'])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.takeWhile((value) => value < 3))
    })
})

describe('chunk', () => {
    it('splits the array into chunks of the requested size', () => {
        expect([1, 2, 3, 4, 5].chunk(2)).toEqual([[1, 2], [3, 4], [5]])
    })

    it('returns an empty array for an empty source', () => {
        expect([].chunk(2)).toEqual([])
    })

    it('returns a single chunk when the size exceeds the array length', () => {
        expect([1, 2, 3].chunk(10)).toEqual([[1, 2, 3]])
    })

    it('throws when the size is zero or negative', () => {
        expect(() => [1, 2, 3].chunk(0)).toThrow(RangeError)
        expect(() => [1, 2, 3].chunk(-1)).toThrow(RangeError)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.chunk(2))
    })
})

describe('partition', () => {
    it('splits items into matches and non-matches', () => {
        expect([1, 2, 3, 4].partition((value) => value % 2 === 0)).toEqual([
            [2, 4],
            [1, 3],
        ])
    })

    it('returns two empty arrays for an empty source', () => {
        expect([].partition(() => true)).toEqual([[], []])
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].partition((_, index) => index % 2 === 0)).toEqual([
            ['a', 'c'],
            ['b'],
        ])
    })

    it('preserves duplicate values', () => {
        expect([1, 1, 2, 2].partition((value) => value === 1)).toEqual([
            [1, 1],
            [2, 2],
        ])
    })

    it('can partition null and undefined values', () => {
        expect([null, 1, undefined].partition((value) => value == null)).toEqual([
            [null, undefined],
            [1],
        ])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.partition((value) => value > 1))
    })
})

describe('split', () => {
    it('splits around matching separator items like String.split', () => {
        expect([1, 2, 0, 3, 4, 0, 5].split((value) => value === 0)).toEqual([
            [1, 2],
            [3, 4],
            [5],
        ])
    })

    it('keeps a leading empty group when the first item is a separator', () => {
        expect([0, 1].split((value) => value === 0)).toEqual([[], [1]])
    })

    it('keeps a trailing empty group when the last item is a separator', () => {
        expect([1, 0].split((value) => value === 0)).toEqual([[1], []])
    })

    it('creates empty groups for consecutive separators', () => {
        expect([0, 0].split((value) => value === 0)).toEqual([[], [], []])
    })

    it('returns one empty group for an empty array', () => {
        expect([].split(() => true)).toEqual([[]])
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].split((_, index) => index === 1)).toEqual([['a'], ['c']])
    })

    it('does not mutate the original array', () => {
        const source = [1, 0, 2]

        expectArrayUnchanged(source, () => source.split((value) => value === 0))
    })
})
