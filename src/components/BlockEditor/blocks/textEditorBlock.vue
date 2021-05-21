<template>
	<block-content>
        <vue-editor v-model='text'/>
	</block-content>
</template>

<script>

import blockContent from '../block-content.js';
import { VueEditor } from "vue2-editor";

export default {
	components: {
		blockContent,
		VueEditor
	},
	data: ()=>{
		return {
            text: 'Type your text...',
			editorOptions: {}
        }
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
