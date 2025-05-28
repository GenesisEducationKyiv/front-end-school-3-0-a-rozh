# 0005 - Add Testing Framework

**Status**: Proposed  
**Date**: 2025-05-27

## Decision

We will implement Vitest with React Testing Library as the primary testing framework.

-   **Vitest** as the test runner and assertion library (since Vite is already used)
-   **@testing-library/react** for component-level testing

Tests will be co-located next to the relevant source files using the `.test.{ts,tsx}` naming convention (e.g., `Button.tsx` and `Button.test.tsx` in the same directory).

Initial setup includes configuration files, an example component test, and `npm` scripts to run and watch tests.

## Rationale

Currently, the project has no test coverage. As logic becomes more complex (e.g., audio behavior, track filtering, form validation), lack of automated testing will increase the risk of issues.

By adding Vitest and Testing Library:

-   We align with existing tooling (Vite → Vitest)
-   Gain fast and reliable unit/component test execution
-   Enable future test-driven development

### Alternatives Considered

-   **Jest + React Testing Library**: Industry standard but slower performance and complex ESM setup
-   **Playwright**: Excellent for E2E testing as a addition to unit/component testing

## Consequences

-   Requires developers to write and maintain test cases alongside components and logic
-   Increase in setup complexity and dev dependencies
-   Will improve long-term stability and confidence in refactors
-   Encourages better separation of concerns by making logic more testable
-   Enables CI integration in the future for automated test validation
