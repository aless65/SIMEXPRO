"use strict";(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[1782],{67921:function(e,a,t){t.d(a,{Z:function(){return m}});var s=t(29439),r=t(61113),n=t(83061),l=t(70816),i=t.n(l),o=t(47313),c=t(46417);function d(e){var a=e.onComplete,t=(0,o.useState)(i().isMoment(e.endDate)?e.endDate:i()(e.endDate)),l=(0,s.Z)(t,1)[0],d=(0,o.useState)({days:0,hours:0,minutes:0,seconds:0}),m=(0,s.Z)(d,2),u=m[0],x=m[1],f=(0,o.useRef)(),h=(0,o.useCallback)((function(){window.clearInterval(f.current),a&&a()}),[a]),v=(0,o.useCallback)((function(){var e=i()(),a=l.diff(e,"seconds");if(a<0)h();else{var t=i().duration(a,"seconds");x({days:t.asDays().toFixed(0),hours:t.hours(),minutes:t.minutes(),seconds:t.seconds()})}}),[h,l]);return(0,o.useEffect)((function(){return f.current=setInterval(v,1e3),function(){clearInterval(f.current)}}),[v]),(0,c.jsxs)("div",{className:(0,n.default)("flex items-center",e.className),children:[(0,c.jsxs)("div",{className:"flex flex-col items-center justify-center px-12",children:[(0,c.jsx)(r.Z,{variant:"h4",className:"mb-4",children:u.days}),(0,c.jsx)(r.Z,{variant:"caption",color:"text.secondary",children:"days"})]}),(0,c.jsxs)("div",{className:"flex flex-col items-center justify-center px-12",children:[(0,c.jsx)(r.Z,{variant:"h4",className:"mb-4",children:u.hours}),(0,c.jsx)(r.Z,{variant:"caption",color:"text.secondary",children:"hours"})]}),(0,c.jsxs)("div",{className:"flex flex-col items-center justify-center px-12",children:[(0,c.jsx)(r.Z,{variant:"h4",className:"mb-4",children:u.minutes}),(0,c.jsx)(r.Z,{variant:"caption",color:"text.secondary",children:"minutes"})]}),(0,c.jsxs)("div",{className:"flex flex-col items-center justify-center px-12",children:[(0,c.jsx)(r.Z,{variant:"h4",className:"mb-4",children:u.seconds}),(0,c.jsx)(r.Z,{variant:"caption",color:"text.secondary",children:"seconds"})]})]})}d.defaultProps={endDate:i()().add(15,"days")};var m=(0,o.memo)(d)},91782:function(e,a,t){t.r(a);var s=t(1413),r=t(62563),n=t(75627),l=t(24193),i=t(24631),o=t(61113),c=t(3463),d=t(58970),m=t(53590),u=t(63585),x=t(9506),f=t(82295),h=t(67921),v=t(46417),p=c.Ry().shape({email:c.Z_().email("You must enter a valid email").required("You must enter a email")}),g={email:""};a.default=function(){var e=(0,n.cI)({mode:"onChange",defaultValues:g,resolver:(0,r.X)(p)}),a=e.control,t=e.formState,c=e.handleSubmit,j=e.reset,y=t.isValid,Z=t.dirtyFields,w=t.errors;return(0,v.jsxs)("div",{className:"flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0",children:[(0,v.jsx)(f.Z,{className:"h-full sm:h-auto md:flex md:justify-end w-full sm:w-auto md:h-full py-32 px-16 sm:p-48 md:p-64 md:pt-96 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1",children:(0,v.jsxs)("div",{className:"w-full max-w-320 sm:w-320 mx-auto sm:mx-0",children:[(0,v.jsx)("img",{className:"w-48",src:"assets/images/logo/logo.svg",alt:"logo"}),(0,v.jsx)(o.Z,{className:"mt-32 text-4xl font-extrabold tracking-tight leading-tight",children:"Almost there!"}),(0,v.jsx)(o.Z,{className:"mt-2",children:"Do you want to be notified when we are ready? Register below so we can notify you about the launch!"}),(0,v.jsx)("div",{className:"flex flex-col items-center py-48",children:(0,v.jsx)(h.Z,{endDate:"2023-07-28"})}),(0,v.jsxs)("form",{name:"comingSoonForm",noValidate:!0,className:"flex flex-col justify-center w-full",onSubmit:c((function(){j(g)})),children:[(0,v.jsx)(n.Qr,{name:"email",control:a,render:function(e){var a,t=e.field;return(0,v.jsx)(i.Z,(0,s.Z)((0,s.Z)({},t),{},{className:"mb-24",label:"Email address",type:"email",error:!!w.email,helperText:null===w||void 0===w||null===(a=w.email)||void 0===a?void 0:a.message,variant:"outlined",required:!0,fullWidth:!0}))}}),(0,v.jsx)(l.Z,{variant:"contained",color:"secondary",className:" w-full mt-4","aria-label":"Register",disabled:d.Z.isEmpty(Z)||!y,type:"submit",size:"large",children:"Notify me when you launch"}),(0,v.jsx)(o.Z,{className:"mt-32 text-md font-medium",color:"text.secondary",children:"This isn't a newsletter subscription. We will send one email to you when we launch and then you will be removed from the list."})]})]})}),(0,v.jsxs)(x.Z,{className:"relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden",sx:{backgroundColor:"primary.main"},children:[(0,v.jsx)("svg",{className:"absolute inset-0 pointer-events-none",viewBox:"0 0 960 540",width:"100%",height:"100%",preserveAspectRatio:"xMidYMax slice",xmlns:"http://www.w3.org/2000/svg",children:(0,v.jsxs)(x.Z,{component:"g",sx:{color:"primary.light"},className:"opacity-20",fill:"none",stroke:"currentColor",strokeWidth:"100",children:[(0,v.jsx)("circle",{r:"234",cx:"196",cy:"23"}),(0,v.jsx)("circle",{r:"234",cx:"790",cy:"491"})]})}),(0,v.jsxs)(x.Z,{component:"svg",className:"absolute -top-64 -right-64 opacity-20",sx:{color:"primary.light"},viewBox:"0 0 220 192",width:"220px",height:"192px",fill:"none",children:[(0,v.jsx)("defs",{children:(0,v.jsx)("pattern",{id:"837c3e70-6c3a-44e6-8854-cc48c737b659",x:"0",y:"0",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:(0,v.jsx)("rect",{x:"0",y:"0",width:"4",height:"4",fill:"currentColor"})})}),(0,v.jsx)("rect",{width:"220",height:"192",fill:"url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"})]}),(0,v.jsxs)("div",{className:"z-10 relative w-full max-w-2xl",children:[(0,v.jsxs)("div",{className:"text-7xl font-bold leading-none text-gray-100",children:[(0,v.jsx)("div",{children:"Welcome to"}),(0,v.jsx)("div",{children:"our community"})]}),(0,v.jsx)("div",{className:"mt-24 text-lg tracking-tight leading-6 text-gray-400",children:"Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today."}),(0,v.jsxs)("div",{className:"flex items-center mt-32",children:[(0,v.jsxs)(m.Z,{sx:{"& .MuiAvatar-root":{borderColor:"primary.main"}},children:[(0,v.jsx)(u.Z,{src:"assets/images/avatars/female-18.jpg"}),(0,v.jsx)(u.Z,{src:"assets/images/avatars/female-11.jpg"}),(0,v.jsx)(u.Z,{src:"assets/images/avatars/male-09.jpg"}),(0,v.jsx)(u.Z,{src:"assets/images/avatars/male-16.jpg"})]}),(0,v.jsx)("div",{className:"ml-16 font-medium tracking-tight text-gray-400",children:"More than 17k people joined us, it's your turn"})]})]})]})]})}},53590:function(e,a,t){t.d(a,{Z:function(){return Z}});var s=t(4942),r=t(63366),n=t(87462),l=t(47313),i=(t(20478),t(83061)),o=t(21921),c=t(88564),d=t(77342),m=t(83382),u=t(63585),x=t(32298);function f(e){return(0,x.Z)("MuiAvatarGroup",e)}var h=(0,t(77430).Z)("MuiAvatarGroup",["root","avatar"]),v=t(46417),p=["children","className","componentsProps","max","spacing","total","variant"],g={small:-16,medium:null},j=(0,c.ZP)("div",{name:"MuiAvatarGroup",slot:"Root",overridesResolver:function(e,a){return(0,n.Z)((0,s.Z)({},"& .".concat(h.avatar),a.avatar),a.root)}})((function(e){var a,t=e.theme;return a={},(0,s.Z)(a,"& .".concat(m.Z.root),{border:"2px solid ".concat((t.vars||t).palette.background.default),boxSizing:"content-box",marginLeft:-8,"&:last-child":{marginLeft:0}}),(0,s.Z)(a,"display","flex"),(0,s.Z)(a,"flexDirection","row-reverse"),a})),y=(0,c.ZP)(u.Z,{name:"MuiAvatarGroup",slot:"Avatar",overridesResolver:function(e,a){return a.avatar}})((function(e){var a=e.theme;return{border:"2px solid ".concat((a.vars||a).palette.background.default),boxSizing:"content-box",marginLeft:-8,"&:last-child":{marginLeft:0}}})),Z=l.forwardRef((function(e,a){var t,s,c=(0,d.Z)({props:e,name:"MuiAvatarGroup"}),m=c.children,u=c.className,x=c.componentsProps,h=void 0===x?{}:x,Z=c.max,w=void 0===Z?5:Z,b=c.spacing,N=void 0===b?"medium":b,k=c.total,A=c.variant,M=void 0===A?"circular":A,C=(0,r.Z)(c,p),S=w<2?2:w,R=(0,n.Z)({},c,{max:w,spacing:N,variant:M}),D=function(e){var a=e.classes;return(0,o.Z)({root:["root"],avatar:["avatar"]},f,a)}(R),L=l.Children.toArray(m).filter((function(e){return l.isValidElement(e)})),z=k||L.length;z===S&&(S+=1),S=Math.min(z+1,S);var E=Math.min(L.length,S-1),G=Math.max(z-S,z-E,0),P=N&&void 0!==g[N]?g[N]:-N;return(0,v.jsxs)(j,(0,n.Z)({ownerState:R,className:(0,i.default)(D.root,u),ref:a},C,{children:[G?(0,v.jsxs)(y,(0,n.Z)({ownerState:R,variant:M},h.additionalAvatar,{className:(0,i.default)(D.avatar,null==(t=h.additionalAvatar)?void 0:t.className),style:(0,n.Z)({marginLeft:P},null==(s=h.additionalAvatar)?void 0:s.style),children:["+",G]})):null,L.slice(0,E).reverse().map((function(e,a){return l.cloneElement(e,{className:(0,i.default)(e.props.className,D.avatar),style:(0,n.Z)({marginLeft:a===E-1?void 0:P},e.props.style),variant:e.props.variant||M})}))]}))}))}}]);