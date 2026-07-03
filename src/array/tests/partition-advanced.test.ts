import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('chunkBy', () => {
    it('groups adjacent items that share the same key', () => {
        expect(['A', 'A', 'B', 'B', 'A'].chunkBy((value) => value)).toEqual([
            ['A', 'A'],
            ['B', 'B'],
            ['A'],
        ])
    })

    it('returns an empty array for an empty source', () => {
        expect(([] as string[]).chunkBy((value) => value)).toEqual([])
    })

    it('supports nullish keys', () => {
        const source = [
            { key: null, value: 1 },
            { key: null, value: 2 },
            { key: undefined, value: 3 },
        ]

        expect(source.chunkBy((item) => item.key)).toEqual([
            [source[0], source[1]],
            [source[2]],
        ])
    })

    it('does not merge non-adjacent duplicate keys', () => {
        expect([1, 1, 2, 1].chunkBy((value) => value)).toEqual([[1, 1], [2], [1]])
    })

    it('does not mutate the original array', () => {
        const source = ['A', 'A', 'B']

        expectArrayUnchanged(source, () => source.chunkBy((value) => value))
    })
})

describe('window', () => {
    it('returns sliding windows of the requested size', () => {
        expect([1, 2, 3, 4].window(2)).toEqual([
            [1, 2],
            [2, 3],
            [3, 4],
        ])
    })

    it('supports larger windows', () => {
        expect([1, 2, 3, 4].window(3)).toEqual([
            [1, 2, 3],
            [2, 3, 4],
        ])
    })

    it('returns a single window when the size matches the array length', () => {
        expect([1, 2, 3].window(3)).toEqual([[1, 2, 3]])
    })

    it('returns an empty array when the size exceeds the array length', () => {
        expect([1, 2, 3].window(4)).toEqual([])
    })

    it('throws when the size is zero or negative', () => {
        expect(() => [1, 2, 3].window(0)).toThrow(RangeError)
        expect(() => [1, 2, 3].window(-1)).toThrow(RangeError)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3, 4]

        expectArrayUnchanged(source, () => source.window(2))
    })
})

describe('pairwise', () => {
    it('returns adjacent pairs', () => {
        expect([1, 2, 3, 4].pairwise()).toEqual([
            [1, 2],
            [2, 3],
            [3, 4],
        ])
    })

    it('returns an empty array for arrays shorter than two elements', () => {
        expect(([] as number[]).pairwise()).toEqual([])
        expect([1].pairwise()).toEqual([])
    })

    it('supports null and undefined values', () => {
        expect(([null, undefined, 1] as Array<number | null | undefined>).pairwise()).toEqual([
            [null, undefined],
            [undefined, 1],
        ])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.pairwise())
    })
})

describe('takeLast', () => {
    it('returns the last requested elements', () => {
        expect([1, 2, 3, 4].takeLast(2)).toEqual([3, 4])
    })

    it('returns the entire array when the count exceeds the length', () => {
        expect([1, 2].takeLast(10)).toEqual([1, 2])
    })

    it('returns an empty array for zero or negative counts', () => {
        expect([1, 2, 3].takeLast(0)).toEqual([])
        expect([1, 2, 3].takeLast(-1)).toEqual([])
    })

    it('returns an empty array for an empty source', () => {
        expect(([] as number[]).takeLast(2)).toEqual([])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.takeLast(2))
    })
})

describe('skipLast', () => {
    it('skips the last requested elements', () => {
        expect([1, 2, 3, 4].skipLast(2)).toEqual([1, 2])
    })

    it('returns an empty array when the count exceeds the length', () => {
        expect([1, 2].skipLast(10)).toEqual([])
    })

    it('returns a copy for zero or negative counts', () => {
        const source = [1, 2, 3]

        expect(source.skipLast(0)).toEqual([1, 2, 3])
        expect(source.skipLast(-1)).toEqual([1, 2, 3])
    })

    it('returns an empty array for an empty source', () => {
        expect(([] as number[]).skipLast(2)).toEqual([])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.skipLast(2))
    })
})
