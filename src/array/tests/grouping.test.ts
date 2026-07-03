import { describe, expect, it } from 'vitest'
import './setup'

describe('groupBy', () => {
    it('groups items by key into multiple groups', () => {
        const result = [
            { id: 1, group: 'a' },
            { id: 2, group: 'b' },
            { id: 3, group: 'a' },
        ].groupBy((item) => item.group)

        expect([...result.entries()]).toEqual([
            ['a', [{ id: 1, group: 'a' }, { id: 3, group: 'a' }]],
            ['b', [{ id: 2, group: 'b' }]],
        ])
    })

    it('returns an empty map for an empty source', () => {
        expect([].groupBy((value) => value).size).toBe(0)
    })

    it('preserves duplicate keys within the same group', () => {
        const result = [1, 2, 3, 4].groupBy((value) => value % 2)

        expect(result.get(0)).toEqual([2, 4])
        expect(result.get(1)).toEqual([1, 3])
    })

    it('supports null and undefined keys', () => {
        const result = [
            { id: 1, group: null },
            { id: 2, group: undefined },
            { id: 3, group: null },
        ].groupBy((item) => item.group)

        expect(result.get(null)).toEqual([
            { id: 1, group: null },
            { id: 3, group: null },
        ])
        expect(result.get(undefined)).toEqual([{ id: 2, group: undefined }])
    })
})

describe('groupAdjacent', () => {
    it('groups adjacent items that share the same key', () => {
        const result = [1, 1, 2, 2, 3].groupAdjacent((value) => value) as unknown as Map<
            number,
            number[]
        >

        expect([...result.entries()]).toEqual([
            [1, [1, 1]],
            [2, [2, 2]],
            [3, [3]],
        ])
    })

    it('returns an empty map for an empty source', () => {
        const result = [].groupAdjacent((value) => value) as unknown as Map<unknown, unknown[]>

        expect(result.size).toBe(0)
    })

    it('uses Object.is semantics for adjacent keys', () => {
        const result = [NaN, NaN, 1].groupAdjacent((value) => value) as unknown as Map<
            number,
            number[]
        >

        expect(result.get(NaN)).toEqual([NaN, NaN])
        expect(result.get(1)).toEqual([1])
    })

    it('documents the current behavior when the same key reappears later', () => {
        // TODO: update this expectation if groupAdjacent starts returning distinct groups for repeated keys.
        const result = ['a', 'a', 'b', 'a'].groupAdjacent((value) => value) as unknown as Map<
            string,
            string[]
        >

        expect([...result.entries()]).toEqual([
            ['a', ['a']],
            ['b', ['b']],
        ])
    })
})

describe('toLookup', () => {
    it('builds a lookup map with multiple groups', () => {
        const result = [
            { id: 1, group: 'a' },
            { id: 2, group: 'b' },
            { id: 3, group: 'a' },
        ].toLookup((item) => item.group)

        expect([...result.entries()]).toEqual([
            ['a', [{ id: 1, group: 'a' }, { id: 3, group: 'a' }]],
            ['b', [{ id: 2, group: 'b' }]],
        ])
    })

    it('returns an empty map for an empty source', () => {
        expect([].toLookup((value) => value).size).toBe(0)
    })

    it('preserves duplicate keys within the same group', () => {
        const result = [1, 2, 3, 4].toLookup((value) => value % 2)

        expect(result.get(0)).toEqual([2, 4])
        expect(result.get(1)).toEqual([1, 3])
    })

    it('supports null and undefined keys', () => {
        const result = [
            { id: 1, group: null },
            { id: 2, group: undefined },
            { id: 3, group: null },
        ].toLookup((item) => item.group)

        expect(result.get(null)).toEqual([
            { id: 1, group: null },
            { id: 3, group: null },
        ])
        expect(result.get(undefined)).toEqual([{ id: 2, group: undefined }])
    })
})

describe('zip', () => {
    it('combines two arrays element by element', () => {
        expect([1, 2, 3].zip(['a', 'b', 'c'], (first, second) => `${first}${second}`)).toEqual([
            '1a',
            '2b',
            '3c',
        ])
    })

    it('stops at the shortest input', () => {
        expect([1, 2, 3].zip(['a'], (first, second) => `${first}${second}`)).toEqual(['1a'])
    })

    it('returns an empty array when one side is empty', () => {
        expect([1, 2].zip([], (first, second) => [first, second])).toEqual([])
    })

    it('supports null and undefined values', () => {
        expect([null, undefined].zip([1, 2], (first, second) => [first, second])).toEqual([
            [null, 1],
            [undefined, 2],
        ])
    })
})
