"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[9711],{19711:function(a,e,r){r.r(e);var n=r(1413),i=r(74165),t=r(15861),o=r(29439),c=r(62563),s=r(73428),u=r(16957),d=r(93405),l=r(9019),p=r(19536),m=r(66212),v=r(1550),f=r(5178),h=r(24631),x=r(41727),Z=r(25298),_=r(24193),b=r(71263),g=r(47313),C=r(75627),j=r(58467),E=(r(88282),r(521)),y=r(68673),I=(r(77453),r(75265)),w=r(3463),k=r(68645),N=r(46417);e.default=function(){var a=(0,y.Z)(),e=new k.Z,r=(0,g.useState)([]),P=(0,o.Z)(r,2),D=P[0],M=P[1],S=(0,g.useState)([]),A=(0,o.Z)(S,2),F=A[0],R=A[1],L=(0,j.TH)().state,W=function(){var e=(0,t.Z)((0,i.Z)().mark((function e(){var r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.ProvinciasFiltradaPorPaisYesAduana(97,!0);case 3:r=e.sent,M(r),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=(0,t.Z)((0,i.Z)().mark((function e(r){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!r){e.next=9;break}return e.next=4,a.CiudadesPorProvincia(parseInt(r));case 4:n=e.sent,B(),R(n),e.next=10;break;case 9:R([]);case 10:e.next=14;break;case 12:e.prev=12,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(a){return e.apply(this,arguments)}}(),q={id:L.adua_Id,adua_Codigo:L.adua_Codigo,adua_Nombre:L.adua_Nombre,adua_Direccion_Exacta:L.adua_Direccion_Exacta,Pais:null,provincia:null,Ciudad:null};(0,g.useEffect)((function(){W(),B("provincia",{value:parseInt(L.pvin_Id),label:L.pvin_Nombre}),T(parseInt(L.pvin_Id)),B("Ciudad",{value:parseInt(L.ciud_Id),label:L.ciud_Nombre})}),[]);var z=w.Ry().shape({adua_Codigo:w.Z_().trim().required(""),adua_Nombre:w.Z_().trim().required(""),adua_Direccion_Exacta:w.Z_().trim().required(""),provincia:w.Ry().required(""),Ciudad:w.Ry().required("")}),U=(0,C.cI)({defaultValues:q,mode:"all",resolver:(0,c.X)(z)}),O=U.handleSubmit,Q=U.control,V=U.watch,H=U.formState,B=U.setValue,J=H.isValid,K=H.errors,X=V(),Y=function(){var a=(0,t.Z)((0,i.Z)().mark((function a(){var r;return(0,i.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.editar(X);case 3:"1"==(r=a.sent).data.data.messageStatus?(E.Z.push("/aduana/index"),(0,I.xO)("El registro se ha editado exitosamente")):r.data.data.messageStatus.includes("UNIQUE")&&(0,I.d0)("Ya existe la Empresa"),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),(0,I.bW)("Error inesperado");case 10:case"end":return a.stop()}}),a,null,[[0,7]])})));return function(){return a.apply(this,arguments)}}(),G=function(){var a=(0,t.Z)((0,i.Z)().mark((function a(){return(0,i.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:J?Y():(0,I.KV)();case 1:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return(0,N.jsx)("form",{onSubmit:O((function(a){})),children:(0,N.jsxs)(s.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,N.jsx)(u.Z,{component:"img",height:"200",image:"https://i.ibb.co/r0frJNT/ADUANAS.png",alt:"Encabezado de la carta"}),(0,N.jsx)(d.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,N.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,N.jsx)(l.ZP,{item:!0,xs:12,style:{marginBottom:"30px"},children:(0,N.jsx)(p.Z,{style:{marginTop:"0px"},children:(0,N.jsx)(m.Z,{label:"Editar Aduana"})})}),(0,N.jsx)(l.ZP,{item:!0,xs:6,children:(0,N.jsx)("div",{className:" mb-16",children:(0,N.jsx)(C.Qr,{render:function(a){var e=a.field;return(0,N.jsxs)(v.Z,{error:!!K.adua_Codigo,fullWidth:!0,children:[(0,N.jsx)(f.Z,{children:"C\xf3digo Aduana:"}),(0,N.jsx)(h.Z,(0,n.Z)((0,n.Z)({},e),{},{error:!!K.adua_Codigo,variant:"outlined",fullWidth:!0,inputprops:{startAdornment:(0,N.jsx)(x.Z,{position:"start"})}}))]})},name:"adua_Codigo",control:Q})})}),(0,N.jsx)(l.ZP,{item:!0,xs:6,children:(0,N.jsx)("div",{className:" mb-16",children:(0,N.jsx)(C.Qr,{render:function(a){var e=a.field;return(0,N.jsxs)(v.Z,{error:!!K.adua_Nombre,fullWidth:!0,children:[(0,N.jsx)(f.Z,{children:"Nombre del Contacto:"}),(0,N.jsx)(h.Z,(0,n.Z)((0,n.Z)({},e),{},{error:!!K.adua_Nombre,variant:"outlined",fullWidth:!0,inputprops:{startAdornment:(0,N.jsx)(x.Z,{position:"start"})}}))]})},name:"adua_Nombre",control:Q})})}),(0,N.jsx)(l.ZP,{item:!0,xs:6,children:(0,N.jsx)("div",{className:" mb-16",children:(0,N.jsx)(C.Qr,{name:"Provincia",control:Q,render:function(a){var e,r=a.field;return(0,N.jsxs)(v.Z,{error:!!K.provincia,fullWidth:!0,children:[(0,N.jsx)(f.Z,{error:!!K.provincia,children:"Provincia:"}),(0,N.jsx)(Z.Z,(0,n.Z)((0,n.Z)({},r),{},{disablePortal:!0,isOptionEqualToValue:function(a,e){return a.value===e.value},id:"Provincia",options:D,value:null!==(e=X.provincia)&&void 0!==e?e:null,onChange:function(){var a=(0,t.Z)((0,i.Z)().mark((function a(e,r){return(0,i.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:B("provincia",r),B("Ciudad",null),T(null===r||void 0===r?void 0:r.value),r||B("ciud_Id",[]);case 4:case"end":return a.stop()}}),a)})));return function(e,r){return a.apply(this,arguments)}}(),disableClearable:!0,renderInput:function(a){return(0,N.jsx)(h.Z,(0,n.Z)((0,n.Z)({},a),{},{error:!!K.provincia,InputLabelProps:{shrink:!0}}))}}))]})}})})}),(0,N.jsx)(l.ZP,{item:!0,xs:6,children:(0,N.jsx)("div",{className:"mb-16",children:(0,N.jsx)(C.Qr,{name:"Ciudad",control:Q,render:function(a){var e=a.field;return(0,N.jsxs)(v.Z,{fullWidth:!0,children:[(0,N.jsx)(f.Z,{error:!!K.Ciudad,disabled:null==X.provincia,children:"Ciudades:"}),(0,N.jsx)(Z.Z,(0,n.Z)((0,n.Z)({},e),{},{disablePortal:!0,id:"Ciudad",isOptionEqualToValue:function(a,e){return a.value===e.value},options:F,disabled:null==X.provincia,value:X.Ciudad,onChange:function(a,e){B("Ciudad",e)},disableClearable:!0,renderInput:function(a){return(0,N.jsx)(h.Z,(0,n.Z)((0,n.Z)({},a),{},{error:!!K.Ciudad,InputLabelProps:{shrink:!0}}))}}))]})}})})}),(0,N.jsx)(l.ZP,{item:!0,xs:6,children:(0,N.jsx)("div",{className:" mb-16",children:(0,N.jsx)(C.Qr,{render:function(a){var e=a.field;return(0,N.jsxs)(v.Z,{error:!!K.adua_Direccion_Exacta,fullWidth:!0,children:[(0,N.jsx)(f.Z,{children:"Direcci\xf3n Exacta:"}),(0,N.jsx)(h.Z,(0,n.Z)((0,n.Z)({},e),{},{error:!!K.adua_Direccion_Exacta,variant:"outlined",fullWidth:!0,inputprops:{startAdornment:(0,N.jsx)(x.Z,{position:"start"})}}))]})},name:"adua_Direccion_Exacta",control:Q})})}),(0,N.jsxs)(l.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,N.jsx)(_.Z,{startIcon:(0,N.jsx)(b.Z,{children:"checked"}),variant:"contained",color:"primary",type:"submit",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:G,children:"Editar"}),(0,N.jsx)(_.Z,{startIcon:(0,N.jsx)(b.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:function(){E.Z.push("/aduana/Index")},children:"Cancelar"})]})]})})]})})}},68645:function(a,e,r){var n=r(74165),i=r(15861),t=r(31881),o=r.n(t),c=r(9098);e.Z=function(){var a={XApiKey:c.Z.extraerToken()},e=o().create({baseURL:"https://practicaacademia.somee.com/api/Aduanas/",headers:a}),r=JSON.parse(localStorage.getItem("user"));function t(){return(t=(0,i.Z)((0,n.Z)().mark((function a(){var r,i;return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.get("Listar");case 3:return r=a.sent,i=r.data.data.map((function(a,e){return{key:e+1,adua_Id:a.adua_Id,adua_Codigo:a.adua_Codigo,adua_Nombre:a.adua_Nombre,adua_Direccion_Exacta:a.adua_Direccion_Exacta,ciud_Id:a.ciud_Id,ciud_Nombre:a.ciud_Nombre,pvin_Id:a.pvin_Id,pvin_Nombre:a.pvin_Nombre,adua_FechaCreacion:a.adua_FechaCreacion,usarioCreacion:a.usarioCreacion,adua_FechaModificacion:a.adua_FechaModificacion,usuarioModificacion:a.usuarioModificacion,adua_FechaEliminacion:a.adua_FechaEliminacion,usuarioEliminacion:a.usuarioEliminacion,adua_Estado:a.adua_Estado}})),a.abrupt("return",i);case 8:a.prev=8,a.t0=a.catch(0);case 10:case"end":return a.stop()}}),a,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,i.Z)((0,n.Z)().mark((function a(){var r,i;return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.get("Listar");case 3:return r=a.sent,i=r.data.data.map((function(a,e){return{key:e+1,adua_Codigo:a.adua_Codigo,adua_Nombre:a.adua_Nombre,adua_Direccion_Exacta:a.adua_Direccion_Exacta}})),a.abrupt("return",i);case 8:a.prev=8,a.t0=a.catch(0);case 10:case"end":return a.stop()}}),a,null,[[0,8]])})))).apply(this,arguments)}function u(){return(u=(0,i.Z)((0,n.Z)().mark((function a(i){var t,o;return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t={adua_Codigo:i.adua_Codigo.trim(),adua_Nombre:i.adua_Nombre.trim(),ciud_Id:i.Ciudad.value,adua_Direccion_Exacta:i.adua_Direccion_Exacta.trim(),usua_UsuarioCreacion:r.uuid,adua_FechaCreacion:c.Z.formatFechaHora(new Date)},a.next=4,e.post("Insertar",t);case 4:return o=a.sent,a.abrupt("return",o);case 8:a.prev=8,a.t0=a.catch(0);case 10:case"end":return a.stop()}}),a,null,[[0,8]])})))).apply(this,arguments)}function d(){return(d=(0,i.Z)((0,n.Z)().mark((function a(i){var t,o;return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t={adua_Id:i.id,adua_Codigo:i.adua_Codigo.trim(),adua_Nombre:i.adua_Nombre.trim(),ciud_Id:i.Ciudad.value,adua_Direccion_Exacta:i.adua_Direccion_Exacta.trim(),usua_UsuarioModificacion:r.uuid,adua_FechaModificacion:c.Z.formatFechaHora(new Date)},a.next=4,e.post("Editar",t);case 4:return o=a.sent,a.abrupt("return",o);case 8:a.prev=8,a.t0=a.catch(0);case 10:case"end":return a.stop()}}),a,null,[[0,8]])})))).apply(this,arguments)}function l(){return(l=(0,i.Z)((0,n.Z)().mark((function a(i){var t,o;return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t={adua_Id:i.id,usua_UsuarioEliminacion:r.uuid,adua_FechaEliminacion:c.Z.formatFechaHora(new Date)},a.next=4,e.post("Eliminar",t);case 4:return o=a.sent,a.abrupt("return",o);case 8:a.prev=8,a.t0=a.catch(0);case 10:case"end":return a.stop()}}),a,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return t.apply(this,arguments)},crear:function(a){return u.apply(this,arguments)},editar:function(a){return d.apply(this,arguments)},eliminar:function(a){return l.apply(this,arguments)},ExportData:function(){return s.apply(this,arguments)}}}},16957:function(a,e,r){r.d(e,{Z:function(){return x}});var n=r(63366),i=r(87462),t=r(47313),o=r(83061),c=r(21921),s=r(77342),u=r(88564),d=r(32298);function l(a){return(0,d.Z)("MuiCardMedia",a)}(0,r(77430).Z)("MuiCardMedia",["root","media","img"]);var p=r(46417),m=["children","className","component","image","src","style"],v=(0,u.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:function(a,e){var r=a.ownerState,n=r.isMediaComponent,i=r.isImageComponent;return[e.root,n&&e.media,i&&e.img]}})((function(a){var e=a.ownerState;return(0,i.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"})})),f=["video","audio","picture","iframe","img"],h=["picture","img"],x=t.forwardRef((function(a,e){var r=(0,s.Z)({props:a,name:"MuiCardMedia"}),t=r.children,u=r.className,d=r.component,x=void 0===d?"div":d,Z=r.image,_=r.src,b=r.style,g=(0,n.Z)(r,m),C=-1!==f.indexOf(x),j=!C&&Z?(0,i.Z)({backgroundImage:'url("'.concat(Z,'")')},b):b,E=(0,i.Z)({},r,{component:x,isMediaComponent:C,isImageComponent:-1!==h.indexOf(x)}),y=function(a){var e=a.classes,r={root:["root",a.isMediaComponent&&"media",a.isImageComponent&&"img"]};return(0,c.Z)(r,l,e)}(E);return(0,p.jsx)(v,(0,i.Z)({className:(0,o.default)(y.root,u),as:x,role:!C&&Z?"img":void 0,ref:e,style:j,ownerState:E,src:C?Z||_:void 0},g,{children:t}))}))},41727:function(a,e,r){r.d(e,{Z:function(){return C}});var n=r(4942),i=r(63366),t=r(87462),o=r(47313),c=r(83061),s=r(21921),u=r(91615),d=r(61113),l=r(91397),p=r(99008),m=r(88564),v=r(32298);function f(a){return(0,v.Z)("MuiInputAdornment",a)}var h,x=(0,r(77430).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),Z=r(77342),_=r(46417),b=["children","className","component","disablePointerEvents","disableTypography","position","variant"],g=(0,m.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(a,e){var r=a.ownerState;return[e.root,e["position".concat((0,u.Z)(r.position))],!0===r.disablePointerEvents&&e.disablePointerEvents,e[r.variant]]}})((function(a){var e=a.theme,r=a.ownerState;return(0,t.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(e.vars||e).palette.action.active},"filled"===r.variant&&(0,n.Z)({},"&.".concat(x.positionStart,"&:not(.").concat(x.hiddenLabel,")"),{marginTop:16}),"start"===r.position&&{marginRight:8},"end"===r.position&&{marginLeft:8},!0===r.disablePointerEvents&&{pointerEvents:"none"})})),C=o.forwardRef((function(a,e){var r=(0,Z.Z)({props:a,name:"MuiInputAdornment"}),n=r.children,m=r.className,v=r.component,x=void 0===v?"div":v,C=r.disablePointerEvents,j=void 0!==C&&C,E=r.disableTypography,y=void 0!==E&&E,I=r.position,w=r.variant,k=(0,i.Z)(r,b),N=(0,p.Z)()||{},P=w;w&&N.variant,N&&!P&&(P=N.variant);var D=(0,t.Z)({},r,{hiddenLabel:N.hiddenLabel,size:N.size,disablePointerEvents:j,position:I,variant:P}),M=function(a){var e=a.classes,r=a.disablePointerEvents,n=a.hiddenLabel,i=a.position,t=a.size,o=a.variant,c={root:["root",r&&"disablePointerEvents",i&&"position".concat((0,u.Z)(i)),o,n&&"hiddenLabel",t&&"size".concat((0,u.Z)(t))]};return(0,s.Z)(c,f,e)}(D);return(0,_.jsx)(l.Z.Provider,{value:null,children:(0,_.jsx)(g,(0,t.Z)({as:x,ownerState:D,className:(0,c.default)(M.root,m),ref:e},k,{children:"string"!==typeof n||y?(0,_.jsxs)(o.Fragment,{children:["start"===I?h||(h=(0,_.jsx)("span",{className:"notranslate",children:"\u200b"})):null,n]}):(0,_.jsx)(d.Z,{color:"text.secondary",children:n})}))})}))}}]);