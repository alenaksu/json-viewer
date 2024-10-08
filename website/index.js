import { css, html } from 'lit';
import { JsonViewer } from '../src/JsonViewer.ts';
import 'https://unpkg.com/comlink/dist/umd/comlink.js';

import '../themes/default.css';
import '../themes/light.css';

customElements.define(
    'json-viewer',
    class extends JsonViewer {
        static styles = [
            JsonViewer.styles,
            css`
                a {
                    color: white;
                    text-decoration: underline;
                }
            `
        ];

        static customRenderer(value) {
            if (typeof value === 'string') {
                if (URL.canParse(value)) {
                    return html`<a href="${value}" target="_blank">${value}</a>`;
                } else if (Date.parse(value)) {
                    return new Date(value).toLocaleString();
                }
            } else if (typeof value === 'number') {
                return value.toFixed(2);
            }

            return super.customRenderer(value);
        }
    }
);

const worker = Comlink.wrap(new Worker(new URL('worker.js', import.meta.url)));

const json = document.querySelector('#json');
const viewer = document.querySelector('json-viewer');
const toggle = document.querySelector('#toggle-panel');
const container = document.querySelector('#container');
const loader = document.querySelector('#loader');
const expand = document.querySelector('#expand');
const collapse = document.querySelector('#collapse');
const filter = document.querySelector('#filter');
const search = document.querySelector('#search');
let currentSearch;

expand.addEventListener('click', (e) => {
    e.preventDefault();
    viewer.expandAll();
});

collapse.addEventListener('click', (e) => {
    e.preventDefault();
    viewer.collapseAll();
});

filter.addEventListener('change', () => {
    if (!filter.value) viewer.resetFilter();
    else viewer.filter(filter.value);
});

search.addEventListener('input', () => {
    currentSearch = viewer.search(search.value);
});
search.addEventListener('keyup', (e) => {
    if (currentSearch && e.keyCode === 13) {
        currentSearch.next();
    }
});

const debounce = (fn, timeout = 500) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), timeout);
    };
};

const loadJson = (data) => {
    try {
        viewer.data = JSON.parse(data);
    } catch (ex) {
        viewer.data = ex.message;
    }
};

const handleEditorChange = () => {
    const jsonString = editor.getValue();

    loader.hidden = false;

    Promise.all([
        loadJson(jsonString),
        worker.crush(jsonString).then((value) => {
            location.hash = value;
        })
    ]).then(() => {
        loader.hidden = true;
    });
};

const editor = CodeMirror.fromTextArea(json, {
    mode: { name: 'javascript', json: true },
    // matchBrackets: true,
    // smartIndent: true,
    // indentUnit: 4,
    // lineWrapping: true,
    lineNumbers: true,
    theme: 'jsv',
    styleActiveLine: true,
    // foldGutter: true,
    // gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    lint: {
        esversion: 6
    }
});

toggle.addEventListener('click', () => {
    container.classList.toggle('collapsed');
});

editor.on('change', debounce(handleEditorChange));

worker.uncrush(location.hash.slice(1)).then((value) => {
    if (value) {
        editor.setValue(value);
        container.classList.add('collapsed');
    } else {
        handleEditorChange();
    }
});
