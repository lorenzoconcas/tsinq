import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('toSet', () => {
    it('converts the array to a Set', () => {
        expect([...([1, 2, 2, 3].toSet())]).toEqual([1, 2, 3])
    })

    it('returns an empty Set for an empty array', () => {
        expect([].toSet().size).toBe(0)
    })

    it('deduplicates NaN values', () => {
        expect([...([NaN, NaN].toSet())]).toEqual([NaN])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 2]

        expectArrayUnchanged(source, () => source.toSet())
    })
})

describe('toMap', () => {
    it('converts the array to a map keyed by the selector', () => {
        const result = [{ id: 'a' }, { id: 'b' }].toMap((item) => item.id)

        expect([...result.entries()]).toEqual([
            ['a', { id: 'a' }],
            ['b', { id: 'b' }],
        ])
    })

    it('returns an empty map for an empty array', () => {
        expect([].toMap((value) => value).size).toBe(0)
    })

    it('keeps the last item for duplicate keys', () => {
        const source = [
            { id: 'a', value: 1 },
            { id: 'a', value: 2 },
        ]

        expect(source.toMap((item) => item.id).get('a')).toEqual({ id: 'a', value: 2 })
    })

    it('supports nullish keys', () => {
        const source = [
            { id: 1, key: null },
            { id: 2, key: undefined },
        ]

        const result = source.toMap((item) => item.key)

        expect(result.get(null)).toEqual({ id: 1, key: null })
        expect(result.get(undefined)).toEqual({ id: 2, key: undefined })
    })

    it('does not mutate the original array', () => {
        const source = [{ id: 'a' }, { id: 'b' }]

        expectArrayUnchanged(source, () => source.toMap((item) => item.id))
    })
})

describe('toDictionary', () => {
    it('converts the array to a map keyed by the selector', () => {
        const result = [{ id: 'a' }, { id: 'b' }].toDictionary((item) => item.id)

        expect([...result.entries()]).toEqual([
            ['a', { id: 'a' }],
            ['b', { id: 'b' }],
        ])
    })

    it('returns an empty map for an empty array', () => {
        expect([].toDictionary((value) => value).size).toBe(0)
    })

    it('keeps the last item for duplicate keys', () => {
        const source = [
            { id: 'a', value: 1 },
            { id: 'a', value: 2 },
        ]

        expect(source.toDictionary((item) => item.id).get('a')).toEqual({ id: 'a', value: 2 })
    })

    it('does not mutate the original array', () => {
        const source = [{ id: 'a' }, { id: 'b' }]

        expectArrayUnchanged(source, () => source.toDictionary((item) => item.id))
    })
})

describe('toObject', () => {
    it('converts the array to an object keyed by the selector', () => {
        expect([{ id: 'a' }, { id: 'b' }].toObject((item) => item.id)).toEqual({
            a: { id: 'a' },
            b: { id: 'b' },
        })
    })

    it('returns an empty object for an empty array', () => {
        expect([].toObject((value) => value as never)).toEqual({})
    })

    it('keeps the last item for duplicate keys', () => {
        expect(
            [
                { id: 'a', value: 1 },
                { id: 'a', value: 2 },
            ].toObject((item) => item.id)
        ).toEqual({
            a: { id: 'a', value: 2 },
        })
    })

    it('supports number keys', () => {
        expect([{ id: 1 }, { id: 2 }].toObject((item) => item.id)).toEqual({
            1: { id: 1 },
            2: { id: 2 },
        })
    })

    it('does not mutate the original array', () => {
        const source = [{ id: 'a' }, { id: 'b' }]

        expectArrayUnchanged(source, () => source.toObject((item) => item.id))
    })
})

describe('flatten', () => {
    it('flattens an array of arrays by one level', () => {
        expect([
            [1, 2],
            [3, 4],
        ].flatten()).toEqual([1, 2, 3, 4])
    })

    it('flattens mixed arrays and standalone values', () => {
        expect([
            [1, 2],
            3,
            [4],
            null,
        ].flatten()).toEqual([1, 2, 3, 4, null])
    })

    it('returns the same values when the array is already flat', () => {
        expect([1, 2, 3].flatten()).toEqual([1, 2, 3])
    })

    it('returns an empty array for an empty source', () => {
        expect([].flatten()).toEqual([])
    })

    it('flattens only one level', () => {
        expect([1, [2, [3]]].flatten()).toEqual([1, 2, [3]])
    })

    it('does not mutate the original array', () => {
        const source = [[1, 2], [3, 4]]

        expectArrayUnchanged(source, () => source.flatten())
    })
})

describe('clone', () => {
    it('returns a shallow copy of the array', () => {
        const item = { value: 1 }
        const source = [item]
        const result = source.clone()

        expect(result).toEqual(source)
        expect(result).not.toBe(source)
        expect(result[0]).toBe(item)
    })

    it('returns an empty array for an empty source', () => {
        const result = [].clone()

        expect(result).toEqual([])
        expect(result).not.toBe([])
    })
})

describe('deepClone', () => {
    it('returns a deep copy of the array', () => {
        const source = [{ value: 1, nested: { flag: true } }]
        const result = source.deepClone()

        expect(result).toEqual(source)
        expect(result).not.toBe(source)
        expect(result[0]).not.toBe(source[0])
        expect(result[0].nested).not.toBe(source[0].nested)
    })

    it('returns an empty array for an empty source', () => {
        const result = [].deepClone()

        expect(result).toEqual([])
        expect(result).not.toBe([])
    })
})
