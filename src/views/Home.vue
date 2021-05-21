<template>
	<div class="container" style="height: 100vh;">
		<!-- <button @click='load'>load</button> -->
		<block-editor 
            ref="blockEditor" 
            @Compiled="BlocksCompiled" 
            @Imported="BlocksImported" 
            :values="newData" 
            :blocksExclude='["calc"]' 
            :layout="{menu: true, propertyEditor: true, history: false, editor: true}"
        >
			<textEditorBlock name="Text Editor"/>
			<selectBoxBlock name="Selectbox" proto_id="_link_sb"/>
			<imageBlock name="Image" proto_id="_rnd_img"/>
			<dividerBlock name="Divider" proto_id="_rnd_div"/>
			<insideBlock name="Block with BlockEditor" proto_id="_rnd_bwb"/>
			<!-- <templateError>
				Упс! Блок не принадлежит этому элементу!
			</templateError> -->
			<!-- leftBottomPanel -->
            <!-- plusIcon -->
            <!-- rightBottomPanel -->
		</block-editor>
	</div>
</template>

<script>
import BlockEditor from '../components/BlockEditor/main.vue';

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
newData = [];


export default {
	name: 'Home',
	components: {
		BlockEditor,
		textEditorBlock: ()=> import("../components/BlockEditor/blocks/textEditorBlock"),
		selectBoxBlock: ()=> import("../components/BlockEditor/blocks/selectBoxBlock"),
		insideBlock: ()=> import("../components/BlockEditor/blocks/insideBlock"),
		imageBlock: ()=> import("../components/BlockEditor/blocks/imageBlock"),
		dividerBlock: ()=> import("../components/BlockEditor/blocks/dividerBlock")
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
