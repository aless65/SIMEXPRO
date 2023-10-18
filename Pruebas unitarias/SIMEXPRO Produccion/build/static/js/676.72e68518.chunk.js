"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[676],{50676:function(e,t,s){s.d(t,{Z:function(){return G}});var a=s(63366),n=s(87462),r=s(47313),c=s(60792);function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.baseClasses,s=e.newClasses;e.Component;if(!s)return t;var a=(0,n.Z)({},t);return Object.keys(s).forEach((function(e){s[e]&&(a[e]="".concat(t[e]," ").concat(s[e]))})),a}var i={set:function(e,t,s,a){var n=e.get(t);n||(n=new Map,e.set(t,n)),n.set(s,a)},get:function(e,t,s){var a=e.get(t);return a?a.get(s):void 0},delete:function(e,t,s){e.get(t).delete(s)}},l=s(20201),u=s(94947),f=["checked","disabled","error","focused","focusVisible","required","expanded","selected"];var h=s(28728),v=s(50),d=s(2359),m=s(39553),p=s(83017),y=s(81293),C=s(53875);s(46417);var S=(0,c.Ue)({plugins:[(0,h.Z)(),(0,v.Z)(),(0,d.Z)(),(0,m.Z)(),(0,p.Z)(),"undefined"===typeof window?null:(0,y.Z)(),(0,C.Z)()]}),g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.disableGlobal,s=void 0!==t&&t,a=e.productionPrefix,n=void 0===a?"jss":a,r=e.seed,c=void 0===r?"":r,o=""===c?"":"".concat(c,"-"),i=0,l=function(){return i+=1};return function(e,t){var a=t.options.name;if(a&&0===a.indexOf("Mui")&&!t.options.link&&!s){if(-1!==f.indexOf(e.key))return"Mui-".concat(e.key);var r="".concat(o).concat(a,"-").concat(e.key);return t.options.theme[u.Z]&&""===c?"".concat(r,"-").concat(l()):r}return"".concat(o).concat(n).concat(l())}}(),Z={disableGeneration:!1,generateClassName:g,jss:S,sheetsCache:null,sheetsManager:new Map,sheetsRegistry:null},b=r.createContext(Z);var k=-1e9;var O=s(13019),w=s(50114),x=["variant"];function M(e){return 0===e.length}function j(e){var t="function"===typeof e;return{create:function(s,r){var c;try{c=t?e(s):e}catch(u){throw u}if(!r||!s.components||!s.components[r]||!s.components[r].styleOverrides&&!s.components[r].variants)return c;var o=s.components[r].styleOverrides||{},i=s.components[r].variants||[],l=(0,n.Z)({},c);return Object.keys(o).forEach((function(e){l[e]=(0,O.Z)(l[e]||{},o[e])})),i.forEach((function(e){var t=function(e){var t=e.variant,s=(0,a.Z)(e,x),n=t||"";return Object.keys(s).sort().forEach((function(t){n+="color"===t?M(n)?e[t]:(0,w.Z)(e[t]):"".concat(M(n)?t:(0,w.Z)(t)).concat((0,w.Z)(e[t].toString()))})),n}(e.props);l[t]=(0,O.Z)(l[t]||{},e.style)})),l},options:{}}}var P={},E=["name","classNamePrefix","Component","defaultTheme"];function G(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=t.name,u=t.classNamePrefix,f=t.Component,h=t.defaultTheme,v=void 0===h?P:h,d=(0,a.Z)(t,E),m=j(e),p=s||u||"makeStyles";m.options={index:k+=1,name:s,meta:p,classNamePrefix:p};return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(0,l.Z)()||v,a=(0,n.Z)({},r.useContext(b),d),u=r.useRef(),h=r.useRef();!function(e,t){var s,a=r.useRef([]),n=r.useMemo((function(){return{}}),t);a.current!==n&&(a.current=n,s=e()),r.useEffect((function(){return function(){s&&s()}}),[n])}((function(){var r={name:s,state:{},stylesCreator:m,stylesOptions:a,theme:t};return function(e,t){var s=e.state,a=e.theme,r=e.stylesOptions,l=e.stylesCreator,u=e.name;if(!r.disableGeneration){var f=i.get(r.sheetsManager,l,a);f||(f={refs:0,staticSheet:null,dynamicStyles:null},i.set(r.sheetsManager,l,a,f));var h=(0,n.Z)({},l.options,r,{theme:a,flip:"boolean"===typeof r.flip?r.flip:"rtl"===a.direction});h.generateId=h.serverGenerateClassName||h.generateClassName;var v=r.sheetsRegistry;if(0===f.refs){var d;r.sheetsCache&&(d=i.get(r.sheetsCache,l,a));var m=l.create(a,u);d||((d=r.jss.createStyleSheet(m,(0,n.Z)({link:!1},h))).attach(),r.sheetsCache&&i.set(r.sheetsCache,l,a,d)),v&&v.add(d),f.staticSheet=d,f.dynamicStyles=(0,c._$)(m)}if(f.dynamicStyles){var p=r.jss.createStyleSheet(f.dynamicStyles,(0,n.Z)({link:!0},h));p.update(t),p.attach(),s.dynamicSheet=p,s.classes=o({baseClasses:f.staticSheet.classes,newClasses:p.classes}),v&&v.add(p)}else s.classes=f.staticSheet.classes;f.refs+=1}}(r,e),h.current=!1,u.current=r,function(){!function(e){var t=e.state,s=e.theme,a=e.stylesOptions,n=e.stylesCreator;if(!a.disableGeneration){var r=i.get(a.sheetsManager,n,s);r.refs-=1;var c=a.sheetsRegistry;0===r.refs&&(i.delete(a.sheetsManager,n,s),a.jss.removeStyleSheet(r.staticSheet),c&&c.remove(r.staticSheet)),t.dynamicSheet&&(a.jss.removeStyleSheet(t.dynamicSheet),c&&c.remove(t.dynamicSheet))}}(r)}}),[t,m]),r.useEffect((function(){h.current&&function(e,t){var s=e.state;s.dynamicSheet&&s.dynamicSheet.update(t)}(u.current,e),h.current=!0}));var p=function(e,t,s){var a=e.state;if(e.stylesOptions.disableGeneration)return t||{};a.cacheClasses||(a.cacheClasses={value:null,lastProp:null,lastJSS:{}});var n=!1;return a.classes!==a.cacheClasses.lastJSS&&(a.cacheClasses.lastJSS=a.classes,n=!0),t!==a.cacheClasses.lastProp&&(a.cacheClasses.lastProp=t,n=!0),n&&(a.cacheClasses.value=o({baseClasses:a.cacheClasses.lastJSS,newClasses:t,Component:s})),a.cacheClasses.value}(u.current,e.classes,f);return p}}}}]);