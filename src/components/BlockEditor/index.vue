<template>
	<div :class="{container: true, [layout]: true}">
		<div :class="{blocks: true, [layout]: true}" v-if="layout_options.menu">
            <draggable
                class='dragArea list-group'
                :list="[block]"
                draggable=".item"
                :group="{ name: editor_group, pull: 'clone', put: false }"
                :clone="cloneBlockProto"
                v-for="block in availableBlocks" :key="block.id"
            >
                <div class="item block">
                    {{block.name}}
                </div>
            </draggable>
            <button @click='Compile'>Compile!</button>
		</div>
		<div :class="{editor: true, [layout]: true}" v-if="layout_options.editor">
            <draggable 
                class="dragArea list-group"
                v-model="editor" 
                draggable=".item"
                :group="editor_group"
                @start="BlockDragStart"
                @end="BlockDragEnd"
                @add="BlockDragAdded"
                @choose="BlockDragChoosed"
                ghost-class="ghost"
                :touchStartThreshold="20"
            >
                <div class='item' v-for='(block, block_i) of editor' :key="block.id" :tag="block.tag" :block_id="block.id" @click="SlotClick(block, $event)">
                    <add-block :newBlockIndex="block_i" :availableBlocks="availableBlocks" @addBlock="modalMenuAddBlock"></add-block>
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
                </div>
                <add-block :availableBlocks="availableBlocks" @addBlock="modalMenuAddBlock" :first="editor.length==0"></add-block>
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
    },
	data: ()=>{
		return {
			availableBlocks: [],
			editor: [],
            loaded: false,
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
            selectBlockAfterMount: null
		}
	},
	methods: {
        modalMenuAddBlock(block, block_i){
            let new_block = this.addBlockToEditor(block, block_i);
            this.selectBlockAfterMount = new_block;
            // console.log("modalMenu block selected", {ref: this.$refs[block.id],...block}, new_block)
            //
        },
        slotMounted(slot_data){
            // console.log("slotMounted:", slot_data)
            if(this.selectBlockAfterMount){
                if(this.selectBlockAfterMount.id == slot_data.block_id){
                    this.SlotClick(this.selectBlockAfterMount);
                }
            }
        },
		addBlockToEditor(block, block_i){
			let block_proto = JSON.parse(JSON.stringify(block));
            block_proto.id = this.parseID(block_proto);
            delete block_proto.data;
            block_proto.selected = false;
            if(typeof block_i != 'undefined'){
                this.editor.splice(block_i, 0, block_proto);
            }else{
                this.editor.push(block_proto);
            }
            return block_proto;
		},
        removeBlockFromEditor(e,block){
            this.editor = this.editor.filter(x=>x.id!=block.id);
            this.mainEditor().setSelectedBlock(null);
            e.stopPropagation();
        },
        cloneBlockProto(block){
            let block_proto = JSON.parse(JSON.stringify(block));
            block_proto.id = this.parseID(block_proto);
            return block_proto;
        },
        parseID(block){
            if(!block.id) return Math.floor(Math.random()*99999999).toString();
            return block.id.replace(/rnd/g, Math.floor(Math.random()*99999999).toString());
        },

		CustomBlockClick(e){ },
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
            if(!this.loaded) return this.setDataQuery.push(d);
            this._setData(d);
        },
        _setData(d){
            this.editor = [];
            // console.log("main setData", d);

            for(let block of d){
                if(!this.availableBlocks.find(x=>x.tag)){
                    new Error(`setData(): Tag ${block.tag} not found in list of initiated tags inside <block-editor>.`)
                    continue;
                }
                // console.log("adding", block)
                this.addBlockToEditor(block);
            }

            this.$nextTick(()=>{
                for(let block of d){
                    if(!this.editor.find(x=>x.id==block.id)) continue;
                    // console.log("index setting data", block, this.$refs[block.id][0]);
                    this.$refs[block.id][0].setData(block.data);
                }
            })
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
            if(!window.tempDragDataBlockEditor) window.tempDragDataBlockEditor = {};
            window.tempDragDataBlockEditor[block_id] = data;
            
        },
        BlockDragEnd(e){
            // let children = e.to.children[e.newDraggableIndex].children[1];
        },
        BlockDragAdded(e){
            // console.log("BlockDragAdded event",e)
            // console.log("BlockDragAdded this.tempDragData", this.tempDragData)
            let children = e.to.children[e.newDraggableIndex].children[1];
            // console.log("BlockDragAdded child", children);
            let block_id = children.id;
            // console.log("BlockDragAdded block_id", block_id)
            if(window.tempDragDataBlockEditor){
                let data = window.tempDragDataBlockEditor[block_id];
                // console.log("BlockDragAdded data", data);
                if(data){
                    let block = this.$refs[block_id][0];
                    // console.log("BlockDragAdded block", block);
                    block.setData(data);
                    window.tempDragDataBlockEditor[block_id] = {};
                }
            }
        },
        BlockDragChoosed(e){ },
        SlotClick(block, event){
            this.mainEditor().setSelectedBlock({ref: this.$refs[block.id],...block});
            this.unselectInBlockEditor(true);
            block.selected = true;
            if(event) event.stopPropagation();
        },
        unselectInBlockEditor(user_event=false){
            for(let b of this.editor){
                if(b.selected){
                    // console.log("unselecting", b.id)
                    b.selected = false;
                    // hide old prop pops
                }
            }
            this.$forceUpdate();
            if(user_event){
                this.mainEditor().unselectAllChildren();
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
            console.log("SELECT BLOCK", block)
            this.selectedBlock = block;
        },
        unselectAllChildren(){
            this.unselectInBlockEditor();
            for(let block of this.editor) this.$refs[block.id][0].unselectAllChildren();
        }
	},
    beforeMount(){
        this.editor_group = this.group.replace(/rnd/g, Math.floor(Math.random()*99999999).toString());
        // console.log("main bmnt this", this)
        if(this.$slots.default){
            for(let slot of this.$slots.default){
                let attrs = slot.data?slot.data.attrs:slot.asyncMeta.data.attrs;
                let tag = slot.componentOptions?slot.componentOptions.tag:slot.asyncMeta.tag;
                this.availableBlocks.push({
                    name: attrs.name,
                    id: attrs.id,
                    tag
                })
            }
        }
        if(this.layout == "full"){
            this.layout_options.menu = true;
            this.layout_options.editor = true;
        }else if(this.layout == "editor-only"){
            this.layout_options.menu = false;
            this.layout_options.editor = true;
        }
        // console.log("main availableBlocks length:", this.availableBlocks.length);
    },
    mounted(){
        // console.log("main mnt this", this)
        this.loaded = true;
        for(let d of this.setDataQuery) this._setData(d);
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
            &:hover{
                background: #d8d8d8;
            }
        }
    }

    .editor{
        background #eee;
        height 100vh;
        white-space pre-wrap;
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
            &:hover{
                .removeBlock{
                    opacity: 0.5;
                }
            }
            .removeBlock{
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

// .editor [block_id] .property_popup{
//     display: none;
// }
// .propedit .show_property_popup{
//     font-size: 0 !important;
//     color: rgba(0,0,0,0) !important;
// }
// .propedit .show_property_popup *{
//     display: none !important;
// }
// .propedit .show_property_popup .property_popup,
// .propedit .show_property_popup .property_popup *{
//     display: block !important;
//     font-size: initial !important;
//     color: black !important;
// }
</style>
