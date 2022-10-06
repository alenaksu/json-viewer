import"https://unpkg.com/comlink/dist/umd/comlink.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=window,X=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol(),it=new WeakMap;class gt{constructor(t,e,s){if(this._$cssResult$=!0,s!==tt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(X&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&it.set(e,t))}return t}toString(){return this.cssText}}const Ot=i=>new gt(typeof i=="string"?i:i+"",void 0,tt),kt=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new gt(e,i,tt)},Tt=(i,t)=>{X?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),r=L.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)})},rt=X?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Ot(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var D;const R=window,nt=R.trustedTypes,Ut=nt?nt.emptyScript:"",ot=R.reactiveElementPolyfillSupport,K={toAttribute(i,t){switch(t){case Boolean:i=i?Ut:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},mt=(i,t)=>t!==i&&(t==t||i==i),I={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:mt};class y extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;(e=this.h)!==null&&e!==void 0||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const r=this._$Ep(s,e);r!==void 0&&(this._$Ev.set(r,s),t.push(r))}),t}static createProperty(t,e=I){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(r){const n=this[t];this[e]=r,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||I}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of s)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(rt(r))}else t!==void 0&&e.push(rt(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Tt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=I){var r;const n=this.constructor._$Ep(t,s);if(n!==void 0&&s.reflect===!0){const o=(((r=s.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?s.converter:K).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var s;const r=this.constructor,n=r._$Ev.get(t);if(n!==void 0&&this._$El!==n){const o=r.getPropertyOptions(n),h=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:K;this._$El=n,this[n]=h.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let r=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||mt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((r,n)=>this[n]=r),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostUpdate)===null||n===void 0?void 0:n.call(r)}),this.update(s)):this._$Ek()}catch(r){throw e=!1,this._$Ek(),r}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var r;return(r=s.hostUpdated)===null||r===void 0?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}y.finalized=!0,y.elementProperties=new Map,y.elementStyles=[],y.shadowRootOptions={mode:"open"},ot==null||ot({ReactiveElement:y}),((D=R.reactiveElementVersions)!==null&&D!==void 0?D:R.reactiveElementVersions=[]).push("1.4.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const j=window,b=j.trustedTypes,lt=b?b.createPolicy("lit-html",{createHTML:i=>i}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,yt="?"+f,Ht=`<${yt}>`,E=document,x=(i="")=>E.createComment(i),N=i=>i===null||typeof i!="object"&&typeof i!="function",_t=Array.isArray,Lt=i=>_t(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,ct=/>/g,$=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,dt=/"/g,At=/^(?:script|style|textarea|title)$/i,Rt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),C=Rt(1),g=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ut=new WeakMap,jt=(i,t,e)=>{var s,r;const n=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let o=n._$litPart$;if(o===void 0){const h=(r=e==null?void 0:e.renderBefore)!==null&&r!==void 0?r:null;n._$litPart$=o=new k(t.insertBefore(x(),h),h,void 0,e!=null?e:{})}return o._$AI(i),o},_=E.createTreeWalker(E,129,null,!1),Mt=(i,t)=>{const e=i.length-1,s=[];let r,n=t===2?"<svg>":"",o=w;for(let l=0;l<e;l++){const a=i[l];let u,c,d=-1,v=0;for(;v<a.length&&(o.lastIndex=v,c=o.exec(a),c!==null);)v=o.lastIndex,o===w?c[1]==="!--"?o=at:c[1]!==void 0?o=ct:c[2]!==void 0?(At.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=$):c[3]!==void 0&&(o=$):o===$?c[0]===">"?(o=r!=null?r:w,d=-1):c[1]===void 0?d=-2:(d=o.lastIndex-c[2].length,u=c[1],o=c[3]===void 0?$:c[3]==='"'?dt:ht):o===dt||o===ht?o=$:o===at||o===ct?o=w:(o=$,r=void 0);const T=o===$&&i[l+1].startsWith("/>")?" ":"";n+=o===w?a+Ht:d>=0?(s.push(u),a.slice(0,d)+"$lit$"+a.slice(d)+f+T):a+f+(d===-2?(s.push(void 0),l):T)}const h=n+(i[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[lt!==void 0?lt.createHTML(h):h,s]};class O{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0;const h=t.length-1,l=this.parts,[a,u]=Mt(t,e);if(this.el=O.createElement(a,s),_.currentNode=this.el.content,e===2){const c=this.el.content,d=c.firstChild;d.remove(),c.append(...d.childNodes)}for(;(r=_.nextNode())!==null&&l.length<h;){if(r.nodeType===1){if(r.hasAttributes()){const c=[];for(const d of r.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(f)){const v=u[o++];if(c.push(d),v!==void 0){const T=r.getAttribute(v.toLowerCase()+"$lit$").split(f),U=/([.?@])?(.*)/.exec(v);l.push({type:1,index:n,name:U[2],strings:T,ctor:U[1]==="."?Dt:U[1]==="?"?Bt:U[1]==="@"?qt:M})}else l.push({type:6,index:n})}for(const d of c)r.removeAttribute(d)}if(At.test(r.tagName)){const c=r.textContent.split(f),d=c.length-1;if(d>0){r.textContent=b?b.emptyScript:"";for(let v=0;v<d;v++)r.append(c[v],x()),_.nextNode(),l.push({type:2,index:++n});r.append(c[d],x())}}}else if(r.nodeType===8)if(r.data===yt)l.push({type:2,index:n});else{let c=-1;for(;(c=r.data.indexOf(f,c+1))!==-1;)l.push({type:7,index:n}),c+=f.length-1}n++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function S(i,t,e=i,s){var r,n,o,h;if(t===g)return t;let l=s!==void 0?(r=e._$Cl)===null||r===void 0?void 0:r[s]:e._$Cu;const a=N(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(i),l._$AT(i,e,s)),s!==void 0?((o=(h=e)._$Cl)!==null&&o!==void 0?o:h._$Cl=[])[s]=l:e._$Cu=l),l!==void 0&&(t=S(i,l._$AS(i,t.values),l,s)),t}class zt{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:r}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:E).importNode(s,!0);_.currentNode=n;let o=_.nextNode(),h=0,l=0,a=r[0];for(;a!==void 0;){if(h===a.index){let u;a.type===2?u=new k(o,o.nextSibling,this,t):a.type===1?u=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(u=new Jt(o,this,t)),this.v.push(u),a=r[++l]}h!==(a==null?void 0:a.index)&&(o=_.nextNode(),h++)}return n}m(t){let e=0;for(const s of this.v)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class k{constructor(t,e,s,r){var n;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$C_=(n=r==null?void 0:r.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$C_}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),N(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==g&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):Lt(t)?this.O(t):this.$(t)}S(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}$(t){this._$AH!==p&&N(this._$AH)?this._$AA.nextSibling.data=t:this.k(E.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=O.createElement(r.h,this.options)),r);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.m(s);else{const o=new zt(n,this),h=o.p(this.options);o.m(s),this.k(h),this._$AH=o}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new O(t)),e}O(t){_t(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const n of t)r===e.length?e.push(s=new k(this.S(x()),this.S(x()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$C_=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class M{constructor(t,e,s,r,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,r){const n=this.strings;let o=!1;if(n===void 0)t=S(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==g,o&&(this._$AH=t);else{const h=t;let l,a;for(t=n[0],l=0;l<n.length-1;l++)a=S(this,h[s+l],e,l),a===g&&(a=this._$AH[l]),o||(o=!N(a)||a!==this._$AH[l]),a===p?t=p:t!==p&&(t+=(a!=null?a:"")+n[l+1]),this._$AH[l]=a}o&&!r&&this.P(t)}P(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class Dt extends M{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===p?void 0:t}}const It=b?b.emptyScript:"";class Bt extends M{constructor(){super(...arguments),this.type=4}P(t){t&&t!==p?this.element.setAttribute(this.name,It):this.element.removeAttribute(this.name)}}class qt extends M{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){var s;if((t=(s=S(this,t,e,0))!==null&&s!==void 0?s:p)===g)return;const r=this._$AH,n=t===p&&r!==p||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==p&&(r===p||n);n&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Jt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const pt=j.litHtmlPolyfillSupport;pt==null||pt(O,k),((B=j.litHtmlVersions)!==null&&B!==void 0?B:j.litHtmlVersions=[]).push("2.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var q,J;class P extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return g}}P.finalized=!0,P._$litElement$=!0,(q=globalThis.litElementHydrateSupport)===null||q===void 0||q.call(globalThis,{LitElement:P});const vt=globalThis.litElementPolyfillSupport;vt==null||vt({LitElement:P});((J=globalThis.litElementVersions)!==null&&J!==void 0?J:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt=(i,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,i)}};function bt(i){return(t,e)=>e!==void 0?((s,r,n)=>{r.constructor.createProperty(n,s)})(i,t,e):Vt(i,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Wt(i){return bt({...i,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V;((V=window.HTMLSlotElement)===null||V===void 0?void 0:V.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Kt=i=>(...t)=>({_$litDirective$:i,values:t});class Zt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yt=Kt(class extends Zt{constructor(i){var t;if(super(i),i.type!==Ft.ATTRIBUTE||i.name!=="class"||((t=i.strings)===null||t===void 0?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(t=>i[t]).join(" ")+" "}update(i,[t]){var e,s;if(this.nt===void 0){this.nt=new Set,i.strings!==void 0&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in t)t[n]&&!(!((e=this.st)===null||e===void 0)&&e.has(n))&&this.nt.add(n);return this.render(t)}const r=i.element.classList;this.nt.forEach(n=>{n in t||(r.remove(n),this.nt.delete(n))});for(const n in t){const o=!!t[n];o===this.nt.has(n)||((s=this.st)===null||s===void 0?void 0:s.has(n))||(o?(r.add(n),this.nt.add(n)):(r.remove(n),this.nt.delete(n)))}return g}});var A=(i=>(i.String="string",i.Number="number",i.Boolean="boolean",i.Object="object",i.Null="null",i.Array="array",i))(A||{});function Gt(i){return i instanceof RegExp}function Z(i){return i===null?A.Null:Array.isArray(i)?A.Array:i.constructor.name.toLowerCase()}function Et(i){return i!==Object(i)}function St(i){return!!i&&!!i.nodeType}function W(i){return Et(i)||St(i)}function Qt(i,{nodeCount:t=3,maxLength:e=15}={}){const s=Array.isArray(i),r=Object.keys(i),n=r.slice(0,t),o=[],h=u=>{switch(Z(u)){case A.Object:return Object.keys(u).length===0?"{ }":"{ ... }";case A.Array:return u.length===0?"[ ]":"[ ... ]";case A.String:return`"${u.substring(0,e)}${u.length>e?"...":""}"`;default:return String(u)}},l=[];for(const u of n){const c=[],d=i[u];s||c.push(`${u}: `),c.push(h(d)),l.push(c.join(""))}r.length>t&&l.push("..."),o.push(l.join(", "));const a=o.join("");return s?`[ ${a} ]`:`{ ${a} }`}function*et(i){const t=[[i,"",[]]];for(;t.length;){const[e,s,r]=t.shift();if(s&&(yield[e,s,r]),!Et(e))for(const[n,o]of Object.entries(e))t.push([o,`${s}${s?".":""}${n}`,[...r,s]])}}function Xt(i,t){const e=i.split("."),s=t.split("."),r=l=>l==="*",n=l=>l==="**";let o=0,h=0;for(;o<e.length;){const l=s[h],a=e[o];if(l===a||r(l))h++,o++;else if(n(l))h++,o=e.length-(s.length-h);else return!1}return h===s.length}const te={fromAttribute:i=>i&&i.trim()?JSON.parse(i):void 0,toAttribute:i=>JSON.stringify(i)},Y=i=>i!==void 0,wt=(i,t)=>Gt(t)?!!i.match(t):Xt(i,t),ee=(i,t)=>e=>({expanded:{...e.expanded,[i]:Y(t)?!!t:!e.expanded[i]}}),H=(i,t)=>(e,s)=>{const r={};if(i)for(const[,n,o]of et(s.data))wt(n,i)&&(r[n]=t,o.forEach(h=>r[h]=t));return{expanded:r}},se=i=>(t,e)=>{const s={};if(i)for(const[,r,n]of et(e.data))wt(r,i)?(s[r]=!1,n.forEach(o=>s[o]=!1)):s[r]=!0;return{filtered:s}},ie=()=>()=>({filtered:{}}),ft=i=>()=>({highlight:i}),re=kt`
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
`;var ne=Object.defineProperty,oe=Object.getOwnPropertyDescriptor,Ct=(i,t,e,s)=>{for(var r=s>1?void 0:s?oe(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&ne(t,e,r),r};class z extends P{constructor(){super(...arguments),this.state={expanded:{},filtered:{},highlight:null},this.handlePropertyClick=t=>e=>{e.preventDefault(),this.setState(ee(t))}}async setState(t){const e=this.state;this.state={...e,...t(e,this)}}connectedCallback(){!this.hasAttribute("data")&&!Y(this.data)&&this.setAttribute("data",this.innerText),super.connectedCallback()}expand(t){this.setState(H(t,!0))}expandAll(){this.setState(H("**",!0))}collapseAll(){this.setState(H("**",!1))}collapse(t){this.setState(H(t,!1))}*search(t){for(const[e,s]of et(this.data))W(e)&&String(e).includes(t)&&(this.expand(s),this.updateComplete.then(()=>{const r=this.shadowRoot.querySelector(`[data-path="${s}"]`);r.scrollIntoView({behavior:"smooth",inline:"center",block:"center"}),r.focus()}),this.setState(ft(s)),yield{value:e,path:s});this.setState(ft(null))}filter(t){this.setState(se(t))}resetFilter(){this.setState(ie())}renderObject(t,e){return C`
            <ul part="object">
                ${Object.keys(t).map(s=>{const r=t[s],n=e?`${e}.${s}`:s,o=W(r);return C`
                        <li part="property" data-path="${n}" .hidden="${this.state.filtered[n]}">
                            <span
                                part="key"
                                class="${Yt({key:s,collapsable:!o,collapsableCollapsed:!this.state.expanded[n]})}"
                                @click="${o?null:this.handlePropertyClick(n)}"
                            >
                                ${s}:
                            </span>
                            ${this.renderNode(r,n)}
                        </li>
                    `})}
            </ul>
        `}renderNode(t,e=""){const s=W(t);return!e||this.state.expanded[e]||s?s?this.renderPrimitive(t,e):this.renderObject(t,e):this.renderNodePreview(t)}renderNodePreview(t){return C` <span part="preview" class="preview"> ${Qt(t)} </span> `}renderPrimitive(t,e){const s=this.state.highlight,r=Z(t),n=St(t)?t:C` <span part="primitive primitive-${r}" tabindex="0" class="${Z(t)}">${JSON.stringify(t)}</span> `;return e===s?C`<mark part="highlight">${n}</mark>`:n}render(){const t=this.data;return Y(t)?this.renderNode(t):null}}z.styles=[re];Ct([bt({converter:te,type:Object})],z.prototype,"data",2);Ct([Wt()],z.prototype,"state",2);customElements.define("json-viewer",z);const Pt=Comlink.wrap(new Worker("/json-viewer/assets/worker.0602bd76.js")),le=document.querySelector("#json"),m=document.querySelector("json-viewer"),ae=document.querySelector("#toggle-panel"),xt=document.querySelector("#container"),$t=document.querySelector("#loader"),ce=document.querySelector("#expand"),he=document.querySelector("#collapse"),F=document.querySelector("#filter"),G=document.querySelector("#search");let Q;ce.addEventListener("click",i=>{i.preventDefault(),m.expandAll()});he.addEventListener("click",i=>{i.preventDefault(),m.collapseAll()});F.addEventListener("sl-change",()=>{F.value?m.filter(F.value):m.resetFilter()});G.addEventListener("sl-input",()=>{Q=m.search(G.value)});G.addEventListener("keyup",i=>{Q&&i.keyCode===13&&Q.next()});const de=(i,t=500)=>{let e;return(...s)=>{clearTimeout(e),e=setTimeout(()=>i(...s),t)}},ue=i=>{try{m.data=JSON.parse(i)}catch(t){m.data=t.message}},Nt=()=>{const i=st.getValue();$t.hidden=!1,Promise.all([ue(i),Pt.crush(i).then(t=>{location.hash=t})]).then(()=>{$t.hidden=!0})},st=CodeMirror.fromTextArea(le,{mode:{name:"javascript",json:!0},lineNumbers:!0,theme:"jsv",styleActiveLine:!0,lint:{esversion:6}});ae.addEventListener("click",()=>{xt.classList.toggle("collapsed")});st.on("change",de(Nt));Pt.uncrush(location.hash.slice(1)).then(i=>{i?(st.setValue(i),xt.classList.add("collapsed")):Nt()});
