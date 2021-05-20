<template>
	<div class="container">
		<!-- <button @click='load'>load</button> -->
		<block-editor 
            ref="blockEditor" 
            @Compiled="BlocksCompiled" 
            @Imported="BlocksImported" 
            :values="newData" 
            :blocksExclude='["calc"]' 
            :layout="{menu: true, propertyEditor: true, history: false, editor: true}"
        >
			<textik name="Текстичек"/>
			<linka name="Ссылочка" proto_id="_link_rnd"/>
			<selectbox name="Селекбоксина" proto_id="_rnd_selectbox"/>
			<inside name="Инсайдина" proto_id="_rnd_insider"/>
			<calc name="Калькуляторша" proto_id="_rnd_calc"/>
			<templateError>
				Упс! Блок не принадлежит этому элементу!
			</templateError>
			<!-- leftBottomPanel -->
            <!-- plusIcon -->
            <!-- rightBottomPanel -->
		</block-editor>
	</div>
</template>

<script>
import BlockEditor from '../components/BlockEditor';

let newData = [
    {
        "name": "Инсайдина",
        "proto_id": "_rnd_insider",
        "tag": "inside",
        "active": true,
        "id": "_13035846_insider",
        "data": {
            "title": "ЭТО ИНСАЙДИНА ОГО",
            "block_editor": [
                {
                    "name": "Текстичек",
                    "tag": "textik",
                    "active": true,
                    "id": "10545519",
                    "data": {
                        "textColor": "black",
                        "num": 4
                    }
                },
                {
                    "name": "Инсайдина",
                    "proto_id": "_rnd_insider",
                    "tag": "inside",
                    "active": true,
                    "id": "_29253092_insider",
                    "data": {
                        "title": "ЭТО ИНСАЙДИНА ОГО",
                        "block_editor": []
                    }
                }
            ]
        }
    },
    {
        "name": "Ссылочка",
        "proto_id": "_link_rnd",
        "tag": "linka",
        "active": false,
        "id": "_link_28466793",
        "data": {
            "link": ""
        }
    },
    {
        "name": "Селекбоксина",
        "proto_id": "_rnd_selectbox",
        "tag": "selectbox",
        "active": true,
        "id": "_10032672_selectbox",
        "data": {
            "list": [
                "один",
                "два",
                "три"
            ],
            "myval": "один",
            "newVal": ""
        }
    },
    {
        "name": "Ссылочка",
        "proto_id": "_link_rnd",
        "tag": "linka",
        "active": false,
        "id": "_link_52459884",
        "data": {
            "link": "gdf"
        }
    },
    {
        "name": "Ссылочка",
        "proto_id": "_link_rnd",
        "tag": "linka",
        "active": false,
        "id": "_link_28254855",
        "data": {
            "link": "ggg"
        }
    },
    {
        "name": "Ссылочка",
        "proto_id": "_link_rnd",
        "tag": "linka",
        "active": false,
        "id": "_link_90594423",
        "data": {
            "link": "bbbb"
        }
    }
];


export default {
	name: 'Home',
	components: {
		BlockEditor,
		textik: ()=> import("../components/BlockEditor/blocks/tekstik"),
		linka: ()=> import("../components/BlockEditor/blocks/link"),
		selectbox: ()=> import("../components/BlockEditor/blocks/selectbox"),
		inside: ()=> import("../components/BlockEditor/blocks/inside"),
		calc: ()=> import("../components/BlockEditor/blocks/calc")
	},
	data: ()=>{
		return {
			newData: newData
		}
	},
	methods: {
		BlocksCompiled(data){
			console.log("BlocksCompiled", data);
		},
		BlocksImported(){
			console.log("Blocks Imported!")
		},
		load(){
			// this.$refs.blockEditor.setData(newData);
		}
	},
    mounted(){
		// this.$refs.blockEditor.importData(newData);
	}
}
</script>

<style lang="stylus" scoped>

</style>