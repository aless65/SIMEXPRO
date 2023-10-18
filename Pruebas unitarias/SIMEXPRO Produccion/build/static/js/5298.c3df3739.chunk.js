"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[5298],{25298:function(e,t,n){n.d(t,{Z:function(){return Y}});var o=n(4942),r=n(63366),a=n(87462),i=n(47313),l=n(83061),c=n(21921),u=n(29439),p=n(33362),s=n(10782),d=n(42780),f=n(89265);function v(e){return"undefined"!==typeof e.normalize?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}function g(e,t){for(var n=0;n<e.length;n+=1)if(t(e[n]))return n;return-1}var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ignoreAccents,n=void 0===t||t,o=e.ignoreCase,r=void 0===o||o,a=e.limit,i=e.matchFrom,l=void 0===i?"any":i,c=e.stringify,u=e.trim,p=void 0!==u&&u;return function(e,t){var o=t.inputValue,i=t.getOptionLabel,u=p?o.trim():o;r&&(u=u.toLowerCase()),n&&(u=v(u));var s=e.filter((function(e){var t=(c||i)(e);return r&&(t=t.toLowerCase()),n&&(t=v(t)),"start"===l?0===t.indexOf(u):t.indexOf(u)>-1}));return"number"===typeof a?s.slice(0,a):s}}();function m(e){var t,n=e.autoComplete,o=void 0!==n&&n,r=e.autoHighlight,l=void 0!==r&&r,c=e.autoSelect,v=void 0!==c&&c,m=e.blurOnSelect,b=void 0!==m&&m,x=e.clearOnBlur,Z=void 0===x?!e.freeSolo:x,O=e.clearOnEscape,y=void 0!==O&&O,I=e.componentName,P=void 0===I?"useAutocomplete":I,C=e.defaultValue,S=void 0===C?e.multiple?[]:null:C,w=e.disableClearable,k=void 0!==w&&w,A=e.disableCloseOnSelect,L=void 0!==A&&A,R=e.disabled,T=e.disabledItemsFocusable,M=void 0!==T&&T,D=e.disableListWrap,N=void 0!==D&&D,E=e.filterOptions,F=void 0===E?h:E,z=e.filterSelectedOptions,j=void 0!==z&&z,H=e.freeSolo,W=void 0!==H&&H,V=e.getOptionDisabled,q=e.getOptionLabel,B=void 0===q?function(e){var t;return null!=(t=e.label)?t:e}:q,K=e.groupBy,U=e.handleHomeEndKeys,G=void 0===U?!e.freeSolo:U,_=e.id,J=e.includeInputInList,Q=void 0!==J&&J,X=e.inputValue,Y=e.isOptionEqualToValue,$=void 0===Y?function(e,t){return e===t}:Y,ee=e.multiple,te=void 0!==ee&&ee,ne=e.onChange,oe=e.onClose,re=e.onHighlightChange,ae=e.onInputChange,ie=e.onOpen,le=e.open,ce=e.openOnFocus,ue=void 0!==ce&&ce,pe=e.options,se=e.readOnly,de=void 0!==se&&se,fe=e.selectOnFocus,ve=void 0===fe?!e.freeSolo:fe,ge=e.value,he=(0,p.Z)(_);t=function(e){var t=B(e);return"string"!==typeof t?String(t):t};var me=i.useRef(!1),be=i.useRef(!0),xe=i.useRef(null),Ze=i.useRef(null),Oe=i.useState(null),ye=(0,u.Z)(Oe,2),Ie=ye[0],Pe=ye[1],Ce=i.useState(-1),Se=(0,u.Z)(Ce,2),we=Se[0],ke=Se[1],Ae=l?0:-1,Le=i.useRef(Ae),Re=(0,s.Z)({controlled:ge,default:S,name:P}),Te=(0,u.Z)(Re,2),Me=Te[0],De=Te[1],Ne=(0,s.Z)({controlled:X,default:"",name:P,state:"inputValue"}),Ee=(0,u.Z)(Ne,2),Fe=Ee[0],ze=Ee[1],je=i.useState(!1),He=(0,u.Z)(je,2),We=He[0],Ve=He[1],qe=i.useCallback((function(e,n){if((te?Me.length<n.length:null!==n)||Z){var o;if(te)o="";else if(null==n)o="";else{var r=t(n);o="string"===typeof r?r:""}Fe!==o&&(ze(o),ae&&ae(e,o,"reset"))}}),[t,Fe,te,ae,ze,Z,Me]),Be=i.useRef();i.useEffect((function(){var e=Me!==Be.current;Be.current=Me,We&&!e||W&&!e||qe(null,Me)}),[Me,qe,We,Be,W]);var Ke=(0,s.Z)({controlled:le,default:!1,name:P,state:"open"}),Ue=(0,u.Z)(Ke,2),Ge=Ue[0],_e=Ue[1],Je=i.useState(!0),Qe=(0,u.Z)(Je,2),Xe=Qe[0],Ye=Qe[1],$e=!te&&null!=Me&&Fe===t(Me),et=Ge&&!de,tt=et?F(pe.filter((function(e){return!j||!(te?Me:[Me]).some((function(t){return null!==t&&$(e,t)}))})),{inputValue:$e&&Xe?"":Fe,getOptionLabel:t}):[],nt=Ge&&tt.length>0&&!de,ot=(0,d.Z)((function(e){-1===e?xe.current.focus():Ie.querySelector('[data-tag-index="'.concat(e,'"]')).focus()}));i.useEffect((function(){te&&we>Me.length-1&&(ke(-1),ot(-1))}),[Me,te,we,ot]);var rt=(0,d.Z)((function(e){var t=e.event,n=e.index,o=e.reason,r=void 0===o?"auto":o;if(Le.current=n,-1===n?xe.current.removeAttribute("aria-activedescendant"):xe.current.setAttribute("aria-activedescendant","".concat(he,"-option-").concat(n)),re&&re(t,-1===n?null:tt[n],r),Ze.current){var a=Ze.current.querySelector('[role="option"].Mui-focused');a&&(a.classList.remove("Mui-focused"),a.classList.remove("Mui-focusVisible"));var i=Ze.current.parentElement.querySelector('[role="listbox"]');if(i)if(-1!==n){var l=Ze.current.querySelector('[data-option-index="'.concat(n,'"]'));if(l&&(l.classList.add("Mui-focused"),"keyboard"===r&&l.classList.add("Mui-focusVisible"),i.scrollHeight>i.clientHeight&&"mouse"!==r)){var c=l,u=i.clientHeight+i.scrollTop,p=c.offsetTop+c.offsetHeight;p>u?i.scrollTop=p-i.clientHeight:c.offsetTop-c.offsetHeight*(K?1.3:0)<i.scrollTop&&(i.scrollTop=c.offsetTop-c.offsetHeight*(K?1.3:0))}}else i.scrollTop=0}})),at=(0,d.Z)((function(e){var n=e.event,r=e.diff,a=e.direction,i=void 0===a?"next":a,l=e.reason,c=void 0===l?"auto":l;if(et){var u=function(e,t){if(!Ze.current||-1===e)return-1;for(var n=e;;){if("next"===t&&n===tt.length||"previous"===t&&-1===n)return-1;var o=Ze.current.querySelector('[data-option-index="'.concat(n,'"]')),r=!M&&(!o||o.disabled||"true"===o.getAttribute("aria-disabled"));if(!(o&&!o.hasAttribute("tabindex")||r))return n;n+="next"===t?1:-1}}(function(){var e=tt.length-1;if("reset"===r)return Ae;if("start"===r)return 0;if("end"===r)return e;var t=Le.current+r;return t<0?-1===t&&Q?-1:N&&-1!==Le.current||Math.abs(r)>1?0:e:t>e?t===e+1&&Q?-1:N||Math.abs(r)>1?e:0:t}(),i);if(rt({index:u,reason:c,event:n}),o&&"reset"!==r)if(-1===u)xe.current.value=Fe;else{var p=t(tt[u]);xe.current.value=p,0===p.toLowerCase().indexOf(Fe.toLowerCase())&&Fe.length>0&&xe.current.setSelectionRange(Fe.length,p.length)}}})),it=i.useCallback((function(){if(et){var e=te?Me[0]:Me;if(0!==tt.length&&null!=e){if(Ze.current)if(null==e)Le.current>=tt.length-1?rt({index:tt.length-1}):rt({index:Le.current});else{var t=tt[Le.current];if(te&&t&&-1!==g(Me,(function(e){return $(t,e)})))return;var n=g(tt,(function(t){return $(t,e)}));-1===n?at({diff:"reset"}):rt({index:n})}}else at({diff:"reset"})}}),[tt.length,!te&&Me,j,at,rt,et,Fe,te]),lt=(0,d.Z)((function(e){(0,f.Z)(Ze,e),e&&it()}));i.useEffect((function(){it()}),[it]);var ct=function(e){Ge||(_e(!0),Ye(!0),ie&&ie(e))},ut=function(e,t){Ge&&(_e(!1),oe&&oe(e,t))},pt=function(e,t,n,o){if(te){if(Me.length===t.length&&Me.every((function(e,n){return e===t[n]})))return}else if(Me===t)return;ne&&ne(e,t,n,o),De(t)},st=i.useRef(!1),dt=function(e,t){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"options",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"selectOption",r=t;if(te){var a=g(r=Array.isArray(Me)?Me.slice():[],(function(e){return $(t,e)}));-1===a?r.push(t):"freeSolo"!==n&&(r.splice(a,1),o="removeOption")}qe(e,r),pt(e,r,o,{option:t}),L||e&&(e.ctrlKey||e.metaKey)||ut(e,o),(!0===b||"touch"===b&&st.current||"mouse"===b&&!st.current)&&xe.current.blur()};var ft=function(e,t){if(te){""===Fe&&ut(e,"toggleInput");var n=we;-1===we?""===Fe&&"previous"===t&&(n=Me.length-1):((n+="next"===t?1:-1)<0&&(n=0),n===Me.length&&(n=-1)),n=function(e,t){if(-1===e)return-1;for(var n=e;;){if("next"===t&&n===Me.length||"previous"===t&&-1===n)return-1;var o=Ie.querySelector('[data-tag-index="'.concat(n,'"]'));if(o&&o.hasAttribute("tabindex")&&!o.disabled&&"true"!==o.getAttribute("aria-disabled"))return n;n+="next"===t?1:-1}}(n,t),ke(n),ot(n)}},vt=function(e){me.current=!0,ze(""),ae&&ae(e,"","clear"),pt(e,te?[]:null,"clear")},gt=function(e){return function(t){if(e.onKeyDown&&e.onKeyDown(t),!t.defaultMuiPrevented&&(-1!==we&&-1===["ArrowLeft","ArrowRight"].indexOf(t.key)&&(ke(-1),ot(-1)),229!==t.which))switch(t.key){case"Home":et&&G&&(t.preventDefault(),at({diff:"start",direction:"next",reason:"keyboard",event:t}));break;case"End":et&&G&&(t.preventDefault(),at({diff:"end",direction:"previous",reason:"keyboard",event:t}));break;case"PageUp":t.preventDefault(),at({diff:-5,direction:"previous",reason:"keyboard",event:t}),ct(t);break;case"PageDown":t.preventDefault(),at({diff:5,direction:"next",reason:"keyboard",event:t}),ct(t);break;case"ArrowDown":t.preventDefault(),at({diff:1,direction:"next",reason:"keyboard",event:t}),ct(t);break;case"ArrowUp":t.preventDefault(),at({diff:-1,direction:"previous",reason:"keyboard",event:t}),ct(t);break;case"ArrowLeft":ft(t,"previous");break;case"ArrowRight":ft(t,"next");break;case"Enter":if(-1!==Le.current&&et){var n=tt[Le.current],r=!!V&&V(n);if(t.preventDefault(),r)return;dt(t,n,"selectOption"),o&&xe.current.setSelectionRange(xe.current.value.length,xe.current.value.length)}else W&&""!==Fe&&!1===$e&&(te&&t.preventDefault(),dt(t,Fe,"createOption","freeSolo"));break;case"Escape":et?(t.preventDefault(),t.stopPropagation(),ut(t,"escape")):y&&(""!==Fe||te&&Me.length>0)&&(t.preventDefault(),t.stopPropagation(),vt(t));break;case"Backspace":if(te&&!de&&""===Fe&&Me.length>0){var a=-1===we?Me.length-1:we,i=Me.slice();i.splice(a,1),pt(t,i,"removeOption",{option:Me[a]})}}}},ht=function(e){Ve(!0),ue&&!me.current&&ct(e)},mt=function(e){null!==Ze.current&&Ze.current.parentElement.contains(document.activeElement)?xe.current.focus():(Ve(!1),be.current=!0,me.current=!1,v&&-1!==Le.current&&et?dt(e,tt[Le.current],"blur"):v&&W&&""!==Fe?dt(e,Fe,"blur","freeSolo"):Z&&qe(e,Me),ut(e,"blur"))},bt=function(e){var t=e.target.value;Fe!==t&&(ze(t),Ye(!1),ae&&ae(e,t,"input")),""===t?k||te||pt(e,null,"clear"):ct(e)},xt=function(e){rt({event:e,index:Number(e.currentTarget.getAttribute("data-option-index")),reason:"mouse"})},Zt=function(){st.current=!0},Ot=function(e){var t=Number(e.currentTarget.getAttribute("data-option-index"));dt(e,tt[t],"selectOption"),st.current=!1},yt=function(e){return function(t){var n=Me.slice();n.splice(e,1),pt(t,n,"removeOption",{option:Me[e]})}},It=function(e){Ge?ut(e,"toggleInput"):ct(e)},Pt=function(e){e.target.getAttribute("id")!==he&&e.preventDefault()},Ct=function(){xe.current.focus(),ve&&be.current&&xe.current.selectionEnd-xe.current.selectionStart===0&&xe.current.select(),be.current=!1},St=function(e){""!==Fe&&Ge||It(e)},wt=W&&Fe.length>0;wt=wt||(te?Me.length>0:null!==Me);var kt=tt;if(K){new Map;kt=tt.reduce((function(e,t,n){var o=K(t);return e.length>0&&e[e.length-1].group===o?e[e.length-1].options.push(t):e.push({key:n,index:n,group:o,options:[t]}),e}),[])}return R&&We&&mt(),{getRootProps:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.Z)({"aria-owns":nt?"".concat(he,"-listbox"):null},e,{onKeyDown:gt(e),onMouseDown:Pt,onClick:Ct})},getInputLabelProps:function(){return{id:"".concat(he,"-label"),htmlFor:he}},getInputProps:function(){return{id:he,value:Fe,onBlur:mt,onFocus:ht,onChange:bt,onMouseDown:St,"aria-activedescendant":et?"":null,"aria-autocomplete":o?"both":"list","aria-controls":nt?"".concat(he,"-listbox"):void 0,"aria-expanded":nt,autoComplete:"off",ref:xe,autoCapitalize:"none",spellCheck:"false",role:"combobox"}},getClearProps:function(){return{tabIndex:-1,onClick:vt}},getPopupIndicatorProps:function(){return{tabIndex:-1,onClick:It}},getTagProps:function(e){var t=e.index;return(0,a.Z)({key:t,"data-tag-index":t,tabIndex:-1},!de&&{onDelete:yt(t)})},getListboxProps:function(){return{role:"listbox",id:"".concat(he,"-listbox"),"aria-labelledby":"".concat(he,"-label"),ref:lt,onMouseDown:function(e){e.preventDefault()}}},getOptionProps:function(e){var n=e.index,o=e.option,r=(te?Me:[Me]).some((function(e){return null!=e&&$(o,e)})),a=!!V&&V(o);return{key:t(o),tabIndex:-1,role:"option",id:"".concat(he,"-option-").concat(n),onMouseOver:xt,onClick:Ot,onTouchStart:Zt,"data-option-index":n,"aria-disabled":a,"aria-selected":r}},id:he,inputValue:Fe,value:Me,dirty:wt,popupOpen:et,focused:We||-1!==we,anchorEl:Ie,setAnchorEl:Pe,focusedTag:we,groupedOptions:kt}}var b=n(17551),x=n(61377),Z=n(58800),O=n(82295),y=n(47131),I=n(66212),P=n(79783),C=n(17569),S=n(40708),w=n(73201),k=n(54750),A=n(46417),L=(0,k.Z)((0,A.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),R=n(6613),T=n(77342),M=n(88564),D=n(32298);function N(e){return(0,D.Z)("MuiAutocomplete",e)}var E,F,z=(0,n(77430).Z)("MuiAutocomplete",["root","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]),j=n(91615),H=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","value"],W=(0,M.ZP)("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState,r=n.fullWidth,a=n.hasClearIcon,i=n.hasPopupIcon,l=n.inputFocused,c=n.size;return[(0,o.Z)({},"& .".concat(z.tag),t.tag),(0,o.Z)({},"& .".concat(z.tag),t["tagSize".concat((0,j.Z)(c))]),(0,o.Z)({},"& .".concat(z.inputRoot),t.inputRoot),(0,o.Z)({},"& .".concat(z.input),t.input),(0,o.Z)({},"& .".concat(z.input),l&&t.inputFocused),t.root,r&&t.fullWidth,i&&t.hasPopupIcon,a&&t.hasClearIcon]}})((function(e){var t,n,r,i,l,c=e.ownerState;return(0,a.Z)((t={},(0,o.Z)(t,"&.".concat(z.focused," .").concat(z.clearIndicator),{visibility:"visible"}),(0,o.Z)(t,"@media (pointer: fine)",(0,o.Z)({},"&:hover .".concat(z.clearIndicator),{visibility:"visible"})),t),c.fullWidth&&{width:"100%"},(l={},(0,o.Z)(l,"& .".concat(z.tag),(0,a.Z)({margin:3,maxWidth:"calc(100% - 6px)"},"small"===c.size&&{margin:2,maxWidth:"calc(100% - 4px)"})),(0,o.Z)(l,"& .".concat(z.inputRoot),(n={flexWrap:"wrap"},(0,o.Z)(n,".".concat(z.hasPopupIcon,"&, .").concat(z.hasClearIcon,"&"),{paddingRight:30}),(0,o.Z)(n,".".concat(z.hasPopupIcon,".").concat(z.hasClearIcon,"&"),{paddingRight:56}),(0,o.Z)(n,"& .".concat(z.input),{width:0,minWidth:30}),n)),(0,o.Z)(l,"& .".concat(P.Z.root),{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}}),(0,o.Z)(l,"& .".concat(P.Z.root,".").concat(C.Z.sizeSmall),(0,o.Z)({},"& .".concat(P.Z.input),{padding:"2px 4px 3px 0"})),(0,o.Z)(l,"& .".concat(S.Z.root),(r={padding:9},(0,o.Z)(r,".".concat(z.hasPopupIcon,"&, .").concat(z.hasClearIcon,"&"),{paddingRight:39}),(0,o.Z)(r,".".concat(z.hasPopupIcon,".").concat(z.hasClearIcon,"&"),{paddingRight:65}),(0,o.Z)(r,"& .".concat(z.input),{padding:"7.5px 4px 7.5px 6px"}),(0,o.Z)(r,"& .".concat(z.endAdornment),{right:9}),r)),(0,o.Z)(l,"& .".concat(S.Z.root,".").concat(C.Z.sizeSmall),(0,o.Z)({padding:6},"& .".concat(z.input),{padding:"2.5px 4px 2.5px 6px"})),(0,o.Z)(l,"& .".concat(w.Z.root),(i={paddingTop:19,paddingLeft:8},(0,o.Z)(i,".".concat(z.hasPopupIcon,"&, .").concat(z.hasClearIcon,"&"),{paddingRight:39}),(0,o.Z)(i,".".concat(z.hasPopupIcon,".").concat(z.hasClearIcon,"&"),{paddingRight:65}),(0,o.Z)(i,"& .".concat(w.Z.input),{padding:"7px 4px"}),(0,o.Z)(i,"& .".concat(z.endAdornment),{right:9}),i)),(0,o.Z)(l,"& .".concat(w.Z.root,".").concat(C.Z.sizeSmall),(0,o.Z)({paddingBottom:1},"& .".concat(w.Z.input),{padding:"2.5px 4px"})),(0,o.Z)(l,"& .".concat(C.Z.hiddenLabel),{paddingTop:8}),(0,o.Z)(l,"& .".concat(z.input),(0,a.Z)({flexGrow:1,textOverflow:"ellipsis",opacity:0},c.inputFocused&&{opacity:1})),l))})),V=(0,M.ZP)("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:function(e,t){return t.endAdornment}})({position:"absolute",right:0,top:"calc(50% - 14px)"}),q=(0,M.ZP)(y.Z,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:function(e,t){return t.clearIndicator}})({marginRight:-2,padding:4,visibility:"hidden"}),B=(0,M.ZP)(y.Z,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:function(e,t){var n=e.ownerState;return(0,a.Z)({},t.popupIndicator,n.popupOpen&&t.popupIndicatorOpen)}})((function(e){var t=e.ownerState;return(0,a.Z)({padding:2,marginRight:-2},t.popupOpen&&{transform:"rotate(180deg)"})})),K=(0,M.ZP)(x.Z,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:function(e,t){var n=e.ownerState;return[(0,o.Z)({},"& .".concat(z.option),t.option),t.popper,n.disablePortal&&t.popperDisablePortal]}})((function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({zIndex:(t.vars||t).zIndex.modal},n.disablePortal&&{position:"absolute"})})),U=(0,M.ZP)(O.Z,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:function(e,t){return t.paper}})((function(e){var t=e.theme;return(0,a.Z)({},t.typography.body1,{overflow:"auto"})})),G=(0,M.ZP)("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:function(e,t){return t.loading}})((function(e){var t=e.theme;return{color:(t.vars||t).palette.text.secondary,padding:"14px 16px"}})),_=(0,M.ZP)("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:function(e,t){return t.noOptions}})((function(e){var t=e.theme;return{color:(t.vars||t).palette.text.secondary,padding:"14px 16px"}})),J=(0,M.ZP)("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:function(e,t){return t.listbox}})((function(e){var t,n,r=e.theme;return(0,o.Z)({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto"},"& .".concat(z.option),(n={minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16},(0,o.Z)(n,r.breakpoints.up("sm"),{minHeight:"auto"}),(0,o.Z)(n,"&.".concat(z.focused),{backgroundColor:(r.vars||r).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}),(0,o.Z)(n,'&[aria-disabled="true"]',{opacity:(r.vars||r).palette.action.disabledOpacity,pointerEvents:"none"}),(0,o.Z)(n,"&.".concat(z.focusVisible),{backgroundColor:(r.vars||r).palette.action.focus}),(0,o.Z)(n,'&[aria-selected="true"]',(t={backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / ").concat(r.vars.palette.action.selectedOpacity,")"):(0,b.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity)},(0,o.Z)(t,"&.".concat(z.focused),{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / calc(").concat(r.vars.palette.action.selectedOpacity," + ").concat(r.vars.palette.action.hoverOpacity,"))"):(0,b.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity+r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(r.vars||r).palette.action.selected}}),(0,o.Z)(t,"&.".concat(z.focusVisible),{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / calc(").concat(r.vars.palette.action.selectedOpacity," + ").concat(r.vars.palette.action.focusOpacity,"))"):(0,b.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity+r.palette.action.focusOpacity)}),t)),n))})),Q=(0,M.ZP)(Z.Z,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:function(e,t){return t.groupLabel}})((function(e){var t=e.theme;return{backgroundColor:(t.vars||t).palette.background.paper,top:-8}})),X=(0,M.ZP)("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:function(e,t){return t.groupUl}})((0,o.Z)({padding:0},"& .".concat(z.option),{paddingLeft:24})),Y=i.forwardRef((function(e,t){var n,o,u,p,s,d=(0,T.Z)({props:e,name:"MuiAutocomplete"}),f=(d.autoComplete,d.autoHighlight,d.autoSelect,d.blurOnSelect,d.ChipProps),v=d.className,g=d.clearIcon,h=void 0===g?E||(E=(0,A.jsx)(L,{fontSize:"small"})):g,b=d.clearOnBlur,Z=(void 0===b&&d.freeSolo,d.clearOnEscape,d.clearText),y=void 0===Z?"Clear":Z,P=d.closeText,C=void 0===P?"Close":P,S=d.componentsProps,w=void 0===S?{}:S,k=d.defaultValue,M=(void 0===k&&d.multiple,d.disableClearable),D=void 0!==M&&M,z=(d.disableCloseOnSelect,d.disabled),Y=void 0!==z&&z,$=(d.disabledItemsFocusable,d.disableListWrap,d.disablePortal),ee=void 0!==$&&$,te=(d.filterSelectedOptions,d.forcePopupIcon),ne=void 0===te?"auto":te,oe=d.freeSolo,re=void 0!==oe&&oe,ae=d.fullWidth,ie=void 0!==ae&&ae,le=d.getLimitTagsText,ce=void 0===le?function(e){return"+".concat(e)}:le,ue=d.getOptionLabel,pe=void 0===ue?function(e){var t;return null!=(t=e.label)?t:e}:ue,se=d.groupBy,de=d.handleHomeEndKeys,fe=(void 0===de&&d.freeSolo,d.includeInputInList,d.limitTags),ve=void 0===fe?-1:fe,ge=d.ListboxComponent,he=void 0===ge?"ul":ge,me=d.ListboxProps,be=d.loading,xe=void 0!==be&&be,Ze=d.loadingText,Oe=void 0===Ze?"Loading\u2026":Ze,ye=d.multiple,Ie=void 0!==ye&&ye,Pe=d.noOptionsText,Ce=void 0===Pe?"No options":Pe,Se=(d.openOnFocus,d.openText),we=void 0===Se?"Open":Se,ke=d.PaperComponent,Ae=void 0===ke?O.Z:ke,Le=d.PopperComponent,Re=void 0===Le?x.Z:Le,Te=d.popupIcon,Me=void 0===Te?F||(F=(0,A.jsx)(R.Z,{})):Te,De=d.readOnly,Ne=void 0!==De&&De,Ee=d.renderGroup,Fe=d.renderInput,ze=d.renderOption,je=d.renderTags,He=d.selectOnFocus,We=(void 0===He&&d.freeSolo,d.size),Ve=void 0===We?"medium":We,qe=(0,r.Z)(d,H),Be=m((0,a.Z)({},d,{componentName:"Autocomplete"})),Ke=Be.getRootProps,Ue=Be.getInputProps,Ge=Be.getInputLabelProps,_e=Be.getPopupIndicatorProps,Je=Be.getClearProps,Qe=Be.getTagProps,Xe=Be.getListboxProps,Ye=Be.getOptionProps,$e=Be.value,et=Be.dirty,tt=Be.id,nt=Be.popupOpen,ot=Be.focused,rt=Be.focusedTag,at=Be.anchorEl,it=Be.setAnchorEl,lt=Be.inputValue,ct=Be.groupedOptions,ut=!D&&!Y&&et&&!Ne,pt=(!re||!0===ne)&&!1!==ne,st=(0,a.Z)({},d,{disablePortal:ee,focused:ot,fullWidth:ie,hasClearIcon:ut,hasPopupIcon:pt,inputFocused:-1===rt,popupOpen:nt,size:Ve}),dt=function(e){var t=e.classes,n=e.disablePortal,o=e.focused,r=e.fullWidth,a=e.hasClearIcon,i=e.hasPopupIcon,l=e.inputFocused,u=e.popupOpen,p=e.size,s={root:["root",o&&"focused",r&&"fullWidth",a&&"hasClearIcon",i&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",l&&"inputFocused"],tag:["tag","tagSize".concat((0,j.Z)(p))],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",u&&"popupIndicatorOpen"],popper:["popper",n&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return(0,c.Z)(s,N,t)}(st);if(Ie&&$e.length>0){var ft=function(e){return(0,a.Z)({className:dt.tag,disabled:Y},Qe(e))};s=je?je($e,ft,st):$e.map((function(e,t){return(0,A.jsx)(I.Z,(0,a.Z)({label:pe(e),size:Ve},ft({index:t}),f))}))}if(ve>-1&&Array.isArray(s)){var vt=s.length-ve;!ot&&vt>0&&(s=s.splice(0,ve)).push((0,A.jsx)("span",{className:dt.tag,children:ce(vt)},s.length))}var gt=Ee||function(e){return(0,A.jsxs)("li",{children:[(0,A.jsx)(Q,{className:dt.groupLabel,ownerState:st,component:"div",children:e.group}),(0,A.jsx)(X,{className:dt.groupUl,ownerState:st,children:e.children})]},e.key)},ht=ze||function(e,t){return(0,A.jsx)("li",(0,a.Z)({},e,{children:pe(t)}))},mt=function(e,t){var n=Ye({option:e,index:t});return ht((0,a.Z)({},n,{className:dt.option}),e,{selected:n["aria-selected"],inputValue:lt})};return(0,A.jsxs)(i.Fragment,{children:[(0,A.jsx)(W,(0,a.Z)({ref:t,className:(0,l.default)(dt.root,v),ownerState:st},Ke(qe),{children:Fe({id:tt,disabled:Y,fullWidth:!0,size:"small"===Ve?"small":void 0,InputLabelProps:Ge(),InputProps:(0,a.Z)({ref:it,className:dt.inputRoot,startAdornment:s},(ut||pt)&&{endAdornment:(0,A.jsxs)(V,{className:dt.endAdornment,ownerState:st,children:[ut?(0,A.jsx)(q,(0,a.Z)({},Je(),{"aria-label":y,title:y,ownerState:st},w.clearIndicator,{className:(0,l.default)(dt.clearIndicator,null==(n=w.clearIndicator)?void 0:n.className),children:h})):null,pt?(0,A.jsx)(B,(0,a.Z)({},_e(),{disabled:Y,"aria-label":nt?C:we,title:nt?C:we,ownerState:st},w.popupIndicator,{className:(0,l.default)(dt.popupIndicator,null==(o=w.popupIndicator)?void 0:o.className),children:Me})):null]})}),inputProps:(0,a.Z)({className:dt.input,disabled:Y,readOnly:Ne},Ue())})})),nt&&at?(0,A.jsx)(K,(0,a.Z)({as:Re,disablePortal:ee,style:{width:at?at.clientWidth:null},ownerState:st,role:"presentation",anchorEl:at,open:!0},w.popper,{className:(0,l.default)(dt.popper,null==(u=w.popper)?void 0:u.className),children:(0,A.jsxs)(U,(0,a.Z)({ownerState:st,as:Ae},w.paper,{className:(0,l.default)(dt.paper,null==(p=w.paper)?void 0:p.className),children:[xe&&0===ct.length?(0,A.jsx)(G,{className:dt.loading,ownerState:st,children:Oe}):null,0!==ct.length||re||xe?null:(0,A.jsx)(_,{className:dt.noOptions,ownerState:st,role:"presentation",onMouseDown:function(e){e.preventDefault()},children:Ce}),ct.length>0?(0,A.jsx)(J,(0,a.Z)({as:he,className:dt.listbox,ownerState:st},Xe(),me,{children:ct.map((function(e,t){return se?gt({key:e.key,group:e.group,children:e.options.map((function(t,n){return mt(t,e.index+n)}))}):mt(e,t)}))})):null]}))})):null]})}))}}]);