(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21d72e66"],{"0088":function(t,e,n){"use strict";e["a"]={name:"block-content",render:function(t){var e=[];return this.$parent.$attrs&&this.$parent.$attrs.isPropEditor?(e=this.$slots.default.filter((function(t){var e;return"property_popup"==(null===(e=t.componentOptions)||void 0===e?void 0:e.Ctor.extendOptions.name)})),t("div",{},e)):(e=this.$slots.default.filter((function(t){var e;return"property_popup"!=(null===(e=t.componentOptions)||void 0===e?void 0:e.Ctor.extendOptions.name)})),t("div",{},e))},props:{isPropEditor:{type:Boolean,default:!1}},data:function(){return{}},methods:{},mounted:function(){}}},"0695":function(t,e,n){},"0949":function(t,e){t.exports=function(t){var e,n=null===(e=t.$children[0])||void 0===e?void 0:e.$children.find((function(t){return"block-editor"==t.$vnode.componentOptions.Ctor.extendOptions.name})),o=JSON.parse(JSON.stringify(t.$data));return n&&(o.block_editor=n.Compile(!1)),o}},"36fa":function(t,e,n){},4571:function(t,e,n){"use strict";n.r(e);var o=function(){var t,e=this,n=e.$createElement,o=e._self._c||n;return o("block-content",[o("div",{class:(t={divider:!0},t[e.divider_type]=!0,t)}),o("propertyPopup",{attrs:{title:"Divider options"}},[e._v(" Select divider type: "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.divider_type,expression:"divider_type"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));e.divider_type=t.target.multiple?n:n[0]}}},e._l(e.divider_types,(function(t){return o("option",{key:t.type+"example_div_type",domProps:{value:t.type}},[e._v(e._s(t.name))])})),0)])],1)},i=[],r=n("9503"),d=n("0088"),p={components:{blockContent:d["a"],propertyPopup:r["a"]},data:function(){return{divider_type:"solid",divider_types:[{name:"Solid",type:"solid"},{name:"Dashed",type:"dashed"},{name:"Coloured",type:"coloured"},{name:"3 dots",type:"threedots"}]}},methods:{setData:function(t){return n("ed80")(this,t)},getData:function(){return n("0949")(this)},slotMounted:function(){return this.$parent.slotMounted(this)}},mounted:function(){this.slotMounted()}},a=p,u=(n("5421"),n("2877")),s=Object(u["a"])(a,o,i,!1,null,"58330827",null);e["default"]=s.exports},5421:function(t,e,n){"use strict";n("0695")},9503:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.popup.show?n("div",{staticClass:"property_popup"},[n("div",{staticClass:"head"},[n("h2",[t._v(t._s(t.title))])]),n("div",{staticClass:"body"},[t._t("default")],2)]):t._e()},i=[],r={name:"property_popup",components:{},data:function(){return{popup:{show:!0}}},props:{title:{type:String,default:"Title"}},methods:{hide:function(){this.popup.show=!1},show:function(){this.popup.show=!0}},beforeMount:function(){},mounted:function(){}},d=r,p=(n("a962"),n("2877")),a=Object(p["a"])(d,o,i,!1,null,"96f5a5ca",null);e["a"]=a.exports},a962:function(t,e,n){"use strict";n("36fa")},ed80:function(t,e){t.exports=function(t,e){var n;if(!e)return new Error("Data to apply is undefined.");if(t.$data){var o=null===(n=t.$children[0])||void 0===n?void 0:n.$children.find((function(t){return"block-editor"==t.$vnode.componentOptions.Ctor.extendOptions.name}));o&&e.block_editor&&(o._setData(e.block_editor),delete e.block_editor);for(var i=0,r=Object.keys(t.$data);i<r.length;i++){var d=r[i];"undefined"!==typeof e[d]&&(t.$data[d]=e[d])}}}}}]);
//# sourceMappingURL=chunk-21d72e66.9ef96acb.js.map