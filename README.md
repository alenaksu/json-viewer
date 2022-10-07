[![GitHub release](https://img.shields.io/github/v/release/alenaksu/json-viewer.svg)](https://github.com/alenaksu/json-viewer/releases)
[![npm](https://badgen.net/npm/v/@alenaksu/json-viewer)](https://www.npmjs.com/package/@alenaksu/json-viewer)
[![downloads](https://badgen.net/npm/dt/@alenaksu/json-viewer)](https://www.npmjs.com/package/@alenaksu/json-viewer)
[![Known Vulnerabilities](https://snyk.io/test/npm/@alenaksu/json-viewer/badge.svg)](https://snyk.io/test/npm/@alenaksu/json-viewer)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/alenaksu/json-viewer/master/LICENSE)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@alenaksu/json-viewer)

A Web Component to visualize JSON data in a tree view

---

-   [Installation](#installation)
    -   [From CDN](#from-cdn)
    -   [From NPM](#from-npm)
-   [Usage](#usage)
    -   [Attributes](#attributes)
    -   [Properties](#properties)
    -   [Methods](#methods)
    -   [CSS Parts](#css-parts)
    -   [CSS custom properties](#css-custom-properties)
    -   [Basic Usage](#basic-usage)
    -   [Load the JSON dynamically](#load-the-json-dynamically)
    -   [Basic interactions](#basic-interactions)
-   [Demo](#demo)

## Installation

### From CDN

The package contains a bundled version of the component which includes also the Lit library. It can be useful in case you want to import the package using a CDN.

```html
<script src="https://unpkg.com/@alenaksu/json-viewer@2.0.0/dist/json-viewer.bundle.js"></script>
```

### From NPM

Install the component through NPM:

```sh
npm i @alenaksu/json-viewer
```


Import the package to your project, this way the component will be automatically defined in the custom elements registry with its default tag name `json-viewer`.

```js
import '@alenaksu/json-viewer';
```

If you want to extend the component or if you just need to use it in scoped registries with a different tag name, then you can import the component class from the package:

```js
import { JsonViewer } '@alenaksu/json-viewer/dist/JsonViewer.js';

class MyJsonViewer extends JsonViewer {
    ...
}

customElements.define('my-json-viewer', MyJsonViewer);
```

---

## Usage

```html
<json-viewer></json-viewer>
```

### Attributes

-   `data` - the string representation of JSON object to load

### Properties

-   `data` - get/set the JSON object

### Methods

-   `filter (regexOrPath: RegExp|string) => void` | Maintains only the nodes that match the given criteria
-   `resetFilter () => void` | Clear the filter
-   `expand (regexOrPath: RegExp|string) => void` | Expand all the nodes that match the given criteria
-   `expandAll () => void` | Alias for `expand('**')`
-   `collapse (regexOrPath: RegExp|string) => void` | Collapse all the nodes that match the given criteria
-   `collapseAll () => void` | Alias for `collapse('**')`
-   `search (regexOrPath: RegExp|string) => Iterator` | Return and iterator with which is possible to go through all the matched nodes. It scrolls the page to the node and highlights it.

### CSS Parts

-   `object` - The object wrapper element.
-   `property` - The wrapper element of a property.
-   `key` - The key element of a property.
-   `primitive` - The primitive value.
-   `primitive--string` - Applied when the primitive is a string.
-   `primitive--number` - Applied when the primitive is a number.
-   `primitive--boolean` - Applied when the primitive is a boolean.
-   `primitive--null` - Applied when the primitive is a null.
-   `preview` - The value preview of a property.
-   `highlight` - The highlighted value.

### CSS custom properties

The appearance of the component can be modified by changing the CSS custom properties

```css
json-viewer {
    /* Background, font and indentation */
    --background-color: #2a2f3a;
    --color: #f8f8f2;
    --font-family: monaco, Consolas, 'Lucida Console', monospace;
    --font-size: 1rem;
    --indent-size: 1.5em;
    --indentguide-size: 1px;
    --indentguide-style: solid;
    --indentguide-color: #333;
    --indentguide-color-active: #666;
    --indentguide: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color);
    --indentguide-active: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color-active);

    /* Types colors */
    --string-color: #a3eea0;
    --number-color: #d19a66;
    --boolean-color: #4ba7ef;
    --null-color: #df9cf3;
    --property-color: #6fb3d2;

    /* Collapsed node preview */
    --preview-color: rgba(222, 175, 143, 0.9);

    /* Search highlight color */
    --highlight-color: #6fb3d2;
}
```

### Basic Usage

Put the JSON inside the element

```html
<json-viewer>
    { "quiz": { "sport": { "q1": { "question": "Which one is correct team name in NBA?", "options": [ "New York Bulls",
    "Los Angeles Kings", "Golden State Warriros", "Huston Rocket" ], "answer": "Huston Rocket" } }, "maths": { "q1": {
    "question": "5 + 7 = ?", "options": [ "10", "11", "12", "13" ], "answer": "12" }, "q2": { "question": "12 - 8 = ?",
    "options": [ "1", "2", "3", "4" ], "answer": "4" } } } }
</json-viewer>
```

### Load the JSON dynamically

```html
<json-viewer id="json"></json-viewer>

<script>
    document.querySelector('#json').data = { prop1: true, prop2: 'test' };
</script>
```

### Basic interactions

```js
const viewer = document.querySelector('#json');

// Expand/collapse/filter
viewer.expand('**.name');
viewer.collapse(/name/);
viewer.filter('test.*.name');

// Search
const searchIterator = viewer.search('value');
// Scrolls to the node and highlight the value
searchIterator.next();
```

## Demo

The demo can also be run locally with

```sh
npm run start
```
