"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[3533],{53533:function(e,t,o){o.r(t);var r=o(36459),n=o(1413),a=o(74165),i=o(15861),c=o(29439),l=o(38814),s=o(73428),d=o(16957),p=o(9019),u=o(1550),m=o(5178),h=o(25298),x=o(24631),f=o(41727),_=o(65033),b=o(24193),g=o(71263),v=o(93405),C=o(75627),y=o(521),j=o(58631),Z=o(22408),D=o(56954),T=o(83142),P=o(47313),N=o(31881),R=o.n(N),I=o(62563),S=o(3463),F=o(68673),w=o(46417),z=D.Z.RangePicker,E=new Date,k=E.getDate(),A=E.getMonth()+1,M=E.getFullYear(),G=E.getHours(),O=E.getMinutes(),L=E.getSeconds(),q="".concat(k,"/").concat(A,"/").concat(M," ").concat(G,":").concat(O,":").concat(L);l.Zx.register({family:"Arial",fonts:[{src:"https://db.onlinewebfonts.com/t/8d223b3ad8d4819e9dcf22757e4cc2c4.ttf"},{src:"https://db.onlinewebfonts.com/t/3d6b457e3aa0c0b78e6fbf0355bc43a6.ttf",fontWeight:"bold"}]});var W=l.mM.create({cellWithLine:{position:"relative",marginBottom:10},line:{top:20,bottom:0,left:0,width:"100%",height:1,backgroundColor:"#000000"},lineItems:{top:5,bottom:0,left:0,width:"100%",height:1,backgroundColor:"#000000"},page:{flexDirection:"column",backgroundColor:"white",padding:25},header:{fontWeight:"bold",fontFamily:"Times-Roman",fontSize:14,marginBottom:5},innerheader:{fontWeight:"bold",fontFamily:"Times-Roman",fontSize:14,marginBottom:5},image:{alignItems:"flex-end",justifyContent:"flex-end",position:"absolute",top:5,right:30},imageLogoLetras:{alignItems:"center",justifyContent:"center",top:0},title:{top:70,right:90,fontSize:24,textAlign:"center",fontFamily:"Times-Roman"},divisor:{fontSize:18,left:20,textAlign:"left",fontFamily:"Times-Roman"},subtitle:{top:69,left:50,right:20,bottom:30,fontSize:15,textAlign:"center",fontFamily:"Times-Roman"},pageNumber:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"right",color:"grey"},pageUser:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"center",color:"grey"},pageDate:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"left",color:"grey"},columnsContainer:{flexDirection:"column"},column:{marginBottom:10},columnsContainer1:{padding:30,top:0,right:0,flexDirection:"row"},columnsContainer2:{top:0,right:0,flexDirection:"row"},headerContainer:{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,marginBottom:20},headerParteIzq:{alignItems:"flex-end",justifyContent:"flex-end",position:"absolute",top:0},column1:{flex:1,marginRight:15},column2:{flex:1,marginLeft:15},tableContainer:{borderWidth:1,margin:"5px",borderColor:"#dedede"},tableContainerMateriales:{borderWidth:1,margin:"5px",borderColor:"#ebebeb"},tableContainerTransparente:{borderWidth:1,textAlign:"center",margin:"10px",borderColor:"white"},tableTitle:{fontSize:15,textAlign:"left",padding:5,color:"white",backgroundColor:"#634a9eb0",fontFamily:"Times-Roman"},tableHeader:{flexDirection:"row",backgroundColor:"white"},tableRow:{flexDirection:"row",borderColor:"#f9f5ff"},tableCell:{flex:1,borderWidth:1,borderColor:"black",padding:10},tableCellMateriales:{flex:1,borderWidth:1,borderColor:"black",padding:0},tableCellRegistors:{flex:1,borderWidth:0,padding:3,textAlign:"left",fontSize:4},tableCellRegistorsItem:{flex:1,borderWidth:1,borderColor:"white",padding:3,textAlign:"left",left:18},tableCellRegistorsItemDerecha:{flex:1,borderWidth:1,borderColor:"white",padding:3,textAlign:"left",left:5},encabezadoHeader:{borderWidth:1,fontFamily:"Times-Roman",borderColor:"white",textAlign:"left"},cellTextHeader:{fontSize:12,fontWeight:"bold"},cellTextHeaderItems:{fontSize:12,fontWeight:"bold",left:15,bottom:5},cellText:{fontSize:11,padding:2},cellTextUnderline:{fontSize:12,textDecorationLine:"underline"},cellTextTabla:{fontSize:10,fontFamily:"Times-Roman"},cellTextRegistros:{fontSize:11,fontFamily:"Times-Roman"},headerCellText:{fontSize:12,fontFamily:"Times-Roman",textAlign:"center",backgroundColor:"#ebebeb"},detallesTitle:{top:35,left:20,fontSize:20,fontFamily:"Times-Roman"},headerTextoDerecho:{top:10,textAlign:"right",fontSize:9,fontFamily:"Times-Roman"},columnsContainer3:{top:0,right:0}});t.default=function(){var e=(0,F.Z)(),t=(0,P.useState)([]),o=(0,c.Z)(t,2),D=o[0],N=o[1],E=(0,Z.v9)(j.dy),k=(0,P.useState)([]),A=(0,c.Z)(k,2),M=A[0],G=A[1],O=(0,P.useState)(!1),L=(0,c.Z)(O,2),U=L[0],B=L[1],H=(0,P.useState)({}),Y=(0,c.Z)(H,2),X=Y[0],V=Y[1],J=(0,P.useState)(""),Q=(0,c.Z)(J,2),K=Q[0],$=Q[1],ee=S.Ry().shape({Area:S.Ry(),FechaComenzar:S.hT(),FechaLimite:S.hT()}),te=(0,C.cI)({defaultValues:{Area:null,FechaComenzar:null,FechaLimite:null},mode:"all",resolver:(0,I.X)(ee)}),oe=(te.reset,te.control),re=te.watch,ne=te.setValue,ae=re(),ie=function(){var t=(0,i.Z)((0,a.Z)().mark((function t(){var o;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.Areas();case 3:o=t.sent,G(o),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}();(0,P.useEffect)((function(){ie()}),[]),(0,P.useEffect)((function(){null!=ae.FechaComenzar&&null!=ae.FechaLimite&&null!=ae.Area?ce():B(!1)}),[ae.FechaComenzar,ae.FechaLimite,ae.Area]);var ce=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(){var t,o,r,n,i,c,l,s,d,p;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=(0,T.Z)(),e.next=4,t.ProduccionPorAreas(ae.Area,ae.FechaComenzar,ae.FechaLimite);case 4:if(o=e.sent,N(o),0==o.length){e.next=19;break}return r=["Da\xf1ado - Cantidad: "+o[0].totalDanado+" Porcentaje: ","Exitoso - Cantidad: "+o[0].totalExitoso+" Porcentaje:"],n=[o[0].porcentajeDanado,o[0].porcentajeBueno],i={type:"outlabeledPie",data:{labels:r,datasets:[{label:"Porcentaje de la Producci\xf3n",data:n,backgroundColor:["#dcc265","#9351f7"],borderColor:["#588CBC","#FED9B7"],borderWidth:1}]},options:{title:{align:"end",display:!0,position:"top",text:"Porcentaje de la Producci\xf3n"},plugins:{legend:!1,outlabels:{text:"%l %p",color:"black",stretch:35,font:{resizable:!0,minSize:12,maxSize:18}}}}},c=JSON.stringify(i),l=encodeURIComponent(c),s="https://quickchart.io/chart?c=".concat(l),e.next=15,R().get(s);case 15:d=e.sent,p=d.request,$(p.responseURL),B(!0);case 19:e.next=24;break;case 21:throw e.prev=21,e.t0=e.catch(0),e.t0;case 24:case"end":return e.stop()}}),e,null,[[0,21]])})));return function(){return e.apply(this,arguments)}}(),le=function(){return(0,w.jsx)(l.BB,{title:"ReporteProducci\xf3nPorArea.pdf",creator:"SIMEXPRO",author:"SIMEXPRO",children:(0,w.jsxs)(l.T3,{size:"A4",style:(0,n.Z)({},W.page),children:[(0,w.jsx)(l.G7,{style:W.headerParteIzq,children:(0,w.jsx)(l.Ee,{src:"https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png",style:{height:40,width:210}})}),(0,w.jsx)(l.G7,{style:W.image,children:(0,w.jsx)(l.Ee,{src:"https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png",style:{height:38,width:100}})}),(0,w.jsxs)(l.G7,{style:W.columnsContainer3,children:[(0,w.jsx)(l.xv,{style:W.detallesTitle,children:"Reporte Producci\xf3n Por Area"}),(0,w.jsx)(l.xv,{style:W.headerTextoDerecho,children:"Fechas Comienzo -  Fecha Final "}),(0,w.jsxs)(l.xv,{style:W.headerTextoDerecho,children:[null!=ae.FechaComenzar?ae.FechaComenzar:"No Asiganado - "+ae.FechaLimite!=null?ae.FechaLimite:"No Asiganado"," "]})]}),(0,w.jsx)(l.G7,{style:W.line}),(0,w.jsx)(l.G7,{style:{marginBottom:25}}),(0,w.jsxs)(l.G7,{style:{display:"flex"},children:[(0,w.jsxs)(l.G7,{style:W.tableRow,children:[(0,w.jsx)(l.G7,{style:W.tableCellRegistorsItem,children:(0,w.jsxs)(l.xv,{style:W.cellText,children:["\u2022 Area seleccionada: ",D.length>0?D[0].tipa_area:" "]})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistorsItem,children:(0,w.jsxs)(l.xv,{style:W.cellText,children:["\u2022 Total de prendas en el Periodo: ",D.length>0?D[0].totalPeriodo:" "]})})]}),(0,w.jsxs)(l.G7,{style:W.tableRow,children:[(0,w.jsx)(l.G7,{style:W.tableCellRegistorsItem,children:(0,w.jsxs)(l.xv,{style:W.cellText,children:["\u2022 Promedio  de producci\xf3n al dia: ",D.length>0?D[0].promedioDia:" "]})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistorsItem,children:(0,w.jsxs)(l.xv,{style:W.cellText,children:["\u2022 Total de prendas exitosas: ",D.length>0?D[0].totalExitoso:" "]})})]}),(0,w.jsxs)(l.G7,{style:W.tableRow,children:[(0,w.jsx)(l.G7,{style:W.tableCellRegistorsItem,children:(0,w.jsxs)(l.xv,{style:W.cellText,children:["\u2022 Promedio de producci\xf3n exitosos: ",D.length>0?D[0].promedioExitoso:" "]})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistorsItem,children:(0,w.jsxs)(l.xv,{style:W.cellText,children:["\u2022 Total de items da\xf1ados: ",D.length>0?D[0].totalDanado:" "]})})]}),(0,w.jsxs)(l.G7,{style:(0,n.Z)({},W.columnsContainer),children:[D&&D.map((function(e,t){return(0,w.jsxs)(l.G7,{style:W.tableContainer,children:[(0,w.jsx)(l.G7,{style:(0,n.Z)((0,n.Z)({},W.tableContainerTransparente),{},{border:"1px solid #634a9e",padding:"2%",textTransform:"uppercase",marginBottom:"-6px"}),children:(0,w.jsxs)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.tableTitle),{},{fontWeight:"bold"}),children:["Detalle #",t+1]})}),(0,w.jsxs)(l.G7,{style:(0,n.Z)((0,n.Z)({},W.tableContainerTransparente),{},{textTransform:"uppercase"}),children:[(0,w.jsxs)(l.G7,{style:(0,n.Z)((0,n.Z)({},W.tableRow),{},{backgroundColor:"#dcc26599",border:"none"}),fixed:!0,children:[(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:W.cellText,children:"C\xf3digo P.O"})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:W.cellText,children:"Total     Hecho"})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:W.cellText,children:"Total Da\xf1ado"})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:W.cellText,children:"Estilo"})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:W.cellText,children:"Genero"})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:W.cellText,children:"Valor prenda"})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:W.cellText,children:"Comenz\xf3 "})})]}),e&&e.detalles?e.detalles.map((function(e,t){return(0,w.jsxs)(l.G7,{style:W.tableRow,children:[(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.cellText),{},{fontSize:10}),children:e.orco_Codigo})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.cellText),{},{fontSize:10}),children:e.rdet_TotalDia})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.cellText),{},{fontSize:10}),children:e.rdet_TotalDanado})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.cellText),{},{fontSize:10}),children:e.esti_Descripcion})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.cellText),{},{fontSize:10}),children:"M"==e.code_Sexo?"Masculino":"F"==e.code_Sexo?"Femenino":"Unisex"})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.cellText),{},{fontSize:10}),children:e.code_Valor})}),(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.cellText),{},{fontSize:10}),children:e.remo_Fecha})})]},t)})):(0,w.jsx)(l.G7,{style:(0,n.Z)((0,n.Z)({},W.tableRow),{},{textAlign:"center"}),children:(0,w.jsx)(l.G7,{style:W.tableCellRegistors,children:(0,w.jsx)(l.xv,{style:W.cellText,children:"Orden de compra sin detalles"})})})]})]},t)})),(0,w.jsx)(l.G7,{style:W.ContainerGrafica,children:(0,w.jsx)(l.Ee,{src:K,style:{width:"100%"}})})]})]}),(0,w.jsx)(l.G7,{style:{marginBottom:5}}),(0,w.jsx)(l.xv,{style:W.pageDate,render:function(e){return(0,r.Z)(e),"Fecha de Impresi\xf3n: ".concat(q)},fixed:!0}),(0,w.jsx)(l.xv,{style:(0,n.Z)((0,n.Z)({},W.pageUser),{},{textTransform:"capitalize"}),render:function(e){return(0,r.Z)(e),"Usuario: ".concat(E.data.displayName)},fixed:!0}),(0,w.jsx)(l.xv,{style:W.pageNumber,render:function(e){var t=e.pageNumber,o=e.totalPages;return"P\xe1gina: ".concat(t," / ").concat(o)},fixed:!0})]})})};return(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)(s.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,w.jsx)(d.Z,{component:"img",height:"200",className:"mb-24",image:"https://i.ibb.co/94H2TDv/PRODUCCI-N-POR-REAS.png",alt:"Encabezado de la carta"}),(0,w.jsx)(v.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,w.jsxs)(p.ZP,{container:!0,spacing:3,children:[(0,w.jsx)(p.ZP,{item:!0,xs:6,style:{maxHeight:"100px",display:"flex",flexDirection:"column"},children:(0,w.jsxs)(u.Z,{fullWidth:!0,style:{height:"100%"},children:[(0,w.jsx)(m.Z,{className:"font-medium text-12",component:"legend",children:"Fechas:"}),(0,w.jsx)(z,{size:"large",style:{width:"100%",height:"53px",borderRadius:"3px"},placeholder:["Fecha inicio","Fecha fin"],value:X,onChange:function(e){V(e),e&&2===e.length?(ne("FechaComenzar",e[0].format("YYYY-MM-DD")),ne("FechaLimite",e[1].format("YYYY-MM-DD"))):(ne("FechaComenzar",null),ne("FechaLimite",null))}})]})}),(0,w.jsx)(p.ZP,{item:!0,xs:6,style:{maxHeight:"100px",display:"flex",flexDirection:"column"},children:(0,w.jsxs)(u.Z,{fullWidth:!0,style:{height:"100%"},children:[(0,w.jsx)(m.Z,{className:"font-medium text-12",component:"legend",children:"Areas:"}),(0,w.jsx)(C.Qr,{render:function(e){var t,o=e.field;return(0,w.jsx)(h.Z,(0,n.Z)((0,n.Z)({},o),{},{id:"Areas",isOptionEqualToValue:function(e,t){return e.value===(null===t||void 0===t?void 0:t.value)},size:"large",style:{width:"100%",height:"40px",borderRadius:"3px"},options:M,value:null!==(t=ae.Area)&&void 0!==t?t:null,disableClearable:!0,onChange:function(e,t){ne("Area",t)},renderInput:function(e){return(0,w.jsx)(x.Z,(0,n.Z)((0,n.Z)({},e),{},{placeholder:"Selecione un \xc1rea"}))}}))},name:"Area",control:oe,InputProps:{startAdornment:(0,w.jsx)(f.Z,{position:"start"})}})]})}),(0,w.jsx)(p.ZP,{item:!0,xs:12,children:(0,w.jsxs)(_.Z,{in:U,children:[(0,w.jsx)(l.WD,{document:(0,w.jsx)(le,{}),fileName:"Reporte.pdf",children:" "}),(0,w.jsx)(l.Z$,{style:{width:"100%",height:"100vh"},children:(0,w.jsx)(le,{})})]})})]})}),(0,w.jsx)(b.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:function(){y.Z.push("/Inicio/Produccion")},startIcon:(0,w.jsx)(g.Z,{children:"arrow_back"}),children:"Regresar"})]})})}},83142:function(e,t,o){var r=o(74165),n=o(15861),a=o(31881),i=o.n(a),c=o(9098);t.Z=function(){var e={XApiKey:c.Z.extraerToken()},t="".concat("https://practicaacademia.somee.com/","api/Reportes/"),o=i().create({baseURL:t,headers:e});function a(){return(a=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={maqu_Id:t},e.next=4,o.post("TiemposMaquinas",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){return{key:t+1,maqu_Id:e.maqu_Id,maqu_NumeroSerie:e.maqu_NumeroSerie,marq_Nombre:e.marq_Nombre,diasActiva:e.diasActiva,diasInactiva:e.diasInactiva,diasTotalesInactiva:e.diasTotalesInactiva,mahi_Observaciones:e.mahi_Observaciones}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function l(){return(l=(0,n.Z)((0,r.Z)().mark((function e(t,n){var a,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={fecha_inicio:t,fecha_fin:n},e.next=4,o.post("ProduccionPorModulo",a);case 4:return i=e.sent,c=i.data.data.map((function(e,t){return{key:t+1,modu_Nombre:e.modu_Nombre,totalProduccion:e.totalProduccion,promedioCantidad:e.promedioCantidad,promedioDanio:e.promedioDanio,promedioProduccion:e.promedioProduccion}})),e.abrupt("return",c);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function s(){return(s=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={clie_Id:t},e.next=4,o.post("PedidosCliente",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){var o=JSON.parse(e.detalles);return{key:t+1,modu_Nombre:e.modu_Nombre,pedidosTerminados:e.pedidosTerminados,pedidosPendientes:e.pedidosPendientes,pedidosCurso:e.pedidosCurso,procentajeCompletado:e.procentajeCompletado,clie_Nombre_O_Razon_Social:e.clie_Nombre_O_Razon_Social,clie_RTN:e.clie_RTN,clie_Nombre_Contacto:e.clie_Nombre_Contacto,clie_Numero_Contacto:e.clie_Numero_Contacto,clie_Correo_Electronico:e.clie_Correo_Electronico,detalles:o}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function d(){return(d=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={orco_Id:t},e.next=4,o.post("PlanificacionPO",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){return{key:t+1,orco_Id:e.orco_Id,asor_OrdenDetId:e.asor_OrdenDetId,esti_Descripcion:e.esti_Descripcion,colr_Nombre:e.colr_Nombre,tall_Nombre:e.tall_Nombre,asor_FechaInicio:e.asor_FechaInicio,asor_FechaLimite:e.asor_FechaLimite,asor_Cantidad:e.asor_Cantidad,proc_Descripcion:e.proc_Descripcion,empl_NombreCompleto:e.empl_NombreCompleto,clie_Nombre_O_Razon_Social:e.clie_Nombre_O_Razon_Social}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function p(){return(p=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={orco_Id:t},e.next=4,o.post("MaterialesPorPO",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){return{key:t+1,orco_Id:e.orco_Id,orco_Codigo:e.orco_Codigo,clie_Nombre_O_Razon_Social:e.clie_Nombre_O_Razon_Social,clie_Direccion:e.clie_Direccion,clie_RTN:e.clie_RTN,clie_Nombre_Contacto:e.clie_Nombre_Contacto,clie_Correo_Electronico:e.clie_Correo_Electronico,clie_FAX:e.clie_FAX,orco_FechaEmision:e.orco_FechaEmision,orco_FechaLimite:e.orco_FechaLimite,fopa_Descripcion:e.fopa_Descripcion,tiem_Descripcion:e.tiem_Descripcion,orco_MetodoPago:e.orco_MetodoPago,orco_DireccionEntrega:e.orco_DireccionEntrega,lote_Id:e.lote_Id,lote_CodigoLote:e.lote_CodigoLote,lote_Observaciones:e.lote_Observaciones,mate_Descripcion:e.mate_Descripcion,subc_Descripcion:e.subc_Descripcion,cate_Descripcion:e.cate_Descripcion,ppde_Cantidad:e.ppde_Cantidad,unme_Descripcion:e.unme_Descripcion,tipa_area:e.tipa_area,colr_Nombre:e.colr_Nombre,colr_Codigo:e.colr_Codigo,colr_CodigoHtml:e.colr_CodigoHtml,prov_NombreCompania:e.prov_NombreCompania,prov_CorreoElectronico:e.prov_CorreoElectronico,prov_Telefono:e.prov_Telefono,pvin_Codigo:e.pvin_Codigo,pvin_Nombre:e.pvin_Nombre,pais_Nombre:e.pais_Nombre,peor_FechaEntrada:e.peor_FechaEntrada,esti_Descripcion:e.esti_Descripcion,code_Sexo:e.code_Sexo,tall_Codigo:e.tall_Codigo,tall_Nombre:e.tall_Nombre}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function u(){return(u=(0,n.Z)((0,r.Z)().mark((function e(t,n){var a,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={mate_FechaInicio:t,mate_FechaLimite:n},e.next=4,o.post("CostosMaterialesNoBrindados",a);case 4:return i=e.sent,c=i.data.data.map((function(e,t){return{key:t+1,mate_Descripcion:e.mate_Descripcion,totalCantidad:e.totalCantidad,porcentajeProductos:e.porcentajeProductos,precioPromedioMaterial:e.precioPromedioMaterial}})),e.abrupt("return",c);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function m(){return(m=(0,n.Z)((0,r.Z)().mark((function e(t,n){var a,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={fecha_inicio:t,fecha_fin:n},e.next=4,o.post("Consumo_Materiales",a);case 4:return i=e.sent,c=i.data.data.map((function(e,t){return{key:t+1,mate_Descripcion:e.mate_Descripcion,totalMaterial:e.totalMaterial,promedioMaterial:e.promedioMaterial,porcentajeMaterial:e.porcentajeMaterial}})),e.abrupt("return",c);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function h(){return(h=(0,n.Z)((0,r.Z)().mark((function e(t,n,a){var i,c,l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={tipa_Id:t.value,fechaInicio:n,fechaFin:a},console.log(i),e.next=5,o.post("ProduccionAreas",i);case 5:return c=e.sent,l=c.data.data.map((function(e,t){var o=JSON.parse(e.detalles);return{key:t+1,tipa_Id:e.tipa_Id,tipa_area:e.tipa_area,proc_Id:e.proc_Id,proc_Descripcion:e.proc_Descripcion,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usarioCreacion:e.usarioCreacion,tipa_FechaCreacion:e.tipa_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,usuarioModificacion:e.usuarioModificacion,tipa_FechaModificacion:e.tipa_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,usuarioEliminacion:e.usuarioEliminacion,tipa_FechaEliminacion:e.tipa_FechaEliminacion,tipa_Estado:e.tipa_Estado,fechaInicio:e.fechaInicio,fechaFin:e.fechaFin,porcentajeDanado:e.porcentajeDanado,porcentajeBueno:e.porcentajeBueno,totalPeriodo:e.totalPeriodo,totalDanado:e.totalDanado,totalExitoso:e.totalExitoso,promedioDia:e.promedioDia,promedioDanado:e.promedioDanado,promedioExitoso:e.promedioExitoso,detalles:o}})),console.log(l),e.abrupt("return",l);case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function x(){return(x=(0,n.Z)((0,r.Z)().mark((function e(t,n){var a,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={fechaInicio:t,fechaFin:n},e.next=4,o.post("MaterialesIngreso",a);case 4:return i=e.sent,c=i.data.data.map((function(e,t){return{key:t+1,peor_Id:e.peor_Id,peor_Codigo:e.peor_Codigo,prov_NombreCompania:e.prov_NombreCompania,prov_NombreContacto:e.prov_NombreContacto,duca_Id:e.duca_Id,ciud_Nombre:e.ciud_Nombre,pais_Nombre:e.pais_Nombre,peor_FechaEntrada:e.peor_FechaEntrada,lote_Stock:e.lote_Stock,mate_Descripcion:e.mate_Descripcion,prod_Cantidad:e.prod_Cantidad}})),e.abrupt("return",c);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function f(){return(f=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.prev=1,n={orco_Codigo:t},console.log(n),e.next=6,o.post("SeguimientodeProcesosporPO",n);case 6:return a=e.sent,i=a.data.data.map((function(e,t){var o=JSON.parse(e.seguimientoProcesos);return{key:t+1,orco_Id:e.orco_Id,orco_Codigo:e.orco_Codigo,clie_Nombre_O_Razon_Social:e.clie_Nombre_O_Razon_Social,orco_EstadoFinalizado:e.orco_EstadoFinalizado,orco_EstadoOrdenCompra:e.orco_EstadoOrdenCompra,code_Id:e.code_Id,proc_Actual:e.proc_Actual,proc_Comienza:e.proc_Comienza,code_CantidadPrenda:e.code_CantidadPrenda,esti_Descripcion:e.esti_Descripcion,tall_Nombre:e.tall_Nombre,code_Sexo:e.code_Sexo,colr_Nombre:e.colr_Nombre,ordenProduccion:e.ordenProduccion,faex_Id:e.faex_Id,fechaExportacion:e.fechaExportacion,cantidadExportada:e.cantidadExportada,fede_Cajas:e.fede_Cajas,fede_TotalDetalle:e.fede_TotalDetalle,seguimientoProcesos:o}})),e.abrupt("return",i);case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)}function _(){return(_=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={modu_Id:t},e.next=4,o.post("Maquina_Uso",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){return{key:t+1,maqu_NumeroSerie:e.maqu_NumeroSerie,enUso:e.enUso,deshabilitada:e.deshabilitada,habilitada:e.habilitada,marq_Nombre:e.marq_Nombre,modu_Nombre:e.modu_Nombre}})),console.log(i),e.abrupt("return",i);case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function b(){return(b=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={mate_id:t},e.next=4,o.post("Inventario",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){var o=JSON.parse(e.detalles);return{key:t+1,mate_Descripcion:e.mate_Descripcion,mate_Imagen:e.mate_Imagen,subc_Descripcion:e.subc_Descripcion,cate_Descripcion:e.cate_Descripcion,colr_Nombre:e.colr_Nombre,stockTotal:e.stockTotal,detalles:o}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}return{TiemposMaquinas:function(e){return a.apply(this,arguments)},ProduccionPorModulo:function(e,t){return l.apply(this,arguments)},PedidosCliente:function(e){return s.apply(this,arguments)},PlanificacionPO:function(e){return d.apply(this,arguments)},CostosMaterialesNoBrindados:function(e,t){return u.apply(this,arguments)},Consumo_Materiales:function(e,t){return m.apply(this,arguments)},MaquinasUso:function(e){return _.apply(this,arguments)},Inventario:function(e){return b.apply(this,arguments)},ProduccionPorAreas:function(e,t,o){return h.apply(this,arguments)},MaterialesPorPo:function(e){return p.apply(this,arguments)},IngresoMateriales:function(e,t){return x.apply(this,arguments)},SeguimientodeProcesosPO:function(e){return f.apply(this,arguments)}}}},41727:function(e,t,o){o.d(t,{Z:function(){return y}});var r=o(4942),n=o(63366),a=o(87462),i=o(47313),c=o(83061),l=o(21921),s=o(91615),d=o(61113),p=o(91397),u=o(99008),m=o(88564),h=o(32298);function x(e){return(0,h.Z)("MuiInputAdornment",e)}var f,_=(0,o(77430).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),b=o(77342),g=o(46417),v=["children","className","component","disablePointerEvents","disableTypography","position","variant"],C=(0,m.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,t["position".concat((0,s.Z)(o.position))],!0===o.disablePointerEvents&&t.disablePointerEvents,t[o.variant]]}})((function(e){var t=e.theme,o=e.ownerState;return(0,a.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(t.vars||t).palette.action.active},"filled"===o.variant&&(0,r.Z)({},"&.".concat(_.positionStart,"&:not(.").concat(_.hiddenLabel,")"),{marginTop:16}),"start"===o.position&&{marginRight:8},"end"===o.position&&{marginLeft:8},!0===o.disablePointerEvents&&{pointerEvents:"none"})})),y=i.forwardRef((function(e,t){var o=(0,b.Z)({props:e,name:"MuiInputAdornment"}),r=o.children,m=o.className,h=o.component,_=void 0===h?"div":h,y=o.disablePointerEvents,j=void 0!==y&&y,Z=o.disableTypography,D=void 0!==Z&&Z,T=o.position,P=o.variant,N=(0,n.Z)(o,v),R=(0,u.Z)()||{},I=P;P&&R.variant,R&&!I&&(I=R.variant);var S=(0,a.Z)({},o,{hiddenLabel:R.hiddenLabel,size:R.size,disablePointerEvents:j,position:T,variant:I}),F=function(e){var t=e.classes,o=e.disablePointerEvents,r=e.hiddenLabel,n=e.position,a=e.size,i=e.variant,c={root:["root",o&&"disablePointerEvents",n&&"position".concat((0,s.Z)(n)),i,r&&"hiddenLabel",a&&"size".concat((0,s.Z)(a))]};return(0,l.Z)(c,x,t)}(S);return(0,g.jsx)(p.Z.Provider,{value:null,children:(0,g.jsx)(C,(0,a.Z)({as:_,ownerState:S,className:(0,c.default)(F.root,m),ref:t},N,{children:"string"!==typeof r||D?(0,g.jsxs)(i.Fragment,{children:["start"===T?f||(f=(0,g.jsx)("span",{className:"notranslate",children:"\u200b"})):null,r]}):(0,g.jsx)(d.Z,{color:"text.secondary",children:r})}))})}))}}]);