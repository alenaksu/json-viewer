// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UTILS
 */
var parseTemplate = (function () {
    var templateCache = new Map();
    var range = document.createRange();
    return function (html) {
        if (!templateCache.has(html)) {
            templateCache.set(html, range.createContextualFragment(html));
        }
        return templateCache.get(html).cloneNode(true);
    };
})();
function typeCheck(obj, types) {
    return types.some(function (type) { return obj instanceof type; });
}
function replaceContent(content, node) {
    insertBefore(node, content[0]);
    removeNodes(content);
    return node;
}
function removeNodes(nodes) {
    nodes.forEach(function (node) {
        if (node.parentNode !== null)
            node.parentNode.removeChild(node);
    });
}
function treeWalkerFilter(node) {
    return node.__skip ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
}
// fix(IE11): expect filter to be a function and not an object
treeWalkerFilter.acceptNode = treeWalkerFilter;
function createTreeWalker(root) {
    return document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, treeWalkerFilter, false);
}
function insertBefore(node, before) {
    before.parentNode.insertBefore(node, before);
}
function isTemplateEqual(t1, t2) {
    return (t1.constructor === t2.constructor &&
        ((!t1.strings && !t2.strings) ||
            (t1.strings.length &&
                t2.strings.length &&
                t1.strings.every(function (s, i) { return t2.strings[i] === s; }))));
}
function markerNumber(marker) {
    return Number(marker.replace(/\D+/g, ''));
}
function textNode(text) {
    if (text === void 0) { text = ''; }
    return document.createTextNode(text);
}
function isNode(obj) {
    return typeCheck(obj, [Element, DocumentFragment, Text]);
}
function isTemplate(obj) {
    return typeCheck(obj, [Template, TemplateCollection]);
}
function createElement(strings, values) {
    var expressionsMap = new Map();
    var html = values.reduce(function (html, value, i) {
        var marker = "{{__" + i + "__}}";
        expressionsMap.set(marker, value);
        html += marker + strings[i + 1];
        return html;
    }, strings[0]);
    var fragment = parseTemplate(html);
    var expressions = linkExpressions(fragment, expressionsMap);
    return {
        fragment: fragment,
        expressions: expressions,
    };
}
function attributesToExpressions(node, expressions, linkedExpressions) {
    [].forEach.call(node.attributes, function (attr) {
        if (expressions.has(attr.value)) {
            linkedExpressions[markerNumber(attr.value)] = new AttributeExpression(node, attr.name);
        }
    });
}
function textsToExpressions(node, linkedExpressions) {
    var keys = node.data.match(/{{__\d+__}}/g) || [];
    keys.map(function (key) {
        var keyNode = textNode(key);
        keyNode.__skip = true;
        node = node.splitText(node.data.indexOf(key));
        node.deleteData(0, key.length);
        insertBefore(keyNode, node);
        linkedExpressions[markerNumber(key)] = new ElementExpression(keyNode);
    });
}
function linkExpressions(root, expressions) {
    var treeWalker = createTreeWalker(root);
    var linkedExpressions = Array(expressions.size);
    while (treeWalker.nextNode()) {
        var node = treeWalker.currentNode;
        if (node.nodeType === Node.TEXT_NODE) {
            textsToExpressions(node, linkedExpressions);
        }
        else if (node.nodeType === Node.ELEMENT_NODE) {
            attributesToExpressions(node, expressions, linkedExpressions);
        }
    }
    return linkedExpressions;
}
var Template = /** @class */ (function () {
    function Template(strings, values) {
        this.content = [];
        this.expressions = [];
        this.key = undefined;
        this.values = values;
        this.strings = strings;
    }
    Template.prototype.withKey = function (key) {
        this.key = key;
        return this;
    };
    Template.prototype.update = function (values, force) {
        for (var i = 0; i < values.length; i++) {
            if (this.expressions[i] !== undefined)
                this.expressions[i].update(values[i], force);
        }
    };
    Template.prototype.create = function () {
        var _a = createElement(this.strings, this.values), fragment = _a.fragment, expressions = _a.expressions;
        this.expressions = expressions;
        this.update(this.values, true);
        this.content = [].slice.call(fragment.childNodes);
        return fragment;
    };
    return Template;
}());
exports.Template = Template;
function moveTemplate(template, node) {
    var currentNode = node;
    template.content.forEach(function (node) {
        currentNode.parentNode.insertBefore(node, currentNode.nextSibling);
        currentNode = node;
    });
}
var TemplateCollection = /** @class */ (function () {
    function TemplateCollection(values) {
        this.values = values;
        this.templates = new Map();
    }
    TemplateCollection.prototype._flushTemplates = function (keys) {
        var templates = this.templates;
        templates.forEach(function (template, key, map) {
            if (keys.indexOf(key) === -1) {
                removeNodes(template.content);
                map.delete(key);
            }
        });
    };
    Object.defineProperty(TemplateCollection.prototype, "content", {
        get: function () {
            var _a = this, templates = _a.templates, rootNode = _a.rootNode;
            var nodes = [rootNode];
            templates.forEach(function (template) {
                return nodes.push.apply(nodes, template.content);
            });
            return nodes;
        },
        enumerable: true,
        configurable: true
    });
    TemplateCollection.prototype.update = function (items) {
        var _a = this, rootNode = _a.rootNode, templates = _a.templates;
        var currentNode = rootNode;
        var keys = items.reduce(function (keys, item, i) {
            var key = String(item.key || i);
            var template = templates.get(key);
            if (!template) {
                var node = item.create();
                currentNode.nextSibling
                    ? insertBefore(node, currentNode.nextSibling)
                    : currentNode.parentNode.appendChild(node);
                templates.set(key, item);
                template = item;
            }
            else if (!isTemplateEqual(template, item)) {
                replaceContent(template.content, item.create());
                templates.set(key, item);
                template = item;
            }
            else {
                template.update(item.values);
            }
            if (currentNode.nextSibling !== template.content[0]) {
                moveTemplate(template, currentNode);
            }
            currentNode = template.content[template.content.length - 1];
            keys.push(key);
            return keys;
        }, []);
        this._flushTemplates(keys);
    };
    TemplateCollection.prototype.create = function () {
        var fragment = document.createDocumentFragment();
        this.rootNode = textNode();
        fragment.appendChild(this.rootNode);
        this.update(this.values);
        return fragment;
    };
    return TemplateCollection;
}());
exports.TemplateCollection = TemplateCollection;
var AttributeExpression = /** @class */ (function () {
    function AttributeExpression(element, name) {
        this.name = name;
        this.element = element;
    }
    AttributeExpression.prototype.update = function (value, force) {
        var _a = this, name = _a.name, element = _a.element, currentValue = _a.value;
        if (!force && currentValue === value) {
            return;
        }
        if (typeof value === 'string') {
            element.setAttribute(name, value);
        }
        else {
            element.hasAttribute(name) && element.removeAttribute(name);
        }
        if (value !== undefined || element[name] !== '') {
            element[name] = value;
        }
        // ???
        currentValue !== undefined &&
            element.propertyChangedCallback &&
            element.propertyChangedCallback(name, currentValue, value);
        this.value = value;
    };
    return AttributeExpression;
}());
var ElementExpression = /** @class */ (function () {
    function ElementExpression(element) {
        this.element = element;
        this.value = undefined;
    }
    ElementExpression.prototype.update = function (value, force) {
        var element = this.element;
        if (value === undefined || value === null) {
            value = textNode();
        }
        else if (!force && value === this.value) {
            return;
        }
        if (isTemplate(element) &&
            isTemplate(value) &&
            isTemplateEqual(element, value)) {
            element.update(value.values);
        }
        else if (isNode(value) || isTemplate(value)) {
            replaceContent(isTemplate(element)
                ? element.content
                : [element], isTemplate(value) ? value.create() : value);
            this.element = value;
        }
        else {
            element.nodeValue = value;
        }
        this.value = value;
    };
    return ElementExpression;
}());
function collection(items, callback) {
    return new TemplateCollection(items.map(callback));
}
exports.collection = collection;
function render(template, container) {
    if (!container.__template) {
        container.__template = template;
        container.appendChild(template.create());
    }
    else {
        container.__template.update(template.values);
    }
}
exports.render = render;
function html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return new Template(strings, values);
}
exports.html = html;

},{}],17:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestIdleCallback = window.requestIdleCallback ||
    function (handler, options) {
        if (options === void 0) { options = {}; }
        var start = Date.now();
        return setTimeout(function () {
            return handler({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, (options.timeout || 50) - (Date.now() - start));
                },
            });
        }, 1);
    };
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        var _this = this;
        this.tasks = [];
        this.running = false;
        this.process = function (deadline) {
            var tasks = _this.tasks;
            while ((deadline.timeRemaining() > 0 || deadline.didTimeout) &&
                tasks.length > 0) {
                var fn = tasks.shift();
                fn();
                fn._scheduled = false;
            }
            if (tasks.length > 0) {
                _this.start();
            }
            else {
                _this.running = false;
            }
        };
    }
    Scheduler.prototype.start = function () {
        requestIdleCallback(this.process, {
            timeout: 100,
        });
        this.running = true;
    };
    Scheduler.prototype.defer = function (fn) {
        var _this = this;
        return function () {
            if (fn._scheduled === undefined) {
                // Force first rendering
                fn._scheduled = false;
                fn();
            }
            else if (!fn._scheduled) {
                _this.tasks.push(fn);
                fn._scheduled = true;
                fn._priority = 0;
            }
            else {
                fn._priority++;
                _this.tasks.sort(function (a, b) { return b._priority - a._priority; });
            }
            if (_this.tasks.length && !_this.running) {
                _this.start();
            }
        };
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
exports.default = new Scheduler();

},{}],14:[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tiny_lit_1 = require("./tiny-lit");
var Scheduler_1 = require("./Scheduler");
function withElement(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.state = {};
            _this.render = _this.scheduler.defer(_this.render.bind(_this));
            _this._children = [].slice.call(_this.childNodes);
            return _this;
        }
        Object.defineProperty(class_1.prototype, "scheduler", {
            get: function () {
                return Scheduler_1.default;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "slot", {
            get: function () {
                return tiny_lit_1.collection(this._children, function (node) { return tiny_lit_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), node); });
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.connectedCallback = function () {
            this.render();
        };
        class_1.prototype.setState = function (nextState) {
            var state = this.state;
            this.state = __assign({}, state, (typeof nextState === 'function'
                ? nextState(state, this)
                : nextState));
            this.render();
        };
        class_1.prototype.getTemplate = function () {
            throw 'Method not implemented';
        };
        class_1.prototype.render = function () {
            tiny_lit_1.render(this.getTemplate(), this);
        };
        return class_1;
    }(Base));
}
exports.withElement = withElement;
exports.Element = withElement(HTMLElement);
var templateObject_1;

},{"./tiny-lit":13,"./Scheduler":17}],10:[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tiny_lit_1 = require("./tiny-lit");
exports.render = tiny_lit_1.render;
exports.html = tiny_lit_1.html;
exports.collection = tiny_lit_1.collection;
var Element_1 = require("./Element");
exports.Element = Element_1.Element;
exports.withElement = Element_1.withElement;

},{"./tiny-lit":13,"./Element":14}],3:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(['<span class="bracket">{</span>\n            <ul>\n                ', '\n            </ul>\n            <span class="bracket">}</span>'], ['<span class="bracket">{</span>\n            <ul>\n                ', '\n            </ul>\n            <span class="bracket">}</span>']),
    _templateObject2 = _taggedTemplateLiteral(['\n                    <li>\n                        <span \n                            class="key" \n                            onClick=', '>\n                            "', '"\n                        </span>:\n                        ', '\n                    </li>'], ['\n                    <li>\n                        <span \n                            class="key" \n                            onClick=', '>\n                            "', '"\n                        </span>:\n                        ', '\n                    </li>']),
    _templateObject3 = _taggedTemplateLiteral(['<span class="collapsed">...</span>'], ['<span class="collapsed">...</span>']),
    _templateObject4 = _taggedTemplateLiteral(['', '', ''], ['', '', '']),
    _templateObject5 = _taggedTemplateLiteral(['<span class="string">"', '"</span>'], ['<span class="string">"', '"</span>']),
    _templateObject6 = _taggedTemplateLiteral(['<span class="number">', '</span>'], ['<span class="number">', '</span>']),
    _templateObject7 = _taggedTemplateLiteral(['<span class="boolean">', '</span>'], ['<span class="boolean">', '</span>']),
    _templateObject8 = _taggedTemplateLiteral(['<span class="bracket">[</span>\n                <ul>\n                    <li>\n                    ', '\n                    </li>\n                </ul>\n                <span class="bracket">]</span>'], ['<span class="bracket">[</span>\n                <ul>\n                    <li>\n                    ', '\n                    </li>\n                </ul>\n                <span class="bracket">]</span>']),
    _templateObject9 = _taggedTemplateLiteral([', '], [', ']),
    _templateObject10 = _taggedTemplateLiteral(['<json-object-node json=', '></json-object-node>'], ['<json-object-node json=', '></json-object-node>']),
    _templateObject11 = _taggedTemplateLiteral(['\n            <ul>\n                <li>\n                    ', '\n                </li>\n            </ul>\n        '], ['\n            <ul>\n                <li>\n                    ', '\n                </li>\n            </ul>\n        ']);

