# Music Tracks Manager — React + TypeScript + Vite

This project is a music tracks management interface built with **React**, **TypeScript**, **Vite** and **Tailwind CSS** for styling.

---

## Tech Stack

-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [socket.io-client](https://www.npmjs.com/package/socket.io-client)

---

## Development

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

> **Source maps** are enabled, but to simulate real world application - removed after fake upload to sentry as an example

---

## Testing

The project includes examples of testing with unit, integration, and end-to-end tests.

### Test Stack

-   **[Vitest](https://vitest.dev/)** - Unit and integration testing
-   **[Playwright](https://playwright.dev/)** - E2E and component testing
-   **[Testing Library](https://testing-library.com/)** - React component testing utilities
-   **[MSW](https://mswjs.io/)** - API mocking for integration tests

### Running Tests

```bash
# Unit and integration tests
npm test

# E2E tests (headless)
npm run test:e2e

# E2E tests with browser UI
npm run test:e2e:ui

# E2E tests in headed mode (visible browser)
npm run test:e2e:headed

# Component tests
npm run test:ct

# Component tests with UI
npm run test:ct:ui
```

### Test Files Location

-   **Unit tests**: `src/**/__tests__/*.test.tsx`
-   **Integration tests**: `__tests__/integration/*.test.ts`
-   **Component tests**: `src/components/__tests__/*.spec.tsx`
-   **E2E tests**: `__tests__/e2e/*.spec.ts`

---

## Bundle Analysis

The project uses \`rollup-plugin-visualizer\` to analyze bundle contents.

After building:

```bash
npm run build
```

A `bundle-report.html` will be generated and opened automatically.

---

## Environment Configuration

Use a \`.env\` file to configure varables (totally secret data that should not be in this README, for testing):

```env
VITE_API_BASE_URL=http://localhost:8000/api/
VITE_WEBSOCKET_URL=http://localhost:8000
VITE_PORT=3000
```

---

## Security

### Dependency Security Auditing

#### Snyk - Vulnerability Scanning

```bash
# Install Snyk globally
npm install -g snyk

# Scan for known vulnerabilities
npx snyk test

# Monitor project for new vulnerabilities
npx snyk monitor
```

#### Socket.dev - Behavioral Analysis

```bash
# Secure package installation
npx socket install

# Scan existing dependencies
npx socket scan
```

### Security Reports

See [security audit documentation](./docs/security-audits/) for detailed dependency analysis.

---

## Architecture Decision Records (ADR)

This project maintains Architecture Decision Records to document important architectural choices and their rationale.

### Available ADRs

-   **[ADR-0001](./docs/adr/0001-organize-api-layer-by-feature.md)** - Organize API layer by feature
-   **[ADR-0002](./docs/adr/0002-extract-business-logic.md)** - Extract business logic
-   **[ADR-0003](./docs/adr/0003-implement-environment-configuration.md)** - Implement environment configuration
-   **[ADR-0004](./docs/adr/0004-add-testing-framework.md)** - Add testing framework

See the [ADR directory](./docs/adr/) for complete documentation of architectural decisions.
