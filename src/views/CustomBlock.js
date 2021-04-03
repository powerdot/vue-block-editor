export default {
    name: 'CustomBlock',
    render(h){
        return this.renderJSX(h)
    },
    props: {
        renderJSX: {
            type: Function,
            required: true
        }
    },
    mounted(){
        console.log('mnt', this)
    }
}