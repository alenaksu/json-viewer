import { html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { getType, isPrimitiveOrNode, JsonObject, generateNodePreview, isNode, classNames, deepTraverse } from './utils';
import { toggleNode, expand, filter, highlight } from './stateChange';

import styles from './styles.css';

@customElement('json-viewer')
class JsonViewer extends LitElement {
    @property({ converter: JsonObject, type: Object })
    data = null;

    @property({ state: true })
    state = {
        expanded: {},
        filtered: {},
        highlight: null
    };

    static get styles() {
        return [styles];
    }

    static get is() {
        return 'json-viewer';
    }

    /**
     * @deprecate
     */
    async setState(fn, callback) {
        this.state = {
            ...this.state,
            ...(typeof fn === 'function' ? fn(this.state, this) : fn)
        };
        this.updateComplete.then(callback);
    }

    connectedCallback() {
        if (!this.hasAttribute('data')) {
            this.setAttribute('data', this.innerText);
        }

        super.connectedCallback();
    }

    handlePropertyClick = (path) => (e) => {
        e.preventDefault();

        this.setState(toggleNode(path));
    };

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
                        <li data-path=${nodePath} .hidden=${this.state.filtered[nodePath]}>
                            ${this.renderPropertyKey({
                                isCollapsable: !isPrimitive,
                                collapsed: !this.state.expanded[nodePath],
                                key,
                                onClick: this.handlePropertyClick(nodePath)
                            })}
                            ${expanded ? this.renderNode(nodeData, nodePath) : this.renderNodePreview(nodeData)}
                        </li>
                    `;
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
                @click=${isCollapsable ? onClick : null}
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
        return html` ${this.renderNode(this.data)} `;
    }
}
