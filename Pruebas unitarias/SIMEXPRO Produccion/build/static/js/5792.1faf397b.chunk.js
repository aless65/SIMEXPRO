"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[5792],{35792:function(e,r,t){t.r(r),t.d(r,{default:function(){return de}});var o=t(74165),n=t(15861),i=t(4942),l=t(1413),a=t(29439),c=t(35898),s=t(24193),d=t(71263),u=t(82047),x=t(51405),h=t(73428),p=t(16957),m=t(65033),f=t(93405),g=t(9019),Z=t(61113),j=t(1550),C=t(88797),b=t(24631),y=t(41727),_=t(47131),v=t(19536),k=t(66212),S=t(5178),w=t(94469),N=t(33604),I=t(96467),E=t(4117),P=t(97762),H=t(9506),A=t(15103),F=t(47313),D=t(57983),B=t(24838),U=t(62563),R=t(75627),z=t(3463),M=t(28155),T=(t(77453),t(89145)),W=t(88477),L=t(31881),O=t.n(L),Q=t(9098);var q=function(){var e={XApiKey:Q.Z.extraerToken()},r=O().create({baseURL:"https://practicaacademia.somee.com/api/Colores/",headers:e}),t=JSON.parse(localStorage.getItem("user"));function i(){return(i=(0,n.Z)((0,o.Z)().mark((function e(){var t,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,n=t.data.data.map((function(e,r){return{key:r+1,colr_Id:e.colr_Id,colr_Nombre:e.colr_Nombre,colr_Codigo:e.colr_Codigo,colr_CodigoHtml:e.colr_CodigoHtml,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usuarioNombreCreacion:e.usuarioNombreCreacion,colr_FechaCreacion:e.colr_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,usuarioNombreModificacion:e.usuarioNombreModificacion,colr_FechaModificacion:e.colr_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,colr_FechaEliminacion:e.colr_FechaEliminacion,colr_Estado:e.colr_Estado}})),e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function l(){return(l=(0,n.Z)((0,o.Z)().mark((function e(){var t,n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,n=t.data.data.map((function(e,r){return{key:r+1,colr_Nombre:e.colr_Nombre,colr_Codigo:e.colr_Codigo}})),e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function a(){return(a=(0,n.Z)((0,o.Z)().mark((function e(n){var i,l;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={colr_Nombre:n.colr_Nombre.trim().replace(/\s+/g," "),colr_Codigo:n.colr_Codigo.trim().toUpperCase(),colr_CodigoHtml:n.colr_CodigoHtml,usua_UsuarioCreacion:t.uuid,colr_FechaCreacion:Q.Z.formatFechaHora(new Date)},e.next=4,r.post("Insertar",i);case 4:return l=e.sent,e.abrupt("return",l);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,n.Z)((0,o.Z)().mark((function e(n){var i,l;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={colr_Id:n.colr_Id,colr_Nombre:n.colr_Nombre.trim().replace(/\s+/g," "),colr_Codigo:n.colr_Codigo.trim().toUpperCase(),colr_CodigoHtml:n.colr_CodigoHtml,usua_UsuarioModificacion:t.uuid,colr_FechaModificacion:Q.Z.formatFechaHora(new Date)},e.next=4,r.post("Editar",i);case 4:return l=e.sent,e.abrupt("return",l);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return i.apply(this,arguments)},crear:function(e){return a.apply(this,arguments)},editar:function(e){return c.apply(this,arguments)},ExportData:function(){return l.apply(this,arguments)}}},V=t(280),G=t(66106),K=t(40894),X=(t(88282),t(75265)),J=t(93433),Y=t(66244),$=t(78925),ee=t(48737),re=t(46417);var te=function(e){var r=e.data,t=e.handleCloseExportar;return(0,re.jsxs)(x.Z,{onClick:function(){!function(){var e=r.map((function(e){return[e.key,e.colr_Nombre,e.colr_Codigo]})),t=ee.P6.aoa_to_sheet([["No.","Nombre del color","C\xf3digo del color"]].concat((0,J.Z)(e))),o=ee.P6.book_new();ee.P6.book_append_sheet(o,t,"Sheet1");var n=ee.cW(o,{bookType:"xlsx",type:"array"}),i=new Blob([n],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,$.saveAs)(i,"Colores.xlsx")}(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,re.jsx)(Y.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},oe=t(76278),ne=t(39284),ie=t.n(ne),le=t(11593);ie().vfs=le.I.vfs;var ae=function(e){var r=e.data,t=e.handleCloseExportar,i=function(){var e=(0,n.Z)((0,o.Z)().mark((function e(){var t,n,i,l,a,c,s;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="A4",n=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",i=Q.Z.formatFechaHora(new Date),l=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,O().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:a=e.sent,c=a.data,(s=new FileReader).onload=function(){var e={content:[{image:s.result,margin:[-40,-40],width:600,height:45},{text:"Colores",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,r,o,i){return e.y+e.height>t[1]-n[3]},defaultStyle:{fontSize:12},footer:function(e,r){return{columns:[{text:"Generado por: ".concat(l.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(r),style:"footer"},{text:"Fecha: ".concat(i.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["auto","*","*"],body:[[{text:"No.",style:"tableHeader"},{text:"Nombre del color",style:"tableHeader"},{text:"C\xf3digo del color",style:"tableHeader"}]].concat((0,J.Z)(r.map((function(e){return[e.key,e.colr_Nombre,e.colr_Codigo]})))),alignment:"center"}}),ie().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},s.readAsDataURL(c),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,re.jsx)("div",{children:(0,re.jsxs)(x.Z,{onClick:function(){i(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,re.jsx)(oe.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})},ce={id:"",colr_Nombre:"",colr_Codigo:""},se=z.Ry().shape({id:z.Z_(),colr_Nombre:z.Z_().trim().required(""),colr_Codigo:z.Z_().trim().required("")});var de=function(){var e=q(),r=(0,F.useState)([]),t=(0,a.Z)(r,2),z=t[0],L=t[1],O=(0,F.useState)(""),Q=(0,a.Z)(O,2),J=Q[0],Y=Q[1],$=(0,F.useState)(!0),ee=(0,a.Z)($,2),oe=ee[0],ne=ee[1],ie=(0,F.useState)(!1),le=(0,a.Z)(ie,2),de=le[0],ue=le[1],xe=(0,F.useState)(!1),he=(0,a.Z)(xe,2),pe=he[0],me=he[1],fe=(0,F.useState)({}),ge=(0,a.Z)(fe,2),Ze=ge[0],je=ge[1],Ce=(0,F.useState)(!1),be=(0,a.Z)(Ce,2),ye=be[0],_e=be[1],ve=(0,F.useState)(!1),ke=(0,a.Z)(ve,2),Se=ke[0],we=ke[1],Ne=F.useState(10),Ie=(0,a.Z)(Ne,2),Ee=Ie[0],Pe=Ie[1],He=(0,F.useState)({}),Ae=(0,a.Z)(He,2),Fe=Ae[0],De=Ae[1],Be=(0,F.useState)([]),Ue=(0,a.Z)(Be,2),Re=Ue[0],ze=Ue[1],Me=(0,F.useState)(!1),Te=(0,a.Z)(Me,2),We=Te[0],Le=Te[1],Oe=(0,F.useState)("#3573CB"),Qe=(0,a.Z)(Oe,2),qe=Qe[0],Ve=Qe[1],Ge=function(){ne(!oe),ue(!de),lr(ce),Ve("")},Ke=function(){_e(!ye)},Xe=function(){ne(!oe),me(!pe)},Je=function(e){De((function(r){return(0,l.Z)((0,l.Z)({},r),{},(0,i.Z)({},e,null))}))},Ye=function(){Le(!1),Ve("")},$e=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,r){return e.key-r.key}},{title:"Nombre del color",dataIndex:"colr_Nombre",key:"colr_Nombre",sorter:function(e,r){return e.colr_Nombre.localeCompare(r.colr_Nombre)}},{title:"C\xf3digo del color",dataIndex:"colr_Codigo",key:"colr_Codigo",sorter:function(e,r){return e.colr_Codigo.localeCompare(r.colr_Codigo)}},{title:"Color",dataIndex:"colr_CodigoHtml",key:"colr_CodigoHtml",render:function(e){return(0,re.jsx)("div",{style:{backgroundColor:e,width:"80px",height:"20px"}})},sorter:function(e,r){return e.colr_CodigoHtml.localeCompare(r.colr_CodigoHtml)}},{title:"Acciones",key:"operation",render:function(e){return(0,re.jsx)("div",{children:(0,re.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,re.jsx)(s.Z,{"aria-controls":"menu-".concat(e.colr_Id),"aria-haspopup":"true",onClick:function(r){return t=r,o=e.colr_Id,void De((function(e){return(0,l.Z)((0,l.Z)({},e),{},(0,i.Z)({},o,t.currentTarget))}));var t,o},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,re.jsx)(d.Z,{children:"menu"}),children:"Opciones"}),(0,re.jsxs)(u.Z,{id:"menu-".concat(e.colr_Id),anchorEl:Fe[e.colr_Id],keepMounted:!0,open:Boolean(Fe[e.colr_Id]),onClose:function(){return Je(e.colr_Id)},children:[(0,re.jsxs)(x.Z,{onClick:function(){return r=e,Ge(),we(!0),dr("id",r.colr_Id),dr("colr_Nombre",r.colr_Nombre),dr("colr_Codigo",r.colr_Codigo),Ve(r.colr_CodigoHtml),void Je(r.colr_Id);var r},children:[(0,re.jsx)(d.Z,{children:"edit"}),"\u3164Editar"]}),(0,re.jsxs)(x.Z,{onClick:function(){return je(r=e),Xe(),void Je(r.colr_Id);var r},children:[(0,re.jsx)(d.Z,{children:"visibility"}),"\u3164Detalles"]})]})]})},e.id)}}],er={filename:"Colores",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"Nombre del color"},{label:"C\xf3digo del color"}].map((function(e){return e.label}))},rr=new K.ExportToCsv(er),tr=["key","colr_Nombre","colr_Codigo"],or=Re.filter((function(e){if(""===J)return!0;for(var r=0,t=Object.entries(e);r<t.length;r++){var o=(0,a.Z)(t[r],2),n=o[0],i=o[1];if(tr.includes(n)){var l="number"===typeof i?i.toString():i.toString().toLowerCase(),c="number"===typeof J?J.toString():J.toLowerCase();if(l.includes(c))return!0}}return!1})).reverse(),nr=(0,R.cI)({defaultColoresValues:ce,mode:"all",resolver:(0,U.X)(se)}),ir=nr.handleSubmit,lr=(nr.register,nr.reset),ar=nr.control,cr=nr.watch,sr=nr.formState,dr=nr.setValue,ur=sr.isValid,xr=(sr.dirtyFields,sr.errors),hr=cr(),pr=(0,F.useState)([]),mr=(0,a.Z)(pr,2),fr=mr[0],gr=mr[1],Zr=function(){var r=(0,n.Z)((0,o.Z)().mark((function r(){var t;return(0,o.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,gr([]),ze([]),r.next=5,e.listar();case 5:return t=r.sent,ze(t),t.length>0?gr(t):gr(null),r.t0=L,r.next=11,e.ExportData();case 11:r.t1=r.sent,(0,r.t0)(r.t1),r.next=18;break;case 15:r.prev=15,r.t2=r.catch(0),gr(null);case 18:case"end":return r.stop()}}),r,null,[[0,15]])})));return function(){return r.apply(this,arguments)}}(),jr=function(){var r=(0,n.Z)((0,o.Z)().mark((function r(){var t,n;return(0,o.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,t={colr_Nombre:hr.colr_Nombre,colr_Codigo:hr.colr_Codigo,colr_CodigoHtml:qe},r.next=4,e.crear(t);case 4:"1"==(n=r.sent).data.data.messageStatus?((0,X.ys)(),Zr(),Ge(),lr(ce)):n.data.data.messageStatus.includes("UNIQUE")&&(0,X.d0)(),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(0),(0,X.bW)();case 11:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(){return r.apply(this,arguments)}}(),Cr=function(){var r=(0,n.Z)((0,o.Z)().mark((function r(){var t,n;return(0,o.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,t={colr_Id:hr.id,colr_Nombre:hr.colr_Nombre,colr_Codigo:hr.colr_Codigo,colr_CodigoHtml:qe},r.next=4,e.editar(t);case 4:"1"==(n=r.sent).data.data.messageStatus?((0,X.fn)(),Zr(),Ge(),Y(""),lr(ce)):n.data.data.messageStatus.includes("UNIQUE")&&(0,X.d0)(),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(0),(0,X.bW)();case 11:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(){return r.apply(this,arguments)}}();(0,F.useEffect)((function(){Zr()}),[]);var br=function(){De((function(e){return(0,l.Z)((0,l.Z)({},e),{},(0,i.Z)({},"menu-exportar",null))}))};return(0,re.jsxs)(h.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,re.jsx)(p.Z,{component:"img",height:"200",image:"https://i.ibb.co/W6w7h2L/COLORES.png",alt:"Encabezado de la carta"}),(0,re.jsxs)(m.Z,{in:oe,children:[(0,re.jsxs)(f.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:["    ",(0,re.jsxs)(g.ZP,{container:!0,spacing:1,children:[(0,re.jsx)(g.ZP,{item:!0,xs:12,sm:12,md:6,display:"flex",sx:{justifyContent:{xs:"center",sm:"center",md:"start"}},children:(0,re.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,re.jsx)(s.Z,{startIcon:(0,re.jsx)(d.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Ge(),we()},children:"Nuevo"}),(0,re.jsxs)(s.Z,{startIcon:(0,re.jsx)(d.Z,{children:"upload"}),onClick:function(e){return r=e,t="menu-exportar",void De((function(e){return(0,l.Z)((0,l.Z)({},e),{},(0,i.Z)({},t,r.currentTarget))}));var r,t},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,re.jsx)(Z.Z,{children:"Exportar"}),(0,re.jsx)(G.Z,{})]}),(0,re.jsx)("div",{children:(0,re.jsxs)(u.Z,{id:"menu-exportar",anchorEl:Fe["menu-exportar"],open:Boolean(Fe["menu-exportar"]),onClose:function(){return br()},keepMounted:!0,children:[(0,re.jsxs)(x.Z,{onClick:function(){!function(){try{rr.generateCsv(z)}catch(e){}}(),br()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,re.jsx)(V.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,re.jsx)(ae,{data:z,handleCloseExportar:br}),(0,re.jsx)(te,{data:z,handleCloseExportar:br})]})},"menu-exportar")]})}),(0,re.jsxs)(g.ZP,{item:!0,xs:12,sm:6,md:3,display:"flex",sx:{justifyContent:{xs:"center",sm:"end",md:"end"}},children:[(0,re.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,re.jsx)(j.Z,{sx:{minWidth:50},size:"small",children:(0,re.jsxs)(C.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:Ee,onChange:function(e){Pe(e.target.value)},children:[(0,re.jsx)(x.Z,{value:10,children:"10"}),(0,re.jsx)(x.Z,{value:20,children:"20"}),(0,re.jsx)(x.Z,{value:30,children:"30"})]})})]}),(0,re.jsx)(g.ZP,{item:!0,xs:12,sm:6,md:3,display:"flex",sx:{justifyContent:{xs:"center",sm:"start",md:"center"}},children:(0,re.jsx)(b.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:J,onChange:function(e){Y(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,re.jsx)(y.Z,{position:"start",children:(0,re.jsx)(_.Z,{edge:"start",children:(0,re.jsx)(D.Z,{})})})}})})]})]}),(0,re.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,re.jsx)(M.Z,{columns:$e,scroll:{x:!0},dataSource:or,size:"small",locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,T.Z)(fr)},pagination:{pageSize:Ee,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,re.jsx)("form",{onSubmit:ir((function(e){})),children:(0,re.jsx)(m.Z,{in:de,children:(0,re.jsx)(f.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:(0,re.jsxs)(g.ZP,{container:!0,spacing:3,children:[(0,re.jsx)(g.ZP,{item:!0,xs:12,children:(0,re.jsx)(v.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,re.jsx)(k.Z,{label:Se?"Editar Color":"Agregar Color"})})}),(0,re.jsx)(g.ZP,{item:!0,xs:6,children:(0,re.jsxs)(j.Z,{fullWidth:!0,children:[(0,re.jsx)(S.Z,{error:!!xr.colr_Nombre,children:"Nombre del Color:"}),(0,re.jsx)(R.Qr,{render:function(e){var r=e.field;return(0,re.jsx)(b.Z,(0,l.Z)((0,l.Z)({},r),{},{id:"outlined-disabled",inputProps:{maxLength:150},error:!!xr.colr_Nombre}))},name:"colr_Nombre",control:ar})]})}),(0,re.jsx)(g.ZP,{item:!0,xs:6,children:(0,re.jsxs)(j.Z,{fullWidth:!0,children:[(0,re.jsx)(S.Z,{error:!!xr.colr_Codigo,children:"Codigo del color:"}),(0,re.jsx)(R.Qr,{render:function(e){var r=e.field;return(0,re.jsx)(b.Z,(0,l.Z)((0,l.Z)({},r),{},{id:"outlined-disabled",inputProps:{maxLength:150},error:!!xr.colr_Codigo}))},name:"colr_Codigo",control:ar})]})}),(0,re.jsx)(g.ZP,{item:!0,xs:12,md:6,children:(0,re.jsxs)(j.Z,{fullWidth:!0,children:[(0,re.jsx)(S.Z,{error:!!xr.colr_CodigoHtml,children:"Color:"}),(0,re.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,re.jsx)(b.Z,{id:"outlined-disabled",inputProps:{maxLength:150},error:!!xr.colr_CodigoHtml,value:qe,onChange:function(e){return Ve(e.target.value)},disabled:!0,InputProps:{endAdornment:(0,re.jsx)(y.Z,{position:"end",children:(0,re.jsx)(_.Z,{edge:"end","aria-label":"add",onClick:function(){Le(!0)},children:(0,re.jsx)("img",{src:"https://th.bing.com/th/id/OIP.qtDHNUyf4d0E0SHEFDsTBQHaGX?pid=ImgDet&rs=1",alt:"Agregar",style:{width:"24px",height:"24px"}})})})}})})]})}),(0,re.jsxs)(g.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,re.jsx)(s.Z,{type:"submit",startIcon:(0,re.jsx)(d.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){ur?Se?Cr():jr():(0,X.KV)()},children:"Guardar"}),(0,re.jsx)(s.Z,{startIcon:(0,re.jsx)(d.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Ge,children:"Cancelar"})]})]})})})}),(0,re.jsxs)(w.Z,{open:We,onClose:Ye,children:[(0,re.jsx)(N.Z,{children:"Seleccionar color"}),(0,re.jsx)(I.Z,{children:(0,re.jsx)(g.ZP,{item:!0,xs:12,sx:{display:"flex",alignItems:"center",flexDirection:"column",marginTop:"15px"},children:(0,re.jsx)(j.Z,{fullWidth:!0,children:(0,re.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:(0,re.jsx)(R.Qr,{render:function(e){var r=e.field;return(0,re.jsx)(B.ZP,(0,l.Z)((0,l.Z)({},r),{},{color:qe,onChange:function(e){Ve(e.hex)}}))},name:"color",control:ar})})})})}),(0,re.jsxs)(E.Z,{children:[(0,re.jsx)(s.Z,{onClick:Ye,children:"Cancelar"}),(0,re.jsx)(s.Z,{onClick:function(){Le(!1)},children:"Aceptar"})]})]}),(0,re.jsxs)(w.Z,{open:ye,fullWidth:"md",onClose:Ke,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,re.jsx)(N.Z,{id:"alert-dialog-title",children:"Confirmaci\xf3n de Eliminaci\xf3n"}),(0,re.jsx)(I.Z,{children:(0,re.jsx)(P.Z,{id:"alert-dialog-description",children:"\xbfEst\xe1 seguro(a) que desea eliminar este registro?"})}),(0,re.jsx)(E.Z,{children:(0,re.jsxs)(g.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,re.jsx)(s.Z,{startIcon:(0,re.jsx)(d.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:Ke,children:"Eliminar"}),(0,re.jsx)(s.Z,{startIcon:(0,re.jsx)(d.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Ke,children:"Cancelar"})]})})]}),(0,re.jsx)(m.Z,{in:pe,children:(0,re.jsx)(f.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-center"},children:(0,re.jsxs)(g.ZP,{container:!0,spacing:3,children:[(0,re.jsx)(g.ZP,{item:!0,xs:12,style:{marginBottom:"30px"},children:(0,re.jsx)(v.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,re.jsx)(k.Z,{label:"Detalles del Color"})})}),(0,re.jsxs)(g.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:[(0,re.jsx)(H.Z,{sx:{flex:1,textAlign:"center"},children:(0,re.jsxs)(A.Z,{htmlFor:"id",children:[(0,re.jsx)(Z.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Id del Color:"}),(0,re.jsx)(Z.Z,{children:Ze.colr_Id})]})}),(0,re.jsx)(H.Z,{sx:{flex:1,textAlign:"center"},children:(0,re.jsxs)(A.Z,{htmlFor:"descripcion",children:[(0,re.jsx)(Z.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre del Color:"}),(0,re.jsx)(Z.Z,{children:Ze.colr_Nombre})]})}),(0,re.jsx)(H.Z,{sx:{flex:1,textAlign:"center"},children:(0,re.jsxs)(A.Z,{htmlFor:"Codigo color",children:[(0,re.jsx)(Z.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Codigo del color:"}),(0,re.jsx)(Z.Z,{children:Ze.colr_Codigo})]})}),(0,re.jsx)(H.Z,{sx:{flex:1,textAlign:"center"},children:(0,re.jsxs)(A.Z,{htmlFor:"Codigo html",children:[(0,re.jsx)(Z.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Codigo Html:"}),(0,re.jsx)(Z.Z,{style:{color:Ze.colr_CodigoHtml},children:Ze.colr_CodigoHtml})]})})]}),(0,re.jsx)(g.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"}}),(0,re.jsx)(g.ZP,{item:!0,xs:12,children:(0,re.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,re.jsx)("thead",{children:(0,re.jsxs)("tr",{children:[(0,re.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,re.jsx)(d.Z,{style:W.Z.iconStyle,children:"edit"}),"Accion"]}),(0,re.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,re.jsx)(d.Z,{style:W.Z.iconStyle,children:"person"}),"Usuario"]}),(0,re.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,re.jsx)(d.Z,{style:W.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,re.jsxs)("tbody",{children:[(0,re.jsxs)("tr",{style:W.Z.tableRowStyle,children:[(0,re.jsx)("td",{style:W.Z.tableCellStyle,children:(0,re.jsx)("strong",{children:"Creaci\xf3n"})}),(0,re.jsx)("td",{style:W.Z.tableCellStyle,children:Ze.usuarioNombreCreacion}),(0,re.jsx)("td",{style:W.Z.tableCellStyle,children:Ze.colr_FechaCreacion?new Date(Ze.colr_FechaCreacion).toLocaleString():""})]}),(0,re.jsxs)("tr",{style:W.Z.tableRowStyle,children:[(0,re.jsx)("td",{style:W.Z.tableCellStyle,children:(0,re.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,re.jsx)("td",{style:W.Z.tableCellStyle,children:Ze.usuarioNombreModificacion}),(0,re.jsx)("td",{style:W.Z.tableCellStyle,children:Ze.colr_FechaModificacion?new Date(Ze.colr_FechaModificacion).toLocaleString():""})]})]})]})}),(0,re.jsx)("br",{}),(0,re.jsx)(g.ZP,{item:!0,xs:12,children:(0,re.jsxs)("div",{className:"card-footer",children:[(0,re.jsx)(s.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:Xe,startIcon:(0,re.jsx)(d.Z,{children:"arrow_back"}),children:"Regresar"}),(0,re.jsx)("br",{})]})})]})})})]})}},89145:function(e,r,t){t(47313);var o=t(85281),n=t(53191),i=t(46417);r.Z=function(e){var r=(0,i.jsxs)(n.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,i.jsx)(n.Z,{item:!0,xs:12,children:(0,i.jsx)(o.Z,{style:{color:"#634a9e"}})}),(0,i.jsx)(n.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:r}}}]);