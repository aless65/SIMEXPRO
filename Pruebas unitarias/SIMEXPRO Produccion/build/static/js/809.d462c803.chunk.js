"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[809],{809:function(e,t,n){n.r(t),n.d(t,{default:function(){return ie}});var r=n(74165),i=n(15861),a=n(4942),s=n(1413),c=n(29439),o=n(280),l=n(62563),u=n(66106),d=n(57983),p=n(35898),x=n(24193),h=n(71263),m=n(82047),f=n(51405),Z=n(73428),j=n(16957),g=n(65033),y=n(93405),v=n(61113),C=n(1550),b=n(88797),_=n(24631),k=n(41727),S=n(47131),w=n(9019),I=n(19536),D=n(66212),P=n(5178),E=n(9506),F=n(15103),A=n(28155),M=n(40894),z=n(47313),R=n(75627),B=(n(88282),n(89145)),U=n(88477),N=n(75265),T=n(3463),H=n(93433),L=n(66244),W=n(78925),O=n(48737),V=n(46417);var K=function(e){var t=e.data,n=e.handleCloseExportar;return(0,V.jsxs)(f.Z,{onClick:function(){!function(){var e=t.map((function(e){return[e.key,e.impu_Descripcion,e.impu_Cantidad]})),n=O.P6.aoa_to_sheet([["No.","Descripci\xf3n del impuesto","Porcentaje a pagar"]].concat((0,H.Z)(e))),r=O.P6.book_new();O.P6.book_append_sheet(r,n,"Sheet1");var i=O.cW(r,{bookType:"xlsx",type:"array"}),a=new Blob([i],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,W.saveAs)(a,"Impuestos.xlsx")}(),n()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,V.jsx)(L.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},Q=n(31881),q=n.n(Q),G=n(9098);var J=function(){var e={XApiKey:G.Z.extraerToken()},t="".concat("https://practicaacademia.somee.com/","api/Impuestos/"),n=q().create({baseURL:t,headers:e}),a=JSON.parse(localStorage.getItem("user"));function s(){return(s=(0,i.Z)((0,r.Z)().mark((function e(){var t,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.get("Listar");case 3:return t=e.sent,i=t.data.data.map((function(e,t){return{key:t+1,impu_Id:e.impu_Id,impu_Descripcion:e.impu_Descripcion,impu_Cantidad:e.impu_Cantidad,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usuarioCreacion:e.usuarioCreacion,impu_FechaCreacion:e.impu_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,usuarioModificacion:e.usuarioModificacion,impu_FechaModificacion:e.impu_FechaModificacion,impu_Estado:e.impu_Estado}})),e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,i.Z)((0,r.Z)().mark((function e(){var t,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.get("Listar");case 3:return t=e.sent,i=t.data.data.map((function(e,t){return{key:t+1,impu_Descripcion:e.impu_Descripcion,impu_Cantidad:e.impu_Cantidad}})),e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function o(){return(o=(0,i.Z)((0,r.Z)().mark((function e(t){var i,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={impu_Descripcion:t.impu_Descripcion.trim().replace(/\s+/g," "),impu_Cantidad:t.impu_Cantidad,usua_UsuarioCreacion:a.uuid,impu_FechaCreacion:G.Z.formatFechaHora(new Date)},e.next=4,n.post("Insertar",i);case 4:return s=e.sent,e.abrupt("return",s);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function l(){return(l=(0,i.Z)((0,r.Z)().mark((function e(t){var i,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={impu_Id:t.impu_Id,impu_Descripcion:t.impu_Descripcion.trim().replace(/\s+/g," "),impu_Cantidad:t.impu_Cantidad,usua_UsuarioModificacion:a.uuid,impu_FechaModificacion:G.Z.formatFechaHora(new Date)},e.next=4,n.post("Editar",i);case 4:return s=e.sent,e.abrupt("return",s);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return s.apply(this,arguments)},crear:function(e){return o.apply(this,arguments)},editar:function(e){return l.apply(this,arguments)},ExportData:function(){return c.apply(this,arguments)}}},X=n(76278),Y=n(39284),$=n.n(Y),ee=n(11593);$().vfs=ee.I.vfs;var te=function(e){var t=e.data,n=e.handleCloseExportar,a=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var n,i,a,s,c,o,l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="A4",i=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",a=G.Z.formatFechaHora(new Date),s=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,q().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:c=e.sent,o=c.data,(l=new FileReader).onload=function(){var e={content:[{image:l.result,margin:[-40,-40],width:600,height:45},{text:"Impuestos",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,t,r,a){return e.y+e.height>n[1]-i[3]},defaultStyle:{fontSize:12},footer:function(e,t){return{columns:[{text:"Generado por: ".concat(s.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(t),style:"footer"},{text:"Fecha: ".concat(a.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["*","*","*"],body:[[{text:"No.",style:"tableHeader"},{text:"Descripci\xf3n del impuesto",style:"tableHeader"},{text:"Porcentaje a pagar",style:"tableHeader"}]].concat((0,H.Z)(t.map((function(e){return[e.key,e.impu_Descripcion,e.impu_Cantidad]})))),alignment:"center"}}),$().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},l.readAsDataURL(o),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,V.jsx)("div",{children:(0,V.jsxs)(f.Z,{onClick:function(){a(),n()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,V.jsx)(X.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})},ne={impu_Id:"",impu_Descripcion:"",impu_Cantidad:""},re=T.Ry().shape({impu_Id:T.Z_(),impu_Descripcion:T.Z_().trim().required(""),impu_Cantidad:T.Rx().min(0,"Ingresa una cantidad mayor")});var ie=function(){var e=J(),t=(0,z.useState)(""),n=(0,c.Z)(t,2),T=n[0],H=n[1],L=(0,z.useState)([]),W=(0,c.Z)(L,2),O=W[0],Q=W[1],q=(0,z.useState)(!0),G=(0,c.Z)(q,2),X=G[0],Y=G[1],$=(0,z.useState)(!1),ee=(0,c.Z)($,2),ie=ee[0],ae=ee[1],se=(0,z.useState)(!1),ce=(0,c.Z)(se,2),oe=ce[0],le=ce[1],ue=(0,z.useState)({}),de=(0,c.Z)(ue,2),pe=de[0],xe=de[1],he=(0,z.useState)(!1),me=(0,c.Z)(he,2),fe=me[0],Ze=me[1],je=z.useState(10),ge=(0,c.Z)(je,2),ye=ge[0],ve=ge[1],Ce=(0,z.useState)({}),be=(0,c.Z)(Ce,2),_e=be[0],ke=be[1],Se=(0,z.useState)([]),we=(0,c.Z)(Se,2),Ie=we[0],De=we[1],Pe=function(){Y(!X),ae(!ie),Te(ne)},Ee=function(e){ke((function(t){return(0,s.Z)((0,s.Z)({},t),{},(0,a.Z)({},e,null))}))},Fe=function(e){xe(e),Y(!X),le(!oe),Ee(e.impu_Id)},Ae=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,t){return e.key-t.key}},{title:"Descripci\xf3n del impuesto",dataIndex:"impu_Descripcion",key:"impu_Descripcion",sorter:function(e,t){return e.impu_Descripcion.localeCompare(t.impu_Descripcion)}},{title:"Porcentaje del impuesto",dataIndex:"impu_Cantidad",key:"impu_Cantidad",sorter:function(e,t){return e.impu_Cantidad-t.impu_Cantidad}},{title:"Acciones",key:"operation",render:function(e){return(0,V.jsx)("div",{children:(0,V.jsxs)(p.Z,{direction:"row",spacing:1,children:[(0,V.jsx)(x.Z,{"aria-controls":"menu-".concat(e.impu_Id),"aria-haspopup":"true",onClick:function(t){return n=t,r=e.impu_Id,void ke((function(e){return(0,s.Z)((0,s.Z)({},e),{},(0,a.Z)({},r,n.currentTarget))}));var n,r},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,V.jsx)(h.Z,{children:"menu"}),children:"Opciones"}),(0,V.jsxs)(m.Z,{id:"menu-".concat(e.impu_Id),anchorEl:_e[e.impu_Id],keepMounted:!0,open:Boolean(_e[e.impu_Id]),onClose:function(){return Ee(e.impu_Id)},children:[(0,V.jsxs)(f.Z,{onClick:function(){return t=e,Pe(),Ze(!0),Oe("impu_Id",t.impu_Id),Oe("impu_Descripcion",t.impu_Descripcion),Oe("impu_Cantidad",t.impu_Cantidad),void Ee(t.impu_Id);var t},children:[(0,V.jsx)(h.Z,{children:"edit"}),"\u3164Editar"]}),(0,V.jsxs)(f.Z,{onClick:function(){return Fe(e)},children:[(0,V.jsx)(h.Z,{children:"visibility"}),"\u3164Detalles"]})]})]})},e.impu_Id)}}],Me={filename:"Impuestos",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"Descripci\xf3n del impuesto"},{label:"Porcetanje a pagar"}].map((function(e){return e.label}))},ze=new M.ExportToCsv(Me),Re=["key","impu_Descripcion"],Be=Ie.filter((function(e){if(""===T)return!0;for(var t=0,n=Object.entries(e);t<n.length;t++){var r=(0,c.Z)(n[t],2),i=r[0],a=r[1];if(Re.includes(i)){var s="number"===typeof a?a.toString():a.toString().toLowerCase(),o="number"===typeof T?T.toString():T.toLowerCase();if(s.includes(o))return!0}}return!1})),Ue=(0,R.cI)({defaultImpuestoValues:ne,mode:"all",resolver:(0,l.X)(re)}),Ne=Ue.handleSubmit,Te=(Ue.register,Ue.reset),He=Ue.control,Le=Ue.watch,We=Ue.formState,Oe=Ue.setValue,Ve=Le(),Ke=We.isValid,Qe=(We.dirtyFields,We.errors),qe=(0,z.useState)([]),Ge=(0,c.Z)(qe,2),Je=Ge[0],Xe=Ge[1],Ye=function(){var t=(0,i.Z)((0,r.Z)().mark((function t(){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,Xe([]),De([]),t.next=5,e.listar();case 5:return n=t.sent,De(n),n.length>0?Xe(n):Xe(null),t.t0=Q,t.next=11,e.ExportData();case 11:t.t1=t.sent,(0,t.t0)(t.t1),t.next=18;break;case 15:t.prev=15,t.t2=t.catch(0),Xe(null);case 18:case"end":return t.stop()}}),t,null,[[0,15]])})));return function(){return t.apply(this,arguments)}}(),$e=function(){var t=(0,i.Z)((0,r.Z)().mark((function t(){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.crear(Ve);case 3:"1"==(n=t.sent).data.data.messageStatus?((0,N.ys)(),Ye(),Pe(),Te(ne)):n.data.data.messageStatus.includes("UNIQUE")&&(0,N.d0)(),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),(0,N.bW)();case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),et=function(){var t=(0,i.Z)((0,r.Z)().mark((function t(){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.editar(Ve);case 3:"1"==(n=t.sent).data.data.messageStatus?((0,N.fn)(),Ye(),Pe(),Te(ne)):n.data.data.messageStatus.includes("UNIQUE")&&(0,N.d0)(),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),(0,N.bW)();case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}();(0,z.useEffect)((function(){Ye()}),[]);var tt=function(){ke((function(e){return(0,s.Z)((0,s.Z)({},e),{},(0,a.Z)({},"menu-exportar",null))}))};return(0,V.jsxs)(Z.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,V.jsx)(j.Z,{component:"img",height:"200",image:"https://i.ibb.co/4m2kkkR/IMPUESTOS.png",alt:"Encabezado de la carta"}),(0,V.jsxs)(g.Z,{in:X,children:[(0,V.jsxs)(y.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,V.jsxs)(p.Z,{direction:"row",spacing:1,children:[(0,V.jsx)(x.Z,{startIcon:(0,V.jsx)(h.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Pe(),Ze(!1)},children:"Nuevo"}),(0,V.jsxs)(x.Z,{startIcon:(0,V.jsx)(h.Z,{children:"upload"}),onClick:function(e){return t=e,n="menu-exportar",void ke((function(e){return(0,s.Z)((0,s.Z)({},e),{},(0,a.Z)({},n,t.currentTarget))}));var t,n},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,V.jsx)(v.Z,{children:"Exportar"}),(0,V.jsx)(u.Z,{})]}),(0,V.jsx)("div",{children:(0,V.jsxs)(m.Z,{id:"menu-exportar",anchorEl:_e["menu-exportar"],open:Boolean(_e["menu-exportar"]),onClose:function(){return tt()},keepMounted:!0,children:[(0,V.jsxs)(f.Z,{onClick:function(){!function(){try{console.log(O),ze.generateCsv(O)}catch(e){console.log(e)}}(),tt()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,V.jsx)(o.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,V.jsx)(te,{data:Ie,handleCloseExportar:tt}),(0,V.jsx)(K,{data:Ie,handleCloseExportar:tt})]})},"menu-exportar")]}),(0,V.jsxs)(p.Z,{direction:"row",spacing:1,children:[(0,V.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,V.jsx)(C.Z,{sx:{minWidth:50},size:"small",children:(0,V.jsxs)(b.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:ye,onChange:function(e){ve(e.target.value)},children:[(0,V.jsx)(f.Z,{value:10,children:"10"}),(0,V.jsx)(f.Z,{value:20,children:"20"}),(0,V.jsx)(f.Z,{value:30,children:"30"})]})}),(0,V.jsx)(_.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:T,onChange:function(e){H(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,V.jsx)(k.Z,{position:"start",children:(0,V.jsx)(S.Z,{edge:"start",children:(0,V.jsx)(d.Z,{})})})}})]})]}),(0,V.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,V.jsx)(A.Z,{locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,B.Z)(Je)},columns:Ae,dataSource:Be,size:"small",pagination:{pageSize:ye,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,V.jsx)("form",{onSubmit:Ne((function(e){})),children:(0,V.jsx)(g.Z,{in:ie,children:(0,V.jsx)(y.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,V.jsxs)(w.ZP,{container:!0,spacing:3,children:[(0,V.jsx)(w.ZP,{item:!0,xs:12,children:(0,V.jsx)(I.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,V.jsx)(D.Z,{label:fe?"Editar Impuesto":"Agregar Impuesto"})})}),(0,V.jsx)(w.ZP,{item:!0,xs:6,children:(0,V.jsxs)(C.Z,{fullWidth:!0,children:[(0,V.jsx)(P.Z,{error:!!Qe.impu_Descripcion,children:"Descripci\xf3n:"}),(0,V.jsx)(R.Qr,{render:function(e){var t=e.field;return(0,V.jsx)(_.Z,(0,s.Z)((0,s.Z)({},t),{},{id:"outlined-disabled",inputProps:{maxLength:150},error:!!Qe.impu_Descripcion}))},name:"impu_Descripcion",control:He})]})}),(0,V.jsx)(w.ZP,{item:!0,xs:6,children:(0,V.jsxs)(C.Z,{fullWidth:!0,children:[(0,V.jsx)(P.Z,{error:!!Qe.impu_Cantidad,children:"Porcentaje:"}),(0,V.jsx)(R.Qr,{render:function(e){var t=e.field;return(0,V.jsx)(_.Z,(0,s.Z)((0,s.Z)({},t),{},{id:"outlined-disabled",inputProps:{maxLength:150,onKeyPress:function(e){/[0-9 .]/.test(e.key)||e.preventDefault()}},error:!!Qe.impu_Cantidad}))},name:"impu_Cantidad",control:He})]})}),(0,V.jsxs)(w.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,V.jsx)(x.Z,{type:"submit",startIcon:(0,V.jsx)(h.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Ke?fe?et():$e():(0,N.KV)()},children:"Guardar"}),(0,V.jsx)(x.Z,{startIcon:(0,V.jsx)(h.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Pe,children:"Cancelar"})]})]})})})}),(0,V.jsx)(g.Z,{in:oe,children:(0,V.jsx)(y.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-center"},children:(0,V.jsxs)(w.ZP,{container:!0,spacing:3,children:[(0,V.jsx)(w.ZP,{item:!0,xs:12,children:(0,V.jsx)(I.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,V.jsx)(D.Z,{label:"Detalles de Impuesto"})})}),(0,V.jsx)(w.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,V.jsx)(E.Z,{sx:{textAlign:"center"},children:(0,V.jsxs)(F.Z,{htmlFor:"id",children:[(0,V.jsx)(v.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Id:"}),(0,V.jsx)(v.Z,{children:pe.impu_Id})]})})}),(0,V.jsx)(w.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,V.jsx)(E.Z,{sx:{textAlign:"center"},children:(0,V.jsxs)(F.Z,{htmlFor:"descripcion",children:[(0,V.jsx)(v.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Descripcion:"}),(0,V.jsx)(v.Z,{children:pe.impu_Descripcion})]})})}),(0,V.jsx)(w.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,V.jsx)(E.Z,{sx:{textAlign:"center"},children:(0,V.jsxs)(F.Z,{htmlFor:"descripcion",children:[(0,V.jsx)(v.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Procentaje a pagar:"}),(0,V.jsx)(v.Z,{children:pe.impu_Cantidad})]})})}),(0,V.jsx)(w.ZP,{item:!0,xs:12,children:(0,V.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,V.jsx)("thead",{children:(0,V.jsxs)("tr",{children:[(0,V.jsxs)("th",{style:U.Z.tableHeaderStyle,children:[(0,V.jsx)(h.Z,{style:U.Z.iconStyle,children:"edit"}),"Accion"]}),(0,V.jsxs)("th",{style:U.Z.tableHeaderStyle,children:[(0,V.jsx)(h.Z,{style:U.Z.iconStyle,children:"person"}),"Usuario"]}),(0,V.jsxs)("th",{style:U.Z.tableHeaderStyle,children:[(0,V.jsx)(h.Z,{style:U.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,V.jsxs)("tbody",{children:[(0,V.jsxs)("tr",{style:U.Z.tableRowStyle,children:[(0,V.jsx)("td",{style:U.Z.tableCellStyle,children:(0,V.jsx)("strong",{children:"Creaci\xf3n"})}),(0,V.jsx)("td",{style:U.Z.tableCellStyle,children:pe.usuarioCreacion}),(0,V.jsx)("td",{style:U.Z.tableCellStyle,children:pe.impu_FechaCreacion?new Date(pe.impu_FechaCreacion).toLocaleString():""})]}),(0,V.jsxs)("tr",{style:U.Z.tableRowStyle,children:[(0,V.jsx)("td",{style:U.Z.tableCellStyle,children:(0,V.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,V.jsx)("td",{style:U.Z.tableCellStyle,children:pe.usuarioModificacion}),(0,V.jsx)("td",{style:U.Z.tableCellStyle,children:pe.impu_FechaModificacion?new Date(pe.impu_FechaModificacion).toLocaleString():""})]})]})]})}),(0,V.jsx)("br",{}),(0,V.jsx)(w.ZP,{item:!0,xs:12,children:(0,V.jsx)("div",{className:"card-footer",children:(0,V.jsx)(x.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:function(){Y(!X),le(!oe)},startIcon:(0,V.jsx)(h.Z,{children:"arrow_back"}),children:"Regresar"})})})]})})})]})}},89145:function(e,t,n){n(47313);var r=n(85281),i=n(53191),a=n(46417);t.Z=function(e){var t=(0,a.jsxs)(i.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,a.jsx)(i.Z,{item:!0,xs:12,children:(0,a.jsx)(r.Z,{style:{color:"#634a9e"}})}),(0,a.jsx)(i.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:t}}}]);