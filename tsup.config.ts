import { defineConfig, Options } from 'tsup';

const commonConfig: Partial<Options> = {
    sourcemap: true,
    outDir: 'dist',
    clean: false,
    platform: 'browser',
    treeshake: true
};

export default defineConfig([
    {
        entry: {
            'json-viewer': 'src/index.ts',
            JsonViewer: 'src/JsonViewer.ts'
        },
        dts: true,
        format: 'esm'
    },
    {
        ...commonConfig,
        entry: {
            'json-viewer': 'src/index.ts'
        },
        format: 'iife',
        noExternal: [/.*/],
        outExtension() {
            return {
                js: '.bundle.js'
            };
        }
    }
]);
