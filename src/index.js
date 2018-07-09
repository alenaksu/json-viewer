import { html, Element } from 'tiny-lit/lib/es5';
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

     json = '';

     connectedCallback() {
        this.setState({
            collapsed: false,
            json: this.json,
            isArray: Array.isArray(this.json)
        })
     }

     handleKeyClick = key => e => {
         e.preventDefault();
         this.setState(toggleCollapse(key));
     }

     getTemplate() {
         const { json, isArray } = this.state;

         const brackets = isArray ? ['[', ']'] : ['{', '}'];
        
         return html`<span class=${styles.bracket}>${brackets[0]}</span>
            <ul>
                ${Object.keys(json).map((key, index) => (
                    html`
                    <li>
                        <span 
                            class=${cn([
                                {
                                    [styles.key]: !isArray,
                                    [styles.collapsable]: isObject(json[key]),
                                    [styles.collapsableCollapsed]: this.state[key]
                                }
                            ])}
                            onClick=${isObject(json[key]) && this.handleKeyClick(key)}>${isArray ? key : `"${key}"`}
                        </span>:
                        ${this.state[key]
                            ? html`<span class=${styles.collapsed}>${(Array.isArray(json[key]) ? ['[', ']'] : ['{', '}']).join(' ... ')}</span>` 
                            : html`${renderNode(json[key])}${index < Object.keys(json).length - 1 ? `, `: null}`
                        }
                    </li>`.withKey(key)
                ))}
            </ul>
            <span class=${styles.bracket}>${brackets[1]}</span>`;
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
            return html`<json-object-node json=${node}></json-object-node>`; 
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