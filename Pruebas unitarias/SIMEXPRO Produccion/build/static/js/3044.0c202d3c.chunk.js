"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[3044],{13044:function(e,r,a){a.r(r),a.d(r,{default:function(){return ee}});var t=a(74165),o=a(15861),n=a(4942),i=a(1413),l=a(29439),s=a(57983),c=a(35898),d=a(24193),u=a(71263),p=a(82047),m=a(51405),x=a(73428),h=a(16957),f=a(65033),b=a(93405),v=a(61113),g=a(1550),Z=a(88797),_=a(24631),y=a(41727),j=a(47131),C=a(94469),N=a(33604),k=a(96467),I=a(97762),S=a(4117),R=a(9019),w=a(28155),D=a(47313),A=a(58467),E=(a(88282),a(521)),z=a(75265),T=(a(77453),a(89145)),P=a(65674),B=a(280),F=a(66106),H=a(40894),M=a(93433),V=a(66244),L=a(78925),O=a(48737),W=a(46417);var q=function(e){var r=e.data,a=e.handleCloseExportar;return(0,W.jsxs)(m.Z,{onClick:function(){!function(){var e=r.map((function(e){return[e.key,e.deva_Id,e.adua_IngresoNombre,e.adua_DespachoNombre,e.impo_Nombre_Raso,e.prov_Nombre_Raso,e.inte_Nombre_Raso]})),a=O.P6.aoa_to_sheet([["No.","C\xf3digo de la declaraci\xf3n de valor","Aduana de ingreso","Aduana de despacho","Nombre del importador","Nombre del proveedor","Nombre del intermediario"]].concat((0,M.Z)(e))),t=O.P6.book_new();O.P6.book_append_sheet(t,a,"Sheet1");var o=O.cW(t,{bookType:"xlsx",type:"array"}),n=new Blob([o],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,L.saveAs)(n,"Declaracion_Valor.xlsx")}(),a()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,W.jsx)(V.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},J=a(76278),U=a(31881),G=a.n(U),K=a(39284),Y=a.n(K),Q=a(11593),X=a(9098);Y().vfs=Q.I.vfs;var $=function(e){var r=e.data,a=e.handleCloseExportar,n=function(){var e=(0,o.Z)((0,t.Z)().mark((function e(){var a,o,n,i,l,s,c;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="A4",o=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",n=X.Z.formatFechaHora(new Date),i=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,G().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:l=e.sent,s=l.data,(c=new FileReader).onload=function(){var e={content:[{image:c.result,margin:[-40,-40],width:600,height:45},{text:"Declaraciones de Valor",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,r,t,n){return e.y+e.height>a[1]-o[3]},defaultStyle:{fontSize:12},footer:function(e,r){return{columns:[{text:"Generado por: ".concat(i.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(r),style:"footer"},{text:"Fecha: ".concat(n.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["auto","auto","auto","auto","auto","auto","auto"],body:[[{text:"No.",style:"tableHeader"},{text:"C\xf3digo de la declaraci\xf3n de valor",style:"tableHeader"},{text:"Aduana de ingreso",style:"tableHeader"},{text:"Aduana de despacho",style:"tableHeader"},{text:"Nombre del importador",style:"tableHeader"},{text:"Nombre del proveedor",style:"tableHeader"},{text:"Nombre del intermediario",style:"tableHeader"}]].concat((0,M.Z)(r.map((function(e){return[e.key,e.deva_Id,e.adua_IngresoNombre,e.adua_DespachoNombre,e.impo_Nombre_Raso||"No tiene importador",e.prov_Nombre_Raso||"No tiene proveedor",e.inte_Nombre_Raso||"No tiene intermediario"]})))),alignment:"center"}}),Y().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},c.readAsDataURL(s),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,W.jsx)("div",{children:(0,W.jsxs)(m.Z,{onClick:function(){n(),a()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,W.jsx)(J.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})};var ee=function(){var e=(0,D.useState)([]),r=(0,l.Z)(e,2),a=r[0],M=r[1],V={filename:"Declaracion_Valor",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"C\xf3digo de la declaraci\xf3n de valor"},{label:"Aduana de ingreso"},{label:"Aduana de despacho"},{label:"Nombre del importador"},{label:"Nombre del proveedor"},{label:"Nombre del intermediario"}].map((function(e){return e.label}))},L=new H.ExportToCsv(V),O=(0,P.Z)(),J=(0,A.s0)(),U=(JSON.parse(localStorage.getItem("user")),(0,D.useState)("")),G=(0,l.Z)(U,2),K=G[0],Y=G[1],Q=(0,D.useState)(!0),X=(0,l.Z)(Q,2),ee=X[0],re=(X[1],(0,D.useState)(!1)),ae=(0,l.Z)(re,2),te=(ae[0],ae[1],(0,D.useState)(!1)),oe=(0,l.Z)(te,2),ne=oe[0],ie=oe[1],le=(0,D.useState)(!1),se=(0,l.Z)(le,2),ce=(se[0],se[1],function(){ie(!ne)}),de=(0,D.useState)({}),ue=(0,l.Z)(de,2),pe=ue[0],me=ue[1],xe=["key","deva_Id","impo_Nombre_Raso","prov_Nombre_Raso",""],he=function(e){me((function(r){return(0,i.Z)((0,i.Z)({},r),{},(0,n.Z)({},e,null))}))},fe=D.useState(10),be=(0,l.Z)(fe,2),ve=be[0],ge=be[1],Ze=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,r){return e.key-r.key}},{title:"C\xf3digo de la declaraci\xf3n de valor",dataIndex:"deva_Id",key:"deva_Id",sorter:function(e,r){return e.deva_Id-r.deva_Id}},{title:"Aduana de ingreso",dataIndex:"adua_IngresoNombre",key:"adua_IngresoNombre",sorter:function(e,r){return e.adua_IngresoNombre.localeCompare(r.adua_IngresoNombre)}},{title:"Aduana de despacho",dataIndex:"adua_DespachoNombre",key:"adua_DespachoNombre",sorter:function(e,r){return e.adua_DespachoNombre.localeCompare(r.adua_DespachoNombre)}},{title:"Nombre del importador",dataIndex:"impo_Nombre_Raso",key:"impo_Nombre_Raso",sorter:function(e,r){return e.impo_Nombre_Raso.localeCompare(r.impo_Nombre_Raso)}},{title:"Nombre del proveedor",dataIndex:"prov_Nombre_Raso",key:"prov_Nombre_Raso",sorter:function(e,r){return e.prov_Nombre_Raso.localeCompare(r.prov_Nombre_Raso)}},{title:"Nombre del intermediario",dataIndex:"inte_Nombre_Raso",key:"inte_Nombre_Raso",sorter:function(e,r){return e.inte_Nombre_Raso.localeCompare(r.inte_Nombre_Raso)}},{title:"Acciones",key:"operation",render:function(e){return(0,W.jsx)("div",{children:(0,W.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,W.jsx)(d.Z,{"aria-controls":"menu-".concat(e.deva_Id),"aria-haspopup":"true",onClick:function(r){return a=r,t=e.deva_Id,void me((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,n.Z)({},t,a.currentTarget))}));var a,t},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,W.jsx)(u.Z,{children:"menu"}),children:"Opciones"}),(0,W.jsxs)(p.Z,{id:"menu-".concat(e.deva_Id),anchorEl:pe[e.deva_Id],keepMounted:!0,open:Boolean(pe[e.deva_Id]),onClose:function(){return he(e.deva_Id)},children:[(0,W.jsxs)(m.Z,{onClick:function(){return function(e){he(e.deva_Id),1==e.deva_Finalizacion?(0,z.go)("Advertencia. La DEVA ha sido finalizada. Lamentablemente, no es posible realizar modificaciones en la misma."):setTimeout((function(){E.Z.push("/Declaracion_Valor/editar",e)}),"1000")}(e)},children:[(0,W.jsx)(u.Z,{children:"edit"}),"\u3164Editar"]}),(0,W.jsxs)(m.Z,{onClick:function(){return _e(e)},children:[(0,W.jsx)(u.Z,{children:"print_connect"}),"\u3164Reporte"]})]})]})},e.deva_Id)}}],_e=function(e){he(e.deva_Id),1==e.deva_Finalizacion?E.Z.push("/Declaracion_Valor/reporte",e):(0,z.go)("\xa1Advertencia!.\n Para generar el reporte necesita haber dado por finalizada la declaraci\xf3n de valor."),he(e.deva_Id)},ye=(0,D.useState)([]),je=(0,l.Z)(ye,2),Ce=je[0],Ne=je[1],ke=(0,D.useState)([]),Ie=(0,l.Z)(ke,2),Se=Ie[0],Re=Ie[1],we=function(){var e=(0,o.Z)((0,t.Z)().mark((function e(){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,Re([]),Ne([]),e.next=5,O.listar();case 5:return r=e.sent,Ne(r),r.length>0?Re(r):Re(null),e.t0=M,e.next=11,O.ExportData();case 11:e.t1=e.sent,(0,e.t0)(e.t1),e.next=18;break;case 15:e.prev=15,e.t2=e.catch(0),Re(null);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}();(0,D.useEffect)((function(){we()}),[]);var De=Ce.filter((function(e){if(""===K)return!0;for(var r=0,a=Object.entries(e);r<a.length;r++){var t=(0,l.Z)(a[r],2),o=t[0],n=t[1];if(xe.includes(o)){var i="number"===typeof n?n.toString():n.toString().toLowerCase(),s="number"===typeof K?K.toString():K.toLowerCase();if(i.includes(s))return!0}}return!1})),Ae=function(){me((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,n.Z)({},"menu-exportar",null))}))};return(0,W.jsxs)(x.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,W.jsx)(h.Z,{component:"img",height:"200",image:"https://i.ibb.co/Trhd4rH/DECLARACI-N-DE-VALOR.png",alt:"Encabezado de la carta"}),(0,W.jsx)(f.Z,{in:ee,children:(0,W.jsxs)(b.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,W.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,W.jsx)(d.Z,{startIcon:(0,W.jsx)(u.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){J("/Declaracion_Valor/Crear")},children:"Nuevo"}),(0,W.jsxs)(d.Z,{startIcon:(0,W.jsx)(u.Z,{children:"upload"}),onClick:function(e){return r=e,a="menu-exportar",void me((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,n.Z)({},a,r.currentTarget))}));var r,a},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,W.jsx)(v.Z,{children:"Exportar"}),(0,W.jsx)(F.Z,{})]}),(0,W.jsx)("div",{children:(0,W.jsxs)(p.Z,{id:"menu-exportar",anchorEl:pe["menu-exportar"],open:Boolean(pe["menu-exportar"]),onClose:function(){return Ae()},keepMounted:!0,children:[(0,W.jsxs)(m.Z,{onClick:function(){!function(){try{L.generateCsv(a)}catch(e){}}(),Ae()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,W.jsx)(B.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,W.jsx)($,{data:Ce,handleCloseExportar:Ae}),(0,W.jsx)(q,{data:a,handleCloseExportar:Ae})]})},"menu-exportar")]}),(0,W.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,W.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,W.jsx)(g.Z,{sx:{minWidth:50},size:"small",children:(0,W.jsxs)(Z.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:ve,onChange:function(e){ge(e.target.value)},children:[(0,W.jsx)(m.Z,{value:10,children:"10"}),(0,W.jsx)(m.Z,{value:20,children:"20"}),(0,W.jsx)(m.Z,{value:30,children:"30"})]})}),(0,W.jsx)(_.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:K,onChange:function(e){Y(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,W.jsx)(y.Z,{position:"start",children:(0,W.jsx)(j.Z,{edge:"start",children:(0,W.jsx)(s.Z,{})})})}})]})]})}),(0,W.jsx)(f.Z,{in:ee,children:(0,W.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,W.jsx)(w.Z,{columns:Ze,dataSource:De,size:"small",locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,T.Z)(Se)},pagination:{pageSize:ve,showSizeChanger:!1,className:"custom-pagination"}})})}),(0,W.jsxs)(C.Z,{open:ne,fullWidth:"md",onClose:ce,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,W.jsx)(N.Z,{id:"alert-dialog-title",children:"Confirmaci\xf3n de Eliminaci\xf3n"}),(0,W.jsx)(k.Z,{children:(0,W.jsx)(I.Z,{id:"alert-dialog-description",children:"\xbfEst\xe1 seguro(a) que desea eliminar este registro?"})}),(0,W.jsx)(S.Z,{children:(0,W.jsxs)(R.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,W.jsx)(d.Z,{startIcon:(0,W.jsx)(u.Z,{children:"checked"}),variant:"contained",color:"error",style:{borderRadius:"10px",marginRight:"10px"},onClick:ce,children:"Eliminar"}),(0,W.jsx)(d.Z,{startIcon:(0,W.jsx)(u.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:ce,children:"Cancelar"})]})})]})]})}},89145:function(e,r,a){a(47313);var t=a(85281),o=a(53191),n=a(46417);r.Z=function(e){var r=(0,n.jsxs)(o.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,n.jsx)(o.Z,{item:!0,xs:12,children:(0,n.jsx)(t.Z,{style:{color:"#634a9e"}})}),(0,n.jsx)(o.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:r}},97762:function(e,r,a){a.d(r,{Z:function(){return h}});var t=a(63366),o=a(87462),n=a(47313),i=a(21921),l=a(88564),s=a(77342),c=a(61113),d=a(32298);function u(e){return(0,d.Z)("MuiDialogContentText",e)}(0,a(77430).Z)("MuiDialogContentText",["root"]);var p=a(46417),m=["children"],x=(0,l.ZP)(c.Z,{shouldForwardProp:function(e){return(0,l.FO)(e)||"classes"===e},name:"MuiDialogContentText",slot:"Root",overridesResolver:function(e,r){return r.root}})({}),h=n.forwardRef((function(e,r){var a=(0,s.Z)({props:e,name:"MuiDialogContentText"}),n=(0,t.Z)(a,m),l=function(e){var r=e.classes,a=(0,i.Z)({root:["root"]},u,r);return(0,o.Z)({},r,a)}(n);return(0,p.jsx)(x,(0,o.Z)({component:"p",variant:"body1",color:"text.secondary",ref:r,ownerState:n},a,{classes:l}))}))},33604:function(e,r,a){var t=a(87462),o=a(63366),n=a(47313),i=a(83061),l=a(21921),s=a(61113),c=a(88564),d=a(77342),u=a(93174),p=a(63909),m=a(46417),x=["className","id"],h=(0,c.ZP)(s.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,r){return r.root}})({padding:"16px 24px",flex:"0 0 auto"}),f=n.forwardRef((function(e,r){var a=(0,d.Z)({props:e,name:"MuiDialogTitle"}),s=a.className,c=a.id,f=(0,o.Z)(a,x),b=a,v=function(e){var r=e.classes;return(0,l.Z)({root:["root"]},u.a,r)}(b),g=n.useContext(p.Z).titleId,Z=void 0===g?c:g;return(0,m.jsx)(h,(0,t.Z)({component:"h2",className:(0,i.default)(v.root,s),ownerState:b,ref:r,variant:"h6",id:Z},f))}));r.Z=f}}]);