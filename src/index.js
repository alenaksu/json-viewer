import { Element as TinyElement } from '@tiny-lit/element';
import { html } from '@tiny-lit/core';
import styles from './styles.css';
import { getType, isPrimitive, JsonObject, generateNodePreview, isNode, classNames } from './utils';

const ObjectKey = ({ isCollapsable, collapsed, onClick, key }) => html`
    <span
        class=${classNames(
            key && styles.key,
            isCollapsable && styles.collapsable,
            collapsed && styles.collapsableCollapsed
        )}
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
        return isNode(node)
            ? node
            : html`
                  <span class=${styles[getType(node)]}>${JSON.stringify(node)}</span>
              `;
    }

    renderChild(node) {
        return this.collapsed
            ? html`
                  <span class=${styles.preview}>
                      ${generateNodePreview(node)}
                  </span>
              `
            : html`
                  <json-object-node data=${node}></json-object-node>
              `;
    }

    render() {
        const { data, key } = this;
        const isPrimitiveOrNode = isPrimitive(data) || isNode(data);

        return html`
            ${ObjectKey({
                isCollapsable: !isPrimitiveOrNode,
                collapsed: this.collapsed,
                key,
                onClick: !isPrimitiveOrNode && this.handleKeyClick
            })}
            ${isPrimitiveOrNode ? this.renderValue(data) : this.renderChild(data)}
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
                        <li><json-nested-object-node key=${key} data=${data[key]}></json-nested-object-node></li>
                    `.withKey(key)
                )}
            </ul>
        `;
    }
}

class JsonViewer extends TinyElement {
    data = null;

    static get is() {
        return 'json-viewer';
    }

    static get properties() {
        return {
            data: JsonObject
        };
    }

    connectedCallback() {
        const json = this.innerText.trim();

        if (json) this.data = JSON.parse(json);

        super.connectedCallback();
    }

    render() {
        return html`
            <json-object-node data=${this.data}></json-object-node>
        `;
    }
}
customElements.define(JsonObjectNode.is, JsonObjectNode);
customElements.define(JsonNestedObjectNode.is, JsonNestedObjectNode);
customElements.define(JsonViewer.is, JsonViewer);
