(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(40)},38:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(11),c=t.n(u),o=t(12),i=t(2),l=t(3),m=t.n(l),f="/api/persons",s=function(){return m.a.get(f).then(function(e){return e.data})},d=function(e){return m.a.post(f,e).then(function(e){return e.data})},p=function(e,n){return m.a.put("".concat(f,"/").concat(e),n).then(function(e){return e.data})},v=function(e){return m.a.delete("".concat(f,"/").concat(e))},b=(t(38),function(e){var n=e.text,t=e.onChange;return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:n,onChange:t}))}),h=function(e){var n=e.name,t=e.onNameChange,a=e.number,u=e.onNumberChange,c=e.onSubmit;return r.a.createElement("form",null,r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:n,onChange:t})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:c},"lis\xe4\xe4")))},E=function(e){var n=e.persons,t=e.onDelete;return r.a.createElement(r.a.Fragment,null,n.map(function(e){return r.a.createElement(g,{key:e.id,person:e,onDelete:t})}))},g=function(e){var n=e.person,t=e.onDelete;return r.a.createElement("div",null,n.name,", puh. ",n.number,r.a.createElement("button",{onClick:function(e){return t(n)}},"poista"))},j=function(e){var n=e.message,t=e.className;return null==n||""===n?null:r.a.createElement("div",{className:t},n)},O=function(){var e=Object(a.useState)(""),n=Object(i.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)([]),l=Object(i.a)(c,2),m=l[0],f=l[1],g=Object(a.useState)(""),O=Object(i.a)(g,2),C=O[0],k=O[1],w=Object(a.useState)(""),N=Object(i.a)(w,2),S=N[0],y=N[1],D=Object(a.useState)(""),x=Object(i.a)(D,2),H=x[0],J=x[1],L=Object(a.useState)(""),T=Object(i.a)(L,2),B=T[0],F=T[1];Object(a.useEffect)(function(){s().then(function(e){return f(e)})},[]);var I=function(e){var n=e=e.toLowerCase();return function(e){return-1!==e.name.toLowerCase().indexOf(n)}},P=function(e){J(e),F("info"),setTimeout(function(){return J(null)},3e3)},q=function(e){J(e),F("error"),setTimeout(function(){return J(null)},5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(j,{message:H,className:B}),r.a.createElement(b,{text:t,onChange:function(e){u(e.target.value)}}),r.a.createElement("h3",null,"lis\xe4\xe4 uusi"),r.a.createElement(h,{name:C,onNameChange:function(e){k(e.target.value)},number:S,onNumberChange:function(e){y(e.target.value)},onSubmit:function(e){var n;if(e.preventDefault(),n=C,m.filter(function(e){return e.name===n}).length>0){if(window.confirm("".concat(C," on jo luettelossa, korvataanko vanha numero uudella?"))){var t=m.find(function(e){return e.name===C}),a=Object(o.a)({},t,{number:S});p(a.id,a).then(function(e){f(m.map(function(e){return e.id===a.id?a:e})),k(""),y(""),P("Henkil\xf6n ".concat(e.name," puhelinnumero p\xe4ivitetty."))}).catch(function(e){return q(e.response.data.error)})}}else d({name:C,number:S}).then(function(e){f(m.concat(e)),k(""),y(""),P("Henkil\xf6 ".concat(e.name," lis\xe4tty."))}).catch(function(e){return q(e.response.data.error)})}}),r.a.createElement("h3",null,"Numerot"),r.a.createElement(E,{persons:""!==t?m.filter(I(t)):m,onDelete:function(e){v(e.id).then(function(){f(m.filter(function(n){return n.id!==e.id})),P("Henkil\xf6 ".concat(e.name," poistettu."))}).catch(function(n){f(m.filter(function(n){return n.id!==e.id})),q("Henkil\xf6 ".concat(e.name," oli jo poistettu."))})}}))};c.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[13,2,1]]]);
//# sourceMappingURL=main.d229e275.chunk.js.map