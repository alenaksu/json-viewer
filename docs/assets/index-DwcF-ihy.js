var Wt=Object.defineProperty;var mt=s=>{throw TypeError(s)};var Jt=(s,t,e)=>t in s?Wt(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var yt=(s,t,e)=>Jt(s,typeof t!="symbol"?t+"":t,e),G=(s,t,e)=>t.has(s)||mt("Cannot "+e);var w=(s,t,e)=>(G(s,t,"read from private field"),e?e.call(s):t.get(s)),N=(s,t,e)=>t.has(s)?mt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),B=(s,t,e,i)=>(G(s,t,"write to private field"),i?i.call(s,e):t.set(s,e),e),F=(s,t,e)=>(G(s,t,"access private method"),e);import"https://unpkg.com/comlink/dist/umd/comlink.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=globalThis,ht=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,dt=Symbol(),vt=new WeakMap;let Ut=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==dt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ht&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=vt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&vt.set(e,t))}return t}toString(){return this.cssText}};const Kt=s=>new Ut(typeof s=="string"?s:s+"",void 0,dt),Rt=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new Ut(e,s,dt)},Zt=(s,t)=>{if(ht)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),r=W.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},At=ht?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Kt(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Yt,defineProperty:Gt,getOwnPropertyDescriptor:Qt,getOwnPropertyNames:Xt,getOwnPropertySymbols:te,getPrototypeOf:ee}=Object,g=globalThis,_t=g.trustedTypes,se=_t?_t.emptyScript:"",Q=g.reactiveElementPolyfillSupport,R=(s,t)=>s,J={toAttribute(s,t){switch(t){case Boolean:s=s?se:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},ut=(s,t)=>!Yt(s,t),bt={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ut};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);class P extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=bt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Gt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:n}=Qt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return r==null?void 0:r.call(this)},set(o){const l=r==null?void 0:r.call(this);n.call(this,o),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??bt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const t=ee(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const e=this.properties,i=[...Xt(e),...te(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(At(r))}else t!==void 0&&e.push(At(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Zt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var n;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:J).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){var n;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:J;this._$Em=r,this[r]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??ut)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(e)):this._$EU()}catch(r){throw t=!1,this._$EU(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[R("elementProperties")]=new Map,P[R("finalized")]=new Map,Q==null||Q({ReactiveElement:P}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis,K=j.trustedTypes,St=K?K.createPolicy("lit-html",{createHTML:s=>s}):void 0,jt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Lt="?"+$,ie=`<${Lt}>`,_=document,M=()=>_.createComment(""),I=s=>s===null||typeof s!="object"&&typeof s!="function",pt=Array.isArray,re=s=>pt(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",X=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Et=/-->/g,wt=/>/g,y=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pt=/'/g,xt=/"/g,Mt=/^(?:script|style|textarea|title)$/i,ne=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),v=ne(1),b=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ot=new WeakMap,A=_.createTreeWalker(_,129);function It(s,t){if(!pt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return St!==void 0?St.createHTML(t):t}const oe=(s,t)=>{const e=s.length-1,i=[];let r,n=t===2?"<svg>":t===3?"<math>":"",o=T;for(let l=0;l<e;l++){const a=s[l];let d,c,h=-1,p=0;for(;p<a.length&&(o.lastIndex=p,c=o.exec(a),c!==null);)p=o.lastIndex,o===T?c[1]==="!--"?o=Et:c[1]!==void 0?o=wt:c[2]!==void 0?(Mt.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=y):c[3]!==void 0&&(o=y):o===y?c[0]===">"?(o=r??T,h=-1):c[1]===void 0?h=-2:(h=o.lastIndex-c[2].length,d=c[1],o=c[3]===void 0?y:c[3]==='"'?xt:Pt):o===xt||o===Pt?o=y:o===Et||o===wt?o=T:(o=y,r=void 0);const f=o===y&&s[l+1].startsWith("/>")?" ":"";n+=o===T?a+ie:h>=0?(i.push(d),a.slice(0,h)+jt+a.slice(h)+$+f):a+$+(h===-2?l:f)}return[It(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class H{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,c]=oe(t,e);if(this.el=H.createElement(d,i),A.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=A.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(jt)){const p=c[o++],f=r.getAttribute(h).split($),q=/([.?@])?(.*)/.exec(p);a.push({type:1,index:n,name:q[2],strings:f,ctor:q[1]==="."?le:q[1]==="?"?ce:q[1]==="@"?he:Z}),r.removeAttribute(h)}else h.startsWith($)&&(a.push({type:6,index:n}),r.removeAttribute(h));if(Mt.test(r.tagName)){const h=r.textContent.split($),p=h.length-1;if(p>0){r.textContent=K?K.emptyScript:"";for(let f=0;f<p;f++)r.append(h[f],M()),A.nextNode(),a.push({type:2,index:++n});r.append(h[p],M())}}}else if(r.nodeType===8)if(r.data===Lt)a.push({type:2,index:n});else{let h=-1;for(;(h=r.data.indexOf($,h+1))!==-1;)a.push({type:7,index:n}),h+=$.length-1}n++}}static createElement(t,e){const i=_.createElement("template");return i.innerHTML=t,i}}function k(s,t,e=s,i){var o,l;if(t===b)return t;let r=i!==void 0?(o=e.o)==null?void 0:o[i]:e.l;const n=I(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,i)),i!==void 0?(e.o??(e.o=[]))[i]=r:e.l=r),r!==void 0&&(t=k(s,r._$AS(s,t.values),r,i)),t}class ae{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=((t==null?void 0:t.creationScope)??_).importNode(e,!0);A.currentNode=r;let n=A.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new D(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new de(n,this,t)),this._$AV.push(d),a=i[++l]}o!==(a==null?void 0:a.index)&&(n=A.nextNode(),o++)}return A.currentNode=_,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class D{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,i,r){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this.v=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),I(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):re(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(_.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=H.createElement(It(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(e);else{const o=new ae(r,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=Ot.get(t.strings);return e===void 0&&Ot.set(t.strings,e=new H(t)),e}k(t){pt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new D(this.O(M()),this.O(M()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(t,e=this,i,r){const n=this.strings;let o=!1;if(n===void 0)t=k(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==b,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=k(this,l[i+a],e,a),d===b&&(d=this._$AH[a]),o||(o=!I(d)||d!==this._$AH[a]),d===u?t=u:t!==u&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!r&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class le extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}class ce extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}}class he extends Z{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??u)===b)return;const i=this._$AH,r=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==u&&(i===u||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class de{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}}const tt=j.litHtmlPolyfillSupport;tt==null||tt(H,D),(j.litHtmlVersions??(j.litHtmlVersions=[])).push("3.2.0");const ue=(s,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let r=i._$litPart$;if(r===void 0){const n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=r=new D(t.insertBefore(M(),n),n,void 0,e??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class L extends P{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=ue(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return b}}var Tt;L._$litElement$=!0,L.finalized=!0,(Tt=globalThis.litElementHydrateSupport)==null||Tt.call(globalThis,{LitElement:L});const et=globalThis.litElementPolyfillSupport;et==null||et({LitElement:L});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ut},fe=(s=pe,t,e)=>{const{kind:i,metadata:r}=e;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(e.name,s),i==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,s)},init(l){return l!==void 0&&this.P(o,void 0,s),l}}}if(i==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,s)}}throw Error("Unsupported decorator location: "+i)};function Ht(s){return(t,e)=>typeof e=="object"?fe(s,t,e):((i,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(r,n):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function zt(s){return Ht({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $e=(s,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(s,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ge;function me(s){return(t,e)=>$e(t,e,{get(){return(this.renderRoot??ge??(ge=document.createDocumentFragment())).querySelectorAll(s)}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ye={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ve=s=>(...t)=>({_$litDirective$:s,values:t});class Ae{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.t=t,this._$AM=e,this.i=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=ve(class extends Ae{constructor(s){var t;if(super(s),s.type!==ye.ATTRIBUTE||s.name!=="class"||((t=s.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){var i,r;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in t)t[n]&&!((i=this.nt)!=null&&i.has(n))&&this.st.add(n);return this.render(t)}const e=s.element.classList;for(const n of this.st)n in t||(e.remove(n),this.st.delete(n));for(const n in t){const o=!!t[n];o===this.st.has(n)||(r=this.nt)!=null&&r.has(n)||(o?(e.add(n),this.st.add(n)):(e.remove(n),this.st.delete(n)))}return b}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*be(s,t){if(s!==void 0){let e=0;for(const i of s)yield t(i,e++)}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function st(s,t,e){return s?t(s):e==null?void 0:e(s)}var x=(s=>(s.String="string",s.Number="number",s.Boolean="boolean",s.Object="object",s.Null="null",s.Array="array",s))(x||{});function Se(s){return s instanceof RegExp}function nt(s){return s===null?x.Null:Array.isArray(s)?x.Array:s.constructor.name.toLowerCase()}function U(s){return s!==Object(s)}function Ee(s,{nodeCount:t=3,maxLength:e=15}={}){const i=Array.isArray(s),r=Object.keys(s),n=r.slice(0,t),o=[],l=c=>{switch(nt(c)){case x.Object:return Object.keys(c).length===0?"{ }":"{ ... }";case x.Array:return c.length===0?"[ ]":"[ ... ]";case x.String:return`"${c.substring(0,e)}${c.length>e?"...":""}"`;default:return String(c)}},a=[];for(const c of n){const h=[],p=s[c];i||h.push(`${c}: `),h.push(l(p)),a.push(h.join(""))}r.length>t&&a.push("..."),o.push(a.join(", "));const d=o.join("");return i?`[ ${d} ]`:`{ ${d} }`}function*ft(s){const t=[[s,"",[]]];for(;t.length;){const[e,i,r]=t.shift();if(i&&(yield[e,i,r]),!U(e))for(const[n,o]of Object.entries(e))t.push([o,`${i}${i?".":""}${n}`,[...r,i]])}}function we(s,t){const e=s.split("."),i=t.split("."),r=a=>a==="*",n=a=>a==="**";let o=0,l=0;for(;o<e.length;){const a=i[l],d=e[o];if(a===d||r(a))l++,o++;else if(n(a))l++,o=e.length-(i.length-l);else return!1}return l===i.length}const Pe={fromAttribute:s=>s&&s.trim()?JSON.parse(s):void 0,toAttribute:s=>JSON.stringify(s)},ot=s=>s!==void 0,Dt=(s,t)=>Se(t)?!!s.match(t):we(s,t),xe=(s,t)=>t.split(".").reduce((e,i)=>e[i],s),Ct=(s,t)=>e=>({expanded:{...e.expanded,[s]:ot(t)?!!t:!e.expanded[s]}}),V=(s,t)=>(e,i)=>{const r={};if(s)for(const[,n,o]of ft(i.data))Dt(n,s)&&(r[n]=t,o.forEach(l=>r[l]=t));return{expanded:r}},Oe=s=>(t,e)=>{const i={};if(s)for(const[,r,n]of ft(e.data))Dt(r,s)?(i[r]=!1,n.forEach(o=>i[o]=!1)):i[r]=!0;return{filtered:i}},Ce=()=>()=>({filtered:{}}),kt=s=>()=>({highlight:s}),ke=Rt`
    :where(:host) {
        --background-color: #2a2f3a;
        --color: #f8f8f2;
        --string-color: #a3eea0;
        --number-color: #d19a66;
        --boolean-color: #4ba7ef;
        --null-color: #df9cf3;
        --property-color: #6fb3d2;
        --preview-color: rgba(222, 175, 143, 0.9);
        --highlight-color:  #c92a2a;
        --outline-color: #e0e4e5;
        --outline-width: 1px;
        --outline-style: dotted;

        --font-family: Nimbus Mono PS, Courier New, monospace;
        --font-size: 1rem;
        --line-height: 1.2rem;

        --indent-size: 1.5em;
        --indentguide-size: 1px;
        --indentguide-style: solid;
        --indentguide-color: #333;
        --indentguide-color-active: #666;
        --indentguide: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color);
        --indentguide-active: var(--indentguide-size) var(--indentguide-style) var(--indentguide-color-active);
    }

    :host {
        display: block;
        background-color: var(--background-color);
        color: var(--color);
        font-family: var(--font-family);
        font-size: var(--font-size);
        line-height: var(--line-height);
    }

    :focus {
        outline-color: var(--outline-color);
        outline-width: var(--outline-width);
        outline-style: var(--outline-style);
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

    .collapsable::before {
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

    .collapsable--collapsed::before {
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

    ul ul::before {
        content: '';
        border-left: var(--indentguide);
        position: absolute;
        left: calc(0.5em - var(--indentguide-size));
        top: 0.3em;
        bottom: 0.3em;
    }

    ul ul:hover::before {
        border-left: var(--indentguide-active);
    }

    mark {
        background-color: var(--highlight-color);
    }
`;var Ne=Object.defineProperty,Y=(s,t,e,i)=>{for(var r=void 0,n=s.length-1,o;n>=0;n--)(o=s[n])&&(r=o(t,e,r)||r);return r&&Ne(t,e,r),r},z,O,C,E,qt,at;const gt=class gt extends L{constructor(){super();N(this,E);N(this,z);N(this,O);N(this,C);this.state={expanded:{},filtered:{},highlight:null},this.lastFocusedItem=null,B(this,z,e=>i=>{i.preventDefault(),this.setState(Ct(e))}),B(this,O,e=>{const i=e.target;e.target===this&&F(this,E,at).call(this,this.lastFocusedItem||this.nodeElements[0]),i.matches('[role="treeitem"]')&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=i,this.tabIndex=-1,i.tabIndex=0)}),B(this,C,e=>{const i=e.relatedTarget;(!i||!this.contains(i))&&(this.tabIndex=0)}),this.addEventListener("focusin",w(this,O)),this.addEventListener("focusout",w(this,C))}static customRenderer(e,i){return JSON.stringify(e)}async setState(e){const i=this.state;this.state={...i,...e(i,this)}}connectedCallback(){!this.hasAttribute("data")&&!ot(this.data)&&this.setAttribute("data",this.innerText),this.setAttribute("role","node"),this.setAttribute("tabindex","0"),super.connectedCallback()}expand(e){this.setState(V(e,!0))}expandAll(){this.setState(V("**",!0))}collapseAll(){this.setState(V("**",!1))}collapse(e){this.setState(V(e,!1))}*search(e){for(const[i,r]of ft(this.data))U(i)&&String(i).match(e)&&(this.expand(r),this.updateComplete.then(()=>{const n=this.shadowRoot.querySelector(`[data-path="${r}"]`);n.scrollIntoView({behavior:"smooth",inline:"center",block:"center"}),n.focus()}),this.setState(kt(r)),yield{value:i,path:r});this.setState(kt(null))}filter(e){this.setState(Oe(e))}resetFilter(){this.setState(Ce())}renderObject(e,i){return v`
            <ul part="object" role="group">
                ${be(Object.entries(e),([r,n])=>{const o=i?`${i}.${r}`:r,l=U(n),a=this.state.expanded[o];return v`
                        <li
                            part="property"
                            role="treeitem"
                            data-path="${o}"
                            aria-expanded="${a?"true":"false"}"
                            tabindex="-1"
                            .hidden="${this.state.filtered[o]}"
                            aria-hidden="${this.state.filtered[o]}"
                        >
                            <span
                                part="key"
                                class="${_e({key:r,collapsable:!l,"collapsable--collapsed":!this.state.expanded[o]})}"
                                @click="${l?null:w(this,z).call(this,o)}"
                            >
                                ${r}: ${st(!l&&!a,()=>this.renderNodePreview(n))}
                            </span>

                            ${st(l||a,()=>this.renderValue(n,o))}
                        </li>
                    `})}
            </ul>
        `}renderValue(e,i=""){return U(e)?this.renderPrimitive(e,i):this.renderObject(e,i)}renderNodePreview(e){return v`<span part="preview" class="preview"> ${Ee(e)} </span>`}renderPrimitive(e,i){const r=this.state.highlight,n=nt(e),o=this.constructor.customRenderer(e,i),l=v`
            <span part="primitive primitive-${n}" class="${nt(e)}"> ${o} </span>
        `;return i===r?v`<mark part="highlight">${l}</mark>`:l}render(){const e=this.data;return v`
            <div
                part="base"
                @keydown=${F(this,E,qt)}
                @focusin="${w(this,O)}"
                @focusout="${w(this,C)}"
            >
                ${st(ot(e),()=>this.renderValue(e))}
            </div>
        `}};z=new WeakMap,O=new WeakMap,C=new WeakMap,E=new WeakSet,qt=function(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;const i=[...this.nodeElements],r=this.matches(":dir(ltr)"),n=this.matches(":dir(rtl)");if(i.length>0){e.preventDefault();const o=i.findIndex(p=>p.matches(":focus")),l=i[o],a=this.state.expanded[l.dataset.path],d=U(xe(this.data,l.dataset.path)),c=p=>{const f=i[Math.max(Math.min(p,i.length-1),0)];F(this,E,at).call(this,f)},h=p=>{this.setState(Ct(l.dataset.path,p))};e.key==="ArrowDown"?c(o+1):e.key==="ArrowUp"?c(o-1):r&&e.key==="ArrowRight"||n&&e.key==="ArrowLeft"?!l||a||d?c(o+1):h(!0):r&&e.key==="ArrowLeft"||n&&e.key==="ArrowRight"?!l||!a||d?c(o-1):h(!1):e.key==="Home"?c(0):e.key==="End"&&c(i.length-1)}},at=function(e){e.focus()},gt.styles=[ke];let m=gt;Y([Ht({converter:Pe,type:Object})],m.prototype,"data");Y([zt()],m.prototype,"state");Y([zt()],m.prototype,"lastFocusedItem");Y([me('[role="treeitem"]')],m.prototype,"nodeElements");var rt;customElements.define("json-viewer",(rt=class extends m{static customRenderer(s){if(typeof s=="string"){if(URL.canParse(s))return v`<a href="${s}" target="_blank">${s}</a>`;if(Date.parse(s))return new Date(s).toLocaleString()}else if(typeof s=="number")return s.toFixed(2);return super.customRenderer(s)}},yt(rt,"styles",[m.styles,Rt`
                a {
                    color: white;
                    text-decoration: underline;
                }
            `]),rt));const Bt=Comlink.wrap(new Worker(new URL("/json-viewer/assets/worker-Cf5OLqXr.js",import.meta.url))),Te=document.querySelector("#json"),S=document.querySelector("json-viewer"),Ue=document.querySelector("#toggle-panel"),Ft=document.querySelector("#container"),Nt=document.querySelector("#loader"),Re=document.querySelector("#expand"),je=document.querySelector("#collapse"),it=document.querySelector("#filter"),lt=document.querySelector("#search");let ct;Re.addEventListener("click",s=>{s.preventDefault(),S.expandAll()});je.addEventListener("click",s=>{s.preventDefault(),S.collapseAll()});it.addEventListener("change",()=>{it.value?S.filter(it.value):S.resetFilter()});lt.addEventListener("input",()=>{ct=S.search(lt.value)});lt.addEventListener("keyup",s=>{ct&&s.keyCode===13&&ct.next()});const Le=(s,t=500)=>{let e;return(...i)=>{clearTimeout(e),e=setTimeout(()=>s(...i),t)}},Me=s=>{try{S.data=JSON.parse(s)}catch(t){S.data=t.message}},Vt=()=>{const s=$t.getValue();Nt.hidden=!1,Promise.all([Me(s),Bt.crush(s).then(t=>{location.hash=t})]).then(()=>{Nt.hidden=!0})},$t=CodeMirror.fromTextArea(Te,{mode:{name:"javascript",json:!0},lineNumbers:!0,theme:"jsv",styleActiveLine:!0,lint:{esversion:6}});Ue.addEventListener("click",()=>{Ft.classList.toggle("collapsed")});$t.on("change",Le(Vt));Bt.uncrush(location.hash.slice(1)).then(s=>{s?($t.setValue(s),Ft.classList.add("collapsed")):Vt()});
