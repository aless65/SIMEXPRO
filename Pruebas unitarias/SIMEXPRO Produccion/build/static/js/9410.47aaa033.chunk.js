"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[9410],{59410:function(e,t,r){r.r(t),r.d(t,{default:function(){return ie}});var n=r(74165),i=r(15861),a=r(4942),o=r(1413),s=r(29439),c=r(280),l=r(66106),d=r(40894),u=r(93433),p=r(66244),x=r(51405),h=r(78925),f=r(48737),m=r(46417);var Z=function(e){var t=e.data,r=e.handleCloseExportar;return(0,m.jsxs)(x.Z,{onClick:function(){!function(){var e=t.map((function(e){return[e.key,e.tite_Codigo,e.tite_Descripcion]})),r=f.P6.aoa_to_sheet([["No.","C\xf3digo de intermediario","Tipo de intermediario"]].concat((0,u.Z)(e))),n=f.P6.book_new();f.P6.book_append_sheet(n,r,"Sheet1");var i=f.cW(n,{bookType:"xlsx",type:"array"}),a=new Blob([i],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,h.saveAs)(a,"Tipos_Intermediario.xlsx")}(),r()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(p.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},g=r(47313),j=r(39284),y=r.n(j),C=r(11593),v=r(31881),_=r.n(v),b=r(76278),S=r(9098);y().vfs=C.I.vfs;var k=function(e){var t=e.data,r=e.handleCloseExportar,a=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var r,i,a,o,s,c,l;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="A4",i=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",a=S.Z.formatFechaHora(new Date),o=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,_().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:s=e.sent,c=s.data,(l=new FileReader).onload=function(){var e={content:[{image:l.result,margin:[-40,-40],width:600,height:45},{text:"Tipos de Intermediario",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,t,n,a){return e.y+e.height>r[1]-i[3]},defaultStyle:{fontSize:12},footer:function(e,t){return{columns:[{text:"Generado por: ".concat(o.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(t),style:"footer"},{text:"Fecha: ".concat(a.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["auto","*","*"],body:[[{text:"No.",style:"tableHeader"},{text:"C\xf3digo de intermediario",style:"tableHeader"},{text:"Tipo de intermediario",style:"tableHeader"}]].concat((0,u.Z)(t.map((function(e){return[e.key,e.tite_Codigo,e.tite_Descripcion]})))),alignment:"center"}}),y().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},l.readAsDataURL(c),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,m.jsx)("div",{children:(0,m.jsxs)(x.Z,{onClick:function(){a(),r()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(b.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})},w=r(57983),I=r(24193),D=r(71263),E=r(82047),T=r(65033),F=r(61113),A=r(1550),P=r(88797),U=r(24631),z=r(41727),B=r(47131),M=r(9019),N=r(19536),R=r(66212),H=r(5178),L=r(9506),W=r(15103),O=r(73428),Q=r(93405),V=r(16957),q=r(35898),K=r(75627),G=r(62563),J=r(3463),X=r(28155),Y=(r(77453),r(89145)),$=(r(88282),r(88477)),ee=r(75265);var te=function(){var e={XApiKey:S.Z.extraerToken()},t=_().create({baseURL:"https://practicaacademia.somee.com/api/TipoIntermediario/",headers:e}),r=JSON.parse(localStorage.getItem("user"));function a(){return(a=(0,i.Z)((0,n.Z)().mark((function e(){var r,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.get("Listar");case 3:return r=e.sent,i=r.data.data.map((function(e,t){return{key:t+1,tite_Id:e.tite_Id,tite_Codigo:e.tite_Codigo,tite_Descripcion:e.tite_Descripcion,usua_UsuarioCreacion:e.usua_UsuarioCreacion,tite_FechaCreacion:e.tite_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,tite_FechaModificacion:e.tite_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,tite_FechaEliminacion:e.tite_FechaEliminacion,tite_Estado:e.tite_Estado,usarioCreacion:e.usarioCreacion,usuarioModificacion:e.usuarioModificacion}})),e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function o(){return(o=(0,i.Z)((0,n.Z)().mark((function e(i){var a,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={tite_Codigo:i.tite_Codigo.trim().replace(/\s+/g," ").toUpperCase(),tite_Descripcion:i.tite_Descripcion.trim().replace(/\s+/g," "),usua_UsuarioCreacion:r.uuid,tite_FechaCreacion:S.Z.formatFechaHora(new Date)},e.next=4,t.post("Insertar",a);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,i.Z)((0,n.Z)().mark((function e(){var r,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.get("Listar");case 3:return r=e.sent,i=r.data.data.map((function(e,t){return{key:t+1,tite_Codigo:e.tite_Codigo,tite_Descripcion:e.tite_Descripcion}})),e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,i.Z)((0,n.Z)().mark((function e(i,a){var o,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o={tite_Id:a,tite_Codigo:i.tite_Codigo.trim().replace(/\s+/g," ").toUpperCase(),tite_Descripcion:i.tite_Descripcion.trim().replace(/\s+/g," "),usua_UsuarioModificacion:r.uuid,tite_FechaModificacion:S.Z.formatFechaHora(new Date)},e.next=4,t.post("Editar",o);case 4:return s=e.sent,e.abrupt("return",s);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function l(){return(l=(0,i.Z)((0,n.Z)().mark((function e(i){var a,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={tite_Id:i,usua_UsuarioEliminacion:r.uuid,tite_FechaEliminacion:S.Z.formatFechaHora(new Date)},e.next=4,t.post("Eliminar",a);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return a.apply(this,arguments)},crear:function(e){return o.apply(this,arguments)},editar:function(e,t){return c.apply(this,arguments)},eliminar:function(e){return l.apply(this,arguments)},ExportData:function(){return s.apply(this,arguments)}}},re={tite_Codigo:"",tite_Descripcion:""},ne=J.Ry().shape({tite_Codigo:J.Z_().trim().required("").test("formato","Codigo Incompleto",(function(e){return!!/^[A-Za-z]{2}$/.test(e)})),tite_Descripcion:J.Z_().trim().required("")});var ie=function(){var e=te(),t=(0,g.useState)([]),r=(0,s.Z)(t,2),u=r[0],p=r[1],h=(0,g.useState)(""),f=(0,s.Z)(h,2),j=f[0],y=f[1],C=(0,g.useState)(!0),v=(0,s.Z)(C,2),_=v[0],b=v[1],S=(0,g.useState)(!1),J=(0,s.Z)(S,2),ie=J[0],ae=J[1],oe=(0,g.useState)(!1),se=(0,s.Z)(oe,2),ce=se[0],le=se[1],de=(0,g.useState)({}),ue=(0,s.Z)(de,2),pe=ue[0],xe=ue[1],he=(0,g.useState)(0),fe=(0,s.Z)(he,2),me=fe[0],Ze=fe[1],ge=(0,g.useState)(!1),je=(0,s.Z)(ge,2),ye=je[0],Ce=je[1],ve=g.useState(10),_e=(0,s.Z)(ve,2),be=_e[0],Se=_e[1],ke=(0,g.useState)({}),we=(0,s.Z)(ke,2),Ie=we[0],De=we[1],Ee=(0,g.useState)([]),Te=(0,s.Z)(Ee,2),Fe=Te[0],Ae=Te[1],Pe=function(){b(!_),ae(!ie),Me(re)},Ue=function(e){De((function(t){return(0,o.Z)((0,o.Z)({},t),{},(0,a.Z)({},e,null))}))},ze=(0,K.cI)({defaultIntermediarioValues:re,mode:"all",resolver:(0,G.X)(ne)}),Be=ze.handleSubmit,Me=(ze.register,ze.reset),Ne=ze.control,Re=ze.watch,He=ze.formState,Le=ze.setValue,We=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,t){return e.key-t.key}},{title:"C\xf3digo de intermediario",dataIndex:"tite_Codigo",key:"tite_Codigo",sorter:function(e,t){return e.tite_Codigo.localeCompare(t.tite_Codigo)}},{title:"Tipo de intermediario",dataIndex:"tite_Descripcion",key:"tite_Descripcion",sorter:function(e,t){return e.tite_Descripcion.localeCompare(t.tite_Descripcion)}},{title:"Acciones",key:"operation",render:function(e){return(0,m.jsx)("div",{children:(0,m.jsxs)(q.Z,{direction:"row",spacing:1,children:[(0,m.jsx)(I.Z,{"aria-controls":"menu-".concat(e.tite_Id),"aria-haspopup":"true",onClick:function(t){return r=t,n=e.tite_Id,void De((function(e){return(0,o.Z)((0,o.Z)({},e),{},(0,a.Z)({},n,r.currentTarget))}));var r,n},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,m.jsx)(D.Z,{children:"menu"}),children:"Opciones"}),(0,m.jsxs)(E.Z,{id:"menu-".concat(e.tite_Id),anchorEl:Ie[e.tite_Id],keepMounted:!0,open:Boolean(Ie[e.tite_Id]),onClose:function(){return Ue(e.tite_Id)},children:[(0,m.jsxs)(x.Z,{onClick:function(){return t=e,Pe(),Ce(!0),Ze(t.tite_Id),Le("tite_Codigo",t.tite_Codigo),Le("tite_Descripcion",t.tite_Descripcion),void Ue(t.tite_Id);var t},children:[(0,m.jsx)(D.Z,{children:"edit"}),"\u3164Editar"]}),(0,m.jsxs)(x.Z,{onClick:function(){return xe(t=e),b(!_),le(!ce),void Ue(t.tite_Id);var t},children:[(0,m.jsx)(D.Z,{children:"visibility"}),"\u3164Detalles"]})]})]})},e.tite_Id)}}],Oe={filename:"Tipos_Intermediario",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"C\xf3digo de intermediario"},{label:"Tipo de intermediario"}].map((function(e){return e.label}))},Qe=new d.ExportToCsv(Oe),Ve=["key","tite_Codigo","tite_Descripcion"],qe=Fe.filter((function(e){if(""===j)return!0;for(var t=0,r=Object.entries(e);t<r.length;t++){var n=(0,s.Z)(r[t],2),i=n[0],a=n[1];if(Ve.includes(i)){var o="number"===typeof a?a.toString():a.toString().toLowerCase(),c="number"===typeof j?j.toString():j.toLowerCase();if(o.includes(c))return!0}}return!1})),Ke=He.isValid,Ge=(He.dirtyFields,He.errors),Je=Re(),Xe=(0,g.useState)([]),Ye=(0,s.Z)(Xe,2),$e=Ye[0],et=Ye[1],tt=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(){var r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,et([]),Ae([]),t.next=5,e.listar();case 5:return r=t.sent,Ae(r),r.length>0?et(r):et(null),t.t0=p,t.next=11,e.ExportData();case 11:t.t1=t.sent,(0,t.t0)(t.t1),t.next=18;break;case 15:t.prev=15,t.t2=t.catch(0),et(null);case 18:case"end":return t.stop()}}),t,null,[[0,15]])})));return function(){return t.apply(this,arguments)}}();(0,g.useEffect)((function(){tt()}),[]);var rt=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(){var r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.crear(Je);case 3:"1"==(r=t.sent).data.data.messageStatus?((0,ee.ys)(),tt(),Pe(),Me(re)):r.data.data.messageStatus.includes("UNIQUE")&&(0,ee.d0)(),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),(0,ee.bW)();case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),nt=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(){var r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.editar(Je,me);case 3:"1"==(r=t.sent).data.data.messageStatus?((0,ee.fn)(),tt(),y(""!=j?Je.tite_Descripcion||Je.tite_Codigo:""),Pe(),Me(re)):r.data.data.messageStatus.includes("UNIQUE")&&(0,ee.d0)(),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),(0,ee.bW)();case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),it=function(){De((function(e){return(0,o.Z)((0,o.Z)({},e),{},(0,a.Z)({},"menu-exportar",null))}))};return(0,m.jsxs)(O.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,m.jsx)(V.Z,{component:"img",height:"200",image:"https://i.ibb.co/0McQFgV/TIPO-DE-INTERMEDIARIO.png",alt:"Encabezado de la carta"}),(0,m.jsxs)(T.Z,{in:_,children:[(0,m.jsxs)(Q.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,m.jsxs)(q.Z,{direction:"row",spacing:1,children:[(0,m.jsx)(I.Z,{startIcon:(0,m.jsx)(D.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Pe(),Ce(!1)},children:"Nuevo"}),(0,m.jsxs)(I.Z,{startIcon:(0,m.jsx)(D.Z,{children:"upload"}),onClick:function(e){return t=e,r="menu-exportar",void De((function(e){return(0,o.Z)((0,o.Z)({},e),{},(0,a.Z)({},r,t.currentTarget))}));var t,r},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,m.jsx)(F.Z,{children:"Exportar"}),(0,m.jsx)(l.Z,{})]}),(0,m.jsx)("div",{children:(0,m.jsxs)(E.Z,{id:"menu-exportar",anchorEl:Ie["menu-exportar"],open:Boolean(Ie["menu-exportar"]),onClose:function(){return it()},keepMounted:!0,children:[(0,m.jsxs)(x.Z,{onClick:function(){!function(){try{Qe.generateCsv(u)}catch(e){}}(),it()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(c.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,m.jsx)(k,{data:u,handleCloseExportar:it}),(0,m.jsx)(Z,{data:u,handleCloseExportar:it})]})},"menu-exportar")]}),(0,m.jsxs)(q.Z,{direction:"row",spacing:1,children:[(0,m.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,m.jsx)(A.Z,{sx:{minWidth:50},size:"small",children:(0,m.jsxs)(P.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:be,onChange:function(e){Se(e.target.value)},children:[(0,m.jsx)(x.Z,{value:10,children:"10"}),(0,m.jsx)(x.Z,{value:25,children:"25"}),(0,m.jsx)(x.Z,{value:50,children:"50"})]})}),(0,m.jsx)(U.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:j,onChange:function(e){y(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,m.jsx)(z.Z,{position:"start",children:(0,m.jsx)(B.Z,{edge:"start",children:(0,m.jsx)(w.Z,{})})})}})]})]}),(0,m.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,m.jsx)(X.Z,{columns:We,dataSource:qe,size:"small",locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,Y.Z)($e)},pagination:{pageSize:be,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,m.jsx)("form",{onSubmit:Be((function(e){})),children:(0,m.jsx)(T.Z,{in:ie,children:(0,m.jsx)(Q.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,m.jsxs)(M.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(M.ZP,{item:!0,xs:12,children:(0,m.jsx)(N.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,m.jsx)(R.Z,{label:ye?"Editar Tipo de Intermediario":"Agregar Tipo de Intermediario"})})}),(0,m.jsx)(M.ZP,{item:!0,xs:6,children:(0,m.jsxs)(A.Z,{fullWidth:!0,children:[(0,m.jsx)(H.Z,{error:!!Ge.tite_Codigo,children:"C\xf3digo Tipo Intermediario:"}),(0,m.jsx)(K.Qr,{render:function(e){var t=e.field;return(0,m.jsx)(U.Z,(0,o.Z)((0,o.Z)({},t),{},{id:"outlined-disabled",inputProps:{onKeyPress:function(e){/[A-Za-z]/.test(e.key)||e.preventDefault()},maxLength:2},error:!!Ge.tite_Codigo}))},name:"tite_Codigo",control:Ne})]})}),(0,m.jsx)(M.ZP,{item:!0,xs:6,children:(0,m.jsxs)(A.Z,{fullWidth:!0,children:[(0,m.jsx)(H.Z,{error:!!Ge.tite_Descripcion,children:"Tipo de Intermediario:"}),(0,m.jsx)(K.Qr,{render:function(e){var t=e.field;return(0,m.jsx)(U.Z,(0,o.Z)((0,o.Z)({},t),{},{id:"outlined-disabled",inputProps:{maxLength:100},error:!!Ge.tite_Descripcion}))},name:"tite_Descripcion",control:Ne})]})}),(0,m.jsxs)(M.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,m.jsx)(I.Z,{type:"submit",startIcon:(0,m.jsx)(D.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Ke?ye?nt():rt():(0,ee.go)("Completa todos los campos")},children:"Guardar"}),(0,m.jsx)(I.Z,{startIcon:(0,m.jsx)(D.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Pe,children:"Cancelar"})]})]})})})}),(0,m.jsx)(T.Z,{in:ce,children:(0,m.jsx)(Q.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-center"},children:(0,m.jsxs)(M.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(M.ZP,{item:!0,xs:12,style:{marginBottom:"30px"},children:(0,m.jsx)(N.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,m.jsx)(R.Z,{label:"Detalles del Tipo de Intermediario"})})}),(0,m.jsxs)(M.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:[(0,m.jsx)(L.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(W.Z,{htmlFor:"id",children:[(0,m.jsx)(F.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Id del Tipo Intermediario:"}),(0,m.jsx)(F.Z,{children:pe.tite_Id})]})}),(0,m.jsx)(L.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(W.Z,{htmlFor:"descripcion",children:[(0,m.jsx)(F.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"C\xf3digo del Tipo Intermediario:"}),(0,m.jsx)(F.Z,{children:pe.tite_Codigo})]})})]}),(0,m.jsx)(M.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:(0,m.jsx)(L.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(W.Z,{htmlFor:"descripcion",children:[(0,m.jsx)(F.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre del Tipo Intermediario:"}),(0,m.jsx)(F.Z,{children:pe.tite_Descripcion})]})})}),(0,m.jsx)(M.ZP,{item:!0,xs:12,children:(0,m.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsxs)("th",{style:$.Z.tableHeaderStyle,children:[(0,m.jsx)(D.Z,{style:$.Z.iconStyle,children:"edit"}),"Acci\xf3n"]}),(0,m.jsxs)("th",{style:$.Z.tableHeaderStyle,children:[(0,m.jsx)(D.Z,{style:$.Z.iconStyle,children:"person"}),"Usuario"]}),(0,m.jsxs)("th",{style:$.Z.tableHeaderStyle,children:[(0,m.jsx)(D.Z,{style:$.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,m.jsxs)("tbody",{children:[(0,m.jsxs)("tr",{style:$.Z.tableRowStyle,children:[(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:(0,m.jsx)("strong",{children:"Creaci\xf3n"})}),(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:pe.usarioCreacion}),(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:pe.tite_FechaCreacion?new Date(pe.tite_FechaCreacion).toLocaleString():""})]}),(0,m.jsxs)("tr",{style:$.Z.tableRowStyle,children:[(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:(0,m.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:pe.usuarioModificacion}),(0,m.jsx)("td",{style:$.Z.tableCellStyle,children:pe.tite_FechaModificacion?new Date(pe.tite_FechaModificacion).toLocaleString():""})]})]})]})}),(0,m.jsx)("br",{}),(0,m.jsx)(M.ZP,{item:!0,xs:12,children:(0,m.jsxs)("div",{className:"card-footer",children:[(0,m.jsx)(I.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:function(){b(!_),le(!ce)},startIcon:(0,m.jsx)(D.Z,{children:"arrow_back"}),children:"Regresar"}),(0,m.jsx)("br",{})]})})]})})})]})}},89145:function(e,t,r){r(47313);var n=r(85281),i=r(53191),a=r(46417);t.Z=function(e){var t=(0,a.jsxs)(i.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,a.jsx)(i.Z,{item:!0,xs:12,children:(0,a.jsx)(n.Z,{style:{color:"#634a9e"}})}),(0,a.jsx)(i.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:t}}}]);