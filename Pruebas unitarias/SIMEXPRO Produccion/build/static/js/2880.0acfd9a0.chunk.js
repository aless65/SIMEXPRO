"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[2880],{22880:function(e,r,t){t.r(r),t.d(r,{default:function(){return ae}});var n=t(74165),a=t(15861),o=t(4942),i=t(1413),s=t(29439),c=t(280),l=t(66106),d=t(40894),u=t(93433),p=t(66244),f=t(51405),x=t(78925),h=t(48737),m=t(46417);var Z=function(e){var r=e.data,t=e.handleCloseExportar;return(0,m.jsxs)(f.Z,{onClick:function(){!function(){var e=r.map((function(e){return[e.key,e.fopa_Descripcion]})),t=h.P6.aoa_to_sheet([["No.","Nombre de la forma de pago"]].concat((0,u.Z)(e))),n=h.P6.book_new();h.P6.book_append_sheet(n,t,"Sheet1");var a=h.cW(n,{bookType:"xlsx",type:"array"}),o=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,x.saveAs)(o,"Formas_Pago.xlsx")}(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(p.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},g=t(47313),y=t(39284),j=t.n(y),b=t(11593),v=t(31881),_=t.n(v),C=t(76278),S=t(9098);j().vfs=b.I.vfs;var k=function(e){var r=e.data,t=e.handleCloseExportar,o=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var t,a,o,i,s,c,l;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="A4",a=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",o=S.Z.formatFechaHora(new Date),i=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,_().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:s=e.sent,c=s.data,(l=new FileReader).onload=function(){var e={content:[{image:l.result,margin:[-40,-40],width:600,height:45},{text:"Formas de pago",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,r,n,o){return e.y+e.height>t[1]-a[3]},defaultStyle:{fontSize:12},footer:function(e,r){return{columns:[{text:"Generado por: ".concat(i.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(r),style:"footer"},{text:"Fecha: ".concat(o.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["*","*"],body:[[{text:"No.",style:"tableHeader"},{text:"Nombre de la forma de pago",style:"tableHeader"}]].concat((0,u.Z)(r.map((function(e){return[e.key,e.fopa_Descripcion]})))),alignment:"center"}}),j().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},l.readAsDataURL(c),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,m.jsx)("div",{children:(0,m.jsxs)(f.Z,{onClick:function(){o(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(C.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})},w=t(35898),D=t(24193),F=t(71263),I=t(82047),P=t(73428),E=t(16957),N=t(65033),A=t(93405),M=t(61113),B=t(1550),z=t(88797),R=t(24631),U=t(41727),T=t(47131),H=t(9019),L=t(19536),O=t(66212),W=t(5178),V=t(9506),G=t(15103),K=t(57983),Q=t(62563),X=t(75627),q=t(3463),J=t(28155),Y=(t(77453),t(89145)),$=t(88477);var ee=function(){var e={XApiKey:S.Z.extraerToken()},r=_().create({baseURL:"https://practicaacademia.somee.com/api/FormasDePago/",headers:e}),t=JSON.parse(localStorage.getItem("user"));function o(){return(o=(0,a.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,a=t.data.data.map((function(e,r){return{key:r+1,fopa_Id:e.fopa_Id,fopa_Descripcion:e.fopa_Descripcion,usua_UsuarioCreacion:e.usua_UsuarioCreacion,fopa_FechaCreacion:e.fopa_FechaCreacion,usua_NombreCreacion:e.usua_NombreCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,fopa_FechaModificacion:e.fopa_FechaModificacion,usua_NombreModificacion:e.usua_NombreModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,fopa_FechaEliminacion:e.fopa_FechaEliminacion,fopa_Estado:e.fopa_Estado}})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function i(){return(i=(0,a.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,a=t.data.data.map((function(e,r){return{key:r+1,fopa_Descripcion:e.fopa_Descripcion}})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,a.Z)((0,n.Z)().mark((function e(a){var o,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o={fopa_Descripcion:a.fopa_Descripcion.trim().replace(/\s+/g," "),usua_UsuarioCreacion:t.uuid,fopa_FechaCreacion:S.Z.formatFechaHora(new Date)},e.next=4,r.post("Insertar",o);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,a.Z)((0,n.Z)().mark((function e(a){var o,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o={fopa_Id:a.id,fopa_Descripcion:a.fopa_Descripcion.trim().replace(/\s+/g," "),usua_UsuarioModificacion:t.uuid,fopa_FechaModificacion:S.Z.formatFechaHora(new Date)},e.next=4,r.post("Editar",o);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return o.apply(this,arguments)},crear:function(e){return s.apply(this,arguments)},editar:function(e){return c.apply(this,arguments)},ExportData:function(){return i.apply(this,arguments)}}},re=(t(88282),t(75265)),te={id:"",fopa_Descripcion:""},ne=q.Ry().shape({id:q.Z_(),fopa_Descripcion:q.Z_().trim().required("")});var ae=function(){var e=ee(),r=(0,g.useState)([]),t=(0,s.Z)(r,2),u=t[0],p=t[1],x=(0,g.useState)(""),h=(0,s.Z)(x,2),y=h[0],j=h[1],b=(0,g.useState)(!0),v=(0,s.Z)(b,2),_=v[0],C=v[1],S=(0,g.useState)(!1),q=(0,s.Z)(S,2),ae=q[0],oe=q[1],ie=(0,g.useState)(!1),se=(0,s.Z)(ie,2),ce=se[0],le=se[1],de=(0,g.useState)({}),ue=(0,s.Z)(de,2),pe=ue[0],fe=ue[1],xe=(0,g.useState)(!1),he=(0,s.Z)(xe,2),me=he[0],Ze=he[1],ge=g.useState(10),ye=(0,s.Z)(ge,2),je=ye[0],be=ye[1],ve=(0,g.useState)({}),_e=(0,s.Z)(ve,2),Ce=_e[0],Se=_e[1],ke=(0,g.useState)([]),we=(0,s.Z)(ke,2),De=we[0],Fe=we[1],Ie=function(){C(!_),oe(!ae),Te(te)},Pe=function(){C(!_),le(!ce)},Ee=function(e){Se((function(r){return(0,i.Z)((0,i.Z)({},r),{},(0,o.Z)({},e,null))}))},Ne=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,r){return e.key-r.key}},{title:"Nombre de la forma de pago",dataIndex:"fopa_Descripcion",key:"fopa_Descripcion",sorter:function(e,r){return e.fopa_Descripcion.localeCompare(r.fopa_Descripcion)}},{title:"Acciones",key:"operation",render:function(e){return(0,m.jsx)("div",{children:(0,m.jsxs)(w.Z,{direction:"row",spacing:1,children:[(0,m.jsx)(D.Z,{"aria-controls":"menu-".concat(e.fopa_Id),"aria-haspopup":"true",onClick:function(r){return t=r,n=e.fopa_Id,void Se((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,o.Z)({},n,t.currentTarget))}));var t,n},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,m.jsx)(F.Z,{children:"menu"}),children:"Opciones"}),(0,m.jsxs)(I.Z,{id:"menu-".concat(e.fopa_Id),anchorEl:Ce[e.fopa_Id],keepMounted:!0,open:Boolean(Ce[e.fopa_Id]),onClose:function(){return Ee(e.fopa_Id)},children:[(0,m.jsxs)(f.Z,{onClick:function(){return r=e,Ie(),Ze(!0),We("id",r.fopa_Id),We("fopa_Descripcion",r.fopa_Descripcion),void Ee(r.fopa_Id);var r},children:[(0,m.jsx)(F.Z,{children:"edit"}),"\u3164Editar"]}),(0,m.jsxs)(f.Z,{onClick:function(){return fe(r=e),Pe(),void Ee(r.fopa_Id);var r},children:[(0,m.jsx)(F.Z,{children:"visibility"}),"\u3164Detalles"]})]})]})},e.fopa_Id)}}],Ae={filename:"Formas_Pago",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"Nombre de la forma de pago"}].map((function(e){return e.label}))},Me=new d.ExportToCsv(Ae),Be=["key","fopa_Descripcion"],ze=De.filter((function(e){if(""===y)return!0;for(var r=0,t=Object.entries(e);r<t.length;r++){var n=(0,s.Z)(t[r],2),a=n[0],o=n[1];if(Be.includes(a)){var i="number"===typeof o?o.toString():o.toString().toLowerCase(),c="number"===typeof y?y.toString():y.toLowerCase();if(i.includes(c))return!0}}return!1})).reverse(),Re=(0,X.cI)({DefaultFormasPagoValues:te,mode:"all",resolver:(0,Q.X)(ne)}),Ue=Re.handleSubmit,Te=(Re.register,Re.reset),He=Re.control,Le=Re.watch,Oe=Re.formState,We=Re.setValue,Ve=Oe.isValid,Ge=(Oe.dirtyFields,Oe.errors),Ke=Le(),Qe=(0,g.useState)([]),Xe=(0,s.Z)(Qe,2),qe=Xe[0],Je=Xe[1],Ye=function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,Je([]),Fe([]),r.next=5,e.listar();case 5:return t=r.sent,Fe(t),t.length>0?Je(t):Je(null),r.t0=p,r.next=11,e.ExportData();case 11:r.t1=r.sent,(0,r.t0)(r.t1),r.next=18;break;case 15:r.prev=15,r.t2=r.catch(0),Je(null);case 18:case"end":return r.stop()}}),r,null,[[0,15]])})));return function(){return r.apply(this,arguments)}}(),$e=function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.crear(Ke);case 3:"1"==(t=r.sent).data.data.messageStatus?((0,re.ys)(),Ye(),j(""),Ie(),Te(te)):t.data.data.messageStatus.includes("UNIQUE")&&(0,re.d0)(),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),(0,re.bW)();case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}(),er=function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.editar(Ke);case 3:"1"==(t=r.sent).data.data.messageStatus?((0,re.fn)(),Ye(),j(""),Ie(),Te(te)):t.data.data.messageStatus.includes("UNIQUE")&&(0,re.d0)(),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),(0,re.bW)();case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}();(0,g.useEffect)((function(){Ye()}),[]);var rr=function(){Se((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,o.Z)({},"menu-exportar",null))}))};return(0,m.jsxs)(P.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,m.jsx)(E.Z,{component:"img",height:"200",image:"https://i.ibb.co/gRdCM3X/FORMAS-DE-PAGO.png",alt:"Encabezado de la carta"}),(0,m.jsxs)(N.Z,{in:_,children:[(0,m.jsxs)(A.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,m.jsxs)(w.Z,{direction:"row",spacing:1,children:[(0,m.jsx)(D.Z,{startIcon:(0,m.jsx)(F.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Ie(),Ze(!1)},children:"Nuevo"}),(0,m.jsxs)(D.Z,{startIcon:(0,m.jsx)(F.Z,{children:"upload"}),onClick:function(e){return r=e,t="menu-exportar",void Se((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,o.Z)({},t,r.currentTarget))}));var r,t},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,m.jsx)(M.Z,{children:"Exportar"}),(0,m.jsx)(l.Z,{})]}),(0,m.jsx)("div",{children:(0,m.jsxs)(I.Z,{id:"menu-exportar",anchorEl:Ce["menu-exportar"],open:Boolean(Ce["menu-exportar"]),onClose:function(){return rr()},keepMounted:!0,children:[(0,m.jsxs)(f.Z,{onClick:function(){!function(){try{Me.generateCsv(u)}catch(e){}}(),rr()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(c.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,m.jsx)(k,{data:u,handleCloseExportar:rr}),(0,m.jsx)(Z,{data:u,handleCloseExportar:rr})]})},"menu-exportar")]}),(0,m.jsxs)(w.Z,{direction:"row",spacing:1,children:[(0,m.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,m.jsx)(B.Z,{sx:{minWidth:50},size:"small",children:(0,m.jsxs)(z.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:je,onChange:function(e){be(e.target.value)},children:[(0,m.jsx)(f.Z,{value:10,children:"10"}),(0,m.jsx)(f.Z,{value:25,children:"25"}),(0,m.jsx)(f.Z,{value:50,children:"50"})]})}),(0,m.jsx)(R.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:y,onChange:function(e){j(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,m.jsx)(U.Z,{position:"start",children:(0,m.jsx)(T.Z,{edge:"start",children:(0,m.jsx)(K.Z,{})})})}})]})]}),(0,m.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,m.jsx)(J.Z,{columns:Ne,dataSource:ze,size:"small",locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,Y.Z)(qe)},pagination:{pageSize:je,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,m.jsx)("form",{onSubmit:Ue((function(e){})),children:(0,m.jsx)(N.Z,{in:ae,children:(0,m.jsx)(A.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,m.jsxs)(H.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(H.ZP,{item:!0,xs:12,children:(0,m.jsx)(L.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,m.jsx)(O.Z,{label:me?"Editar Forma de Pago":"Agregar Forma de Pago"})})}),(0,m.jsx)(H.ZP,{item:!0,xs:2}),(0,m.jsx)(H.ZP,{item:!0,xs:8,children:(0,m.jsxs)(B.Z,{fullWidth:!0,children:[(0,m.jsx)(W.Z,{error:!!Ge.fopa_Descripcion,children:"Nombre de la Forma de Pago:"}),(0,m.jsx)(X.Qr,{render:function(e){var r=e.field;return(0,m.jsx)(R.Z,(0,i.Z)((0,i.Z)({},r),{},{id:"outlined-disabled",inputProps:{maxLength:150},error:!!Ge.fopa_Descripcion}))},name:"fopa_Descripcion",control:He})]})}),(0,m.jsxs)(H.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,m.jsx)(D.Z,{type:"submit",startIcon:(0,m.jsx)(F.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Ve?me?er():$e():(0,re.KV)()},children:"Guardar"}),(0,m.jsx)(D.Z,{startIcon:(0,m.jsx)(F.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Ie,children:"Cancelar"})]})]})})})}),(0,m.jsx)(N.Z,{in:ce,children:(0,m.jsx)(A.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-star"},children:(0,m.jsxs)(H.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(H.ZP,{item:!0,xs:12,style:{marginBottom:"30px"},children:(0,m.jsx)(L.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,m.jsx)(O.Z,{label:"Detalles de la Forma de Pago"})})}),(0,m.jsxs)(H.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:[(0,m.jsx)(V.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(G.Z,{htmlFor:"fopa_Id",children:[(0,m.jsx)(M.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Id de la Forma de Pago:"}),(0,m.jsx)(M.Z,{children:pe.fopa_Id})]})}),(0,m.jsx)(V.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(G.Z,{htmlFor:"fopa_Descripcion",children:[(0,m.jsx)(M.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre de la Forma de Pago:"}),(0,m.jsx)(M.Z,{children:pe.fopa_Descripcion})]})})]}),(0,m.jsx)(H.ZP,{item:!0,xs:12,children:(0,m.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsxs)("th",{style:$.Z.tableHeaderStyle,children:[(0,m.jsx)(F.Z,{style:$.Z.iconStyle,children:"edit"}),"Acci\xf3n"]}),(0,m.jsxs)("th",{style:$.Z.tableHeaderStyle,children:[(0,m.jsx)(F.Z,{style:$.Z.iconStyle,children:"person"}),"Usuario"]}),(0,m.jsxs)("th",{style:$.Z.tableHeaderStyle,children:[(0,m.jsx)(F.Z,{style:$.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,m.jsxs)("tbody",{children:[(0,m.jsxs)("tr",{style:$.Z.tableRowStyle,children:[(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:(0,m.jsx)("strong",{children:"Creaci\xf3n"})}),(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:pe.usua_NombreCreacion}),(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:pe.fopa_FechaCreacion?new Date(pe.fopa_FechaCreacion).toLocaleString():""})]}),(0,m.jsxs)("tr",{style:$.Z.tableRowStyle,children:[(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:(0,m.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:pe.usua_NombreModificacion}),(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:pe.fopa_FechaModificacion?new Date(pe.fopa_FechaModificacion).toLocaleString():""})]})]})]})}),(0,m.jsx)("br",{}),(0,m.jsx)(H.ZP,{item:!0,xs:12,children:(0,m.jsxs)("div",{className:"card-footer",children:[(0,m.jsx)(D.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:Pe,startIcon:(0,m.jsx)(F.Z,{children:"arrow_back"}),children:"Regresar"}),(0,m.jsx)("br",{})]})})]})})})]})}},89145:function(e,r,t){t(47313);var n=t(85281),a=t(53191),o=t(46417);r.Z=function(e){var r=(0,o.jsxs)(a.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,o.jsx)(a.Z,{item:!0,xs:12,children:(0,o.jsx)(n.Z,{style:{color:"#634a9e"}})}),(0,o.jsx)(a.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:r}}}]);