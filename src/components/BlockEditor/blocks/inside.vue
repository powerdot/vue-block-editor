<template>
	<block-content>
        {{title}}
        <block-editor ref="blockEditor" @Compiled="BlocksCompiled" layout="editor-only" :blocksExclude='["linka", "selectbox"]'/>

        <propertyPopup title="для инсайдины">
            Название блока: 
            <input type="text" v-model="title">
        </propertyPopup>
	</block-content>
</template>

<script>
import BlockEditor from '../index';
import propertyPopup from '../property-popup';
import blockContent from '../block-content.js'

export default {
	components: {
        BlockEditor,
        blockContent,
        propertyPopup
	},
	data: ()=>{
		return {
            title: "ЭТО ИНСАЙДИНА ОГО"
        }
	},
	methods: {
        setData(d){return require("../setData")(this, d)},
		getData(){return require("../getData")(this)},
		slotMounted(){return this.$parent.slotMounted(this);},
		// ...
        BlocksCompiled(d){

        }
		
	},
    beforeMount(){
        // Migrating parent slots

    },
	mounted(){
		this.slotMounted();
		// ...

	}
}
</script>

<style lang="stylus" scoped>

</style>