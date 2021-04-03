<template>
	<div>
        <input type="text" placeholder="ссылочка" v-model="link">
        - {{link}}
	</div>
</template>

<script>
export default {
	components: {
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

<style lang="stylus" scoped>

</style>