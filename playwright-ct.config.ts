import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
    testDir: './src/components/__tests__',
    use: {
        ctPort: 3101,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
