<template>
	<div class="container">
		<!-- <button @click='load'>load</button> -->
		<block-editor ref="blockEditor" @Compiled="BlocksCompiled" >
			<textik name="Текстичек"/>
			<linka name="Ссылочка" id="_link_rnd"/>
			<selectbox name="Селекбоксина" id="_rnd_selectbox"/>
		</block-editor>
	</div>
</template>

<script>
import BlockEditor from '../components/BlockEditor';

let newData = [
    {
        "name": "Ссылочка",
        "id": "ssylka456",
        "tag": "linka",
        "data": {
            "link": "45644"
        }
    },
    {
        "name": "Ссылочка",
        "id": "ssylka123",
        "tag": "linka",
        "data": {
            "link": "123"
        }
    },
    {
        "name": "Текстичек",
        "tag": "textik",
        "id": "4130687",
        "data": {}
    },
    {
        "name": "Селекбоксина",
        "id": "_74139453_selectbox",
        "tag": "selectbox",
        "data": {
            "list": [
                "один",
                "два",
                "три"
            ],
            "myval": "три"
        }
    }
]

export default {
	name: 'Home',
	components: {
		BlockEditor,
		textik: ()=> import("../components/BlockEditor/blocks/tekstik"),
		linka: ()=> import("../components/BlockEditor/blocks/link"),
		selectbox: ()=> import("../components/BlockEditor/blocks/selectbox")
	},
	data: ()=>{
		return {}
	},
	methods: {
		BlocksCompiled(data){
			console.log("BlocksCompiled", data);
		},
		load(){
			this.$refs.blockEditor.setData(newData);
		}
	},
    mounted(){
		console.log("home mnt this", this)
		this.$refs.blockEditor.setData(newData);

		// setImmediate(()=>{
		// 	this.$refs.blockEditor.setData(newData);
		// })

		// setTimeout(()=>{
		// 	this.$refs.blockEditor.setData(newData);
		// }, 100)

		// this.$nextTick(()=>{
		// 	this.$refs.blockEditor.setData(newData);
		// });
	}
}
</script>

<style lang="stylus" scoped>

</style>