(this.webpackJsonpstoragememo=this.webpackJsonpstoragememo||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(16),c=n.n(r),a=(n(28),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function i(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(29);var s=n(2),u=n(6),l=n.n(u),d=n(7),f=1e6,b=function(e){var t;try{t=new Intl.NumberFormat("en-us",{maximumFractionDigits:1}).format(e/f)}catch(n){t=Math.round(e/f)}return"".concat(t," MB")};function j(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t="abcdefghijklmnopqrstuvwxyz".split(""),n=t.length,o=[];e--;)o.push(t[Math.random()*n|0]);return o.join("")}var h,p,O,g=n(15),x=n(17),v=n.n(x)()((function(e,t){return{quota:{total:0,usage:0},updateQuota:function(t){return e((function(e){return e.quota=Object(g.a)(Object(g.a)({},e.quota),t)}))}}})),m=n(3),w=n(4),E=n(22),D={};D.Btn=w.a.button(h||(h=Object(m.a)(["\n  background-color: ",";\n  color: ",";\n  padding: ",";\n  width: ",";\n  font-size: ",";\n  border-radius: 4px;\n  height: auto;\n  box-shadow: none;\n  border: none;\n  opacity: ",";\n  outline: none;\n  &:hover {\n    cursor: pointer;\n  }\n"])),(function(e){return e.backgroundColor?e.backgroundColor:"#0096ff"}),(function(e){return e.color?e.color:"white"}),(function(e){return e.padding?e.padding:"10px 20px"}),(function(e){return e.width?e.width:"auto"}),(function(e){return e.fontSize?e.fontSize:"1em"}),(function(e){return e.disabled?.5:1})),D.InputField=w.a.input(p||(p=Object(m.a)(["\n  display: block;\n  width: auto;\n  padding: 10px;\n  font-size: ",";\n  &:focus {\n    outline: none;\n    box-shadow: none;\n  }\n"])),(function(e){return e.fontSize?e.fontSize:"1em"})),D.Link=Object(w.a)(E.a)(O||(O=Object(m.a)(["\n  position: absolute;\n  text-decoration: none;\n  padding: 10px;\n  color: block;\n  font-weight: bold;\n  font-size: 1.2em;\n  color:white;\n  background-color: #008fe5;\n"])));var S,k,B,y,I,C,A,T,R,L,N=D,F={};F.Wrapper=w.a.div(S||(S=Object(m.a)(["\n  padding: 24px;\n  min-width: 680px;\n  font-size: 18px;\n"]))),F.Btn=Object(w.a)(N.Btn)(k||(k=Object(m.a)(["\n  float: right;\n  width: 100px;\n  margin: 40px 0 35px 30px;\n  text-align: center;\n  outline: none;\n  opacity: 0.9;\n  &:hover { opacity: 1; }\n"]))),F.InfoWrapper=w.a.span(B||(B=Object(m.a)(["\n  position: relative;\n  top: 50%;\n"]))),F.Value=w.a.span(y||(y=Object(m.a)(["\n  font-size: 1.2em;\n  font-weight: bold;\n"]))),F.Section=w.a.section(I||(I=Object(m.a)(["\n  position: relative;\n  display: block;\n  border-top: 1px solid lightgray;\n  margin: 26px auto;\n  height: 100px;\n  width: 80%;\n  padding: 0 10px;\n  @media (max-width: 990px) {\n    width: 100%;\n  }\n"]))),F.SectionOuter=Object(w.a)(F.Section)(C||(C=Object(m.a)(["\n  border: none;\n  margin-top: 10vh;\n"]))),F.PlainSectionOuter=Object(w.a)(F.Section)(A||(A=Object(m.a)(["\n  border: none;\n"]))),F.Btn.Clear=Object(w.a)(F.Btn)(T||(T=Object(m.a)(["\n  background: #D44500;\n  width: 100px;\n"]))),F.Btn.ClearAll=Object(w.a)(F.Btn)(R||(R=Object(m.a)(["\n  margin: -30px auto;\n  width: 220px;\n  float: right;\n  background: #D44500;\n"]))),F.InputField=Object(w.a)(N.InputField)(L||(L=Object(m.a)(["\n  float: right;\n  margin: 40px 0 0 20px;\n  text-align: center;\n  padding: 8px;\n  border: none;\n  border-bottom: 1px solid black;\n  width: ",";\n"])),(function(e){return e.width?e.width:"40px"}));var M=F,V=n(1);function W(){if("granted"!==Notification.permission)return"Notification"in window?Notification.requestPermission().then((function(e){if("granted"===e)return alert("Notification enabled!"),!0})):alert("This browser does not support desktop notification"),!1}var z=function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("granted"===Notification.permission){e.next=5;break}if(W()){e.next=5;break}return alert("Allow notification before persisting storage"),e.abrupt("return");case 5:navigator.storage&&navigator.storage.persist&&navigator.storage.persist().then((function(e){e?console.log("Storage is persisted"):console.log("Storage is NOT persisted")}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(d.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=!1,!navigator.storage||!navigator.storage.persist){e.next=6;break}return e.next=4,navigator.storage.persisted();case 4:n=e.sent,t(n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var U=function(e){e.refetch,e.setRefetch;var t=Object(o.useState)(!0),n=Object(s.a)(t,2),r=n[0],c=n[1],a=v((function(e){return e.quota})),i=v((function(e){return e.updateQuota}));return Object(o.useEffect)((function(){W();var e=setInterval((function(){P((function(e){return c(e)})),function(e){e&&navigator.storage.estimate().then((function(t){var n=t.quota,o=t.usage;e({total:n,usage:o})})).catch((function(e){return console.log("ERROR ",e)}))}(i)}),1e3);return function(){clearInterval(e)}}),[]),Object(V.jsxs)(M.SectionOuter,{children:[Object(V.jsxs)("p",{children:["isPersisted ="," ",Object(V.jsx)(M.Value,{children:r.toString().toUpperCase()}),Object(V.jsx)(M.Btn,{onClick:z,style:{display:"inline-block",width:"auto",margin:"-8px 0 0 0"},children:"Persist storage"})]}),Object(V.jsx)("div",{children:"Quota = Cache + IndexedDB. DOMStorage (local + session) is not included in Quota"}),Object(V.jsxs)("div",{children:["Used ="," ",Object(V.jsxs)(M.Value,{children:[b(a.usage)," / ",b(a.total),Object(V.jsx)("small",{children:" "})]})]}),Object(V.jsxs)("div",{children:["Available ="," ",Object(V.jsx)(M.Value,{children:b(a.total-a.usage)})]})]})},q=n(23),G=["type","defaultVal","placeholder","postTask"],_=function(e){var t=e.type,n=void 0===t?"string":t,r=e.defaultVal,c=void 0===r?"1":r,a=e.placeholder,i=e.postTask,u=Object(q.a)(e,G),l=Object(o.useState)(c),d=Object(s.a)(l,2),f=d[0],b=d[1];return Object(o.useEffect)((function(){f&&i("number"===n?parseInt(f):f)}),[f]),Object(V.jsx)(M.InputField,{style:u,placeholder:a,value:f,onChange:function(e){return b(e.target.value)}})},K=window,H=K.localStorage,Q=K.sessionStorage;function J(e){var t=0;for(var n in e)e.hasOwnProperty(n)&&(t+=n.length+e.getItem(n).length);return(t/f).toFixed(0)}function Y(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r="key".concat(e.length+1,"_").concat(t,"MB");try{e.setItem(r,j(t*f)),n&&n()}catch(error){alert("ERROR: '".concat(error.name,"'")),o&&o()}}function $(e){e.clear()}var X=function(e){var t=e.storageType,n=e.name,r=Object(o.useState)(t.length),c=Object(s.a)(r,2),a=c[0],i=c[1],u=Object(o.useState)(2),l=Object(s.a)(u,2),d=l[0],f=l[1],b=Object(o.useState)(!1),j=Object(s.a)(b,2),h=j[0],p=j[1];return Object(o.useEffect)((function(){var e=function(){return i(J(t))},n=document.getElementById("clearAll-Btn");return n.addEventListener("click",e),function(){n.removeEventListener("click",e)}}),[]),Object(o.useEffect)((function(){var e=setInterval((function(){var e=J(t);e!==d&&i(e)}),1500);return function(){clearInterval(e)}}),[]),Object(o.useEffect)((function(){var e;return h?e=setInterval((function(){Y(t,d,(function(){console.log("".concat(n,": ADDED ").concat(d,"MB")),i(J(t))}),(function(){p(!h)}))}),1e3):clearInterval(e),function(){clearInterval(e)}}),[h,a,d]),Object(V.jsx)(V.Fragment,{children:Object(V.jsxs)(M.Section,{children:[Object(V.jsxs)(M.InfoWrapper,{children:[n," = ",Object(V.jsxs)(M.Value,{children:[a,"MB"]})]}),Object(V.jsx)(M.Btn.Clear,{onClick:function(){$(t),i(t.length)},children:"Empty"}),Object(V.jsx)(M.Btn,{onClick:function(){return p(!h)},style:{width:"auto"},children:h?"Auto OFF":"Auto ON"}),Object(V.jsx)(M.Btn,{onClick:function(){Y(t,d,(function(){console.log("".concat(n,": ADDED ").concat(d,"MB")),i(J(t))}))},children:"Add"}),Object(V.jsx)(_,{type:"number",defaultVal:"".concat(d),postTask:function(e){return f(e)}})]})})},Z=function(){return Object(V.jsx)(X,{storageType:H,name:"Local Storage"})},ee=function(){return Object(V.jsx)(X,{storageType:Q,name:"Session Storage"})},te="demo_db",ne={users:"users",messages:"messages"},oe=new BroadcastChannel("idb_changes"),re="myid";function ce(e){console.log(e)}function ae(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=indexedDB.open(te);t.onerror=function(e){ce("IndexedDB ERR: FAILED TO CONNECT")},t.onsuccess=function(){e&&e(t.result)},t.onupgradeneeded=function(t){var n=t.currentTarget.result;for(var o in ne){n.objectStoreNames.contains(o)&&n.deleteObjectStore(o),n.createObjectStore(o).put("1234",re)}ae(e)},t.onblocked=function(){ce("IndexedDB: CONNECTION WAS BLOCKED",error)}}function ie(e){e?e.close():ce("IndexedDB: DB NOT FOUND")}function se(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=ne.messages;n||(n=j(e*f)),t||(t="".concat((new Date).toLocaleTimeString(),"_msg_").concat(e,"MB"));try{ae((function(c){var a=c.transaction([r],"readwrite"),i=a.objectStore(r).put(n,t);a.onerror=function(e){var t=e.target.error;ce("IndexedDB: transaction error"),"ConstraintError"===t.name&&(alert("Key existed !"),e.preventDefault(),e.stopPropagation())},i.onerror=function(e){ce("IndexedDB ERR: FAILED TO ADD DATA")},i.onsuccess=function(){ce("[".concat((new Date).toLocaleTimeString(),"] IndexedDB: ADDED ").concat(e,"MB")),ie(c),o&&o()},i.onblocked=function(){ce("IndexedDB: BLOCKED ADDING ".concat(e,"MB"))}}))}catch(error){ce("IndexedDB ERR:")}}var ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=window.indexedDB.deleteDatabase(te);t.onsuccess=function(){console.log("IndexedDB: ",te,"IS DELETED"),e&&e()},t.onerror=function(){alert("IndexedDB: FAILED TO DELETE",te)},t.onblocked=function(){alert("IndexedDB: OPERATION BEING BLOCKED")}},le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne.messages,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;try{ae((function(o){var r=o.transaction([e],"readonly").objectStore(e).get(t);r.onerror=function(e){ce("IndexedDB ERR: FAILED TO GET")},r.onsuccess=function(){ie(o),n&&n(r.result)}}))}catch(error){ce("IndexedDB ERR:")}},de=function(){var e=Object(o.useState)(!0),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(1),a=Object(s.a)(c,2),i=a[0],u=a[1],l=Object(o.useState)(0),d=Object(s.a)(l,2),f=d[0],b=d[1],j=Object(o.useState)(),h=Object(s.a)(j,2),p=h[0],O=h[1],g=Object(o.useState)(!1),x=Object(s.a)(g,2),v=x[0],m=x[1],w=Object(o.useState)(""),E=Object(s.a)(w,2),D=E[0],S=E[1],k=Object(o.useState)(""),B=Object(s.a)(k,2),y=B[0],I=B[1],C=Object(o.useState)(1),A=Object(s.a)(C,2),T=A[0],R=A[1],L=Object(o.useState)(!1),N=Object(s.a)(L,2),F=N[0],W=N[1];oe.onmessage=function(e){var t=e.data,n=t.action,o=t.store,r=t.key;if("UPDATE"===n)z(o,r)};var z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne.messages,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:re;return le(e,t,(function(e){S(e)}))};return Object(o.useEffect)((function(){return ae((function(e){z(),ie(e),r(!1)})),function(){oe.close()}}),[]),Object(o.useEffect)((function(){var e;return v?e=setInterval((function(){se(i,null,null,(function(){return b(f+i)}))}),1e3):clearInterval(e),function(){clearInterval(e)}}),[v,f,i]),Object(V.jsxs)(V.Fragment,{children:[Object(V.jsxs)(M.Section,{style:{height:"90px"},children:[Object(V.jsxs)(M.InfoWrapper,{children:["IndexedDB = ",Object(V.jsxs)(M.Value,{children:[f,"MB"]})]}),Object(V.jsx)(M.Btn.Clear,{disabled:n,onClick:function(){return ue((function(){return b(0)}))},children:"Reset"}),Object(V.jsx)(M.Btn,{onClick:function(){m(!v)},style:{width:"auto"},children:v?"Auto OFF":"Auto ON"}),Object(V.jsx)(_,{type:"number",placeholder:"1MB",defaultVal:"10",postTask:function(e){return u(e)}})]}),Object(V.jsxs)(M.PlainSectionOuter,{style:{height:"90px"},children:[Object(V.jsx)(M.InfoWrapper,{children:"Single Item"}),Object(V.jsx)(M.Btn.Clear,{disabled:n,onClick:function(){p?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ne.messages,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;try{ae((function(o){var r=o.transaction([t],"readwrite").objectStore(t).delete(e);r.onerror=function(){ce("IndexedDB ERR: FAILED TO DELETE")},r.onsuccess=function(){ce("IndexedDB: DATA ROW DELETED"),ie(o),n&&n()}}))}catch(error){console.log("IndexedDB ERR:",error)}}(p,ne.messages):alert("Key must NOT be empty")},children:"Delete"}),Object(V.jsx)(M.Btn,{disabled:n,onClick:function(){p?se(T,p,y,(function(){z(ne.messages,p),b(f+T),F&&oe.postMessage({action:"UPDATE",store:"messages",key:p})})):alert("Key must NOT be empty")},children:"Add"}),Object(V.jsx)(_,{type:"number",defaultVal:"",placeholder:"size",postTask:function(e){return R(e)}}),Object(V.jsx)(_,{type:"text",placeholder:"Value",defaultVal:"",width:"110px",postTask:function(e){return I(e)}}),Object(V.jsx)(_,{defaultVal:"",placeholder:"Object key",width:"110px",postTask:function(e){return O(e)}})]}),Object(V.jsxs)(M.PlainSectionOuter,{children:[Object(V.jsx)("h3",{children:"Stale database due to multiple update"}),Object(V.jsx)("input",{type:"checkbox",id:"updateDummy",name:"updateDummy",checked:F,onChange:function(e){return W(!F)}}),Object(V.jsx)("label",{htmlFor:"updateDummy",children:"Trigger update on other tabs"}),Object(V.jsxs)("h3",{style:{margin:"10px 0",color:"red"},children:[re," | ",D]})]})]})},fe="demo-cache",be=function(){var e=Object(d.a)(l.a.mark((function e(t){var n,o,r,c,a=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:null,o="/cache_".concat(Date.now().toString(),"_").concat(t,"MB"),r=new Response(j(t*f)),e.next=5,caches.open(fe);case 5:return c=e.sent,e.abrupt("return",c.put(o,r).then((function(){console.log('CACHE STORAGE: SUCCESSFULLY ADDED "'.concat(o,'"')),n&&n()})).catch((function(e){alert("CACHE STORAGE: ERROR! FAILED TO WRITE CACHE")})));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function je(){return he.apply(this,arguments)}function he(){return(he=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,caches.open(fe);case 2:return t=e.sent,e.next=5,t.keys();case 5:e.sent.forEach((function(e){t.delete(e)})),caches.delete(fe).then((function(){console.log("CACHE STORAGE:",fe,"IS DELETED")})).then((function(){window.location.reload(!0)})).catch((function(e){return console.error("CACHE STORAGE: FAILED TO DELETE",fe,e)}));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var pe=function(){var e=Object(o.useState)(0),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(0),a=Object(s.a)(c,2),i=a[0],u=a[1],l=Object(o.useState)(!1),d=Object(s.a)(l,2),f=d[0],b=d[1];return Object(o.useEffect)((function(){var e;return f?e=setInterval((function(){be(i,(function(){return r(n+i)}))}),1e3):clearInterval(e),function(){clearInterval(e)}}),[f,n,i]),Object(V.jsxs)(M.Section,{children:[Object(V.jsxs)(M.InfoWrapper,{children:["Cache Storage = ",Object(V.jsxs)(M.Value,{children:[n,"MB"]})]}),Object(V.jsx)(M.Btn.Clear,{onClick:function(){return je()},children:"Empty"}),Object(V.jsx)(M.Btn,{onClick:function(){return b(!f)},style:{width:"120px"},children:f?"Auto OFF":"Auto ON"}),Object(V.jsx)(M.Btn,{onClick:function(){return be(i,(function(){return r(n+i)}))},children:"Add"}),Object(V.jsx)(_,{type:"number",defaultVal:"10",postTask:function(e){return u(e)}})]})},Oe=function(){var e=Object(o.useState)(!0),t=Object(s.a)(e,2),n=t[0],r=t[1];return Object(V.jsxs)(M.Wrapper,{children:[Object(V.jsx)("h2",{className:"center",children:"Offline Storage Demo"}),Object(V.jsx)(U,{refetch:n,setRefetch:r}),Object(V.jsx)(Z,{refetch:n}),Object(V.jsx)(ee,{refetch:n}),Object(V.jsx)(pe,{}),Object(V.jsx)(de,{}),Object(V.jsx)(M.SectionOuter,{children:Object(V.jsx)(M.Btn.ClearAll,{id:"clearAll-Btn",onClick:function(){$(window.localStorage),$(window.sessionStorage),je(),ue(),r(!n)},width:"100%",children:"CLEAR ALL"})})]})},ge=function(){return Object(V.jsx)("div",{className:"App",children:Object(V.jsx)(Oe,{})})};c.a.render(Object(V.jsx)(ge,{}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/StorageDemo",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/StorageDemo","/service-worker.js");a?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):i(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):i(e)}))}}()}},[[38,1,2]]]);
//# sourceMappingURL=main.368d70cc.chunk.js.map