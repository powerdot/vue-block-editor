export default {
    name: "slot-render",
    render(h){
        const slot = this.$slots.default.find(x=>(x.componentOptions||x.asyncMeta).tag == this.tag);
        if(slot) {
            if(slot.asyncMeta){
                return (<div></div>);
            }else{
                let r = undefined;
                if(!this.dataRef){
                    // block-editor slot
                    r = h(slot.asyncFactory, this.$slots.default);
                }else{
                    // prop-editor slot
                    r = h(slot.asyncFactory, {class:'show_property_popup', attrs: {isPropEditor: 'yes'}}, this.$slots.default);
                }
                return (r);
            }
        }
        return (<div>Block template not found. Try to add it as a slot to this block-editor element.</div>);
    },
	props: ['tag', 'block_id', 'dataRef'],
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
            // console.log('SlotRender: slot',_this,'mounted!');
            let rootComponent = _this.$children[0].$vnode.componentOptions?.Ctor.extendOptions.name;
            if(rootComponent != 'block-content') console.warn("Root component of block template must be <block-content>.");
            if(this.dataRef) {
                // console.log('SlotRender: dataRef',this.dataRef[0].$children[0])
                // console.log('SlotRender: dataRef _this', _this)
                _this._data = this.dataRef[0].$children[0]._data;
            }
            this.isSlotMounted = true;
            _this.$forceUpdate();
            if(!this.dataRef) for(let d of this.setDataQuery) this._setData(d);
            return this.$emit("slotMounted", {block_id: this.block_id, module: _this});
        },
        _setData(d){
            if(this.$children.length == 0) return;
            if(this.$children[0].setData){
                return this.$children[0].setData(d);
            }else{
                return new Error(`SlotRender: missing method setData()  in ${this.tag} template.`)
            }
        },
        unselectAllChildren(){
            if(this.$children.length == 0) return;
            if(this.$children[0]){
                for(let element of this.$children[0].$children[0].$children){
                    if(element.$vnode.componentOptions.Ctor.extendOptions.name == 'block-editor'){
                        element.unselectAllChildren();
                    }
                }
            }
        }
    },
    mounted(){
        // console.log("SlotRender mnt this", this);
    }
}