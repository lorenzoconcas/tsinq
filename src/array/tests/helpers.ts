import { expect } from 'vitest'

export function expectArrayUnchanged<T>(
    source: T[],
    action: () => unknown
): void {
    const snapshot = [...source]

    action()

    expect(source).toEqual(snapshot)
}

export function withMockedRandom<T>(
    values: number[],
    action: () => T
): T {
    const originalRandom = Math.random
    let index = 0

    Math.random = () => {
        const value = values[index]

        index++

        return value ?? values[values.length - 1] ?? 0
    }

    try {
        return action()
    } finally {
        Math.random = originalRandom
    }
}
