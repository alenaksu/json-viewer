import { html, LitElement, nothing, TemplateResult } from 'lit';
import { property, queryAll, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import {
    getType,
    generateNodePreview,
    deepTraverse,
    JSONConverter,
    isDefined,
    isPrimitive,
    getValueByPath
} from './utils';
import { toggleNode, expand, filter, highlight, resetFilter } from './stateChange';

import styles from './JsonViewer.styles';
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
 * @cssproperty [--line-height] - The line height.
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

    static customRenderer(value: Primitive, _path: string): TemplateResult | Node | string {
        return JSON.stringify(value);
    }

    @property({ converter: JSONConverter, type: Object })
    data?: JSONValue;

    @state()
    private state: JsonViewerState = {
        expanded: {},
        filtered: {},
        highlight: null
    };

    @state()
    private lastFocusedItem: HTMLElement | null = null;

    @queryAll('[role="treeitem"]')
    private nodeElements!: HTMLElement[];

    private async setState(stateFn: (state: JsonViewerState, element: JsonViewer) => Partial<JsonViewerState>) {
        const currentState = this.state;

        this.state = {
            ...currentState,
            ...stateFn(currentState, this)
        };
    }

    constructor() {
        super();
        this.addEventListener('focusin', this.#handleFocusIn);
        this.addEventListener('focusout', this.#handleFocusOut);
    }

    connectedCallback() {
        if (!this.hasAttribute('data') && !isDefined(this.data)) {
            this.setAttribute('data', this.innerText);
        }

        this.setAttribute('role', 'node');
        this.setAttribute('tabindex', '0');

        super.connectedCallback();
    }

    #handlePropertyClick = (path: string) => (e: Event) => {
        e.preventDefault();

        this.setState(toggleNode(path));
    };

    #handleFocusIn = (event: FocusEvent) => {
        const target = event.target as HTMLElement;

        // Restores the focus to the last focused item
        if (event.target === this) {
            this.#focusItem(this.lastFocusedItem || this.nodeElements[0]!);
        }

        // If the target is a property, update its tabIndex
        if (target.matches('[role="treeitem"]')) {
            if (this.lastFocusedItem) {
                this.lastFocusedItem.tabIndex = -1;
            }
            this.lastFocusedItem = target;
            this.tabIndex = -1;

            target.tabIndex = 0;
        }
    };

    #handleFocusOut = (event: FocusEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement;

        // If the element that got the focus is not in the node
        if (!relatedTarget || !this.contains(relatedTarget)) {
            this.tabIndex = 0;
        }
    };

    #handleKeyDown(event: KeyboardEvent) {
        // Ignore key presses we aren't interested in
        if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
            return;
        }

        const nodes = [...this.nodeElements];
        const isLtr = this.matches(':dir(ltr)');
        const isRtl = this.matches(':dir(rtl)');

        if (nodes.length > 0) {
            event.preventDefault();

            const activeItemIndex = nodes.findIndex((item) => item.matches(':focus'));
            const activeItem: HTMLElement | undefined = nodes[activeItemIndex];
            const isExpanded = this.state.expanded[activeItem.dataset.path!];
            const isLeaf = isPrimitive(getValueByPath(this.data!, activeItem.dataset.path!));

            const focusItemAt = (index: number) => {
                const item = nodes[Math.max(Math.min(index, nodes.length - 1), 0)];
                this.#focusItem(item);
            };
            const toggleExpand = (expanded: boolean) => {
                this.setState(toggleNode(activeItem!.dataset.path!, expanded));
            };

            if (event.key === 'ArrowDown') {
                // Moves focus to the next node that is focusable without opening or closing a node.
                focusItemAt(activeItemIndex + 1);
            } else if (event.key === 'ArrowUp') {
                // Moves focus to the next node that is focusable without opening or closing a node.
                focusItemAt(activeItemIndex - 1);
            } else if ((isLtr && event.key === 'ArrowRight') || (isRtl && event.key === 'ArrowLeft')) {
                //
                // When focus is on a closed node, opens the node; focus does not move.
                // When focus is on a open node, moves focus to the first child node.
                // When focus is on an end node (a node item with no children), does nothing.
                //
                if (!activeItem || isExpanded || isLeaf) {
                    focusItemAt(activeItemIndex + 1);
                } else {
                    toggleExpand(true);
                }
            } else if ((isLtr && event.key === 'ArrowLeft') || (isRtl && event.key === 'ArrowRight')) {
                //
                // When focus is on an open node, closes the node.
                // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
                // When focus is on a closed `node`, does nothing.
                //
                if (!activeItem || !isExpanded || isLeaf) {
                    focusItemAt(activeItemIndex - 1);
                } else {
                    toggleExpand(false);
                }
            } else if (event.key === 'Home') {
                // Moves focus to the first node in the node without opening or closing a node.
                focusItemAt(0);
            } else if (event.key === 'End') {
                // Moves focus to the last node in the node that is focusable without opening the node.
                focusItemAt(nodes.length - 1);
            }
        }
    }

    #focusItem(item: HTMLElement) {
        item.focus();
    }

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
            <ul part="object" role="group">
                ${map(Object.entries(node), ([key, nodeData]) => {
                    const nodePath = path ? `${path}.${key}` : key;
                    const isPrimitiveNode = isPrimitive(nodeData);
                    const isExpanded = this.state.expanded[nodePath];
                    const isFiltered = this.state.filtered[nodePath];

                    return isFiltered
                        ? nothing
                        : html`
                              <li
                                  part="property"
                                  role="treeitem"
                                  data-path="${nodePath}"
                                  aria-expanded="${isExpanded ? 'true' : 'false'}"
                                  tabindex="-1"
                                  .hidden="${this.state.filtered[nodePath]}"
                                  aria-hidden="${this.state.filtered[nodePath]}"
                              >
                                  <span
                                      part="key"
                                      class="${classMap({
                                          key: key,
                                          collapsable: !isPrimitiveNode,
                                          ['collapsable--collapsed']: !this.state.expanded[nodePath]
                                      })}"
                                      @click="${!isPrimitiveNode ? this.#handlePropertyClick(nodePath) : null}"
                                  >
                                      ${key}:
                                      ${when(!isPrimitiveNode && !isExpanded, () => this.renderNodePreview(nodeData))}
                                  </span>

                                  ${when(isPrimitiveNode || isExpanded, () => this.renderValue(nodeData, nodePath))}
                              </li>
                          `;
                })}
            </ul>
        `;
    }

    renderValue(value: JSONValue, path = '') {
        if (isPrimitive(value)) {
            return this.renderPrimitive(value, path);
        }

        return this.renderObject(value, path);
    }

    renderNodePreview(node: JSONValue) {
        return html`<span part="preview" class="preview"> ${generateNodePreview(node)} </span>`;
    }

    renderPrimitive(node: Primitive, path: string) {
        const highlight = this.state.highlight;
        const nodeType = getType(node);
        const renderedValue = (this.constructor as any).customRenderer(node, path);
        const primitiveNode = html`
            <span part="primitive primitive-${nodeType}" class="${getType(node)}"> ${renderedValue} </span>
        `;

        return path === highlight ? html`<mark part="highlight">${primitiveNode}</mark>` : primitiveNode;
    }

    render() {
        const data = this.data;

        return html`
            <div
                part="base"
                @keydown=${this.#handleKeyDown}
                @focusin="${this.#handleFocusIn}"
                @focusout="${this.#handleFocusOut}"
            >
                ${when(isDefined(data), () => this.renderValue(data!))}
            </div>
        `;
    }
}
