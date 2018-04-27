import { html, Element, collection } from 'tiny-lit/lib/es5';
import cn from 'classnames';
import styles from './styles.css';

function getType(obj) {
    return obj === null ? 'null' : Array.isArray(obj) ? 'array' : typeof obj;
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function toggleCollapse(key) {
    return prevState => ({
        [key]: !prevState[key]
    })
}

class JsonObjectNode extends Element {
     static get is() {
         return 'json-object-node';
     }

     static define() {
         customElements.define(JsonObjectNode.is, JsonObjectNode);
     }

     connectedCallback() {
        this.setState({
            collapsed: false,
            json: this.json
        })
     }

     handleKeyClick = key => e => {
         e.preventDefault();
         this.setState(toggleCollapse(key));
     }

     getTemplate() {
         const { json } = this.state;

         return html`<span class=${styles.bracket}>{</span>
            <ul>
                ${collection(Object.keys(json), (key, index) => (
                    html`
                    <li>
                        <span 
                            class=${cn([
                                styles.key,
                                {
                                    [styles.collapsable]: isObject(json[key]),
                                    [styles.collapsableCollapsed]: this.state[key]
                                }
                            ])}
                            onClick=${isObject(json[key]) && this.handleKeyClick(key)}>
                            "${key}"
                        </span>:
                        ${this.state[key]
                            ? html`<span class=${styles.collapsed}>...</span>` 
                            : html`${renderNode(json[key])}${index < Object.keys(json).length - 1 ? `, `: null}`
                        }
                    </li>`.withKey(key)
                ))}
            </ul>
            <span class=${styles.bracket}>}</span>`;
     }
}
JsonObjectNode.define();

function renderNode(node) {
    switch(getType(node)) {
        case 'null':
            return html`<span class=${styles.null}>null</span>`;
        case 'string':
            return html`<span class=${styles.string}>"${node}"</span>`;
        case 'number':
            return html`<span class=${styles.number}>${node}</span>`;
        case 'boolean':
            return html`<span class=${styles.boolean}>${node}</span>`;
        case 'array':
            return html`<span class=${styles.bracket}>[</span>
                <ul>
                    <li>
                    ${collection(node, (n, index) => (html`${renderNode(n)}${index < node.length - 1 ? html`, `: null}`))}
                    </li>
                </ul>
                <span class=${styles.bracket}>]</span>`;
        case 'object':
            return html`<json-object-node json=${node}></json-object-node>`; 
    }
}

class JsonViewer extends Element {
    state = {
        json: null
    };

    static get is() {
        return 'json-viewer';
    }

    connectedCallback() {
        const json = JSON.parse(this.innerText);
        this.innerHTML = '';
        this.setState({ json });
    }

    getTemplate() {
        return html`
            <ul>
                <li>
                    ${renderNode(this.state.json)}
                </li>
            </ul>
        `
    }
}
customElements.define(JsonViewer.is, JsonViewer);