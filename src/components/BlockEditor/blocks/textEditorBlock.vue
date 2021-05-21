<template>
	<block-content>
        <div :style='`color:${textColor}`'>текстик: {{num}}</div>
		<button @click='num++'>+</button>

		<propertyPopup title="Для текстика">
			Цвет текста: 
			<select v-model='textColor'>
				<option value="black">Черный</option>
				<option value="pink">Розовый</option>
				<option value="green">Зеленый</option>
				<option value="red">Красный</option>
			</select>
        </propertyPopup>
	</block-content>
</template>

<script>

import propertyPopup from '../property-popup';
import blockContent from '../block-content.js'

export default {
	components: {
		propertyPopup,
		blockContent
	},
	data: ()=>{
		return {
            textColor: 'black',
			num: 0
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
