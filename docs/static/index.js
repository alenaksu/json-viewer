let _ = t => t,
    _t,
    _t2,
    _t3,
    _t4,
    _t5,
    _t6,
    _t7;

function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function () { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function (O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function (F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function (receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function (elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function (element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function (element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function (elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function (element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function (elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function (elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function (elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function (elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function (obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function (constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function (obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { html, LitElement } from '../_snowpack/pkg/lit.js';
import { property, customElement } from '../_snowpack/pkg/lit/decorators.js';
import { getType, isPrimitiveOrNode, JsonObject, generateNodePreview, isNode, classNames, deepTraverse } from './utils.js';
import { toggleNode, expand as _expand, filter as _filter, highlight } from './stateChange.js';
import _styles from './styles.js';

let JsonViewer = _decorate([customElement('json-viewer')], function (_initialize, _LitElement) {
  class JsonViewer extends _LitElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: JsonViewer,
    d: [{
      kind: "field",
      decorators: [property({
        converter: JsonObject,
        type: Object
      })],
      key: "data",

      value() {
        return null;
      }

    }, {
      kind: "field",
      decorators: [property({
        state: true
      })],
      key: "state",

      value() {
        return {
          expanded: {},
          filtered: {},
          highlight: null
        };
      }

    }, {
      kind: "get",
      static: true,
      key: "styles",
      value: function styles() {
        return [_styles];
      }
    }, {
      kind: "get",
      static: true,
      key: "is",
      value: function is() {
        return 'json-viewer';
      }
      /**
       * @deprecate
       */

    }, {
      kind: "method",
      key: "setState",
      value: async function setState(fn, callback) {
        this.state = { ...this.state,
          ...(typeof fn === 'function' ? fn(this.state, this) : fn)
        };
        this.updateComplete.then(callback);
      }
    }, {
      kind: "field",
      key: "handlePropertyClick",

      value() {
        return path => e => {
          e.preventDefault();
          this.setState(toggleNode(path));
        };
      }

    }, {
      kind: "method",
      key: "expand",
      value: function expand(glob, callback) {
        this.setState(_expand(glob, true), callback);
      }
    }, {
      kind: "method",
      key: "expandAll",
      value: function expandAll() {
        this.setState(_expand('**', true));
      }
    }, {
      kind: "method",
      key: "collapseAll",
      value: function collapseAll() {
        this.setState(_expand('**', false));
      }
    }, {
      kind: "method",
      key: "collapse",
      value: function collapse(glob) {
        this.setState(_expand(glob, false));
      }
    }, {
      kind: "method",
      key: "search",
      value: function* search(criteria) {
        for (const [node, path, parents] of deepTraverse(this.data)) {
          if (isPrimitiveOrNode(node) && String(node).includes(criteria)) {
            this.expand(path, () => {
              const node = this.renderRoot.querySelector(`[data-path="${path}"]`);
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
    }, {
      kind: "method",
      key: "filter",
      value: function filter(filterString) {
        this.setState(_filter(filterString));
      }
    }, {
      kind: "method",
      key: "resetFilter",
      value: function resetFilter() {
        this.setState({
          filtered: {}
        });
      }
    }, {
      kind: "method",
      key: "renderObject",
      value: function renderObject(node, path) {
        return html(_t || (_t = _`
            <ul>
                ${0}
            </ul>
        `), Object.keys(node).map(key => {
          const nodeData = node[key];
          const nodePath = path ? `${path}.${key}` : key;
          const isPrimitive = isPrimitiveOrNode(nodeData);
          const expanded = this.state.expanded[nodePath] || isPrimitive;
          return html(_t2 || (_t2 = _`
                        <li data-path=${0} .hidden=${0}>
                            ${0}
                            ${0}
                        </li>
                    `), nodePath, this.state.filtered[nodePath], this.renderPropertyKey({
            isCollapsable: !isPrimitive,
            collapsed: !this.state.expanded[nodePath],
            key,
            onClick: this.handlePropertyClick(nodePath)
          }), expanded ? this.renderNode(nodeData, nodePath) : this.renderNodePreview(nodeData));
        }));
      }
    }, {
      kind: "method",
      key: "renderNode",
      value: function renderNode(node, path = '') {
        return isPrimitiveOrNode(node) ? this.renderValue(node, path) : this.renderObject(node, path);
      }
    }, {
      kind: "method",
      key: "renderNodePreview",
      value: function renderNodePreview(node) {
        return html(_t3 || (_t3 = _` <span class="preview"> ${0} </span> `), generateNodePreview(node));
      }
    }, {
      kind: "method",
      key: "renderPropertyKey",
      value: function renderPropertyKey({
        isCollapsable,
        collapsed,
        onClick,
        key
      }) {
        return html(_t4 || (_t4 = _`
            <span
                class=${0}
                @click=${0}
            >
                ${0}:
            </span>
        `), classNames(key && 'key', isCollapsable && 'collapsable', collapsed && 'collapsableCollapsed'), isCollapsable ? onClick : null, key);
      }
    }, {
      kind: "method",
      key: "renderValue",
      value: function renderValue(node, path) {
        const highlight = this.state.highlight;
        const value = isNode(node) ? node : html(_t5 || (_t5 = _` <span tabindex="0" class=${0}>${0}</span> `), getType(node), JSON.stringify(node));
        return highlight !== null && path === highlight ? html(_t6 || (_t6 = _`<mark>${0}</mark>`), value) : value;
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return html(_t7 || (_t7 = _` ${0} `), this.renderNode(this.data));
      }
    }]
  };
}, LitElement);