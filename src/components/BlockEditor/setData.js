module.exports = (_this, applyData)=>{
    if(!applyData) return new Error("Data to apply is undefined.");
    if(!_this.$data) return;
    for(let data_prop of Object.keys(_this.$data)){
        if(typeof applyData[data_prop] !== 'undefined'){
            _this.$data[data_prop] = applyData[data_prop];
        }
    }
}