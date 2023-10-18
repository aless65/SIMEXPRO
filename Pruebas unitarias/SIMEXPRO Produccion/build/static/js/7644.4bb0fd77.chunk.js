"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[7644],{87644:function(e,r,t){t.r(r),t.d(r,{default:function(){return ae}});var n=t(74165),a=t(15861),o=t(4942),i=t(1413),c=t(29439),s=t(280),l=t(66106),d=t(40894),u=t(93433),p=t(66244),x=t(51405),h=t(78925),m=t(48737),f=t(46417);var Z=function(e){var r=e.data,t=e.handleCloseExportar;return(0,f.jsxs)(x.Z,{onClick:function(){!function(){var e=r.map((function(e){return[e.key,e.merc_Codigo,e.merc_Descripcion]})),t=m.P6.aoa_to_sheet([["No.","C\xf3digo del estado de mercanc\xeda","Nombre del estado de mercanc\xeda"]].concat((0,u.Z)(e))),n=m.P6.book_new();m.P6.book_append_sheet(n,t,"Sheet1");var a=m.cW(n,{bookType:"xlsx",type:"array"}),o=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,h.saveAs)(o,"Estado_Mercancias.xlsx")}(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,f.jsx)(p.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},g=t(47313),j=t(39284),y=t.n(j),C=t(11593),b=t(31881),v=t.n(b),_=t(76278),S=t(9098);y().vfs=C.I.vfs;var k=function(e){var r=e.data,t=e.handleCloseExportar,o=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var t,a,o,i,c,s,l;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="A4",a=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",o=S.Z.formatFechaHora(new Date),i=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,v().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:c=e.sent,s=c.data,(l=new FileReader).onload=function(){var e={content:[{image:l.result,margin:[-40,-40],width:600,height:45},{text:"Estados de Mercanc\xedas",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,r,n,o){return e.y+e.height>t[1]-a[3]},defaultStyle:{fontSize:12},footer:function(e,r){return{columns:[{text:"Generado por: ".concat(i.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(r),style:"footer"},{text:"Fecha: ".concat(o.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["auto","*","*"],body:[[{text:"No.",style:"tableHeader"},{text:"C\xf3digo del estado de mercanc\xeda",style:"tableHeader"},{text:"Nombre del estado de mercanc\xeda",style:"tableHeader"}]].concat((0,u.Z)(r.map((function(e){return[e.key,e.merc_Codigo,e.merc_Descripcion]})))),alignment:"center"}}),y().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},l.readAsDataURL(s),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,f.jsx)("div",{children:(0,f.jsxs)(x.Z,{onClick:function(){o(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,f.jsx)(_.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})},E=t(62563),w=t(57983),I=t(35898),D=t(24193),F=t(71263),N=t(82047),A=t(73428),P=t(16957),M=t(65033),U=t(93405),z=t(61113),B=t(1550),T=t(88797),R=t(24631),W=t(41727),H=t(47131),L=t(9019),O=t(19536),V=t(66212),Q=t(5178),q=t(9506),K=t(15103),G=t(28155),J=t(75627),X=(t(88282),t(77453),t(89145)),Y=t(3463);var $=function(){var e={XApiKey:S.Z.extraerToken()},r=v().create({baseURL:"https://practicaacademia.somee.com/api/EstadoMercancias/",headers:e}),t=JSON.parse(localStorage.getItem("user"));function o(){return(o=(0,a.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,a=t.data.data.map((function(e,r){return{key:r+1,merc_Id:e.merc_Id,merc_Codigo:e.merc_Codigo,merc_Descripcion:e.merc_Descripcion,usua_UsuarioCreacion:e.usua_UsuarioCreacion,merc_FechaCreacion:e.merc_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,merc_FechaModificacion:e.merc_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,merc_FechaEliminacion:e.merc_FechaEliminacion,merc_Estado:e.merc_Estado,usua_NombreCreacion:e.usua_NombreCreacion,usua_NombreModificacion:e.usua_NombreModificacion}})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function i(){return(i=(0,a.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,a=t.data.data.map((function(e,r){return{key:r+1,merc_Codigo:e.merc_Codigo,merc_Descripcion:e.merc_Descripcion}})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,a.Z)((0,n.Z)().mark((function e(a){var o,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o={merc_Codigo:a.CodigoEstado.trim().toUpperCase().replace(/\s+/g," "),merc_Descripcion:a.Estado.trim().replace(/\s+/g," "),usua_UsuarioCreacion:t.uuid,merc_FechaCreacion:S.Z.formatFechaHora(new Date)},e.next=4,r.post("Insertar",o);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,a.Z)((0,n.Z)().mark((function e(a,o){var i,c;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={merc_Id:o,merc_Codigo:a.CodigoEstado.trim().toUpperCase().replace(/\s+/g," "),merc_Descripcion:a.Estado.trim().replace(/\s+/g," "),usua_UsuarioModificacion:t.uuid,merc_FechaModificacion:S.Z.formatFechaHora(new Date)},e.next=4,r.post("Editar",i);case 4:return c=e.sent,e.abrupt("return",c);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return o.apply(this,arguments)},crear:function(e){return c.apply(this,arguments)},editar:function(e,r){return s.apply(this,arguments)},ExportData:function(){return i.apply(this,arguments)}}},ee=t(88477),re=t(75265),te={CodigoEstado:"",Estado:""},ne=Y.Ry().shape({CodigoEstado:Y.Z_().trim().max(2).required(),Estado:Y.Z_().trim().max(150).required()});var ae=function(){var e=$(),r=(0,g.useState)([]),t=(0,c.Z)(r,2),u=t[0],p=t[1],h=(0,g.useState)(""),m=(0,c.Z)(h,2),j=m[0],y=m[1],C=(0,g.useState)(!0),b=(0,c.Z)(C,2),v=b[0],_=b[1],S=(0,g.useState)(!1),Y=(0,c.Z)(S,2),ae=Y[0],oe=Y[1],ie=(0,g.useState)(!1),ce=(0,c.Z)(ie,2),se=(ce[0],ce[1],(0,g.useState)(!1)),le=(0,c.Z)(se,2),de=le[0],ue=le[1],pe=(0,g.useState)(!1),xe=(0,c.Z)(pe,2),he=xe[0],me=xe[1],fe=(0,g.useState)({}),Ze=(0,c.Z)(fe,2),ge=Ze[0],je=Ze[1],ye=g.useState(10),Ce=(0,c.Z)(ye,2),be=Ce[0],ve=Ce[1],_e=["key","merc_Codigo","merc_Descripcion"],Se=(0,g.useState)({}),ke=(0,c.Z)(Se,2),Ee=ke[0],we=ke[1],Ie=(0,g.useState)(0),De=(0,c.Z)(Ie,2),Fe=De[0],Ne=De[1],Ae=function(e){we((function(r){return(0,i.Z)((0,i.Z)({},r),{},(0,o.Z)({},e,null))}))},Pe=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,r){return e.key-r.key}},{title:"C\xf3digo del estado de mercanc\xeda",dataIndex:"merc_Codigo",key:"merc_Codigo",sorter:function(e,r){return e.merc_Codigo.localeCompare(r.merc_Codigo)}},{title:"Nombre del estado de mercanc\xeda",dataIndex:"merc_Descripcion",key:"merc_Descripcion",sorter:function(e,r){return e.merc_Descripcion.localeCompare(r.merc_Descripcion)}},{title:"Acciones",key:"operation",render:function(e){return(0,f.jsx)("div",{children:(0,f.jsxs)(I.Z,{direction:"row",spacing:1,children:[(0,f.jsx)(D.Z,{"aria-controls":"menu-".concat(e.merc_Id),"aria-haspopup":"true",onClick:function(r){return t=r,n=e.merc_Id,void we((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,o.Z)({},n,t.currentTarget))}));var t,n},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,f.jsx)(F.Z,{children:"menu"}),children:"Opciones"}),(0,f.jsxs)(N.Z,{id:"menu-".concat(e.merc_Id),anchorEl:Ee[e.merc_Id],keepMounted:!0,open:Boolean(Ee[e.merc_Id]),onClose:function(){return Ae(e.merc_Id)},children:[(0,f.jsxs)(x.Z,{onClick:function(){return r=e,Ke(),me(!0),Ne(r.merc_Id),tr("CodigoEstado",r.merc_Codigo),tr("Estado",r.merc_Descripcion),void Ae(r.merc_Id);var r},children:[(0,f.jsx)(F.Z,{children:"edit"}),"\u3164Editar"]}),(0,f.jsxs)(x.Z,{onClick:function(){return je(r=e),_(!v),ue(!de),void Ae(r.merc_Id);var r},children:[(0,f.jsx)(F.Z,{children:"visibility"}),"\u3164Detalles"]})]})]})},e.merc_Id)}}],Me={filename:"Estado_Mercancias",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"C\xf3digo del estado de mercanc\xeda"},{label:"Nombre del estado de mercanc\xeda"}].map((function(e){return e.label}))},Ue=new d.ExportToCsv(Me),ze=(0,g.useState)([]),Be=(0,c.Z)(ze,2),Te=Be[0],Re=Be[1],We=(0,g.useState)([]),He=(0,c.Z)(We,2),Le=He[0],Oe=He[1],Ve=function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,Oe([]),Re([]),r.next=5,e.listar();case 5:return t=r.sent,Re(t),t.length>0?Oe(t):Oe(null),r.t0=p,r.next=11,e.ExportData();case 11:r.t1=r.sent,(0,r.t0)(r.t1),r.next=18;break;case 15:r.prev=15,r.t2=r.catch(0),Oe(null);case 18:case"end":return r.stop()}}),r,null,[[0,15]])})));return function(){return r.apply(this,arguments)}}(),Qe=function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.crear(or);case 3:"1"==(t=r.sent).data.data.messageStatus?((0,re.xO)("El registro se ha insertado exitosamente"),y(""),Ve(),Ke(),Ye(te)):t.data.data.messageStatus.includes("UNIQUE")&&(0,re.d0)(),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),(0,re.bW)("Error inesperado");case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}(),qe=function(){var r=(0,a.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.editar(or,Fe);case 3:"1"==(t=r.sent).data.data.messageStatus?((0,re.fn)(),y(""!=j?or.Estado:""),Ve(),Ke(),Ye(te)):t.data.data.messageStatus.includes("UNIQUE")&&(0,re.d0)(),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),(0,re.bW)("Error inesperado");case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}();(0,g.useEffect)((function(){Ve()}),[]);var Ke=function(){_(!v),oe(!ae),Ye(te)},Ge=Te.filter((function(e){if(""===j)return!0;for(var r=0,t=Object.entries(e);r<t.length;r++){var n=(0,c.Z)(t[r],2),a=n[0],o=n[1];if(_e.includes(a)){var i="number"===typeof o?o.toString():o.toString().toLowerCase(),s="number"===typeof j?j.toString():j.toLowerCase();if(i.includes(s))return!0}}return!1})).reverse(),Je=(0,J.cI)({campos:te,mode:"all",resolver:(0,E.X)(ne)}),Xe=Je.handleSubmit,Ye=(Je.register,Je.reset),$e=Je.control,er=Je.watch,rr=Je.formState,tr=Je.setValue,nr=rr.isValid,ar=(rr.dirtyFields,rr.errors),or=(rr.touchedFields,er()),ir=function(){we((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,o.Z)({},"menu-exportar",null))}))};return(0,f.jsxs)(A.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,f.jsx)(P.Z,{component:"img",height:"200",image:"https://i.ibb.co/3dPVYBz/ESTADO-DE-MERCANC-AS.png",alt:"Encabezado de la carta"}),(0,f.jsxs)(M.Z,{in:v,children:[(0,f.jsxs)(U.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,f.jsxs)(I.Z,{direction:"row",spacing:1,children:[(0,f.jsx)(D.Z,{startIcon:(0,f.jsx)(F.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Ke(),me(!1)},children:"Nuevo"}),(0,f.jsxs)(D.Z,{startIcon:(0,f.jsx)(F.Z,{children:"upload"}),onClick:function(e){return r=e,t="menu-exportar",void we((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,o.Z)({},t,r.currentTarget))}));var r,t},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,f.jsx)(z.Z,{children:"Exportar"}),(0,f.jsx)(l.Z,{})]}),(0,f.jsx)("div",{children:(0,f.jsxs)(N.Z,{id:"menu-exportar",anchorEl:Ee["menu-exportar"],open:Boolean(Ee["menu-exportar"]),onClose:function(){return ir()},keepMounted:!0,children:[(0,f.jsxs)(x.Z,{onClick:function(){!function(){try{Ue.generateCsv(u)}catch(e){}}(),ir()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,f.jsx)(s.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,f.jsx)(k,{data:u,handleCloseExportar:ir}),(0,f.jsx)(Z,{data:u,handleCloseExportar:ir})]})},"menu-exportar")]}),(0,f.jsxs)(I.Z,{direction:"row",spacing:1,children:[(0,f.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,f.jsx)(B.Z,{sx:{minWidth:50},size:"small",children:(0,f.jsxs)(T.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:be,onChange:function(e){ve(e.target.value)},children:[(0,f.jsx)(x.Z,{value:10,children:"10"}),(0,f.jsx)(x.Z,{value:20,children:"20"}),(0,f.jsx)(x.Z,{value:30,children:"30"})]})}),(0,f.jsx)(R.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:j,onChange:function(e){y(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,f.jsx)(W.Z,{position:"start",children:(0,f.jsx)(H.Z,{edge:"start",children:(0,f.jsx)(w.Z,{})})})}})]})]}),(0,f.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,f.jsx)(G.Z,{columns:Pe,dataSource:Ge,size:"small",locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,X.Z)(Le)},pagination:{pageSize:be,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,f.jsx)("form",{onSubmit:Xe((function(e){})),children:(0,f.jsx)(M.Z,{in:ae,children:(0,f.jsx)(U.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,f.jsxs)(L.ZP,{container:!0,spacing:3,children:[(0,f.jsx)(L.ZP,{item:!0,xs:12,children:(0,f.jsx)(O.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,f.jsx)(V.Z,{label:he?"Editar Estado de la mercancia":"Agregar Estado de la mercancia"})})}),(0,f.jsx)(L.ZP,{item:!0,xs:6,children:(0,f.jsxs)(B.Z,{error:!!ar.CodigoEstado,fullWidth:!0,children:[(0,f.jsx)(Q.Z,{children:"Codigo del estado de la mercancia:"}),(0,f.jsx)(J.Qr,{render:function(e){var r=e.field;return(0,f.jsx)(R.Z,(0,i.Z)((0,i.Z)({},r),{},{id:"outlined-disabled",disabled:he,error:!!ar.CodigoEstado,fullWidth:!0,inputProps:{style:{textTransform:"uppercase"},maxLength:2}}))},name:"CodigoEstado",control:$e})]})}),(0,f.jsx)(L.ZP,{item:!0,xs:6,children:(0,f.jsx)(J.Qr,{render:function(e){var r=e.field;return(0,f.jsxs)(B.Z,{error:!!ar.Estado,fullWidth:!0,children:[(0,f.jsx)(Q.Z,{children:"Nombre del Estado:"}),(0,f.jsx)(R.Z,(0,i.Z)((0,i.Z)({},r),{},{id:"outlined-disabled",error:!!ar.Estado,fullWidth:!0,inputProps:{startadornment:(0,f.jsx)(W.Z,{position:"start"})}}))]})},name:"Estado",control:$e})}),(0,f.jsxs)(L.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,f.jsx)(D.Z,{startIcon:(0,f.jsx)(F.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},type:"submit",onClick:function(){nr?he?qe():Qe():(0,re.KV)("Completa todos los campos")},children:"Guardar"}),(0,f.jsx)(D.Z,{startIcon:(0,f.jsx)(F.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Ke,children:"Cancelar"})]})]})})})}),(0,f.jsx)(M.Z,{in:de,children:(0,f.jsx)(U.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,f.jsxs)(L.ZP,{container:!0,spacing:3,children:[(0,f.jsx)(L.ZP,{item:!0,xs:12,children:(0,f.jsx)(O.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,f.jsx)(V.Z,{color:"default",label:"Detalle Estado de mercanc\xeda"})})}),(0,f.jsx)(L.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,f.jsx)(q.Z,{sx:{textAlign:"center"},children:(0,f.jsxs)(K.Z,{htmlFor:"id",children:[(0,f.jsx)(z.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Id:"}),(0,f.jsx)(z.Z,{children:ge.merc_Id})]})})}),(0,f.jsx)(L.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,f.jsx)(q.Z,{sx:{textAlign:"center"},children:(0,f.jsxs)(K.Z,{htmlFor:"descripcion",children:[(0,f.jsx)(z.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"C\xf3digo:"}),(0,f.jsx)(z.Z,{children:ge.merc_Codigo})]})})}),(0,f.jsx)(L.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginTop:"10px"},children:(0,f.jsx)(q.Z,{sx:{textAlign:"center"},children:(0,f.jsxs)(K.Z,{htmlFor:"descripcion",children:[(0,f.jsx)(z.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Descripci\xf3n del Estado:"}),(0,f.jsx)(z.Z,{children:ge.merc_Descripcion})]})})}),(0,f.jsx)("br",{}),(0,f.jsx)(L.ZP,{item:!0,xs:12,children:(0,f.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsxs)("th",{style:ee.Z.tableHeaderStyle,children:[(0,f.jsx)(F.Z,{style:ee.Z.iconStyle,children:"edit"}),"Acci\xf3n"]}),(0,f.jsxs)("th",{style:ee.Z.tableHeaderStyle,children:[(0,f.jsx)(F.Z,{style:ee.Z.iconStyle,children:"person"}),"Usuario"]}),(0,f.jsxs)("th",{style:ee.Z.tableHeaderStyle,children:[(0,f.jsx)(F.Z,{style:ee.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,f.jsxs)("tbody",{children:[(0,f.jsxs)("tr",{style:ee.Z.tableRowStyle,children:[(0,f.jsx)("td",{style:ee.Z.tableCellStyle,children:(0,f.jsx)("strong",{children:"Creaci\xf3n"})}),(0,f.jsx)("td",{style:ee.Z.tableCellStyle,children:ge.usua_NombreCreacion}),(0,f.jsx)("td",{style:ee.Z.tableCellStyle,children:ge.merc_FechaCreacion?new Date(ge.merc_FechaCreacion).toLocaleString():""})]}),(0,f.jsxs)("tr",{style:ee.Z.tableRowStyle,children:[(0,f.jsx)("td",{style:ee.Z.tableCellStyle,children:(0,f.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,f.jsx)("td",{style:ee.Z.tableCellStyle,children:ge.usua_NombreModificacion}),(0,f.jsx)("td",{style:ee.Z.tableCellStyle,children:ge.merc_FechaModificacion?new Date(ge.merc_FechaModificacion).toLocaleString():""})]})]})]})}),(0,f.jsx)("br",{}),(0,f.jsx)(L.ZP,{item:!0,xs:12,children:(0,f.jsx)("div",{className:"card-footer",children:(0,f.jsx)(D.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:function(){_(!v),ue(!de)},startIcon:(0,f.jsx)(F.Z,{children:"arrow_back"}),children:"Regresar"})})})]})})})]})}},89145:function(e,r,t){t(47313);var n=t(85281),a=t(53191),o=t(46417);r.Z=function(e){var r=(0,o.jsxs)(a.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,o.jsx)(a.Z,{item:!0,xs:12,children:(0,o.jsx)(n.Z,{style:{color:"#634a9e"}})}),(0,o.jsx)(a.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:r}}}]);