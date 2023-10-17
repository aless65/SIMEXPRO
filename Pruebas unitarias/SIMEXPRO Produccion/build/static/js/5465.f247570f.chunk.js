"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[5465],{25465:function(e,r,n){n.r(r),n.d(r,{default:function(){return ue}});var t=n(74165),o=n(4942),a=n(1413),i=n(15861),c=n(29439),l=n(280),s=n(66106),u=n(40894),d=n(93433),p=n(47313),x=n(48737),h=n(78925),f=n(51405),Z=n(66244),m=n(46417);var v=function(e){var r=e.data,n=e.handleCloseExportar;return(0,m.jsxs)(f.Z,{onClick:function(){!function(){var e=r.map((function(e){return[e.key,e.colo_Nombre,e.ciud_Nombre]})),n=x.P6.aoa_to_sheet([["No.","Nombre de la colonia","Ciudad a la que pertenece"]].concat((0,d.Z)(e))),t=x.P6.book_new();x.P6.book_append_sheet(t,n,"Sheet1");var o=x.cW(t,{bookType:"xlsx",type:"array"}),a=new Blob([o],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});(0,h.saveAs)(a,"Colonias.xlsx")}(),n()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(Z.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo Excel"]})},j=n(39284),b=n.n(j),g=n(11593),y=n(31881),C=n.n(y),_=n(76278),k=n(9098);b().vfs=g.I.vfs;var w=function(e){var r=e.data,n=e.handleCloseExportar,o=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(){var n,o,a,i,c,l,s;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="A4",o=[40,60,40,60],"https://i.ibb.co/MPn5hrr/Captura.png",a=k.Z.formatFechaHora(new Date),i=JSON.parse(localStorage.getItem("user")),e.prev=5,e.next=8,C().get("https://i.ibb.co/MPn5hrr/Captura.png",{responseType:"blob"});case 8:c=e.sent,l=c.data,(s=new FileReader).onload=function(){var e={content:[{image:s.result,margin:[-40,-40],width:600,height:45},{text:"Colonias",style:"header",margin:[0,40,0,20]}],styles:{header:{fontSize:26,bold:!0,color:"black",alignment:"center",underline:!0},tableHeader:{fontSize:14,bold:!0,color:"black",alignment:"center",fillColor:"#E8D8FF"},footer:{fontSize:10,alignment:"center"}},pageBreakBefore:function(e,r,t,a){return e.y+e.height>n[1]-o[3]},defaultStyle:{fontSize:12},footer:function(e,r){return{columns:[{text:"Generado por: ".concat(i.data.displayName),style:"footer"},{text:"P\xe1gina ".concat(e.toString()," de ").concat(r),style:"footer"},{text:"Fecha: ".concat(a.toString().slice(0,10)),style:"footer"}],margin:[0,20]}}};e.content.push({table:{widths:["auto","*","*"],body:[[{text:"No.",style:"tableHeader"},{text:"Nombre de la colonia",style:"tableHeader"},{text:"Ciudad a la que pertenece",style:"tableHeader"}]].concat((0,d.Z)(r.map((function(e){return[e.key,e.colo_Nombre,e.ciud_Nombre]})))),alignment:"center"}}),b().createPdf(e).getDataUrl((function(e){window.open().document.write('<iframe src="'.concat(e,'" width="100%" height="100%"></iframe>'))}))},s.readAsDataURL(l),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(5);case 17:case"end":return e.stop()}}),e,null,[[5,15]])})));return function(){return e.apply(this,arguments)}}();return(0,m.jsx)("div",{children:(0,m.jsxs)(f.Z,{onClick:function(){o(),n()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(_.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo PDF"]})})},I=n(57983),S=n(24193),N=n(71263),P=n(1550),E=n(24631),A=n(41727),F=n(47131),R=n(19536),D=n(66212),B=n(5178),T=n(25298),M=n(9506),W=n(15103),q=n(73428),z=n(93405),U=n(16957),L=n(65033),O=n(94469),V=n(4117),H=n(96467),Q=n(97762),K=n(33604),G=n(9019),J=n(88797),X=n(35898),Y=n(61113),$=n(62563),ee=n(75627),re=n(3463),ne=n(82047),te=n(28155),oe=n(31387);n(88282);var ae=function(){var e={XApiKey:k.Z.extraerToken()},r=C().create({baseURL:"https://practicaacademia.somee.com/api/Colonias/",headers:e}),n=JSON.parse(localStorage.getItem("user"));function o(){return(o=(0,i.Z)((0,t.Z)().mark((function e(){var n,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return n=e.sent,o=n.data.data.map((function(e,r){return{key:r+1,colo_Id:e.colo_Id,colo_Nombre:e.colo_Nombre,alde_Id:e.alde_Id,alde_Nombre:e.alde_Nombre,ciud_Id:e.ciud_Id,ciud_Nombre:e.ciud_Nombre,pvin_Id:e.pvin_Id,pvin_Nombre:e.pvin_Nombre,pais_Id:e.pais_Id,pais_Codigo:e.pais_Codigo,pais_Nombre:e.pais_Nombre,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usuarioCreacionNombre:e.usuarioCreacionNombre,usuarioModificacionNombre:e.usuarioModificacionNombre,colo_FechaCreacion:e.colo_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,colo_FechaModificacion:e.colo_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,colo_FechaEliminacion:e.colo_FechaEliminacion,colo_Estado:e.colo_Estado}})),e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function a(){return(a=(0,i.Z)((0,t.Z)().mark((function e(){var n,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.get("Listar");case 3:return n=e.sent,o=n.data.data.map((function(e,r){return{key:r+1,colo_Nombre:e.colo_Nombre,ciud_Nombre:e.ciud_Nombre}})),e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,i.Z)((0,t.Z)().mark((function e(o){var a,i;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={colo_Nombre:o.colonia.trim(),ciud_Id:o.ciudad.value,usua_UsuarioCreacion:n.uuid,colo_FechaCreacion:k.Z.formatFechaHora(new Date)},e.next=4,r.post("Insertar",a);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function l(){return(l=(0,i.Z)((0,t.Z)().mark((function e(o){var a,i;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={colo_Id:o.id,colo_Nombre:o.colonia.trim(),ciud_Id:o.ciudad.value,usua_UsuarioModificacion:n.uuid,colo_FechaModificacion:k.Z.formatFechaHora(new Date)},e.next=4,r.post("Editar",a);case 4:return i=e.sent,e.abrupt("return",i);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return o.apply(this,arguments)},crear:function(e){return c.apply(this,arguments)},editar:function(e){return l.apply(this,arguments)},ExportData:function(){return a.apply(this,arguments)}}},ie=(n(77453),n(89145)),ce=n(88477),le=n(68673),se=n(75265);var ue=function(){var e=(0,le.Z)(),r=ae(),n=(0,p.useState)([]),d=(0,c.Z)(n,2),x=d[0],h=d[1],Z=(0,p.useState)(""),j=(0,c.Z)(Z,2),b=j[0],g=j[1],y=(0,p.useState)(!0),C=(0,c.Z)(y,2),_=C[0],k=C[1],ue=(0,p.useState)(!1),de=(0,c.Z)(ue,2),pe=de[0],xe=de[1],he=(0,p.useState)(!1),fe=(0,c.Z)(he,2),Ze=fe[0],me=fe[1],ve=(0,p.useState)(!1),je=(0,c.Z)(ve,2),be=je[0],ge=je[1],ye=(0,p.useState)(!1),Ce=(0,c.Z)(ye,2),_e=Ce[0],ke=Ce[1],we=(0,p.useState)([]),Ie=(0,c.Z)(we,2),Se=Ie[0],Ne=Ie[1],Pe=(0,p.useState)([]),Ee=(0,c.Z)(Pe,2),Ae=Ee[0],Fe=Ee[1],Re=(0,p.useState)([]),De=(0,c.Z)(Re,2),Be=De[0],Te=De[1],Me=(0,p.useState)([]),We=(0,c.Z)(Me,2),qe=We[0],ze=We[1],Ue=(0,p.useState)(!1),Le=(0,c.Z)(Ue,2),Oe=Le[0],Ve=Le[1],He=(0,p.useState)({}),Qe=(0,c.Z)(He,2),Ke=Qe[0],Ge=Qe[1];function Je(){return(Je=(0,i.Z)((0,t.Z)().mark((function r(){return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.t0=Te,r.next=3,e.paises();case 3:r.t1=r.sent,(0,r.t0)(r.t1);case 5:case"end":return r.stop()}}),r)})))).apply(this,arguments)}function Xe(e){return Ye.apply(this,arguments)}function Ye(){return(Ye=(0,i.Z)((0,t.Z)().mark((function r(n){return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.t0=Fe,r.next=4,e.ProvinciasPorPais(n);case 4:r.t1=r.sent,(0,r.t0)(r.t1),r.next=10;break;case 8:r.prev=8,r.t2=r.catch(0);case 10:case"end":return r.stop()}}),r,null,[[0,8]])})))).apply(this,arguments)}function $e(e){return er.apply(this,arguments)}function er(){return(er=(0,i.Z)((0,t.Z)().mark((function r(n){return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.t0=ze,r.next=4,e.CiudadesPorProvincia(n);case 4:r.t1=r.sent,(0,r.t0)(r.t1),r.next=10;break;case 8:r.prev=8,r.t2=r.catch(0);case 10:case"end":return r.stop()}}),r,null,[[0,8]])})))).apply(this,arguments)}(0,p.useEffect)((function(){gr(),function(){Je.apply(this,arguments)}()}),[]);var rr=function(){ke(!_e)},nr=(0,p.useState)({}),tr=(0,c.Z)(nr,2),or=tr[0],ar=tr[1],ir=function(e){ar((function(r){return(0,a.Z)((0,a.Z)({},r),{},(0,o.Z)({},e,null))}))},cr=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ir(r.colo_Id),lr(),Ve(!0),Pr("id",r.colo_Id),Pr("colonia",r.colo_Nombre),Pr("pais",{value:r.pais_Id,label:r.pais_Codigo+" - "+r.pais_Nombre}),Xe(r.pais_Id),Pr("provincia",{value:r.pvin_Id,label:r.pvin_Nombre}),$e(r.pvin_Id),Pr("ciudad",{value:r.ciud_Id,label:r.ciud_Nombre});case 10:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),lr=function(){k(!_),me(!Ze),wr(yr)},sr=function(){k(!_),ge(!be)},ur=p.useState(10),dr=(0,c.Z)(ur,2),pr=dr[0],xr=dr[1],hr=[{title:"No.",dataIndex:"key",key:"key",sorter:function(e,r){return e.key-r.key}},{title:"Nombre de la colonia",dataIndex:"colo_Nombre",key:"colo_Nombre",sorter:function(e,r){return e.colo_Nombre.localeCompare(r.colo_Nombre)}},{title:"Ciudad a la que pertenece",dataIndex:"ciud_Nombre",key:"ciud_Nombre",sorter:function(e,r){return e.ciud_Nombre.localeCompare(r.ciud_Nombre)}},{title:"Acciones",key:"operation",render:function(e){return(0,m.jsx)("div",{children:(0,m.jsxs)(X.Z,{direction:"row",spacing:1,children:[(0,m.jsx)(S.Z,{"aria-controls":"menu-".concat(e.colo_Id),"aria-haspopup":"true",onClick:function(r){return n=r,t=e.colo_Id,void ar((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,o.Z)({},t,n.currentTarget))}));var n,t},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,m.jsx)(N.Z,{children:"menu"}),children:"Opciones"}),(0,m.jsxs)(ne.Z,{id:"menu-".concat(e.colo_Id),anchorEl:or[e.colo_Id],keepMounted:!0,open:Boolean(or[e.colo_Id]),onClose:function(){return ir(e.colo_Id)},children:[(0,m.jsxs)(f.Z,{onClick:function(){return cr(e)},children:[(0,m.jsx)(N.Z,{children:"edit"}),"\u3164Editar"]}),(0,m.jsxs)(f.Z,{onClick:function(){return Ge(r=e),sr(),void ir(r.colo_Id);var r},children:[(0,m.jsx)(N.Z,{children:"visibility"}),"\u3164Detalles"]})]})]})},e.colo_Id)}}],fr={filename:"Colonias",fieldSeparator:",",quoteStrings:'"',decimalSeparator:".",showLabels:!0,useBom:!0,useKeysAsHeaders:!1,headers:[{label:"No."},{label:"Nombre de la colonia"},{label:"Ciudad a la que pertenece"}].map((function(e){return e.label}))},Zr=new u.ExportToCsv(fr),mr=(0,p.useState)([]),vr=(0,c.Z)(mr,2),jr=vr[0],br=vr[1],gr=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(){var n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,br([]),Ne([]),e.next=5,r.listar();case 5:return n=e.sent,Ne(n),n.length>0?br(n):br(null),e.t0=h,e.next=11,r.ExportData();case 11:e.t1=e.sent,(0,e.t0)(e.t1),e.next=18;break;case 15:e.prev=15,e.t2=e.catch(0),br(null);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}(),yr={id:"",pais:null,provincia:null,ciudad:null,colonia:""},Cr=re.Ry().shape({id:re.Z_(),ciudad:re.Ry().required(""),colonia:re.Z_().trim().required(""),provincia:re.Ry().required(""),pais:re.Ry().required("")}),_r=(0,ee.cI)({defaultColoniasValues:yr,mode:"all",resolver:(0,$.X)(Cr)}),kr=_r.handleSubmit,wr=_r.reset,Ir=_r.control,Sr=_r.watch,Nr=_r.formState,Pr=_r.setValue,Er=Nr.isValid,Ar=(Nr.dirtyFields,Nr.errors),Fr=Sr(),Rr=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(){var n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.crear(Fr);case 3:"1"==(n=e.sent).data.data.messageStatus?((0,se.ys)(),g(""!=b?Fr.colonia:""),g(""),gr(),Tr(),wr(yr)):n.data.data.messageStatus.includes("UNIQUE")&&(0,se.KV)(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,se.bW)();case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),Dr=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(){var n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.editar(Fr);case 3:"1"==(n=e.sent).data.data.messageStatus?((0,se.fn)(),g(""!=b?Fr.colonia:""),gr(),Mr(),wr(yr)):n.data.data.messageStatus.includes("UNIQUE")&&(0,se.KV)(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),(0,se.bW)();case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),Br=function(){Er?Oe?Dr():Rr():(0,se.KV)()},Tr=function(){k(!_),xe(!pe),wr(yr)},Mr=function(){k(!_),me(!Ze),wr(yr)},Wr=["key","colo_Nombre","ciud_Nombre"],qr=Se.filter((function(e){if(""===b)return!0;for(var r=0,n=Object.entries(e);r<n.length;r++){var t=(0,c.Z)(n[r],2),o=t[0],a=t[1];if(Wr.includes(o)){var i="number"===typeof a?a.toString():a.toString().toLowerCase(),l="number"===typeof b?b.toString():b.toLowerCase();if(i.includes(l))return!0}}return!1})).reverse(),zr=function(){ar((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,o.Z)({},"menu-exportar",null))}))};return(0,m.jsxs)(q.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,m.jsx)(oe.Ix,{}),(0,m.jsx)(U.Z,{component:"img",height:"200",image:"https://i.ibb.co/RBmR7C6/COLONIAS.png",alt:"Encabezado de la carta"}),(0,m.jsx)(L.Z,{in:_,children:(0,m.jsxs)(z.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,m.jsxs)(X.Z,{direction:"row",spacing:1,children:[(0,m.jsx)(S.Z,{startIcon:(0,m.jsx)(N.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:function(){k(!_),xe(!pe),wr(yr),Ve(!1)},children:"Nuevo"}),(0,m.jsxs)(S.Z,{startIcon:(0,m.jsx)(N.Z,{children:"upload"}),onClick:function(e){return r=e,n="menu-exportar",void ar((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,o.Z)({},n,r.currentTarget))}));var r,n},sx:{backgroundColor:"#dcc25a",color:"white","&:hover":{backgroundColor:"#dcc25a"}},style:{borderRadius:"10px"},children:[(0,m.jsx)(Y.Z,{children:"Exportar"}),(0,m.jsx)(s.Z,{})]}),(0,m.jsx)("div",{children:(0,m.jsxs)(ne.Z,{id:"menu-exportar",anchorEl:or["menu-exportar"],open:Boolean(or["menu-exportar"]),onClose:function(){return zr()},keepMounted:!0,children:[(0,m.jsxs)(f.Z,{onClick:function(){!function(){try{Zr.generateCsv(x)}catch(e){}}(),zr()},style:{fontSize:"15px",marginTop:"5px",marginBottom:"5px"},children:[(0,m.jsx)(l.Z,{style:{fontSize:"20px"}}),"\xa0\xa0Archivo CSV"]}),(0,m.jsx)(w,{data:x,handleCloseExportar:zr}),(0,m.jsx)(v,{data:x,handleCloseExportar:zr})]})},"menu-exportar")]}),(0,m.jsxs)(X.Z,{direction:"row",spacing:1,children:[(0,m.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,m.jsx)(P.Z,{sx:{minWidth:50},size:"small",children:(0,m.jsxs)(J.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:pr,onChange:function(e){xr(e.target.value)},children:[(0,m.jsx)(f.Z,{value:10,children:"10"}),(0,m.jsx)(f.Z,{value:20,children:"20"}),(0,m.jsx)(f.Z,{value:30,children:"30"})]})}),(0,m.jsx)(E.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:b,onChange:function(e){g(e.target.value)},size:"small",variant:"outlined",InputProps:{startAdornment:(0,m.jsx)(A.Z,{position:"start",children:(0,m.jsx)(F.Z,{edge:"start",children:(0,m.jsx)(I.Z,{})})})}})]})]})}),(0,m.jsx)(L.Z,{in:_,children:(0,m.jsx)("div",{className:"center",style:{width:"95%",margin:"auto"},children:(0,m.jsx)(te.Z,{columns:hr,dataSource:qr,size:"small",locale:{triggerDesc:"Ordenar descendente",triggerAsc:"Ordenar ascendente",cancelSort:"Cancelar",emptyText:(0,ie.Z)(jr)},pagination:{pageSize:pr,showSizeChanger:!1,className:"custom-pagination"}})})}),(0,m.jsx)(L.Z,{in:pe,children:(0,m.jsx)("form",{onSubmit:kr((function(e){})),children:(0,m.jsx)(z.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,m.jsxs)(G.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(G.ZP,{item:!0,xs:12,children:(0,m.jsx)(R.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,m.jsx)(D.Z,{label:Oe?"Editar colonia":"Agregar colonia"})})}),(0,m.jsx)(G.ZP,{item:!0,xs:6,children:(0,m.jsxs)(P.Z,{fullWidth:!0,children:[(0,m.jsx)(B.Z,{error:!!Ar.pais,children:"Pa\xeds:"}),(0,m.jsx)(ee.Qr,{render:function(e){var r,n=e.field;return(0,m.jsx)(T.Z,(0,a.Z)((0,a.Z)({},n),{},{disablePortal:!0,isOptionEqualToValue:function(e,r){return e.value===r.value},id:"pais",options:Be,disableClearable:!0,value:null!==(r=Fr.pais)&&void 0!==r?r:null,onChange:function(){var e=(0,i.Z)((0,t.Z)().mark((function e(r,n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Pr("pais",n),Pr("provincia",null),Pr("ciudad",null),Xe(null===n||void 0===n?void 0:n.value),$e(0),n||Pr("pvin_Id",[]);case 6:case"end":return e.stop()}}),e)})));return function(r,n){return e.apply(this,arguments)}}(),renderInput:function(e){return(0,m.jsx)(E.Z,(0,a.Z)((0,a.Z)({},e),{},{error:!!Ar.pais}))}}))},name:"pais",error:!!Ar.pais,control:Ir})]})}),(0,m.jsx)(G.ZP,{item:!0,xs:6,children:(0,m.jsxs)(P.Z,{fullWidth:!0,children:[(0,m.jsx)(B.Z,{error:!!Ar.provincia,children:"Provincia:"}),(0,m.jsx)(ee.Qr,{render:function(e){var r,n=e.field;return(0,m.jsx)(T.Z,(0,a.Z)((0,a.Z)({},n),{},{disablePortal:!0,isOptionEqualToValue:function(e,r){return e.value===r.value},id:"provincia",options:Ae,disableClearable:!0,value:null!==(r=Fr.provincia)&&void 0!==r?r:null,onChange:function(){var e=(0,i.Z)((0,t.Z)().mark((function e(r,n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Pr("provincia",n),Pr("ciudad",null),$e(null===n||void 0===n?void 0:n.value),n||Pr("ciud_Id",[]);case 4:case"end":return e.stop()}}),e)})));return function(r,n){return e.apply(this,arguments)}}(),renderInput:function(e){return(0,m.jsx)(E.Z,(0,a.Z)((0,a.Z)({},e),{},{error:!!Ar.provincia,InputLabelProps:{shrink:!0}}))}}))},name:"provincia",control:Ir})]})}),(0,m.jsx)(G.ZP,{item:!0,xs:6,children:(0,m.jsxs)(P.Z,{fullWidth:!0,children:[(0,m.jsx)(B.Z,{error:!!Ar.ciudad,children:"Ciudad:"}),(0,m.jsx)(ee.Qr,{render:function(e){var r,n=e.field;return(0,m.jsx)(T.Z,(0,a.Z)((0,a.Z)({},n),{},{disablePortal:!0,isOptionEqualToValue:function(e,r){return e.value===r.value},id:"ciudad",options:qe,disableClearable:!0,value:null!==(r=Fr.ciudad)&&void 0!==r?r:null,onChange:function(){var e=(0,i.Z)((0,t.Z)().mark((function e(r,n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Pr("ciudad",n);case 1:case"end":return e.stop()}}),e)})));return function(r,n){return e.apply(this,arguments)}}(),renderInput:function(e){return(0,m.jsx)(E.Z,(0,a.Z)((0,a.Z)({},e),{},{error:!!Ar.ciudad,InputLabelProps:{shrink:!0}}))}}))},name:"ciudad",control:Ir})]})}),(0,m.jsx)(G.ZP,{item:!0,xs:6,children:(0,m.jsxs)(P.Z,{fullWidth:!0,children:[(0,m.jsx)(B.Z,{error:!!Ar.colonia,children:"Colonia:"}),(0,m.jsx)(ee.Qr,{render:function(e){var r=e.field;return(0,m.jsx)(E.Z,(0,a.Z)((0,a.Z)({},r),{},{variant:"outlined",error:!!Ar.colonia,fullWidth:!0}))},name:"colonia",control:Ir})]})}),(0,m.jsxs)(G.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,m.jsx)(S.Z,{startIcon:(0,m.jsx)(N.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},type:"submit",onClick:Br,children:"Guardar"}),(0,m.jsx)(S.Z,{startIcon:(0,m.jsx)(N.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:Tr,children:"Cancelar"})]})]})})})}),(0,m.jsx)(L.Z,{in:Ze,children:(0,m.jsx)("form",{onSubmit:kr((function(e){})),children:(0,m.jsx)(z.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,m.jsxs)(G.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(G.ZP,{item:!0,xs:12,children:(0,m.jsx)(R.Z,{style:{marginTop:"0px",marginBottom:"0px"},children:(0,m.jsx)(D.Z,{label:Oe?"Editar colonia":"Agregar colonia"})})}),(0,m.jsx)(G.ZP,{item:!0,xs:6,children:(0,m.jsxs)(P.Z,{fullWidth:!0,children:[(0,m.jsx)(B.Z,{error:!!Ar.pais,children:"Pa\xeds:"}),(0,m.jsx)(ee.Qr,{render:function(e){var r,n=e.field;return(0,m.jsx)(T.Z,(0,a.Z)((0,a.Z)({},n),{},{disablePortal:!0,isOptionEqualToValue:function(e,r){return e.value===r.value},id:"pais",options:Be,disableClearable:!0,value:null!==(r=Fr.pais)&&void 0!==r?r:null,onChange:function(){var e=(0,i.Z)((0,t.Z)().mark((function e(r,n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Pr("pais",n),Pr("provincia",null),Pr("ciudad",null),Xe(null===n||void 0===n?void 0:n.value),$e(0),n||Pr("pvin_Id",[]);case 6:case"end":return e.stop()}}),e)})));return function(r,n){return e.apply(this,arguments)}}(),renderInput:function(e){return(0,m.jsx)(E.Z,(0,a.Z)((0,a.Z)({},e),{},{error:!!Ar.pais,InputLabelProps:{shrink:!0}}))}}))},name:"pais",control:Ir})]})}),(0,m.jsx)(G.ZP,{item:!0,xs:6,children:(0,m.jsxs)(P.Z,{fullWidth:!0,children:[(0,m.jsx)(B.Z,{error:!!Ar.provincia,children:"Provincia:"}),(0,m.jsx)(ee.Qr,{render:function(e){var r,n=e.field;return(0,m.jsx)(T.Z,(0,a.Z)((0,a.Z)({},n),{},{disablePortal:!0,isOptionEqualToValue:function(e,r){return e.value===r.value},id:"provincia",options:Ae,disableClearable:!0,value:null!==(r=Fr.provincia)&&void 0!==r?r:null,onChange:function(){var e=(0,i.Z)((0,t.Z)().mark((function e(r,n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Pr("provincia",n),Pr("ciudad",null),$e(null===n||void 0===n?void 0:n.value),n||Pr("ciud_Id",[]);case 4:case"end":return e.stop()}}),e)})));return function(r,n){return e.apply(this,arguments)}}(),renderInput:function(e){return(0,m.jsx)(E.Z,(0,a.Z)((0,a.Z)({},e),{},{error:!!Ar.provincia,InputLabelProps:{shrink:!0}}))}}))},name:"provincia",control:Ir})]})}),(0,m.jsx)(G.ZP,{item:!0,xs:6,children:(0,m.jsxs)(P.Z,{fullWidth:!0,children:[(0,m.jsx)(B.Z,{error:!!Ar.ciudad,children:"Ciudad:"}),(0,m.jsx)(ee.Qr,{render:function(e){var r,n=e.field;return(0,m.jsx)(T.Z,(0,a.Z)((0,a.Z)({},n),{},{disablePortal:!0,isOptionEqualToValue:function(e,r){return e.value===r.value},id:"ciudad",options:qe,disableClearable:!0,value:null!==(r=Fr.ciudad)&&void 0!==r?r:null,onChange:function(){var e=(0,i.Z)((0,t.Z)().mark((function e(r,n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Pr("ciudad",n);case 1:case"end":return e.stop()}}),e)})));return function(r,n){return e.apply(this,arguments)}}(),renderInput:function(e){return(0,m.jsx)(E.Z,(0,a.Z)((0,a.Z)({},e),{},{error:!!Ar.ciudad,InputLabelProps:{shrink:!0}}))}}))},name:"ciudad",control:Ir})]})}),(0,m.jsx)(G.ZP,{item:!0,xs:6,children:(0,m.jsxs)(P.Z,{fullWidth:!0,children:[(0,m.jsx)(B.Z,{error:!!Ar.colonia,children:"Colonia:"}),(0,m.jsx)(ee.Qr,{render:function(e){var r=e.field;return(0,m.jsx)(E.Z,(0,a.Z)((0,a.Z)({},r),{},{variant:"outlined",error:!!Ar.colonia,fullWidth:!0}))},name:"colonia",control:Ir})]})}),(0,m.jsxs)(G.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,m.jsx)(S.Z,{startIcon:(0,m.jsx)(N.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},type:"submit",onClick:Br,children:"Editar"}),(0,m.jsx)(S.Z,{startIcon:(0,m.jsx)(N.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:function(){k(!_),me(!Ze),wr(yr)},children:"Cancelar"})]})]})})})}),(0,m.jsx)(L.Z,{in:be,children:(0,m.jsx)(z.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-center"},children:(0,m.jsxs)(G.ZP,{container:!0,spacing:3,children:[(0,m.jsx)(G.ZP,{item:!0,xs:12,style:{marginBottom:"30px"},children:(0,m.jsx)(R.Z,{style:{marginTop:"0px",marginBottom:"10px"},children:(0,m.jsx)(D.Z,{label:"Detalles de la colonia"})})}),(0,m.jsxs)(G.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:[(0,m.jsx)(M.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(W.Z,{htmlFor:"id",children:[(0,m.jsx)(Y.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Id de la colonia:"}),(0,m.jsx)(Y.Z,{children:Ke.colo_Id})]})}),(0,m.jsx)(M.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(W.Z,{htmlFor:"descripcion",children:[(0,m.jsx)(Y.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Nombre de la colonia:"}),(0,m.jsx)(Y.Z,{children:Ke.colo_Nombre})]})})]}),(0,m.jsxs)(G.ZP,{container:!0,spacing:2,style:{display:"flex",justifyContent:"center",marginBottom:"40px"},children:[(0,m.jsx)(M.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(W.Z,{htmlFor:"descripcion",children:[(0,m.jsx)(Y.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Ciudad de la colonia:"}),(0,m.jsx)(Y.Z,{children:Ke.ciud_Nombre})]})}),(0,m.jsx)(M.Z,{sx:{flex:1,textAlign:"center"},children:(0,m.jsxs)(W.Z,{htmlFor:"descripcion",children:[(0,m.jsx)(Y.Z,{sx:{fontWeight:"bold",color:"#000000"},children:"Provincia de la colonia:"}),(0,m.jsx)(Y.Z,{children:Ke.pvin_Nombre})]})})]}),(0,m.jsx)(G.ZP,{item:!0,xs:12,children:(0,m.jsxs)("table",{id:"detallesTabla",style:{width:"100%",borderCollapse:"collapse"},children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsxs)("th",{style:ce.Z.tableHeaderStyle,children:[(0,m.jsx)(N.Z,{style:ce.Z.iconStyle,children:"edit"}),"Acci\xf3n"]}),(0,m.jsxs)("th",{style:ce.Z.tableHeaderStyle,children:[(0,m.jsx)(N.Z,{style:ce.Z.iconStyle,children:"person"}),"Usuario"]}),(0,m.jsxs)("th",{style:ce.Z.tableHeaderStyle,children:[(0,m.jsx)(N.Z,{style:ce.Z.iconStyle,children:"date_range"}),"Fecha y hora"]})]})}),(0,m.jsxs)("tbody",{children:[(0,m.jsxs)("tr",{style:ce.Z.tableRowStyle,children:[(0,m.jsx)("td",{style:ce.Z.tableCellStyle,children:(0,m.jsx)("strong",{children:"Creaci\xf3n"})}),(0,m.jsx)("td",{style:ce.Z.tableCellStyle,children:Ke.usuarioCreacionNombre}),(0,m.jsx)("td",{style:ce.Z.tableCellStyle,children:Ke.colo_FechaCreacion?new Date(Ke.colo_FechaCreacion).toLocaleString():""})]}),(0,m.jsxs)("tr",{style:ce.Z.tableRowStyle,children:[(0,m.jsx)("td",{style:ce.Z.tableCellStyle,children:(0,m.jsx)("strong",{children:"Modificaci\xf3n"})}),(0,m.jsx)("td",{style:ce.Z.tableCellStyle,children:Ke.usuarioModificacionNombre}),(0,m.jsx)("td",{style:ce.Z.tableCellStyle,children:Ke.colo_FechaModificacion?new Date(Ke.colo_FechaModificacion).toLocaleString():""})]})]})]})}),(0,m.jsx)("br",{}),(0,m.jsx)(G.ZP,{item:!0,xs:12,children:(0,m.jsxs)("div",{className:"card-footer",children:[(0,m.jsx)(S.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:function(){k(!_),ge(!be)},startIcon:(0,m.jsx)(N.Z,{children:"arrow_back"}),children:"Regresar"}),(0,m.jsx)("br",{})]})})]})})}),(0,m.jsxs)(O.Z,{open:_e,fullWidth:!0,onClose:rr,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,m.jsx)(K.Z,{id:"alert-dialog-title",children:"Confirmaci\xf3n de Eliminaci\xf3n"}),(0,m.jsx)(H.Z,{children:(0,m.jsx)(Q.Z,{id:"alert-dialog-description",children:"\xbfEst\xe1 seguro(a) que desea eliminar este registro?"})}),(0,m.jsx)(V.Z,{children:(0,m.jsxs)(G.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,m.jsx)(S.Z,{startIcon:(0,m.jsx)(N.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:rr,children:"Eliminar"}),(0,m.jsx)(S.Z,{startIcon:(0,m.jsx)(N.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:rr,children:"Cancelar"})]})})]})]})}},89145:function(e,r,n){n(47313);var t=n(85281),o=n(53191),a=n(46417);r.Z=function(e){var r=(0,a.jsxs)(o.Z,{container:!0,spacing:2,display:"flex",justifyContent:"center",alignContent:"center",marginY:"10px",children:[(0,a.jsx)(o.Z,{item:!0,xs:12,children:(0,a.jsx)(t.Z,{style:{color:"#634a9e"}})}),(0,a.jsx)(o.Z,{item:!0,xs:12,children:"Cargando..."})]});return null==e||e.length>0?null:r}},97762:function(e,r,n){n.d(r,{Z:function(){return f}});var t=n(63366),o=n(87462),a=n(47313),i=n(21921),c=n(88564),l=n(77342),s=n(61113),u=n(32298);function d(e){return(0,u.Z)("MuiDialogContentText",e)}(0,n(77430).Z)("MuiDialogContentText",["root"]);var p=n(46417),x=["children"],h=(0,c.ZP)(s.Z,{shouldForwardProp:function(e){return(0,c.FO)(e)||"classes"===e},name:"MuiDialogContentText",slot:"Root",overridesResolver:function(e,r){return r.root}})({}),f=a.forwardRef((function(e,r){var n=(0,l.Z)({props:e,name:"MuiDialogContentText"}),a=(0,t.Z)(n,x),c=function(e){var r=e.classes,n=(0,i.Z)({root:["root"]},d,r);return(0,o.Z)({},r,n)}(a);return(0,p.jsx)(h,(0,o.Z)({component:"p",variant:"body1",color:"text.secondary",ref:r,ownerState:a},n,{classes:c}))}))},33604:function(e,r,n){var t=n(87462),o=n(63366),a=n(47313),i=n(83061),c=n(21921),l=n(61113),s=n(88564),u=n(77342),d=n(93174),p=n(63909),x=n(46417),h=["className","id"],f=(0,s.ZP)(l.Z,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,r){return r.root}})({padding:"16px 24px",flex:"0 0 auto"}),Z=a.forwardRef((function(e,r){var n=(0,u.Z)({props:e,name:"MuiDialogTitle"}),l=n.className,s=n.id,Z=(0,o.Z)(n,h),m=n,v=function(e){var r=e.classes;return(0,c.Z)({root:["root"]},d.a,r)}(m),j=a.useContext(p.Z).titleId,b=void 0===j?s:j;return(0,x.jsx)(f,(0,t.Z)({component:"h2",className:(0,i.default)(v.root,l),ownerState:m,ref:r,variant:"h6",id:b},Z))}));r.Z=Z}}]);