import { Element } from '@tiny-lit/element';
import { html } from '@tiny-lit/core';
import cn from 'classnames';

function _extends() {
    _extends =
        Object.assign ||
        function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

    return _extends.apply(this, arguments);
}

function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }

    strings.raw = raw;
    return strings;
}

function getType(obj) {
    return obj === null ? 'null' : Array.isArray(obj) ? 'array' : typeof obj;
}
function isPrimitive(obj) {
    return obj !== Object(obj);
}
function JsonObject(obj) {
    try {
        if (typeof obj === 'string') return JSON.parse(obj);
    } catch (ex) {}

    return obj;
}
function generateNodePreview(node, options) {
    var { nodeCount, maxLength } = _extends(
        {
            nodeCount: 3,
            maxLength: 15
        },
        options
    );

    var isArray = Array.isArray(node);
    var objectNodes = Object.keys(node);
    var keys = objectNodes.slice(0, nodeCount);
    var preview = [isArray ? '[ ' : '{ '];
    preview.push(
        keys
            .reduce((allNodesPreview, key) => {
                var nodePreview = [];
                var nodeValue = node[key];
                var nodeType = getType(nodeValue);
                if (!isArray) nodePreview.push(key + ': ');
                if (nodeType === 'object') nodePreview.push('{ ... }');
                else if (nodeType === 'array') nodePreview.push('[ ... ]');
                else if (nodeType === 'string')
                    nodePreview.push(
                        '"' + nodeValue.substring(0, maxLength) + (nodeValue.length > maxLength ? '...' : '') + '"'
                    );
                else nodePreview.push(String(nodeValue));
                return allNodesPreview.concat(nodePreview.join(''));
            }, [])
            .join(', ')
    );
    if (objectNodes.length > nodeCount) preview.push(', ...');
    preview.push(isArray ? ' ]' : ' }');
    return preview.join('');
}

function _templateObject8() {
    var data = _taggedTemplateLiteralLoose([
        "\n            <style>\n                :host {\n                    --background-color: rgb(42, 47, 58);\n                    --color: #f8f8f2;\n                    --string-color: #a3eea0;\n                    --number-color: #d19a66;\n                    --boolean-color: #4ba7ef;\n                    --null-color: #df9cf3;\n                    --key-color: rgb(111, 179, 210);\n                    --collapsed-color: #fff;\n                    --collapsed-background: #66d9ef;\n                    --font-family: monaco, Consolas, 'Lucida Console', monospace;\n                    --preview-color: rgba(222, 175, 143, 0.9);\n\n                    display: block;\n                    background-color: var(--background-color);\n                    color: var(--color);\n                    padding: 0.5rem;\n                    font-family: var(--font-family);\n                    font-size: 1rem;\n                }\n\n                .preview {\n                    color: var(--preview-color);\n                }\n\n                .collapsed ul {\n                    display: none;\n                }\n\n                .null {\n                    color: var(--null-color, #df9cf3);\n                }\n\n                .key {\n                    color: var(--key-color, #f9857b);\n                    display: inline-block;\n                }\n\n                .collapsable:before {\n                    display: inline-block;\n                    color: var(--color);\n                    padding-right: 5px;\n                    padding-left: 5px;\n                    font-size: 0.7rem;\n                    content: '\u25B6';\n                    transition: transform 195ms ease-in;\n                    transform: rotate(90deg);\n                    color: var(--key-color);\n                }\n\n                .collapsable.collapsableCollapsed:before {\n                    transform: rotate(0);\n                }\n\n                .collapsable {\n                    cursor: pointer;\n                    user-select: none;\n                }\n\n                .string {\n                    color: var(--string-color);\n                }\n\n                .number {\n                    color: var(--number-color);\n                }\n\n                .boolean {\n                    color: var(--boolean-color);\n                }\n\n                .collapsed {\n                    font-size: 10px;\n                    background-color: var(--collapsed-background);\n                    color: var(--collapsed-color);\n                    padding: 0.3em;\n                    border-radius: 2px;\n                }\n\n                ul {\n                    padding: 0;\n                    clear: both;\n                }\n\n                ul,\n                li {\n                    list-style: none;\n                    position: relative;\n                }\n\n                li ul > li {\n                    position: relative;\n                    padding-top: 0.25rem;\n                    margin-left: 1.5rem;\n                    padding-left: 0px;\n                    white-space: nowrap;\n                }\n\n                ul:before {\n                    content: '';\n                    border-left: 1px solid #333;\n                    position: absolute;\n                    left: 0.5rem;\n                    top: 0.5rem;\n                    bottom: 0.5rem;\n                }\n\n                ul.hover:before {\n                    border-left: 1px solid #666;\n                }\n            </style>\n            <json-object-node data=",
        '></json-object-node>\n        '
    ]);

    _templateObject8 = function _templateObject8() {
        return data;
    };

    return data;
}

