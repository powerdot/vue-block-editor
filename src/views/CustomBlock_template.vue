<template>
    
</template>

<script>
export default {
    name: 'CustomBlock',
    // render:  function(h){
    //     console.log("render this", this);
    //     return this.templateModule
    // },
    // render(h){
    //     console.log(this.templateModule.default.render)
    //     return this.templateModule.default.render(h)
    // },
    components: {
    },
    props: [
        'templateModule'
    ],
    data(){
        return {

        }
    },
    beforeMount(){
        console.log("bmnt this", this)
        console.log("bmnt this.components", this.components, this.$components)
        console.log('bmnt templateModule', this.templateModule.default);
        // this.components.templateModule = this.templateModule;
        // let keys = Object.keys(this.templateModule.default);
        // for(let k of keys){
        //     this[k] = this.templateModule.default.data[k];
        //     console.log('->', k);
        // }
    },
    mounted(){
        console.log("mnt this", this)
        // console.log('mnt templateModule', this.templateModule.default);
    }
}
</script>

