!function(a){function b(b,d){function e(b){if(f.push(b),f.length===h){for(var c=[],e=0;h>e;e+=1)c[e]=f[e].exports;d&&d.apply(a,c)}}var f=[],g=0,h=b.length;if(b&&b.length>0)for(;h>g;g+=1)c(b[g],e);else d&&d()}function c(a,b){b(d(a))}function d(b){return f[b]=f[b]||{"name":b,"exports":function(){function b(){var c=b.__target__;return c?c.apply(a,arguments):void 0}return b}()}}var e=a._AP?_AP:a.RA=a.AP={},f={};e.define=function(c,e,f){var g,h=d(c);f||(f=e,e=[]),f&&(g="function"!=typeof f?function(){return f}:f,b(e,function(){var b=g.apply(a,arguments);if(b){"function"==typeof b&&(h.exports.__target__=b);for(var c in b)b.hasOwnProperty(c)&&(h.exports[c]=b[c])}}))},e.require=function(a,c){b("string"==typeof a?[a]:a,c)}}(this),AP.define("_util",function(){"use strict";function a(a,b){var c,d;if(a)if(c=a.length,null!=c&&"function"!=typeof a)for(d=0;c>d&&b.call(a[d],d,a[d])!==!1;)d+=1;else for(d in a)if(a.hasOwnProperty(d)&&b.call(a[d],d,a[d])===!1)break}function b(a,b){return a+="EventListener",b+="Event",function(c,d,e){c[a]?c[a](d,e,!1):c[b]&&c[b]("on"+d,e)}}function c(){var a=this.console;if(a&&a.log){var b=[].slice.call(arguments);if(a.log.apply)a.log.apply(a,b);else{for(var c=0,d=b.length;d>c;c+=1)b[c]=JSON.stringify(b[c]);a.log(b.join(" "))}return!0}}function d(a){return null==a?null:decodeURIComponent(a.replace(/\+/g,"%20"))}return{"each":a,"extend":function(b){var c=arguments,d=[].slice.call(c,1,c.length);return a(d,function(c,d){a(d,function(a,c){b[a]=c})}),b},"bind":b("add","attach"),"unbind":b("remove","detach"),"trim":function(a){return a&&a.replace(/^\s+|\s+$/g,"")},"debounce":function(a,b){var c;return function(){function d(){c=null,a.apply(e,f)}var e=this,f=[].slice.call(arguments);c&&clearTimeout(c),c=setTimeout(d,b||50)}},"inArray":function(a,b,c){if(Array.prototype.indexOf)return Array.prototype.indexOf.call(b,a,c);for(var d=c>>>0,e=b.length>>>0;e>d;d+=1)if(b[d]===a)return d;return-1},"isFunction":function(a){return"function"==typeof a},"log":c,"handleError":function(a){if(!c.apply(this,a&&a.message?[a,a.message]:[a]))throw a},"decodeQueryComponent":d}}),AP.define("_dollar",["_util"],function(a){"use strict";function b(b,f){f=f||e;var g=[];if(b)if("string"==typeof b){var h=f.querySelectorAll(b);c(h,function(a,b){g.push(b)})}else 1===b.nodeType?g.push(b):b===window&&g.push(b);return d(g,{"each":function(a){return c(this,a),this},"bind":function(b,c){this.each(function(d,e){a.bind(e,b,c)})},"attr":function(a){var b;return this.each(function(c,d){return b=d[a]||d.getAttribute&&d.getAttribute(a),!b}),b},"removeClass":function(a){return this.each(function(b,c){c.className&&(c.className=c.className.replace(new RegExp("(^|\\s)"+a+"(\\s|$)")," "))})},"html":function(a){return this.each(function(b,c){c.innerHTML=a})},"append":function(a){return this.each(function(b,d){var e=f.createElement(a.tag);c(a,function(a,b){"$text"===a?e.styleSheet?e.styleSheet.cssText=b:e.appendChild(f.createTextNode(b)):"tag"!==a&&(e[a]=b)}),d.appendChild(e)})}}),g}var c=a.each,d=a.extend,e=window.document;return d(b,a)}),("undefined"!=typeof _AP?define:AP.define)("_events",["_dollar"],function(a){"use strict";function b(a,b){this._key=a,this._origin=b,this._events={},this._any=[]}function c(a,b){for(var c=0;c<a.length;++c)try{a[c].apply(null,b)}catch(d){e(d.stack||d.message||d)}}var d=window,e=d.AJS&&d.AJS.log||d.console&&d.console.log||function(){},f=b.prototype;return f.on=function(a,b){return a&&b&&this._listeners(a).push(b),this},f.once=function(a,b){var c=this,d=function(){c.off(a,d),b.apply(null,arguments)};return this.on(a,d),this},f.onAny=function(a){return this._any.push(a),this},f.off=function(b,c){var d=this._events[b];if(d){var e=a.inArray(c,d);e>=0&&d.splice(e,1),0===d.length&&delete this._events[b]}return this},f.offAll=function(a){return a?delete this._events[a]:this._events={},this},f.offAny=function(b){var c=this._any,d=a.inArray(b,c);return d>=0&&c.splice(d,1),this},f.emit=function(a){return this._emitEvent(this._event.apply(this,arguments))},f._event=function(a){return{"name":a,"args":[].slice.call(arguments,1),"attrs":{},"source":{"key":this._key,"origin":this._origin}}},f._emitEvent=function(a){var b=a.args.concat(a);return c(this._listeners(a.name),b),c(this._any,[a.name].concat(b)),this},f._listeners=function(a){return this._events[a]=this._events[a]||[]},{"Events":b}}),("undefined"!=typeof _AP?define:AP.define)("_base64",["_dollar"],function(a){"use strict";function b(){this.buffer=[]}function c(a){this._input=a,this._index=-1,this._buffer=[]}function d(a){this._input=a,this._index=-1,this._buffer=[]}function e(a){return g.encode(a)}function f(a){return g.decode(a)}b.prototype.append=function(a){return this.buffer.push(a),this},b.prototype.toString=function(){return this.buffer.join("")};var g={"codex":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=","encode":function(a){for(var d=new b,e=new c(a);e.moveNext();){var f=e.current;e.moveNext();var g=e.current;e.moveNext();var h=e.current,i=f>>2,j=(3&f)<<4|g>>4,k=(15&g)<<2|h>>6,l=63&h;isNaN(g)?k=l=64:isNaN(h)&&(l=64),d.append(this.codex.charAt(i)+this.codex.charAt(j)+this.codex.charAt(k)+this.codex.charAt(l))}return d.toString()},"decode":function(a){for(var c=new b,e=new d(a);e.moveNext();){var f=e.current;if(128>f)c.append(String.fromCharCode(f));else if(f>191&&224>f){e.moveNext();var g=e.current;c.append(String.fromCharCode((31&f)<<6|63&g))}else{e.moveNext();var g=e.current;e.moveNext();var h=e.current;c.append(String.fromCharCode((15&f)<<12|(63&g)<<6|63&h))}}return c.toString()}};return c.prototype={"current":Number.NaN,"moveNext":function(){if(this._buffer.length>0)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=Number.NaN,!1;var a=this._input.charCodeAt(++this._index);return 13==a&&10==this._input.charCodeAt(this._index+1)&&(a=10,this._index+=2),128>a?this.current=a:a>127&&2048>a?(this.current=a>>6|192,this._buffer.push(63&a|128)):(this.current=a>>12|224,this._buffer.push(a>>6&63|128),this._buffer.push(63&a|128)),!0}},d.prototype={"current":64,"moveNext":function(){if(this._buffer.length>0)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=64,!1;var a=g.codex.indexOf(this._input.charAt(++this._index)),b=g.codex.indexOf(this._input.charAt(++this._index)),c=g.codex.indexOf(this._input.charAt(++this._index)),d=g.codex.indexOf(this._input.charAt(++this._index)),e=a<<2|b>>4,f=(15&b)<<4|c>>2,h=(3&c)<<6|d;return this.current=e,64!=c&&0!=f&&this._buffer.push(f),64!=d&&0!=h&&this._buffer.push(h),!0}},{"encode":e,"decode":f}}),("undefined"!=typeof _AP?define:AP.define)("_uri",[],function(){function a(a){return a&&(a=decodeURIComponent(a),a=a.replace(e.pluses," ")),a}function b(a){var b=e.uri_parser,c=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],d=b.exec(a||""),f={};return c.forEach(function(a,b){f[a]=d[b]||""}),f}function c(a){var b,c,d,f,g,h,i=[];if("undefined"==typeof a||null===a||""===a)return i;for(0===a.indexOf("?")&&(a=a.substring(1)),c=a.toString().split(e.query_separator),b=0;b<c.length;b++)d=c[b],f=d.indexOf("="),0!==f&&(g=decodeURIComponent(d.substring(0,f)),h=decodeURIComponent(d.substring(f+1).replace(/\+/g," ")),i.push(-1===f?[d,null]:[g,h]));return i}function d(a){this.uriParts=b(a),this.queryPairs=c(this.uriParts.query),this.hasAuthorityPrefixUserPref=null}var e={"starts_with_slashes":/^\/+/,"ends_with_slashes":/\/+$/,"pluses":/\+/g,"query_separator":/[&;]/,"uri_parser":/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/};return Array.prototype.forEach||(Array.prototype.forEach=function(a,b){for(var c=0,d=this.length;d>c;++c)a.call(b||this,this[c],c,this)}),["protocol","userInfo","host","port","path","anchor"].forEach(function(a){d.prototype[a]=function(b){return"undefined"!=typeof b&&(this.uriParts[a]=b),this.uriParts[a]}}),d.prototype.hasAuthorityPrefix=function(a){return"undefined"!=typeof a&&(this.hasAuthorityPrefixUserPref=a),null===this.hasAuthorityPrefixUserPref?-1!==this.uriParts.source.indexOf("//"):this.hasAuthorityPrefixUserPref},d.prototype.query=function(a){var b,d,e="";for("undefined"!=typeof a&&(this.queryPairs=c(a)),b=0;b<this.queryPairs.length;b++)d=this.queryPairs[b],e.length>0&&(e+="&"),null===d[1]?e+=d[0]:(e+=d[0],e+="=",d[1]&&(e+=encodeURIComponent(d[1])));return e.length>0?"?"+e:e},d.prototype.getQueryParamValue=function(a){var b,c;for(c=0;c<this.queryPairs.length;c++)if(b=this.queryPairs[c],a===b[0])return b[1]},d.prototype.getQueryParamValues=function(a){var b,c,d=[];for(b=0;b<this.queryPairs.length;b++)c=this.queryPairs[b],a===c[0]&&d.push(c[1]);return d},d.prototype.deleteQueryParam=function(b,c){var d,e,f,g,h=[];for(d=0;d<this.queryPairs.length;d++)e=this.queryPairs[d],f=a(e[0])===a(b),g=e[1]===c,(1!==arguments.length||f)&&(2!==arguments.length||f&&g)||h.push(e);return this.queryPairs=h,this},d.prototype.addQueryParam=function(a,b,c){return 3===arguments.length&&-1!==c?(c=Math.min(c,this.queryPairs.length),this.queryPairs.splice(c,0,[a,b])):arguments.length>0&&this.queryPairs.push([a,b]),this},d.prototype.replaceQueryParam=function(b,c,d){var e,f,g=-1;if(3===arguments.length){for(e=0;e<this.queryPairs.length;e++)if(f=this.queryPairs[e],a(f[0])===a(b)&&decodeURIComponent(f[1])===a(d)){g=e;break}this.deleteQueryParam(b,d).addQueryParam(b,c,g)}else{for(e=0;e<this.queryPairs.length;e++)if(f=this.queryPairs[e],a(f[0])===a(b)){g=e;break}this.deleteQueryParam(b),this.addQueryParam(b,c,g)}return this},["protocol","hasAuthorityPrefix","userInfo","host","port","path","query","anchor"].forEach(function(a){var b="set"+a.charAt(0).toUpperCase()+a.slice(1);d.prototype[b]=function(b){return this[a](b),this}}),d.prototype.scheme=function(){var a="";return this.protocol()?(a+=this.protocol(),this.protocol().indexOf(":")!==this.protocol().length-1&&(a+=":"),a+="//"):this.hasAuthorityPrefix()&&this.host()&&(a+="//"),a},d.prototype.origin=function(){var a=this.scheme();return"file://"==a?a+this.uriParts.authority:(this.userInfo()&&this.host()&&(a+=this.userInfo(),this.userInfo().indexOf("@")!==this.userInfo().length-1&&(a+="@")),this.host()&&(a+=this.host(),this.port()&&(a+=":"+this.port())),a)},d.prototype.addTrailingSlash=function(){var a=this.path()||"";return"/"!==a.substr(-1)&&this.path(a+"/"),this},d.prototype.toString=function(){var a,b=this.origin();return this.path()?(a=this.path(),e.ends_with_slashes.test(b)||e.starts_with_slashes.test(a)?(b&&b.replace(e.ends_with_slashes,"/"),a=a.replace(e.starts_with_slashes,"/")):b+="/",b+=a):this.host()&&(this.query().toString()||this.anchor())&&(b+="/"),this.query().toString()&&(0!==this.query().toString().indexOf("?")&&(b+="?"),b+=this.query().toString()),this.anchor()&&(0!==this.anchor().indexOf("#")&&(b+="#"),b+=this.anchor()),b},d.prototype.clone=function(){return new d(this.toString())},{"init":d}}),("undefined"!=typeof _AP?define:AP.define)("_ui-params",["_dollar","_base64","_uri"],function(a,b,c){return{"encode":function(a){return a?b.encode(JSON.stringify(a)):void 0},"fromUrl":function(a){var a=new c.init(a),b=a.getQueryParamValue("ui-params");return this.decode(b)},"fromWindowName":function(a,b){a=a||window;var c=this.decode(a.name);return b?c?c[b]:void 0:c},"decode":function(a){var c={};if(a&&a.length>0)try{c=JSON.parse(b.decode(a))}catch(d){console&&console.log&&console.log("Cannot decode passed ui params",a)}return c}}}),("undefined"!=typeof _AP?define:AP.define)("_jwt",["_base64"],function(a){"use strict";function b(a){return c(a).iss}function c(b){if(null===b||""===b)throw"Invalid JWT: must be neither null nor empty-string.";var c=b.indexOf("."),d=b.indexOf(".",c+1);if(0>c||c>=d)throw'Invalid JWT: must contain 2 period (".") characters.';var e=b.substring(c+1,d);if(null===e||""===e)throw"Invalid JWT: encoded claims must be neither null nor empty-string.";var f=a.decode(e);return JSON.parse(f)}function d(a,b){void 0===b&&(b=60);var d=c(a),e=0,f=Math.floor(Date.now()/1e3);return d&&d.exp&&(e=d.exp),b>e-f?!0:!1}return{"parseJwtIssuer":b,"parseJwtClaims":c,"isJwtExpired":d}});var deps=["_events","_jwt","_uri","_ui-params","host/_util"];this.AP&&(deps=["_events","_jwt","_uri","_ui-params"]),("undefined"!=typeof _AP?define:AP.define)("_xdm",deps,function(a,b,c,d,e){"use strict";function f(h,i,j){function k(a,b,c){try{C.postMessage(JSON.stringify({"c":E,"i":a,"t":b,"m":c}),D)}catch(d){y(w(d))}}function l(a,b,c,d){var e=Math.floor(1e9*Math.random()).toString(16);O.add(e,c,d),k(e,"request",{"n":a,"a":b})}function m(a,b){k(a,"done",b)}function n(a,b){k(a,"fail",b)}function o(a){try{var b=JSON.parse(a.data),c=b.i,d=b.c,e=b.t,f=b.m;if(a.source!==C&&a.origin.toLowerCase()===D&&d===E&&(C=a.source),a.source!==C||a.origin.toLowerCase()!==D||d!==E)return;if("request"===e){var g,h,i,j=f.n,k=f.a,l=L[j];if(l){g=function(a){m(c,a)},h=function(a){n(c,a)},i=(k?k.length:0)<l.length;var o=L;A.isHost===!0?(o=A,o.analytics&&o.analytics.trackBridgeMethod(j)):o.isHost=!1;try{i?l.apply(o,k.concat([g,h])):g(l.apply(o,k))}catch(p){h(w(p)),z(p)}}else x("Unhandled request:",b)}else("done"===e||"fail"===e)&&(O.invoke(e,c,f)||x("Unhandled response:",e,c,f))}catch(p){y(w(p))}}function p(a){return function(){function b(){return h.isFunction(e[e.length-1])?e.pop():void 0}var c,d,e=[].slice.call(arguments);d=b(),c=b(),c||(c=d,d=void 0),l(a,e,c,d)}}function q(a){A.isActive()?o(a.originalEvent?a.originalEvent:a):s()}function r(){h(window).bind("message",q)}function s(){h(window).unbind("message",q)}function t(a,b){return new c.init(a).getQueryParamValue(b)}function u(a){return new c.init(a).origin()}function v(a){if(!a.container)throw new Error("config.container must be defined");var b=document.createElement("iframe"),c="easyXDM_"+a.container+"_provider",f="";return a.uiParams&&(f=d.encode(a.uiParams)),h.extend(b,{"id":c,"name":f,"frameBorder":"0"},a.props),b.setAttribute("rel","nofollow"),h("#"+e.escapeSelector(a.container)).append(b),h(b).trigger("ra.iframe.create"),b.src=a.remote,b}function w(a){return a.message||a.toString()}function x(){f.debug&&y.apply(J,["DEBUG:"].concat([].slice.call(arguments)))}function y(){var a=h.log||J.AJS&&J.AJS.log;a&&a.apply(J,arguments)}function z(){var a=J.AJS&&J.AJS.error;a&&a.apply(J,arguments)}var A,B,C,D,E,F,G,H,I,J=window,K=J.location.toString(),L=j.local||{},M=j.remote||[],N=u(K),O=function(){var a={};return{"add":function(b,c,d){a[b]={"done":c||null,"fail":d||null,"async":!!c}},"invoke":function(b,c,d){var e;return a[c]&&(a[c][b]?(a[c][b](d),e=!0):e=!a[c].async&&"fail"!==b,delete a[c]),e}}}();if(/xdm_e/.test(K)){C=J.parent,G="local";var P=t(K,"jwt");H=P?b.parseJwtIssuer(P):t(K,"oauth_consumer_key"),null===H&&(H=Math.random()),I=G,D=t(K,"xdm_e").toLowerCase(),E=t(K,"xdm_c"),F={"isHost":!1,"isActive":function(){return!0}}}else{h("#"+e.escapeSelector(i.container)).find("iframe").trigger("ra.iframe.destroy");var Q=v(i);C=Q.contentWindow,G=t(i.remote,"oauth_consumer_key")||t(i.remote,"jwt"),H=i.remoteKey,I=H,D=u(i.remote).toLowerCase(),E=i.channel,F={"isHost":!0,"iframe":Q,"uiParams":i.uiParams,"destroy":function(){window.clearTimeout(A.timeout),s(),A.iframe&&(h(A.iframe).remove(),delete A.iframe)},"isActive":function(){return h.contains(document.documentElement,A.iframe)}},h(Q).on("ra.iframe.destroy",F.destroy)}B=I+"|"+(g+=1),A=h.extend({"id":B,"remoteOrigin":D,"channel":E,"addonKey":I},F),h.each(M,function(a,b){"number"==typeof a&&(a=b),A[a]=p(a)});var R=A.events=new a.Events(G,N);return R.onAny(function(){var a=arguments[arguments.length-1],b=a.trace=a.trace||{},c=A.id+"|xdm";(A.isHost&&!b[c]&&a.source.channel!==A.id||!A.isHost&&a.source.key===G)&&(b[c]=!0,a=h.extend({},a),delete a.trace,x("Forwarding "+(A.isHost?"host":"addon")+" event:",a),l("_event",[a]))}),L._event=function(a){delete a.trace,this.isHost&&(a.source={"channel":this.id||B,"key":this.addonKey,"origin":this.remoteOrigin||D}),x("Receiving as "+(this.isHost?"host":"addon")+" event:",a),R._emitEvent(a)},r(),A}var g=0;return f}),AP.define("_rpc",["_dollar","_xdm"],function(a,b){"use strict";var c,d,e=a.each,f=a.extend,g=a.isFunction,h={},i={},j=["init"],k={},l=[];return{"extend":function(a){g(a)&&(a=a(h)),f(i,a.apis),f(k,a.internals),j=j.concat(a.stubs||[]);var b=a.init;return g(b)&&l.push(b),a.apis},"init":function(g){g=g||{},d||(e(i,function(a){j.push(a)}),c=this.rpc=new b(a,{},{"remote":j,"local":k}),c.init(),f(h,c),e(l,function(b,c){try{c(f({},g))}catch(d){a.handleError(d)}}),d=!0)}}}),AP.define("events",["_dollar","_rpc"],function(a,b){"use strict";return b.extend(function(b){var c={};return a.each(["on","once","onAny","off","offAll","offAny","emit"],function(a,d){c[d]=function(){var a=b.events;return a[d].apply(a,arguments),c}}),{"apis":c}})}),AP.define("env",["_dollar","_rpc","_ui-params"],function(a,b,c){"use strict";var d=c.fromWindowName(),e=Boolean(d.isInlineDialog),f=b.extend(function(b){return{"apis":{"getLocation":function(a){b.getLocation(a)},"getUser":function(a){AP.require(["user"],function(b){return b&&b.getUser?b.getUser(a):void 0})},"resize":a.debounce(function(a,c){var d=f.size(a,c,f.container());b.resize(d.w,d.h)},50),"sizeToParent":a.debounce(function(){b.sizeToParent()},50)}}});return a.extend(f,{"meta":function(b){if(!(navigator.userAgent.indexOf("MSIE 8")>=0))return a("meta[name='ap-"+b+"']").attr("content");var c,d=document.getElementsByTagName("meta");for(c=0;c<d.length;c++)if(d[c].getAttribute("name")==="ap-"+b)return d[c].getAttribute("content")},"container":function(){var b=a(".ac-content, #content");return b.length>0?b[0]:document.body},"localUrl":function(a){return this.meta("local-base-url")+(null==a?"":a)},"size":function(a,b,c){var d,f,g=null==a?"100%":a;return c||(c=this.container()),e&&"100%"===a&&(g=Math.max(c.scrollWidth,c.offsetWidth,c.clientWidth)),b?d=b:(f=Math.max(c.scrollHeight,document.documentElement.scrollHeight,c.offsetHeight,document.documentElement.offsetHeight,c.clientHeight,document.documentElement.clientHeight),c===document.body?d=f:(d=Math.max(c.offsetHeight,c.clientHeight),0===d&&(d=f))),{"w":g,"h":d}}})}),AP.define("request",["_dollar","_rpc"],function(a,b){"use strict";function c(a){var b=e({},a),c=a.headers||{};return delete b.headers,e(b,{"getResponseHeader":function(a){var b=null;return a&&(a=a.toLowerCase(),d(c,function(c,d){return c.toLowerCase()===a?(b=d,!1):void 0})),b},"getAllResponseHeaders":function(){var a="";return d(c,function(b,c){a+=(a?"\r\n":"")+b+": "+c}),a}})}var d=a.each,e=a.extend,f=b.extend(function(a){return{"apis":{"request":function(b,d){function e(a){return h(a[0],a[1],c(a[2]))}function f(a){return i(c(a[0]),a[1],a[2])}function g(){}var h,i;"object"==typeof b?d=b:d?d.url=b:d={"url":b},h=d.success||g,delete d.success,i=d.error||g,delete d.error,a.request(d,e,f)}}}});return f.request}),AP.define("dialog",["_dollar","_rpc","_ui-params","_uri"],function(a,b,c,d){"use strict";var e,f=c.fromUrl(window.location.toString()),g=Boolean(f.dlg)||Boolean(f.isDialog),h=new d.init(window.location.toString());return"1"===h.getQueryParamValue("dialog")&&(g=!0),b.extend(function(b){var c={};return e={"create":function(a){return b.createDialog(a),{"on":function(a,c){b.events.once("dialog."+a,c)}}},"close":function(a){b.events.emit("dialog.close",a),b.closeDialog()},"isDialog":g,"onDialogMessage":function(a,b){this.getButton(a).bind(b)},"getButton":function(d){return{"name":d,"enable":function(){b.setDialogButtonEnabled(d,!0)},"disable":function(){b.setDialogButtonEnabled(d,!1)},"toggle":function(){var a=this;a.isEnabled(function(b){a[b?"disable":"enable"](d)})},"isEnabled":function(a){b.isDialogButtonEnabled(d,a)},"bind":function(a){b.dialogListenerBound();var e=c[d];e||(e=c[d]=[]),e.push(a)},"trigger":function(){var b=this,e=!0,f=!0,g=c[d];return a.each(g,function(a,c){return f=c.call(b,{"button":b,"stopPropagation":function(){e=!1}}),e}),!!f}}}},{"internals":{"dialogMessage":function(b){var c=!0;try{g?c=e.getButton(b).trigger():a.handleError("Received unexpected dialog button event from host:",b)}catch(d){a.handleError(d)}return c}},"stubs":["dialogListenerBound","setDialogButtonEnabled","isDialogButtonEnabled","createDialog","closeDialog"],"init":function(){g&&window.addEventListener("keydown",function(a){27===a.keyCode&&e.close()})}}}),e}),AP.define("inline-dialog",["_dollar","_rpc"],function(a,b){"use strict";var c;return b.extend(function(a){return c={"hide":function(){a.hideInlineDialog()}},{"stubs":["hideInlineDialog"]}}),c}),AP.define("messages",["_dollar","_rpc"],function(a,b){"use strict";function c(){return d++,"ap-message-"+d}var d=0;return b.extend(function(b){var d={};return a.each(["generic","error","warning","success","info","hint"],function(a,e){d[e]=function(a,d,f){return f=f||{},f.id=c(),b.showMessage(e,a,d,f),f.id}}),d.clear=function(a){b.clearMessage(a)},{"apis":d,"stubs":["showMessage","clearMessage"]}})}),AP.define("cookie",["_dollar","_rpc"],function(a,b){"use strict";var c;return b.extend(function(a){return c={"save":function(b,c,d){a.saveCookie(b,c,d)},"read":function(b,c){a.readCookie(b,c)},"erase":function(b){a.eraseCookie(b)}},{"stubs":["saveCookie","readCookie","eraseCookie"]}}),c}),AP.define("history",["_dollar","_rpc","_ui-params"],function(a,b,c){"use strict";var d=[],e=c.fromWindowName(null,"historyState");return b.extend(function(b){var c={"getState":function(){return e},"go":function(a){b.historyGo(a)},"back":function(){return this.go(-1)},"forward":function(){return this.go(1)},"pushState":function(a){e=a,b.historyPushState(a)},"replaceState":function(a){e=a,b.historyReplaceState(a)},"popState":function(a){d.push(a)}};return{"apis":c,"internals":{"historyMessage":function(b){e=b.newURL;for(var c in d)try{d[c](b)}catch(f){a.log("History popstate callback exception: "+f.message)}}},"stubs":["historyPushState","historyGo","historyReplaceState"]}})}),(window.AP||window._AP).define("_resize_listener",["_dollar"],function(a){"use strict";function b(a,b,c){var d="over"==b;a.addEventListener("OverflowEvent"in window?"overflowchanged":b+"flow",function(a){return a.type==b+"flow"||0==a.orient&&a.horizontalOverflow==d||1==a.orient&&a.verticalOverflow==d||2==a.orient&&a.horizontalOverflow==d&&a.verticalOverflow==d?(a.flow=b,c.call(this,a)):void 0},!1)}function c(c,d){var e="onresize"in c;if(!e&&!c._resizeSensor){a("head").append({"tag":"style","type":"text/css","$text":".ac-resize-sensor,.ac-resize-sensor>div {position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;z-index: -1;}"});var f=c._resizeSensor=document.createElement("div");f.className="ac-resize-sensor",f.innerHTML='<div class="ac-resize-overflow"><div></div></div><div class="ac-resize-underflow"><div></div></div>';var g=0,h=0,i=f.firstElementChild.firstChild,j=f.lastElementChild.firstChild,k=function(a){var b=!1,d=c.offsetWidth;g!=d&&(i.style.width=d-1+"px",j.style.width=d+1+"px",b=!0,g=d);var e=c.offsetHeight;if(h!=e&&(i.style.height=e-1+"px",j.style.height=e+1+"px",b=!0,h=e),b&&a.currentTarget!=c){var a=document.createEvent("Event");a.initEvent("resize",!0,!0),c.dispatchEvent(a)}};"static"===getComputedStyle(c).position&&(c.style.position="relative",c._resizeSensor._resetPosition=!0),b(f,"over",k),b(f,"under",k),b(f.firstElementChild,"over",k),b(f.lastElementChild,"under",k),c.appendChild(f),k({})}var l=c._flowEvents||(c._flowEvents=[]);-1==a.inArray(d,l)&&l.push(d),e||c.addEventListener("resize",d,!1),c.onresize=function(b){a.each(l,function(a,d){d.call(c,b)})}}return{"addListener":c}});
AP.define("user",["_dollar","_rpc"],function(b,c){var a=c.extend(function(d){return{apis:{getUser:function(e){d.getUser(e)
},getTimeZone:function(e){d.getTimeZone(e)
}}}
});
AP.getUser=a.getUser;
AP.getTimeZone=a.getTimeZone;
return a
});
AP.define("jira",["_dollar","_rpc"],function(e,g){var h,b,a,c;
var i={onSaveValidation:function(j){b=j
},onSave:function(j){h=j
},trigger:function(){var j=true;
if(e.isFunction(b)){j=b.call()
}return{valid:j,value:j?""+h.call():undefined}
}};
var d={onDashboardItemEdit:function(j){a=j
},triggerEdit:function(){if(e.isFunction(a)){a.call()
}}};
var f=g.extend(function(j){return{apis:{getWorkflowConfiguration:function(k){j.getWorkflowConfiguration(k)
},setDashboardItemTitle:function(k){j.setDashboardItemTitle(k)
},isDashboardItemEditable:function(k){j.isDashboardItemEditable(k)
},refreshIssuePage:function(){j.triggerJiraEvent("refreshIssuePage")
},openCreateIssueDialog:function(l,k){c=l||null;
j.openCreateIssueDialog(k)
}},internals:{setWorkflowConfigurationMessage:function(){return i.trigger()
},triggerDashboardItemEdit:function(){return d.triggerEdit()
},triggerIssueCreateSubmit:function(k){if(e.isFunction(c)){c.call({},k)
}}},stubs:["triggerJiraEvent","openCreateIssueDialog"]}
});
return e.extend(f,{WorkflowConfiguration:i,DashboardItem:d})
});
AP.define("confluence",["_dollar","_rpc"],function(a,b){return b.extend(function(c){return{apis:{saveMacro:function(d,e){c.saveMacro(d,e)
},getMacroData:function(d){c.getMacroData(d)
},getMacroBody:function(d){c.getMacroBody(d)
},closeMacroEditor:function(){c.closeMacroEditor()
}},stubs:["saveMacro","getMacroData","getMacroBody","closeMacroEditor"]}
})
});
AP.require(["_dollar","_rpc","_resize_listener","env","request","dialog","jira","confluence"],function(f,g,l,h,e,i,d,n){function b(){h.getLocation(function(o){f("head").append({tag:"base",href:o,target:"_parent"})
})
}function a(){var q=document.createElement("meta"),p=document.head||document.getElementsByTagName("head")[0],o=false;
f("meta").each(function(s,r){if(r.getAttribute("http-equiv")==="X-UA-Compatible"){o=true;
return false
}});
if(o===false){q.setAttribute("http-equiv","X-UA-Compatible");
q.setAttribute("content","IE=edge");
p.appendChild(q)
}}function k(){var o=i.isDialog?"10px 10px 0 10px":"0";
f("head").append({tag:"style",type:"text/css",$text:"body {margin: "+o+" !important;}"})
}g.extend({init:function(o){if(o.margin!==false){k(o)
}if(o.base===true){b(o)
}if(o.injectRenderModeMeta!==false||this.JSON===undefined){a()
}if(o.sizeToParent){h.sizeToParent()
}else{if(o.resize!==false){var p=o.resize;
if(o.resize===undefined){p="auto"
}p=p==="auto"?125:+p;
if(p>=0&&p<60){p=60
}if(!i.isDialog&&p>0){f.bind(window,"load",function(){var q;
setInterval(function(){var r=h.size();
if(!q||q.w!==r.w||q.h!==r.h){h.resize(r.w,r.h);
q=r
}},p)
})
}else{f.bind(window,"load",function(){h.resize();
var q=h.container();
if(q){l.addListener(q,function(){h.resize()
})
}else{f.log("Your page should have a root block element with an ID called #content or class called .ac-content if you want your page to dynamically resize after the initial load.")
}})
}}}}});
f.extend(AP,h,d,{Meta:{get:h.meta},request:e,Dialog:i});
var m={},c=f("script[src*='/atlassian-connect/all']");
if(!(c&&/\/atlassian-connect\/all(-debug)?\.js($|\?)/.test(c.attr("src")))){c=f("#ac-iframe-options")
}if(c&&c.length>0){var j=c.attr("data-options");
if(j){f.each(j.split(";"),function(t,s){var o=f.trim;
s=o(s);
if(s){var r=s.split(":"),q=o(r[0]),p=o(r[1]);
if(q&&p!=null){m[q]=p==="true"||p==="false"?p==="true":p
}}})
}}g.init(m)
});