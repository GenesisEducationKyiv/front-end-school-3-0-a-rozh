import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            react(),
            tailwindcss(),
            visualizer({
                open: true,
                filename: 'bundle-report.html',
                gzipSize: true,
                brotliSize: true,
            }),
        ],
        server: {
            port: parseInt(env.VITE_PORT),
        },
        build: {
            sourcemap: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom'],
                        redux: ['@reduxjs/toolkit', 'react-redux'],
                        router: ['react-router-dom'],
                        socketio: ['socket.io-client'],
                    },
                },
            },
        },
    };
});
