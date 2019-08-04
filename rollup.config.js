import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

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
        resolve,
        babel({
            exclude: 'node_modules/**'
        })
    ]
};
