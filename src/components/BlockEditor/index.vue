<template>
	<div :class="{container: true, [layout]: true}">
		<div :class="{blocks: true, [layout]: true}" v-if="layout_options.menu">
            <draggable
                class='dragArea list-group'
                :list="[block]"
                draggable=".item"
                :group="{ name: editor_group, pull: 'clone', put: false }"
                :clone="cloneBlockProto"
                :move="moveBlock"
                v-for="block in availableBlocks" :key="block.tag"
            >
                <div :class="{block:true, active: block.active, [`slot-draggable-${block.tag}`]: true, item: true}">
                    {{block.name}}
                </div>
            </draggable>
            <button @click='Compile'>Compile!</button>
		</div>
		<div :class="{editor: true, [layout]: true, mainEditor: isThisMainEditor}" v-if="layout_options.editor" @click="unselectInBlockEditor(false, true, true)">
            <template v-if='historyShow'>
                <div class='history'>
                    <button class='history_button undo' @click='HistoryUndo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </button>
                    <button class='history_button redo' @click='HistoryRedo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                    </button>
                    <span style="margin-left: 10px; font-size: 10pt; position: relative; top: -2px; opacity: 0.5;">Step: {{historyStep==null?"last":historyStep}}/{{historyCompiled.length}}</span>
                </div>
            </template>
            <draggable 
                :class="['dragArea', 'list-group', ...draggableClasses]"
                v-model="editor" 
                draggable=".item"
                :group="editor_group"
                @start="BlockDragStart"
                @end="BlockDragEnd"
                @add="BlockDragAdded"
                ghost-class="ghost"
                :touchStartThreshold="20"
                :move="moveBlock"
            >
                <div :class='["item", "slot-draggable-"+block.tag]' v-for='(block, block_i) of editor' :key="block.id" :tag="block.tag" :block_id="block.id" @click="SlotClick(block, $event)">
                    <add-block :newBlockIndex="block_i" :availableBlocks="availableBlocks" @addBlock="modalMenuAddBlock" :copyBuffer="mainEditor().copyBuffer" @pasteBlocks="pasteBlocks" :editorTags="activeTags"></add-block>
                    <div :class="{block:true, selected: block.selected}" :id='block.id'>
                        <SlotRender :ref="block.id" :tag="block.tag" :block_id="block.id" @slotMounted="slotMounted">
                            <slot></slot>
                        </SlotRender>
                    </div>
                    <div :class="{removeBlock: true}" @click="removeBlockFromEditor($event,block)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <div :class="{copyBlock: true}" @click="copyBlock($event,block)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                    </div>
                </div>
                <add-block :availableBlocks="availableBlocks" @addBlock="modalMenuAddBlock" :first="editor.length==0" :copyBuffer="mainEditor().copyBuffer" @pasteBlocks="pasteBlocks" :editorTags="activeTags"></add-block>
            </draggable>
            <!-- <div style='position: absolute; font-size: 8pt;'>{{editor}}</div> -->
		</div>
        
        <div class="propedit">
            <template v-if='selectedBlock'>
                <SlotRender 
                    :key="'render_prop_'+selectedBlock.id" 
                    :ref="'render_prop'+selectedBlock.id" 
                    :tag="selectedBlock.tag" 
                    :block_id="selectedBlock.id"
                    :dataRef="selectedBlock.ref"
                >
                    <slot></slot>
                </SlotRender>
            </template>
        </div>
	</div>
</template>

<script>

function countSlotsFromProtoObject(data){ 
    let counter = 0;
    if(typeof data == 'object'){
        if(Array.isArray(data)) {
            data.map(el => counter += countSlotsFromProtoObject(el))
        }else{
            for(let key of Object.keys(data)){
                let el = data[key];
                if(key=='block_editor' || key=='data'){
                    if(key=='block_editor') counter++;
                    counter += countSlotsFromProtoObject(el);
                }
            }
        }
    }
    return counter
}

let errorTypes = ['propertyEditorTemplateError', 'templateError'];

import SlotRender from './SlotRender.js';
import draggable from 'vuedraggable'
import clickOutside from './click_outside'
import addBlock from './addBlock'

