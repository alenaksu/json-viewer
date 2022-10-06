import{css as _,LitElement as D,html as h}from"lit";import{property as J,state as T}from"lit/decorators.js";import{classMap as I}from"lit/directives/class-map.js";import"https://unpkg.com/comlink/dist/umd/comlink.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var u=(e=>(e.String="string",e.Number="number",e.Boolean="boolean",e.Object="object",e.Null="null",e.Array="array",e))(u||{});function F(e){return e instanceof RegExp}function b(e){return e===null?u.Null:Array.isArray(e)?u.Array:e.constructor.name.toLowerCase()}function N(e){return e!==Object(e)}function O(e){return!!e&&!!e.nodeType}function v(e){return N(e)||O(e)}function M(e,{nodeCount:t=3,maxLength:n=15}={}){const o=Array.isArray(e),r=Object.keys(e),s=r.slice(0,t),i=[],a=c=>{switch(b(c)){case u.Object:return Object.keys(c).length===0?"{ }":"{ ... }";case u.Array:return c.length===0?"[ ]":"[ ... ]";case u.String:return`"${c.substring(0,n)}${c.length>n?"...":""}"`;default:return String(c)}},l=[];for(const c of s){const p=[],z=e[c];o||p.push(`${c}: `),p.push(a(z)),l.push(p.join(""))}r.length>t&&l.push("..."),i.push(l.join(", "));const f=i.join("");return o?`[ ${f} ]`:`{ ${f} }`}function*k(e){const t=[[e,"",[]]];for(;t.length;){const[n,o,r]=t.shift();if(o&&(yield[n,o,r]),!N(n))for(const[s,i]of Object.entries(n))t.push([i,`${o}${o?".":""}${s}`,[...r,o]])}}function R(e,t){const n=e.split("."),o=t.split("."),r=l=>l==="*",s=l=>l==="**";let i=0,a=0;for(;i<n.length;){const l=o[a],f=n[i];if(l===f||r(l))a++,i++;else if(s(l))a++,i=n.length-(o.length-a);else return!1}return a===o.length}const B={fromAttribute:e=>e&&e.trim()?JSON.parse(e):void 0,toAttribute:e=>JSON.stringify(e)},w=e=>e!==void 0,A=(e,t)=>F(t)?!!e.match(t):R(e,t),K=(e,t)=>n=>({expanded:{...n.expanded,[e]:w(t)?!!t:!n.expanded[e]}}),g=(e,t)=>(n,o)=>{const r={};if(e)for(const[,s,i]of k(o.data))A(s,e)&&(r[s]=t,i.forEach(a=>r[a]=t));return{expanded:r}},W=e=>(t,n)=>{const o={};if(e)for(const[,r,s]of k(n.data))A(r,e)?(o[r]=!1,s.forEach(i=>o[i]=!1)):o[r]=!0;return{filtered:o}},G=()=>()=>({filtered:{}}),x=e=>()=>({highlight:e}),H=_`
:host {
    --background-color: #2a2f3a;
    --color: #f8f8f2;
    --string-color: #a3eea0;
    --number-color: #d19a66;
    --boolean-color: #4ba7ef;
    --null-color: #df9cf3;
    --property-color: #6fb3d2;
    --preview-color: rgba(222, 175, 143, 0.9);
    --highlight-color: #7b0000;

    --font-family: monaco, Consolas, 'Lucida Console', monospace;
    --font-size: 1rem;

    --indent-size: 1.5em;
    --indentguide-size: 1px;
    --indentguide-style: solid;
    --indentguide-color: #333;
    --indentguide-color-active: #666;
    --indentguide: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color);
    --indentguide-active: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color-active);

    display: block;
    background-color: var(--background-color);
    color: var(--color);
    font-family: var(--font-family);
    font-size: var(--font-size);
}

.preview {
    color: var(--preview-color);
}

.null {
    color: var(--null-color);
}

.key {
    color: var(--property-color);
    display: inline-block;
}

.collapsable:before {
    display: inline-block;
    color: var(--color);
    font-size: 0.8em;
    content: '▶';
    line-height: 1em;
    width: 1em;
    height: 1em;
    text-align: center;

    transition: transform 195ms ease-out;
    transform: rotate(90deg);
    color: var(--property-color);
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
    margin-left: var(--indent-size);
    padding-left: 0px;
}

ul ul:before {
    content: '';
    border-left: var(--indentguide);
    position: absolute;
    left: calc(0.5em - var(--indentguide-size));
    top: 0.3em;
    bottom: 0.3em;
}