function _templateObject7() {
    var data = _taggedTemplateLiteralLoose([
        '\n                        <li>\n                            <json-nested-object-node key=',
        ' data=',
        '></json-nested-object-node>\n                        </li>\n                    '
    ]);

    _templateObject7 = function _templateObject7() {
        return data;
    };

    return data;
}

function _templateObject6() {
    var data = _taggedTemplateLiteralLoose(['\n            <ul>\n                ', '\n            </ul>\n        ']);

    _templateObject6 = function _templateObject6() {
        return data;
    };

    return data;
}

function _templateObject5() {
    var data = _taggedTemplateLiteralLoose(['\n            ', '\n            ', '\n        ']);

    _templateObject5 = function _templateObject5() {
        return data;
    };

    return data;
}

function _templateObject4() {
    var data = _taggedTemplateLiteralLoose([
        '\n                  <json-object-node data=',
        '></json-object-node>\n              '
    ]);

    _templateObject4 = function _templateObject4() {
        return data;
    };

    return data;
}

function _templateObject3() {
    var data = _taggedTemplateLiteralLoose([
        '\n                  <span class="preview">\n                      ',
        '\n                  </span>\n              '
    ]);

    _templateObject3 = function _templateObject3() {
        return data;
    };

    return data;
}

function _templateObject2() {
    var data = _taggedTemplateLiteralLoose(['\n            <span class=', '>', '</span>\n        ']);

    _templateObject2 = function _templateObject2() {
        return data;
    };

    return data;
}

function _templateObject() {
    var data = _taggedTemplateLiteralLoose([
        '\n    <span\n        class=',
        '\n        onClick=',
        '\n    >\n        ',
        ':\n    </span>\n'
    ]);

    _templateObject = function _templateObject() {
        return data;
    };

    return data;
}

var ObjectKey = _ref => {
    var { isCollapsable, collapsed, onClick, key } = _ref;
    return html(
        _templateObject(),
        cn([
            {
                key: key,
                collapsable: isCollapsable,
                collapsableCollapsed: collapsed
            }
        ]),
        onClick,
        key
    );
};

class JsonNestedObjectNode extends Element {
    constructor() {
        super(...arguments);
        this.data = null;
        this.collapsed = true;

        this.handleKeyClick = e => {
            e.preventDefault();
            this.collapsed = !this.collapsed;
        };
    }

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

    renderValue(node) {
        var type = getType(node);
        return html(_templateObject2(), type, JSON.stringify(node));
    }

    renderChild(node) {
        return this.collapsed ? html(_templateObject3(), generateNodePreview(node)) : html(_templateObject4(), node);
    }

    render() {
        var { data, key } = this;
        return html(
            _templateObject5(),
            ObjectKey({
                isCollapsable: !isPrimitive(data),
                collapsed: this.collapsed,
                key,
                onClick: !isPrimitive(data) && this.handleKeyClick
            }),
            isPrimitive(data) ? this.renderValue(data) : this.renderChild(data)
        );
    }
}

class JsonObjectNode extends Element {
    constructor() {
        super(...arguments);
        this.data = null;
        this.collapsed = true;
    }

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
        var { data } = this;
        return html(
            _templateObject6(),
            Object.keys(data).map(key => html(_templateObject7(), key, data[key]).withKey(key))
        );
    }
}

class JsonViewer extends Element {
    constructor() {
        super(...arguments);
        this.json = null;
        this.data = '';
    }

    static get is() {
        return 'json-viewer';
    }

    static get properties() {
        return {
            data: JsonObject
        };
    }

    connectedCallback() {
        var data = JSON.parse(this.innerText);
        this.attachShadow({
            mode: 'open'
        });
        this.data = data;
        super.connectedCallback();
    }

    render() {
        return html(_templateObject8(), this.data);
    }
}

customElements.define(JsonObjectNode.is, JsonObjectNode);
customElements.define(JsonNestedObjectNode.is, JsonNestedObjectNode);
customElements.define(JsonViewer.is, JsonViewer);
//# sourceMappingURL=index.js.map
