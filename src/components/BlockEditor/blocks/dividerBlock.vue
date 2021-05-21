<template>
	<block-content>
        <div :class='{divider:true, [divider_type]: true}'></div>

		<propertyPopup title="Divider options">
            Select divider type: 
            <select v-model='divider_type'>
				<option v-for='t of divider_types' :key='t.type+"example_div_type"' :value='t.type'>{{t.name}}</option>
			</select>
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
            divider_type: 'solid',
			divider_types: [
				{name: 'Solid', type: 'solid'},
				{name: 'Dashed', type: 'dashed'}, 
				{name: 'Coloured', type: 'coloured'},
				{name: '3 dots', type: 'threedots'},
			]
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
	.divider{
    	margin-top: 18px;
		&.solid{
	    	border: 2px solid;
		}
		&.dashed{
	    	border: 2px dashed;
		}
		&.coloured{
			height: 4px;
			background: linear-gradient(45deg, #2196f3, #673ab7);
			border-radius: 10px;
		}
		&.threedots{
			letter-spacing: 10px;
			text-align: center;
			color: #3f51b5;
			font-size: 10pt;
			height: 4px;
			line-height: 5px;
			&:after{
				content: "•••";
			}
		}
	}
</style>