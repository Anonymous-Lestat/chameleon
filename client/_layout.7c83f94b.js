import{S as s,i as a,s as l,e as t,c as e,a as n,d as c,b as r,f as o,n as i,m as f,g as m,r as h,h as u,j as p,D as d,E as g,p as v,u as $,v as x,F as E,G as w,w as D,x as I,y as b}from"./client.24c0bc3f.js";function A(s){let a,l,i,g,v,$,x,E,w=s[0].split("-").map(s[1]).join(" ")+"";return{c(){a=t("a"),l=f("Home"),i=m(),g=t("span"),v=f("/"),$=m(),x=t("span"),E=f(w),this.h()},l(s){a=e(s,"A",{class:!0,href:!0});var t=n(a);l=h(t,"Home"),t.forEach(c),i=u(s),g=e(s,"SPAN",{class:!0});var r=n(g);v=h(r,"/"),r.forEach(c),$=u(s),x=e(s,"SPAN",{});var o=n(x);E=h(o,w),o.forEach(c),this.h()},h(){r(a,"class","text-primary"),r(a,"href","wiki"),r(g,"class","font-normal mx-1")},m(s,t){o(s,a,t),p(a,l),o(s,i,t),o(s,g,t),p(g,v),o(s,$,t),o(s,x,t),p(x,E)},p(s,a){1&a&&w!==(w=s[0].split("-").map(s[1]).join(" ")+"")&&d(E,w)},d(s){s&&c(a),s&&c(i),s&&c(g),s&&c($),s&&c(x)}}}function V(s){let a,l;return{c(){a=t("span"),l=f("Home")},l(s){a=e(s,"SPAN",{});var t=n(a);l=h(t,"Home"),t.forEach(c)},m(s,t){o(s,a,t),p(a,l)},p:i,d(s){s&&c(a)}}}function j(s){let a;function l(s,a){return null==s[0]?V:A}let f=l(s),m=f(s);return{c(){a=t("div"),m.c(),this.h()},l(s){a=e(s,"DIV",{class:!0});var l=n(a);m.l(l),l.forEach(c),this.h()},h(){r(a,"class","font-semibold text-lg")},m(s,l){o(s,a,l),m.m(a,null)},p(s,[t]){f===(f=l(s))&&m?m.p(s,t):(m.d(1),m=f(s),m&&(m.c(),m.m(a,null)))},i:i,o:i,d(s){s&&c(a),m.d()}}}function H(s,a,l){let{segment:t}=a;return s.$set=s=>{"segment"in s&&l(0,t=s.segment)},[t,s=>s.charAt(0).toUpperCase()+s.slice(1)]}class N extends s{constructor(s){super(),a(this,s,H,j,l,{segment:0})}}function S(s){let a,l,i,d,A,V,j,H,S,k,y;const P=new N({props:{segment:s[0]}}),W=s[2].default,C=g(W,s,s[1],null);return{c(){a=t("main"),l=t("div"),i=t("div"),d=t("div"),A=t("div"),V=t("div"),j=t("h2"),H=f("Wiki"),S=m(),v(P.$$.fragment),k=m(),C&&C.c(),this.h()},l(s){a=e(s,"MAIN",{});var t=n(a);l=e(t,"DIV",{class:!0});var r=n(l);i=e(r,"DIV",{class:!0});var o=n(i);d=e(o,"DIV",{class:!0});var f=n(d);A=e(f,"DIV",{class:!0});var m=n(A);V=e(m,"DIV",{class:!0});var p=n(V);j=e(p,"H2",{class:!0});var g=n(j);H=h(g,"Wiki"),g.forEach(c),S=u(p),$(P.$$.fragment,p),p.forEach(c),k=u(m),C&&C.l(m),m.forEach(c),f.forEach(c),o.forEach(c),r.forEach(c),t.forEach(c),this.h()},h(){r(j,"class","font-bold text-5xl"),r(V,"class","mb-5 text-center"),r(A,"class","w-full"),r(d,"class","flex flex-col w-full"),r(i,"class","flex lg:max-w-5xl mt-8 w-full"),r(l,"class","flex bg-ligh h-full w-full px-2 lg:\tpx-0 justify-center")},m(s,t){o(s,a,t),p(a,l),p(l,i),p(i,d),p(d,A),p(A,V),p(V,j),p(j,H),p(V,S),x(P,V,null),p(A,k),C&&C.m(A,null),y=!0},p(s,[a]){const l={};1&a&&(l.segment=s[0]),P.$set(l),C&&C.p&&2&a&&C.p(E(W,s,s[1],null),w(W,s[1],a,null))},i(s){y||(D(P.$$.fragment,s),D(C,s),y=!0)},o(s){I(P.$$.fragment,s),I(C,s),y=!1},d(s){s&&c(a),b(P),C&&C.d(s)}}}function k(s,a,l){let{segment:t}=a,{$$slots:e={},$$scope:n}=a;return s.$set=s=>{"segment"in s&&l(0,t=s.segment),"$$scope"in s&&l(1,n=s.$$scope)},[t,n,e]}export default class extends s{constructor(s){super(),a(this,s,k,S,l,{segment:0})}}