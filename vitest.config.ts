import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(__dirname, '__tests__', 'setup.ts'),
        env: {
            VITE_API_BASE_URL: 'http://localhost:8000/api',
        },
        exclude: [
            'node_modules',
            'dist',
            '.idea',
            '.git',
            '.cache',
            '**/*.spec.tsx',
            '**/*.spec.ts',
        ],
    },
});
