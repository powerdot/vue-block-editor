(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d13bf9e0"],{"0088":function(t,n,e){"use strict";n["a"]={name:"block-content",render:function(t){var n=[];return this.$parent.$attrs&&this.$parent.$attrs.isPropEditor?(n=this.$slots.default.filter((function(t){var n;return"property_popup"==(null===(n=t.componentOptions)||void 0===n?void 0:n.Ctor.extendOptions.name)})),t("div",{},n)):(n=this.$slots.default.filter((function(t){var n;return"property_popup"!=(null===(n=t.componentOptions)||void 0===n?void 0:n.Ctor.extendOptions.name)})),t("div",{},n))},props:{isPropEditor:{type:Boolean,default:!1}},data:function(){return{}},methods:{},mounted:function(){}}},"0949":function(t,n){t.exports=function(t){var n,e=null===(n=t.$children[0])||void 0===n?void 0:n.$children.find((function(t){return"block-editor"==t.$vnode.componentOptions.Ctor.extendOptions.name})),o=JSON.parse(JSON.stringify(t.$data));return e&&(o.block_editor=e.Compile(!1)),o}},"2aba":function(t,n,e){"use strict";e("4097")},"36fa":function(t,n,e){},4097:function(t,n,e){},6738:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("block-content",[e("div",{staticClass:"iframeHolder"},[e("iframe",{attrs:{src:"//www.youtube.com/embed/"+t.ytid,frameborder:"0"}})]),e("propertyPopup",{attrs:{title:"YouTube setup"}},[t._v(" Enter ID of YouTube video: "),e("br"),e("input",{directives:[{name:"model",rawName:"v-model",value:t.ytid,expression:"ytid"}],attrs:{type:"link",placeholder:"8w4qPUSG17Y"},domProps:{value:t.ytid},on:{input:function(n){n.target.composing||(t.ytid=n.target.value)}}}),e("br"),e("br"),e("div",{staticClass:"example",on:{click:function(n){t.ytid="dQw4w9WgXcQ"}}},[t._v("For example: "),e("span",[t._v("dQw4w9WgXcQ")])])])],1)},i=[],r=e("9503"),a=e("0088"),u={components:{blockContent:a["a"],propertyPopup:r["a"]},data:function(){return{ytid:""}},methods:{setData:function(t){return e("ed80")(this,t)},getData:function(){return e("0949")(this)},slotMounted:function(){return this.$parent.slotMounted(this)}},mounted:function(){this.slotMounted()}},s=u,d=(e("2aba"),e("2877")),p=Object(d["a"])(s,o,i,!1,null,"2da7e33d",null);n["default"]=p.exports},9503:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.popup.show?e("div",{staticClass:"property_popup"},[e("div",{staticClass:"head"},[e("h2",[t._v(t._s(t.title))])]),e("div",{staticClass:"body"},[t._t("default")],2)]):t._e()},i=[],r={name:"property_popup",components:{},data:function(){return{popup:{show:!0}}},props:{title:{type:String,default:"Title"}},methods:{hide:function(){this.popup.show=!1},show:function(){this.popup.show=!0}},beforeMount:function(){},mounted:function(){}},a=r,u=(e("a962"),e("2877")),s=Object(u["a"])(a,o,i,!1,null,"96f5a5ca",null);n["a"]=s.exports},a962:function(t,n,e){"use strict";e("36fa")},ed80:function(t,n){t.exports=function(t,n){var e;if(!n)return new Error("Data to apply is undefined.");if(t.$data){var o=null===(e=t.$children[0])||void 0===e?void 0:e.$children.find((function(t){return"block-editor"==t.$vnode.componentOptions.Ctor.extendOptions.name}));o&&n.block_editor&&(o._setData(n.block_editor),delete n.block_editor);for(var i=0,r=Object.keys(t.$data);i<r.length;i++){var a=r[i];"undefined"!==typeof n[a]&&(t.$data[a]=n[a])}}}}}]);
//# sourceMappingURL=chunk-d13bf9e0.b4ae8760.js.map