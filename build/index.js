function e(e=""){return document.createTextNode(e)}function t(e,t){const[r,o]=[].concat(t);r.parentNode&&(o&&r.nextSibling!==o&&n(r.nextSibling,o),r.parentNode.replaceChild(e,r))}function n(e,t=null,n=e.parentNode){if(n)for(;e!==t;){const t=e.nextSibling;n.removeChild(e),e=t}}function r(e){let t=0;for(;e=e.previousSibling;)t++;return t}function o(e){const t=[];for(;e.parentNode;)t.unshift(r(e)),e=e.parentNode;return t}const s=Symbol();function a(e,t){return i(e)&&i(t)&&e.strings===t.strings}function i(e){return e&&e[s]}const l=/__(\d+)__/,c=/^(?:style|textarea)$/i;function u(e){const t=e.match(l);return Number(t?t[1]:-1)}const d={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};const p=[],h=[];let f=!1,g=0,b=!0;function m(e,t){let n=0;for(;t-performance.now()>0&&n<e.length;){const t=e[n++];t.task(...t.args),t.args=void 0,t.pending=!1}e.splice(0,n)}function y(e,t){e.pending=!0,1===t?p.push(e):0===t&&h.push(e),f||function e(){f=!0,requestAnimationFrame(()=>{g++;const t=performance.now()+10*Math.ceil(.02*g);m(p,t),m(h,t),p.length>0&&(h.push(...p),p.length=0),h.length>0?e():(f=!1,g=0)})}()}function v(e,t=1){const n={task:e,args:[],pending:!1,firstRun:!0};return(...r)=>{n.firstRun||!b?(n.firstRun=!1,e(...r)):(n.args=r,n.pending||y(n,t))}}class x{constructor(e,t){this.update=v(e=>{if(this.value===e)return;const{name:t,element:n}=this;"ownerSVGElement"in n?n.setAttributeNS(function(e){return d[e.split(":")[0]]}(t),t,e):t in n?n[t]=e:void 0!==e?n.setAttribute(t,e):n.hasAttribute(t)&&n.removeAttribute(t),this.value=e}),this.name=t,this.element=e}}class k{constructor(e){this.update=v(e=>{if(e===this.value)return;const{element:t,placeholder:n}=this;"object"!=typeof e&&t.nodeType===Node.TEXT_NODE?t.textContent=e:a(e,t)?t.update(e.values):Array.isArray(e)?(this.value instanceof Map||t.nodeType===Node.COMMENT_NODE||this.replaceWith(n),e=this.updateArray(e)):this.replaceWith(null==e?n:e),this.value=e}),this.element=this.placeholder=e}updateArray(e){const n=this.value instanceof Map?this.value:new Map,{element:r}=this;let o=r;const s=e.reduce((e,r,s)=>{const i=String(r.key||s);let l=n.get(i);if(l)a(l,r)?l.update(r.values):(t(r.create(),l.range),n.set(i,l=r));else{const e=r.create();o.parentNode.insertBefore(e,o.nextSibling),n.set(i,l=r)}return o.nextSibling!==l.range[0]&&function(e,t,n=t.parentNode){const[r,o]=e.range,s=t.nextSibling;let a=r;do{const e=a.nextSibling;n.insertBefore(a,s),a=e}while(a!==o);n.insertBefore(o,s)}(l,o),o=l.range[1],e.push(i),e},[]);return n.forEach((e,t,n)=>{-1===s.indexOf(t)&&(e.delete(),n.delete(t))}),n}replaceWith(n){const{element:r,value:o}=this;var s;o instanceof Map&&(o.forEach(e=>e.delete()),o.clear()),r!==n&&(this.element=n=i(n)?n:(s=n)&&s.nodeType?n:e(n),t(i(n)?n.create():n,i(r)?r.range:r))}}function C(){return NodeFilter.FILTER_ACCEPT}function j(e,t){const n=e.attributes;let r=n.length;for(;r--;){const{name:s,value:a}=n.item(r),i=u(a);-1!==i&&(e.removeAttribute(s),t[i]={type:x,name:s,nodePath:o(e)})}}function N(e,t){const n=u(e.data);-1!==n&&(t[n]={type:k,nodePath:o(e)},e.nodeValue="")}function w(t,n){(function(e){return e.match(new RegExp(l,"g"))||[]})(t.data).forEach(r=>{const s=e();(t=t.splitText(t.data.indexOf(r))).deleteData(0,r.length),t.parentNode.insertBefore(s,t),n[u(r)]={type:k,nodePath:o(s)}})}function _(e){const t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,C,!1),n=[];for(;t.nextNode();){const e=t.currentNode;e.nodeType===Node.ELEMENT_NODE?(j(e,n),c.test(e.tagName)&&[].forEach.call(e.childNodes,e=>w(e,n))):N(e,n)}return n}C.acceptNode=C;const E=new WeakMap;function $(e,t){let n=E.get(e);n||E.set(e,n=function(e,t){const n=document.createElement("template");n.innerHTML=t?`<${t}>${e}</${t}>`:e;let r=n.content;if(t){const e=document.createRange();e.selectNodeContents(r.firstChild),r=e.extractContents()}return{content:r,expressions:_(r)}}(function(e){const t=new RegExp("^[^]*<([0-9a-zA-Z]+)(?:\\s*[^<\\s\\0\"'>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"?|'[^']*'?|[^\\s'\">]*))?)*\\s*(>?)|[^]*(>)[^]*|[^]*$","i");let n,r=!1,o=e[0];for(let s=0,a=e.length;s<a-1;s++){const a=`__${s}__`,i=e[s].match(t);i[1]&&(n=i[1],r=!i[2]),(i[2]||i[3])&&(r=c.test(n)),o+=(r?a:`\x3c!--${a}--\x3e`)+e[s+1]}return o}(e),t));const r=document.importNode(n.content,!0);return{fragment:r,expressions:function(e,t){return t.map(t=>new t.type(function(e,t){for(let n=0,r=t.length;n<r;n++)e=e.childNodes[t[n]];return e}(e,t.nodePath),t.name))}(r,n.expressions)}}var S;class O{constructor(e,t,n){this[S]=!0,this.values=t,this.strings=e,this.context=n}withKey(e){return this.key=e,this}update(e){for(let t=0;t<e.length;t++)void 0!==this.expressions[t]&&this.expressions[t].update(e[t])}delete(){n(this.range[0],this.range[1].nextSibling),this.range=void 0,this.expressions=void 0}create(){const{fragment:t,expressions:n}=$(this.strings,this.context);return this.expressions=n,this.range=[t.insertBefore(e(),t.firstChild),t.appendChild(e())],this.update(this.values),t}}function A(e,t){A.instances.has(t)?A.instances.get(t).update(e.values):(A.instances.set(t,e),n(t.firstChild,null,t),t.appendChild(e.create()))}function M(e,...t){return new O(e,t)}S=s,A.instances=new WeakMap;const T=function(e){return class extends e{constructor(){super(...arguments),this.__props=Object.create(null)}static get observedAttributes(){return function(e){if(!e.__attrsMap){const t=e.properties,n=Object.create(null);if(t)for(const r in t)n[r.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()]=r,Object.defineProperty(e.prototype,r,{get(){return this.__props[r]},set(e){const t=this.__props[r];this.__props[r]=e,this.rendered&&t!==e&&this.update()}});e.__attrsMap=n,e.__observedProps=Object.keys(n)}return e.__observedProps}(this)}attributeChangedCallback(e,t,n){const{__attrsMap:r,properties:o}=this.constructor;this[r[e]]=o[e](n)}}}((L=HTMLElement,class extends L{constructor(){super(...arguments),this.state={},this.rendered=!1,this.renderCallbacks=[],this.renderRoot=this}attachShadow(e){return this.renderRoot=super.attachShadow.call(this,e)}connectedCallback(){this.update()}setState(e,t){const n=this.state;this.state=Object.assign({},n,"function"==typeof e?e(n,this):e),t&&this.renderCallbacks.push(t),this.update()}render(){return null}update(){this.rendered=!0;const e=this.render();for(e&&A(e,this.renderRoot);this.renderCallbacks.length;)this.renderCallbacks.shift()()}}));var L;function R(e){return null===e?"null":Array.isArray(e)?"array":typeof e}function B(e){return!!e&&(!!e.nodeType||i(e))}function P(e){try{if("string"==typeof e)return JSON.parse(e)}catch(e){console.error(e)}return e}let W,D,F,z,H,K,V,J,X=e=>e;const Z=({isCollapsable:e,collapsed:t,onClick:n,key:r})=>M(W||(W=X`
    <span
        class=${0}
        onClick=${0}
    >
        ${0}:
    </span>
`),function(...e){return e.filter(Boolean).join(" ")}(r&&"key",e&&"collapsable",t&&"collapsableCollapsed"),n,r);class q extends T{constructor(...e){super(...e),this.data=null,this.collapsed=!0,this.handleKeyClick=e=>{e.preventDefault(),this.collapsed=!this.collapsed}}static get properties(){return{data:P,collapsed:Boolean,key:String}}static get is(){return"json-nested-object-node"}renderValue(e){return B(e)?e:M(D||(D=X`
                  <span class=${0}>${0}</span>
              `),R(e),JSON.stringify(e))}renderChild(e){return this.collapsed?M(F||(F=X`
                  <span class="preview">
                      ${0}
                  </span>
              `),function(e,t){const{nodeCount:n,maxLength:r}={nodeCount:3,maxLength:15,...t},o=Array.isArray(e),s=Object.keys(e),a=s.slice(0,n),i=[o?"[ ":"{ "];return i.push(a.reduce((t,n)=>{const s=[],a=e[n],i=R(a);return o||s.push(`${n}: `),"object"===i?s.push("{ ... }"):"array"===i?s.push("[ ... ]"):"string"===i?s.push(`"${a.substring(0,r)}${a.length>r?"...":""}"`):s.push(String(a)),t.concat(s.join(""))},[]).join(", ")),s.length>n&&i.push(", ..."),i.push(o?" ]":" }"),i.join("")}(e)):M(z||(z=X`
                  <json-object-node data=${0}></json-object-node>
              `),e)}render(){const{data:e,key:t}=this,n=(r=e)!==Object(r)||B(e);var r;return M(H||(H=X`
            ${0}
            ${0}
        `),Z({isCollapsable:!n,collapsed:this.collapsed,key:t,onClick:!n&&this.handleKeyClick}),n?this.renderValue(e):this.renderChild(e))}}class G extends T{constructor(...e){super(...e),this.data=null,this.collapsed=!0}static get is(){return"json-object-node"}static get properties(){return{data:P,collapsed:Boolean}}render(){const{data:e}=this;return M(K||(K=X`
            <ul>
                ${0}
            </ul>
        `),Object.keys(e).map(t=>M(V||(V=X`
                        <li>
                            <json-nested-object-node key=${0} data=${0}></json-nested-object-node>
                        </li>
                    `),t,e[t]).withKey(t)))}}class I extends T{constructor(...e){super(...e),this.data=null}static get is(){return"json-viewer"}static get properties(){return{data:P}}connectedCallback(){if(!this.hasAttribute("data")){const e=this.innerText.trim();e&&(this.data=JSON.parse(e))}this.attachShadow({mode:"open"}),super.connectedCallback()}render(){return M(J||(J=X`
            <style>
                :host {
                    --background-color: rgb(42, 47, 58);
                    --color: #f8f8f2;
                    --string-color: #a3eea0;
                    --number-color: #d19a66;
                    --boolean-color: #4ba7ef;
                    --null-color: #df9cf3;
                    --key-color: rgb(111, 179, 210);
                    --font-family: monaco, Consolas, 'Lucida Console', monospace;
                    --preview-color: rgba(222, 175, 143, 0.9);

                    display: block;
                    background-color: var(--background-color);
                    color: var(--color);
                    padding: 0.5rem;
                    font-family: var(--font-family);
                    font-size: 1rem;
                }

                .preview {
                    color: var(--preview-color);
                }

                .null {
                    color: var(--null-color, #df9cf3);
                }

                .key {
                    color: var(--key-color, #f9857b);
                    display: inline-block;
                }

                .collapsable:before {
                    display: inline-block;
                    color: var(--color);
                    padding-right: 5px;
                    padding-left: 5px;
                    font-size: 0.7rem;
                    content: '▶';
                    transition: transform 195ms ease-in;
                    transform: rotate(90deg);
                    color: var(--key-color);
                }

                .collapsable.collapsableCollapsed:before {
                    transform: rotate(0);
                }

                .collapsable {
                    cursor: pointer;
                    user-select: none;
                }

                .string {
                    color: var(--string-color);
                }

                .number {
                    color: var(--number-color);
                }

                .boolean {
                    color: var(--boolean-color);
                }

                ul {
                    padding: 0;
                    clear: both;
                }

                ul,
                li {
                    list-style: none;
                    position: relative;
                }

                li ul > li {
                    position: relative;
                    padding-top: 0.25rem;
                    margin-left: 1.5rem;
                    padding-left: 0px;
                }

                json-nested-object-node ul:before {
                    content: '';
                    border-left: 1px solid #333;
                    position: absolute;
                    left: 0.5rem;
                    top: 0.5rem;
                    bottom: 0.5rem;
                }

                json-nested-object-node ul:hover:before {
                    border-left: 1px solid #666;
                }
            </style>
            <json-object-node data=${0}></json-object-node>
        `),this.data)}}customElements.define(G.is,G),customElements.define(q.is,q),customElements.define(I.is,I);
//# sourceMappingURL=index.js.map
