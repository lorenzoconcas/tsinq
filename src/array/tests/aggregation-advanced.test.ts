import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('scan', () => {
    it('returns intermediate states without a seed', () => {
        expect([1, 2, 3].scan((current, item) => current + item)).toEqual([1, 3, 6])
    })

    it('returns intermediate states with a seed', () => {
        expect([1, 2, 3].scan(10, (current, item) => current + item)).toEqual([11, 13, 16])
    })

    it('returns an empty array for an empty source', () => {
        const source: number[] = []

        expect(source.scan((current, item) => current + item)).toEqual([])
        expect(source.scan(10, (current, item) => current + item)).toEqual([])
    })

    it('returns the original item for a single-element array without a seed', () => {
        expect([5].scan((current, item) => current + item)).toEqual([5])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.scan((current, item) => current + item))
    })
})

describe('minBy', () => {
    it('returns the element with the minimum selected key', () => {
        const source = [
            { id: 'a', score: 3 },
            { id: 'b', score: 1 },
            { id: 'c', score: 2 },
        ]

        expect(source.minBy((item) => item.score)).toEqual(source[1])
    })

    it('returns undefined for an empty array', () => {
        expect(([] as Array<{ score: number }>).minBy((item) => item.score)).toBeUndefined()
    })

    it('returns the first element when keys are duplicated', () => {
        const source = [
            { id: 'a', score: 1 },
            { id: 'b', score: 1 },
            { id: 'c', score: 2 },
        ]

        expect(source.minBy((item) => item.score)).toEqual(source[0])
    })

    it('treats nullish keys as smaller than defined keys', () => {
        const source = [
            { id: 'a', score: 2 },
            { id: 'b', score: null },
            { id: 'c', score: 1 },
        ]

        expect(source.minBy((item) => item.score)).toEqual(source[1])
    })

    it('does not mutate the original array', () => {
        const source = [
            { id: 'a', score: 3 },
            { id: 'b', score: 1 },
        ]

        expectArrayUnchanged(source, () => source.minBy((item) => item.score))
    })
})

describe('maxBy', () => {
    it('returns the element with the maximum selected key', () => {
        const source = [
            { id: 'a', score: 3 },
            { id: 'b', score: 1 },
            { id: 'c', score: 2 },
        ]

        expect(source.maxBy((item) => item.score)).toEqual(source[0])
    })

    it('returns undefined for an empty array', () => {
        expect(([] as Array<{ score: number }>).maxBy((item) => item.score)).toBeUndefined()
    })

    it('returns the first element when keys are duplicated', () => {
        const source = [
            { id: 'a', score: 3 },
            { id: 'b', score: 3 },
            { id: 'c', score: 2 },
        ]

        expect(source.maxBy((item) => item.score)).toEqual(source[0])
    })

    it('treats defined keys as greater than nullish keys', () => {
        const source = [
            { id: 'a', score: null },
            { id: 'b', score: 2 },
            { id: 'c', score: undefined },
        ]

        expect(source.maxBy((item) => item.score)).toEqual(source[1])
    })

    it('does not mutate the original array', () => {
        const source = [
            { id: 'a', score: 3 },
            { id: 'b', score: 1 },
        ]

        expectArrayUnchanged(source, () => source.maxBy((item) => item.score))
    })
})
