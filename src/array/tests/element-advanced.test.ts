import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('firstOrThrow', () => {
    it('returns the first element', () => {
        expect([1, 2, 3].firstOrThrow()).toBe(1)
    })

    it('returns the first matching element', () => {
        expect([1, 2, 3, 4].firstOrThrow((value) => value % 2 === 0)).toBe(2)
    })

    it('throws for an empty array', () => {
        expect(() => ([] as number[]).firstOrThrow()).toThrow(Error)
    })

    it('throws when no element matches the predicate', () => {
        expect(() => [1, 2, 3].firstOrThrow((value) => value > 10)).toThrow(Error)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.firstOrThrow())
    })
})

describe('lastOrThrow', () => {
    it('returns the last element', () => {
        expect([1, 2, 3].lastOrThrow()).toBe(3)
    })

    it('returns the last matching element', () => {
        expect([1, 2, 3, 4].lastOrThrow((value) => value % 2 === 0)).toBe(4)
    })

    it('throws for an empty array', () => {
        expect(() => ([] as number[]).lastOrThrow()).toThrow(Error)
    })

    it('throws when no element matches the predicate', () => {
        expect(() => [1, 2, 3].lastOrThrow((value) => value > 10)).toThrow(Error)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.lastOrThrow())
    })
})

describe('singleOrThrow', () => {
    it('returns the only element in the array', () => {
        expect([42].singleOrThrow()).toBe(42)
    })

    it('returns the only matching element', () => {
        expect([1, 2, 3].singleOrThrow((value) => value === 2)).toBe(2)
    })

    it('throws for an empty array', () => {
        expect(() => ([] as number[]).singleOrThrow()).toThrow(Error)
    })

    it('throws when more than one element exists without a predicate', () => {
        expect(() => [1, 2].singleOrThrow()).toThrow(Error)
    })

    it('throws when more than one element matches the predicate', () => {
        expect(() => [1, 2, 2, 3].singleOrThrow((value) => value === 2)).toThrow(Error)
    })

    it('supports null values when exactly one element matches', () => {
        expect(([1, null, 3] as Array<number | null>).singleOrThrow((value) => value == null)).toBeNull()
    })

    it('does not mutate the original array', () => {
        const source = [42]

        expectArrayUnchanged(source, () => source.singleOrThrow())
    })
})
