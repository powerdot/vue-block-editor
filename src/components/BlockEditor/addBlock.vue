<template>
	<div :class='{addBlock: true, createFirst: first}'>
        <div class="line"></div>
        <div class="plusButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            <div class="blockMenuModal">
                <template v-if='!!editorTags.find(x=>copyBuffer.map(y=>y.tag).includes(x))'>
                    <div class="item block" @click="paste">
                        paste
                    </div>
                </template>
                <div class="item block" v-for="menuBlock in availableBlocks.filter(x=> editorTags.includes(x.tag) )" :key="menuBlock.tag+'_menuModalBlock'" @click="modalMenuAddBlock($event, menuBlock)">
                    {{menuBlock.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
	components: {},
    props: {
        newBlockIndex: {
            type: Number,
            default: undefined
        },
        availableBlocks: {
            type: Array,
            default: ()=>([])
        },
        first: {
            type: Boolean,
            default: false
        },
        copyBuffer: {
            type: Array,
            default: ()=>([])
        },
        editorTags: {
            type: Array,
            default: ()=>([])
        }
    },
	data: ()=>{
		return {
            
        }
	},
	methods: {
		modalMenuAddBlock(e, block){
            this.$emit('addBlock', block, this.newBlockIndex);
            e.stopPropagation();
            e.preventDefault();
        },
        paste(e, block){
            this.$emit('pasteBlocks', this.copyBuffer, this.newBlockIndex);
            e.stopPropagation();
            e.preventDefault();
        }
	},
	mounted(){
        
	}
}
</script>

<style lang="stylus" scoped>
    .addBlock{
        opacity: 0;
        height: 3px;
        margin-top: -1px;
        transition: 0.3s opacity;
        position: relative;
        z-index: 9999;

        &:hover{
            z-index: 10000;
        }

        &.createFirst{
            opacity: 0.5;
            padding-top: 30px;
            padding-bottom: 30px;
        }
        &:hover{
            opacity 1;
        }
        .line{
            position: relative;
            width: 80%;
            background: #d4d4d4;
            height: 1px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .plusButton{
            position: relative;
            top: calc(50% - 11px);
            left: calc(50% - 11px);
            display: block;
            background: #eee;
            padding: 2px;
            cursor: pointer;
            height: 16px;
            border-radius: 20px;
            width: 16px;
            z-index: 10001;

            .blockMenuModal{
                position: absolute;
                top: 0px;
                left: 10px;
                background: white;
                box-shadow: 0 2px 20px rgba(0,0,0,0.1);
                border-radius: 4px;
                border: 1px solid #eee;
                display: none;
                z-index: 10000;
                .block{
                    padding: 5px 10px;
                    cursor: pointer;
                    &:hover{
                        background #eee;
                    }
                }
            }

            &:hover{
                .blockMenuModal{
                    display: block;
                }
                .bi-plus-circle{
                    z-index: 10001;
                    position: relative;
                    background: white;
                    border-radius: 20px;
                }
            }
        }
    }
</style>