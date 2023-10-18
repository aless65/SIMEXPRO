"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[3841],{57094:function(e,n,r){r.r(n);var a=r(74165),t=r(1413),i=r(15861),o=r(29439),c=r(73428),s=r(16957),d=r(93405),l=r(9019),u=r(5178),p=r(1550),A=r(15480),h=r(24193),m=r(24631),g=r(9506),f=r(35898),v=r(61113),x=r(70024),E=r(71263),Z=r(22324),b=r(47313),Q=r(10738),C=r(62563),I=r(60159),_=r(66493),j=r(75627),y=(r(88282),r(521)),k=(r(77453),r(75265)),N=r(3463),B=r(47602),S=r(58467),w=r(46417);n.default=function(){var e,n=(0,S.TH)();null===n.state&&y.Z.back();var r=(0,B.Z)(),R=(0,b.useState)(!1),P=(0,o.Z)(R,2),J=P[0],D=P[1],F={ensa_Id:null===(e=n.state)||void 0===e?void 0:e.ensa_Id,image:null,cantidad:"",fechaRevision:null,observaciones:"",scrap:!1},M=N.Ry().shape({ensa_Id:N.Rx().required(""),image:N.Z_().required(""),cantidad:N.Z_().required(""),fechaRevision:N.hT().required("Ingrese una fecha v\xe1lida").max(new Date).min(new Date(1900,0,1)),observaciones:N.Z_().required(""),scrap:N.Xg().required("")}),K=(0,b.useState)(null),U=(0,o.Z)(K,2),L=U[0],z=U[1],H=(0,b.useRef)(null),Y=(0,j.cI)({defaultValues:F,mode:"all",resolver:(0,C.X)(M)}),T=Y.handleSubmit,q=(Y.register,Y.reset,Y.control),G=Y.watch,X=Y.formState,O=Y.setValue,W=Y.trigger,V=X.isValid,$=(X.dirtyFields,X.errors),ee=G();function ne(){return re.apply(this,arguments)}function re(){return(re=(0,i.Z)((0,a.Z)().mark((function e(){var n,t,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.crear(ee);case 3:i=e.sent,"1"===(null===(n=i.data)||void 0===n||null===(t=n.data)||void 0===t?void 0:t.messageStatus)?((0,k.ys)(),y.Z.push("RevisionCalidad/Index",{row:ee.ensa_Id})):"No se pudo subir la imagen"==i?(0,k.ov)("Error. Hubo un error con el servidor de im\xe1genes"):(0,k.bW)(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,k.bW)();case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function ae(){return(ae=(0,i.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D(!0),!V){e.next=6;break}return e.next=4,ne();case 4:e.next=7;break;case 6:(0,k.KV)();case 7:D(!1);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,w.jsx)("form",{onSubmit:T((function(e){})),children:(0,w.jsxs)(c.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,w.jsx)(s.Z,{component:"img",height:"200",image:"https://i.ibb.co/pwQbH4s/REVISI-N-DE-CALIDAD.png",alt:"Encabezado de la carta"}),(0,w.jsx)(d.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,w.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,w.jsx)(l.ZP,{item:!0,xs:4,children:(0,w.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,w.jsx)(l.ZP,{item:!0,xs:12,display:"flex",justifyContent:"center",children:(0,w.jsx)(u.Z,{error:!!$.image,children:"Imagen de la prenda:"})}),(0,w.jsx)(l.ZP,{item:!0,xs:12,display:"flex",justifyContent:"center",maxHeight:"250px",children:(0,w.jsx)(I.Z,{width:250,style:{overflow:"hidden",maxHeight:"100%",objectFit:"cover",boxShadow:"0 0 10px rgba(0, 0, 0, 0.3)",borderRadius:"10px"},src:L,fallback:"data:image/png;base64,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"})}),(0,w.jsx)(l.ZP,{item:!0,xs:12,display:"flex",justifyContent:"center",children:(0,w.jsx)(p.Z,{error:!!$.image,children:(0,w.jsxs)(A.Z,{children:[$.image?"Selecciona una imagen":""," "]})})}),(0,w.jsxs)(l.ZP,{item:!0,xs:12,display:"flex",justifyContent:"center",children:[(0,w.jsx)(h.Z,{startIcon:(0,w.jsx)(Q.Z,{className:"text-48",size:24,color:"white",children:"material-outline:broken_image"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){H.current.click(),W("image")},children:"Seleccionar una foto"}),(0,w.jsx)("input",{type:"file",accept:"image/*",ref:H,style:{display:"none"},onChange:function(e){var n=e.target.files[0];if(n&&n.type.startsWith("image/")){var r=new FileReader;r.readAsDataURL(n),r.onload=function(){O("image",r.result,{shouldValidate:!0,shouldTouch:!0}),z(r.result)}}else(0,k.go)("Advertencia. Archivo incorrecto")},name:"image",control:q})]})]})}),(0,w.jsx)(l.ZP,{item:!0,xs:8,style:{},children:(0,w.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,w.jsx)(l.ZP,{item:!0,xs:6,children:(0,w.jsx)(j.Qr,{name:"fechaRevision",control:q,render:function(e){var n=e.field;return(0,w.jsxs)(p.Z,{error:!!$.fechaRevision,fullWidth:!0,children:[(0,w.jsx)(u.Z,{children:"Fecha de revisi\xf3n:"}),(0,w.jsx)(Z.M,{onChange:function(e){return n.onChange(e)},value:n.value,required:!0,disableFuture:!0,maxDate:new Date,minDate:new Date(1900,0,1),renderInput:function(e){return(0,w.jsx)(m.Z,(0,t.Z)((0,t.Z)({className:"w-full"},e),{},{onBlur:n.onBlur,error:!!$.fechaRevision}))},className:"w-full"}),(0,w.jsxs)(A.Z,{children:[$.fechaRevision?"Ingrese una fecha v\xe1lida":""," "]})]})}})}),(0,w.jsx)(l.ZP,{item:!0,xs:6}),(0,w.jsx)(l.ZP,{item:!0,xs:6,children:(0,w.jsxs)(p.Z,{fullWidth:!0,children:[(0,w.jsx)(u.Z,{error:!!$.cantidad,children:"Cantidad:"}),(0,w.jsx)(j.Qr,{render:function(e){var n=e.field;return(0,w.jsx)(m.Z,(0,t.Z)((0,t.Z)({},n),{},{id:"outlined-disabled",InputProps:{maxLength:20},error:!!$.cantidad}))},name:"cantidad",control:q})]})}),(0,w.jsx)(l.ZP,{item:!0,xs:6,justifyContent:"center",className:"flex justify-content-center",children:(0,w.jsx)(g.Z,{sx:{textAlign:"center"},children:(0,w.jsxs)(p.Z,{fullWidth:!0,children:[(0,w.jsx)(u.Z,{error:!!$.scrap,children:"SCRAP:"}),(0,w.jsx)(j.Qr,{render:function(e){var n=e.field;return(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)(f.Z,{direction:"row",spacing:1,justifyContent:"center",alignItems:"center",children:[(0,w.jsx)(v.Z,{children:"No"}),(0,w.jsx)(x.Z,(0,t.Z)({},n)),(0,w.jsx)(v.Z,{children:"S\xed"})]})})},name:"scrap",control:q})]})})}),(0,w.jsx)(l.ZP,{item:!0,xs:12,children:(0,w.jsxs)(p.Z,{fullWidth:!0,children:[(0,w.jsx)(u.Z,{error:!!$.observaciones,children:"Descripcion:"}),(0,w.jsx)(j.Qr,{render:function(e){var n=e.field;return(0,w.jsx)(_.Z,(0,t.Z)((0,t.Z)({},n),{},{id:"outlined-disabled",InputProps:{maxLength:20},style:$.observaciones?{borderColor:"red"}:null}))},name:"observaciones",control:q})]})})]})}),(0,w.jsxs)(l.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,w.jsx)(h.Z,{disabled:J,startIcon:(0,w.jsx)(E.Z,{children:"check"}),variant:"contained",color:"primary",type:"submit",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){!function(){ae.apply(this,arguments)}()},children:"Guardar"}),(0,w.jsx)(h.Z,{startIcon:(0,w.jsx)(E.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:function(){y.Z.push("/RevisionCalidad")},children:"Cancelar"})]})]})})]})})}},47602:function(e,n,r){var a=r(74165),t=r(15861),i=r(31881),o=r.n(i),c=r(9098);n.Z=function(){var e={XApiKey:c.Z.extraerToken()},n=o().create({baseURL:"https://practicaacademia.somee.com/api/RevisionDeCalidad/",headers:e}),r=JSON.parse(localStorage.getItem("user"));function i(){return(i=(0,t.Z)((0,a.Z)().mark((function e(){var r,t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.get("Listar");case 3:return r=e.sent,t=r.data.data.map((function(e,n){return{key:e.reca_Id,row:n+1,reca_Id:e.reca_Id,ensa_Id:e.ensa_Id,reca_Descripcion:e.reca_Descripcion,reca_Cantidad:e.reca_Cantidad,reca_Scrap:e.reca_Scrap,reca_FechaRevision:e.reca_FechaRevision,reca_Imagen:e.reca_Imagen,usua_UsuarioCreacion:e.usua_UsuarioCreacion,reca_FechaCreacion:e.reca_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,reca_FechaModificacion:e.reca_FechaModificacion,reca_Estado:e.reca_Estado}})),e.abrupt("return",t);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,t.Z)((0,a.Z)().mark((function e(r){var t,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.get("NuevoListar?ensa_Id=".concat(r||0));case 3:return t=e.sent,i=t.data.data.map((function(e,n){var r=0;return JSON.parse(e.detalles?e.detalles:"[]").forEach((function(e){r+=e.reca_Cantidad})),{key:e.ensa_Id,row:n+1,ensa_Id:e.ensa_Id,ensa_Cantidad:e.ensa_Cantidad,empl_Id:e.empl_Id,empl_NombreCompleto:e.empl_NombreCompleto,code_Id:e.code_Id,code_Sexo:e.code_Sexo,esti_Id:e.esti_Id,esti_Descripcion:e.esti_Descripcion,ensa_FechaInicio:e.ensa_FechaInicio,ensa_FechaLimite:e.ensa_FechaLimite,ppro_Id:e.ppro_Id,proc_Id:e.proc_Id,proc_Descripcion:e.proc_Descripcion,modu_Id:e.modu_Id,modu_Nombre:e.modu_Nombre,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usurioCreacionNombre:e.usurioCreacionNombre,ensa_FechaCreacion:e.ensa_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,usuarioModificacionNombre:e.usuarioModificacionNombre,ensa_FechaModificacion:e.ensa_FechaModificacion,ensa_Estado:e.ensa_Estado,detalles:JSON.parse(e.detalles?e.detalles:"[]"),totalProducido:r}})),e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function d(){return(d=(0,t.Z)((0,a.Z)().mark((function e(r){var t,i,o,c,s,d;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.get("NuevoListar?ensa_Id=".concat(r||0));case 3:for(t=e.sent,i=t.data.data.map((function(e,n){var r=0;return JSON.parse(e.detalles?e.detalles:"[]").forEach((function(e){r+=e.reca_Cantidad})),{row:n+1,ensa_Id:e.ensa_Id,ensa_Cantidad:e.ensa_Cantidad,empl_NombreCompleto:e.empl_NombreCompleto,code_Sexo:e.code_Sexo,esti_Descripcion:e.esti_Descripcion,danos:"".concat(r,"/").concat(e.ensa_Cantidad),detalles:JSON.parse(e.detalles?e.detalles:"[]")}})),o=[],c=0;c<i.length;c++){if(0!=i[c].detalles.length)for(s=0;s<i[c].detalles.length;s++)i[c].ensa_Id==i[c].detalles[s].ensa_Id&&(o[c]+=" {Revisi\xf3n No.: ".concat(s+1,", Descripci\xf3n: ").concat(i[c].detalles[s].reca_Descripcion,", Cantidad: ").concat(i[c].detalles[s].reca_Cantidad,", Fecha de revisi\xf3n: ").concat(i[c].detalles[s].reca_FechaRevision.slice(0,10),", Contiene scrap: ").concat(1==i[c].detalles[s].reca_Scrap?"Si":"No","} "));else o.push("");i[c].detalles=o[c].toString().replace("undefined","")}return d=i.map((function(e){return{row:e.row,ensa_Cantidad:e.ensa_Cantidad,empl_NombreCompleto:e.empl_NombreCompleto,code_Sexo:e.code_Sexo,esti_Descripcion:e.esti_Descripcion,danos:e.danos,detalles:e.detalles}})),e.abrupt("return",d);case 11:e.prev=11,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function l(){return(l=(0,t.Z)((0,a.Z)().mark((function e(t){var i,o,s,d,l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A(t.image);case 3:if(null===(o=e.sent)||void 0===o||null===(i=o.data)||void 0===i||!i.url){e.next=13;break}return s=o.data.url.toString(),d={ensa_Id:t.ensa_Id,reca_Descripcion:t.observaciones,reca_Cantidad:t.cantidad,reca_Scrap:t.scrap,reca_FechaRevision:t.fechaRevision,reca_Imagen:s,usua_UsuarioCreacion:r.uuid,reca_FechaCreacion:c.Z.formatFechaHora(new Date)},e.next=9,n.post("Insertar",d);case 9:return l=e.sent,e.abrupt("return",l);case 13:return e.abrupt("return","No se pudo subir la imagen");case 14:e.next=18;break;case 16:e.prev=16,e.t0=e.catch(0);case 18:case"end":return e.stop()}}),e,null,[[0,16]])})))).apply(this,arguments)}function u(){return(u=(0,t.Z)((0,a.Z)().mark((function e(t){var i,o,s,d,l,u;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,i="",o="",t.image.includes("https://i.ibb.co/")){e.next=10;break}return e.next=6,A(t.image);case 6:i=e.sent,o=null===(s=i)||void 0===s||null===(d=s.data)||void 0===d?void 0:d.url,e.next=11;break;case 10:o=t.image;case 11:if(!o){e.next=19;break}return l={reca_Id:t.id,ensa_Id:t.codigoproceso,reca_Descripcion:t.observaciones,reca_Cantidad:t.cantidad,reca_Scrap:t.scrap,reca_FechaRevision:t.fechaRevision,reca_Imagen:o,usua_UsuarioModificacion:r.uuid,reca_FechaModificacion:c.Z.formatFechaHora(new Date)},e.next=15,n.post("editar",l);case 15:return u=e.sent,e.abrupt("return",u);case 19:return e.abrupt("return","No se pudo subir la imagen");case 20:e.next=24;break;case 22:e.prev=22,e.t0=e.catch(0);case 24:case"end":return e.stop()}}),e,null,[[0,22]])})))).apply(this,arguments)}function p(){return(p=(0,t.Z)((0,a.Z)().mark((function e(r){var t,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t={reca_Id:r.reca_Id},e.next=4,n.post("Eliminar",t);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function A(e){return h.apply(this,arguments)}function h(){return(h=(0,t.Z)((0,a.Z)().mark((function e(n){var r,t,i,o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,"7e4e4920016a49b1dfc06d5af4e9ffc3",r=n.split(",")[1],t="https://api.imgbb.com/1/upload?key=".concat("7e4e4920016a49b1dfc06d5af4e9ffc3"),(i=new FormData).append("image",r),e.next=8,fetch(t,{method:"POST",body:i});case 8:if((o=e.sent).ok){e.next=11;break}throw new Error("Error al enviar la imagen");case 11:return e.next=13,o.json();case 13:return e.abrupt("return",e.sent);case 16:e.prev=16,e.t0=e.catch(0);case 18:case"end":return e.stop()}}),e,null,[[0,16]])})))).apply(this,arguments)}return{listar:function(){return i.apply(this,arguments)},crear:function(e){return l.apply(this,arguments)},editar:function(e){return u.apply(this,arguments)},eliminar:function(e){return p.apply(this,arguments)},ExportData:function(e){return d.apply(this,arguments)},Nuevolistar:function(e){return s.apply(this,arguments)}}}},16957:function(e,n,r){r.d(n,{Z:function(){return f}});var a=r(63366),t=r(87462),i=r(47313),o=r(83061),c=r(21921),s=r(77342),d=r(88564),l=r(32298);function u(e){return(0,l.Z)("MuiCardMedia",e)}(0,r(77430).Z)("MuiCardMedia",["root","media","img"]);var p=r(46417),A=["children","className","component","image","src","style"],h=(0,d.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:function(e,n){var r=e.ownerState,a=r.isMediaComponent,t=r.isImageComponent;return[n.root,a&&n.media,t&&n.img]}})((function(e){var n=e.ownerState;return(0,t.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},n.isMediaComponent&&{width:"100%"},n.isImageComponent&&{objectFit:"cover"})})),m=["video","audio","picture","iframe","img"],g=["picture","img"],f=i.forwardRef((function(e,n){var r=(0,s.Z)({props:e,name:"MuiCardMedia"}),i=r.children,d=r.className,l=r.component,f=void 0===l?"div":l,v=r.image,x=r.src,E=r.style,Z=(0,a.Z)(r,A),b=-1!==m.indexOf(f),Q=!b&&v?(0,t.Z)({backgroundImage:'url("'.concat(v,'")')},E):E,C=(0,t.Z)({},r,{component:f,isMediaComponent:b,isImageComponent:-1!==g.indexOf(f)}),I=function(e){var n=e.classes,r={root:["root",e.isMediaComponent&&"media",e.isImageComponent&&"img"]};return(0,c.Z)(r,u,n)}(C);return(0,p.jsx)(h,(0,t.Z)({className:(0,o.default)(I.root,d),as:f,role:!b&&v?"img":void 0,ref:n,style:Q,ownerState:C,src:b?v||x:void 0},Z,{children:i}))}))},41727:function(e,n,r){r.d(n,{Z:function(){return b}});var a=r(4942),t=r(63366),i=r(87462),o=r(47313),c=r(83061),s=r(21921),d=r(91615),l=r(61113),u=r(91397),p=r(99008),A=r(88564),h=r(32298);function m(e){return(0,h.Z)("MuiInputAdornment",e)}var g,f=(0,r(77430).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),v=r(77342),x=r(46417),E=["children","className","component","disablePointerEvents","disableTypography","position","variant"],Z=(0,A.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,n){var r=e.ownerState;return[n.root,n["position".concat((0,d.Z)(r.position))],!0===r.disablePointerEvents&&n.disablePointerEvents,n[r.variant]]}})((function(e){var n=e.theme,r=e.ownerState;return(0,i.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(n.vars||n).palette.action.active},"filled"===r.variant&&(0,a.Z)({},"&.".concat(f.positionStart,"&:not(.").concat(f.hiddenLabel,")"),{marginTop:16}),"start"===r.position&&{marginRight:8},"end"===r.position&&{marginLeft:8},!0===r.disablePointerEvents&&{pointerEvents:"none"})})),b=o.forwardRef((function(e,n){var r=(0,v.Z)({props:e,name:"MuiInputAdornment"}),a=r.children,A=r.className,h=r.component,f=void 0===h?"div":h,b=r.disablePointerEvents,Q=void 0!==b&&b,C=r.disableTypography,I=void 0!==C&&C,_=r.position,j=r.variant,y=(0,t.Z)(r,E),k=(0,p.Z)()||{},N=j;j&&k.variant,k&&!N&&(N=k.variant);var B=(0,i.Z)({},r,{hiddenLabel:k.hiddenLabel,size:k.size,disablePointerEvents:Q,position:_,variant:N}),S=function(e){var n=e.classes,r=e.disablePointerEvents,a=e.hiddenLabel,t=e.position,i=e.size,o=e.variant,c={root:["root",r&&"disablePointerEvents",t&&"position".concat((0,d.Z)(t)),o,a&&"hiddenLabel",i&&"size".concat((0,d.Z)(i))]};return(0,s.Z)(c,m,n)}(B);return(0,x.jsx)(u.Z.Provider,{value:null,children:(0,x.jsx)(Z,(0,i.Z)({as:f,ownerState:B,className:(0,c.default)(S.root,A),ref:n},y,{children:"string"!==typeof a||I?(0,x.jsxs)(o.Fragment,{children:["start"===_?g||(g=(0,x.jsx)("span",{className:"notranslate",children:"\u200b"})):null,a]}):(0,x.jsx)(l.Z,{color:"text.secondary",children:a})}))})}))},35898:function(e,n,r){var a=r(4942),t=r(63366),i=r(87462),o=r(47313),c=r(54929),s=r(86886),d=r(39028),l=r(13019),u=r(88564),p=r(77342),A=r(46417),h=["component","direction","spacing","divider","children"];function m(e,n){var r=o.Children.toArray(e).filter(Boolean);return r.reduce((function(e,a,t){return e.push(a),t<r.length-1&&e.push(o.cloneElement(n,{key:"separator-".concat(t)})),e}),[])}var g=(0,u.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,n){return[n.root]}})((function(e){var n=e.ownerState,r=e.theme,t=(0,i.Z)({display:"flex",flexDirection:"column"},(0,c.k9)({theme:r},(0,c.P$)({values:n.direction,breakpoints:r.breakpoints.values}),(function(e){return{flexDirection:e}})));if(n.spacing){var o=(0,s.hB)(r),d=Object.keys(r.breakpoints.values).reduce((function(e,r){return("object"===typeof n.spacing&&null!=n.spacing[r]||"object"===typeof n.direction&&null!=n.direction[r])&&(e[r]=!0),e}),{}),u=(0,c.P$)({values:n.direction,base:d}),p=(0,c.P$)({values:n.spacing,base:d});"object"===typeof u&&Object.keys(u).forEach((function(e,n,r){if(!u[e]){var a=n>0?u[r[n-1]]:"column";u[e]=a}}));t=(0,l.Z)(t,(0,c.k9)({theme:r},p,(function(e,r){return{"& > :not(style) + :not(style)":(0,a.Z)({margin:0},"margin".concat((t=r?u[r]:n.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[t])),(0,s.NA)(o,e))};var t})))}return t=(0,c.dt)(r.breakpoints,t)})),f=o.forwardRef((function(e,n){var r=(0,p.Z)({props:e,name:"MuiStack"}),a=(0,d.Z)(r),o=a.component,c=void 0===o?"div":o,s=a.direction,l=void 0===s?"column":s,u=a.spacing,f=void 0===u?0:u,v=a.divider,x=a.children,E=(0,t.Z)(a,h),Z={direction:l,spacing:f};return(0,A.jsx)(g,(0,i.Z)({as:c,ownerState:Z,ref:n},E,{children:v?m(x,v):x}))}));n.Z=f}}]);