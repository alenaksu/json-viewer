(function(){"use strict";importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");const C=(r,e=50)=>{for(var c=[],t=127;--t;)(48<=t&&57>=t||65<=t&&90>=t||97<=t&&122>=t||"-_.!~*'()".includes(String.fromCharCode(t)))&&c.push(String.fromCharCode(t));for(t=32;255>t;++t){var s=String.fromCharCode(t);s=="\\"||c.includes(s)||c.unshift(s)}r=r.replace(/\u0001/g,""),r=d(r),t=c.length,s="";for(var n={},i=2;i<e;i++)for(var p=0;p<r.length-i;++p){var o=r.substr(p,i);if(!n[o]){var u=o.charCodeAt(0),f=o.charCodeAt(o.length-1);if(!(u=56320<=u&&57343>=u||55296<=f&&56319>=f)){for(u=1,f=r.indexOf(o,p+i);0<=f;++u)f=r.indexOf(o,f+i);1<u&&(n[o]=u)}}}for(;;){for(;t--&&r.includes(c[t]););if(0>t)break;e=c[t];var l=void 0;i=0,p=encodeURI(encodeURIComponent(e)).replace(/%../g,"i").length;for(let g in n)o=((o=n[g])-1)*encodeURI(encodeURIComponent(g)).replace(/%../g,"i").length-(o+1)*p,s.length||(o-=encodeURI(encodeURIComponent("")).replace(/%../g,"i").length),0>=o?delete n[g]:o>i&&(l=g,i=o);if(!l)break;r=r.split(l).join(e)+e+l,s=e+s,i={};for(let g in n){for(n=g.split(l).join(e),p=0,o=r.indexOf(n);0<=o;++p)o=r.indexOf(n,o+n.length);1<p&&(i[n]=p)}n=i}return l=r,(c=s).length&&(l+=""+c),encodeURIComponent(l+"_")},a=r=>{var e=(r=r.substring(0,r.length-1)).split("");if(r=e[0],1<e.length){e=e[1];for(let c of e)r=(r=r.split(c)).join(r.pop())}return d(r,0)},d=(r,e=1)=>{const c=[['"',"'"],["':","!"],[",'","~"],["}",")","\\","\\"],["{","(","\\","\\"]],t=(s,n)=>s.replace(new RegExp(`${(n[2]?n[2]:"")+n[0]}|${(n[3]?n[3]:"")+n[1]}`,"g"),i=>i===n[0]?n[1]:n[0]);if(e)for(e=0;e<c.length;++e)r=t(r,c[e]);else for(e=c.length;e--;)r=t(r,c[e]);return r};Comlink.expose({crush:C,uncrush:r=>a(decodeURIComponent(r))})})();
