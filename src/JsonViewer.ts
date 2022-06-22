import { html, LitElement, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import {
    getType,
    isPrimitiveOrNode,
    generateNodePreview,
    isNode,
    deepTraverse,
    JSONConverter,
    isDefined
} from './utils';
import { toggleNode, expand, filter, highlight, resetFilter } from './stateChange';

import styles from './styles.css';
import { JsonViewerState, Primitive } from './types';

export class JsonViewer extends LitElement {
    static styles = [styles];

    @property({ converter: JSONConverter, type: Object })
    data?: any;

    @state() private state: JsonViewerState = {
        expanded: {},
        filtered: {},
        highlight: null
    };

    private async setState(stateFn: (state: JsonViewerState, el: JsonViewer) => Partial<JsonViewerState>) {
        const currentState = this.state;

        this.state = {
            ...currentState,
            ...stateFn(currentState, this)
        };
    }

    connectedCallback() {
        if (!this.hasAttribute('data') && !isDefined(this.data)) {
            this.setAttribute('data', this.innerText);
        }

        super.connectedCallback();
    }

    handlePropertyClick = (path: string) => (e: Event) => {
        e.preventDefault();

        this.setState(toggleNode(path));
    };

    expand(glob: string | RegExp) {
        this.setState(expand(glob, true));
    }

    expandAll() {
        this.setState(expand('**', true));
    }

    collapseAll() {
        this.setState(expand('**', false));
    }

    collapse(glob: string | RegExp) {
        this.setState(expand(glob, false));
    }

    *search(criteria: string) {
        for (const [node, path] of deepTraverse(this.data)) {
            if (isPrimitiveOrNode(node) && String(node).includes(criteria)) {
                this.expand(path);
                this.updateComplete.then(() => {
                    const node = this.shadowRoot!.querySelector(`[data-path="${path}"]`) as HTMLElement;
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

    filter(criteria: string | RegExp) {
        this.setState(filter(criteria));
    }

    resetFilter() {
        this.setState(resetFilter());
    }

    renderObject(node: Record<string, unknown>, path: string): TemplateResult {
        return html`
            <ul>
                ${Object.keys(node).map((key) => {
                    const nodeData = node[key];
                    const nodePath = path ? `${path}.${key}` : key;
                    const isPrimitive = isPrimitiveOrNode(nodeData);

                    return html`
                        <li data-path="${nodePath}" .hidden="${this.state.filtered[nodePath]}">
                            <span
                                class="${classMap({
                                    key: key,
                                    collapsable: !isPrimitive,
                                    collapsableCollapsed: !this.state.expanded[nodePath]
                                })}"
                                @click="${!isPrimitive ? this.handlePropertyClick(nodePath) : null}"
                            >
                                ${key}:
                            </span>
                            ${this.renderNode(nodeData, nodePath)}
                        </li>
                    `;
                })}
            </ul>
        `;
    }

    renderNode(node: any, path = '') {
        const isPrimitive = isPrimitiveOrNode(node);
        const isExpanded = !path || this.state.expanded[path] || isPrimitive;

        if (isExpanded) {
            return isPrimitiveOrNode(node) ? this.renderValue(node, path) : this.renderObject(node, path);
        } else {
            return this.renderNodePreview(node);
        }
    }

    renderNodePreview(node: any) {
        return html` <span class="preview"> ${generateNodePreview(node)} </span> `;
    }

    renderValue(node: Primitive | null, path: string) {
        const highlight = this.state.highlight;
        const value = isNode(node)
            ? node
            : html` <span tabindex="0" class="${getType(node)}">${JSON.stringify(node)}</span> `;

        return path === highlight ? html`<mark>${value}</mark>` : value;
    }

    render() {
        const data = this.data;

        return isDefined(data) ? this.renderNode(data) : null;
    }
}
