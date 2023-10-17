"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[9587],{79587:function(e,t,o){o.r(t);var r=o(36459),n=o(1413),a=o(74165),i=o(15861),c=o(29439),s=o(38814),l=o(9019),d=o(73428),u=o(16957),p=o(1550),m=o(5178),f=o(88797),h=o(51405),_=o(65033),x=o(24193),g=o(71263),b=o(47313),v=o(521),C=o(68673),y=o(58631),Z=o(22408),j=o(31881),N=o.n(j),k=o(83142),S=o(85281),D=o(46417),w=new Date,I=w.getDate(),P=w.getMonth()+1,T=w.getFullYear(),M=w.getHours(),R=w.getMinutes(),E=w.getSeconds(),F="".concat(I,"/").concat(P,"/").concat(T," ").concat(M,":").concat(R,":").concat(E);s.Zx.register({family:"Arial",fonts:[{src:"https://db.onlinewebfonts.com/t/8d223b3ad8d4819e9dcf22757e4cc2c4.ttf"},{src:"https://db.onlinewebfonts.com/t/3d6b457e3aa0c0b78e6fbf0355bc43a6.ttf",fontWeight:"bold"}]});var z=s.mM.create({cellWithLine:{position:"relative",marginBottom:10},header:{fontSize:12,marginBottom:20,textAlign:"center",color:"grey"},line:{top:20,bottom:0,left:0,width:"100%",height:1,backgroundColor:"#000000"},line2:{top:0,bottom:0,left:0,width:"100%",height:1},lineItems:{top:5,bottom:0,left:0,width:"100%",height:1,backgroundColor:"#000000"},page:{flexDirection:"column",backgroundColor:"white",padding:25},innerheader:{fontWeight:"bold",fontFamily:"Times-Roman",fontSize:14,marginBottom:5},image:{alignItems:"flex-end",justifyContent:"flex-end",position:"absolute",top:5,right:30},imageLogoLetras:{alignItems:"center",justifyContent:"center",top:0},title:{top:70,right:90,fontSize:24,textAlign:"center",fontFamily:"Times-Roman"},divisor:{fontSize:18,left:20,textAlign:"left",fontFamily:"Times-Roman"},subtitle:{top:69,left:50,right:20,bottom:30,fontSize:15,textAlign:"center",fontFamily:"Times-Roman"},pageNumber:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"right",color:"grey"},pageUser:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"center",color:"grey"},pageDate:{position:"absolute",fontSize:9,bottom:20,left:30,right:30,textAlign:"left",color:"grey"},columnsContainer:{flexDirection:"column"},column:{marginBottom:10},columnsContainer1:{padding:30,top:0,right:0,flexDirection:"row"},columnsContainer2:{top:0,right:0,flexDirection:"row"},headerContainer:{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10,marginBottom:20},headerParteIzq:{alignItems:"flex-end",justifyContent:"flex-end",position:"absolute",top:0},column1:{flex:1,marginRight:15},column2:{flex:1,marginLeft:15},tableContainer:{borderWidth:1,margin:"5px",borderColor:"#dedede"},tableContainerMateriales:{borderWidth:1,margin:"5px",borderColor:"#ebebeb"},tableContainerTransparente:{borderWidth:1,textAlign:"center",margin:"10px",borderColor:"white"},tableTitle:{fontSize:14,textAlign:"left",padding:8,color:"white",backgroundColor:"#634a9eb0",fontFamily:"Times-Roman"},tableHeader:{flexDirection:"row",backgroundColor:"white"},tableRow:{flexDirection:"row",border:"none"},tableCell:{flex:1,borderWidth:1,borderColor:"black",padding:10},tableCellRegistors:{flex:1,borderWidth:0,padding:3,textAlign:"left"},tableCellRegistorsItem:{flex:1,borderWidth:1,borderColor:"white",padding:3,textAlign:"left",left:18},tableCellRegistorsItemDerecha:{flex:1,borderWidth:1,borderColor:"white",padding:3,textAlign:"left",left:5},encabezadoHeader:{borderWidth:1,fontFamily:"Times-Roman",borderColor:"white",textAlign:"left"},cellTextHeader:{fontSize:12,fontWeight:"bold"},cellTextHeaderItems:{fontSize:12,fontWeight:"bold",left:15,bottom:5},cellText:{fontSize:11,padding:2,fontFamily:"Times-Roman"},cellTextUnderline:{fontSize:12,textDecorationLine:"underline"},cellTextTabla:{fontSize:10,fontFamily:"Times-Roman"},cellTextRegistros:{fontSize:11,fontFamily:"Times-Roman"},headerCellText:{fontSize:12,fontFamily:"Times-Roman",textAlign:"center",backgroundColor:"#ebebeb"},detallesTitle:{top:35,left:20,fontSize:20,fontFamily:"Times-Roman"},headerTextoDerecho:{top:10,textAlign:"right",fontSize:9,fontFamily:"Times-Roman"},columnsContainer3:{top:0,right:0},lineGrafica:{top:5,bottom:0,left:0,width:"100%",height:1,backgroundColor:"#000000"},ContainerGrafica:{top:0,right:0,width:"100%"}});t.default=function(){var e=(0,b.useState)([]),t=(0,c.Z)(e,2),o=t[0],j=t[1],w=(0,b.useState)(-1),I=(0,c.Z)(w,2),P=I[0],T=I[1],M=(0,b.useState)([]),R=(0,c.Z)(M,2),E=R[0],O=R[1],G=(0,Z.v9)(y.dy),q=(0,b.useState)([]),A=(0,c.Z)(q,2),U=A[0],B=A[1],W=(0,b.useState)(""),L=(0,c.Z)(W,2),H=L[0],X=L[1];(0,b.useEffect)((function(){V()}),[P]);var J=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t){var o,r,n,i,c,s,l,d,u,p,m;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return T(t),e.prev=1,B("cargando"),o=(0,k.Z)(),e.next=6,o.MaquinasUso(t);case 6:return r=e.sent,j(r),n=0,i=0,0,r.forEach((function(e){!1===e.enUso&&(i+=1),!0===e.enUso&&(n+=1)})),s={type:"outlabeledPie",data:{labels:["En Uso","No en Uso"],datasets:[{label:"Porcentaje de Maquinas Segun su Estado",data:[n=n/(c=n+i)*100,i=i/c*100],backgroundColor:["#588CBC80","#FED9B780"],borderColor:["#588CBC","#FED9B7"],borderWidth:1}]},options:{title:{align:"end",display:!0,position:"top",text:"Porcentaje de Maquinas Segun su Estado"},plugins:{legend:!1,outlabels:{text:"%l %p",color:"white",stretch:35,font:{resizable:!0,minSize:12,maxSize:18}}}}},l=JSON.stringify(s),d=encodeURIComponent(l),u="https://quickchart.io/chart?c=".concat(d),e.next=23,N().get(u);case 23:p=e.sent,m=p.request,X(m.responseURL),0===r.length?B("cargado"):B(r),e.next=31;break;case 29:e.prev=29,e.t0=e.catch(1);case 31:case"end":return e.stop()}}),e,null,[[1,29]])})));return function(t){return e.apply(this,arguments)}}(),V=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(){var t,o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=(0,C.Z)(),e.next=4,t.Modulos();case 4:o=e.sent,O(o),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),Q=function(){var e;return(0,D.jsx)(s.BB,{title:"ReporteTiemposMaquina.pdf",creator:"SIMEXPRO",author:"SIMEXPRO",children:(0,D.jsxs)(s.T3,{size:"A4",style:(0,n.Z)({},z.page),children:[(0,D.jsx)(s.G7,{style:z.headerParteIzq,fixed:!0,children:(0,D.jsx)(s.Ee,{src:"https://i.ibb.co/9V2sMk2/Header-parte-izquierda.png",style:{height:40,width:210}})}),(0,D.jsx)(s.G7,{style:z.image,fixed:!0,children:(0,D.jsx)(s.Ee,{src:"https://i.ibb.co/Qng4RgN/SIMEXPRO-LETRAS-LOGO.png",style:{height:38,width:100}})}),(0,D.jsxs)(s.G7,{style:z.columnsContainer3,fixed:!0,children:[(0,D.jsx)(s.xv,{style:z.detallesTitle,children:"Reporte Estado Maquinas"}),(0,D.jsx)(s.xv,{style:z.headerTextoDerecho,children:"\u200e "}),(0,D.jsx)(s.xv,{style:z.headerTextoDerecho,children:"\u200e "})]}),(0,D.jsx)(s.G7,{style:z.line,fixed:!0}),(0,D.jsx)(s.G7,{style:{marginBottom:30},fixed:!0}),(0,D.jsxs)(s.G7,{style:{display:"flex"},children:[(0,D.jsx)(s.G7,{style:(0,n.Z)((0,n.Z)({},z.tableContainerTransparente),{},{border:"1px solid #634a9e",padding:"2%",textTransform:"uppercase",marginBottom:"-6px"}),children:(0,D.jsx)(s.xv,{style:(0,n.Z)((0,n.Z)({},z.tableTitle),{},{fontWeight:"bold"}),children:0===P?"Registro de todas las Maquinas":o[0]&&"Registro de Maquinas ".concat(null===(e=o[0])||void 0===e?void 0:e.modu_Nombre)})}),(0,D.jsxs)(s.G7,{style:(0,n.Z)((0,n.Z)({},z.tableContainerTransparente),{},{textTransform:"uppercase"}),children:[(0,D.jsxs)(s.G7,{style:(0,n.Z)((0,n.Z)({},z.tableRow),{},{backgroundColor:"#dcc26599",border:"none"}),children:[(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:"No. de Serie"})}),(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:"Marca"})}),(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:"En Uso"})}),(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:"Deshabilitada"})}),(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:"Habilitada"})})]}),o&&o.length>0?o.map((function(e,t){return(0,D.jsxs)(s.G7,{style:[z.tableRow,{backgroundColor:t%2===0?"#fff":"#eee"}],children:[(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:e.maqu_NumeroSerie})}),(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:e.marq_Nombre})}),(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:!1===e.enUso?"NO":!0===e.enUso?"SI":""})}),(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:o.length>0&&o[t].deshabilitada?o[t].deshabilitada.slice(0,o[t].deshabilitada.indexOf("T")):" "})}),(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:!1===e.enUso?"INDEFINIDO":!0===e.enUso&&o.length>0&&o[t].habilitada?o[t].habilitada.slice(0,o[t].habilitada.indexOf("T")):null})})]},t)})):(0,D.jsx)(s.G7,{style:(0,n.Z)((0,n.Z)({},z.tableRow),{},{backgroundColor:"#eee"}),children:(0,D.jsx)(s.G7,{style:z.tableCellRegistors,children:(0,D.jsx)(s.xv,{style:z.cellText,children:"No se encontraron datos"})})})]})]}),(0,D.jsx)(s.G7,{style:{marginBottom:5}}),(0,D.jsx)(s.G7,{style:(0,n.Z)((0,n.Z)({},z.line2),{},{backgroundColor:"#d6d6d6",marginTop:"10px",marginBottom:"8px"})}),(0,D.jsx)(s.G7,{style:z.ContainerGrafica,children:(0,D.jsx)(s.Ee,{src:H,style:{width:"100%"}})}),(0,D.jsx)(s.xv,{style:z.pageDate,render:function(e){return(0,r.Z)(e),"Fecha de Impresi\xf3n: ".concat(F)},fixed:!0}),(0,D.jsx)(s.xv,{style:(0,n.Z)((0,n.Z)({},z.pageUser),{},{textTransform:"capitalize"}),render:function(e){return(0,r.Z)(e),"Usuario: ".concat(G.data.displayName)},fixed:!0}),(0,D.jsx)(s.xv,{style:z.pageNumber,render:function(e){var t=e.pageNumber,o=e.totalPages;return"P\xe1gina: ".concat(t," / ").concat(o)},fixed:!0})]})})},Y=function(){var e=(0,b.useState)(!0),t=(0,c.Z)(e,2),o=t[0],r=t[1];(0,b.useEffect)((function(){var e=setTimeout((function(){r(!1)}),750);return function(){clearTimeout(e)}}),[]);var n=(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(s.WD,{document:(0,D.jsx)(Q,{}),fileName:"Reporte.pdf",children:" "}),(0,D.jsx)(s.Z$,{style:{width:"100%",height:"100vh"},children:(0,D.jsx)(Q,{})})]});return o?(0,D.jsx)(D.Fragment,{children:(0,D.jsxs)(l.ZP,{container:!0,width:"100%",spacing:2,marginBottom:"20px",display:"flex",justifyContent:"center",alignContent:"center",children:[(0,D.jsx)(l.ZP,{item:!0,xs:12,display:"flex",justifyContent:"center",alignContent:"center",children:(0,D.jsx)(S.Z,{style:{color:"#634a9e"}})}),(0,D.jsx)(l.ZP,{item:!0,xs:12,display:"flex",justifyContent:"center",alignContent:"center",children:"Generando documento..."})]})}):n};return(0,D.jsx)(D.Fragment,{children:(0,D.jsxs)(d.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,D.jsx)(u.Z,{component:"img",height:"200",className:"mb-24",image:"https://i.ibb.co/WcYVdCq/REPORTE-DE-M-QUINA.png",alt:"Encabezado de la carta"}),(0,D.jsxs)(l.ZP,{container:!0,spacing:3,children:[(0,D.jsx)(l.ZP,{item:!0,xs:6,md:6,className:"mx-auto",children:(0,D.jsxs)(p.Z,{fullWidth:!0,children:[(0,D.jsx)(m.Z,{className:"mt-5",children:"Modulo"}),(0,D.jsxs)(f.Z,{size:"small",value:P,onChange:function(e){J(e.target.value)},children:[(0,D.jsx)(h.Z,{value:-1,children:"Selecciona una Modulo"},-1),(0,D.jsx)(h.Z,{value:0,children:"Ver Todos"},0),E.map((function(e){return(0,D.jsx)(h.Z,{value:e.value,children:e.label},e.value)}))]})]})}),(0,D.jsxs)(l.ZP,{item:!0,xs:12,children:[(0,D.jsx)(_.Z,{timeout:0,in:"cargando"===U,children:(0,D.jsxs)(l.ZP,{container:!0,width:"100%",spacing:2,marginBottom:"20px",display:"flex",justifyContent:"center",alignContent:"center",children:[(0,D.jsx)(l.ZP,{item:!0,xs:12,display:"flex",justifyContent:"center",alignContent:"center",children:(0,D.jsx)(S.Z,{style:{color:"#634a9e"}})}),(0,D.jsx)(l.ZP,{item:!0,xs:12,display:"flex",justifyContent:"center",alignContent:"center",children:"Generando documento..."})]})}),(0,D.jsx)(_.Z,{timeout:0,in:U.length>0&&"cargando"!==U&&"cargado"!==U||"cargado"===U,children:(0,D.jsx)(Y,{})})]})]}),(0,D.jsx)(x.Z,{variant:"contained",style:{position:"fixed",top:"76%",right:"5%"},onClick:function(){v.Z.push("/Inicio/Produccion")},startIcon:(0,D.jsx)(g.Z,{children:"arrow_back"}),children:"Regresar"})]})})}},83142:function(e,t,o){var r=o(74165),n=o(15861),a=o(31881),i=o.n(a),c=o(9098);t.Z=function(){var e={XApiKey:c.Z.extraerToken()},t="".concat("https://practicaacademia.somee.com/","api/Reportes/"),o=i().create({baseURL:t,headers:e});function a(){return(a=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={maqu_Id:t},e.next=4,o.post("TiemposMaquinas",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){return{key:t+1,maqu_Id:e.maqu_Id,maqu_NumeroSerie:e.maqu_NumeroSerie,marq_Nombre:e.marq_Nombre,diasActiva:e.diasActiva,diasInactiva:e.diasInactiva,diasTotalesInactiva:e.diasTotalesInactiva,mahi_Observaciones:e.mahi_Observaciones}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function s(){return(s=(0,n.Z)((0,r.Z)().mark((function e(t,n){var a,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={fecha_inicio:t,fecha_fin:n},e.next=4,o.post("ProduccionPorModulo",a);case 4:return i=e.sent,c=i.data.data.map((function(e,t){return{key:t+1,modu_Nombre:e.modu_Nombre,totalProduccion:e.totalProduccion,promedioCantidad:e.promedioCantidad,promedioDanio:e.promedioDanio,promedioProduccion:e.promedioProduccion}})),e.abrupt("return",c);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function l(){return(l=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={clie_Id:t},e.next=4,o.post("PedidosCliente",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){var o=JSON.parse(e.detalles);return{key:t+1,modu_Nombre:e.modu_Nombre,pedidosTerminados:e.pedidosTerminados,pedidosPendientes:e.pedidosPendientes,pedidosCurso:e.pedidosCurso,procentajeCompletado:e.procentajeCompletado,clie_Nombre_O_Razon_Social:e.clie_Nombre_O_Razon_Social,clie_RTN:e.clie_RTN,clie_Nombre_Contacto:e.clie_Nombre_Contacto,clie_Numero_Contacto:e.clie_Numero_Contacto,clie_Correo_Electronico:e.clie_Correo_Electronico,detalles:o}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function d(){return(d=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={orco_Id:t},e.next=4,o.post("PlanificacionPO",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){return{key:t+1,orco_Id:e.orco_Id,asor_OrdenDetId:e.asor_OrdenDetId,esti_Descripcion:e.esti_Descripcion,colr_Nombre:e.colr_Nombre,tall_Nombre:e.tall_Nombre,asor_FechaInicio:e.asor_FechaInicio,asor_FechaLimite:e.asor_FechaLimite,asor_Cantidad:e.asor_Cantidad,proc_Descripcion:e.proc_Descripcion,empl_NombreCompleto:e.empl_NombreCompleto,clie_Nombre_O_Razon_Social:e.clie_Nombre_O_Razon_Social}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function u(){return(u=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={orco_Id:t},e.next=4,o.post("MaterialesPorPO",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){return{key:t+1,orco_Id:e.orco_Id,orco_Codigo:e.orco_Codigo,clie_Nombre_O_Razon_Social:e.clie_Nombre_O_Razon_Social,clie_Direccion:e.clie_Direccion,clie_RTN:e.clie_RTN,clie_Nombre_Contacto:e.clie_Nombre_Contacto,clie_Correo_Electronico:e.clie_Correo_Electronico,clie_FAX:e.clie_FAX,orco_FechaEmision:e.orco_FechaEmision,orco_FechaLimite:e.orco_FechaLimite,fopa_Descripcion:e.fopa_Descripcion,tiem_Descripcion:e.tiem_Descripcion,orco_MetodoPago:e.orco_MetodoPago,orco_DireccionEntrega:e.orco_DireccionEntrega,lote_Id:e.lote_Id,lote_CodigoLote:e.lote_CodigoLote,lote_Observaciones:e.lote_Observaciones,mate_Descripcion:e.mate_Descripcion,subc_Descripcion:e.subc_Descripcion,cate_Descripcion:e.cate_Descripcion,ppde_Cantidad:e.ppde_Cantidad,unme_Descripcion:e.unme_Descripcion,tipa_area:e.tipa_area,colr_Nombre:e.colr_Nombre,colr_Codigo:e.colr_Codigo,colr_CodigoHtml:e.colr_CodigoHtml,prov_NombreCompania:e.prov_NombreCompania,prov_CorreoElectronico:e.prov_CorreoElectronico,prov_Telefono:e.prov_Telefono,pvin_Codigo:e.pvin_Codigo,pvin_Nombre:e.pvin_Nombre,pais_Nombre:e.pais_Nombre,peor_FechaEntrada:e.peor_FechaEntrada,esti_Descripcion:e.esti_Descripcion,code_Sexo:e.code_Sexo,tall_Codigo:e.tall_Codigo,tall_Nombre:e.tall_Nombre}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function p(){return(p=(0,n.Z)((0,r.Z)().mark((function e(t,n){var a,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={mate_FechaInicio:t,mate_FechaLimite:n},e.next=4,o.post("CostosMaterialesNoBrindados",a);case 4:return i=e.sent,c=i.data.data.map((function(e,t){return{key:t+1,mate_Descripcion:e.mate_Descripcion,totalCantidad:e.totalCantidad,porcentajeProductos:e.porcentajeProductos,precioPromedioMaterial:e.precioPromedioMaterial}})),e.abrupt("return",c);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function m(){return(m=(0,n.Z)((0,r.Z)().mark((function e(t,n){var a,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={fecha_inicio:t,fecha_fin:n},e.next=4,o.post("Consumo_Materiales",a);case 4:return i=e.sent,c=i.data.data.map((function(e,t){return{key:t+1,mate_Descripcion:e.mate_Descripcion,totalMaterial:e.totalMaterial,promedioMaterial:e.promedioMaterial,porcentajeMaterial:e.porcentajeMaterial}})),e.abrupt("return",c);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function f(){return(f=(0,n.Z)((0,r.Z)().mark((function e(t,n,a){var i,c,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i={tipa_Id:t.value,fechaInicio:n,fechaFin:a},console.log(i),e.next=5,o.post("ProduccionAreas",i);case 5:return c=e.sent,s=c.data.data.map((function(e,t){var o=JSON.parse(e.detalles);return{key:t+1,tipa_Id:e.tipa_Id,tipa_area:e.tipa_area,proc_Id:e.proc_Id,proc_Descripcion:e.proc_Descripcion,usua_UsuarioCreacion:e.usua_UsuarioCreacion,usarioCreacion:e.usarioCreacion,tipa_FechaCreacion:e.tipa_FechaCreacion,usua_UsuarioModificacion:e.usua_UsuarioModificacion,usuarioModificacion:e.usuarioModificacion,tipa_FechaModificacion:e.tipa_FechaModificacion,usua_UsuarioEliminacion:e.usua_UsuarioEliminacion,usuarioEliminacion:e.usuarioEliminacion,tipa_FechaEliminacion:e.tipa_FechaEliminacion,tipa_Estado:e.tipa_Estado,fechaInicio:e.fechaInicio,fechaFin:e.fechaFin,porcentajeDanado:e.porcentajeDanado,porcentajeBueno:e.porcentajeBueno,totalPeriodo:e.totalPeriodo,totalDanado:e.totalDanado,totalExitoso:e.totalExitoso,promedioDia:e.promedioDia,promedioDanado:e.promedioDanado,promedioExitoso:e.promedioExitoso,detalles:o}})),console.log(s),e.abrupt("return",s);case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}function h(){return(h=(0,n.Z)((0,r.Z)().mark((function e(t,n){var a,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={fechaInicio:t,fechaFin:n},e.next=4,o.post("MaterialesIngreso",a);case 4:return i=e.sent,c=i.data.data.map((function(e,t){return{key:t+1,peor_Id:e.peor_Id,peor_Codigo:e.peor_Codigo,prov_NombreCompania:e.prov_NombreCompania,prov_NombreContacto:e.prov_NombreContacto,duca_Id:e.duca_Id,ciud_Nombre:e.ciud_Nombre,pais_Nombre:e.pais_Nombre,peor_FechaEntrada:e.peor_FechaEntrada,lote_Stock:e.lote_Stock,mate_Descripcion:e.mate_Descripcion,prod_Cantidad:e.prod_Cantidad}})),e.abrupt("return",c);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function _(){return(_=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.prev=1,n={orco_Codigo:t},console.log(n),e.next=6,o.post("SeguimientodeProcesosporPO",n);case 6:return a=e.sent,i=a.data.data.map((function(e,t){var o=JSON.parse(e.seguimientoProcesos);return{key:t+1,orco_Id:e.orco_Id,orco_Codigo:e.orco_Codigo,clie_Nombre_O_Razon_Social:e.clie_Nombre_O_Razon_Social,orco_EstadoFinalizado:e.orco_EstadoFinalizado,orco_EstadoOrdenCompra:e.orco_EstadoOrdenCompra,code_Id:e.code_Id,proc_Actual:e.proc_Actual,proc_Comienza:e.proc_Comienza,code_CantidadPrenda:e.code_CantidadPrenda,esti_Descripcion:e.esti_Descripcion,tall_Nombre:e.tall_Nombre,code_Sexo:e.code_Sexo,colr_Nombre:e.colr_Nombre,ordenProduccion:e.ordenProduccion,faex_Id:e.faex_Id,fechaExportacion:e.fechaExportacion,cantidadExportada:e.cantidadExportada,fede_Cajas:e.fede_Cajas,fede_TotalDetalle:e.fede_TotalDetalle,seguimientoProcesos:o}})),e.abrupt("return",i);case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)}function x(){return(x=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={modu_Id:t},e.next=4,o.post("Maquina_Uso",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){return{key:t+1,maqu_NumeroSerie:e.maqu_NumeroSerie,enUso:e.enUso,deshabilitada:e.deshabilitada,habilitada:e.habilitada,marq_Nombre:e.marq_Nombre,modu_Nombre:e.modu_Nombre}})),console.log(i),e.abrupt("return",i);case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function g(){return(g=(0,n.Z)((0,r.Z)().mark((function e(t){var n,a,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={mate_id:t},e.next=4,o.post("Inventario",n);case 4:return a=e.sent,i=a.data.data.map((function(e,t){var o=JSON.parse(e.detalles);return{key:t+1,mate_Descripcion:e.mate_Descripcion,mate_Imagen:e.mate_Imagen,subc_Descripcion:e.subc_Descripcion,cate_Descripcion:e.cate_Descripcion,colr_Nombre:e.colr_Nombre,stockTotal:e.stockTotal,detalles:o}})),e.abrupt("return",i);case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}return{TiemposMaquinas:function(e){return a.apply(this,arguments)},ProduccionPorModulo:function(e,t){return s.apply(this,arguments)},PedidosCliente:function(e){return l.apply(this,arguments)},PlanificacionPO:function(e){return d.apply(this,arguments)},CostosMaterialesNoBrindados:function(e,t){return p.apply(this,arguments)},Consumo_Materiales:function(e,t){return m.apply(this,arguments)},MaquinasUso:function(e){return x.apply(this,arguments)},Inventario:function(e){return g.apply(this,arguments)},ProduccionPorAreas:function(e,t,o){return f.apply(this,arguments)},MaterialesPorPo:function(e){return u.apply(this,arguments)},IngresoMateriales:function(e,t){return h.apply(this,arguments)},SeguimientodeProcesosPO:function(e){return _.apply(this,arguments)}}}},16957:function(e,t,o){o.d(t,{Z:function(){return x}});var r=o(63366),n=o(87462),a=o(47313),i=o(83061),c=o(21921),s=o(77342),l=o(88564),d=o(32298);function u(e){return(0,d.Z)("MuiCardMedia",e)}(0,o(77430).Z)("MuiCardMedia",["root","media","img"]);var p=o(46417),m=["children","className","component","image","src","style"],f=(0,l.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState,r=o.isMediaComponent,n=o.isImageComponent;return[t.root,r&&t.media,n&&t.img]}})((function(e){var t=e.ownerState;return(0,n.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},t.isMediaComponent&&{width:"100%"},t.isImageComponent&&{objectFit:"cover"})})),h=["video","audio","picture","iframe","img"],_=["picture","img"],x=a.forwardRef((function(e,t){var o=(0,s.Z)({props:e,name:"MuiCardMedia"}),a=o.children,l=o.className,d=o.component,x=void 0===d?"div":d,g=o.image,b=o.src,v=o.style,C=(0,r.Z)(o,m),y=-1!==h.indexOf(x),Z=!y&&g?(0,n.Z)({backgroundImage:'url("'.concat(g,'")')},v):v,j=(0,n.Z)({},o,{component:x,isMediaComponent:y,isImageComponent:-1!==_.indexOf(x)}),N=function(e){var t=e.classes,o={root:["root",e.isMediaComponent&&"media",e.isImageComponent&&"img"]};return(0,c.Z)(o,u,t)}(j);return(0,p.jsx)(f,(0,n.Z)({className:(0,i.default)(N.root,l),as:x,role:!y&&g?"img":void 0,ref:t,style:Z,ownerState:j,src:y?g||b:void 0},C,{children:a}))}))},85281:function(e,t,o){o.d(t,{Z:function(){return P}});var r=o(30168),n=o(63366),a=o(87462),i=o(47313),c=o(83061),s=o(21921),l=o(30686),d=o(91615),u=o(77342),p=o(88564),m=o(32298);function f(e){return(0,m.Z)("MuiCircularProgress",e)}(0,o(77430).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var h,_,x,g,b,v,C,y,Z=o(46417),j=["className","color","disableShrink","size","style","thickness","value","variant"],N=44,k=(0,l.F4)(b||(b=h||(h=(0,r.Z)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),S=(0,l.F4)(v||(v=_||(_=(0,r.Z)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),D=(0,p.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,t[o.variant],t["color".concat((0,d.Z)(o.color))]]}})((function(e){var t=e.ownerState,o=e.theme;return(0,a.Z)({display:"inline-block"},"determinate"===t.variant&&{transition:o.transitions.create("transform")},"inherit"!==t.color&&{color:(o.vars||o).palette[t.color].main})}),(function(e){return"indeterminate"===e.ownerState.variant&&(0,l.iv)(C||(C=x||(x=(0,r.Z)(["\n      animation: "," 1.4s linear infinite;\n    "]))),k)})),w=(0,p.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(e,t){return t.svg}})({display:"block"}),I=(0,p.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(e,t){var o=e.ownerState;return[t.circle,t["circle".concat((0,d.Z)(o.variant))],o.disableShrink&&t.circleDisableShrink]}})((function(e){var t=e.ownerState,o=e.theme;return(0,a.Z)({stroke:"currentColor"},"determinate"===t.variant&&{transition:o.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(e){var t=e.ownerState;return"indeterminate"===t.variant&&!t.disableShrink&&(0,l.iv)(y||(y=g||(g=(0,r.Z)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),S)})),P=i.forwardRef((function(e,t){var o=(0,u.Z)({props:e,name:"MuiCircularProgress"}),r=o.className,i=o.color,l=void 0===i?"primary":i,p=o.disableShrink,m=void 0!==p&&p,h=o.size,_=void 0===h?40:h,x=o.style,g=o.thickness,b=void 0===g?3.6:g,v=o.value,C=void 0===v?0:v,y=o.variant,k=void 0===y?"indeterminate":y,S=(0,n.Z)(o,j),P=(0,a.Z)({},o,{color:l,disableShrink:m,size:_,thickness:b,value:C,variant:k}),T=function(e){var t=e.classes,o=e.variant,r=e.color,n=e.disableShrink,a={root:["root",o,"color".concat((0,d.Z)(r))],svg:["svg"],circle:["circle","circle".concat((0,d.Z)(o)),n&&"circleDisableShrink"]};return(0,s.Z)(a,f,t)}(P),M={},R={},E={};if("determinate"===k){var F=2*Math.PI*((N-b)/2);M.strokeDasharray=F.toFixed(3),E["aria-valuenow"]=Math.round(C),M.strokeDashoffset="".concat(((100-C)/100*F).toFixed(3),"px"),R.transform="rotate(-90deg)"}return(0,Z.jsx)(D,(0,a.Z)({className:(0,c.default)(T.root,r),style:(0,a.Z)({width:_,height:_},R,x),ownerState:P,ref:t,role:"progressbar"},E,S,{children:(0,Z.jsx)(w,{className:T.svg,ownerState:P,viewBox:"".concat(22," ").concat(22," ").concat(N," ").concat(N),children:(0,Z.jsx)(I,{className:T.circle,style:M,ownerState:P,cx:N,cy:N,r:(N-b)/2,fill:"none",strokeWidth:b})})}))}))},36459:function(e,t,o){function r(e){if(null==e)throw new TypeError("Cannot destructure "+e)}o.d(t,{Z:function(){return r}})}}]);