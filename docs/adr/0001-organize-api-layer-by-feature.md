# 0001 - Organize API Layer by Feature

**Status**: Proposed  
**Date**: 2025-05-27

## Decision

We will reorganize the current monolithic `src/services/api.ts` file into feature-specific API modules while keeping RTK Query as the primary data-fetching solution.

The new structure will be:

-   `src/services/api/baseApi.ts` - shared RTK Query configuration
-   `src/services/api/trackApi.ts` - track-related endpoints
-   `src/services/api/genreApi.ts` - genre-related endpoints
-   `src/services/api/fileApi.ts` - file upload/download endpoints
-   `src/services/api/index.ts` - exports all hooks and API slices

## Rationale

The current `api.ts` file contains all API endpoints in a single file (114 lines), which will become harder to maintain as the application grows. Additionally, some business logic is mixed with API calls.

By organizing APIs by feature:

-   **Better maintainability** - related endpoints are grouped together
-   **Clearer ownership** - teams can work on specific API modules without conflicts
-   **Easier testing** - smaller, focused API slices are easier to mock and test
-   **Reduced merge conflicts** - multiple developers can work on different API features simultaneously

This approach maintains RTK Query's benefits while improving code organization.

## Consequences

-   One-time refactor to split existing `api.ts` into feature modules
-   Slightly more files to maintain, but each file is smaller and more focused
-   Easier to add new API features without touching existing code
-   Better preparation for potential future extraction of business logic
