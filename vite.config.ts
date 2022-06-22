import { defineConfig } from 'vite';
import cssImportPlugin from './tools/cssImportPlugin';

// https://vitejs.dev/config/
export default defineConfig({
    root: './website',
    publicDir: './website',
    base: '/json-viewer/',
    build: {
        outDir: '../dist',
        rollupOptions: {
            external: /^lit/
        }
    },
    plugins: [cssImportPlugin()]
});
