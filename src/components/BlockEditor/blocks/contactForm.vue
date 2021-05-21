<template>
	<block-content>
        <h2>Contact us!</h2>
		<div class="container">
			<div class="row">
				<div class="col">
					<input type="text" placeholder="Your name">
				</div>
				<div class="col">
					<input type="text" placeholder="Company">
				</div>
				<div class="col">
					<select>
						<option v-for='p of list' :key='p.id+"example_prof_id"' :value='p.id'>{{p.name}}</option>
					</select>
				</div>
				<div class="col">
					<button>Contact</button>
				</div>
			</div>
		</div>

		<propertyPopup title="Form settings">
            <div style='font-size: 10pt; margin-bottom: 5px;'>Profession list:</div>
            <div v-for='l of list' :key='"example_prof_id"+l.id'>
				<button class='removeListItem' @click='removeListItem(l)'>✕</button>
				{{l.name}}
			</div>
			<div class="addNewForm">
				<input type="text" v-model="newListItem" placeholder="New one">
				<button @click="addToList">Add</button>
			</div>
        </propertyPopup>
	</block-content>
</template>

<script>
import propertyPopup from '../property-popup';
import blockContent from '../block-content.js';

export default {
	components: {
        blockContent,
		propertyPopup
	},
	data: ()=>{
		return {
            list: [
				{id: 0, name: 'Your profession'},
				{id: 1, name: 'Developer'},
				{id: 2, name: 'Accountant'},
				{id: 3, name: 'Designer'},
				{id: 4, name: 'QA'}
			],
			newListItem: ""
        }
	},
	methods: {
        setData(d){return require("../setData")(this, d)},
		getData(){return require("../getData")(this)},
		slotMounted(){return this.$parent.slotMounted(this);},
		// ...
		addToList(){
			this.list.push({id: (this.list.slice(-1)[0]||{id: 0}).id + 1, name: this.newListItem});
			this.newListItem = "";
		},
		removeListItem(l){
			this.list = this.list.filter(x=>x.id != l.id);
		}
	},
	mounted(){
		this.slotMounted();
		// ...

	}
}
</script>

<style lang="scss" scoped>
h2{
	margin-bottom: 5px;
}
.row {
	.col{
		display: inline-block;
	}
}
input, select{
	border: 1px solid #eee;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 5px;
	&:active{
		border: 1px solid blue;
	}
}
button{
	background: #eaeaea;
    color: black;
    border: 1px solid #3f51b5;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.removeListItem{
	background: unset;
	border: none;
	padding: 0;
	opacity: 0.5;
	margin-right: 4px;
	&:hover{
		opacity: 1;
	}
}

.addNewForm{
	margin-top: 5px;
}
</style>