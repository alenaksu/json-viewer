import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';

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
        resolve({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true
        }),
        terser()
    ]
};
