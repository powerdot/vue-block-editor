export default {
    name: "block-content",
    render(h){
        let render_slots = [];
        if(this.$parent.$attrs){
            if(this.$parent.$attrs.isPropEditor){
                render_slots = this.$slots.default.filter(x=>x.componentOptions?.Ctor.extendOptions.name=="property_popup");
                return h('div', {}, render_slots);
            }
        }
        render_slots = this.$slots.default.filter(x=>x.componentOptions?.Ctor.extendOptions.name!="property_popup");
        return h('div', {}, render_slots);
    },
	props: {
        isPropEditor: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {}
    },
    methods: {},
    mounted(){
        // console.log("BlockContent mnt this", this);
    }
}