export default {
	name: 'block-editor',
	components: {
        SlotRender,
        draggable,
        addBlock
	},
    directives: {
        clickOutside
    },
    props: {
        layout: {
            type: String,
            default: 'full'
        },
        group: {
            type: String,
            default: 'editor_rnd'
        },
        historyLength: {
            type: Number,
            default: 14
        },

        values: {
            type: Array,
            default: ()=>([])
        }
    },
	data: ()=>{
		return {
			availableBlocks: [],
			editor: [],
            slotsMounted: 0,
            slotsMustBeMounted: 0,
            slotsImportCount: 0,
            setDataQuery: [],
            layout_options: {
                menu: false,
                editor: false
            },
            current_slots: [],
            editor_group: "editor_",
            tempDragData: {},
            selectedBlock: null,
            _cachedMainEditor: null,
            selectBlockAfterMount: [],
            setDataToBlockAfterMount: [],
            copyBuffer: [],
            registeredEditors: [],
            errorTypes,
            loadedSlots: 0,
            draggableClasses: [],
            activeTags: [],
            isThisMainEditor: null,
            historyShow: false,
            historyCompiled: [],
            historyStep: null
		}
	},
	methods: {
        moveBlock(e){
            let to_classes = [...e.to.classList];
            let el_class = [...e.dragged.classList].filter(x=>x.includes('slot-draggable'))[0]
            let can_place = to_classes.includes(el_class);
            return can_place;
        },
        modalMenuAddBlock(block, block_i){
            let new_block = this.addBlockToEditor(block, block_i, true);
            this.selectBlockAfterMount.push(new_block);
            //
        },
        slotMounted(slot_data){
            console.log(`slotMounted to: ${this.isThisEditorIsMain()?'main':'child'}`, slot_data)
            for(let block of this.selectBlockAfterMount){
                if(block.id == slot_data.block_id){
                    this.SlotClick(block);
                    this.selectBlockAfterMount = this.selectBlockAfterMount.filter(x=>x.id!=block.id);
                }
            }
            for(let block of this.setDataToBlockAfterMount){
                if(block.id == slot_data.block_id){
                    this.$refs[block.id][0].setData(block.data);
                    this.setDataToBlockAfterMount = this.setDataToBlockAfterMount.filter(x=>x.id!=block.id);
                }
            }
            if(!this.isThisEditorIsMain()){
                this.mainEditor().slotMounted(slot_data);
            }else{
                this.slotsMounted++;
                console.log("slots mounted:", this.slotsMounted+"/"+this.slotsMustBeMounted);
                if(this.slotsMustBeMounted == this.slotsMounted){
                    this.Imported();
                }
            }
        },
		addBlockToEditor(block, block_i, is_user_event=false){
			let block_proto = JSON.parse(JSON.stringify(block));
            block_proto.id = block_proto.id||this.parseID(block_proto);
            delete block_proto.data;
            block_proto.selected = false;
            if(typeof block_i != 'undefined'){
                this.editor.splice(block_i, 0, block_proto);
            }else{
                this.editor.push(block_proto);
            }
            this.mainEditor().editorChanged(is_user_event); 
            return block_proto;
		},
        removeBlockFromEditor(e,block){
            this.editor = this.editor.filter(x=>x.id!=block.id);
            this.mainEditor().setSelectedBlock(null);
            this.mainEditor().unselectInBlockEditor(false, true, true);
            this.mainEditor().editorChanged(true);
            e.stopPropagation();
        },
        copyBlock(e,block){
            let copied_block_structure = JSON.parse(JSON.stringify(this.editor)).find(x=>x.id==block.id);
            delete copied_block_structure.selected;
            delete copied_block_structure.id;
            copied_block_structure.data = this.$refs[block.id][0].getData();
            this.mainEditor().addToCopyBuffer(copied_block_structure)
        },
        addToCopyBuffer(copied_block){
            // console.log('copied_block', copied_block)
            this.copyBuffer = [];
            this.copyBuffer.push(copied_block);
            this.$forceUpdate();
            console.log('copyBuffer', this.copyBuffer)
        },
        pasteBlocks(copyBuffer, newBlockIndex){
            console.log('pasteBlocks', this.$el, copyBuffer, newBlockIndex)
            let index_correction = 0;
            for(let b of copyBuffer){
                let added;
                if(typeof newBlockIndex != 'undefined'){
                    added = this.addBlockToEditor(b, newBlockIndex+index_correction, true);
                }else{
                    added = this.addBlockToEditor(b, undefined, true);
                }
                this.selectBlockAfterMount.push(added);
                this.setDataToBlockAfterMount.push({...added, data: b.data});
                index_correction++;
            }
        },
        cloneBlockProto(block){
            let block_proto = JSON.parse(JSON.stringify(block));
            block_proto.id = this.parseID(block_proto);
            return block_proto;
        },
        parseID(block){
            if(!block.proto_id) return Math.floor(Math.random()*99999999).toString();
            return block.proto_id.replace(/rnd/g, Math.floor(Math.random()*99999999).toString());
        },
        Compile(do_emit=true){
            let blocks = JSON.parse(JSON.stringify(this.editor));
            for(let b of blocks){
                delete b.selected;
                // console.log('Compiler block',b, this.$refs[b.id][0])
                b.data = this.$refs[b.id][0].getData();
            }
            if(do_emit) this.$emit('Compiled', blocks);
            return blocks;
        },
        setData(d){
            this._setData(d);
        },
        _setData(d){
            console.log("_setData data:", d)
            this.editor = [];
            for(let block of d){
                console.log("_setData block", block);
                console.log("_setData addBlockToEditor", block)
                this.addBlockToEditor(block);
            }
            this.$nextTick(()=>{
                for(let block of d){
                    if(!this.editor.find(x=>x.id==block.id)) continue;
                    this.$refs[block.id][0].setData(block.data);
                }
            })
        },
        importData(d){
            console.log("import data:", d)
            this.slotsMounted = 0;
            // Alex's code
            this.slotsMustBeMounted = countSlotsFromProtoObject(d) + d.length;
            this._setData(d);
        },
        Imported(){
            this.$emit('Imported');
            this.historyCompiled.push(this.Compile(false));
            // console.log('all slots Imported');
        },
        BlockDragStart(e){
            let block_id = e.item.children[1].id;
            let block = this.$refs[block_id][0];
            let data = block.getData();
            // this.hideShowPropertyPopup(block_id, 'hide');
            // console.log("BlockDragStart event",e)
            // console.log("BlockDragStart block_id",block_id)
            // console.log("BlockDragStart block", block);
            // console.log("BlockDragStart data", data);
            window[`tempDragDataBlockEditor_${this.mainEditor()._uid}`][block_id] = data;
            
        },
        BlockDragEnd(e){
            let children = e.to.children[e.newDraggableIndex].children[1];
            let block_id = children.id;
            let block_to_select = this.editor.find(x=>x.id==block_id);
            if(block_to_select) {
                this.SlotClick(block_to_select);
                this.mainEditor().editorChanged(true);
            }
        },
        BlockDragAdded(e){
            // console.log("BlockDragAdded event",e)
            // console.log("BlockDragAdded this.tempDragData", this.tempDragData)
            let children = e.to.children[e.newDraggableIndex].children[1];
            // console.log("BlockDragAdded child", children);
            let block_id = children.id;
            // console.log("BlockDragAdded block_id", block_id)
            if(window[`tempDragDataBlockEditor_${this.mainEditor()._uid}`]){
                let data = window[`tempDragDataBlockEditor_${this.mainEditor()._uid}`][block_id];
                // console.log("BlockDragAdded data", data);
                if(data){
                    let block = this.$refs[block_id][0];
                    // console.log("BlockDragAdded block", block);
                    block.setData(data);
                    window[`tempDragDataBlockEditor_${this.mainEditor()._uid}`][block_id] = {};
                }
            }
            let block_to_select = this.editor.find(x=>x.id==block_id);
            block_to_select.selected = false;
            if(block_to_select) this.SlotClick(block_to_select);
            this.mainEditor().editorChanged(true);
        },
        SlotClick(block, event, force){
            if(block.selected) {
                if(event) event.stopPropagation();
                return;
            }
            // console.log("SLOT CLICK", block.tag)
            this.mainEditor().setSelectedBlock(null);
            this.$nextTick(()=>{
                this.mainEditor().setSelectedBlock({ref: this.$refs[block.id],...block});
                this.unselectInBlockEditor(true);
                block.selected = true;
                
                // Получение доступных слотов для работы в editor-окружении с этим слотом
                // поиск внизу
                // TODO работает ли он во всех случаях? Сейчас он ищет первый дочерний блок, который должен быть editor
                let blocks_editors_inside_slot = (this.$refs[block.id][0].$children[0].$children[0].$children||[]).filter(x=>x.$vnode.componentOptions.Ctor.extendOptions.name=='block-editor');
                let slots_inside_slot = [];
                for(let editor of blocks_editors_inside_slot) slots_inside_slot.push(...editor.$slots.default.filter(x=>!errorTypes.includes(x.tag)))
                // поиск первого parent edit-блока
                if(slots_inside_slot.length == 0){
                    let closest_parent_block_editor = undefined;
                    let current_parent = this.$refs[block.id][0];
                    for(;;){
                        if(!current_parent.$vnode) break;
                        // console.log(block.tag,current_parent.$vnode.componentOptions.Ctor.extendOptions.name, current_parent.$vnode)
                        if(current_parent.$vnode.componentOptions.Ctor.extendOptions.name == 'block-editor'){
                            closest_parent_block_editor = current_parent;
                            break;
                        }
                        current_parent = current_parent.$parent;
                    }
                    if(closest_parent_block_editor){
                        if(closest_parent_block_editor.$slots?.default){
                            let slots = closest_parent_block_editor.$slots.default.filter(x=>!errorTypes.includes((x.componentOptions?x.componentOptions?.tag:x.asyncMeta?.tag)));
                            slots_inside_slot.push(...slots);
                        }
                    }
                }

                // console.log("closest_parent_block_editor",closest_parent_block_editor)
                // console.log("slots_inside_slot", slots_inside_slot)
                if(slots_inside_slot.length != 0) {
                    let new_slots = [];
                    for(let s of slots_inside_slot){
                        if(new_slots.find(x=>(x.componentOptions?x.componentOptions?.tag:x.asyncMeta?.tag)==(s.componentOptions?s.componentOptions?.tag:s.asyncMeta?.tag))) continue;
                        new_slots.push(s);
                    }
                    console.log("new_slots:", new_slots)
                    this.mainEditor().setAvailableBlocks(new_slots);
                }
            })
            if(event) event.stopPropagation();
        },
        setAvailableBlocks(slots=[]){
            if(!this.isThisEditorIsMain() && this.draggableClasses.length!=0) return;
            // console.groupCollapsed('setAvailableBlocks', this.isThisEditorIsMain()?"in main editor":"in child editor", this.$el, slots);
            // console.trace();
            // console.groupEnd();
        
            let all_slots = this.mainEditor().registeredEditors.map(x=>x.$slots.default).flat().filter(x=>!errorTypes.includes(x.tag));
            let new_all_slots = [];
            for(let s of all_slots){
                if(new_all_slots.find(x=>(x.componentOptions?x.componentOptions?.tag:x.asyncMeta?.tag)==(s.componentOptions?s.componentOptions?.tag:s.asyncMeta?.tag))) continue;
                new_all_slots.push(s);
            }

            this.availableBlocks = [];
            if(new_all_slots){
                for(let slot of new_all_slots){
                    if(errorTypes.includes(slot.tag)) continue;
                    let attrs = slot.data?slot.data.attrs:slot.asyncMeta.data.attrs;
                    let tag = slot.componentOptions?slot.componentOptions.tag:slot.asyncMeta.tag;
                    let active = !!slots.find(x=>tag==(x.componentOptions?x.componentOptions?.tag:x.asyncMeta?.tag))
                    this.availableBlocks.push({
                        name: attrs.name,
                        proto_id: attrs.proto_id,
                        tag,
                        active
                    })
                }
            }

            this.draggableClasses = this.availableBlocks.filter(x=>x.active).map(x=>'slot-draggable-'+x.tag);
            this.activeTags = this.availableBlocks.filter(x=>x.active).map(x=>x.tag);

            this.$forceUpdate()
        },
        unselectInBlockEditor(user_event=false, from_main_editor=false, force_to_down=false){
            // console.groupCollapsed("UNSELECT", user_event?"with next select":"without next select", from_main_editor?"from_main_editor":"from_child_editor", this.$el);
            // console.trace();
            // console.groupEnd();

            for(let b of this.editor){
                if(b.selected){
                    // console.log("unselecting", b.id)
                    b.selected = false;
                    // hide old prop pops
                }
            }
            this.$forceUpdate();
            if((!user_event && from_main_editor)){
                this.setAvailableBlocks(this.$slots.default)
            }
            if(user_event || force_to_down){
                this.mainEditor().unselectAllChildren(user_event, this.isThisEditorIsMain());
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
        setSelectedBlock(block){
            this.selectedBlock = block;
        },
        unselectAllChildren(user_event=false, from_main_editor){
            // console.log("- unselectAllChildren", user_event, from_main_editor)
            if(from_main_editor != this.isThisEditorIsMain()) this.unselectInBlockEditor(false, from_main_editor);
            for(let block of this.editor) {
                if(!this.$refs[block.id]) continue;
                this.$refs[block.id][0].unselectAllChildren(false, true);
            }
            this.$forceUpdate();
        },
        registerEditor(editor){
            this.registeredEditors.push(editor);
            // console.log('RegisterEditor', this.registeredEditors);
        },
        isThisEditorIsMain(){
            if(this.isThisMainEditor != null) return this.isThisMainEditor;
            let is = false;
            if(this._uid == this.mainEditor()._uid) is = true;
            this.isThisMainEditor = is;
            return is;
        },
        editorChanged(is_user_event){
            if(!is_user_event) return;
            this.$nextTick(()=>{
                this.$emit('Changed');
                // console.time("compiling")
                // let compiled = this.Compile(true);
                // console.timeEnd("compiling")
                this.historyCompiled.push(this.Compile(false));
                this.historyCompiled = this.historyCompiled.slice(-this.historyLength);
                this.historyStep = null;
                // console.log("editorChanged!", this.historyCompiled)
                console.log("editorChanged!", this.historyCompiled)
            })
        },
        HistoryUndo(){
            if(this.historyStep == null){
                this.historyStep = this.historyCompiled.length - 2;
            }else{
                this.historyStep = this.historyStep - 1;
            }
            if(this.historyStep<0) return;
            this._setData(this.historyCompiled[this.historyStep]);
        },
        HistoryRedo(){
            if(this.historyStep == null) return; 
            this.historyStep = this.historyCompiled.length - 1;
            if(this.historyStep == null){
                this._setData(this.historyCompiled[this.historyCompiled.slice(-1)]);
            }else{
                this._setData(this.historyCompiled[this.historyStep]);
            }
            this.historyStep = null;
        }
	},
    mounted(){
        // console.log("EDITOR MOUNTED uid", this._uid, this.isThisEditorIsMain())
        if(this.isThisEditorIsMain()){
            if(!window[`tempDragDataBlockEditor_${this._uid}`]) window[`tempDragDataBlockEditor_${this._uid}`] = {};
            this.historyShow = true;
        }

        this.editor_group = this.group.replace(/rnd/g, Math.floor(Math.random()*99999999).toString());

        if(this.layout == "full"){
            this.layout_options.menu = true;
            this.layout_options.editor = true;
        }else if(this.layout == "editor-only"){
            this.layout_options.menu = false;
            this.layout_options.editor = true;
        }

        console.log('this values', this.values)

        if(this.values.length != 0){
            this.importData(this.values);
        }else{
            this.historyCompiled.push([]);
        }

        // console.log("main availableBlocks length:", this.availableBlocks.length);
        // console.log("main mnt this", this)
        for(let d of this.setDataQuery) this._setData(d);
        // if(last_data) this.historyCompiled.push(last_data);
        this.mainEditor().registerEditor(this);
        this.setAvailableBlocks(this.$slots.default);
        if(!this.isThisEditorIsMain()) this.mainEditor().setAvailableBlocks(this.mainEditor().$slots.default);
    }
}
</script>

<style lang="stylus" scoped>
.container{
	display: grid;
	grid-template-columns: 2fr 8fr 2fr;

    &.editor-only{
        grid-template-columns: 12fr;
    }

    .blocks{
        .block{
            cursor all-scroll;
            padding: 5px 10px;
            margin: 5px;
            background: #f3f3f3;
            border-radius: 5px;
            opacity: 0.5;
            &.active{
                opacity: 1;
            }
            &:hover{
                background: #d8d8d8;
            }
        }
    }

    .editor{
        background #eee;
        height 100vh;
        white-space pre-wrap;
        &.mainEditor{
            padding: 10px;
        }
        .history{
            .history_button{
                border: none;
                background: rgba(0,0,0,0);
                outline: none;
                opacity: 0.7;
                cursor: pointer;
                &:hover{
                    opacity: 1;
                }
            }
        }
        .item{
            position: relative;
            .removeBlock{
                opacity: 0.2;
                position: absolute;
                cursor pointer;
                top: 9px;
                right: 15px;
                transition: 0.3s all;
            }
            .copyBlock{
                opacity: 0.2;
                position: absolute;
                cursor pointer;
                top: 9px;
                right: 35px;
                transition: 0.3s all;
                .bi-clipboard{
                    transform: scale(0.8);
                }
            }
            &:hover{
                .removeBlock{
                    opacity: 0.5;
                }
                .copyBlock{
                    opacity: 0.5;
                }
            }
            .removeBlock{
                &:hover{
                    opacity: 1;
                }
            }
            .copyBlock{
                &:hover{
                    opacity: 1;
                }
            }
        }

        .block{
            margin 2px 10px;
            background white;
            // cursor pointer;
            padding: 5px;
            border: 1px solid white;
            &.selected{
                border: 1px solid blue;
            }
        }

        .dragArea{
            height: 100%;
        }
    }

    &.editor-only{
        grid-template-columns: auto;
        .editor{
            height auto;
            min-height: 50px;
        }
    }
}






</style>

<style lang="stylus">
.editor .item.ghost .property_popup{
    display: none;
}

</style>
