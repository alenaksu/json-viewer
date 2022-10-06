import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import litcss from 'rollup-plugin-lit-css';
import summary from 'rollup-plugin-summary';

function bundleText() {
    return {
        name: 'ignore-bundle-text',
        resolveId(source, importer) {
            if (source.indexOf('bundle-text') !== -1) {
                return path.resolve(path.dirname(importer), source.replace('bundle-text:', ''));
            }

            return null;
        },
        load() {
            return null;
        }
    };
}

const baseConfig = {
    onwarn(warning) {
        if (warning.code !== 'THIS_IS_UNDEFINED') {
            console.error(`(!) ${warning.message}`);
        }
    },
    treeshake: true,
    plugins: [
        minifyHTML(),
        typescript({
            project: 'tsconfig.json'
        }),
        bundleText(),
        litcss({
            uglify: true
        }),
        nodeResolve(),
        terser({
            ecma: 2017,
            module: true,
            warnings: true,
            mangle: {
                properties: {
                    regex: /^__/
                }
            }
        }),
        summary({
            showGzippedSize: true,
            showBrotliSize: true,
            showMinifiedSize: true
        })
    ]
};

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
    {
        ...baseConfig,
        input: {
            'json-viewer': 'src/index.ts',
            JsonViewer: 'src/JsonViewer.ts'
        },
        external: [/lit/],
        output: {
            entryFileNames: '[name].js',
            dir: 'dist',
            format: 'esm',
            sourcemap: true
        }
    },
    {
        ...baseConfig,
        input: {
            'json-viewer': 'src/index.ts'
        },
        output: {
            entryFileNames: '[name].bundle.js',
            dir: 'dist',
            format: 'iife',
            sourcemap: true
        }
    }
];
