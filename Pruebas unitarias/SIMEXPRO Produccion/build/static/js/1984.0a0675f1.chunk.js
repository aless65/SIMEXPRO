"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[1984],{57713:function(e,t,n){var r=n(74165),a=n(15861),i=n(31881),o=n.n(i),c=n(9098);t.Z=function(){var e={XApiKey:c.Z.extraerToken()},t=o().create({baseURL:"https://practicaacademia.somee.com/api/Pantallas/",headers:e}),n=JSON.parse(localStorage.getItem("user"));function i(){return(i=(0,a.Z)((0,r.Z)().mark((function e(){var a,i,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.get("Listar?pant_EsAduana="+n.esAduana.toString());case 3:return a=e.sent,i=a.data||{data:[]},o=i.data.map((function(e,t){return{key:t,pant_Id:e.pant_Id,pant_Nombre:e.pant_Nombre}})),e.abrupt("return",o);case 9:e.prev=9,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function s(){return(s=(0,a.Z)((0,r.Z)().mark((function e(a){var i,o,c,s,u,l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,0!==a.length){e.next=7;break}return e.next=4,t.get("Listar?pant_EsAduana="+n.esAduana.toString());case 4:i=e.sent,e.next=13;break;case 7:return e.next=9,t.get("Listar?pant_EsAduana="+n.esAduana.toString());case 9:o=e.sent,c=o.data||{data:[]},s=a.map((function(e){return e.pant_Id})),i={data:{data:c.data.filter((function(e){return!s.includes(e.pant_Id)}))}};case 13:return u=i.data||{data:[]},l=u.data.map((function(e,t){return{key:t,pant_Id:e.pant_Id,pant_Nombre:e.pant_Nombre}})),e.abrupt("return",l);case 18:e.prev=18,e.t0=e.catch(0);case 21:case"end":return e.stop()}}),e,null,[[0,18]])})))).apply(this,arguments)}function u(){return(u=(0,a.Z)((0,r.Z)().mark((function e(a){var i,o,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.get("Listar?pant_EsAduana="+n.esAduana.toString());case 3:return i=e.sent,o=i.data||{data:[]},c=[],o.data.map((function(e,t){return a.forEach((function(n){e.pant_Id===n.pant_Id&&(c[t]={key:n.key,pant_Id:n.pant_Id,pant_Nombre:n.pant_Nombre})})),{key:t,pant_Id:e.pant_Id,pant_Nombre:e.pant_Nombre}})),e.abrupt("return",c);case 10:e.prev=10,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}return{ListadoPantallas:function(){return i.apply(this,arguments)},ListadoPantallasRight:function(e){return u.apply(this,arguments)},ListadoPantallasLeft:function(e){return s.apply(this,arguments)}}}},51984:function(e,t,n){n.r(t);var r=n(1413),a=n(74165),i=n(15861),o=n(93433),c=n(29439),s=n(62563),u=n(1550),l=n(5178),p=n(24631),d=n(41727),f=n(71263),h=n(24193),m=n(73428),x=n(93405),Z=n(16957),_=n(44758),b=n(9019),v=n(48310),g=n(90206),y=n(74748),k=n(83213),I=n(82295),j=n(47313),w=n(75627),N=n(58467),C=(n(88282),n(521)),S=n(75265),A=n(3463),D=n(57713),R=n(26057),E=n(46417);function P(e,t){return e.filter((function(e){return-1===t.indexOf(e)}))}function L(e,t){return e.filter((function(e){return-1!==t.indexOf(e)}))}t.default=function(){var e=(0,R.Z)(),t=(0,D.Z)(),n=j.useState([]),O=(0,c.Z)(n,2),F=O[0],M=O[1],U=j.useState([]),J=(0,c.Z)(U,2),z=J[0],B=J[1],H=j.useState([]),K=(0,c.Z)(H,2),W=K[0],T=K[1],V=L(F,z),X=L(F,W),Q=(0,N.s0)(),q=A.Ry().shape({role_Descripcion:A.Z_().required("")}),G=function(e){return function(){var t=F.indexOf(e),n=(0,o.Z)(F);-1===t?n.push(e):n.splice(t,1),M(n)}};(0,j.useEffect)((function(){Y()}),[]);var Y=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=B,e.next=4,t.ListadoPantallas();case 4:e.t1=e.sent,(0,e.t0)(e.t1),e.next=10;break;case 8:e.prev=8,e.t2=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),$=function(e){return(0,E.jsx)(I.Z,{sx:{width:350,height:250,overflow:"auto",borderColor:"#c6b1c9",borderWidth:1,borderStyle:"solid"},children:(0,E.jsx)(v.Z,{dense:!0,component:"div",role:"list",children:e.map((function(e){var t="transfer-list-item-".concat(e.id,"-label");return(0,E.jsxs)(g.ZP,{role:"listitem",button:!0,onClick:G(e),children:[(0,E.jsx)(y.Z,{children:(0,E.jsx)(_.Z,{checked:-1!==F.indexOf(e),tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":t}})}),(0,E.jsx)(k.Z,{id:t,primary:" ".concat(e.pant_Nombre)})]},e.id)}))})})},ee=(0,w.cI)({RolesViewModel:{role_Descripcion:"",role_Aduana:!1},mode:"all",resolver:(0,s.X)(q)}),te=ee.handleSubmit,ne=ee.control,re=ee.watch,ae=ee.formState,ie=ae.errors,oe=ae.isValid,ce=re(),se=function(){var t=(0,i.Z)((0,a.Z)().mark((function t(){var n;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.CrearRoles(ce,W);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),ue=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!oe){e.next=11;break}if(0!==W.length){e.next=5;break}(0,S.go)("Seleccione al menos una pantalla."),e.next=9;break;case 5:return e.next=7,se();case 7:1==(t=e.sent).data.data.messageStatus?((0,S.xO)("Registro agregado exitosamente."),C.Z.push("/Roles/Index")):t.data.data.messageStatus.includes("UNIQUE")?(0,S.d0)():(0,S.bW)("Ha ocurrido un error.");case 9:e.next=12;break;case 11:(0,S.KV)("Hay campos vacios.");case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,E.jsx)("form",{onSubmit:te((function(e){})),children:(0,E.jsxs)(m.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,E.jsx)(Z.Z,{component:"img",height:"200",image:"https://i.ibb.co/gMjB52g/ROLES.png",alt:"Encabezado de la carta"}),(0,E.jsxs)(b.ZP,{container:!0,spacing:3,style:{marginTop:"20px"},children:[(0,E.jsx)(b.ZP,{item:!0,xs:3}),(0,E.jsx)(b.ZP,{item:!0,xs:6,children:(0,E.jsx)("div",{className:" mb-16",children:(0,E.jsxs)(u.Z,{fullWidth:!0,children:[(0,E.jsx)(l.Z,{error:!!ie.role_Descripcion,id:"group-label",children:"Descripci\xf3n del rol:"}),(0,E.jsx)(w.Qr,{render:function(e){var t=e.field;return(0,E.jsx)(p.Z,(0,r.Z)((0,r.Z)({},t),{},{id:"outlined",InputProps:{startAdornment:(0,E.jsx)(d.Z,{position:"start"})},error:!!ie.role_Descripcion}))},name:"role_Descripcion",control:ne})]})})})]}),(0,E.jsx)(x.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:(0,E.jsxs)(b.ZP,{container:!0,spacing:2,justifyContent:"center",alignItems:"center",children:[(0,E.jsx)(b.ZP,{item:!0,children:$(z)}),(0,E.jsx)(b.ZP,{item:!0,children:(0,E.jsxs)(b.ZP,{container:!0,direction:"column",alignItems:"center",children:[(0,E.jsx)(h.Z,{sx:{my:.5},variant:"outlined",size:"small",onClick:function(){T(W.concat(z)),B([])},disabled:0===z.length,"aria-label":"move all right",children:"\u226b"}),(0,E.jsx)(h.Z,{sx:{my:.5},variant:"outlined",size:"small",onClick:function(){T(W.concat(V)),B(P(z,V)),M(P(F,V))},disabled:0===V.length,"aria-label":"move selected right",children:">"}),(0,E.jsx)(h.Z,{sx:{my:.5},variant:"outlined",size:"small",onClick:function(){B(z.concat(X)),T(P(W,X)),M(P(F,X))},disabled:0===X.length,"aria-label":"move selected left",children:"<"}),(0,E.jsx)(h.Z,{sx:{my:.5},variant:"outlined",size:"small",onClick:function(){B(z.concat(W)),T([])},disabled:0===W.length,"aria-label":"move all left",children:"\u226a"})]})}),(0,E.jsx)(b.ZP,{item:!0,children:$(W)})]})}),(0,E.jsxs)(b.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right",marginBottom:"15px",marginRight:"15px"},children:[(0,E.jsx)(h.Z,{startIcon:(0,E.jsx)(f.Z,{children:"check"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:ue,type:"submit",children:"Guardar"}),(0,E.jsx)(h.Z,{startIcon:(0,E.jsx)(f.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:function(e){Q("/Roles/Index")},children:"Cancelar"})]})]})})}},26057:function(e,t,n){var r=n(74165),a=n(15861),i=n(31881),o=n.n(i),c=n(9098);t.Z=function(){var e={XApiKey:c.Z.extraerToken()},t=o().create({baseURL:"https://practicaacademia.somee.com/api/Roles/",headers:e}),n=JSON.parse(localStorage.getItem("user"));function i(){return(i=(0,a.Z)((0,r.Z)().mark((function e(){var a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.get("Listar?role_Aduana="+n.esAduana.toString());case 3:return a=e.sent,i=a.data.data.map((function(e,t){var n=JSON.parse(e.detalles),r=null;return n&&(r=n.map((function(e,t){return{key:t+1,pant_Id:e.pant_Id,pant_Nombre:e.pant_Nombre}}))),{key:t+1,role_Id:e.role_Id,role_Descripcion:e.role_Descripcion,aduanero:e.aduanero,detalles:r,usuarioCreacionNombre:e.usuarioCreacionNombre,role_FechaCreacion:e.role_FechaCreacion,usuarioModificadorNombre:e.usuarioModificadorNombre,role_FechaModificacion:e.role_FechaModificacion}})),e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,a.Z)((0,r.Z)().mark((function e(){var a,i,o,c,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.get("Listar?role_Aduana="+n.esAduana.toString());case 3:for(a=e.sent,i=a.data.data.map((function(e,t){var n=JSON.parse(e.detalles),r=null;return n&&(r=n.map((function(e,n){return{key:n+1,rolKey:t+1,pant_Nombre:e.pant_Nombre}}))),{key:t+1,role_Descripcion:e.role_Descripcion,detalles:r}})),o=[],c=0;c<i.length;c++){if(i[c].detalles)for(s=0;s<i[c].detalles.length;s++)i[c].key==i[c].detalles[s].rolKey&&(o[c]+=" {No.: ".concat(s+1,", Descripci\xf3n de la pantalla: ").concat(i[c].detalles[s].pant_Nombre,"} "));else o.push("");i[c].detalles=o[c].toString().replace("undefined","")}return e.abrupt("return",i);case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function u(){return(u=(0,a.Z)((0,r.Z)().mark((function e(a,i){var o,s,u,l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o={pantallas:i.map((function(e){return{pant_Id:e.pant_Id}}))},s=JSON.stringify(o),u={role_Descripcion:a.role_Descripcion.trim(),role_Aduana:n.esAduana,pant_Ids:s,usua_UsuarioCreacion:n.uuid,role_FechaCreacion:c.Z.formatFechaHora(new Date)},e.next=6,t.post("Insertar",u);case 6:return l=e.sent,e.abrupt("return",l);case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function l(){return(l=(0,a.Z)((0,r.Z)().mark((function e(a,i,o){var s,u,l,p;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s={pantallas:o.map((function(e){return{pant_Id:e.pant_Id}}))},u=JSON.stringify(s),l={role_Id:a,role_Descripcion:i.role_Descripcion.trim(),role_Aduana:n.esAduana,pant_Ids:u,usua_UsuarioModificacion:n.uuid,role_FechaModificacion:c.Z.formatFechaHora(new Date)},e.next=6,t.post("Editar",l);case 6:return p=e.sent,e.abrupt("return",p);case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function p(){return(p=(0,a.Z)((0,r.Z)().mark((function e(a){var i,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={role_Id:a.id,usua_UsuarioEliminacion:n.uuid,role_FechaEliminacion:c.Z.formatFechaHora(new Date)},e.next=4,t.post("Eliminar",i);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{CrearRoles:function(e,t){return u.apply(this,arguments)},EditarRoles:function(e,t,n){return l.apply(this,arguments)},ListadoRoles:function(){return i.apply(this,arguments)},EliminarRoles:function(e){return p.apply(this,arguments)},ExportData:function(){return s.apply(this,arguments)}}}}}]);