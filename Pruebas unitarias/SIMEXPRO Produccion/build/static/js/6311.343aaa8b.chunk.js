"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[6311],{76311:function(e,r,t){t.r(r),t.d(r,{default:function(){return ue}});var n=t(74165),a=t(4942),i=t(1413),o=t(15861),s=t(29439),c=t(57983),l=t(35898),d=t(24193),u=t(71263),p=t(82047),x=t(51405),h=t(73428),f=t(16957),Z=t(65033),m=t(93405),j=t(9019),g=t(61113),y=t(1550),v=t(88797),b=t(24631),C=t(41727),_=t(47131),k=t(19536),S=t(66212),w=t(5178),I=t(25298),D=t(94469),E=t(33604),P=t(96467),F=t(97762),A=t(4117),N=t(9506),R=t(15103),M=t(47313),T=t(62563),B=t(75627),U=t(3463),z=t(28155),H=(t(77453),t(89145)),W=t(88477),L=t(31881),O=t.n(L),V=t(9098);var q=function(){var e={XApiKey:V.Z.extraerToken()},r=O().create({baseURL:"https://practicaacademia.somee.com/api/Areas/",headers:e}),t=JSON.parse(localStorage.getItem("user"));function a(){return(a=(0,o.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,a=t.data.data.map((function(e,r){return{key:r+1,tipa_Id:e.tipa_Id,tipa_area:e.tipa_area,proc_Id:e.proc_Id,proc_Descripcion:e.proc_Descripcion,usua_UsuarioCreacion:e.usua_UsuarioCreacion,tipa_FechaCreacion:e.tipa_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,tipa_FechaModificacion:e.tipa_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,tipa_FechaEliminacion:e.tipa_FechaEliminacion,tipa_Estado:e.tipa_Estado,usarioCreacion:e.usarioCreacion,usuarioModificacion:e.usuarioModificacion,usuarioEliminacion:e.usuarioEliminacion}})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function i(){return(i=(0,o.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return t=e.sent,a=t.data.data.map((function(e,r){return{key:r+1,tipa_area:e.tipa_area,proc_Descripcion:e.proc_Descripcion}})),e.abrupt("return",a);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function s(){return(s=(0,o.Z)((0,n.Z)().mark((function e(a){var i,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={tipa_area:a.area.trim().replace(/\s+/g," "),proc_Id:a.proceso.value,usua_UsuarioCreacion:t.uuid,tipa_FechaCreacion:V.Z.formatFechaHora(new Date)},e.next=4,r.post("Insertar",i);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,o.Z)((0,n.Z)().mark((function e(a){var i,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={tipa_Id:a.id,tipa_area:a.area.trim().replace(/\s+/g," "),proc_Id:a.proceso.value,usua_UsuarioModificacion:t.uuid,tipa_FechaModificacion:V.Z.formatFechaHora(new Date)},e.next=4,r.post("Editar",i);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function l(){return(l=(0,o.Z)((0,n.Z)().mark((function e(a){var i,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={tipa_Id:a.id,usua_UsuarioEliminacion:t.uuid,tipa_FechaEliminacion:V.Z.formatFechaHora(new Date)},e.next=4,r.post("Eliminar",i);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return a.apply(this,arguments)},crear:function(e){return s.apply(this,arguments)},editar:function(e){return c.apply(this,arguments)},eliminar:function(e){return l.apply(this,arguments)},ExportData:function(){return i.apply(this,arguments)}}},Q=t(68673),K=t(280),G=t(66106),J=t(40894),X=(t(88282),t(75265)),Y=t(93433),$=t(66244),ee=t(78925),re=t(48737),te=t(46417);var ne=function(e){var r=e.data,t=e.handleCloseExportar;return(0,te.jsxs)(x.Z,{onClick:function(){!function(){var e=r.map((function(e){return[e.key,e.tipa_area,e.proc_Descripcion]})),t=re.P6.aoa_to_sheet([["No.","Nombre del \xc1rea","Nombre del Proceso"]].concat((0,Y.Z)(e))),n=re.P6.book_new();re.P6.book_append_sheet(n,t,"Sheet1");var a=re.cW(n,{bookType:"xlsx",type:"array"}),i=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,ee.saveAs)(i,"Areas.xlsx")}(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,te.jsx)($.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},ae=t(76278),ie=t(39284),oe=t.n(ie),se=t(11593);oe().vfs=se.I.vfs;var ce=function(e){var r=e.data,t=e.handleCloseExportar,a=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var t,a,i,o,s,c,l;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="A4",a=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",i=V.Z.formatFechaHora(new Date),o=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,O().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:s=e.sent,c=s.data,(l=new FileReader).onload=function(){var e={content:[{image:l.result,margin:[-40,-40],width:600,height:45},{text:"\xc1reas",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,r,n,i){return e.y+e.height>t[1]-a[3]},defaultStyle:{fontSize:12},footer:function(e,r){return{columns:[{text:"Generado por: ".concat(o.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(r),style:"footer"},{text:"Fecha: ".concat(i.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["auto","*","*"],body:[[{text:"No.",style:"tableHeader"},{text:"Nombre del \xc1rea",style:"tableHeader"},{text:"Nombre del Proceso",style:"tableHeader"}]].concat((0,Y.Z)(r.map((function(e){return[e.key,e.tipa_area,e.proc_Descripcion]})))),alignment:"center",margin:[0,0,0,0]}}),oe().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},l.readAsDataURL(c),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,te.jsx)("div",{children:(0,te.jsx)("div",{children:(0,te.jsxs)(x.Z,{onClick:function(){a(),t()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,te.jsx)(ae.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})})},le={id:"",proceso:null,area:""},de=U.Ry().shape({id:U.Z_(),proceso:U.Ry().required(""),area:U.Z_().trim().required("")});var ue=function(){var e=(0,M.useState)([]),r=(0,s.Z)(e,2),t=r[0],U=r[1],L=(0,Q.Z)(),O=q(),V=(0,M.useState)([]),Y=(0,s.Z)(V,2),$=Y[0],ee=Y[1];function re(){return(re=(0,o.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=ee,e.next=3,L.Procesos();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ae={filename:"Areas",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"Nombre del \xc1rea"},{label:"Nombre del Proceso"}].map((function(e){return e.label}))},ie=new J.ExportToCsv(ae),oe=(0,M.useState)(""),se=(0,s.Z)(oe,2),ue=se[0],pe=se[1],xe=(0,M.useState)(!0),he=(0,s.Z)(xe,2),fe=he[0],Ze=he[1],me=(0,M.useState)(!1),je=(0,s.Z)(me,2),ge=je[0],ye=je[1],ve=(0,M.useState)(!1),be=(0,s.Z)(ve,2),Ce=be[0],_e=be[1],ke=(0,M.useState)({}),Se=(0,s.Z)(ke,2),we=Se[0],Ie=Se[1],De=(0,M.useState)(!1),Ee=(0,s.Z)(De,2),Pe=Ee[0],Fe=Ee[1],Ae=(0,M.useState)(!1),Ne=(0,s.Z)(Ae,2),Re=Ne[0],Me=Ne[1],Te=M.useState(10),Be=(0,s.Z)(Te,2),Ue=Be[0],ze=Be[1],He=(0,M.useState)({}),We=(0,s.Z)(He,2),Le=We[0],Oe=We[1],Ve=(0,M.useState)([]),qe=(0,s.Z)(Ve,2),Qe=qe[0],Ke=qe[1],Ge=function(){Ze(!fe),ye(!ge),ar(le)},Je=function(){Fe(!Pe)},Xe=function(){Ze(!fe),_e(!Ce)},Ye=function(e){Oe((function(r){return(0,i.Z)((0,i.Z)({},r),{},(0,a.Z)({},e,null))}))},$e=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,r){return e.key-r.key}},{title:"Nombre del \xc1rea",dataIndex:"tipa_area",key:"tipa_area",sorter:function(e,r){return e.tipa_area.localeCompare(r.tipa_area)}},{title:"Nombre del Proceso",dataIndex:"proc_Descripcion",key:"proc_Descripcion",sorter:function(e,r){return e.proc_Descripcion.localeCompare(r.proc_Descripcion)}},{title:"Acciones",key:"operation",render:function(e){return(0,te.jsx)("div",{children:(0,te.jsxs)(l.Z,{direction:"row",spacing:1,children:[(0,te.jsx)(d.Z,{"aria-controls":"menu-".concat(e.tipa_Id),"aria-haspopup":"true",onClick:function(r){return t=r,n=e.tipa_Id,void Oe((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,a.Z)({},n,t.currentTarget))}));var t,n},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,te.jsx)(u.Z,{children:"menu"}),children:"Opciones"}),(0,te.jsxs)(p.Z,{id:"menu-".concat(e.tipa_Id),anchorEl:Le[e.tipa_Id],keepMounted:!0,open:Boolean(Le[e.tipa_Id]),onClose:function(){return Ye(e.tipa_Id)},children:[(0,te.jsxs)(x.Z,{onClick:function(){return r=e,Ge(),Me(!0),cr("id",r.tipa_Id),cr("area",r.tipa_area),cr("proceso",$.find((function(e){return e.value===r.proc_Id}))),void Ye(r.tipa_Id);var r},children:[(0,te.jsx)(u.Z,{children:"edit"}),"\u3164Editar"]}),(0,te.jsxs)(x.Z,{onClick:function(){return Ie(r=e),Xe(),void Ye(r.tipa_Id);var r},children:[(0,te.jsx)(u.Z,{children:"visibility"}),"\u3164Detalles"]}),(0,te.jsxs)(x.Z,{onClick:function(){return cr("id",(r=e).tipa_Id),Je(),void Ye(r.tipa_Id);var r},children:[(0,te.jsx)(u.Z,{children:"delete"}),"\u3164Eliminar"]})]})]})},e.tipa_Id)}}],er=["key","tipa_area","proc_Descripcion"],rr=Qe.filter((function(e){if(""===ue)return!0;for(var r=0,t=Object.entries(e);r<t.length;r++){var n=(0,s.Z)(t[r],2),a=n[0],i=n[1];if(er.includes(a)){var o="number"===typeof i?i.toString():i.toString().toLowerCase(),c="number"===typeof ue?ue.toString():ue.toLowerCase();if(o.includes(c))return!0}}return!1})).reverse(),tr=(0,B.cI)({defaultAreaValues:le,mode:"all",resolver:(0,T.X)(de)}),nr=tr.handleSubmit,ar=(tr.register,tr.reset),ir=tr.control,or=tr.watch,sr=tr.formState,cr=tr.setValue,lr=sr.isValid,dr=(sr.dirtyFields,sr.errors),ur=or(),pr=(0,M.useState)([]),xr=(0,s.Z)(pr,2),hr=xr[0],fr=xr[1],Zr=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,fr([]),Ke([]),e.next=5,O.listar();case 5:return r=e.sent,Ke(r),r.length>0?fr(r):fr(null),e.t0=U,e.next=11,O.ExportData();case 11:e.t1=e.sent,(0,e.t0)(e.t1),e.next=18;break;case 15:e.prev=15,e.t2=e.catch(0),fr(null);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}(),mr=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.crear(ur);case 3:"1"==(r=e.sent).data.data.messageStatus?((0,X.ys)(),Zr(),Ge(),ar(le)):r.data.data.messageStatus.includes("UNIQUE")&&(0,X.d0)(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,X.bW)();case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),jr=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.editar(ur);case 3:"1"==(r=e.sent).data.data.messageStatus?((0,X.fn)(),Zr(),Ge(),ar(le)):r.data.data.messageStatus.includes("UNIQUE")&&(0,X.d0)(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,X.bW)();case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),gr=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.eliminar(ur);case 3:"1"==(r=e.sent).data.data.messageStatus?((0,X.Pt)(),Zr(),Je(),ar(le)):r.data.data.messageStatus.includes("0")&&((0,X.tb)(),Je()),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),(0,X.bW)(),Je();case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();(0,M.useEffect)((function(){!function(){re.apply(this,arguments)}(),Zr()}),[]);var yr=function(){Oe((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,a.Z)({},"menu-exportar",null))}))};return(0,te.jsxs)(h.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,te.jsx)(f.Z,{component:"img",height:"200",image:"https://i.ibb.co/44NvHn3/REAS.png",alt:"Encabezado de la carta"}),(0,te.jsxs)(Z.Z,{in:fe,children:[(0,te.jsx)(m.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,te.jsxs)(j.ZP,{container:!0,spacing:1,children:[(0,te.jsx)(j.ZP,{item:!0,xs:12,sm:12,md:6,display:"flex",sx:{justifyContent:{xs:"center",sm:"center",md:"start"}},children:(0,te.jsxs)(l.Z,{direction:"row",spacing:1,children:[(0,te.jsx)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){Ge(),Me(!1)},children:"Nuevo"}),(0,te.jsxs)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"upload"}),onClick:function(e){return r=e,t="menu-exportar",void Oe((function(e){return(0,i.Z)((0,i.Z)({},e),{},(0,a.Z)({},t,r.currentTarget))}));var r,t},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,te.jsx)(g.Z,{children:"Exportar"}),(0,te.jsx)(G.Z,{})]}),(0,te.jsx)("div",{children:(0,te.jsxs)(p.Z,{id:"menu-exportar",anchorEl:Le["menu-exportar"],open:Boolean(Le["menu-exportar"]),onClose:function(){return yr()},keepMounted:!0,children:[(0,te.jsxs)(x.Z,{onClick:function(){!function(){try{ie.generateCsv(t)}catch(e){}}(),yr()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,te.jsx)(K.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,te.jsx)(ce,{data:t,handleCloseExportar:yr}),(0,te.jsx)(ne,{data:t,handleCloseExportar:yr})]})},"menu-exportar")]})}),(0,te.jsxs)(j.ZP,{item:!0,xs:12,sm:6,md:3,display:"flex",sx:{justifyContent:{xs:"center",sm:"end",md:"end"}},children:[(0,te.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,te.jsx)(y.Z,{sx:{minWidth:50},size:"small",children:(0,te.jsxs)(v.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:Ue,onChange:function(e){ze(e.target.value)},children:[(0,te.jsx)(x.Z,{value:10,children:"10"}),(0,te.jsx)(x.Z,{value:25,children:"25"}),(0,te.jsx)(x.Z,{value:50,children:"50"})]})})]}),(0,te.jsx)(j.ZP,{item:!0,xs:12,sm:6,md:3,display:"flex",sx:{justifyContent:{xs:"center",sm:"start",md:"center"}},children:(0,te.jsx)(b.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:ue,onChange:function(e){pe(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,te.jsx)(C.Z,{position:"start",children:(0,te.jsx)(_.Z,{edge:"start",children:(0,te.jsx)(c.Z,{})})})}})})]})}),(0,te.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,te.jsx)(z.Z,{columns:$e,dataSource:rr,size:"small",scroll:{x:!0},locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,H.Z)(hr)},pagination:{pageSize:Ue,showSizeChanger:!1,className:"custom-pagination"}})})]}),(0,te.jsx)("form",{onSubmit:nr((function(e){})),children:(0,te.jsx)(Z.Z,{in:ge,children:(0,te.jsx)(m.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,te.jsxs)(j.ZP,{container:!0,spacing:3,children:[(0,te.jsx)(j.ZP,{item:!0,xs:12,children:(0,te.jsx)(k.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,te.jsx)(S.Z,{label:Re?"Editar \xe1rea":"Agregar \xe1rea"})})}),(0,te.jsx)(j.ZP,{item:!0,xs:6,children:(0,te.jsxs)(y.Z,{fullWidth:!0,children:[(0,te.jsx)(w.Z,{error:!!dr.area,children:"Nombre del \xe1rea"}),(0,te.jsx)(B.Qr,{render:function(e){var r=e.field;return(0,te.jsx)(b.Z,(0,i.Z)((0,i.Z)({},r),{},{id:"outlined-disabled",inputProps:{maxLength:200},error:!!dr.area}))},name:"area",control:ir})]})}),(0,te.jsx)(j.ZP,{item:!0,xs:6,children:(0,te.jsxs)(y.Z,{fullWidth:!0,children:[(0,te.jsx)(w.Z,{error:!!dr.proceso,children:"Nombre del proceso"}),(0,te.jsx)(B.Qr,{render:function(e){var r,t=e.field;return(0,te.jsx)(I.Z,(0,i.Z)((0,i.Z)({},t),{},{id:"proceso",isOptionEqualToValue:function(e,r){return e.value===(null===r||void 0===r?void 0:r.value)},options:$,disableClearable:!0,value:null!==(r=ur.proceso)&&void 0!==r?r:null,onChange:function(e,r){cr("proceso",r)},renderInput:function(e){return(0,te.jsx)(b.Z,(0,i.Z)((0,i.Z)({},e),{},{error:!!dr.proceso}))}}))},name:"proceso",error:!!dr.proceso,control:ir})]})}),(0,te.jsxs)(j.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,te.jsx)(d.Z,{type:"submit",startIcon:(0,te.jsx)(u.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){lr?Re?jr():mr():(0,X.KV)("Completa todos los campos")},children:"Guardar"}),(0,te.jsx)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Ge,children:"Cancelar"})]})]})})})}),(0,te.jsxs)(D.Z,{open:Pe,fullWidth:"md",onClose:Je,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,te.jsx)(E.Z,{id:"alert-dialog-title",children:"Confirmaci\xf3n de Eliminaci\xf3n"}),(0,te.jsx)(P.Z,{children:(0,te.jsx)(F.Z,{id:"alert-dialog-description",children:"\xbfEst\xe1 seguro(a) que desea eliminar este registro?"})}),(0,te.jsx)(A.Z,{children:(0,te.jsxs)(j.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,te.jsx)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"checked"}),variant:"contained",color:"error",style:{borderRadius:"10px",marginRight:"10px"},onClick:gr,children:"Eliminar"}),(0,te.jsx)(d.Z,{startIcon:(0,te.jsx)(u.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Je,children:"Cancelar"})]})})]}),(0,te.jsx)(Z.Z,{in:Ce,children:(0,te.jsx)(m.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-center"},children:(0,te.jsxs)(j.ZP,{container:!0,spacing:3,children:[(0,te.jsx)(j.ZP,{item:!0,xs:12,children:(0,te.jsx)(k.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,te.jsx)(S.Z,{label:"Detalles del \xe1rea"})})}),(0,te.jsx)(j.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,te.jsx)(N.Z,{sx:{textAlign:"center"},children:(0,te.jsxs)(R.Z,{htmlFor:"id",children:[(0,te.jsx)(g.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"ID del \xe1rea:"}),(0,te.jsx)(g.Z,{children:we.tipa_Id})]})})}),(0,te.jsx)(j.ZP,{item:!0,xs:12,md:6,display:"flex",justifyContent:"center",alignContent:"center",children:(0,te.jsx)(N.Z,{sx:{textAlign:"center"},children:(0,te.jsxs)(R.Z,{htmlFor:"descripcion",children:[(0,te.jsx)(g.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre del \xe1rea:"}),(0,te.jsx)(g.Z,{children:we.tipa_area})]})})}),(0,te.jsx)(j.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginTop:"10px"},children:(0,te.jsx)(N.Z,{sx:{flex:1,textAlign:"center"},children:(0,te.jsxs)(R.Z,{htmlFor:"descripcion",children:[(0,te.jsx)(g.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Proceso del \xe1rea:"}),(0,te.jsx)(g.Z,{children:we.proc_Descripcion})]})})}),(0,te.jsx)(j.ZP,{item:!0,xs:12,children:(0,te.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,te.jsx)("thead",{children:(0,te.jsxs)("tr",{children:[(0,te.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,te.jsx)(u.Z,{style:W.Z.iconStyle,children:"edit"}),"Acci\xf3n"]}),(0,te.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,te.jsx)(u.Z,{style:W.Z.iconStyle,children:"person"}),"Usuario"]}),(0,te.jsxs)("th",{style:W.Z.tableHeaderStyle,children:[(0,te.jsx)(u.Z,{style:W.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,te.jsxs)("tbody",{children:[(0,te.jsxs)("tr",{style:W.Z.tableRowStyle,children:[(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:(0,te.jsx)("strong",{children:"Creaci\xf3n"})}),(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:we.usarioCreacion}),(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:we.tipa_FechaCreacion?new Date(we.tipa_FechaCreacion).toLocaleString():""})]}),(0,te.jsxs)("tr",{style:W.Z.tableRowStyle,children:[(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:(0,te.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:we.usuarioModificacion}),(0,te.jsx)("td",{style:W.Z.tableCellStyle,children:we.tipa_FechaModificacion?new Date(we.tipa_FechaModificacion).toLocaleString():""})]})]})]})}),(0,te.jsx)("br",{}),(0,te.jsx)(j.ZP,{item:!0,xs:12,children:(0,te.jsx)("div",{className:"card-footer",children:(0,te.jsx)(d.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:Xe,startIcon:(0,te.jsx)(u.Z,{children:"arrow_back"}),children:"Regresar"})})})]})})})]})}},89145:function(e,r,t){t(47313);var n=t(85281),a=t(53191),i=t(46417);r.Z=function(e){var r=(0,i.jsxs)(a.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,i.jsx)(a.Z,{item:!0,xs:12,children:(0,i.jsx)(n.Z,{style:{color:"#634a9e"}})}),(0,i.jsx)(a.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:r}},97762:function(e,r,t){t.d(r,{Z:function(){return f}});var n=t(63366),a=t(87462),i=t(47313),o=t(21921),s=t(88564),c=t(77342),l=t(61113),d=t(32298);function u(e){return(0,d.Z)("MuiDialogContentText",e)}(0,t(77430).Z)("MuiDialogContentText",["root"]);var p=t(46417),x=["children"],h=(0,s.ZP)(l.Z,{shouldForwardProp:function(e){return(0,s.FO)(e)||"classes"===e},name:"MuiDialogContentText",slot:"Root",overridesResolver:function(e,r){return r.root}})({}),f=i.forwardRef((function(e,r){var t=(0,c.Z)({props:e,name:"MuiDialogContentText"}),i=(0,n.Z)(t,x),s=function(e){var r=e.classes,t=(0,o.Z)({root:["root"]},u,r);return(0,a.Z)({},r,t)}(i);return(0,p.jsx)(h,(0,a.Z)({component:"p",variant:"body1",color:"text.secondary",ref:r,ownerState:i},t,{classes:s}))}))},33604:function(e,r,t){var n=t(87462),a=t(63366),i=t(47313),o=t(83061),s=t(21921),c=t(61113),l=t(88564),d=t(77342),u=t(93174),p=t(63909),x=t(46417),h=["className","id"],f=(0,l.ZP)(c.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,r){return r.root}})({padding:"16px 24px",flex:"0 0 auto"}),Z=i.forwardRef((function(e,r){var t=(0,d.Z)({props:e,name:"MuiDialogTitle"}),c=t.className,l=t.id,Z=(0,a.Z)(t,h),m=t,j=function(e){var r=e.classes;return(0,s.Z)({root:["root"]},u.a,r)}(m),g=i.useContext(p.Z).titleId,y=void 0===g?l:g;return(0,x.jsx)(f,(0,n.Z)({component:"h2",className:(0,o.default)(j.root,c),ownerState:m,ref:r,variant:"h6",id:y},Z))}));r.Z=Z}}]);