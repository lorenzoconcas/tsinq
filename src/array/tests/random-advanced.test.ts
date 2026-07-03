import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('shuffle', () => {
    it('returns the same result for the same seed', () => {
        const source = [1, 2, 3, 4, 5]

        expect(source.shuffle(12345)).toEqual(source.shuffle(12345))
    })

    it('returns an empty array for an empty source even with a seed', () => {
        expect(([] as number[]).shuffle(123)).toEqual([])
    })

    it('preserves duplicate values with a deterministic seed', () => {
        expect([1, 1, 2, 3].shuffle(42).slice().sort()).toEqual([1, 1, 2, 3])
    })

    it('does not mutate the original array when using a seed', () => {
        const source = [1, 2, 3, 4]

        expectArrayUnchanged(source, () => source.shuffle(123))
    })
})
