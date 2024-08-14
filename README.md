# vue-block-editor
for vue2.

creating... wait for first realese!  
Universal drag&drop block builder.

## Demo
[Right there!](https://powerdot.github.io/vue-block-editor/)

## Usage
```
<block-editor ref="blockEditor" @Compiled="BlocksCompiled" >
	<textik name="Текстичек"/>
	<linka name="Ссылочка" id="_link_rnd"/>
	<selectbox name="Селекбоксина" id="_rnd_selectbox"/>
</block-editor>
```

- `<block-editor>` - main component
- Components inside - prototype blocks for menu  

Simple Example:
```
<template>
	<div class="container">
		<block-editor ref="blockEditor" @Compiled="BlocksCompiled" >
			<textik name="Текстичек"/>
			<linka name="Ссылочка" id="_link_rnd"/>
			<selectbox name="Селекбоксина" id="_rnd_selectbox"/>
		</block-editor>
	</div>
</template>

<script>
import BlockEditor from '../components/BlockEditor';

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
		}
	},
	mounted(){}
}
</script>
```

## Block prototype template

```
<template>
	<div>
		<input type="text" placeholder="ссылочка" v-model="link">
		- {{link}}
	</div>
</template>

<script>
export default {
	components: {},
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
		// here is your code

	},
	mounted(){
		this.slotMounted();
		// ...
		// here is your code

	}
}
</script>
```

## Props
- none

## Events
- `Compiled`, export json-schema

## Methods
- `{BlockEditorRef}.setData(array)`, import json-schema

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
