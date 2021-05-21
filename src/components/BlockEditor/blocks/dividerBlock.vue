<template>
	<block-content>
        <input type="text" placeholder="ссылочка" v-model="link">
        - {{link}}

		<propertyPopup title="сылочкины">
            здесь пропсы
        </propertyPopup>
	</block-content>
</template>

<script>
import propertyPopup from '../property-popup';
import blockContent from '../block-content.js'

export default {
	components: {
        blockContent,
		propertyPopup
	},
	data: ()=>{
		return {
            link: ''
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
