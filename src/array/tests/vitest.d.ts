declare module 'vitest' {
    export const describe: (
        name: string,
        fn: () => void
    ) => void

    export const it: (
        name: string,
        fn: () => void
    ) => void

    export interface Matchers<T = unknown> {
        toBe(expected: unknown): void
        toEqual(expected: unknown): void
        toBeUndefined(): void
        toBeNull(): void
        toThrow(expected?: unknown): void
        toBeTruthy(): void
        toBeFalsy(): void
        toBeGreaterThan(expected: number): void
        toBeLessThan(expected: number): void
        toContain(expected: unknown): void
        toBeInstanceOf(expected: new (...args: any[]) => unknown): void
        not: Matchers<T>
    }

    export const expect: <T = unknown>(actual: T) => Matchers<T>
}
