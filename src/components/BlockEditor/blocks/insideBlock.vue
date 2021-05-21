<template>
	<block-content>
        <block-editor style='margin-top: 12px;' ref="blockEditor" :blocksExclude='["youtubeBlock", "textEditorBlock"]'/>
	</block-content>
</template>

<script>
import BlockEditor from '../main';
import blockContent from '../block-content.js'

export default {
	components: {
        BlockEditor,
        blockContent
	},
	data: ()=>{
		return {}
	},
	methods: {
        setData(d){return require("../setData")(this, d)},
		getData(){return require("../getData")(this)},
		slotMounted(){return this.$parent.slotMounted(this);},
		// ...
	},
	mounted(){
		this.slotMounted();
		// ...
	}
}
</script>
