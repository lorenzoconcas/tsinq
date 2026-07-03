import { describe, expect, it } from 'vitest'
import { expectArrayUnchanged } from './helpers'
import './setup'

class Animal {
    constructor(public name: string) {}
}

class Dog extends Animal {}

class Cat extends Animal {}

describe('where', () => {
    it('filters items that match the predicate', () => {
        expect([1, 2, 3, 4, 5].where((value) => value % 2 === 0)).toEqual([2, 4])
    })

    it('returns an empty array for an empty source', () => {
        expect([].where(() => true)).toEqual([])
    })

    it('passes the current index to the predicate', () => {
        expect(['a', 'b', 'c'].where((_, index) => index >= 1)).toEqual(['b', 'c'])
    })

    it('preserves duplicate values that match', () => {
        expect([1, 1, 2, 1].where((value) => value === 1)).toEqual([1, 1, 1])
    })

    it('can filter null and undefined values', () => {
        expect([null, 1, undefined, 2].where((value) => value == null)).toEqual([
            null,
            undefined,
        ])
    })

    it('does not mutate the original array', () => {
        const source = [1, 2, 3]

        expectArrayUnchanged(source, () => source.where((value) => value > 1))
    })
})

describe('ofType', () => {
    it('returns only instances of the requested type', () => {
        const fido = new Dog('Fido')
        const whiskers = new Cat('Whiskers')
        const rex = new Dog('Rex')

        expect([fido, whiskers, rex].ofType(Dog)).toEqual([fido, rex])
    })

    it('returns an empty array for an empty source', () => {
        expect([].ofType(Dog)).toEqual([])
    })

    it('keeps duplicate instances when they match', () => {
        const dog = new Dog('Echo')

        expect([dog, dog, new Cat('Other')].ofType(Dog)).toEqual([dog, dog])
    })

    it('ignores null and undefined values', () => {
        const dog = new Dog('Fido')

        expect([dog, null, undefined].ofType(Dog)).toEqual([dog])
    })

    it('uses instanceof semantics for boxed primitives', () => {
        const boxedTwo = new Number(2)

        expect([1, boxedTwo, '3'].ofType(Number)).toEqual([boxedTwo])
    })

    it('does not mutate the original array', () => {
        const dog = new Dog('Fido')
        const source = [dog, new Cat('Whiskers')]

        expectArrayUnchanged(source, () => source.ofType(Dog))
    })
})
