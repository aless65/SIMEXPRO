"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[4387],{4387:function(e,r,t){t.r(r),t.d(r,{default:function(){return ie}});var n=t(74165),a=t(4942),i=t(1413),o=t(15861),l=t(29439),c=t(280),s=t(66106),d=t(40894),u=t(93433),p=t(66244),x=t(51405),h=t(78925),f=t(48737),m=t(46417);var Z=function(e){var r=e.data,t=e.handleCloseExportar;return(0,m.jsxs)(x.Z,{onClick:function(){!function(){var e=r.map((function(e){return[e.key,e.alde_Nombre,e.ciud_Nombre]})),t=f.P6.aoa_to_sheet([["No.","Nombre de la aldea","Ciudad a la que pertenece"]].concat((0,u.Z)(e))),n=f.P6.book_new();f.P6.book_append_sheet(n,t,"Sheet1");var a=f.cW(n,{bookType:"xlsx",type:"array"}),i=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,h.saveAs)(i,"Aldeas.xlsx")}(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(p.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},b=t(47313),j=t(39284),y=t.n(j),g=t(11593),v=t(31881),_=t.n(v),C=t(76278),N=t(9098);y().vfs=g.I.vfs;var S=function(e){var r=e.data,t=e.handleCloseExportar,a=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var t,a,i,o,l,c,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="A4",a=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",i=N.Z.formatFechaHora(new Date),o=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,_().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:l=e.sent,c=l.data,(s=new FileReader).onload=function(){var e={content:[{image:s.result,margin:[-40,-40],width:600,height:45},{text:"Aldeas",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,r,n,i){return e.y+e.height>t[1]-a[3]},defaultStyle:{fontSize:12},footer:function(e,r){return{columns:[{text:"Generado por: ".concat(o.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(r),style:"footer"},{text:"Fecha: ".concat(i.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["auto","*","*"],body:[[{text:"No.",style:"tableHeader"},{text:"Nombre de la aldea",style:"tableHeader"},{text:"Ciudad a la que pertenece",style:"tableHeader"}]].concat((0,u.Z)(r.map((function(e){return[e.key,e.alde_Nombre,e.ciud_Nombre]})))),alignment:"center"}}),y().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},s.readAsDataURL(c),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,m.jsx)("div",{children:(0,m.jsxs)(x.Z,{onClick:function(){a(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(C.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})},k=t(24193),w=t(71263),I=t(1550),A=t(24631),E=t(41727),F=t(47131),P=t(19536),D=t(66212),B=t(25298),M=t(15103),z=t(73428),U=t(93405),L=t(16957),R=t(57983),T=t(9506),H=t(65033),W=t(5178),O=t(9019),q=t(82047),V=t(88797),Q=t(35898),K=t(61113),X=t(62563),G=t(75627),J=t(3463),Y=t(28155),$=(t(77453),t(89145)),ee=t(88477);var re=function(){var e={XApiKey:N.Z.extraerToken()},r=_().create({baseURL:"https://practicaacademia.somee.com/api/",headers:e}),t=JSON.parse(localStorage.getItem("user"));function a(){return(a=(0,o.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Aldea/Listar");case 3:return t=e.sent,a=t.data.data.map((function(e,r){return{key:r+1,alde_Id:e.alde_Id,alde_Nombre:e.alde_Nombre,ciud_Nombre:e.ciud_Nombre,ciud_Id:e.ciud_Id,pvin_Nombre:e.pvin_Nombre,usuarioCreacionNombre:e.usuarioCreacionNombre,usua_UsuarioCreacion:e.usua_UsuarioCreacion,alde_FechaCreacion:e.alde_FechaCreacion,usuarioModificadorNombre:e.usuarioModificadorNombre,usua_UsuarioModificacion:e.usua_UsuarioModificacion,alde_FechaModificacion:e.alde_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,alde_FechaEliminacion:e.alde_FechaEliminacion,alde_Estado:e.alde_Estado}})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function i(){return(i=(0,o.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Aldea/Listar");case 3:return t=e.sent,a=t.data.data.map((function(e,r){return{key:r+1,alde_Nombre:e.alde_Nombre,ciud_Nombre:e.ciud_Nombre}})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,o.Z)((0,n.Z)().mark((function e(a){var i,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={alde_Nombre:a.alda_Nombre.trim().replace(/\s+/g," "),ciud_Id:a.ciudad.value,usua_UsuarioCreacion:t.uuid,alde_FechaCreacion:N.Z.formatFechaHora(new Date)},e.next=4,r.post("Aldea/Insertar",i);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,o.Z)((0,n.Z)().mark((function e(a){var i,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={alde_Id:a.id,alde_Nombre:a.alda_Nombre.trim().replace(/\s+/g," "),ciud_Id:a.ciudad.value,usua_UsuarioModificacion:t.uuid,alde_FechaModificacion:N.Z.formatFechaHora(new Date)},e.next=4,r.post("Aldea/Editar",i);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function d(){return(d=(0,o.Z)((0,n.Z)().mark((function e(){var t,a,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Ciudades/Listar");case 3:return t=e.sent,a={},t.data.data.forEach((function(e){var r=e.pvin_Nombre;a[r]||(a[r]=[]),a[r].push({value:e.ciud_Id,label:e.ciud_Nombre,provincia:e.pvin_Nombre})})),i=Object.entries(a).map((function(e){var r=(0,l.Z)(e,2);return{label:r[0],options:r[1]}})),e.abrupt("return",i);case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}return{listar:function(){return a.apply(this,arguments)},crear:function(e){return c.apply(this,arguments)},editar:function(e){return s.apply(this,arguments)},ciudadDDL:function(){return d.apply(this,arguments)},ExportData:function(){return i.apply(this,arguments)}}},te=(t(88282),t(75265)),ne={id:"",alda_Nombre:"",ciudad:null},ae=J.Ry().shape({id:J.Z_(),alda_Nombre:J.Z_().trim().required(""),ciudad:J.Ry().required("")});var ie=function(){var e=re(),r=(0,b.useState)([]),t=(0,l.Z)(r,2),u=t[0],p=t[1];function h(){return(h=(0,o.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=p,r.next=3,e.ciudadDDL();case 3:r.t1=r.sent,(0,r.t0)(r.t1);case 5:case"end":return r.stop()}}),r)})))).apply(this,arguments)}var f=(0,b.useState)(""),j=(0,l.Z)(f,2),y=j[0],g=j[1],v=(0,b.useState)(!0),_=(0,l.Z)(v,2),C=_[0],N=_[1],J=(0,b.useState)(!1),ie=(0,l.Z)(J,2),oe=ie[0],le=ie[1],ce=(0,b.useState)(!1),se=(0,l.Z)(ce,2),de=se[0],ue=se[1],pe=(0,b.useState)({}),xe=(0,l.Z)(pe,2),he=xe[0],fe=xe[1],me=(0,b.useState)(!1),Ze=(0,l.Z)(me,2),be=(Ze[0],Ze[1],(0,b.useState)(!1)),je=(0,l.Z)(be,2),ye=je[0],ge=je[1],ve=b.useState(10),_e=(0,l.Z)(ve,2),Ce=_e[0],Ne=_e[1],Se=(0,b.useState)({}),ke=(0,l.Z)(Se,2),we=ke[0],Ie=ke[1],Ae=(0,b.useState)([]),Ee=(0,l.Z)(Ae,2),Fe=Ee[0],Pe=Ee[1],De=function(){N(!C),le(!oe),Oe(ne)},Be=function(){N(!C),ue(!de)},Me=function(e){Ie((function(r){return(0,i.Z)((0,i.Z)({},r),{},(0,a.Z)({},e,null))}))},ze=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,r){return e.key-r.key}},{title:"Nombre de la aldea",dataIndex:"alde_Nombre",key:"alde_Nombre",sorter:function(e,r){return e.alde_Nombre.localeCompare(r.alde_Nombre)}},{title:"Ciudad a la que pertenece",dataIndex:"ciud_Nombre",key:"ciud_Nombre",sorter:function(e,r){return e.ciud_Nombre.localeCompare(r.ciud_Nombre)}},{title:"Acciones",key:"operation",render:function(e){return(0,m.jsx)("div",{children:(0,m.jsxs)(Q.Z,{direction:"row",spacing:1,children:[(0,m.jsx)(k.Z,{"aria-controls":"menu-".concat(e.alde_Id),"aria-haspopup":"true",onClick:function(r){return t=r,n=e.alde_Id,void Ie((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,a.Z)({},n,t.currentTarget))}));var t,n},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,m.jsx)(w.Z,{children:"menu"}),children:"Opciones"}),(0,m.jsxs)(q.Z,{id:"menu-".concat(e.alde_Id),aldeasEdit:!0,anchorEl:we[e.alde_Id],keepMounted:!0,open:Boolean(we[e.alde_Id]),onClose:function(){return Me(e.alde_Id)},children:[(0,m.jsxs)(x.Z,{onClick:function(){return r=e,De(),ge(!0),Ke("id",r.alde_Id),Ke("alda_Nombre",r.alde_Nombre),Ke("ciudad",u.flatMap((function(e){return e.options})).find((function(e){return e.value===r.ciud_Id}))),void Me(r.alde_Id);var r},children:[(0,m.jsx)(w.Z,{children:"edit"}),"\u3164Editar"]}),(0,m.jsxs)(x.Z,{onClick:function(){return fe(r=e),Be(),void Me(r.alde_Id);var r},children:[(0,m.jsx)(w.Z,{children:"visibility"}),"\u3164Detalles"]})]})]})},e.alde_Id)}}],Ue={filename:"Aldeas",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"Nombre de la aldea"},{label:"Ciudad a la que pertenece"}].map((function(e){return e.label}))},Le=new d.ExportToCsv(Ue),Re=["key","alde_Nombre","ciud_Nombre"],Te=Fe.filter((function(e){if(""===y)return!0;for(var r=0,t=Object.entries(e);r<t.length;r++){var n=(0,l.Z)(t[r],2),a=n[0],i=n[1];if(Re.includes(a)){var o="number"===typeof i?i.toString():i.toString().toLowerCase(),c="number"===typeof y?y.toString():y.toLowerCase();if(o.includes(c))return!0}}return!1})).reverse(),He=(0,G.cI)({defaultaldeasValues:ne,mode:"all",resolver:(0,X.X)(ae)}),We=He.handleSubmit,Oe=(He.register,He.reset),qe=He.control,Ve=He.watch,Qe=He.formState,Ke=He.setValue,Xe=Qe.isValid,Ge=(Qe.dirtyFields,Qe.errors),Je=Ve(),Ye=(0,b.useState)([]),$e=(0,l.Z)(Ye,2),er=$e[0],rr=$e[1],tr=function(){var r=(0,o.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,rr([]),Pe([]),r.next=5,e.listar();case 5:return t=r.sent,Pe(t),t.length>0?rr(t):rr(null),r.t0=or,r.next=11,e.ExportData();case 11:r.t1=r.sent,(0,r.t0)(r.t1),r.next=18;break;case 15:r.prev=15,r.t2=r.catch(0),rr(null);case 18:case"end":return r.stop()}}),r,null,[[0,15]])})));return function(){return r.apply(this,arguments)}}(),nr=(0,b.useState)([]),ar=(0,l.Z)(nr,2),ir=ar[0],or=ar[1],lr=function(){var r=(0,o.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.crear(Je);case 3:"1"==(t=r.sent).data.data.messageStatus?((0,te.ys)(),g(""),tr(),De(),Oe(ne)):t.data.data.messageStatus.includes("UNIQUE")&&(0,te.d0)(),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),(0,te.bW)();case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}(),cr=function(){var r=(0,o.Z)((0,n.Z)().mark((function r(){var t;return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.editar(Je);case 3:"1"==(t=r.sent).data.data.messageStatus?((0,te.fn)(),g(Je.alda_Nombre),tr(),De(),Oe(ne)):t.data.data.messageStatus.includes("UNIQUE")&&(0,te.d0)(),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),(0,te.bW)();case 10:case"end":return r.stop()}}),r,null,[[0,7]])})));return function(){return r.apply(this,arguments)}}();(0,b.useEffect)((function(){!function(){h.apply(this,arguments)}(),tr()}),[]);var sr=function(){Ie((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,a.Z)({},"menu-exportar",null))}))};return(0,m.jsxs)(z.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,m.jsx)(L.Z,{component:"img",height:"200",image:"https://i.ibb.co/PQVXCCM/ALDEAS.png",alt:"Encabezado de la carta"}),(0,m.jsxs)(H.Z,{in:C,children:[(0,m.jsxs)(U.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,m.jsxs)(Q.Z,{direction:"row",spacing:1,children:[(0,m.jsx)(k.Z,{startIcon:(0,m.jsx)(w.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){De(),ge(!1)},children:"Nuevo"}),(0,m.jsxs)(k.Z,{startIcon:(0,m.jsx)(w.Z,{children:"upload"}),onClick:function(e){return r=e,t="menu-exportar",void Ie((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,a.Z)({},t,r.currentTarget))}));var r,t},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,m.jsx)(K.Z,{children:"Exportar"}),(0,m.jsx)(s.Z,{})]}),(0,m.jsx)("div",{children:(0,m.jsxs)(q.Z,{id:"menu-exportar",anchorEl:we["menu-exportar"],open:Boolean(we["menu-exportar"]),onClose:function(){return sr()},keepMounted:!0,children:[(0,m.jsxs)(x.Z,{onClick:function(){!function(){try{Le.generateCsv(ir)}catch(e){}}(),sr()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(c.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,m.jsx)(S,{data:ir,handleCloseExportar:sr}),(0,m.jsx)(Z,{data:ir,handleCloseExportar:sr})]})},"menu-exportar")]}),(0,m.jsxs)(Q.Z,{direction:"row",spacing:1,children:[(0,m.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,m.jsx)(I.Z,{sx:{minWidth:50},size:"small",children:(0,m.jsxs)(V.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:Ce,onChange:function(e){Ne(e.target.value)},children:[(0,m.jsx)(x.Z,{value:10,children:"10"}),(0,m.jsx)(x.Z,{value:25,children:"25"}),(0,m.jsx)(x.Z,{value:50,children:"50"})]})}),(0,m.jsx)(A.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:y,onChange:function(e){g(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,m.jsx)(E.Z,{position:"start",children:(0,m.jsx)(F.Z,{edge:"start",children:(0,m.jsx)(R.Z,{})})})}})]})]}),(0,m.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,m.jsx)(Y.Z,{columns:ze,dataSource:Te,size:"small",locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,$.Z)(er)},pagination:{pageSize:Ce,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,m.jsx)("form",{onSubmit:We((function(e){})),children:(0,m.jsx)(H.Z,{in:oe,children:(0,m.jsx)(U.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,m.jsxs)(O.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(O.ZP,{item:!0,xs:12,children:(0,m.jsx)(P.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,m.jsx)(D.Z,{label:ye?"Editar Aldea":"Agregar Aldea"})})}),(0,m.jsx)(O.ZP,{item:!0,xs:6,children:(0,m.jsxs)(I.Z,{fullWidth:!0,children:[(0,m.jsx)(W.Z,{error:!!Ge.ciudad,children:"Ciudad:"}),(0,m.jsx)(G.Qr,{render:function(e){var r,t=e.field;return(0,m.jsx)(B.Z,(0,i.Z)((0,i.Z)({},t),{},{id:"ciudad",isOptionEqualToValue:function(e,r){return e.value===(null===r||void 0===r?void 0:r.value)},options:u.flatMap((function(e){return e.options})),disableClearable:!0,groupBy:function(e){return e.provincia},getOptionLabel:function(e){return e.label},value:null!==(r=Je.ciudad)&&void 0!==r?r:null,onChange:function(e,r){Ke("ciudad",r)},renderInput:function(e){return(0,m.jsx)(A.Z,(0,i.Z)((0,i.Z)({},e),{},{error:!!Ge.ciudad}))}}))},name:"ciudad",error:!!Ge.ciudad,control:qe})]})}),(0,m.jsx)(O.ZP,{item:!0,xs:6,children:(0,m.jsxs)(I.Z,{fullWidth:!0,children:[(0,m.jsx)(W.Z,{error:!!Ge.alda_Nombre,children:"Nombre de la Aldea:"}),(0,m.jsx)(G.Qr,{render:function(e){var r=e.field;return(0,m.jsx)(A.Z,(0,i.Z)((0,i.Z)({},r),{},{id:"outlined-disabled",inputProps:{maxLength:150},error:!!Ge.alda_Nombre}))},name:"alda_Nombre",control:qe})]})}),(0,m.jsxs)(O.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,m.jsx)(k.Z,{type:"submit",startIcon:(0,m.jsx)(w.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Xe?ye?cr():lr():(0,te.KV)()},children:"Guardar"}),(0,m.jsx)(k.Z,{startIcon:(0,m.jsx)(w.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:De,children:"Cancelar"})]})]})})})}),(0,m.jsx)(H.Z,{in:de,children:(0,m.jsx)(U.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-center"},children:(0,m.jsxs)(O.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(O.ZP,{item:!0,xs:12,style:{marginBottom:"30px"},children:(0,m.jsx)(P.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,m.jsx)(D.Z,{label:"Detalles de la aldea"})})}),(0,m.jsxs)(O.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:[(0,m.jsx)(T.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(M.Z,{htmlFor:"id",children:[(0,m.jsx)(K.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Id de la aldea:"}),(0,m.jsx)(K.Z,{children:he.alde_Id})]})}),(0,m.jsx)(T.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(M.Z,{htmlFor:"descripcion",children:[(0,m.jsx)(K.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre de la Aldea:"}),(0,m.jsx)(K.Z,{children:he.alde_Nombre})]})})]}),(0,m.jsxs)(O.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:[(0,m.jsx)(T.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(M.Z,{htmlFor:"descripcion",children:[(0,m.jsx)(K.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Provincia:"}),(0,m.jsx)(K.Z,{children:he.pvin_Nombre})]})}),(0,m.jsx)(T.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(M.Z,{htmlFor:"descripcion",children:[(0,m.jsx)(K.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Ciudad:"}),(0,m.jsx)(K.Z,{children:he.ciud_Nombre})]})})]}),(0,m.jsx)(O.ZP,{item:!0,xs:12,children:(0,m.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsxs)("th",{style:ee.Z.tableHeaderStyle,children:[(0,m.jsx)(w.Z,{style:ee.Z.iconStyle,children:"edit"}),"Acci\xf3n"]}),(0,m.jsxs)("th",{style:ee.Z.tableHeaderStyle,children:[(0,m.jsx)(w.Z,{style:ee.Z.iconStyle,children:"person"}),"Usuario"]}),(0,m.jsxs)("th",{style:ee.Z.tableHeaderStyle,children:[(0,m.jsx)(w.Z,{style:ee.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,m.jsxs)("tbody",{children:[(0,m.jsxs)("tr",{style:ee.Z.tableRowStyle,children:[(0,m.jsx)("td",{style:ee.Z.tableCellStyle,children:(0,m.jsx)("strong",{children:"Creaci\xf3n"})}),(0,m.jsx)("td",{style:ee.Z.tableCellStyle,children:he.usuarioCreacionNombre}),(0,m.jsx)("td",{style:ee.Z.tableCellStyle,children:he.alde_FechaCreacion?new Date(he.alde_FechaCreacion).toLocaleString():""})]}),(0,m.jsxs)("tr",{style:ee.Z.tableRowStyle,children:[(0,m.jsx)("td",{style:ee.Z.tableCellStyle,children:(0,m.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,m.jsx)("td",{style:ee.Z.tableCellStyle,children:he.usuarioModificadorNombre}),(0,m.jsx)("td",{style:ee.Z.tableCellStyle,children:he.alde_FechaModificacion?new Date(he.alde_FechaModificacion).toLocaleString():""})]})]})]})}),(0,m.jsx)("br",{}),(0,m.jsx)(O.ZP,{item:!0,xs:12,children:(0,m.jsxs)("div",{className:"card-footer",children:[(0,m.jsx)(k.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:Be,startIcon:(0,m.jsx)(w.Z,{children:"arrow_back"}),children:"Regresar"}),(0,m.jsx)("br",{})]})})]})})})]})}},89145:function(e,r,t){t(47313);var n=t(85281),a=t(53191),i=t(46417);r.Z=function(e){var r=(0,i.jsxs)(a.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,i.jsx)(a.Z,{item:!0,xs:12,children:(0,i.jsx)(n.Z,{style:{color:"#634a9e"}})}),(0,i.jsx)(a.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:r}}}]);