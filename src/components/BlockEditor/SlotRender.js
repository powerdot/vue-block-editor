function findSlotByTag(slots,tag){
    let found = slots.find(x=>x.tag==tag);
    return found;
}

function renderError(_this,h,searchTag,defaultText){
    let error_slot = findSlotByTag(_this.$slots.default, searchTag)
    if(!error_slot) error_slot = findSlotByTag(_this.mainEditor().$slots.default, searchTag)
    if(error_slot) error_slot = h('div', error_slot.children)
    if(!error_slot) error_slot = h('div', [defaultText])
    _this.error = true;
    return error_slot;
}

export default {
    name: "slot-render",
    render(h){
        // console.log("this.$slots.default", this.$slots.default)
        let errorTypes = this.mainEditor().errorTypes;
        let all_available_slots_in_all_editors = this.mainEditor().registeredEditors.map(x=>x.$slots.default).flat().filter(x=>!errorTypes.includes(x.tag))
        const slot = all_available_slots_in_all_editors.find(x=>(x.componentOptions||x.asyncMeta)?.tag == this.tag);
        if(slot) {
            if(slot.asyncMeta){
                return (<div></div>);
            }else{
                let r = undefined;
                if(!this.dataRef){
                    // block-editor slot
                    // console.log("CREATING SLOT", slot)
                    r = h(slot.asyncFactory, this.$slots.default);
                }else{
                    // prop-editor slot
                    // console.log("CREATING SLOT BY DATAREF", slot)
                    // console.log("CREATING SLOT BY DATAREF", this.dataRef[0])
                    if(this.dataRef[0]){
                        if(!this.dataRef[0].error){
                            r = h(slot.asyncFactory, {class:'show_property_popup', attrs: {isPropEditor: 'yes'}}, this.$slots.default);
                        }else{
                            r = renderError(this, h, 'propertyEditorTemplateError', 'There is problem with template.');
                        }
                    }else{
                        r = (<div></div>);
                    }
                    
                }
                return (r);
            }
        }

        console.log(this)
        console.log("REGISTERED EDITORS", this.mainEditor().registeredEditors)
        return renderError(this, h, 'templateError', 'Block template not found. Try to add it as a slot to this block-editor element.');
    },
	props: ['tag', 'block_id', 'dataRef'],
    data(){
        return {
            setDataQuery: [],
            isSlotMounted: false,
            error: false,
            _cachedMainEditor: null
        }
    },
    methods: {
        getData(){
            if(!this.$children[0]) return;
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
            let error = false;
            if(rootComponent != 'block-content') {
                console.warn("Root component of block template must be <block-content>.");
                error = true;
            }
            if(this.dataRef) {
                let original_component = this.dataRef[0].$children[0];
                // console.log('SlotRender: dataRef original_component', original_component)
                // console.log('SlotRender: dataRef _this', _this)
                if(original_component){
                    _this._data = original_component._data;
                }else{
                    // let els = document.querySelectorAll('.propedit')
                    // for(let el of els) el.innerHTML = ""
                    console.warn("Component not mounted");
                    error = true;
                }
            }
            this.error = error||this.error;
            this.isSlotMounted = true;
            _this.$forceUpdate();
            if(!this.dataRef) for(let d of this.setDataQuery) this._setData(d);
            return this.$emit("slotMounted", {block_id: this.block_id, module: _this, error});
        },
        _setData(d){
            if(this.$children.length == 0) return;
            if(this.$children[0].setData){
                return this.$children[0].setData(d);
            }else{
                return new Error(`SlotRender: missing method setData()  in ${this.tag} template.`)
            }
        },
        unselectAllChildren(user_event, from_main_editor){
            if(this.$children.length == 0) return;
            if(this.$children[0]){
                for(let element of this.$children[0].$children[0].$children){
                    if(element.$vnode.componentOptions.Ctor.extendOptions.name == 'block-editor'){
                        element.unselectAllChildren(user_event, from_main_editor);
                    }
                }
            }
        },
        mainEditor(){
            if(this._cachedMainEditor) return this._cachedMainEditor;
            let all_parent_blocks = [];
            let current_parent = this.$parent;
            for(;;){
                if(!current_parent.$vnode) break;
                if(current_parent.$vnode.componentOptions.Ctor.extendOptions.name == 'block-editor') all_parent_blocks.push(current_parent);
                if(!current_parent.$parent) break;
                current_parent = current_parent.$parent;
            }
            let main_editor = all_parent_blocks.slice(-1)[0];
            if(!main_editor) main_editor = this;
            this._cachedMainEditor = main_editor;
            return main_editor;
        },
    },
    mounted(){
        // console.log("SlotRender mnt this", this);
    }
}