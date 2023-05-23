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
    isDefined,
    isCollapsed,
    isExpandedAndNonPrimitive,
    isTopLevelElement,
    canNavigateDown
} from './utils';
import {
    toggleNode,
    expand,
    filter,
    highlight,
    resetFilter,
    collapseSingleNode,
    expandSingleNode
} from './stateChange';
import { navigateDown, navigateUp, navigateToParent } from './keyboardNavigation';

import styles from './styles.css';
import { JsonViewerState, Primitive } from './types';

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

        this.addEventListener('keydown', this.handleKeyDown);

        super.connectedCallback();
    }

    handlePropertyClick = (path: string) => (e: Event) => {
        e.preventDefault();

        this.setState(toggleNode(path));
    };

    handleKeyDown = (event: KeyboardEvent) => {
        if (!this.shadowRoot) return;
        const path = this.shadowRoot.activeElement?.parentElement?.getAttribute('data-path');
        if (!path) return;
        switch (event.code) {
            case 'ArrowUp':
                event.preventDefault();
                navigateUp(path, this.shadowRoot);
                break;
            case 'ArrowDown':
                event.preventDefault();
                navigateDown(path, this.shadowRoot);
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (isExpandedAndNonPrimitive(path, this.shadowRoot)) this.setState(collapseSingleNode(path));
                else if (!isTopLevelElement(path, this.shadowRoot)) navigateToParent(path, this.shadowRoot);
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (isCollapsed(path, this.state)) this.setState(expandSingleNode(path));
                else if (canNavigateDown(path, this.shadowRoot)) {
                    navigateDown(path, this.shadowRoot);
                }
                break;
            default:
                break;
        }
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

    renderObject(node: Record<string, unknown>, path: string, isRoot: boolean): TemplateResult {
        return html`
            <ul part="object">
                ${Object.keys(node).map((key, i) => {
                    const nodeData = node[key];
                    const nodePath = path ? `${path}.${key}` : key;
                    const isPrimitive = isPrimitiveOrNode(nodeData);

                    return html`
                        <li part="property" data-path="${nodePath}" .hidden="${this.state.filtered[nodePath]}">
                            <span
                                part="key"
                                tabindex=${isRoot && i === 0 ? '0' : '-1'}
                                class="${classMap({
                                    key: key,
                                    collapsable: !isPrimitive,
                                    collapsableCollapsed: !this.state.expanded[nodePath]
                                })}"
                                @click="${!isPrimitive ? this.handlePropertyClick(nodePath) : null}"
                            >
                                ${key}:
                            </span>
                            ${this.renderNode(nodeData, false, nodePath)}
                        </li>
                    `;
                })}
            </ul>
        `;
    }

    renderNode(node: any, isRoot = false, path = '') {
        const isPrimitive = isPrimitiveOrNode(node);
        const isExpanded = !path || this.state.expanded[path] || isPrimitive;

        if (isExpanded) {
            return isPrimitive ? this.renderPrimitive(node, path) : this.renderObject(node, path, isRoot);
        } else {
            return this.renderNodePreview(node);
        }
    }

    renderNodePreview(node: any) {
        return html` <span part="preview" class="preview"> ${generateNodePreview(node)} </span> `;
    }

    renderPrimitive(node: Primitive | null, path: string) {
        const highlight = this.state.highlight;
        const nodeType = getType(node);
        const value = isNode(node)
            ? node
            : html`
                  <span part="primitive primitive-${nodeType}" class="${getType(node)}">${JSON.stringify(node)}</span>
              `;

        return path === highlight ? html`<mark part="highlight">${value}</mark>` : value;
    }

    render() {
        const data = this.data;

        return isDefined(data) ? this.renderNode(data, true) : null;
    }
}
