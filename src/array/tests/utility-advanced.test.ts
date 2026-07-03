import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('sequenceCompare', () => {
    it('returns 0 for equal sequences', () => {
        expect([1, 2, 3].sequenceCompare([1, 2, 3])).toBe(0)
    })

    it('returns -1 when the current sequence is lexicographically smaller', () => {
        expect([1, 2, 3].sequenceCompare([1, 2, 4])).toBe(-1)
    })

    it('returns 1 when the current sequence is lexicographically greater', () => {
        expect([1, 3].sequenceCompare([1, 2, 9])).toBe(1)
    })

    it('compares by length when one sequence is a prefix of the other', () => {
        expect([1, 2].sequenceCompare([1, 2, 3])).toBe(-1)
        expect([1, 2, 3].sequenceCompare([1, 2])).toBe(1)
    })

    it('supports nullish values', () => {
        expect(([null, 1] as Array<number | null>).sequenceCompare([0, 1] as Array<number | null>)).toBe(-1)
    })
})

describe('rotateLeft', () => {
    it('rotates the array to the left', () => {
        expect([1, 2, 3, 4].rotateLeft(1)).toEqual([2, 3, 4, 1])
    })

    it('normalizes counts larger than the array length', () => {
        expect([1, 2, 3, 4].rotateLeft(5)).toEqual([2, 3, 4, 1])
    })

    it('supports negative counts', () => {
        expect([1, 2, 3, 4].rotateLeft(-1)).toEqual([4, 1, 2, 3])
    })

    it('returns an empty array for an empty source', () => {
        expect(([] as number[]).rotateLeft(3)).toEqual([])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.rotateLeft(1))
    })
})

describe('rotateRight', () => {
    it('rotates the array to the right', () => {
        expect([1, 2, 3, 4].rotateRight(1)).toEqual([4, 1, 2, 3])
    })

    it('normalizes counts larger than the array length', () => {
        expect([1, 2, 3, 4].rotateRight(5)).toEqual([4, 1, 2, 3])
    })

    it('supports negative counts', () => {
        expect([1, 2, 3, 4].rotateRight(-1)).toEqual([2, 3, 4, 1])
    })

    it('returns an empty array for an empty source', () => {
        expect(([] as number[]).rotateRight(3)).toEqual([])
    })
})

describe('permutations', () => {
    it('returns all permutations of the array', () => {
        expect([1, 2, 3].permutations()).toEqual([
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1],
        ])
    })

    it('returns one empty permutation for an empty array', () => {
        expect(([] as number[]).permutations()).toEqual([[]])
    })

    it('preserves duplicate values as positional permutations', () => {
        expect([1, 1].permutations()).toEqual([
            [1, 1],
            [1, 1],
        ])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.permutations())
    })
})

describe('cartesian', () => {
    it('returns the cartesian product of two arrays', () => {
        expect([1, 2].cartesian(['a', 'b'])).toEqual([
            [1, 'a'],
            [1, 'b'],
            [2, 'a'],
            [2, 'b'],
        ])
    })

    it('returns an empty array when either side is empty', () => {
        expect([1, 2].cartesian([] as string[])).toEqual([])
        expect(([] as number[]).cartesian(['a'])).toEqual([])
    })

    it('supports nullish values', () => {
        expect(([null] as Array<number | null>).cartesian([undefined])).toEqual([[null, undefined]])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2]

        expectArrayUnchanged(source, () => source.cartesian(['a']))
    })
})

describe('pad', () => {
    it('extends the array up to the requested length', () => {
        expect([1, 2].pad(4, 0)).toEqual([1, 2, 0, 0])
    })

    it('returns a copy when the target length is not greater than the current length', () => {
        const source = [1, 2, 3]
        const result = source.pad(2, 0)

        expect(result).toEqual([1, 2, 3])
        expect(result).not.toBe(source)
    })

    it('supports null padding values', () => {
        expect(([1] as Array<number | null>).pad(3, null)).toEqual([1, null, null])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2]

        expectArrayUnchanged(source, () => source.pad(4, 0))
    })
})

describe('repeat', () => {
    it('repeats the array contents the requested number of times', () => {
        expect([1, 2].repeat(3)).toEqual([1, 2, 1, 2, 1, 2])
    })

    it('returns an empty array for zero or negative counts', () => {
        expect([1, 2].repeat(0)).toEqual([])
        expect([1, 2].repeat(-1)).toEqual([])
    })

    it('returns an empty array for an empty source', () => {
        expect(([] as number[]).repeat(3)).toEqual([])
    })

    it('truncates non-integer counts', () => {
        expect([1, 2].repeat(2.9)).toEqual([1, 2, 1, 2])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2]

        expectArrayUnchanged(source, () => source.repeat(2))
    })
})
