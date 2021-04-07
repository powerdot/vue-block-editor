
export default {
    render(h){
        const slot = this.$slots.default.find(x=>(x.componentOptions||x.asyncMeta).tag == this.tag);
        console.log('PropPopupRender: slot', this.block_id, this, slot)
        if(slot) {
            if(slot.asyncMeta){
                return (<div></div>);
            }else{
                console.log('PropPopupRender: rendering slot...', this.block_id, this.$slots, slot)
                return h(
                    slot.asyncFactory,
                    this.$slots.default
                ) // slot
            }
        }
        return (<div>not found</div>);
    },
	props: [],
    data(){
        return {
            
        }
    },
    methods: {
        
    },
    mounted(){
        
    }
}