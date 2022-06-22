import { createFilter } from '@rollup/pluginutils';
import fs from 'fs/promises';

export function parseRequest(id) {
    const [filename, rawQuery] = id.split(`?`, 2);
    const query = new URLSearchParams(rawQuery);

    return {
        filename,
        query
    };
}

const cssResultModule = (cssText) => `\
import {css} from "lit";
export default css\`
${cssText.replace(/([$`\\])/g, '\\$1')}\`;
`;

/* minify css */
const minifyCSS = (content) => {
    content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
    content = content.replace(/ {2,}/g, ' ');
    content = content.replace(/ ([{:}]) /g, '$1');
    content = content.replace(/([{:}]) /g, '$1');
    content = content.replace(/([;,]) /g, '$1');
    content = content.replace(/ !/g, '!');

    return content;
};

/**
 *
 * @param {*} options
 * @returns {import('rollup').Plugin}
 */
export default function cssImportPlugin(options = {}) {
    options = {
        transform: (code, id) => code,
        include: ['**/src/**/*.styles.css', '**/src/**/styles.css'],
        minify: false,
        ...options
    };

    const filter = createFilter(options.include, options.exclude, { resolve: false });
    const processedCss = new Set();

    return {
        name: 'css-import-plugin', // this name will show up in warnings and errors
        enforce: 'post',

        async transform(code, id) {
            const { filename } = parseRequest(id);

            if (!filter(filename)) return;

            const sourceCode = await fs.readFile(filename, 'utf-8');
            const transformedCode = await options.transform(sourceCode);

            processedCss.add(id);

            return {
                code: cssResultModule(options.minify ? minifyCSS(transformedCode) : transformedCode),
                map: { mappings: '' }
            };
        }
    };
}
