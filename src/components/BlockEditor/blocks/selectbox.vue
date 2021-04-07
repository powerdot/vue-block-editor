<template>
	<block-content>
        новый блок
        <select v-model='myval'>
            <option v-for='l of list' :key='l'>{{l}}</option>
        </select>

		<propertyPopup title="для инсайдиы">
            Список объектов: 
            <div v-for='l of list' :key='"list"+l'>{{l}}</div>
			<input type="text" v-model="newVal">
            <button @click="addToList">add</button>
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
            list: ['один', 'два', 'три'],
            myval: 'один',
			newVal: ''
        }
	},
	methods: {
        setData(d){return require("../setData")(this, d)},
		getData(){return require("../getData")(this)},
		slotMounted(){return this.$parent.slotMounted(this);},
		// ...
		addToList(){
			this.list.push(this.newVal);
			this.newVal = "";
		}
	},
	mounted(){
		this.slotMounted();
		// ...

	}
}
</script>

<style lang="stylus" scoped>

</style>