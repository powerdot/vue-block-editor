<template>
	<block-content>
        {{title}}
        <block-editor ref="blockEditor" @Compiled="BlocksCompiled" layout="editor-only" group='editor_group'>
            <textik name="Текстичек"/>
			<inside name="Инсайдина" id="_rnd_insider"/>
			<calc name="Калькулэйтор" id="_rnd_calc"/>
            <templateError>Другая ошибка</templateError>
		</block-editor>

        <propertyPopup title="для инсайдиы">
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
        propertyPopup: propertyPopup,
		linka: ()=> import("./link"),
		inside: ()=> import("./inside"),
		textik: ()=> import("./tekstik"),
		calc: ()=> import("./calc"),
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