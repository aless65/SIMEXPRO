"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[3e3],{64818:function(e,t,r){var a=r(4942),o=r(74165),n=r(15861),i=r(31881),s=r.n(i),c=r(9098);r(70816);t.Z=function(){var e={XApiKey:c.Z.extraerToken()},t=s().create({baseURL:"https://practicaacademia.somee.com/api/ReporteModuloDia/",headers:e}),r=s().create({baseURL:"https://practicaacademia.somee.com/api/ReporteModuloDiaDetalle/",headers:e}),i=s().create({baseURL:"https://practicaacademia.somee.com/api/OrdeEnsaAcabEtiq/",headers:e}),l=JSON.parse(localStorage.getItem("user"));function d(){return(d=(0,n.Z)((0,o.Z)().mark((function e(t){var r,a,n,s;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.get("Listar");case 3:for(r=e.sent,a=[],n=0;n<r.data.data.length;n++)r.data.data[n].proc_Id==t&&a.push(r.data.data[n]);return s=a.map((function(e,t){return{proc_Id:e.proc_Id,ensa_Id:e.ensa_Id,value:e.code_Id,label:"".concat(e.empl_NombreCompleto," - Codigo ").concat(e.orco_Codigo," - Estilo ").concat(e.esti_Descripcion)}})),e.abrupt("return",s);case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function u(){return(u=(0,n.Z)((0,o.Z)().mark((function e(){var r,a,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.get("Listar");case 3:return r=e.sent,a=r.data.data.flat(),n=a.map((function(e,t){var r=null;e.detalles&&(r=JSON.parse(e.detalles).map((function(e,t){return{key:t+1,proc_Id:e.proc_Id,orco_Codigo:e.orco_Codigo,proc_Descripcion:e.proc_Descripcion,orco_Id:e.orco_Id,esti_Descripcion:e.esti_Descripcion,rdet_TotalDia:e.rdet_TotalDia,rdet_TotalDanado:e.rdet_TotalDanado,CantidadBuenEstado:parseInt(e.rdet_TotalDia)-e.rdet_TotalDanado,colr_Nombre:e.colr_Nombre,Sexo:e.Sexo,clie_Nombre_Contacto:e.clie_Nombre_Contacto}})));return{key:t+1,remo_Id:e.remo_Id,modu_Id:e.modu_Id,ensa_Id:e.ensa_Id,orco_Codigo:e.orco_Codigo,proc_Id:parseInt(e.usua_UsuarioModifica),modu_Nombre:e.modu_Nombre,empleado:e.empleado,remo_Fecha:e.remo_Fecha,remo_TotalDia:e.remo_TotalDia,remo_TotalDanado:e.remo_TotalDanado,CantidadBuenEstado:parseInt(e.remo_TotalDia)-parseInt(e.remo_TotalDanado),detalles:r,usua_UsuarioCrea:e.usua_UsuarioCrea,remo_FechaCreacion:e.remo_FechaCreacion,usua_UsuarioModifica:e.usua_UsuarioModificacion,remo_FechaModificacion:e.remo_FechaModificacion,remo_Finalizado:e.remo_Finalizado}})),e.abrupt("return",n);case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function p(){return(p=(0,n.Z)((0,o.Z)().mark((function e(r,a){var n,i,s;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.get("ListarPorFecha?FechaInicio=".concat(r?r.toDateString():"","&FechaFin=").concat(a?a.toDateString():""));case 3:return n=e.sent,i=n.data.data.flat(),s=i.map((function(e,t){var r=null;e.detalles&&(r=JSON.parse(e.detalles).map((function(e,t){return{key:t+1,proc_Id:e.proc_Id,orco_Codigo:e.orco_Codigo,proc_Descripcion:e.proc_Descripcion,orco_Id:e.orco_Id,esti_Descripcion:e.esti_Descripcion,rdet_TotalDia:e.rdet_TotalDia,rdet_TotalDanado:e.rdet_TotalDanado,CantidadBuenEstado:parseInt(e.rdet_TotalDia)-e.rdet_TotalDanado,colr_Nombre:e.colr_Nombre,Sexo:e.Sexo,clie_Nombre_Contacto:e.clie_Nombre_Contacto}})));return{key:t+1,remo_Id:e.remo_Id,modu_Id:e.modu_Id,empleado:e.empleado,modu_Nombre:e.modu_Nombre,remo_Fecha:e.remo_Fecha,remo_TotalDia:e.remo_TotalDia,remo_TotalDanado:e.remo_TotalDanado,CantidadBuenEstado:parseInt(e.remo_TotalDia)-parseInt(e.remo_TotalDanado)<0?0:parseInt(e.remo_TotalDia)-parseInt(e.remo_TotalDanado),detalles:r,usua_UsuarioCrea:e.usua_UsuarioCrea,remo_FechaCreacion:e.remo_FechaCreacion,usua_UsuarioModifica:e.usua_UsuarioModifica,remo_FechaModificacion:e.remo_FechaModificacion,remo_Finalizado:e.remo_Finalizado}})),e.abrupt("return",s);case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function m(){return(m=(0,n.Z)((0,o.Z)().mark((function e(r){var n,i,s;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={modu_Id:r.modu_Id},(0,a.Z)(n,"modu_Id",r.modulo.value),(0,a.Z)(n,"remo_Fecha",r.remo_Fecha),(0,a.Z)(n,"remo_TotalDia",0),(0,a.Z)(n,"remo_TotalDanado",0),(0,a.Z)(n,"usua_UsuarioCreacion",l.uuid),(0,a.Z)(n,"remo_FechaCreacion",c.Z.formatFechaHora(new Date)),i=n,e.next=4,t.post("Insertar",i);case 4:return s=e.sent,e.abrupt("return",s);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function _(){return(_=(0,n.Z)((0,o.Z)().mark((function e(r){var a,n,i,s;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=new Date(r.remo_Fecha),n=a.toISOString(),i={remo_Id:r.remo_Id,modu_Id:r.modulo.value,remo_Fecha:n,remo_TotalDia:1,remo_TotalDanado:1,usua_UsuarioModificacion:l.uuid,remo_FechaModificacion:c.Z.formatFechaHora(new Date)},e.next=6,t.post("Editar",i);case 6:return s=e.sent,e.abrupt("return",s);case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function h(){return(h=(0,n.Z)((0,o.Z)().mark((function e(r){var a,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={remo_Id:r[0].remo_Id},e.next=4,t.post("Finalizar",a);case 4:return n=e.sent,e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function f(){return(f=(0,n.Z)((0,o.Z)().mark((function e(t){var a,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar/"+t);case 3:return a=e.sent,n=a.data.data.map((function(e,t){return{key:t+1,rdet_Id:parseInt(e.rdet_Id),remo_Id:parseInt(e.remo_Id),orco_Codigo:e.orco_Codigo,code_CantidadPrenda:parseInt(e.code_CantidadPrenda),rdet_TotalDia:parseInt(e.rdet_TotalDia),rdet_TotalDanado:parseInt(e.rdet_TotalDanado),CantidadBuenEstado:parseInt(e.rdet_TotalDia)-parseInt(e.rdet_TotalDanado)<0?0:parseInt(e.rdet_TotalDia)-parseInt(e.rdet_TotalDanado),code_Id:parseInt(e.code_Id),ensa_Id:parseInt(e.ensa_Id),proc_Id:parseInt(e.proc_Id),sexo:e.sexo,colr_Nombre:e.colr_Nombre,clie_Nombre_Contacto:e.clie_Nombre_Contacto,clie_RTN:e.clie_RTN,orco_Id:parseInt(e.orco_Id),esti_Descripcion:e.esti_Descripcion,usua_UsuarioCrea:e.usua_UsuarioCrea}})),e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function x(){return(x=(0,n.Z)((0,o.Z)().mark((function e(t){var a,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={remo_Id:parseInt(t.remo_Id),code_Id:parseInt(t.OrdenCompraDetalle.value),ensa_Id:parseInt(t.OrdenCompraDetalle.ensa_Id),rdet_TotalDia:parseInt(t.rdet_TotalDiaDetalle),rdet_TotalDanado:parseInt(t.rdet_TotalDanadoDetalle),usua_UsuarioCreacion:l.uuid},e.next=4,r.post("Insertar",a);case 4:return n=e.sent,e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function Z(){return(Z=(0,n.Z)((0,o.Z)().mark((function e(t){var a,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={rdet_Id:t.rdet_Id,remo_Id:t.remo_Id,code_Id:parseInt(t.OrdenCompraDetalle.value),ensa_Id:parseInt(t.OrdenCompraDetalle.ensa_Id),rdet_TotalDia:t.rdet_TotalDiaDetalle,rdet_TotalDanado:t.rdet_TotalDanadoDetalle,usua_UsuarioModificacion:l.uuid},e.next=4,r.post("Editar",a);case 4:return n=e.sent,e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function v(){return(v=(0,n.Z)((0,o.Z)().mark((function e(t){var a,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={rdet_Id:t.rdet_Id},e.next=4,r.post("Eliminar",a);case 4:return n=e.sent,e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return u.apply(this,arguments)},crear:function(e){return m.apply(this,arguments)},editar:function(e){return _.apply(this,arguments)},crearDetalle:function(e){return x.apply(this,arguments)},listarProceso:function(e){return d.apply(this,arguments)},listarDetalles:function(e){return f.apply(this,arguments)},EditarDetalle:function(e){return Z.apply(this,arguments)},EliminarDetalle:function(e){return v.apply(this,arguments)},Finalizar:function(e){return h.apply(this,arguments)},listarRangos:function(e,t){return p.apply(this,arguments)}}}},83e3:function(e,t,r){r.r(t);var a=r(74165),o=r(15861),n=r(4942),i=r(1413),s=r(29439),c=r(35898),l=r(24193),d=r(71263),u=r(82047),p=r(51405),m=r(73428),_=r(16957),h=r(65033),f=r(93405),x=r(1550),Z=r(88797),v=r(24631),I=r(41727),b=r(47131),D=r(9019),y=r(19536),g=r(66212),C=r(9506),j=r(15103),T=r(61113),S=r(57983),k=r(47313),w=r(58467),F=r(521),N=r(62563),E=r(75627),R=r(3463),M=r(56954),P=r(28155),z=(r(77453),r(88477)),L=r(64818),B=(r(88282),r(75265)),U=r(46417),A=M.Z.RangePicker,O={remo_Id:"",modulo:null,remo_Fecha:"",remo_TotalDia:"",remo_TotalDanado:""},q=R.Ry().shape({remo_Id:R.Z_(),modulo:R.Ry().required(""),remo_Fecha:R.Z_().trim().required(""),remo_TotalDia:R.Z_().trim().required(""),remo_TotalDanado:R.Z_().trim().required("")});t.default=function(){var e=(0,L.Z)(),t=(0,w.s0)(),r=(0,k.useState)(""),R=(0,s.Z)(r,2),M=R[0],H=R[1],$=(0,k.useState)(!0),W=(0,s.Z)($,2),J=W[0],V=(W[1],(0,k.useState)(!1)),X=(0,s.Z)(V,2),K=X[0],G=(X[1],(0,k.useState)([])),Q=(0,s.Z)(G,2),Y=Q[0],ee=Q[1],te=(0,k.useState)([]),re=(0,s.Z)(te,2),ae=re[0],oe=(re[1],(0,k.useState)(null)),ne=(0,s.Z)(oe,2),ie=(ne[0],ne[1],(0,k.useState)({})),se=(0,s.Z)(ie,2),ce=se[0],le=se[1],de=k.useState(10),ue=(0,s.Z)(de,2),pe=ue[0],me=ue[1],_e=function(e){le((function(t){return(0,i.Z)((0,i.Z)({},t),{},(0,n.Z)({},e,null))}))};(0,k.useEffect)((function(){he()}),[]);var he=function(){var t=(0,o.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.t0=ee,t.next=4,e.listar();case 4:t.t1=t.sent,(0,t.t0)(t.t1),t.next=10;break;case 8:t.prev=8,t.t2=t.catch(0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}}(),fe=function(){var t=(0,o.Z)((0,a.Z)().mark((function t(r){var o;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.listarRangos(r?r[0].$d:null,r?r[1].$d:null);case 3:o=t.sent,ee(o),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),xe=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,t){return e.key-t.key}},{title:"M\xf3dulo",dataIndex:"modu_Nombre",key:"modu_Nombre",sorter:function(e,t){return e.modu_Nombre.localeCompare(t.modu_Nombre)}},{title:"Fecha",dataIndex:"remo_Fecha",key:"remo_Fecha",sorter:function(e,t){return e.remo_Fecha.localeCompare(t.remo_Fecha)},render:function(e,t){return new Date(t.remo_Fecha).toLocaleString("es-US",{dateStyle:"short"})}},{title:"Cantidad Terminada",dataIndex:"remo_TotalDia",key:"remo_TotalDia",sorter:function(e,t){return e.remo_TotalDia-t.remo_TotalDia}},{title:"Cantidad Da\xf1ada",dataIndex:"remo_TotalDanado",key:"remo_TotalDanado",sorter:function(e,t){return e.remo_TotalDanado-t.remo_TotalDanado}},{title:"Cantidad Total",dataIndex:"CantidadBuenEstado",key:"CantidadBuenEstado",sorter:function(e,t){return e.CantidadBuenEstado-t.CantidadBuenEstado}},{title:"Acciones",key:"operation",render:function(e){return(0,U.jsx)("div",{children:(0,U.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,U.jsx)(l.Z,{"aria-controls":"menu-".concat(e.remo_Id),"aria-haspopup":"true",onClick:function(t){return r=t,a=e.remo_Id,void le((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,n.Z)({},a,r.currentTarget))}));var r,a},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,U.jsx)(d.Z,{children:"menu"}),children:"Opciones"}),(0,U.jsxs)(u.Z,{id:"menu-".concat(e.remo_Id),anchorEl:ce[e.remo_Id],keepMounted:!0,open:Boolean(ce[e.remo_Id]),onClose:function(){return _e(e.remo_Id)},children:[(0,U.jsxs)(p.Z,{onClick:function(){return Ze(e)},children:[(0,U.jsx)(d.Z,{children:"edit"}),"\u3164Editar"]}),(0,U.jsxs)(p.Z,{onClick:function(){return ve(e)},children:[(0,U.jsx)(d.Z,{children:"visibility"}),"\u3164Reporte"]})]})]})},e.remo_Id)}}],Ze=function(e){e.remo_Finalizado?(0,B.go)("Advertencia. Este pedido ha sido finalizado. Lamentablemente, no es posible realizar modificaciones en el mismo."):F.Z.push("/ReporteModulo/Crear",e),_e(e.remo_Id)},ve=function(e){e.detalles?(F.Z.push("/ReporteModulo/Reporte",e),_e(e.remo_Id)):(0,B.go)("Este reporte no posee detalles. Imposible poder visualizarlo.")},Ie=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,t){return e.code_Id-t.code_Id}},{title:"Nombre de Contacto",dataIndex:"clie_Nombre_Contacto",key:"clie_Nombre_Contacto",sorter:function(e,t){return e.clie_Nombre_Contacto.localeCompare(t.clie_Nombre_Contacto)}},{title:"Estilo de prenda",dataIndex:"esti_Descripcion",key:"esti_Descripcion",sorter:function(e,t){return e.esti_Descripcion.localeCompare(t.esti_Descripcion)}},{title:"Sexo",dataIndex:"Sexo",key:"Sexo",sorter:function(e,t){return e.Sexo.localeCompare(t.Sexo)}},{title:"Cantidad Terminada",dataIndex:"rdet_TotalDia",key:"rdet_TotalDia",sorter:function(e,t){return e.rdet_TotalDia-t.rdet_TotalDia}},{title:"Cantidad Da\xf1ada",dataIndex:"rdet_TotalDanado",key:"rdet_TotalDanado",sorter:function(e,t){return e.rdet_TotalDanado-t.rdet_TotalDanado}},{title:"Cantidad Total",dataIndex:"CantidadBuenEstado",key:"CantidadBuenEstado",sorter:function(e,t){return e.rdet_TotalDanado-t.rdet_TotalDanado}}],be=["modu_Nombre","remo_Fecha","remo_TotalDia","remo_TotalDanado","CantidadBuenEstado","key"],De=(0,k.useState)({}),ye=(0,s.Z)(De,2),ge=ye[0],Ce=ye[1],je=Y.filter((function(e){if(""===M)return!0;for(var t=0,r=Object.entries(e);t<r.length;t++){var a=(0,s.Z)(r[t],2),o=a[0],n=a[1];if(be.includes(o)){var i="number"===typeof n?n.toString():n.toString().toLowerCase(),c="number"===typeof M?M.toString():M.toLowerCase();if(i.includes(c))return!0}}return!1})).reverse(),Te=(0,E.cI)({defaultReporteModuloDiasValues:O,mode:"all",resolver:(0,N.X)(q)}),Se=(Te.handleSubmit,Te.register,Te.reset,Te.control,Te.watch),ke=Te.formState,we=(Te.setValue,ke.isValid,ke.dirtyFields,ke.errors,Se(),(0,k.useState)(null)),Fe=(0,s.Z)(we,2),Ne=(Fe[0],Fe[1],(0,k.useState)(null)),Ee=(0,s.Z)(Ne,2),Re=(Ee[0],Ee[1],(0,k.useState)(!1)),Me=(0,s.Z)(Re,2),Pe=(Me[0],Me[1],(0,k.useState)(!1)),ze=(0,s.Z)(Pe,2),Le=(ze[0],ze[1],(0,k.useState)(!1)),Be=(0,s.Z)(Le,2),Ue=(Be[0],Be[1],(0,k.useState)(!1)),Ae=(0,s.Z)(Ue,2);return Ae[0],Ae[1],(0,U.jsx)(U.Fragment,{children:(0,U.jsxs)(m.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,U.jsx)(_.Z,{component:"img",height:"200",image:"https://i.ibb.co/DfZ8SL7/REPORTEs-M-DULO.png",alt:"Encabezado de la carta"}),(0,U.jsxs)(h.Z,{in:J,children:[(0,U.jsxs)(f.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,U.jsx)(c.Z,{direction:"row",spacing:1,sx:{marginTop:"2rem"},children:(0,U.jsx)(l.Z,{startIcon:(0,U.jsx)(d.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){t("/ReporteModulo/Crear")},children:"Nuevo"})}),(0,U.jsxs)(c.Z,{direction:"row",spacing:1,sx:{marginTop:"2rem"},children:[(0,U.jsx)("label",{className:"mt-8",children:"Rango:"}),(0,U.jsx)(A,{size:"large",placeholder:["Fecha inicio","Fecha fin"],value:ge,onChange:function(e){Ce(e),fe(e)}})]}),(0,U.jsxs)(c.Z,{direction:"row",spacing:1,sx:{marginTop:"2rem"},children:[(0,U.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,U.jsx)(x.Z,{sx:{minWidth:50},size:"small",children:(0,U.jsxs)(Z.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:pe,onChange:function(e){me(e.target.value)},children:[(0,U.jsx)(p.Z,{value:10,children:"10"}),(0,U.jsx)(p.Z,{value:25,children:"25"}),(0,U.jsx)(p.Z,{value:50,children:"50"})]})}),(0,U.jsx)(c.Z,{direction:"row",spacing:3,sx:{marginTop:"2rem"},children:(0,U.jsx)(v.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:M,onChange:function(e){H(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,U.jsx)(I.Z,{position:"start",children:(0,U.jsx)(b.Z,{edge:"start",children:(0,U.jsx)(S.Z,{})})})}})})]})]}),(0,U.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,U.jsx)(P.Z,{columns:xe,scroll:{x:!0},expandable:{columnTitle:"Desplegar detalle",expandedRowRender:function(e){return(0,U.jsx)(P.Z,{columns:Ie,dataSource:e.detalles,pagination:!1})}},dataSource:je,size:"small",pagination:{pageSize:pe,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,U.jsx)(h.Z,{in:K,children:(0,U.jsx)(f.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-center"},children:(0,U.jsxs)(D.ZP,{container:!0,spacing:3,children:[(0,U.jsx)(D.ZP,{item:!0,xs:12,style:{marginBottom:"30px"},children:(0,U.jsx)(y.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,U.jsx)(g.Z,{label:"Detalles de la Marca de Maquina"})})}),(0,U.jsxs)(D.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:[(0,U.jsx)(C.Z,{sx:{flex:1,textAlign:"center"},children:(0,U.jsxs)(j.Z,{htmlFor:"id",children:[(0,U.jsx)(T.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Id:"}),(0,U.jsx)(T.Z,{children:ae.remo_Id})]})}),(0,U.jsx)(C.Z,{sx:{flex:1,textAlign:"center"},children:(0,U.jsxs)(j.Z,{htmlFor:"descripcion",children:[(0,U.jsx)(T.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre:"}),(0,U.jsx)(T.Z,{children:ae.remo_Nombre})]})})]}),(0,U.jsx)(D.ZP,{item:!0,xs:12,children:(0,U.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,U.jsx)("thead",{children:(0,U.jsxs)("tr",{children:[(0,U.jsxs)("th",{style:z.Z.tableHeaderStyle,children:[(0,U.jsx)(d.Z,{style:z.Z.iconStyle,children:"edit"}),"No."]}),(0,U.jsxs)("th",{style:z.Z.tableHeaderStyle,children:[(0,U.jsx)(d.Z,{style:z.Z.iconStyle,children:"person"}),"Contacto"]}),(0,U.jsx)("th",{style:z.Z.tableHeaderStyle,children:(0,U.jsx)(d.Z,{style:z.Z.iconStyle,children:"Estilo"})})]})}),(0,U.jsxs)("tbody",{children:[(0,U.jsxs)("tr",{style:z.Z.tableRowStyle,children:[(0,U.jsx)("td",{style:z.Z.tableCellStyle,children:(0,U.jsx)("strong",{children:"Creaci\xf3n"})}),(0,U.jsx)("td",{style:z.Z.tableCellStyle,children:ae.clie_Nombre_Contacto}),(0,U.jsx)("td",{style:z.Z.tableCellStyle,children:ae.remo_FechaCreacion?new Date(ae.remo_FechaCreacion).toLocaleString():""})]}),(0,U.jsxs)("tr",{style:z.Z.tableRowStyle,children:[(0,U.jsx)("td",{style:z.Z.tableCellStyle,children:(0,U.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,U.jsx)("td",{style:z.Z.tableCellStyle,children:ae.usuarioModificador}),(0,U.jsx)("td",{style:z.Z.tableCellStyle,children:ae.remo_FechaModificacion?new Date(ae.remo_FechaModificacion).toLocaleString():""})]})]})]})}),(0,U.jsx)("br",{}),(0,U.jsx)(D.ZP,{item:!0,xs:12,children:(0,U.jsx)("div",{className:"card-footer",children:(0,U.jsx)(l.Z,{variant:"contained",onClick:function(){CollapseDetalles()},startIcon:(0,U.jsx)(d.Z,{children:"arrow_back"}),children:"Regresar"})})})]})})})]})})}},57983:function(e,t,r){var a=r(64836);t.Z=void 0;var o=a(r(45045)),n=r(46417),i=(0,o.default)((0,n.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.Z=i},41727:function(e,t,r){r.d(t,{Z:function(){return D}});var a=r(4942),o=r(63366),n=r(87462),i=r(47313),s=r(83061),c=r(21921),l=r(91615),d=r(61113),u=r(91397),p=r(99008),m=r(88564),_=r(32298);function h(e){return(0,_.Z)("MuiInputAdornment",e)}var f,x=(0,r(77430).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),Z=r(77342),v=r(46417),I=["children","className","component","disablePointerEvents","disableTypography","position","variant"],b=(0,m.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,t["position".concat((0,l.Z)(r.position))],!0===r.disablePointerEvents&&t.disablePointerEvents,t[r.variant]]}})((function(e){var t=e.theme,r=e.ownerState;return(0,n.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(t.vars||t).palette.action.active},"filled"===r.variant&&(0,a.Z)({},"&.".concat(x.positionStart,"&:not(.").concat(x.hiddenLabel,")"),{marginTop:16}),"start"===r.position&&{marginRight:8},"end"===r.position&&{marginLeft:8},!0===r.disablePointerEvents&&{pointerEvents:"none"})})),D=i.forwardRef((function(e,t){var r=(0,Z.Z)({props:e,name:"MuiInputAdornment"}),a=r.children,m=r.className,_=r.component,x=void 0===_?"div":_,D=r.disablePointerEvents,y=void 0!==D&&D,g=r.disableTypography,C=void 0!==g&&g,j=r.position,T=r.variant,S=(0,o.Z)(r,I),k=(0,p.Z)()||{},w=T;T&&k.variant,k&&!w&&(w=k.variant);var F=(0,n.Z)({},r,{hiddenLabel:k.hiddenLabel,size:k.size,disablePointerEvents:y,position:j,variant:w}),N=function(e){var t=e.classes,r=e.disablePointerEvents,a=e.hiddenLabel,o=e.position,n=e.size,i=e.variant,s={root:["root",r&&"disablePointerEvents",o&&"position".concat((0,l.Z)(o)),i,a&&"hiddenLabel",n&&"size".concat((0,l.Z)(n))]};return(0,c.Z)(s,h,t)}(F);return(0,v.jsx)(u.Z.Provider,{value:null,children:(0,v.jsx)(b,(0,n.Z)({as:x,ownerState:F,className:(0,s.default)(N.root,m),ref:t},S,{children:"string"!==typeof a||C?(0,v.jsxs)(i.Fragment,{children:["start"===j?f||(f=(0,v.jsx)("span",{className:"notranslate",children:"\u200b"})):null,a]}):(0,v.jsx)(d.Z,{color:"text.secondary",children:a})}))})}))},35898:function(e,t,r){var a=r(4942),o=r(63366),n=r(87462),i=r(47313),s=r(54929),c=r(86886),l=r(39028),d=r(13019),u=r(88564),p=r(77342),m=r(46417),_=["component","direction","spacing","divider","children"];function h(e,t){var r=i.Children.toArray(e).filter(Boolean);return r.reduce((function(e,a,o){return e.push(a),o<r.length-1&&e.push(i.cloneElement(t,{key:"separator-".concat(o)})),e}),[])}var f=(0,u.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return[t.root]}})((function(e){var t=e.ownerState,r=e.theme,o=(0,n.Z)({display:"flex",flexDirection:"column"},(0,s.k9)({theme:r},(0,s.P$)({values:t.direction,breakpoints:r.breakpoints.values}),(function(e){return{flexDirection:e}})));if(t.spacing){var i=(0,c.hB)(r),l=Object.keys(r.breakpoints.values).reduce((function(e,r){return("object"===typeof t.spacing&&null!=t.spacing[r]||"object"===typeof t.direction&&null!=t.direction[r])&&(e[r]=!0),e}),{}),u=(0,s.P$)({values:t.direction,base:l}),p=(0,s.P$)({values:t.spacing,base:l});"object"===typeof u&&Object.keys(u).forEach((function(e,t,r){if(!u[e]){var a=t>0?u[r[t-1]]:"column";u[e]=a}}));o=(0,d.Z)(o,(0,s.k9)({theme:r},p,(function(e,r){return{"& > :not(style) + :not(style)":(0,a.Z)({margin:0},"margin".concat((o=r?u[r]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[o])),(0,c.NA)(i,e))};var o})))}return o=(0,s.dt)(r.breakpoints,o)})),x=i.forwardRef((function(e,t){var r=(0,p.Z)({props:e,name:"MuiStack"}),a=(0,l.Z)(r),i=a.component,s=void 0===i?"div":i,c=a.direction,d=void 0===c?"column":c,u=a.spacing,x=void 0===u?0:u,Z=a.divider,v=a.children,I=(0,o.Z)(a,_),b={direction:d,spacing:x};return(0,m.jsx)(f,(0,n.Z)({as:s,ownerState:b,ref:t},I,{children:Z?h(v,Z):v}))}));t.Z=x}}]);