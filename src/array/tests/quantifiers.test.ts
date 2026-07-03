import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('any', () => {
    it('returns true when at least one item matches the predicate', () => {
        expect([1, 2, 3].any((value) => value > 2)).toBe(true)
    })

    it('returns false for an empty array when no predicate is provided', () => {
        expect([].any()).toBe(false)
    })

    it('returns true for a non-empty array when no predicate is provided', () => {
        expect([0].any()).toBe(true)
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].any((_, index) => index === 2)).toBe(true)
    })

    it('can match null and undefined values', () => {
        expect([1, null, undefined].any((value) => value == null)).toBe(true)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.any((value) => value === 2))
    })
})

describe('all', () => {
    it('returns true when every item matches the predicate', () => {
        expect([2, 4, 6].all((value) => value % 2 === 0)).toBe(true)
    })

    it('returns false when at least one item does not match the predicate', () => {
        expect([2, 3, 6].all((value) => value % 2 === 0)).toBe(false)
    })

    it('returns true for an empty array', () => {
        expect([].all(() => false)).toBe(true)
    })

    it('preserves duplicate matching values', () => {
        expect([1, 1, 1].all((value) => value === 1)).toBe(true)
    })

    it('can validate null and undefined values', () => {
        expect([null, undefined].all((value) => value == null)).toBe(true)
    })

    it('does not mutate the original array', () => {
        const source = [2, 4, 6]

        expectArrayUnchanged(source, () => source.all((value) => value > 0))
    })
})

describe('none', () => {
    it('returns true when no item matches the predicate', () => {
        expect([1, 2, 3].none((value) => value > 10)).toBe(true)
    })

    it('returns false when at least one item matches the predicate', () => {
        expect([1, 2, 3].none((value) => value === 2)).toBe(false)
    })

    it('returns true for an empty array when no predicate is provided', () => {
        expect([].none()).toBe(true)
    })

    it('returns false for a non-empty array when no predicate is provided', () => {
        expect([1].none()).toBe(false)
    })

    it('can validate null and undefined values', () => {
        expect([1, null, 3].none((value) => value == null)).toBe(false)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.none((value) => value < 0))
    })
})

describe('contains', () => {
    it('returns true when the value is present', () => {
        expect([1, 2, 3].contains(2)).toBe(true)
    })

    it('returns false for an empty array', () => {
        expect(([] as number[]).contains(1)).toBe(false)
    })

    it('recognizes duplicate values', () => {
        expect([1, 1, 2].contains(1)).toBe(true)
    })

    it('uses Object.is semantics for NaN', () => {
        expect([NaN].contains(NaN)).toBe(true)
    })

    it('uses Object.is semantics for signed zero', () => {
        expect([0].contains(-0)).toBe(false)
        expect([-0].contains(0)).toBe(false)
    })

    it('can find null and undefined values', () => {
        expect([null, undefined].contains(undefined)).toBe(true)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.contains(2))
    })
})
