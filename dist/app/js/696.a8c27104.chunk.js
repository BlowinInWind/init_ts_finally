(self.webpackChunkinit_ts_new=self.webpackChunkinit_ts_new||[]).push([[696],{717:(e,n,t)=>{"use strict";t.d(n,{Z:()=>i});var r=t(8363);var l=t(1446),u=t(9996);var c=t(8597);function i(e,n){return function(e){if(r(e))return e}(e)||function(e,n){var t=null==e?null:void 0!==l&&u(e)||e["@@iterator"];if(null!=t){var r,c,i=[],a=!0,o=!1;try{for(t=t.call(e);!(a=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);a=!0);}catch(e){o=!0,c=e}finally{try{a||null==t.return||t.return()}finally{if(o)throw c}}return i}}(e,n)||(0,c.Z)(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},3696:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>d});var r=t(717),l=t(2991),u=t.n(l),c=t(7294),i=function(){return c.createElement("div",null,"Component1")},a=function(){return c.createElement("div",null,"Component2")},o=function(e){var n,t=e.children,r=e.current;return u()(n=c.Children).call(n,t,(function(e){return c.cloneElement(e,{current:r})}))},f=function(e){var n=(0,c.useState)(!1),t=(0,r.Z)(n,2),l=t[0],u=t[1];return(0,c.useEffect)((function(){e.index===e.current&&u(!0)}),[e.current]),c.createElement("div",{style:{display:e.index===e.current?"block":"none"}},l&&e.children)};const d=function(){var e=(0,c.useState)(0),n=(0,r.Z)(e,2),t=n[0],l=n[1];return c.createElement("div",null,c.createElement("div",null,c.createElement("button",{onClick:function(){l(0)}},"com1"),c.createElement("button",{onClick:function(){l(1)}},"com2")),c.createElement(o,{current:t},c.createElement(f,{index:0},c.createElement(i,null)),c.createElement(f,{index:1},c.createElement(a,null))))}}}]);