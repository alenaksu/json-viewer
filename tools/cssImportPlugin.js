const fs = require('fs/promises');

const cssResultModule = (cssText) => `\
import {css} from "lit";
export default css\`
${cssText.replace(/([$`\\])/g, '\\$1')}\`;
`;

const minifyCSS = (content) => {
    content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
    content = content.replace(/ {2,}/g, ' ');
    content = content.replace(/ ([{:}]) /g, '$1');
    content = content.replace(/([{:}]) /g, '$1');
    content = content.replace(/([;,]) /g, '$1');
    content = content.replace(/ !/g, '!');
    return content;
};

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
                return cssResultModule(minifyCSS(contents));
            }
        }
    };
};
