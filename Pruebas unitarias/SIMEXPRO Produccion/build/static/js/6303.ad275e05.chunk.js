(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[6303],{14864:function(e,t,n){"use strict";n.r(t);var r=n(4942),i=n(29439),a=n(1413),o=n(45987),l=n(57983),d=n(9506),s=n(61113),c=n(35898),u=n(24193),x=n(71263),h=n(82047),p=n(51405),m=n(73428),f=n(16957),Z=n(93405),j=n(9019),g=n(1550),v=n(5178),b=n(24631),y=n(41727),k=n(15103),C=n(88797),P=n(47131),w=n(94469),I=n(33604),N=n(96467),S=n(97762),B=n(4117),A=n(75908),R=n(65280),E=n(33141),T=n(19860),D=n(28155),F=n(47313),W=n(12547),_=(n(88282),n(71528)),L=n(58467),z=n(45998),M=n(46417),O=["children","value","index"];function $(e){var t=e.children,n=e.value,r=e.index,i=(0,o.Z)(e,O);return(0,M.jsx)("div",(0,a.Z)((0,a.Z)({role:"tabpanel",hidden:n!==r,id:"full-width-tabpanel-".concat(r),"aria-labelledby":"full-width-tab-".concat(r)},i),{},{children:n===r&&(0,M.jsx)(d.Z,{sx:{p:3},children:(0,M.jsx)(s.Z,{children:t})})}))}function q(e){return{id:"full-width-tab-".concat(e),"aria-controls":"full-width-tabpanel-".concat(e)}}t.default=function(){var e=(0,L.s0)(),t=(0,T.Z)(),n=F.useState(0),o=(0,i.Z)(n,2),s=o[0],O=o[1],V=(0,F.useState)(""),G=(0,i.Z)(V,2),U=G[0],H=G[1],J=(0,F.useState)(),K=(0,i.Z)(J,2),Q=(K[0],K[1]),X=(0,F.useState)({tab1:!0,tab2:!0}),Y=(0,i.Z)(X,2),ee=(Y[0],Y[1]),te=function(e){ae((function(t){return(0,a.Z)((0,a.Z)({},t),{},(0,r.Z)({},e,null))}))},ne=(0,F.useState)({}),re=(0,i.Z)(ne,2),ie=re[0],ae=re[1],oe=F.useState(5),le=(0,i.Z)(oe,2),de=le[0],se=le[1],ce=(0,F.useState)(!1),ue=(0,i.Z)(ce,2),xe=ue[0],he=ue[1],pe=function(){he(!xe)},me=[{title:"ID",dataIndex:"id",key:"id",sorter:function(e,t){return e.id-t.id}},{title:"N\xfamero de Lote",dataIndex:"loteN",key:"loteN",sorter:function(e,t){return e.loteN-t.loteN}},{title:"Material",dataIndex:"material",key:"material",sorter:function(e,t){return e.material.localeCompare(t.material)}},{title:"Cantidad a Pedir",dataIndex:"cantidad",key:"cantidad",sorter:function(e,t){return e.cantidad-t.cantidad}},{title:"Acciones",key:"operation",render:function(e){return(0,M.jsx)("div",{children:(0,M.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,M.jsx)(u.Z,{"aria-controls":"menu-".concat(e.id),"aria-haspopup":"true",onClick:function(t){return n=t,i=e.id,void ae((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,r.Z)({},i,n.currentTarget))}));var n,i},variant:"contained",style:{borderRadius:"10px",backgroundColor:"#634A9E",color:"white"},startIcon:(0,M.jsx)(x.Z,{children:"menu"}),children:"Opciones"}),(0,M.jsxs)(h.Z,{id:"menu-".concat(e.id),anchorEl:ie[e.id],keepMounted:!0,open:Boolean(ie[e.id]),onClose:function(){return te(e.id)},children:[(0,M.jsxs)(p.Z,{onClick:function(){return handleEdit(e.id,e.loteN,e.material,e.cantidad)},children:[(0,M.jsx)(x.Z,{children:"edit"}),"\u3164Editar la cantidad"]}),(0,M.jsxs)(p.Z,{onClick:function(){return t=e.id,e.cantidad,pe(),void te(t);var t},children:[(0,M.jsx)(x.Z,{children:"delete"}),"\u3164Eliminar"]})]})]})},e.id)}}],fe=[{key:1,id:"1",loteN:"4385435",material:"Tela clase a",cantidad:"2"},{key:2,id:"2",loteN:"43B735",material:"Tela Clase B",cantidad:"300"},{key:3,id:"3",loteN:"4167895",material:"Botones Rojos",cantidad:"350"},{key:4,id:"4",loteN:"43B735FP",material:"Tela Sat\xedn",cantidad:"30"},{key:5,id:"5",loteN:"43B735FP",material:"Tela Tipo L",cantidad:"234"},{key:6,id:"6",loteN:"43B735FP",material:"Tela Sat\xedn",cantidad:"301"},{key:7,id:"7",loteN:"43B735FP",material:"Tela Sat\xedn",cantidad:"404"},{key:8,id:"8",loteN:"43B735FP",material:"Tela Sat\xedn",cantidad:"398"},{key:9,id:"9",loteN:"43B735FP",material:"Tela Sat\xedn",cantidad:"303"},{key:10,id:"10",loteN:"43B735FP",material:"Tela Sat\xedn",cantidad:"320"},{key:11,id:"11",loteN:"43B735FP",material:"Tela Sat\xedn",cantidad:"3078"}].filter((function(e){return Object.values(e).some((function(e){return"string"===typeof e&&e.toLowerCase().includes(U.toLowerCase())}))}));return(0,M.jsxs)(m.Z,{sx:{minWidth:275,margin:"40px"},children:[(0,M.jsx)(f.Z,{component:"img",height:"200",image:"https://i.ibb.co/ZVVTwPz/PEDIDOS-DE-PRODUCCI-N.png",alt:"Encabezado de la carta"}),(0,M.jsx)(Z.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:(0,M.jsxs)(d.Z,{sx:{bgcolor:"background.paper",width:"100%"},children:[(0,M.jsx)(A.Z,{position:"static",children:(0,M.jsxs)(E.Z,{value:s,onChange:function(e,t){O(t)},indicatorColor:"secondary",textColor:"inherit",variant:"fullWidth","aria-label":"full width tabs example",sx:{backgroundColor:"#e5e1fa",color:z.black},children:[(0,M.jsx)(R.Z,(0,a.Z)({label:"Pedido de producci\xf3n Datos generales"},q(0))),(0,M.jsx)(R.Z,(0,a.Z)({label:"Pedido de producci\xf3n Detalles"},q(1)))]})}),(0,M.jsxs)(W.ZP,{axis:"rtl"===t.direction?"x-reverse":"x",index:s,onChangeIndex:function(e){O(e)},children:[(0,M.jsxs)($,{value:s,index:0,dir:t.direction,children:[(0,M.jsxs)(j.ZP,{container:!0,spacing:2,children:[(0,M.jsx)(j.ZP,{item:!0,xs:6,children:(0,M.jsxs)(g.Z,{fullWidth:!0,children:[(0,M.jsx)(v.Z,{className:"font-medium text-10",component:"legend",children:"Encargado del Pedido:"}),(0,M.jsx)(b.Z,{style:{borderRadius:"3px"},select:!0,placeholder:"Empleado",InputProps:{startAdornment:(0,M.jsx)(y.Z,{position:"start"})}})]})}),(0,M.jsxs)(j.ZP,{item:!0,xs:6,children:[(0,M.jsx)(v.Z,{className:"font-medium text-10",component:"legend",children:"Fecha del Pedido:"}),(0,M.jsx)(_.x,{value:s,onChange:void 0,required:!0,renderInput:function(e){return(0,M.jsx)(b.Z,(0,a.Z)((0,a.Z)({className:"w-full"},e),{},{onBlur:void 0}))},className:"w-full"})]}),(0,M.jsx)(j.ZP,{item:!0,xs:12,children:(0,M.jsxs)(g.Z,{fullWidth:!0,children:[(0,M.jsx)(v.Z,{className:"font-medium text-10",component:"legend",children:"Observaciones:"}),(0,M.jsx)(k.Z,{htmlFor:"grouped-native-select"}),(0,M.jsx)(b.Z,{style:{borderRadius:"3px"},multiline:!0,rows:8,InputProps:{startAdornment:(0,M.jsx)(y.Z,{position:"start"})}})]})})]}),(0,M.jsxs)(j.ZP,{item:!0,xs:12,paddingTop:2,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,M.jsx)(u.Z,{startIcon:(0,M.jsx)(x.Z,{children:"checked"}),variant:"contained",color:"primary",onClick:function(){return e=1,t&&t.preventDefault(),1==e&&(ee({tab1:!1,tab2:!0,tab3:!0,tab4:!0}),O(1)),void(2==e&&(ee({tab1:!1,tab2:!1,tab3:!0,tab4:!0}),O(2)));var e,t},style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},children:"Guardar"}),(0,M.jsx)(u.Z,{startIcon:(0,M.jsx)(x.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:function(t){e("/PedidosProduccion/Index")},children:"Cancelar"})]})]}),(0,M.jsxs)($,{value:s,index:1,dir:t.direction,children:[(0,M.jsxs)(j.ZP,{container:!0,spacing:2,children:[(0,M.jsx)(j.ZP,{item:!0,xs:6,children:(0,M.jsxs)(g.Z,{fullWidth:!0,children:[(0,M.jsx)(v.Z,{className:"font-medium text-10",component:"legend",children:"Id del Lote:"}),(0,M.jsx)(b.Z,{style:{borderRadius:"3px"},InputProps:{startAdornment:(0,M.jsx)(y.Z,{position:"start"})}})]})}),(0,M.jsx)(j.ZP,{item:!0,xs:6,children:(0,M.jsxs)(g.Z,{fullWidth:!0,children:[(0,M.jsx)(v.Z,{className:"font-medium text-10",component:"legend",children:"Material:"}),(0,M.jsx)(b.Z,{style:{borderRadius:"3px"},InputProps:{style:{background:"#d8c9f4",opacity:.2},startAdornment:(0,M.jsx)(y.Z,{position:"start"})},disabled:!0})]})}),(0,M.jsx)(j.ZP,{item:!0,xs:6,children:(0,M.jsxs)(g.Z,{fullWidth:!0,children:[(0,M.jsx)(v.Z,{className:"font-medium text-10",component:"legend",children:"Cantidad a Pedir:"}),(0,M.jsx)(b.Z,{style:{borderRadius:"3px"},value:null,onChange:void 0,InputProps:{startAdornment:(0,M.jsx)(y.Z,{position:"start"})}})]})}),(0,M.jsx)(j.ZP,{item:!0,xs:6,children:(0,M.jsx)(u.Z,{startIcon:(0,M.jsx)(x.Z,{children:"add"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px",marginTop:"15px"},sx:{backgroundColor:"#d1af3c",color:"white","&:hover":{backgroundColor:"#6e52ae"}},children:"Agregar"})})]}),(0,M.jsx)("div",{style:{marginTop:"30px",display:"flex",justifyContent:"flex-end"},children:(0,M.jsxs)(c.Z,{direction:"row",spacing:1,children:[(0,M.jsx)("label",{className:"mt-8",children:"Filas por p\xe1gina:"}),(0,M.jsx)(g.Z,{sx:{minWidth:50},size:"small",children:(0,M.jsxs)(C.Z,{labelId:"demo-select-small-label",id:"demo-select-small",value:de,onChange:function(e){se(e.target.value),Q(e.target.value)},children:[(0,M.jsx)(p.Z,{value:5,children:"5"}),(0,M.jsx)(p.Z,{value:10,children:"10"}),(0,M.jsx)(p.Z,{value:20,children:"20"}),(0,M.jsx)(p.Z,{value:30,children:"30"})]})}),(0,M.jsx)(b.Z,{style:{borderRadius:"10px"},placeholder:"Buscar",value:U,onChange:function(e){H(e.target.value)},size:"small",variant:"outlined",inputProps:{startadornment:(0,M.jsx)(y.Z,{position:"start",children:(0,M.jsx)(P.Z,{edge:"start",children:(0,M.jsx)(l.Z,{})})})}})]})}),(0,M.jsx)("div",{className:"center",style:{width:"95%",margin:"auto",marginTop:"30px"},children:(0,M.jsx)(D.Z,{columns:me,dataSource:fe,size:"small",pagination:{pageSize:de,className:"decoration-white"}})}),(0,M.jsxs)(j.ZP,{item:!0,xs:12,paddingTop:2,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,M.jsx)(u.Z,{startIcon:(0,M.jsx)(x.Z,{children:"checked"}),variant:"contained",color:"primary",onClick:function(t){e("/PedidosProduccion/Index")},style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},children:"Finalizar"}),(0,M.jsx)(u.Z,{startIcon:(0,M.jsx)(x.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:function(t){e("/PedidosProduccion/Index")},children:"Cancelar"}),(0,M.jsxs)(w.Z,{open:xe,fullWidth:!0,onClose:pe,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,M.jsx)(I.Z,{id:"alert-dialog-title",children:"Confirmaci\xf3n de Eliminaci\xf3n"}),(0,M.jsx)(N.Z,{children:(0,M.jsx)(S.Z,{id:"alert-dialog-description",children:"\xbfEst\xe1 seguro(a) que desea eliminar este registro?"})}),(0,M.jsx)(B.Z,{children:(0,M.jsxs)(j.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"right",alignItems:"right"},children:[(0,M.jsx)(u.Z,{startIcon:(0,M.jsx)(x.Z,{children:"checked"}),variant:"contained",color:"primary",style:{borderRadius:"10px",marginRight:"10px"},sx:{backgroundColor:"#634A9E",color:"white","&:hover":{backgroundColor:"#6e52ae"}},onClick:pe,children:"Eliminar"}),(0,M.jsx)(u.Z,{startIcon:(0,M.jsx)(x.Z,{children:"close"}),variant:"contained",color:"primary",style:{borderRadius:"10px"},sx:{backgroundColor:"#DAD8D8",color:"black","&:hover":{backgroundColor:"#BFBABA"}},onClick:pe,children:"Cancelar"})]})})]})]})]})]})]})})]})}},57983:function(e,t,n){"use strict";var r=n(64836);t.Z=void 0;var i=r(n(45045)),a=n(46417),o=(0,i.default)((0,a.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.Z=o},35898:function(e,t,n){"use strict";var r=n(4942),i=n(63366),a=n(87462),o=n(47313),l=n(54929),d=n(86886),s=n(39028),c=n(13019),u=n(88564),x=n(77342),h=n(46417),p=["component","direction","spacing","divider","children"];function m(e,t){var n=o.Children.toArray(e).filter(Boolean);return n.reduce((function(e,r,i){return e.push(r),i<n.length-1&&e.push(o.cloneElement(t,{key:"separator-".concat(i)})),e}),[])}var f=(0,u.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return[t.root]}})((function(e){var t=e.ownerState,n=e.theme,i=(0,a.Z)({display:"flex",flexDirection:"column"},(0,l.k9)({theme:n},(0,l.P$)({values:t.direction,breakpoints:n.breakpoints.values}),(function(e){return{flexDirection:e}})));if(t.spacing){var o=(0,d.hB)(n),s=Object.keys(n.breakpoints.values).reduce((function(e,n){return("object"===typeof t.spacing&&null!=t.spacing[n]||"object"===typeof t.direction&&null!=t.direction[n])&&(e[n]=!0),e}),{}),u=(0,l.P$)({values:t.direction,base:s}),x=(0,l.P$)({values:t.spacing,base:s});"object"===typeof u&&Object.keys(u).forEach((function(e,t,n){if(!u[e]){var r=t>0?u[n[t-1]]:"column";u[e]=r}}));i=(0,c.Z)(i,(0,l.k9)({theme:n},x,(function(e,n){return{"& > :not(style) + :not(style)":(0,r.Z)({margin:0},"margin".concat((i=n?u[n]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[i])),(0,d.NA)(o,e))};var i})))}return i=(0,l.dt)(n.breakpoints,i)})),Z=o.forwardRef((function(e,t){var n=(0,x.Z)({props:e,name:"MuiStack"}),r=(0,s.Z)(n),o=r.component,l=void 0===o?"div":o,d=r.direction,c=void 0===d?"column":d,u=r.spacing,Z=void 0===u?0:u,j=r.divider,g=r.children,v=(0,i.Z)(r,p),b={direction:c,spacing:Z};return(0,h.jsx)(f,(0,a.Z)({as:l,ownerState:b,ref:t},v,{children:j?m(g,j):g}))}));t.Z=Z},77906:function(e,t,n){"use strict";var r;function i(){if(r)return r;var e=document.createElement("div"),t=document.createElement("div");return t.style.width="10px",t.style.height="1px",e.appendChild(t),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),r="reverse",e.scrollLeft>0?r="default":(e.scrollLeft=1,0===e.scrollLeft&&(r="negative")),document.body.removeChild(e),r}function a(e,t){var n=e.scrollLeft;if("rtl"!==t)return n;switch(i()){case"negative":return e.scrollWidth-e.clientWidth+n;case"reverse":return e.scrollWidth-e.clientWidth-n;default:return n}}n.d(t,{E:function(){return i},T:function(){return a}})},63405:function(e,t,n){var r=n(73897);e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.__esModule=!0,e.exports.default=e.exports},79498:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},42281:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},861:function(e,t,n){var r=n(63405),i=n(79498),a=n(86116),o=n(42281);e.exports=function(e){return r(e)||i(e)||a(e)||o()},e.exports.__esModule=!0,e.exports.default=e.exports}}]);