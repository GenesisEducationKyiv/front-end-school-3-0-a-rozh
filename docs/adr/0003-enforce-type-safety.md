# 0003 - Enforce Type Safety

**Status**: Proposed  
**Date**: 2025-05-27

## Decision

We will enhance type safety in the project by enabling strict TypeScript compiler options and forbidding the use of `any` as a type, unless explicitly justified.  
This will be enforced through both `tsconfig.json` and ESLint rules.

## Rationale

TypeScript provides powerful guarantees around correctness, refactoring safety, and self-documenting code — but those benefits are undermined when using unsafe types like `any`, or when type checking is relaxed.

This decision includes:

-   Enabling the `strict` flag in `tsconfig.json`, which activates a set of highly recommended type safety rules.
-   Adding ESLint rules to warn or error on:
    -   Use of `any` (`@typescript-eslint/no-explicit-any`)
    -   Implicit `any` (`noImplicitAny`)
    -   Unsafe `ts-ignore` comments (`@typescript-eslint/ban-ts-comment`)
-   Encouraging the use of generics, discriminated unions, and shared types across layers.
-   Replacing `any` with `unknown`, `Record<string, unknown>`, `never`, or specific types whenever feasible.

## Consequences

-   Developers will need to be more deliberate about typing data structures and API responses.
-   Slight increase in initial development effort when introducing new code or types.
-   Long-term benefit: fewer runtime bugs, safer refactors, better IDE support, and improved readability and maintainability.
