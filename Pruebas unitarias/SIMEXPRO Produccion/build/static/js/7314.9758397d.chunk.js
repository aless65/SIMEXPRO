"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[7314],{27314:function(e,a,i){i.r(a);var t=i(36459),n=i(74165),r=i(15861),o=i(29439),s=i(73428),c=i(16957),l=i(9019),u=i(24193),h=i(71263),m=i(38814),d=i(47313),p=i(58467),x=i(521),f=i(13251),g=i(46417),b=m.mM.create({line:{top:20,bottom:0,left:0,width:"100%",height:1,backgroundColor:"#000000"},page:{flexDirection:"column",backgroundColor:"white",padding:25},image:{alignItems:"flex-end",justifyContent:"flex-end",position:"absolute",top:5,right:30},pageNumber:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"right",color:"grey"},pageUser:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"center",color:"grey"},pageDate:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"left",color:"grey"},columnsContainer:{flexDirection:"column"},headerParteIzq:{alignItems:"flex-end",justifyContent:"flex-end",position:"absolute",top:0},tableContainer:{borderWidth:1,margin:"5px",borderColor:"#dedede"},tableContainerTransparente:{borderWidth:1,textAlign:"center",margin:"10px",borderColor:"white"},tableHeader:{flexDirection:"row",backgroundColor:"white",marginTop:10},tableRow:{flexDirection:"row",borderColor:"#f9f5ff"},tableCellMateriales:{flex:1,borderWidth:.5,borderColor:"black",padding:0,textAlign:"center",justifyContent:"center"},tableCellMateriales2:{flex:1,borderWidth:.5,borderColor:"black",padding:0,textAlign:"justify"},tableCellRegistors:{flex:1,borderWidth:1,borderColor:"white",padding:3,textAlign:"left"},cellTextHeader:{fontSize:16,fontFamily:"Times-Roman",fontWeight:"bold",textAlign:"left"},cellText:{fontSize:12,fontFamily:"Times-Roman",padding:2,marginLeft:13,marginTop:5},cellTextObservaciones:{fontSize:12,fontFamily:"Times-Roman",padding:3,marginLeft:3},cellTextUnderline:{fontSize:12,textDecorationLine:"underline"},headerCellText:{fontSize:10,fontFamily:"Times-Roman",textAlign:"center",backgroundColor:"#ebebeb"},detallesTitle:{top:35,left:10,fontSize:20,fontFamily:"Times-Roman"},columnsContainer3:{top:10,right:0,justifyContent:"space-between"}});a.default=function(){var e=(0,f.Z)(),a=(0,p.TH)().state,i=(0,d.useState)([]),_=(0,o.Z)(i,2),y=(_[0],_[1],(0,d.useState)([])),v=(0,o.Z)(y,2),F=v[0],C=v[1],j=function(){var i=(0,r.Z)((0,n.Z)().mark((function i(){return(0,n.Z)().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.t0=C,i.next=4,e.listarPorNumeroDeSerie(a.maqu_NumeroSerie);case 4:i.t1=i.sent,(0,i.t0)(i.t1),i.next=10;break;case 8:i.prev=8,i.t2=i.catch(0);case 10:case"end":return i.stop()}}),i,null,[[0,8]])})));return function(){return i.apply(this,arguments)}}();(0,d.useEffect)((function(){j()}),[]);var w=JSON.parse(localStorage.getItem("user")),M=function(){return(0,g.jsx)(m.BB,{title:"MaquinaHistorialReporte.pdf",creator:"SIMEXPRO",author:"SIMEXPRO",children:(0,g.jsxs)(m.T3,{size:"A4",style:b.page,children:[(0,g.jsx)(m.G7,{style:b.headerParteIzq,children:(0,g.jsx)(m.Ee,{src:"https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png",style:{height:60,width:260}})}),(0,g.jsx)(m.G7,{style:b.image,children:(0,g.jsx)(m.Ee,{src:"https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png",style:{height:43,width:110}})}),(0,g.jsxs)(m.G7,{style:b.columnsContainer3,children:[(0,g.jsx)(m.xv,{style:b.detallesTitle,children:"REPORTE DE MAQUINARIA"}),(0,g.jsxs)(m.xv,{style:{margin:2,fontSize:10,textAlign:"right",fontFamily:"Times-Roman"},children:["No. de Reporte: ",a.maqu_Id]}),(0,g.jsxs)(m.xv,{style:{margin:6,fontSize:10,textAlign:"right",fontFamily:"Times-Roman"},children:["Fecha: "," ",(new Date).toLocaleString("es-US",{dateStyle:"long"})," "]})]}),(0,g.jsx)(m.G7,{style:b.line}),(0,g.jsx)(m.G7,{style:{marginBottom:20}}),(0,g.jsxs)(m.G7,{style:b.tableContainerTransparente,children:[(0,g.jsx)(m.G7,{style:b.tableHeader,children:(0,g.jsx)(m.G7,{style:b.encabezadoHeader,children:(0,g.jsx)(m.xv,{style:b.cellTextHeader,children:"Datos de la M\xe1quina"})})}),(0,g.jsx)(m.G7,{style:b.tableRow,children:(0,g.jsxs)(m.G7,{style:b.tableCellRegistors,children:[(0,g.jsxs)(m.xv,{style:b.cellText,children:["\u2022 No. de Serie: ",(0,g.jsxs)(m.xv,{style:b.cellTextUnderline,children:[" ",a.maqu_NumeroSerie]})]}),(0,g.jsxs)(m.xv,{style:b.cellText,children:["\u2022 M\xf3dulo de la M\xe1quina: ",(0,g.jsxs)(m.xv,{style:b.cellTextUnderline,children:[" ",a.modu_Nombre]})]}),(0,g.jsxs)(m.xv,{style:b.cellText,children:["\u2022 Modelo de la M\xe1quina: ",(0,g.jsxs)(m.xv,{style:b.cellTextUnderline,children:[" ",a.mmaq_Nombre]})]})]})})]}),(0,g.jsx)(m.G7,{style:{marginBottom:5}}),(0,g.jsx)(m.G7,{style:b.columnsContainer,children:(0,g.jsx)(m.G7,{style:b.columnsContainer,children:(0,g.jsxs)(m.G7,{style:b.tableContainer,children:[(0,g.jsxs)(m.G7,{style:b.tableRow,children:[(0,g.jsx)(m.G7,{style:b.tableCellMateriales,children:(0,g.jsx)(m.xv,{style:b.headerCellText,children:"Fecha Inicio"})}),(0,g.jsx)(m.G7,{style:b.tableCellMateriales,children:(0,g.jsx)(m.xv,{style:b.headerCellText,children:"Fecha Fin"})}),(0,g.jsx)(m.G7,{style:b.tableCellMateriales,children:(0,g.jsx)(m.xv,{style:b.headerCellText,children:"Fuera de Servicio"})}),(0,g.jsx)(m.G7,{style:b.tableCellMateriales,children:(0,g.jsx)(m.xv,{style:b.headerCellText,children:"Observaciones"})})]}),F?F.map((function(e,a){return(0,g.jsxs)(m.G7,{style:b.tableRow,children:[(0,g.jsx)(m.G7,{style:b.tableCellMateriales,children:(0,g.jsx)(m.xv,{style:b.cellText,children:new Date(e.mahi_FechaInicio).toLocaleString()})}),(0,g.jsx)(m.G7,{style:b.tableCellMateriales,children:(0,g.jsx)(m.xv,{style:b.cellText,children:new Date(e.mahi_FechaFin).toLocaleString()})}),(0,g.jsx)(m.G7,{style:b.tableCellMateriales,children:(0,g.jsxs)(m.xv,{style:b.cellText,children:[Math.floor(Math.abs(new Date(e.mahi_FechaInicio).getTime()-new Date(e.mahi_FechaFin).getTime())/864e5)," d\xedas y ",Math.floor(Math.abs(new Date(e.mahi_FechaInicio).getTime()-new Date(e.mahi_FechaFin).getTime())%864e5/36e5)," horas"]})}),(0,g.jsx)(m.G7,{style:b.tableCellMateriales2,children:(0,g.jsx)(m.xv,{style:b.cellTextObservaciones,children:e.mahi_Observaciones})})]},a)})):null]})})}),(0,g.jsx)(m.xv,{style:b.pageDate,render:function(e){return(0,t.Z)(e),"Fecha de Impresi\xf3n: ".concat((new Date).toLocaleString("es-US",{dateStyle:"short"}))},fixed:!0}),(0,g.jsx)(m.xv,{style:b.pageUser,render:function(e){return(0,t.Z)(e),"Usuario :".concat(w.data.displayName)},fixed:!0}),(0,g.jsx)(m.xv,{style:b.pageNumber,render:function(e){var a=e.pageNumber,i=e.totalPages;return"".concat(a," / ").concat(i)},fixed:!0})]})})};return(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(s.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,g.jsx)(c.Z,{component:"img",height:"200",className:"mb-24",image:"https://i.ibb.co/WcYVdCq/REPORTE-DE-M-QUINA.png",alt:"Encabezado de la carta"}),(0,g.jsx)(l.ZP,{container:!0,spacing:3,children:(0,g.jsxs)(l.ZP,{item:!0,xs:12,children:[(0,g.jsx)(m.WD,{document:(0,g.jsx)(M,{}),fileName:"Reporte.pdf",children:" "}),(0,g.jsx)(m.Z$,{style:{width:"100%",height:"100vh"},children:(0,g.jsx)(M,{})})]})}),(0,g.jsx)(u.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:function(){x.Z.push("/Maquinas/index")},startIcon:(0,g.jsx)(h.Z,{children:"arrow_back"}),children:"Regresar"})]})})}},13251:function(e,a,i){var t=i(74165),n=i(15861),r=i(31881),o=i.n(r),s=i(9098);a.Z=function(){var e={XApiKey:s.Z.extraerToken()},a=o().create({baseURL:"https://practicaacademia.somee.com/api/MaquinaHistorial/",headers:e}),i=JSON.parse(localStorage.getItem("user"));function r(){return(r=(0,n.Z)((0,t.Z)().mark((function e(){var i,n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.get("Listar");case 3:return i=e.sent,n=i.data.data.map((function(e,a){return{key:a+1,mahi_Id:e.mahi_Id,maqu_Id:e.maqu_Id,maquinaNumeroSerie:e.maquinaNumeroSerie,mahi_FechaInicio:new Date(e.mahi_FechaInicio).toLocaleString(),mahi_FechaFin:new Date(e.mahi_FechaFin).toLocaleString(),mahi_Observaciones:e.mahi_Observaciones,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usuarioCreacionNombre:e.usuarioCreacionNombre,mahi_FechaCreacion:e.mahi_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,usuarioModificaNombre:e.usuarioModificaNombre,mahi_FechaModificacion:e.mahi_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,usuarioEliminaNombre:e.usuarioEliminaNombre,mahi_FechaEliminacion:e.mahi_FechaEliminacion,mahi_Estado:e.mahi_Estado}})),e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function c(){return(c=(0,n.Z)((0,t.Z)().mark((function e(){var i,n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.get("Listar");case 3:return i=e.sent,n=i.data.data.map((function(e,a){return{key:a+1,maquinaNumeroSerie:e.maquinaNumeroSerie,mahi_FechaInicio:new Date(e.mahi_FechaInicio).toLocaleString(),mahi_FechaFin:new Date(e.mahi_FechaFin).toLocaleString()}})),e.abrupt("return",n);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function l(){return(l=(0,n.Z)((0,t.Z)().mark((function e(i){var n,r,o,s;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.get("Listar");case 3:return n=e.sent,r=n.data.data,o=r.filter((function(e){return e.maquinaNumeroSerie===i})),s=o.map((function(e,a){return{key:a+1,mahi_Id:e.mahi_Id,maqu_Id:e.maqu_Id,maquinaNumeroSerie:e.maquinaNumeroSerie,mahi_FechaInicio:e.mahi_FechaInicio,mahi_FechaFin:e.mahi_FechaFin,mahi_Observaciones:e.mahi_Observaciones,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usuarioCreacionNombre:e.usuarioCreacionNombre,mahi_FechaCreacion:e.mahi_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,usuarioModificaNombre:e.usuarioModificaNombre,mahi_FechaModificacion:e.mahi_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,usuarioEliminaNombre:e.usuarioEliminaNombre,mahi_FechaEliminacion:e.mahi_FechaEliminacion,mahi_Estado:e.mahi_Estado}})),e.abrupt("return",s);case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function u(){return(u=(0,n.Z)((0,t.Z)().mark((function e(n){var r,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={maqu_Id:n.maquina.value,mahi_FechaInicio:n.mahi_FechaInicio,mahi_FechaFin:n.mahi_FechaFin,mahi_Observaciones:n.mahi_Observaciones.trim(),usua_UsuarioCreacion:i.uuid,mahi_FechaCreacion:s.Z.formatFechaHora(new Date)},e.next=4,a.post("Insertar",r);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function h(){return(h=(0,n.Z)((0,t.Z)().mark((function e(n){var r,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={mahi_Id:n.mahi_Id,maqu_Id:n.maquina.value,mahi_FechaInicio:s.Z.formatFechaHora(new Date(n.mahi_FechaInicio)),mahi_FechaFin:s.Z.formatFechaHora(new Date(n.mahi_FechaFin)),mahi_Observaciones:n.mahi_Observaciones.trim(),usua_UsuarioModificacion:i.uuid,mahi_FechaModificacion:s.Z.formatFechaHora(new Date)},e.next=4,a.post("Editar",r);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function m(){return(m=(0,n.Z)((0,t.Z)().mark((function e(n){var r,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={mahi_Id:n.mahi_Id,usua_UsuarioEliminacion:i.uuid,mahi_FechaEliminacion:s.Z.formatFechaHora(new Date)},e.next=4,a.post("Eliminar",r);case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return{listar:function(){return r.apply(this,arguments)},crear:function(e){return u.apply(this,arguments)},editar:function(e){return h.apply(this,arguments)},eliminar:function(e){return m.apply(this,arguments)},listarPorNumeroDeSerie:function(e){return l.apply(this,arguments)},ExportData:function(){return c.apply(this,arguments)}}}},16957:function(e,a,i){i.d(a,{Z:function(){return g}});var t=i(63366),n=i(87462),r=i(47313),o=i(83061),s=i(21921),c=i(77342),l=i(88564),u=i(32298);function h(e){return(0,u.Z)("MuiCardMedia",e)}(0,i(77430).Z)("MuiCardMedia",["root","media","img"]);var m=i(46417),d=["children","className","component","image","src","style"],p=(0,l.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:function(e,a){var i=e.ownerState,t=i.isMediaComponent,n=i.isImageComponent;return[a.root,t&&a.media,n&&a.img]}})((function(e){var a=e.ownerState;return(0,n.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},a.isMediaComponent&&{width:"100%"},a.isImageComponent&&{objectFit:"cover"})})),x=["video","audio","picture","iframe","img"],f=["picture","img"],g=r.forwardRef((function(e,a){var i=(0,c.Z)({props:e,name:"MuiCardMedia"}),r=i.children,l=i.className,u=i.component,g=void 0===u?"div":u,b=i.image,_=i.src,y=i.style,v=(0,t.Z)(i,d),F=-1!==x.indexOf(g),C=!F&&b?(0,n.Z)({backgroundImage:'url("'.concat(b,'")')},y):y,j=(0,n.Z)({},i,{component:g,isMediaComponent:F,isImageComponent:-1!==f.indexOf(g)}),w=function(e){var a=e.classes,i={root:["root",e.isMediaComponent&&"media",e.isImageComponent&&"img"]};return(0,s.Z)(i,h,a)}(j);return(0,m.jsx)(p,(0,n.Z)({className:(0,o.default)(w.root,l),as:g,role:!F&&b?"img":void 0,ref:a,style:C,ownerState:j,src:F?b||_:void 0},v,{children:r}))}))},36459:function(e,a,i){function t(e){if(null==e)throw new TypeError("Cannot destructure "+e)}i.d(a,{Z:function(){return t}})}}]);