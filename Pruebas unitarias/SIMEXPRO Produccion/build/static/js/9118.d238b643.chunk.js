"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[9118],{29118:function(e,r,t){t.r(r),t.d(r,{default:function(){return ue}});var n=t(74165),o=t(4942),a=t(1413),i=t(15861),s=t(29439),l=t(57983),c=t(35898),d=t(24193),u=t(71263),p=t(82047),m=t(51405),x=t(73428),h=t(16957),f=t(65033),Z=t(93405),j=t(9019),b=t(61113),g=t(1550),v=t(88797),y=t(24631),C=t(41727),_=t(47131),k=t(19536),S=t(66212),w=t(5178),I=t(25298),N=t(94469),E=t(33604),D=t(96467),P=t(97762),F=t(4117),M=t(9506),A=t(15103),R=t(47313),T=t(62563),B=t(75627),U=t(3463),z=t(28155),H=(t(77453),t(89145)),W=t(88477),L=t(31881),O=t.n(L),q=t(9098);var V=function(){var e={XApiKey:q.Z.extraerToken()},r=O().create({baseURL:"https://practicaacademia.somee.com/api/Modulos/",headers:e}),t=JSON.parse(localStorage.getItem("user"));function o(){return(o=(0,i.Z)((0,n.Z)().mark((function e(){var t,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,o=t.data.data.map((function(e,r){return{key:r+1,modu_Id:e.modu_Id,modu_Nombre:e.modu_Nombre,proc_Id:e.proc_Id,proc_Descripcion:e.proc_Descripcion,empr_Id:e.empr_Id,empl_NombreCompleto:e.empl_NombreCompleto,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usuarioCreacion:e.usuarioCreacion,modu_FechaCreacion:e.modu_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,usuarioModifica:e.usuarioModifica,modu_FechaModificacion:e.modu_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,usuarioEliminacion:e.usuarioEliminacion,modu_FechaEliminacion:e.modu_FechaEliminacion,modu_Estado:e.modu_Estado}})),e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function a(){return(a=(0,i.Z)((0,n.Z)().mark((function e(){var t,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,o=t.data.data.map((function(e,r){return{key:r+1,modu_Nombre:e.modu_Nombre,proc_Descripcion:e.proc_Descripcion,empl_NombreCompleto:e.empl_NombreCompleto}})),e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,i.Z)((0,n.Z)().mark((function e(o){var a,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={modu_Nombre:o.modulo.trim(),proc_Id:o.proceso.value,empr_Id:o.empleado.value,usua_UsuarioCreacion:t.uuid,modu_FechaCreacion:q.Z.formatFechaHora(new Date)},e.next=4,r.post("Insertar",a);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function l(){return(l=(0,i.Z)((0,n.Z)().mark((function e(o){var a,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={modu_Id:o.id,modu_Nombre:o.modulo.trim(),proc_Id:o.proceso.value,empr_Id:o.empleado.value,usua_UsuarioModificacion:t.uuid,modu_FechaModificacion:q.Z.formatFechaHora(new Date)},e.next=4,r.post("Editar",a);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,i.Z)((0,n.Z)().mark((function e(o){var a,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={modu_Id:o.id,usua_UsuarioEliminacion:t.uuid,modu_FechaEliminacion:q.Z.formatFechaHora(new Date)},e.next=4,r.post("Eliminar",a);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return o.apply(this,arguments)},crear:function(e){return s.apply(this,arguments)},editar:function(e){return l.apply(this,arguments)},eliminar:function(e){return c.apply(this,arguments)},ExportData:function(){return a.apply(this,arguments)}}},Q=t(68673),J=t(280),K=t(66106),G=t(40894),X=(t(88282),t(75265)),Y=t(93433),$=t(66244),ee=t(78925),re=t(48737),te=t(46417);var ne=function(e){var r=e.data,t=e.handleCloseExportar;return(0,te.jsxs)(m.Z,{onClick:function(){!function(){var e=r.map((function(e){return[e.key,e.modu_Nombre,e.proc_Descripcion,e.empl_NombreCompleto]})),t=re.P6.aoa_to_sheet([["No.","Nombre del m\xf3dulo","Proceso asignado","Nombre del encargado"]].concat((0,Y.Z)(e))),n=re.P6.book_new();re.P6.book_append_sheet(n,t,"Sheet1");var o=re.cW(n,{bookType:"xlsx",type:"array"}),a=new Blob([o],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,ee.saveAs)(a,"Modulos.xlsx")}(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,te.jsx)($.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},oe=t(76278),ae=t(39284),ie=t.n(ae),se=t(11593);ie().vfs=se.I.vfs;var le=function(e){var r=e.data,t=e.handleCloseExportar,o=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var t,o,a,i,s,l,c;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="A4",o=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",a=q.Z.formatFechaHora(new Date),i=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,O().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:s=e.sent,l=s.data,(c=new FileReader).onload=function(){var e={content:[{image:c.result,margin:[-40,-40],width:600,height:45},{text:"M\xf3dulos",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,r,n,a){return e.y+e.height>t[1]-o[3]},defaultStyle:{fontSize:12},footer:function(e,r){return{columns:[{text:"Generado por: ".concat(i.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(r),style:"footer"},{text:"Fecha: ".concat(a.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["auto","auto","auto","*"],body:[[{text:"No.",style:"tableHeader"},{text:"Nombre del m\xf3dulo",style:"tableHeader"},{text:"Proceso asignado",style:"tableHeader"},{text:"Nombre del encargado",style:"tableHeader"}]].concat((0,Y.Z)(r.map((function(e){return[e.key,e.modu_Nombre,e.proc_Descripcion,e.empl_NombreCompleto]})))),alignment:"center"}}),ie().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},c.readAsDataURL(l),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,te.jsx)("div",{children:(0,te.jsxs)(m.Z,{onClick:function(){o(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,te.jsx)(oe.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})},ce={id:"",proceso:null,empleado:null,modulo:""},de=U.Ry().shape({id:U.Z_(),proceso:U.Ry().required(""),empleado:U.Ry().required(""),modulo:U.Z_().trim().required("")});var ue=function(){var e=(0,R.useState)([]),r=(0,s.Z)(e,2),t=r[0],U=r[1],L=(0,Q.Z)(),O=V(),q=(0,R.useState)([]),Y=(0,s.Z)(q,2),$=Y[0],ee=Y[1],re=(0,R.useState)([]),oe=(0,s.Z)(re,2),ae=oe[0],ie=oe[1];function se(){return(se=(0,i.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=ee,e.next=3,L.Procesos();case 3:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=ie,e.next=8,L.Empleados();case 8:e.t3=e.sent,(0,e.t2)(e.t3);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ue=(0,R.useState)(""),pe=(0,s.Z)(ue,2),me=pe[0],xe=pe[1],he=(0,R.useState)(!0),fe=(0,s.Z)(he,2),Ze=fe[0],je=fe[1],be=(0,R.useState)(!1),ge=(0,s.Z)(be,2),ve=ge[0],ye=ge[1],Ce=(0,R.useState)(!1),_e=(0,s.Z)(Ce,2),ke=_e[0],Se=_e[1],we=(0,R.useState)({}),Ie=(0,s.Z)(we,2),Ne=Ie[0],Ee=Ie[1],De=(0,R.useState)(!1),Pe=(0,s.Z)(De,2),Fe=Pe[0],Me=Pe[1],Ae=(0,R.useState)(!1),Re=(0,s.Z)(Ae,2),Te=Re[0],Be=Re[1],Ue=R.useState(10),ze=(0,s.Z)(Ue,2),He=ze[0],We=ze[1],Le=(0,R.useState)({}),Oe=(0,s.Z)(Le,2),qe=Oe[0],Ve=Oe[1],Qe=(0,R.useState)([]),Je=(0,s.Z)(Qe,2),Ke=Je[0],Ge=Je[1],Xe=function(){je(!Ze),ye(!ve),lr(ce)},Ye=function(){Me(!Fe)},$e=function(){je(!Ze),Se(!ke)},er=function(e){Ve((function(r){return(0,a.Z)((0,a.Z)({},r),{},(0,o.Z)({},e,null))}))},rr=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,r){return e.key-r.key}},{title:"Nombre del m\xf3dulo",dataIndex:"modu_Nombre",key:"modu_Nombre",sorter:function(e,r){return e.modu_Nombre.localeCompare(r.modu_Nombre)}},{title:"Proceso asignado",dataIndex:"proc_Descripcion",key:"proc_Descripcion",sorter:function(e,r){return e.proc_Descripcion.localeCompare(r.proc_Descripcion)}},{title:"Nombre del encargado",dataIndex:"empl_NombreCompleto",key:"empl_NombreCompleto",sorter:function(e,r){return e.empl_NombreCompleto.localeCompare(r.empl_NombreCompleto)}},{title:"Acciones",key:"operation",render:function(e){return(0,te.jsx)("div",{children:(0,te.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,te.jsx)(d.Z,{"aria-controls":"menu-".concat(e.modu_Id),"aria-haspopup":"true",onClick:function(r){return t=r,n=e.modu_Id,void Ve((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,o.Z)({},n,t.currentTarget))}));var t,n},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,te.jsx)(u.Z,{children:"menu"}),children:"Opciones"}),(0,te.jsxs)(p.Z,{id:"menu-".concat(e.modu_Id),anchorEl:qe[e.modu_Id],keepMounted:!0,open:Boolean(qe[e.modu_Id]),onClose:function(){return er(e.modu_Id)},children:[(0,te.jsxs)(m.Z,{onClick:function(){return r=e,Xe(),Be(!0),pr("id",r.modu_Id),pr("modulo",r.modu_Nombre),pr("proceso",$.find((function(e){return e.value===r.proc_Id}))),pr("empleado",ae.find((function(e){return e.value===r.empr_Id}))),void er(r.modu_Id);var r},children:[(0,te.jsx)(u.Z,{children:"edit"}),"\u3164Editar"]}),(0,te.jsxs)(m.Z,{onClick:function(){return Ee(r=e),$e(),void er(r.modu_Id);var r},children:[(0,te.jsx)(u.Z,{children:"visibility"}),"\u3164Detalles"]}),(0,te.jsxs)(m.Z,{onClick:function(){return pr("id",(r=e).modu_Id),Ye(),void er(r.modu_Id);var r},children:[(0,te.jsx)(u.Z,{children:"delete"}),"\u3164Eliminar"]})]})]})},e.modu_Id)}}],tr={filename:"Modulos",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"Nombre del m\xf3dulo"},{label:"Proceso asignado"},{label:"Nombre del encargado"}].map((function(e){return e.label}))},nr=new G.ExportToCsv(tr),or=["key","modu_Nombre","proc_Descripcion","empl_NombreCompleto"],ar=Ke.filter((function(e){if(""===me)return!0;for(var r=0,t=Object.entries(e);r<t.length;r++){var n=(0,s.Z)(t[r],2),o=n[0],a=n[1];if(or.includes(o)){var i="number"===typeof a?a.toString():a.toString().toLowerCase(),l="number"===typeof me?me.toString():me.toLowerCase();if(i.includes(l))return!0}}return!1})).reverse(),ir=(0,B.cI)({defaultModulosValues:ce,mode:"all",resolver:(0,T.X)(de)}),sr=ir.handleSubmit,lr=(ir.register,ir.reset),cr=ir.control,dr=ir.watch,ur=ir.formState,pr=ir.setValue,mr=ur.isValid,xr=(ur.dirtyFields,ur.errors),hr=dr(),fr=(0,R.useState)([]),Zr=(0,s.Z)(fr,2),jr=Zr[0],br=Zr[1],gr=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,br([]),Ge([]),e.next=5,O.listar();case 5:return r=e.sent,Ge(r),r.length>0?br(r):br(null),e.t0=U,e.next=11,O.ExportData();case 11:e.t1=e.sent,(0,e.t0)(e.t1),e.next=18;break;case 15:e.prev=15,e.t2=e.catch(0),br(null);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}(),vr=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.crear(hr);case 3:"1"==(r=e.sent).data.data.messageStatus?((0,X.ys)(),gr(),Xe(),lr(ce)):r.data.data.messageStatus.includes("UNIQUE")&&(0,X.d0)(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,X.bW)();case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),yr=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.editar(hr);case 3:"1"==(r=e.sent).data.data.messageStatus?((0,X.fn)(),gr(),Xe(),lr(ce)):r.data.data.messageStatus.includes("UNIQUE")&&(0,X.d0)(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,X.bW)();case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),Cr=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.eliminar(hr);case 3:"1"==(r=e.sent).data.data.messageStatus?((0,X.Pt)(),gr(),Ye(),lr(ce)):r.data.data.messageStatus.includes("0")&&((0,X.tb)(),Ye()),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),(0,X.bW)(),Ye();case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();(0,R.useEffect)((function(){!function(){se.apply(this,arguments)}(),gr()}),[]);var _r=function(){Ve((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,o.Z)({},"menu-exportar",null))}))};return(0,te.jsxs)(x.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,te.jsx)(h.Z,{component:"img",height:"200",image:"https://i.ibb.co/SJQHYkr/M-DULOS.png",alt:"Encabezado de la carta"}),(0,te.jsxs)(f.Z,{in:Ze,children:[(0,te.jsxs)(Z.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:["         ",(0,te.jsxs)(j.ZP,{container:!0,spacing:1,children:[(0,te.jsx)(j.ZP,{item:!0,xs:12,sm:12,md:6,display:"flex",sx:{justifyContent:{xs:"center",sm:"center",md:"start"}},children:(0,te.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,te.jsx)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Xe(),Be(!1)},children:"Nuevo"}),(0,te.jsxs)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"upload"}),onClick:function(e){return r=e,t="menu-exportar",void Ve((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,o.Z)({},t,r.currentTarget))}));var r,t},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,te.jsx)(b.Z,{children:"Exportar"}),(0,te.jsx)(K.Z,{})]}),(0,te.jsx)("div",{children:(0,te.jsxs)(p.Z,{id:"menu-exportar",anchorEl:qe["menu-exportar"],open:Boolean(qe["menu-exportar"]),onClose:function(){return _r()},keepMounted:!0,children:[(0,te.jsxs)(m.Z,{onClick:function(){!function(){try{nr.generateCsv(t)}catch(e){}}(),_r()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,te.jsx)(J.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,te.jsx)(le,{data:t,handleCloseExportar:_r}),(0,te.jsx)(ne,{data:t,handleCloseExportar:_r})]})},"menu-exportar")]})}),(0,te.jsxs)(j.ZP,{item:!0,xs:12,sm:6,md:3,display:"flex",sx:{justifyContent:{xs:"center",sm:"end",md:"end"}},children:[(0,te.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,te.jsx)(g.Z,{sx:{minWidth:50},size:"small",children:(0,te.jsxs)(v.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:He,onChange:function(e){We(e.target.value)},children:[(0,te.jsx)(m.Z,{value:10,children:"10"}),(0,te.jsx)(m.Z,{value:25,children:"25"}),(0,te.jsx)(m.Z,{value:50,children:"50"})]})})]}),(0,te.jsx)(j.ZP,{item:!0,xs:12,sm:6,md:3,display:"flex",sx:{justifyContent:{xs:"center",sm:"start",md:"center"}},children:(0,te.jsx)(y.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:me,onChange:function(e){xe(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,te.jsx)(C.Z,{position:"start",children:(0,te.jsx)(_.Z,{edge:"start",children:(0,te.jsx)(l.Z,{})})})}})})]})]}),(0,te.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,te.jsx)(z.Z,{columns:rr,dataSource:ar,scroll:{x:!0},size:"small",locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,H.Z)(jr)},pagination:{pageSize:He,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,te.jsx)("form",{onSubmit:sr((function(e){})),children:(0,te.jsx)(f.Z,{in:ve,children:(0,te.jsx)(Z.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,te.jsxs)(j.ZP,{container:!0,spacing:3,children:[(0,te.jsx)(j.ZP,{item:!0,xs:12,children:(0,te.jsx)(k.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,te.jsx)(S.Z,{label:Te?"Editar M\xf3dulo":"Agregar M\xf3dulo"})})}),(0,te.jsx)(j.ZP,{item:!0,xs:6,children:(0,te.jsxs)(g.Z,{fullWidth:!0,children:[(0,te.jsx)(w.Z,{error:!!xr.modulo,children:"Nombre del M\xf3dulo:"}),(0,te.jsx)(B.Qr,{render:function(e){var r=e.field;return(0,te.jsx)(y.Z,(0,a.Z)((0,a.Z)({},r),{},{id:"outlined-disabled",inputProps:{maxLength:200},error:!!xr.modulo}))},name:"modulo",control:cr})]})}),(0,te.jsx)(j.ZP,{item:!0,xs:6,children:(0,te.jsxs)(g.Z,{fullWidth:!0,children:[(0,te.jsx)(w.Z,{error:!!xr.proceso,children:"Nombre del Encargado:"}),(0,te.jsx)(B.Qr,{render:function(e){var r,t=e.field;return(0,te.jsx)(I.Z,(0,a.Z)((0,a.Z)({},t),{},{id:"empleado",isOptionEqualToValue:function(e,r){return e.value===(null===r||void 0===r?void 0:r.value)},options:ae,disableClearable:!0,value:null!==(r=hr.empleado)&&void 0!==r?r:null,onChange:function(e,r){pr("empleado",r)},renderInput:function(e){return(0,te.jsx)(y.Z,(0,a.Z)((0,a.Z)({},e),{},{error:!!xr.empleado}))}}))},name:"empleado",error:!!xr.empleado,control:cr})]})}),(0,te.jsx)(j.ZP,{item:!0,xs:6,children:(0,te.jsxs)(g.Z,{fullWidth:!0,children:[(0,te.jsx)(w.Z,{error:!!xr.proceso,children:"Proceso del M\xf3dulo:"}),(0,te.jsx)(B.Qr,{render:function(e){var r,t=e.field;return(0,te.jsx)(I.Z,(0,a.Z)((0,a.Z)({},t),{},{id:"proceso",isOptionEqualToValue:function(e,r){return e.value===(null===r||void 0===r?void 0:r.value)},options:$,disableClearable:!0,value:null!==(r=hr.proceso)&&void 0!==r?r:null,onChange:function(e,r){pr("proceso",r)},renderInput:function(e){return(0,te.jsx)(y.Z,(0,a.Z)((0,a.Z)({},e),{},{error:!!xr.proceso}))}}))},name:"proceso",error:!!xr.proceso,control:cr})]})}),(0,te.jsxs)(j.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,te.jsx)(d.Z,{type:"submit",startIcon:(0,te.jsx)(u.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){mr?Te?yr():vr():(0,X.KV)("Completa todos los campos")},children:"Guardar"}),(0,te.jsx)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Xe,children:"Cancelar"})]})]})})})}),(0,te.jsxs)(N.Z,{open:Fe,fullWidth:"md",onClose:Ye,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,te.jsx)(E.Z,{id:"alert-dialog-title",children:"Confirmaci\xf3n de Eliminaci\xf3n"}),(0,te.jsx)(D.Z,{children:(0,te.jsx)(P.Z,{id:"alert-dialog-description",children:"\xbfEst\xe1 seguro(a) que desea eliminar este registro?"})}),(0,te.jsx)(F.Z,{children:(0,te.jsxs)(j.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,te.jsx)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"checked"}),variant:"contained",color:"error",style:{borderRadius:"10px",marginRight:"10px"},onClick:Cr,children:"Eliminar"}),(0,te.jsx)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Ye,children:"Cancelar"})]})})]}),(0,te.jsx)(f.Z,{in:ke,children:(0,te.jsx)(Z.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-center"},children:(0,te.jsxs)(j.ZP,{container:!0,spacing:3,children:[(0,te.jsx)(j.ZP,{item:!0,xs:12,children:(0,te.jsx)(k.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,te.jsx)(S.Z,{label:"Detalles del M\xf3dulo"})})}),(0,te.jsx)(j.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,te.jsx)(M.Z,{sx:{textAlign:"center"},children:(0,te.jsxs)(A.Z,{htmlFor:"id",children:[(0,te.jsx)(b.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"ID del m\xf3dulo:"}),(0,te.jsx)(b.Z,{children:Ne.modu_Id})]})})}),(0,te.jsx)(j.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,te.jsx)(M.Z,{sx:{textAlign:"center"},children:(0,te.jsxs)(A.Z,{htmlFor:"descripcion",children:[(0,te.jsx)(b.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre del m\xf3dulo:"}),(0,te.jsx)(b.Z,{children:Ne.modu_Nombre})]})})}),(0,te.jsx)(j.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,te.jsx)(M.Z,{sx:{textAlign:"center"},children:(0,te.jsxs)(A.Z,{htmlFor:"descripcion",children:[(0,te.jsx)(b.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Proceso del \xe1rea:"}),(0,te.jsx)(b.Z,{children:Ne.proc_Descripcion})]})})}),(0,te.jsx)(j.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,te.jsx)(M.Z,{sx:{textAlign:"center"},children:(0,te.jsxs)(A.Z,{htmlFor:"descripcion",children:[(0,te.jsx)(b.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre del Encargado:"}),(0,te.jsx)(b.Z,{children:Ne.empl_NombreCompleto})]})})}),(0,te.jsx)(j.ZP,{item:!0,xs:12,children:(0,te.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,te.jsx)("thead",{children:(0,te.jsxs)("tr",{children:[(0,te.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,te.jsx)(u.Z,{style:W.Z.iconStyle,children:"edit"}),"Acci\xf3n"]}),(0,te.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,te.jsx)(u.Z,{style:W.Z.iconStyle,children:"person"}),"Usuario"]}),(0,te.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,te.jsx)(u.Z,{style:W.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,te.jsxs)("tbody",{children:[(0,te.jsxs)("tr",{style:W.Z.tableRowStyle,children:[(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:(0,te.jsx)("strong",{children:"Creaci\xf3n"})}),(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:Ne.usuarioCreacion}),(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:Ne.modu_FechaCreacion?new Date(Ne.modu_FechaCreacion).toLocaleString():""})]}),(0,te.jsxs)("tr",{style:W.Z.tableRowStyle,children:[(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:(0,te.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:Ne.usuarioModifica}),(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:Ne.modu_FechaModificacion?new Date(Ne.modu_FechaModificacion).toLocaleString():""})]})]})]})}),(0,te.jsx)("br",{}),(0,te.jsx)(j.ZP,{item:!0,xs:12,children:(0,te.jsx)("div",{className:"card-footer",children:(0,te.jsx)(d.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:$e,startIcon:(0,te.jsx)(u.Z,{children:"arrow_back"}),children:"Regresar"})})})]})})})]})}},89145:function(e,r,t){t(47313);var n=t(85281),o=t(53191),a=t(46417);r.Z=function(e){var r=(0,a.jsxs)(o.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,a.jsx)(o.Z,{item:!0,xs:12,children:(0,a.jsx)(n.Z,{style:{color:"#634a9e"}})}),(0,a.jsx)(o.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:r}},97762:function(e,r,t){t.d(r,{Z:function(){return h}});var n=t(63366),o=t(87462),a=t(47313),i=t(21921),s=t(88564),l=t(77342),c=t(61113),d=t(32298);function u(e){return(0,d.Z)("MuiDialogContentText",e)}(0,t(77430).Z)("MuiDialogContentText",["root"]);var p=t(46417),m=["children"],x=(0,s.ZP)(c.Z,{shouldForwardProp:function(e){return(0,s.FO)(e)||"classes"===e},name:"MuiDialogContentText",slot:"Root",overridesResolver:function(e,r){return r.root}})({}),h=a.forwardRef((function(e,r){var t=(0,l.Z)({props:e,name:"MuiDialogContentText"}),a=(0,n.Z)(t,m),s=function(e){var r=e.classes,t=(0,i.Z)({root:["root"]},u,r);return(0,o.Z)({},r,t)}(a);return(0,p.jsx)(x,(0,o.Z)({component:"p",variant:"body1",color:"text.secondary",ref:r,ownerState:a},t,{classes:s}))}))},33604:function(e,r,t){var n=t(87462),o=t(63366),a=t(47313),i=t(83061),s=t(21921),l=t(61113),c=t(88564),d=t(77342),u=t(93174),p=t(63909),m=t(46417),x=["className","id"],h=(0,c.ZP)(l.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,r){return r.root}})({padding:"16px 24px",flex:"0 0 auto"}),f=a.forwardRef((function(e,r){var t=(0,d.Z)({props:e,name:"MuiDialogTitle"}),l=t.className,c=t.id,f=(0,o.Z)(t,x),Z=t,j=function(e){var r=e.classes;return(0,s.Z)({root:["root"]},u.a,r)}(Z),b=a.useContext(p.Z).titleId,g=void 0===b?c:b;return(0,m.jsx)(h,(0,n.Z)({component:"h2",className:(0,i.default)(j.root,l),ownerState:Z,ref:r,variant:"h6",id:g},f))}));r.Z=f}}]);