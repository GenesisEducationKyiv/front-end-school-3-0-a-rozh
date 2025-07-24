/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './src/**/*.html',
        './node_modules/flowbite/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            sans: 'Roboto Mono, monospace',
        },
        extend: {
            height: {
                screen: '100dvh',
            },
        },
    },
    plugins: [flowbitePlugin],
};
