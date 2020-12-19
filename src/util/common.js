//常用方法
//勿多
const $common={
    //设置input值的公共方法
    set_inp:function(key,instance,event){
        event.persist()
        let obj={};
        obj[key]=event.target.value
        instance.setState(obj)
    }
}
export default $common