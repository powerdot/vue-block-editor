module.exports = (_this, applyData)=>{
    if(!applyData) return new Error("Data to apply is undefined.");
    if(!_this.$data) return;
    let block_editor = _this.$children[0]?.$children.find(x=>x.$vnode.componentOptions.Ctor.extendOptions.name == 'block-editor')
    if(block_editor){
        if(applyData.block_editor){
            block_editor.setData(applyData.block_editor);
            delete applyData.block_editor;
        }
    }
    
    for(let data_prop of Object.keys(_this.$data)){
        if(typeof applyData[data_prop] !== 'undefined'){
            _this.$data[data_prop] = applyData[data_prop];
        }
    }
}