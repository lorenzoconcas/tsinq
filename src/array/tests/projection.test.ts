import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('select', () => {
    it('projects each item into a new value', () => {
        expect([1, 2, 3].select((value) => value * 10)).toEqual([10, 20, 30])
    })

    it('returns an empty array for an empty source', () => {
        expect([].select((value) => value)).toEqual([])
    })

    it('passes the item index to the selector', () => {
        expect(['a', 'b', 'c'].select((value, index) => `${index}:${value}`)).toEqual([
            '0:a',
            '1:b',
            '2:c',
        ])
    })

    it('preserves duplicate inputs as separate projected items', () => {
        expect([2, 2, 2].select((value) => value + 1)).toEqual([3, 3, 3])
    })

    it('can project null and undefined values', () => {
        expect([null, undefined, 2].select((value) => value ?? 'missing')).toEqual([
            'missing',
            'missing',
            2,
        ])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.select((value) => value * 2))
    })
})

describe('selectMany', () => {
    it('projects and flattens the resulting arrays', () => {
        expect([1, 2, 3].selectMany((value) => [value, value * 10])).toEqual([
            1,
            10,
            2,
            20,
            3,
            30,
        ])
    })

    it('returns an empty array for an empty source', () => {
        expect([].selectMany((value) => [value])).toEqual([])
    })

    it('passes the item index to the selector', () => {
        expect(['a', 'b'].selectMany((value, index) => [index, value])).toEqual([
            0,
            'a',
            1,
            'b',
        ])
    })

    it('supports selectors that return empty arrays', () => {
        expect([1, 2, 3, 4].selectMany((value) => (value % 2 === 0 ? [value] : []))).toEqual([
            2,
            4,
        ])
    })

    it('can flatten mixed null and undefined values returned by the selector', () => {
        expect([1, 2].selectMany((value) => [value, null, undefined])).toEqual([
            1,
            null,
            undefined,
            2,
            null,
            undefined,
        ])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.selectMany((value) => [value, value]))
    })
})
