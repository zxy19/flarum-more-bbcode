(()=>{var e={n:o=>{var r=o&&o.__esModule?()=>o.default:()=>o;return e.d(r,{a:r}),r},d:(o,r)=>{for(var a in r)e.o(r,a)&&!e.o(o,a)&&Object.defineProperty(o,a,{enumerable:!0,get:r[a]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};(()=>{"use strict";e.r(o);const r=flarum.core.compat["admin/app"];var a=e.n(r);a().initializers.add("litalino/flarum-more-bbcode",(function(){a().extensionData.for("litalino-more-bbcode").registerPermission({icon:"fas fa-eye-slash",label:a().translator.trans("imeepo-more-bbcode.admin.permissions.bypass_like_label"),permission:"post.bypassLikeRequirement"},"view").registerPermission({icon:"fas fa-eye-slash",label:a().translator.trans("imeepo-more-bbcode.admin.permissions.bypass_reply_label"),permission:"post.bypassReplyRequirement"},"view")}))})(),module.exports=o})();
//# sourceMappingURL=admin.js.map