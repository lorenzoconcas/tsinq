import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('one', () => {
    it('returns true when exactly one element matches', () => {
        expect([1, 2, 3].one((value) => value === 2)).toBe(true)
    })

    it('returns false when no element matches', () => {
        expect([1, 2, 3].one((value) => value > 10)).toBe(false)
    })

    it('returns false when more than one element matches', () => {
        expect([1, 2, 2, 3].one((value) => value === 2)).toBe(false)
    })

    it('returns false for an empty array', () => {
        expect(([] as number[]).one(() => true)).toBe(false)
    })

    it('supports null and undefined values', () => {
        expect(([1, null, undefined] as Array<number | null | undefined>).one((value) => value == null)).toBe(false)
        expect(([1, null, 2] as Array<number | null>).one((value) => value == null)).toBe(true)
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.one((value) => value === 2))
    })
})
