import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

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
    input: ['src/index.js'],
    output: {
        file: 'build/index.js',
        format: 'es',
        sourcemap: true
    },
    plugins: [
        minifyHTML(),
        babel({
            exclude: 'node_modules/**'
        }),
        bundleText(),
        postcss({
            minimize: true,
            inject: false
        }),
        nodeResolve({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true
        }),
        terser()
    ]
};
