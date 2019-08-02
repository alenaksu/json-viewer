import { Element as TinyElement } from '@tiny-lit/element';
import { html } from '@tiny-lit/core';
import cn from 'classnames';
import styles from './styles.css';
import { getType, isPrimitive, JsonObject, generateNodePreview } from './utils';

const ObjectKey = ({ isCollapsable, collapsed, onClick, key }) => html`
    <span
        class=${cn([
            {
                [styles.key]: key,
                [styles.collapsable]: isCollapsable,
                [styles.collapsableCollapsed]: collapsed
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
            <span class=${styles[type]}>${JSON.stringify(node)}</span>
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
                        <li><json-nested-object-node key=${key} data=${data[key]}></json-nested-object-node></li>
                    `.withKey(key)
                )}
            </ul>
        `;
    }
}

class JsonViewer extends TinyElement {
    json = null;

    static get is() {
        return 'json-viewer';
    }

    connectedCallback() {
        this.data = JSON.parse(this.innerText);

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
