import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('unionBy', () => {
    it('adds only items whose keys are not already present', () => {
        const source = [
            { id: 1, label: 'a' },
            { id: 1, label: 'a-duplicate' },
            { id: 2, label: 'b' },
        ]
        const other = [
            { id: 2, label: 'b-other' },
            { id: 3, label: 'c' },
        ]

        expect(source.unionBy(other, (item) => item.id)).toEqual([
            source[0],
            source[1],
            source[2],
            other[1],
        ])
    })

    it('supports nullish keys', () => {
        const source: Array<{ key: null | undefined; value: number }> = [{ key: null, value: 1 }]
        const other: Array<{ key: null | undefined; value: number }> = [
            { key: null, value: 2 },
            { key: undefined, value: 3 },
        ]

        expect(source.unionBy(other, (item) => item.key)).toEqual([source[0], other[1]])
    })

    it('does not mutate the original array', () => {
        const source = [{ id: 1 }, { id: 2 }]

        expectArrayUnchanged(source, () => source.unionBy([{ id: 3 }], (item) => item.id))
    })
})

describe('intersectBy', () => {
    it('returns the first source item for each key present in both collections', () => {
        const source = [
            { id: 1, label: 'a' },
            { id: 2, label: 'b' },
            { id: 2, label: 'b-duplicate' },
            { id: 3, label: 'c' },
        ]
        const other = [
            { id: 2, label: 'x' },
            { id: 3, label: 'y' },
        ]

        expect(source.intersectBy(other, (item) => item.id)).toEqual([source[1], source[3]])
    })

    it('returns an empty array when there are no matches', () => {
        expect([{ id: 1 }].intersectBy([{ id: 2 }], (item) => item.id)).toEqual([])
    })

    it('does not mutate the original array', () => {
        const source = [{ id: 1 }, { id: 2 }]

        expectArrayUnchanged(source, () => source.intersectBy([{ id: 2 }], (item) => item.id))
    })
})

describe('exceptBy', () => {
    it('removes items whose keys appear in the other collection', () => {
        const source = [
            { id: 1, label: 'a' },
            { id: 1, label: 'a-duplicate' },
            { id: 2, label: 'b' },
            { id: 3, label: 'c' },
        ]
        const other = [
            { id: 2, label: 'x' },
            { id: 3, label: 'y' },
        ]

        expect(source.exceptBy(other, (item) => item.id)).toEqual([source[0], source[1]])
    })

    it('supports nullish keys', () => {
        const source = [
            { key: null, value: 1 },
            { key: undefined, value: 2 },
        ]

        expect(source.exceptBy([{ key: null, value: 3 }], (item) => item.key)).toEqual([source[1]])
    })

    it('does not mutate the original array', () => {
        const source = [{ id: 1 }, { id: 2 }]

        expectArrayUnchanged(source, () => source.exceptBy([{ id: 2 }], (item) => item.id))
    })
})
