# 0002 - Extract Business Logic into Custom Hooks and Services

**Status**: Proposed  
**Date**: 2025-05-27

## Context

Components currently mix React-specific logic with pure business logic, making unit testing difficult and code reuse impossible. Developers need better separation of concerns to improve code maintainability, enable proper testing, and make future refactoring safer and more predictable.

## Decision

We will extract business logic from components using a two-layer approach:

1. **Service Layer** - Pure business logic functions in `src/services/`
2. **Custom Hooks** - React-specific logic that uses services and RTK Query

**Service Layer Structure:**

-   `src/services/features/tracks/trackService.ts` - pure business logic
-   `src/services/features/audio/audioService.ts` - audio processing logic
-   `src/services/shared/validationService.ts` - shared validation

**Custom Hooks Structure:**

-   `src/hooks/tracks/useTrackOperations.ts` - combines trackService + RTK Query
-   `src/hooks/audio/useAudioPlayer.ts` - combines audioService + React state

## Rationale

Components currently contain both React-specific logic (state, effects) and pure business logic (validation, calculations). This makes testing difficult and logic non-reusable.

By separating into services + custom hooks:

-   **Services contain pure functions** - easily testable, framework-agnostic
-   **Custom hooks handle React integration** - state management, RTK Query integration
-   **Components focus on rendering** - cleaner, more maintainable
-   **Business logic is reusable** - services can be used outside React if needed

## Consequences

-   Two-layer abstraction increases complexity and requires developers to understand when to use services vs custom hooks vs direct RTK Query calls
-   Longer onboarding time for new team members and harder initial development when writing new features
-   Improved separation of concerns and better long-term maintainability as business logic becomes testable and reusable
-   Services are easily testable in isolation
-   Custom hooks provide React-friendly API while keeping business logic separate
-   Gradual migration possible - can implement feature by feature
