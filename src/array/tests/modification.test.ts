import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

describe('append', () => {
    it('adds an item to the end of the array', () => {
        expect([1, 2].append(3)).toEqual([1, 2, 3])
    })

    it('works with an empty array', () => {
        expect(([] as number[]).append(1)).toEqual([1])
    })

    it('preserves duplicate values', () => {
        expect([1, 1].append(1)).toEqual([1, 1, 1])
    })

    it('can append null and undefined values', () => {
        const source: Array<number | null | undefined> = [1]

        expect(source.append(null)).toEqual([1, null])
        expect(source.append(undefined)).toEqual([1, undefined])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2]

        expectArrayUnchanged(source, () => source.append(3))
    })
})

describe('prepend', () => {
    it('adds an item to the start of the array', () => {
        expect([2, 3].prepend(1)).toEqual([1, 2, 3])
    })

    it('works with an empty array', () => {
        expect(([] as number[]).prepend(1)).toEqual([1])
    })

    it('preserves duplicate values', () => {
        expect([1, 1].prepend(1)).toEqual([1, 1, 1])
    })

    it('can prepend null and undefined values', () => {
        const source: Array<number | null | undefined> = [1]

        expect(source.prepend(null)).toEqual([null, 1])
        expect(source.prepend(undefined)).toEqual([undefined, 1])
    })

    it('does not mutate the original array', () => {
        const source = [2, 3]

        expectArrayUnchanged(source, () => source.prepend(1))
    })
})

describe('insert', () => {
    it('inserts an item at the requested index', () => {
        expect([1, 3].insert(1, 2)).toEqual([1, 2, 3])
    })

    it('inserts at the start when the index is negative', () => {
        expect([2, 3].insert(-1, 1)).toEqual([1, 2, 3])
    })

    it('appends when the index is beyond the array length', () => {
        expect([1, 2].insert(10, 3)).toEqual([1, 2, 3])
    })

    it('works with an empty array', () => {
        expect(([] as number[]).insert(0, 1)).toEqual([1])
    })

    it('does not mutate the original array', () => {
        const source = [1, 3]

        expectArrayUnchanged(source, () => source.insert(1, 2))
    })
})

describe('remove', () => {
    it('removes the first matching item', () => {
        expect([1, 2, 2, 3].remove(2)).toEqual([1, 2, 3])
    })

    it('returns a copy when the item is not found', () => {
        expect([1, 2, 3].remove(4)).toEqual([1, 2, 3])
    })

    it('works with an empty array', () => {
        expect(([] as number[]).remove(1)).toEqual([])
    })

    it('uses Object.is semantics for NaN and signed zero', () => {
        expect([NaN, 1].remove(NaN)).toEqual([1])
        expect([0, -0].remove(-0)).toEqual([0])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 2, 3]

        expectArrayUnchanged(source, () => source.remove(2))
    })
})

describe('removeWhere', () => {
    it('removes all items that match the predicate', () => {
        expect([1, 2, 3, 4].removeWhere((value) => value % 2 === 0)).toEqual([1, 3])
    })

    it('returns an empty array for an empty source', () => {
        expect([].removeWhere(() => true)).toEqual([])
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].removeWhere((_, index) => index === 1)).toEqual(['a', 'c'])
    })

    it('can remove null and undefined values', () => {
        expect([null, 1, undefined].removeWhere((value) => value == null)).toEqual([1])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.removeWhere((value) => value > 1))
    })
})

describe('replace', () => {
    it('replaces the first matching item', () => {
        expect([1, 2, 2, 3].replace(2, 9)).toEqual([1, 9, 2, 3])
    })

    it('returns a copy when the item is not found', () => {
        expect([1, 2, 3].replace(4, 9)).toEqual([1, 2, 3])
    })

    it('works with an empty array', () => {
        expect(([] as number[]).replace(1, 9)).toEqual([])
    })

    it('uses Object.is semantics for NaN', () => {
        expect([NaN, 1].replace(NaN, 9)).toEqual([9, 1])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 2, 3]

        expectArrayUnchanged(source, () => source.replace(2, 9))
    })
})

describe('replaceWhere', () => {
    it('replaces all items that match the predicate', () => {
        expect([1, 2, 3, 4].replaceWhere((value) => value % 2 === 0, 0)).toEqual([1, 0, 3, 0])
    })

    it('returns an empty array for an empty source', () => {
        expect(([] as number[]).replaceWhere(() => true, 0)).toEqual([])
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].replaceWhere((_, index) => index === 1, 'x')).toEqual([
            'a',
            'x',
            'c',
        ])
    })

    it('can replace null and undefined values', () => {
        expect([null, 1, undefined].replaceWhere((value) => value == null, 0)).toEqual([0, 1, 0])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.replaceWhere((value) => value > 1, 0))
    })
})

describe('move', () => {
    it('moves an item backward to an earlier index', () => {
        expect([1, 2, 3, 4].move(3, 1)).toEqual([1, 4, 2, 3])
    })

    it('returns a copy when the array is empty', () => {
        expect([].move(0, 0)).toEqual([])
    })

    it('returns a copy when indices are out of range', () => {
        expect([1, 2, 3].move(-1, 1)).toEqual([1, 2, 3])
        expect([1, 2, 3].move(1, 10)).toEqual([1, 2, 3])
    })

    it('returns a copy when from and to are the same', () => {
        expect([1, 2, 3].move(1, 1)).toEqual([1, 2, 3])
    })

    it('documents the current behavior when moving an item forward', () => {
        // TODO: update this expectation if move starts shifting forward items like a typical move operation.
        expect([1, 2, 3, 4].move(0, 2)).toEqual([2, 1, 3, 4])
    })

    it('documents the current behavior when moving an item to the last index', () => {
        // TODO: update this expectation if move stops duplicating the moved item at the end.
        expect([1, 2, 3, 4].move(1, 3)).toEqual([1, 3, 2, 4, 2])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3, 4]

        expectArrayUnchanged(source, () => source.move(3, 1))
    })
})

describe('swap', () => {
    it('swaps two items', () => {
        expect([1, 2, 3].swap(0, 2)).toEqual([3, 2, 1])
    })

    it('returns a copy for an empty array', () => {
        expect([].swap(0, 1)).toEqual([])
    })

    it('returns a copy when either index is out of range', () => {
        expect([1, 2, 3].swap(-1, 1)).toEqual([1, 2, 3])
        expect([1, 2, 3].swap(0, 10)).toEqual([1, 2, 3])
    })

    it('returns a copy when both indices are the same', () => {
        expect([1, 2, 3].swap(1, 1)).toEqual([1, 2, 3])
    })

    it('preserves duplicate values', () => {
        expect([1, 2, 2, 3].swap(1, 2)).toEqual([1, 2, 2, 3])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.swap(0, 2))
    })
})
