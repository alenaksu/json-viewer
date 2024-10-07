import { html, LitElement, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';

import { getType, generateNodePreview, deepTraverse, JSONConverter, isDefined, isPrimitive } from './utils';
import { toggleNode, expand, filter, highlight, resetFilter } from './stateChange';

import styles from './styles.css';
import { JSONArray, JSONObject, JSONValue, JsonViewerState, Primitive } from './types';

/**
 * @since 1.0
 *
 * @csspart object - The object wrapper element.
 * @csspart property - The wrapper element of a property.
 * @csspart key - The key element of a property.
 * @csspart primitive - The primitive value.
 * @csspart primitive--string - Applied when the primitive is a string.
 * @csspart primitive--number - Applied when the primitive is a number.
 * @csspart primitive--boolean - Applied when the primitive is a boolean.
 * @csspart primitive--null - Applied when the primitive is a null.
 * @csspart preview - The value preview of a property.
 * @csspart highlight - The highlighted value.
 *
 * @cssproperty [--background-color] - The component background color.
 * @cssproperty [--color] - The text color.
 * @cssproperty [--font-family] - The font family.
 * @cssproperty [--font-size] - The font size.
 * @cssproperty [--indent-size] - The size of the indentation of nested properties.
 * @cssproperty [--indentguide-size] - The width of the indentation line.
 * @cssproperty [--indentguide-style] - The style of the indentation line.
 * @cssproperty [--indentguide-color] - The color of the indentation line.
 * @cssproperty [--indentguide-color-active] - The color of the indentation line when is active.
 * @cssproperty [--indentguide]
 * @cssproperty [--indentguide-active]
 * @cssproperty [--string-color] - The color of a string type value
 * @cssproperty [--number-color] - The color of a number type value
 * @cssproperty [--boolean-color] - The color of a boolean type value
 * @cssproperty [--null-color] - The color of a null type value
 * @cssproperty [--property-color] - The color of the property key.
 * @cssproperty [--preview-color] - The color of the collapsed property preview.
 * @cssproperty [--highlight-color] - The color of the highlighted value.
 */
export class JsonViewer extends LitElement {
    static styles = [styles];

    @property({ converter: JSONConverter, type: Object })
    data?: JSONValue;

    @state()
    private state: JsonViewerState = {
        expanded: {},
        filtered: {},
        highlight: null
    };

    private async setState(stateFn: (state: JsonViewerState, element: JsonViewer) => Partial<JsonViewerState>) {
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

    *search(criteria: string | RegExp) {
        for (const [node, path] of deepTraverse(this.data)) {
            if (isPrimitive(node) && String(node).match(criteria)) {
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

    renderObject(node: JSONObject | JSONArray, path: string): TemplateResult {
        return html`
            <ul part="object">
                ${map(Object.entries(node), ([key, nodeData]) => {
                    const nodePath = path ? `${path}.${key}` : key;
                    const isPrimitiveNode = isPrimitive(nodeData);

                    return html`
                        <li part="property" data-path="${nodePath}" .hidden="${this.state.filtered[nodePath]}">
                            <span
                                part="key"
                                class="${classMap({
                                    key: key,
                                    collapsable: !isPrimitiveNode,
                                    collapsableCollapsed: !this.state.expanded[nodePath]
                                })}"
                                @click="${!isPrimitiveNode ? this.handlePropertyClick(nodePath) : null}"
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
        if (isPrimitive(node)) {
            return this.renderPrimitive(node, path);
        }

        const isRootNode = !path;
        const isExpanded = this.state.expanded[path];

        return isRootNode || !isExpanded ? this.renderObject(node, path) : this.renderNodePreview(node);
    }

    renderNodePreview(node: any) {
        return html`<span part="preview" class="preview"> ${generateNodePreview(node)} </span>`;
    }

    renderPrimitive(node: Primitive, path: string) {
        const highlight = this.state.highlight;
        const nodeType = getType(node);
        const value = html`
            <span part="primitive primitive-${nodeType}" tabindex="0" class="${getType(node)}">
                ${JSON.stringify(node)}
            </span>
        `;

        return path === highlight ? html`<mark part="highlight">${value}</mark>` : value;
    }

    render() {
        const data = this.data;

        return isDefined(data) ? this.renderNode(data) : nothing;
    }
}
