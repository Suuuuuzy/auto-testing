function utils(){const e=new Map;function t(t,r,i){i||(i=e),i.has(t)||i.set(t,{originWxMethods:{},originWxMethodsGetterMap:{},originWxMethodsValMap:{}});const{originWxMethods:n,originWxMethodsGetterMap:o,originWxMethodsValMap:s}=i.get(t),l=Object.getOwnPropertyDescriptor(t,r);let u=!1;if(n[r])o[r]&&(u=!0);else{let e,i=!1;l?l.get?(u=!0,e=l.get):(i=!0,e=l.value):e=t[r],e&&(s[r]=i,o[r]=u,n[r]=e)}return u?n[r]():n[r]}global.__minium__.restoreMethod=function(t,r,i){if(i||(i=e),!i.has(t))return;const{originWxMethods:n,originWxMethodsGetterMap:o}=i.get(t);if(!n[r])return;Object.getOwnPropertyDescriptor(t,r)?o[r]?Object.defineProperty(t,r,{get:n[r]}):Object.defineProperty(t,r,{value:n[r]}):t[r]=n[r],delete n[r]},global.__minium__.replaceMethod=function(r,i,n,o){o||(o=e),o.has(r)||o.set(r,{originWxMethods:{},originWxMethodsGetterMap:{},originWxMethodsValMap:{}});const{originWxMethods:s}=o.get(r),l=Object.getOwnPropertyDescriptor(r,i);s[i]||t(r,i,o),l?Object.defineProperty(r,i,{get:()=>n}):r[i]=n},global.__minium__.getSrcMethod=function(t,r,i){if(i||(i=e),!i.has(t))return;const{originWxMethods:n,originWxMethodsGetterMap:o}=i.get(t);return o[r]?n[r]():n[r]},global.__minium__.setSrcMethod=t,global.__minium__.defineMethod=function(e,t,r){const i=Object.getOwnPropertyDescriptor(e,t);i?i.get?Object.defineProperty(e,t,{get:()=>r}):Object.defineProperty(e,t,{value:r}):e[t]=r};const r=new Map;class i{static isRuleMatched(e,t){if(typeof e!=typeof t)return!1;switch(typeof e){case"string":if(e===t)return!0;"*"===e&&(e=".*");try{return!!new RegExp(e).exec(t)}catch(e){return!1}case"number":return e===t;case"object":if(e instanceof Array){if(e.length!=t.length)return!1;for(var r=0;r<e.length;r++)if(!i.isRuleMatched(e[r],t[r]))return!1;return!0}for(var n in e)if("success"!=n&&"fail"!=n&&"complete"!=n&&"_miniMockType"!=n){if(void 0===t[n])return!1;if(!i.isRuleMatched(e[n],t[n]))return!1}return!0}return!1}constructor(e){r.has(e)||r.set(e,[]),this.rule_list=r.get(e)}length(){return this.rule_list.length}clean(){this.rule_list.splice(0)}push(e){this.rule_list.push(e)}unshift(e){this.rule_list.unshift(e)}pick(e){return this.rule_list.splice(e,1)[0]}search(...e){for(let o of e)for(var t=0,r=this.rule_list.length;t<r;t++){var n=this.rule_list[t];if(i.isRuleMatched(n,o))return 1===n._miniMockType&&(n=this.pick(t)),n}return null}}global.__minium__.MockRule=i,global.__minium__.bind=function(e,t,...r){return function(...i){return e.apply(t,r.concat(i))}}}