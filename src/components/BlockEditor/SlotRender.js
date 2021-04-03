
export default {
    render(h){
        const slot = this.$slots.default.find(x=>(x.componentOptions||x.asyncMeta).tag == this.tag);
        console.log('SlotRender: slot', this.block_id, this, slot)
        if(slot) {
            if(slot.asyncMeta){
                return (<div></div>);
            }else{
                return slot;
            }
        }
        return (<div>Block template not found.</div>);
    },
	props: ['tag', 'block_id'],
    data(){
        return {
            setDataQuery: [],
            isSlotMounted: false
        }
    },
    methods: {
        getData(){
            if(this.$children[0].getData){
                return this.$children[0].getData();
            }else{
                return JSON.parse(JSON.stringify(this.$children[0].$data));
            }
        },
        setData(d){
            if(this.isSlotMounted) return this._setData(d);
            this.setDataQuery.push(d);
        },
        slotMounted(_this){
            console.log('SlotRender: slot',this.block_id,'mounted!')
            this.isSlotMounted = true;
            for(let d of this.setDataQuery) this._setData(d);
        },
        _setData(d){
            if(this.$children.length == 0) return;
            if(this.$children[0].setData){
                return this.$children[0].setData(d);
            }else{
                return new Error(`SlotRender: missing method setData()  in ${this.tag} template.`)
            }
        }
    },
    mounted(){
        console.log("SlotRender mnt this", this);
    }
}