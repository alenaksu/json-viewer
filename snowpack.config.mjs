export default {
    mount: {
        src: '/static',
        website: { url: '/', static: true }
    },
    devOptions: {
        out: './docs'
    },
    buildOptions: {
        baseUrl: '/json-viewer/',
        clean: true,
        out: './docs'
    },
    plugins: ['./tools/cssImportPlugin', ['@snowpack/plugin-babel']]
};
