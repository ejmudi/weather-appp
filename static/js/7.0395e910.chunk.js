(this["webpackJsonpweather-appp"]=this["webpackJsonpweather-appp"]||[]).push([[7],{425:function(t,e,n){"use strict";n.r(e),n.d(e,"Loading",(function(){return O}));var r=n(0),a=n(2),c=n(15),u=n(8),i=n(20),o=n(87),s=n.n(o),f=n(126),p=n(194),h=n.n(p),d=n(212),m=n.n(d),b=n(213),l=function(){var t=Object(f.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,e){var n,r;(n=c.a,r={q:"Munich,de",APPID:"75f972b80e26f14fe6c920aa6a85ad57",cnt:40},h()({method:"get",url:n,params:r})).then((function(e){var n=b(e.data.list,(function(t){return m()(1e3*t.dt).format("DD-MMM-YYYY")})),r=Object.keys(n).map((function(t){var e=n[t],r=e.reduce((function(t,e){return t+e.main.temp}),0)/e.length;return{key:t,date:m()(1e3*e[0].dt).format("DD MMM YY"),averageTemp:r,segments:e.map((function(t){return{time:m()(1e3*t.dt).format("hh:mm A"),temperature:t.main.temp}}))}}));t(r)})).catch(e)})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),g=function(){return function(){var t=Object(f.a)(s.a.mark((function t(e){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(j(!0)),t.next=3,l();case 3:n=t.sent,e(v(n)),e(j(!1));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},j=function(t){return{type:"SET_IS_LOADING_WEATHER_ITEMS",payload:t}},v=function(t){return{type:"SET_WEATHER_ITEMS",payload:t}},E=n(7),O=function(t){var e=t.isLoadingWeatherItems,n=t.fetchWeatherItems,u=Object(a.f)();return Object(r.useEffect)((function(){n()}),[n]),Object(r.useEffect)((function(){!1===e&&u.push(c.b.WEATHERINFO)}),[e,u]),Object(E.jsx)("div",{className:"loading-page",style:{textAlign:"center",paddingTop:"15%"},children:Object(E.jsx)("h2",{children:"Loading..."})})};e.default=Object(i.b)((function(t){return{isLoadingWeatherItems:t.isLoadingWeatherItems}}),(function(t){return Object(u.b)({fetchWeatherItems:g},t)}))(O)}}]);
//# sourceMappingURL=7.0395e910.chunk.js.map