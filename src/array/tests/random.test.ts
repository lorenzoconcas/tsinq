import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

function withMockedRandom<T>(
    values: number[],
    action: () => T
): T {
    const originalRandom = Math.random
    let index = 0

    Math.random = () => {
        const value = values[index]

        index++

        return value ?? values[values.length - 1] ?? 0
    }

    try {
        return action()
    } finally {
        Math.random = originalRandom
    }
}

describe('shuffle', () => {
    it('returns a shuffled copy of the array', () => {
        const result = withMockedRandom([0.1, 0.7, 0.2], () => [1, 2, 3, 4].shuffle())

        expect(result).toEqual([2, 4, 3, 1])
    })

    it('returns an empty array for an empty source', () => {
        expect([].shuffle()).toEqual([])
    })

    it('preserves duplicate values', () => {
        const result = withMockedRandom([0.2, 0.4], () => [1, 1, 2].shuffle())

        expect(result).toEqual([1, 2, 1])
    })

    it('returns a new array instance', () => {
        const source = [1, 2, 3]
        const result = withMockedRandom([0.5, 0.5], () => source.shuffle())

        expect(result).toEqual([1, 3, 2])
        expect(result).not.toBe(source)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3, 4]

        expectArrayUnchanged(source, () =>
            withMockedRandom([0.1, 0.7, 0.2], () => source.shuffle())
        )
    })
})

describe('random', () => {
    it('returns a random item from the array', () => {
        const result = withMockedRandom([0.6], () => [10, 20, 30, 40].random())

        expect(result).toBe(30)
    })

    it('returns undefined for an empty array', () => {
        expect([].random()).toBeUndefined()
    })

    it('can return the first and last items', () => {
        expect(withMockedRandom([0], () => [10, 20, 30].random())).toBe(10)
        expect(withMockedRandom([0.999999], () => [10, 20, 30].random())).toBe(30)
    })

    it('can return null and undefined values', () => {
        expect(withMockedRandom([0], () => [null, 1].random())).toBeNull()
        expect(withMockedRandom([0.5], () => [null, undefined].random())).toBeUndefined()
    })

    it('does not mutate the original array', () => {
        const source = [10, 20, 30]

        expectArrayUnchanged(source, () => withMockedRandom([0.4], () => source.random()))
    })
})

describe('randomOrDefault', () => {
    it('returns a random item when the array is not empty', () => {
        const result = withMockedRandom([0.6], () => [10, 20, 30, 40].randomOrDefault(0))

        expect(result).toBe(30)
    })

    it('returns the default value for an empty array', () => {
        expect(([] as number[]).randomOrDefault(99)).toBe(99)
    })

    it('can use null as the default value', () => {
        expect(([] as Array<number | null>).randomOrDefault(null)).toBeNull()
    })

    it('does not mutate the original array', () => {
        const source = [10, 20, 30]

        expectArrayUnchanged(source, () =>
            withMockedRandom([0.4], () => source.randomOrDefault(0))
        )
    })
})

describe('sample', () => {
    it('returns a deterministic sample when the count is provided', () => {
        const result = withMockedRandom([0.1, 0.7, 0.2], () => [1, 2, 3, 4].sample(2))

        expect(result).toEqual([2, 4])
    })

    it('returns a single-element sample when the count is omitted', () => {
        const result = withMockedRandom([0.6, 0.1, 0.9], () => [1, 2, 3, 4].sample())

        expect(result).toEqual([4])
    })

    it('returns an empty array for an empty source', () => {
        expect([].sample()).toEqual([])
    })

    it('returns an empty array when the count is zero or negative', () => {
        expect([1, 2, 3].sample(0)).toEqual([])
        expect([1, 2, 3].sample(-1)).toEqual([])
    })

    it('truncates non-integer counts', () => {
        const result = withMockedRandom([0.1, 0.7, 0.2], () => [1, 2, 3, 4].sample(2.9))

        expect(result).toEqual([2, 4])
    })

    it('returns a shuffled copy when the requested count exceeds the array length', () => {
        const result = withMockedRandom([0.1, 0.7, 0.2], () => [1, 2, 3, 4].sample(10))

        expect(result).toEqual([2, 4, 3, 1])
    })

    it('preserves duplicate values from the source positions', () => {
        const result = withMockedRandom([0.2, 0.4], () => [1, 1, 2].sample(3))

        expect(result).toEqual([1, 2, 1])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3, 4]

        expectArrayUnchanged(source, () =>
            withMockedRandom([0.1, 0.7, 0.2], () => source.sample(2))
        )
    })
})
