import{S as e,i as a,s,g as t,e as l,m as r,q as c,d as o,h as n,c as m,a as i,r as u,b as f,f as h,j as d,n as p,B as b,l as g,C as y,D as v}from"./client.24c0bc3f.js";function x(e){var a,s,t,l,r,c=[],o=[s=1732584193,t=4023233417,~s,~t,3285377520],n=[],m=unescape(encodeURI(e))+"",i=m.length;for(n[e=--i/4+2|15]=8*i;~i;)n[i>>2]|=m.charCodeAt(i)<<8*~i--;for(a=i=0;a<e;a+=16){for(s=o;i<80;s=[s[4]+(c[i]=i<16?~~n[a+i]:2*m|m<0)+1518500249+[t&l|~t&r,m=341275144+(t^l^r),882459459+(t&l|t&r|l&r),m+1535694389][i++/5>>2]+((m=s[0])<<5|m>>>27),m,t<<30|t>>>2,l,r])m=c[i-3]^c[i-8]^c[i-14]^c[i-16],t=s[1],l=s[2],r=s[3];for(i=5;i;)o[--i]+=s[i]}for(m="";i<40;)m+=(o[i>>3]>>4*(7-i++)&15).toString(16);return m}const{document:E}=b;function w(e){let a,s,c,p,b,x,E,w,S,N,T,q,A,P,I,$,k,D,L,C,B,M,V,j,O,U,R,F;return{c(){a=l("form"),s=l("label"),c=l("span"),p=r("Name"),b=t(),x=l("input"),E=t(),w=l("label"),S=l("span"),N=r("Email"),T=t(),q=l("input"),A=t(),P=l("label"),I=l("span"),$=r("Message"),k=t(),D=l("textarea"),L=t(),C=l("label"),B=l("span"),M=r(e[2]),V=t(),j=l("input"),O=t(),U=l("button"),R=r("Send message"),this.h()},l(t){a=m(t,"FORM",{method:!0});var l=i(a);s=m(l,"LABEL",{class:!0});var r=i(s);c=m(r,"SPAN",{class:!0});var f=i(c);p=u(f,"Name"),f.forEach(o),b=n(r),x=m(r,"INPUT",{name:!0,class:!0,type:!0,autocomplete:!0,required:!0}),r.forEach(o),E=n(l),w=m(l,"LABEL",{class:!0});var h=i(w);S=m(h,"SPAN",{class:!0});var d=i(S);N=u(d,"Email"),d.forEach(o),T=n(h),q=m(h,"INPUT",{name:!0,class:!0,type:!0,autocomplete:!0,required:!0}),h.forEach(o),A=n(l),P=m(l,"LABEL",{class:!0});var g=i(P);I=m(g,"SPAN",{class:!0});var y=i(I);$=u(y,"Message"),y.forEach(o),k=n(g),D=m(g,"TEXTAREA",{name:!0,class:!0,rows:!0,autocomplete:!0,maxlength:!0,required:!0}),i(D).forEach(o),g.forEach(o),L=n(l),C=m(l,"LABEL",{class:!0});var v=i(C);B=m(v,"SPAN",{class:!0});var F=i(B);M=u(F,e[2]),F.forEach(o),V=n(v),j=m(v,"INPUT",{name:!0,class:!0,type:!0,autocomplete:!0,required:!0}),v.forEach(o),O=n(l),U=m(l,"BUTTON",{class:!0,type:!0,disabled:!0});var Y=i(U);R=u(Y,"Send message"),Y.forEach(o),l.forEach(o),this.h()},h(){f(c,"class","text-gray-700"),f(x,"name","name"),f(x,"class","form-input mt-1 block w-full"),f(x,"type","text"),f(x,"autocomplete","off"),x.required=!0,f(s,"class","block"),f(S,"class","text-gray-700"),f(q,"name","email"),f(q,"class","form-input mt-1 block w-full"),f(q,"type","email"),f(q,"autocomplete","off"),q.required=!0,f(w,"class","block my-2"),f(I,"class","text-gray-700"),f(D,"name","message"),f(D,"class","form-textarea mt-1 block w-full"),f(D,"rows","5"),f(D,"autocomplete","off"),f(D,"maxlength","1000"),D.required=!0,f(P,"class","block"),f(B,"class","text-gray-700"),f(j,"name","solution"),f(j,"class","form-input mt-1 block w-full"),f(j,"type","text"),f(j,"autocomplete","off"),j.required=!0,f(C,"class","block my-2"),f(U,"class","bg-primary hover:bg-primary-soft text-white font-bold py-2 px-4 mt-4 border border-primary w-full rounded"),f(U,"type","submit"),U.disabled=e[1],f(a,"method","POST")},m(t,l){h(t,a,l),d(a,s),d(s,c),d(c,p),d(s,b),d(s,x),d(a,E),d(a,w),d(w,S),d(S,N),d(w,T),d(w,q),d(a,A),d(a,P),d(P,I),d(I,$),d(P,k),d(P,D),d(a,L),d(a,C),d(C,B),d(B,M),d(C,V),d(C,j),d(a,O),d(a,U),d(U,R),F=g(a,"submit",y(e[3]))},p(e,a){4&a&&v(M,e[2]),2&a&&(U.disabled=e[1])},d(e){e&&o(a),F()}}}function S(e){let a,s;return{c(){a=l("div"),s=r("There was an error sending the message. Please try again later."),this.h()},l(e){a=m(e,"DIV",{class:!0});var t=i(a);s=u(t,"There was an error sending the message. Please try again later."),t.forEach(o),this.h()},h(){f(a,"class","bg-red-200 p-2 rounded mb-4 text-center")},m(e,t){h(e,a,t),d(a,s)},p:p,d(e){e&&o(a)}}}function N(e){let a,s;return{c(){a=l("div"),s=r("Your message has been  successfully sent!"),this.h()},l(e){a=m(e,"DIV",{class:!0});var t=i(a);s=u(t,"Your message has been  successfully sent!"),t.forEach(o),this.h()},h(){f(a,"class","bg-green-200 p-2 rounded mb-4 text-center")},m(e,t){h(e,a,t),d(a,s)},p:p,d(e){e&&o(a)}}}function T(e){let a,s,b,g,y,v,x,T;function q(e,a){return"success"==e[0]?N:"fail"==e[0]?S:w}let A=q(e),P=A(e);return{c(){a=t(),s=l("div"),b=l("div"),g=l("div"),y=l("h2"),v=r("Contact"),x=t(),T=l("div"),P.c(),this.h()},l(e){c('[data-svelte="svelte-vutv6y"]',E.head).forEach(o),a=n(e),s=m(e,"DIV",{class:!0});var t=i(s);b=m(t,"DIV",{class:!0});var l=i(b);g=m(l,"DIV",{class:!0});var r=i(g);y=m(r,"H2",{class:!0});var f=i(y);v=u(f,"Contact"),f.forEach(o),x=n(r),T=m(r,"DIV",{class:!0});var h=i(T);P.l(h),h.forEach(o),r.forEach(o),l.forEach(o),t.forEach(o),this.h()},h(){E.title="Contact | Chameleon",f(y,"class","font-bold text-5xl mb-5 text-center"),f(T,"class","w-full px-4 text-lg"),f(g,"class","flex flex-col w-full"),f(b,"class","flex lg:max-w-5xl mt-8 md:mt-8 w-full"),f(s,"class","flex bg-light h-screen w-full px-2 lg:\tpx-0 justify-center")},m(e,t){h(e,a,t),h(e,s,t),d(s,b),d(b,g),d(g,y),d(y,v),d(g,x),d(g,T),P.m(T,null)},p(e,[a]){A===(A=q(e))&&P?P.p(e,a):(P.d(1),P=A(e),P&&(P.c(),P.m(T,null)))},i:p,o:p,d(e){e&&o(a),e&&o(s),P.d()}}}function q(e,a,s){let t,l,r=()=>Math.floor(50*Math.random()),c=Math.random()>.5?"plus":"minus",o=r(),n=r(),m="",i=!1;return e.$$.update=()=>{48&e.$$.dirty&&(t="plus"===c?o+n:o-n),48&e.$$.dirty&&s(2,l=`What is ${o} ${c} ${n}?`)},[m,i,l,async()=>{let e=new FormData(document.querySelector("form")),a=Number(e.get("solution"));if(s(1,i=!0),a===t)try{let a=await fetch("https://flamboyant-colden-cabaa9.netlify.com/.netlify/functions/app",{method:"POST",body:JSON.stringify({name:e.get("name"),email:e.get("email"),message:e.get("message"),h:x(`${e.get("email")}:284190fc06664d67b4a386fc425b656f`)}),headers:{"Content-Type":"application/json"}});(await a.json()).success?s(0,m="success"):s(0,m="fail")}catch(e){s(0,m="fail")}else s(4,o=r()),s(5,n=r()),document.querySelector('input[name="solution"]').value="";s(1,i=!1)}]}export default class extends e{constructor(e){super(),a(this,e,q,T,s,{})}}