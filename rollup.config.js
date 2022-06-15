import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import litcss from 'rollup-plugin-lit-css';
import analyze from 'rollup-plugin-analyzer';

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

export default {
    // If using any exports from a symlinked project, uncomment the following:
    // preserveSymlinks: true,
    input: {
        'json-viewer': 'src/index.js',
        JsonViewer: 'src/JsonViewer.js'
    },
    output: {
        entryFileNames: '[name].js',
        dir: 'dist',
        format: 'es',
        sourcemap: true
    },
    plugins: [
        minifyHTML(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            configFile: './.babelrc',
            compact: true
        }),
        bundleText(),
        litcss({
            uglify: true
        }),
        nodeResolve({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true,
            browser: true
        }),
        terser(),
        analyze({ summaryOnly: true })
    ]
};
