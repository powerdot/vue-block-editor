<template>
	<block-content>
		<div class="iframeHolder">
        	<iframe :src="`//www.youtube.com/embed/${ytid}`" frameborder="0"></iframe>
		</div>

		<propertyPopup title="YouTube setup">
            Enter ID of YouTube video:
			<br>
			<input type="link" v-model="ytid" placeholder="8w4qPUSG17Y">
			<br>
			<br>
			<div class="example" @click="ytid='dQw4w9WgXcQ'">For example: <span>dQw4w9WgXcQ</span></div>
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
            ytid: '',
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

<style lang="scss" scoped>
.iframeHolder{
	background: black;
    text-align: center;
    margin-top: 16px;

	iframe{
		width: 600px;
		height: 337px;
	}
}
.example{
	font-size: 10pt;
	span{
		color: blue;
		cursor: pointer;
	}
}
</style>