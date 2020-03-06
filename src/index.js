import { html, Element as TinyElement } from '@tiny-lit/element';
import { getType, isPrimitiveOrNode, JsonObject, generateNodePreview, isNode, classNames, deepTraverse } from './utils';
import { toggleNode, expand, filter, highlight } from './stateChange';

import styles from 'bundle-text:./styles.css';

class JsonViewer extends TinyElement {
    data = null;
    state = {
        expanded: {},
        filtered: {},
        highlight: null
    };

    static get is() {
        return 'json-viewer';
    }

    static get properties() {
        return {
            data: { type: JsonObject, onChange: true }
        };
    }

    handlePropertyClick = (path) => (e) => {
        e.preventDefault();

        this.setState(toggleNode(path));
    };

    connectedCallback() {
        // TODO
        let json;
        if (!this.hasAttribute('data')) {
            json = this.innerText.trim();
        }

        this.attachShadow({ mode: 'open' });

        super.connectedCallback();

        if (json) this.data = JSON.parse(json);
    }

    expand(glob, callback) {
        this.setState(expand(glob, true), callback);
    }

    expandAll() {
        this.setState(expand('**', true));
    }

    collapseAll() {
        this.setState(expand('**', false));
    }

    collapse(glob) {
        this.setState(expand(glob, false));
    }

    *search(criteria) {
        for (const [node, path, parents] of deepTraverse(this.data)) {
            if (isPrimitiveOrNode(node) && String(node).includes(criteria)) {
                this.expand(path, () => {
                    const node = this.renderRoot.querySelector(`[data-path="${path}"]`);
                    node.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block: 'center'
                    });

                    node.focus();
                });

                this.setState(highlight(path));

                yield {
                    value: node,
                    path
                };
            }
        }

        this.setState(highlight(null));
    }

    filter(filterString) {
        this.setState(filter(filterString));
    }

    resetFilter() {
        this.setState({ filtered: {} });
    }

    renderObject(node, path) {
        return html`
            <ul>
                ${Object.keys(node).map((key) => {
                    const nodeData = node[key];
                    const nodePath = path ? `${path}.${key}` : key;
                    const isPrimitive = isPrimitiveOrNode(nodeData);
                    const expanded = this.state.expanded[nodePath] || isPrimitive;

                    return html`
                        <li data-path=${nodePath} hidden=${this.state.filtered[nodePath]}>
                            ${this.renderPropertyKey({
                                isCollapsable: !isPrimitive,
                                collapsed: !this.state.expanded[nodePath],
                                key,
                                onClick: this.handlePropertyClick(nodePath)
                            })}
                            ${expanded ? this.renderNode(nodeData, nodePath) : this.renderNodePreview(nodeData)}
                        </li>
                    `.withKey(key);
                })}
            </ul>
        `;
    }

    renderNode(node, path = '') {
        return isPrimitiveOrNode(node) ? this.renderValue(node, path) : this.renderObject(node, path);
    }

    renderNodePreview(node) {
        return html` <span class="preview"> ${generateNodePreview(node)} </span> `;
    }

    renderPropertyKey({ isCollapsable, collapsed, onClick, key }) {
        return html`
            <span
                class=${classNames(key && 'key', isCollapsable && 'collapsable', collapsed && 'collapsableCollapsed')}
                onClick=${isCollapsable ? onClick : null}
            >
                ${key}:
            </span>
        `;
    }

    renderValue(node, path) {
        const highlight = this.state.highlight;
        const value = isNode(node)
            ? node
            : html` <span tabindex="0" class=${getType(node)}>${JSON.stringify(node)}</span> `;

        return highlight !== null && path === highlight ? html`<mark>${value}</mark>` : value;
    }

    render() {
        return html`
            <style>
                ${styles}
            </style>

            ${this.renderNode(this.data)}
        `;
    }
}
customElements.define(JsonViewer.is, JsonViewer);
