module.exports = (_this)=>{
    let block_editor = _this.$children[0]?.$children.find(x=>x.$vnode.componentOptions.Ctor.extendOptions.name == 'block-editor')
    let data = JSON.parse(JSON.stringify(_this.$data));
    if(block_editor) data.block_editor = block_editor.Compile(false);
    return data;
}