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
})({4:[function(require,module,exports) {
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/**
 * This shim allows elements written in, or compiled to, ES5 to work on native
 * implementations of Custom Elements.
 *
 * ES5-style classes don't work with native Custom Elements because the
 * HTMLElement constructor uses the value of `new.target` to look up the custom
 * element definition for the currently called constructor. `new.target` is only
 * set when `new` is called and is only propagated via super() calls. super()
 * is not emulatable in ES5. The pattern of `SuperClass.call(this)`` only works
 * when extending other ES5-style classes, and does not propagate `new.target`.
 *
 * This shim allows the native HTMLElement constructor to work by generating and
 * registering a stand-in class instead of the users custom element class. This
 * stand-in class's constructor has an actual call to super().
 * `customElements.define()` and `customElements.get()` are both overridden to
 * hide this stand-in class from users.
 *
 * In order to create instance of the user-defined class, rather than the stand
 * in, the stand-in's constructor swizzles its instances prototype and invokes
 * the user-defined constructor. When the user-defined constructor is called
 * directly it creates an instance of the stand-in class to get a real extension
 * of HTMLElement and returns that.
 *
 * There are two important constructors: A patched HTMLElement constructor, and
 * the StandInElement constructor. They both will be called to create an element
 * but which is called first depends on whether the browser creates the element
 * or the user-defined constructor is called directly. The variables
 * `browserConstruction` and `userConstruction` control the flow between the
 * two constructors.
 *
 * This shim should be better than forcing the polyfill because:
 *   1. It's smaller
 *   2. All reaction timings are the same as native (mostly synchronous)
 *   3. All reaction triggering DOM operations are automatically supported
 *
 * There are some restrictions and requirements on ES5 constructors:
 *   1. All constructors in a inheritance hierarchy must be ES5-style, so that
 *      they can be called with Function.call(). This effectively means that the
 *      whole application must be compiled to ES5.
 *   2. Constructors must return the value of the emulated super() call. Like
 *      `return SuperClass.call(this)`
 *   3. The `this` reference should not be used before the emulated super() call
 *      just like `this` is illegal to use before super() in ES6.
 *   4. Constructors should not create other custom elements before the emulated
 *      super() call. This is the same restriction as with native custom
 *      elements.
 *
 *  Compiling valid class-based custom elements to ES5 will satisfy these
 *  requirements with the latest version of popular transpilers.
 */
(() => {
  'use strict';

  // Do nothing if `customElements` does not exist.
  if (!window.customElements) return;

  const NativeHTMLElement = window.HTMLElement;
  const nativeDefine = window.customElements.define;
  const nativeGet = window.customElements.get;

  /**
   * Map of user-provided constructors to tag names.
   *
   * @type {Map<Function, string>}
   */
  const tagnameByConstructor = new Map();

  /**
   * Map of tag names to user-provided constructors.
   *
   * @type {Map<string, Function>}
   */
  const constructorByTagname = new Map();


  /**
   * Whether the constructors are being called by a browser process, ie parsing
   * or createElement.
   */
  let browserConstruction = false;

  /**
   * Whether the constructors are being called by a user-space process, ie
   * calling an element constructor.
   */
  let userConstruction = false;

  window.HTMLElement = function() {
    if (!browserConstruction) {
      const tagname = tagnameByConstructor.get(this.constructor);
      const fakeClass = nativeGet.call(window.customElements, tagname);

      // Make sure that the fake constructor doesn't call back to this constructor
      userConstruction = true;
      const instance = new (fakeClass)();
      return instance;
    }
    // Else do nothing. This will be reached by ES5-style classes doing
    // HTMLElement.call() during initialization
    browserConstruction = false;
  };
  // By setting the patched HTMLElement's prototype property to the native
  // HTMLElement's prototype we make sure that:
  //     document.createElement('a') instanceof HTMLElement
  // works because instanceof uses HTMLElement.prototype, which is on the
  // ptototype chain of built-in elements.
  window.HTMLElement.prototype = NativeHTMLElement.prototype;

  const define = (tagname, elementClass) => {
    const elementProto = elementClass.prototype;
    const StandInElement = class extends NativeHTMLElement {
      constructor() {
        // Call the native HTMLElement constructor, this gives us the
        // under-construction instance as `this`:
        super();

        // The prototype will be wrong up because the browser used our fake
        // class, so fix it:
        Object.setPrototypeOf(this, elementProto);

        if (!userConstruction) {
          // Make sure that user-defined constructor bottom's out to a do-nothing
          // HTMLElement() call
          browserConstruction = true;
          // Call the user-defined constructor on our instance:
          elementClass.call(this);
        }
        userConstruction = false;
      }
    };
    const standInProto = StandInElement.prototype;
    StandInElement.observedAttributes = elementClass.observedAttributes;
    standInProto.connectedCallback = elementProto.connectedCallback;
    standInProto.disconnectedCallback = elementProto.disconnectedCallback;
    standInProto.attributeChangedCallback = elementProto.attributeChangedCallback;
    standInProto.adoptedCallback = elementProto.adoptedCallback;

    tagnameByConstructor.set(elementClass, tagname);
    constructorByTagname.set(tagname, elementClass);
    nativeDefine.call(window.customElements, tagname, StandInElement);
  };

  const get = (tagname) => constructorByTagname.get(tagname);

  // Workaround for Safari bug where patching customElements can be lost, likely
  // due to native wrapper garbage collection issue
  Object.defineProperty(window, 'customElements',
    {value: window.customElements, configurable: true, writable: true});
  Object.defineProperty(window.customElements, 'define',
    {value: define, configurable: true, writable: true});
  Object.defineProperty(window.customElements, 'get',
    {value: get, configurable: true, writable: true});

})();

},{}],19:[function(require,module,exports) {

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
},{}]},{},[19,4])
//# sourceMappingURL=/native-shim.aba3d167.map