<template>
	<div class="container">
		<!-- <button @click='load'>load</button> -->
		<block-editor ref="blockEditor" @Compiled="BlocksCompiled" >
			<textik name="Текстичек"/>
			<linka name="Ссылочка" id="_link_rnd"/>
			<selectbox name="Селекбоксина" id="_rnd_selectbox"/>
			<inside name="Инсайдина" id="_rnd_insider"/>
		</block-editor>
	</div>
</template>

<script>
import BlockEditor from '../components/BlockEditor';

let newData = [
    {
        "name": "Текстичек",
        "tag": "textik",
        "id": "72586829",
        "data": {
            "textColor": "red",
            "num": 3
        }
    },
    {
        "name": "Инсайдина",
        "id": "_59812028_insider",
        "tag": "inside",
        "data": {
            "title": "hgjhgj",
            "block_editor": [
                {
                    "name": "Ссылочка",
                    "id": "_link_61528855",
                    "tag": "linka",
                    "data": {
                        "link": "sdfsdf"
                    }
                }
            ]
        }
    },
    {
        "name": "Текстичек",
        "tag": "textik",
        "id": "57615275",
        "data": {
            "textColor": "pink",
            "num": 3
        }
    }
];

// [
//     {
//         "name": "Инсайдина",
//         "id": "_30554490_insider",
//         "tag": "inside",
//         "data": {
//             "title": "ЭТО ИНСАЙДИНА ОГО",
//             "block_editor": [
//                 {
//                     "name": "Инсайдина",
//                     "id": "_14048990_insider",
//                     "tag": "inside",
//                     "data": {
//                         "title": "кекекекеке",
//                         "block_editor": [
//                             {
//                                 "name": "Ссылочка",
//                                 "id": "_link_58045909",
//                                 "tag": "linka",
//                                 "data": {
//                                     "link": "fdgdfgdfgdfg"
//                                 }
//                             }
//                         ]
//                     }
//                 },
//                 {
//                     "name": "Инсайдина",
//                     "id": "_41131011_insider",
//                     "tag": "inside",
//                     "data": {
//                         "title": "ЭТО ИНСАЙДИНА ОГО",
//                         "block_editor": [
//                             {
//                                 "name": "Инсайдина",
//                                 "id": "_79288599_insider",
//                                 "tag": "inside",
//                                 "data": {
//                                     "title": "ЭТО ИНСАЙДИНА ОГО",
//                                     "block_editor": []
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             ]
//         }
//     }
// ]


export default {
	name: 'Home',
	components: {
		BlockEditor,
		textik: ()=> import("../components/BlockEditor/blocks/tekstik"),
		linka: ()=> import("../components/BlockEditor/blocks/link"),
		selectbox: ()=> import("../components/BlockEditor/blocks/selectbox"),
		inside: ()=> import("../components/BlockEditor/blocks/inside")
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
		// console.log("home mnt this", this)
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