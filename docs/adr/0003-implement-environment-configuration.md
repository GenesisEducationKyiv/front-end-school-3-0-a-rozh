# 0003 - Implement Environment Configuration

**Status**: Proposed  
**Date**: 2025-05-27

## Context

The application needs to support different API endpoints and configurations across development, staging, and production environments. Hard-coded configuration values create deployment risks and make it difficult for developers to work with local backend services or test different API versions.

## Decision

We will manage environment-specific configuration using `.env` files at the project root, supported by Vite's built-in environment variable loading (`import.meta.env`).  
Environment files will follow this naming convention:

-   `.env` – base configuration
-   `.env.development` – development-specific
-   `.env.production` – production-specific
-   `.env.local` – developer machine overrides (not committed)

All environment variables will be prefixed with `VITE_` to ensure they are exposed to the frontend, as required by Vite.

## Rationale

Managing configuration via environment variables allows the app to adapt to different environments (local, staging, production) without code changes.

Benefits include:

-   Secure separation of secrets (e.g., API keys, base URLs).
-   Clear distinction between build-time and runtime configuration.
-   Better CI/CD integration with `.env.production` and `.env.local`.

The `VITE_` prefix ensures proper bundling and exposure of env vars in the browser context.

## Consequences

-   Requires developers to maintain their own `.env.local` file and avoid hardcoding sensitive data.
-   Requires clear documentation of required environment variables.
-   CI/CD pipelines must be configured to inject correct `.env` values for production builds.
-   Environment-specific differences must be handled cautiously to prevent issues caused by missing or incorrectly set variables.
