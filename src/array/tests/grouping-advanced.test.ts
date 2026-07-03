import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('indexBy', () => {
    it('indexes items by the selected key', () => {
        const source = [{ id: 'a' }, { id: 'b' }]
        const result = source.indexBy((item) => item.id)

        expect([...result.entries()]).toEqual([
            ['a', source[0]],
            ['b', source[1]],
        ])
    })

    it('keeps the last item for duplicate keys', () => {
        const source = [
            { id: 'a', value: 1 },
            { id: 'a', value: 2 },
        ]

        expect(source.indexBy((item) => item.id).get('a')).toEqual(source[1])
    })

    it('returns an empty map for an empty source', () => {
        expect(([] as Array<{ id: string }>).indexBy((item) => item.id).size).toBe(0)
    })

    it('supports nullish keys', () => {
        const source = [
            { key: null, value: 1 },
            { key: undefined, value: 2 },
        ]
        const result = source.indexBy((item) => item.key)

        expect(result.get(null)).toEqual(source[0])
        expect(result.get(undefined)).toEqual(source[1])
    })

    it('does not mutate the original array', () => {
        const source = [{ id: 'a' }, { id: 'b' }]

        expectArrayUnchanged(source, () => source.indexBy((item) => item.id))
    })
})

describe('countBy', () => {
    it('counts items for each key', () => {
        expect([...['a', 'b', 'a', 'c', 'a'].countBy((value) => value).entries()]).toEqual([
            ['a', 3],
            ['b', 1],
            ['c', 1],
        ])
    })

    it('returns an empty map for an empty source', () => {
        expect(([] as string[]).countBy((value) => value).size).toBe(0)
    })

    it('supports nullish keys', () => {
        const result = [null, undefined, null].countBy((value) => value)

        expect(result.get(null)).toBe(2)
        expect(result.get(undefined)).toBe(1)
    })

    it('does not mutate the original array', () => {
        const source = ['a', 'b', 'a']

        expectArrayUnchanged(source, () => source.countBy((value) => value))
    })
})

describe('joinBy', () => {
    it('performs an inner join between two collections', () => {
        const users = [
            { id: 1, name: 'Anna' },
            { id: 2, name: 'Luca' },
        ]
        const orders = [
            { userId: 1, code: 'A' },
            { userId: 1, code: 'B' },
            { userId: 3, code: 'C' },
        ]

        expect(
            users.joinBy(
                orders,
                (user) => user.id,
                (order) => order.userId,
                (user, order) => `${user.name}:${order.code}`
            )
        ).toEqual(['Anna:A', 'Anna:B'])
    })

    it('returns an empty array when there are no matches', () => {
        expect(
            [{ id: 1 }].joinBy(
                [{ userId: 2 }],
                (outer) => outer.id,
                (inner) => inner.userId,
                (outer, inner) => [outer, inner]
            )
        ).toEqual([])
    })

    it('does not mutate the original array', () => {
        const source = [{ id: 1 }, { id: 2 }]

        expectArrayUnchanged(source, () =>
            source.joinBy(
                [{ userId: 1 }],
                (outer) => outer.id,
                (inner) => inner.userId,
                (outer, inner) => [outer, inner]
            )
        )
    })
})

describe('leftJoin', () => {
    it('returns matched pairs and unmatched outer items with undefined', () => {
        const users = [
            { id: 1, name: 'Anna' },
            { id: 2, name: 'Luca' },
        ]
        const orders = [{ userId: 1, code: 'A' }]

        expect(
            users.leftJoin(
                orders,
                (user) => user.id,
                (order) => order.userId,
                (user, order) => `${user.name}:${order?.code ?? 'none'}`
            )
        ).toEqual(['Anna:A', 'Luca:none'])
    })

    it('supports multiple matching inner elements', () => {
        const users = [{ id: 1, name: 'Anna' }]
        const orders = [
            { userId: 1, code: 'A' },
            { userId: 1, code: 'B' },
        ]

        expect(
            users.leftJoin(
                orders,
                (user) => user.id,
                (order) => order.userId,
                (user, order) => `${user.name}:${order?.code ?? 'none'}`
            )
        ).toEqual(['Anna:A', 'Anna:B'])
    })
})

describe('innerJoin', () => {
    it('performs an inner join explicitly', () => {
        const users = [
            { id: 1, name: 'Anna' },
            { id: 2, name: 'Luca' },
        ]
        const orders = [
            { userId: 2, code: 'X' },
            { userId: 2, code: 'Y' },
        ]

        expect(
            users.innerJoin(
                orders,
                (user) => user.id,
                (order) => order.userId,
                (user, order) => `${user.name}:${order.code}`
            )
        ).toEqual(['Luca:X', 'Luca:Y'])
    })

    it('returns an empty array when one side is empty', () => {
        expect(
            ([] as Array<{ id: number }>).innerJoin(
                [{ userId: 1 }],
                (outer) => outer.id,
                (inner) => inner.userId,
                (outer, inner) => [outer, inner]
            )
        ).toEqual([])
    })
})

describe('zipLongest', () => {
    it('returns tuple pairs until the longest sequence is exhausted', () => {
        expect([1, 2, 3].zipLongest(['a'])).toEqual([
            [1, 'a'],
            [2, undefined],
            [3, undefined],
        ])
    })

    it('supports a result selector', () => {
        expect(
            [1].zipLongest(['a', 'b'], (first, second) => `${first ?? 'x'}:${second ?? 'y'}`)
        ).toEqual(['1:a', 'x:b'])
    })

    it('returns an empty array when both sources are empty', () => {
        expect(([] as number[]).zipLongest([] as string[])).toEqual([])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.zipLongest(['a']))
    })
})
