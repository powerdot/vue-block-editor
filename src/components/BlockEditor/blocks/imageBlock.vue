<template>
	<block-content>
        <button @click="count+=amount">+</button> {{count}} <button @click="count-=amount">-</button>

		<propertyPopup title="Калькулятор">
            На сколько единиц: <input type="number" v-model="amount">
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
            amount: 1,
            count: 0
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
