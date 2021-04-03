<template>
	<div>
        новый блок
        <select v-model='myval'>
            <option v-for='l of list' :key='l'>{{l}}</option>
        </select>
	</div>
</template>

<script>
export default {
	components: {
	},
	data: ()=>{
		return {
            list: ['один', 'два', 'три'],
            myval: 'один'
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

<style lang="stylus" scoped>

</style>