var _es = require('tiny-lit/lib/es5/');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getType(obj) {
    return obj === null ? 'null' : Array.isArray(obj) ? 'array' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
}

var ObjectNode = function (_Element) {
    _inherits(ObjectNode, _Element);

    function ObjectNode() {
        _classCallCheck(this, ObjectNode);

        return _possibleConstructorReturn(this, (ObjectNode.__proto__ || Object.getPrototypeOf(ObjectNode)).apply(this, arguments));
    }

    _createClass(ObjectNode, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.setState({
                collapsed: false,
                json: this.json
            });
        }
    }, {
        key: 'getTemplate',
        value: function getTemplate() {
            var _this2 = this;

            var json = this.state.json;


            return (0, _es.html)(_templateObject, (0, _es.collection)(Object.keys(json), function (key, index) {
                return (0, _es.html)(_templateObject2, function () {
                    return _this2.setState(_defineProperty({}, key, !_this2.state[key]));
                }, key, _this2.state[key] ? (0, _es.html)(_templateObject3) : (0, _es.html)(_templateObject4, renderNode(json[key]), index < Object.keys(json).length - 1 ? ', ' : null));
            }));
        }
    }], [{
        key: 'define',
        value: function define() {
            customElements.define(ObjectNode.is, ObjectNode);
        }
    }, {
        key: 'is',
        get: function get() {
            return 'json-object-node';
        }
    }]);

    return ObjectNode;
}(_es.Element);

