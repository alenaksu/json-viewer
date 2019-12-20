[![GitHub release](https://img.shields.io/github/v/release/alenaksu/json-viewer.svg)](https://github.com/alenaksu/json-viewer/releases)
[![npm](https://badgen.net/npm/v/@alenaksu/json-viewer)](https://www.npmjs.com/package/@alenaksu/json-viewer)
[![downloads](https://badgen.net/npm/dt/@alenaksu/json-viewer)](https://www.npmjs.com/package/@alenaksu/json-viewer)
[![Known Vulnerabilities](https://snyk.io/test/npm/@alenaksu/json-viewer/badge.svg)](https://snyk.io/test/npm/@alenaksu/json-viewer)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/alenaksu/json-viewer/master/LICENSE)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/alenaksu/json-viewer)

A Web Component to visualize JSON data in a tree view

---

## Installation

```sh
npm i @alenaksu/json-viewer
```

Then import the package to your project.

```js
import '@alenaksu/json-viewer';
```

---

## Usage

```html
<json-viewer></json-viewer>
```

**Attributes**

-   `data` - the string representation of JSON object to load

**Properties**

-   `data` - get/set the JSON object

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

### Load the JSON dinamically

```html
<json-viewer id="json"></json-viewer>

<script>
    document.querySelector('#json').data = { prop1: true, prop2: 'test' };
</script>
```

### Theming

The appereance of the component can be modified by changing the CSS variables

```css
json-viewver {
    /* Background, font and color */
    --background-color: #2a2f3a;
    --color: #f8f8f2;
    --font-family: monaco, Consolas, 'Lucida Console', monospace;

    /* Types colors */
    --string-color: #a3eea0;
    --number-color: #d19a66;
    --boolean-color: #4ba7ef;
    --null-color: #df9cf3;
    --property-color: #6fb3d2;

    /* Collapsed node preview */
    --preview-color: rgba(222, 175, 143, 0.9);
}
```

## Demo

The demo can also be run locally with

```sh
npm run start
```
