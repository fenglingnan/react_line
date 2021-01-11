//常用方法
//勿多
const $common={
    //设置input值的公共方法
    set_inp:function(key,instance,event){
        event.persist()
        let obj={};
        obj[key]=event.target.value
        instance.setState(obj)
    },
    //返回年月日时分秒
    timestamp:function(data){
        if(!data) return ''
        let date=new Date(Number(data));
        let hours=date.getHours()
        let min=date.getMinutes()
        let sec=date.getSeconds()
        let mon=date.getMonth()+1
        let day=date.getDate()
        return `${date.getFullYear()}-${mon>=10?mon:'0'+mon}-${day>=10?day:'0'+day} ${hours>=10?hours:'0'+hours}:${min>=10?min:'0'+min}:${sec>=10?sec:'0'+sec}`
    },
    //复制链接
    copy(value){
        if(!value) return Message.error('链接为空')
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', value);
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            console.log('复制成功');
            Message.success('复制成功')
        }
        document.body.removeChild(input);
    }
}
export default $common