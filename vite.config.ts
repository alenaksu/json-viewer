import { defineConfig } from 'vite';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    root: './website',
    publicDir: './website',
    base: '/json-viewer/',
    build: {
        outDir: '../docs'
    }
});
