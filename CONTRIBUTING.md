# Contributing

First of all, thank you for considering contributing to this project!

The goal of this library is to provide a clean, strongly-typed and modern LINQ-like API for TypeScript by extending `Array.prototype` while maintaining predictable behavior, excellent performance and full type safety.

---

# Philosophy

Every contribution should follow these principles:

- **Readable over clever**
- **Type-safe over permissive**
- **Performance matters**
- **Immutable by default**
- **Consistent API**
- **No external dependencies**

If a solution is difficult to understand, it is probably not the right solution.

---

# Project Structure

```
src/
│
├── index.ts
├── register.ts
├── array.d.ts
│
└── array/
    ├── filtering.ts
    ├── projection.ts
    ├── quantifiers.ts
    ├── element.ts
    ├── ordering.ts
    ├── aggregation.ts
    ├── set.ts
    ├── partition.ts
    ├── grouping.ts
    ├── conversion.ts
    ├── modification.ts
    ├── random.ts
    ├── utility.ts
    ├── register.ts
    └── tests/
```

Each file contains methods belonging to the same category.

---

# Coding Guidelines

## TypeScript

Use strict TypeScript.

Avoid `any` whenever possible.

Prefer generics and conditional types.

Avoid unnecessary casts.

Bad

```ts
return value as any
```

Good

```ts
return value as T
```

or even better

Use proper overloads.

---

## Method Independence

Every method must be self-contained.

**Do not call another library method internally.**

Bad

```ts
return first.call(this, predicate)
```

Good

```ts
for (...) {
    ...
}
```

This avoids:

- generic inference issues
- hidden dependencies
- unnecessary overhead

---

## Prefer loops

Whenever practical, prefer classic `for` loops.

Good

```ts
for (let i = 0; i < this.length; i++) {
    ...
}
```

Avoid chaining methods such as:

- map
- filter
- reduce
- flatMap

unless they significantly improve readability.

---

## Immutability

Methods should **never mutate the original array** unless explicitly documented.

Good

```ts
const result = [...this]
```

Bad

```ts
this.push(...)
```

---

## Prototype Registration

New methods must be registered using the common registration helper.

Do not assign directly.

Bad

```ts
Array.prototype.where = where
```

Good

```ts
registerPrototypeMethod(...)
```

---

## Documentation

Every public method must contain a JSDoc comment.

Example

```ts
/**
 * Returns the first element matching the specified predicate.
 */
```

---

# Tests

Every new method **must include tests**.

Tests are located under:

```
src/array/tests
```

Every method should be tested for:

- normal usage
- empty arrays
- edge cases
- duplicate values
- null values (when applicable)
- undefined values (when applicable)
- immutability

Aim for very high coverage.

---

# Performance

Performance is important.

Before submitting a Pull Request ask yourself:

- Is this allocating unnecessary arrays?
- Can this stop earlier?
- Can this avoid extra iterations?

Whenever possible:

- exit early
- avoid intermediate allocations
- avoid recursion if an iterative solution is simpler

---

# API Design

New methods should:

- have intuitive names
- match existing naming conventions
- behave consistently
- avoid surprising side effects

If a method already exists in .NET LINQ, Kotlin or modern JavaScript, prefer familiar semantics unless there is a strong reason not to.

---

# Breaking Changes

Breaking changes should be avoided whenever possible.

If unavoidable:

- explain the motivation
- update the documentation
- update the changelog

---

# Pull Requests

Please keep pull requests focused.

One feature per PR whenever possible.

Include:

- implementation
- tests
- documentation updates

---

# Commit Messages

Recommended format:

```
feat: add chunkBy()
fix: correct groupAdjacent behavior
refactor: improve binarySearch performance
docs: update README
test: improve partition coverage
```

---

# Code Style

Please keep formatting consistent with the rest of the project.

- 4 spaces indentation
- meaningful variable names
- small functions
- early returns when appropriate

---

# Reporting Issues

When opening an issue, include:

- TypeScript version
- Node version
- reproduction code
- expected behavior
- actual behavior

---

# Feature Requests

Feature requests are welcome.

Please include:

- motivation
- proposed API
- example usage
- possible edge cases

---

# Thank You

Thank you for helping improve the project.

Every contribution, whether it's code, documentation, tests or bug reports, is greatly appreciated.