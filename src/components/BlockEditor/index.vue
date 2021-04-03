<template>
	<div class="container">
		<div class="blocks">
            <draggable
                class='dragArea list-group'
                :list="[block]"
                draggable=".item"
                :group="{ name: 'editor', pull: 'clone', put: false }"
                :clone="cloneBlockProto"
                v-for="block in availableBlocks" :key="block.id"
            >
                <div class="item block">
                    {{block.name}}
                </div>
            </draggable>
            <button @click='Compile'>Compile!</button>
		</div>
		<div class="editor">
            <draggable 
                class="dragArea list-group"
                v-model="editor" 
                draggable=".item"
                group="editor"
            >
                <div class="item block" v-for="(block, i) in editor" :key="block.id" :tag="block.tag" :block_id="block.id">
                    <SlotRender :ref="block.id" :tag="block.tag" :block_id="block.id">
                        <slot></slot>
                    </SlotRender>
                </div>
            </draggable>
            {{editor}}
		</div>
	</div>
</template>

<script>

import SlotRender from './SlotRender.js';
import draggable from 'vuedraggable'

export default {
	name: 'Home',
	components: {
        SlotRender,
        draggable
	},
	data: ()=>{
		return {
			availableBlocks: [],
			editor: [],
            loaded: false,
            setDataQuery: []
		}
	},
	methods: {
		addBlockToEditor(block){
			let block_proto = JSON.parse(JSON.stringify(block));
            block_proto.id = this.parseID(block_proto);
            delete block_proto.data;
			this.editor.push(block_proto);
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

		CustomBlockClick(e){
			console.log("CustomBlockClick", e);
		},
        Compile(){
            let blocks = JSON.parse(JSON.stringify(this.editor));
            for(let b of blocks){
                console.log(b, this.$refs[b.id][0])
                b.data = this.$refs[b.id][0].getData();
            }
            this.$emit('Compiled', blocks);
        },
        setData(d){
            if(!this.loaded) return this.setDataQuery.push(d);
            this._setData(d);
        },
        _setData(d){
            this.editor = [];
            console.log("main setData", d);

            for(let block of d){
                if(!this.availableBlocks.find(x=>x.tag)){
                    new Error(`setData(): Tag ${block.tag} not found in list of initiated tags inside <block-editor>.`)
                    continue;
                }
                console.log("adding", block)
                this.addBlockToEditor(block);
            }

            this.$nextTick(()=>{
                for(let block of d){
                    if(!this.editor.find(x=>x.id==block.id)) continue;
                    console.log("index setting data", block, this.$refs[block.id][0]);
                    this.$refs[block.id][0].setData(block.data);
                }
            })
        }
	},
    beforeMount(){
        console.log("main bmnt this", this)
        for(let slot of this.$slots.default){
            let attrs = slot.data?slot.data.attrs:slot.asyncMeta.data.attrs;
            let tag = slot.componentOptions?slot.componentOptions.tag:slot.asyncMeta.tag;
            this.availableBlocks.push({
                name: attrs.name,
                id: attrs.id,
                tag
            })
        }
        console.log("main availableBlocks length:", this.availableBlocks.length);
    },
    mounted(){
        console.log("main mnt this", this)
        this.loaded = true;
        for(let d of this.setDataQuery) this._setData(d);
    }
}
</script>

<style lang="stylus" scoped>
.container{
	display: grid;
	grid-template-columns: 2fr 10fr;
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
	.block{
		margin 10px;
		background white;
		cursor pointer;
		padding: 5px;
	}

    .dragArea{
        height: 100%;
    }
}
</style>