ObjectNode.define();

function renderNode(node) {
    switch (getType(node)) {
        case 'null':
            return 'null';
        case 'string':
            return (0, _es.html)(_templateObject5, node);
        case 'number':
            return (0, _es.html)(_templateObject6, node);
        case 'boolean':
            return (0, _es.html)(_templateObject7, node);
        case 'array':
            return (0, _es.html)(_templateObject8, (0, _es.collection)(node, function (n, index) {
                return (0, _es.html)(_templateObject4, renderNode(n), index < node.length - 1 ? (0, _es.html)(_templateObject9) : null);
            }));
        case 'object':
            return (0, _es.html)(_templateObject10, node);
    }
}

var JsonViewer = function (_Element2) {
    _inherits(JsonViewer, _Element2);

    function JsonViewer() {
        var _ref;

        var _temp, _this3, _ret;

        _classCallCheck(this, JsonViewer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = JsonViewer.__proto__ || Object.getPrototypeOf(JsonViewer)).call.apply(_ref, [this].concat(args))), _this3), _this3.state = {
            json: { "web-app": {
                    "servlet": [{
                        "test": null,
                        "servlet-name": "cofaxCDS",
                        "servlet-class": "org.cofax.cds.CDSServlet",
                        "init-param": {
                            "configGlossary:installationAt": "Philadelphia, PA",
                            "configGlossary:adminEmail": "ksm@pobox.com",
                            "configGlossary:poweredBy": "Cofax",
                            "configGlossary:poweredByIcon": "/images/cofax.gif",
                            "configGlossary:staticPath": "/content/static",
                            "templateProcessorClass": "org.cofax.WysiwygTemplate",
                            "templateLoaderClass": "org.cofax.FilesTemplateLoader",
                            "templatePath": "templates",
                            "templateOverridePath": "",
                            "defaultListTemplate": "listTemplate.htm",
                            "defaultFileTemplate": "articleTemplate.htm",
                            "useJSP": false,
                            "jspListTemplate": "listTemplate.jsp",
                            "jspFileTemplate": "articleTemplate.jsp",
                            "cachePackageTagsTrack": 200,
                            "cachePackageTagsStore": 200,
                            "cachePackageTagsRefresh": 60,
                            "cacheTemplatesTrack": 100,
                            "cacheTemplatesStore": 50,
                            "cacheTemplatesRefresh": 15,
                            "cachePagesTrack": 200,
                            "cachePagesStore": 100,
                            "cachePagesRefresh": 10,
                            "cachePagesDirtyRead": 10,
                            "searchEngineListTemplate": "forSearchEnginesList.htm",
                            "searchEngineFileTemplate": "forSearchEngines.htm",
                            "searchEngineRobotsDb": "WEB-INF/robots.db",
                            "useDataStore": true,
                            "dataStoreClass": "org.cofax.SqlDataStore",
                            "redirectionClass": "org.cofax.SqlRedirection",
                            "dataStoreName": "cofax",
                            "dataStoreDriver": "com.microsoft.jdbc.sqlserver.SQLServerDriver",
                            "dataStoreUrl": "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",
                            "dataStoreUser": "sa",
                            "dataStorePassword": "dataStoreTestQuery",
                            "dataStoreTestQuery": "SET NOCOUNT ON;select test='test';",
                            "dataStoreLogFile": "/usr/local/tomcat/logs/datastore.log",
                            "dataStoreInitConns": 10,
                            "dataStoreMaxConns": 100,
                            "dataStoreConnUsageLimit": 100,
                            "dataStoreLogLevel": "debug",
                            "maxUrlLength": 500 } }, {
                        "servlet-name": "cofaxEmail",
                        "servlet-class": "org.cofax.cds.EmailServlet",
                        "init-param": {
                            "mailHost": "mail1",
                            "mailHostOverride": "mail2" } }, {
                        "servlet-name": "cofaxAdmin",
                        "servlet-class": "org.cofax.cds.AdminServlet" }, {
                        "servlet-name": "fileServlet",
                        "servlet-class": "org.cofax.cds.FileServlet" }, {
                        "servlet-name": "cofaxTools",
                        "servlet-class": "org.cofax.cms.CofaxToolsServlet",
                        "init-param": {
                            "templatePath": "toolstemplates/",
                            "log": 1,
                            "logLocation": "/usr/local/tomcat/logs/CofaxTools.log",
                            "logMaxSize": "",
                            "dataLog": 1,
                            "dataLogLocation": "/usr/local/tomcat/logs/dataLog.log",
                            "dataLogMaxSize": "",
                            "removePageCache": "/content/admin/remove?cache=pages&id=",
                            "removeTemplateCache": "/content/admin/remove?cache=templates&id=",
                            "fileTransferFolder": "/usr/local/tomcat/webapps/content/fileTransferFolder",
                            "lookInContext": 1,
                            "adminGroupID": 4,
                            "betaServer": true } }],
                    "servlet-mapping": {
                        "cofaxCDS": "/",
                        "cofaxEmail": "/cofaxutil/aemail/*",
                        "cofaxAdmin": "/admin/*",
                        "fileServlet": "/static/*",
                        "cofaxTools": "/tools/*" },

                    "taglib": {
                        "taglib-uri": "cofax.tld",
                        "taglib-location": "/WEB-INF/tlds/cofax.tld" } } }
        }, _temp), _possibleConstructorReturn(_this3, _ret);
    }

    _createClass(JsonViewer, [{
        key: 'getTemplate',
        value: function getTemplate() {
            return (0, _es.html)(_templateObject11, renderNode(this.state.json));
        }
    }], [{
        key: 'is',
        get: function get() {
            return 'json-viewer';
        }
    }]);

    return JsonViewer;
}(_es.Element);

customElements.define(JsonViewer.is, JsonViewer);
},{"tiny-lit/lib/es5/":10}],19:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '45829' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[19,3])
//# sourceMappingURL=/src.9f0ce8df.map