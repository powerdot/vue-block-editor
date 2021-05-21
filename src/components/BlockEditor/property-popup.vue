<template>
	<div class='property_popup' v-if='popup.show'>
        <div class="head">
            <h2>{{title}}</h2>
        </div>
        <div class="body">
            <slot></slot>
        </div>
	</div>
</template>

<script>
export default {
    name: "property_popup",
	components: {
	},
	data: ()=>{
		return {
            popup: {
                show: true
            }
        }
	},
    props: {
        title: {
            type: String,
            default: "Title"
        }
    },
	methods: {
        hide(){
            this.popup.show = false;
        },
        show(){
            this.popup.show = true;
        }
	},
    beforeMount(){

    },
	mounted(){

	}
}
</script>

<style lang="scss" scoped>
.property_popup{
    cursor: default;
    z-index: 10;
    
    .head{
        h2{
            margin: 0;
            margin-bottom: 10px;
        }
    }
}
</style>