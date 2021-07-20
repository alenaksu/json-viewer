const fs = require('fs/promises');

module.exports = function (snowpackConfig, options = {}) {
    return {
        name: 'css-import-plugin',
        resolve: {
            input: ['.css'],
            output: ['.js']
        },
        async load({ filePath }) {
            if (filePath.indexOf('src/') !== -1) {
                const contents = await fs.readFile(filePath, 'utf-8');
                return `
                    import { css } from 'lit';
                    export default css\`${contents}\`;
                `;
            }
        }
    };
};
