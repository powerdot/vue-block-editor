<template>
	<div class="container">
		<!-- <button @click='load'>load</button> -->
		<block-editor ref="blockEditor" @Compiled="BlocksCompiled" group='editor_group'>
			<textik name="Текстичек"/>
			<linka name="Ссылочка" proto_id="_link_rnd"/>
			<selectbox name="Селекбоксина" proto_id="_rnd_selectbox"/>
			<inside name="Инсайдина" proto_id="_rnd_insider"/>
			<templateError>
				Упс! Блок не принадлежит этому элементу!
			</templateError>
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
        "id": "_64472827_insider",
        "data": {
            "title": "ЭТО ИНСАЙДИНА ОГО",
            "block_editor": [
                {
                    "name": "Калькулэйтор",
                    "tag": "calc",
                    "id": "59424535",
                    "data": {
                        "amount": 1,
                        "count": 5
                    }
                },
                {
                    "name": "Инсайдина",
                    "proto_id": "_rnd_insider",
                    "tag": "inside",
                    "active": false,
                    "id": "_69882980_insider",
                    "data": {
                        "title": "ЭТО ИНСАЙДИНА ОГО",
                        "block_editor": [
                            {
                                "name": "Инсайдина",
                                "proto_id": "_rnd_insider",
                                "tag": "inside",
                                "active": true,
                                "id": "_62350156_insider",
                                "data": {
                                    "title": "ЭТО ИНСАЙДИНА ОГО",
                                    "block_editor": [
                                        {
                                            "name": "Инсайдина",
                                            "proto_id": "_rnd_insider",
                                            "tag": "inside",
                                            "active": true,
                                            "id": "_84811172_insider",
                                            "data": {
                                                "title": "ЭТО ИНСАЙДИНА ОГО",
                                                "block_editor": [
                                                    {
                                                        "name": "Инсайдина",
                                                        "proto_id": "_rnd_insider",
                                                        "tag": "inside",
                                                        "active": true,
                                                        "id": "_43036527_insider",
                                                        "data": {
                                                            "title": "ЭТО ИНСАЙДИНА ОГО",
                                                            "block_editor": [
                                                                {
                                                                    "name": "Инсайдина",
                                                                    "proto_id": "_rnd_insider",
                                                                    "tag": "inside",
                                                                    "active": true,
                                                                    "id": "_91961524_insider",
                                                                    "data": {
                                                                        "title": "ЭТО ИНСАЙДИНА ОГО",
                                                                        "block_editor": []
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
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