ul ul:hover:before {
    border-left: var(--indentguide-active);
}

mark {
    background-color: var(--highlight-color);
}
`;var Q=Object.defineProperty,U=Object.getOwnPropertyDescriptor,C=(e,t,n,o)=>{for(var r=o>1?void 0:o?U(t,n):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&Q(t,n,r),r};class m extends D{constructor(){super(...arguments),this.state={expanded:{},filtered:{},highlight:null},this.handlePropertyClick=t=>n=>{n.preventDefault(),this.setState(K(t))}}async setState(t){const n=this.state;this.state={...n,...t(n,this)}}connectedCallback(){!this.hasAttribute("data")&&!w(this.data)&&this.setAttribute("data",this.innerText),super.connectedCallback()}expand(t){this.setState(g(t,!0))}expandAll(){this.setState(g("**",!0))}collapseAll(){this.setState(g("**",!1))}collapse(t){this.setState(g(t,!1))}*search(t){for(const[n,o]of k(this.data))v(n)&&String(n).includes(t)&&(this.expand(o),this.updateComplete.then(()=>{const r=this.shadowRoot.querySelector(`[data-path="${o}"]`);r.scrollIntoView({behavior:"smooth",inline:"center",block:"center"}),r.focus()}),this.setState(x(o)),yield{value:n,path:o});this.setState(x(null))}filter(t){this.setState(W(t))}resetFilter(){this.setState(G())}renderObject(t,n){return h`
            <ul part="object">
                ${Object.keys(t).map(o=>{const r=t[o],s=n?`${n}.${o}`:o,i=v(r);return h`
                        <li part="property" data-path="${s}" .hidden="${this.state.filtered[s]}">
                            <span
                                part="key"
                                class="${I({key:o,collapsable:!i,collapsableCollapsed:!this.state.expanded[s]})}"
                                @click="${i?null:this.handlePropertyClick(s)}"
                            >
                                ${o}:
                            </span>
                            ${this.renderNode(r,s)}
                        </li>
                    `})}
            </ul>
        `}renderNode(t,n=""){const o=v(t);return!n||this.state.expanded[n]||o?o?this.renderPrimitive(t,n):this.renderObject(t,n):this.renderNodePreview(t)}renderNodePreview(t){return h` <span part="preview" class="preview"> ${M(t)} </span> `}renderPrimitive(t,n){const o=this.state.highlight,r=b(t),s=O(t)?t:h` <span part="primitive primitive-${r}" tabindex="0" class="${b(t)}">${JSON.stringify(t)}</span> `;return n===o?h`<mark part="highlight">${s}</mark>`:s}render(){const t=this.data;return w(t)?this.renderNode(t):null}}m.styles=[H];C([J({converter:B,type:Object})],m.prototype,"data",2);C([T()],m.prototype,"state",2);customElements.define("json-viewer",m);const L=Comlink.wrap(new Worker("/json-viewer/assets/worker.0602bd76.js")),V=document.querySelector("#json"),d=document.querySelector("json-viewer"),X=document.querySelector("#toggle-panel"),E=document.querySelector("#container"),j=document.querySelector("#loader"),Y=document.querySelector("#expand"),Z=document.querySelector("#collapse"),y=document.querySelector("#filter"),S=document.querySelector("#search");let P;Y.addEventListener("click",e=>{e.preventDefault(),d.expandAll()});Z.addEventListener("click",e=>{e.preventDefault(),d.collapseAll()});y.addEventListener("sl-change",()=>{y.value?d.filter(y.value):d.resetFilter()});S.addEventListener("sl-input",()=>{P=d.search(S.value)});S.addEventListener("keyup",e=>{P&&e.keyCode===13&&P.next()});const ee=(e,t=500)=>{let n;return(...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)}},te=e=>{try{d.data=JSON.parse(e)}catch(t){d.data=t.message}},q=()=>{const e=$.getValue();j.hidden=!1,Promise.all([te(e),L.crush(e).then(t=>{location.hash=t})]).then(()=>{j.hidden=!0})},$=CodeMirror.fromTextArea(V,{mode:{name:"javascript",json:!0},lineNumbers:!0,theme:"jsv",styleActiveLine:!0,lint:{esversion:6}});X.addEventListener("click",()=>{E.classList.toggle("collapsed")});$.on("change",ee(q));L.uncrush(location.hash.slice(1)).then(e=>{e?($.setValue(e),E.classList.add("collapsed")):q()});
