import { Element as TinyElement } from '@tiny-lit/element';
import { html } from '@tiny-lit/core';
import cn from 'classnames';
import { getType, isPrimitive, JsonObject, generateNodePreview } from './utils';

const ObjectKey = ({ isCollapsable, collapsed, onClick, key }) => html`
    <span
        class=${cn([
            {
                key: key,
                collapsable: isCollapsable,
                collapsableCollapsed: collapsed
            }
        ])}
        onClick=${onClick}
    >
        ${key}:
    </span>
`;

class JsonNestedObjectNode extends TinyElement {
    data = null;
    collapsed = true;

    static get properties() {
        return {
            data: JsonObject,
            collapsed: Boolean,
            key: String
        };
    }

    static get is() {
        return 'json-nested-object-node';
    }

    handleKeyClick = e => {
        e.preventDefault();
        this.collapsed = !this.collapsed;
    };

    renderValue(node) {
        const type = getType(node);

        return html`
            <span class=${type}>${JSON.stringify(node)}</span>
        `;
    }

    renderChild(node) {
        return this.collapsed
            ? html`
                  <span class="preview">
                      ${generateNodePreview(node)}
                  </span>
              `
            : html`
                  <json-object-node data=${node}></json-object-node>
              `;
    }

    render() {
        const { data, key } = this;

        return html`
            ${ObjectKey({
                isCollapsable: !isPrimitive(data),
                collapsed: this.collapsed,
                key,
                onClick: !isPrimitive(data) && this.handleKeyClick
            })}
            ${isPrimitive(data) ? this.renderValue(data) : this.renderChild(data)}
        `;
    }
}

class JsonObjectNode extends TinyElement {
    data = null;
    collapsed = true;

    static get is() {
        return 'json-object-node';
    }

    static get properties() {
        return {
            data: JsonObject,
            collapsed: Boolean
        };
    }

    render() {
        const { data } = this;

        return html`
            <ul>
                ${Object.keys(data).map(key =>
                    html`
                        <li>
                            <json-nested-object-node key=${key} data=${data[key]}></json-nested-object-node>
                        </li>
                    `.withKey(key)
                )}
            </ul>
        `;
    }
}

class JsonViewer extends TinyElement {
    json = null;
    data = '';

    static get is() {
        return 'json-viewer';
    }

    static get properties() {
        return {
            data: JsonObject
        };
    }

    connectedCallback() {
        const data = JSON.parse(this.innerText);

        this.attachShadow({ mode: 'open' });
        this.data = data;

        super.connectedCallback();
    }

    render() {
        return html`
            <style>
                :host {
                    --background-color: rgb(42, 47, 58);
                    --color: #f8f8f2;
                    --string-color: #a3eea0;
                    --number-color: #d19a66;
                    --boolean-color: #4ba7ef;
                    --null-color: #df9cf3;
                    --key-color: rgb(111, 179, 210);
                    --collapsed-color: #fff;
                    --collapsed-background: #66d9ef;
                    --font-family: monaco, Consolas, 'Lucida Console', monospace;
                    --preview-color: rgba(222, 175, 143, 0.9);

                    display: block;
                    background-color: var(--background-color);
                    color: var(--color);
                    padding: 0.5rem;
                    font-family: var(--font-family);
                    font-size: 1rem;
                }

                .preview {
                    color: var(--preview-color);
                }

                .collapsed ul {
                    display: none;
                }

                .null {
                    color: var(--null-color, #df9cf3);
                }

                .key {
                    color: var(--key-color, #f9857b);
                    display: inline-block;
                }

                .collapsable:before {
                    display: inline-block;
                    color: var(--color);
                    padding-right: 5px;
                    padding-left: 5px;
                    font-size: 0.7rem;
                    content: '▶';
                    transition: transform 195ms ease-in;
                    transform: rotate(90deg);
                    color: var(--key-color);
                }

                .collapsable.collapsableCollapsed:before {
                    transform: rotate(0);
                }

                .collapsable {
                    cursor: pointer;
                    user-select: none;
                }

                .string {
                    color: var(--string-color);
                }

                .number {
                    color: var(--number-color);
                }

                .boolean {
                    color: var(--boolean-color);
                }

                .collapsed {
                    font-size: 10px;
                    background-color: var(--collapsed-background);
                    color: var(--collapsed-color);
                    padding: 0.3em;
                    border-radius: 2px;
                }

                ul {
                    padding: 0;
                    clear: both;
                }

                ul,
                li {
                    list-style: none;
                    position: relative;
                }

                li ul > li {
                    position: relative;
                    padding-top: 0.25rem;
                    margin-left: 1.5rem;
                    padding-left: 0px;
                    white-space: nowrap;
                }

                ul:before {
                    content: '';
                    border-left: 1px solid #333;
                    position: absolute;
                    left: 0.5rem;
                    top: 0.5rem;
                    bottom: 0.5rem;
                }

                ul.hover:before {
                    border-left: 1px solid #666;
                }
            </style>
            <json-object-node data=${this.data}></json-object-node>
        `;
    }
}
customElements.define(JsonObjectNode.is, JsonObjectNode);
customElements.define(JsonNestedObjectNode.is, JsonNestedObjectNode);
customElements.define(JsonViewer.is, JsonViewer);
