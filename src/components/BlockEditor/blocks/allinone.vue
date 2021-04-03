<template>
	<div>
        <textik/> 
        <linka/>
        <selectbox/>
	</div>
</template>

<script>
export default {
	components: {
        textik: ()=> import("./tekstik"),
		linka: ()=> import("./link"),
		selectbox: ()=> import("./selectbox")
	},
	data: ()=>{
		return {
        }
	},
	methods: {
        
	}
}
</script>

<style lang="stylus" scoped>

</style>