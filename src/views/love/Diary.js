import React, { Component } from 'react';
import E from 'wangeditor'
import style from '../../style/Diary.module.scss'
import { Button,Pagination,ConfigProvider,Empty   } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import {ICON_CODE} from '../../common/ICON_FONT'
console.log(Component,1)
class Diary extends Component {
    constructor(props){
        
        super(props)
        this.editor=null
    }
    state={
        is_create:false,
        diary_list:[],
        page_total:0,
        page_cur:1,
        page_size:10
    }
    componentDidMount(){
        this.get_list()
        // console.log(2)
        console.log(this,2)
    }
    open(){
        if(this.state.is_create){
            this.destroy_editor()
            this.setState({is_create:false})
        }else{
            this.create_editor()
            this.setState({is_create:true})
        }
    }
    create_editor=()=>{
        this.editor = new E('#editor')
        //使用base64
        this.editor.config.uploadImgShowBase64 = true
        //流
        // this.editor.config.customUploadImg = async function (resultFiles, insertImgFn) {
        //     // resultFiles 是 input 中选中的文件列表
        //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        //     // 上传图片，返回结果，将图片插入到编辑器中
        //     // insertImgFn(imgUrl)
        //     for(let i in resultFiles){
        //         let form=new FormData();
        //         form.append('name',resultFiles[i].name)
        //         form.append('file',resultFiles[i])
        //         let res=await up_serve(form)
        //         insertImgFn(res.data.fileHttpUrl)
        //     }
        // }
        //不需要的插件
        this.editor.config.excludeMenus = [
            'emoticon',
            'video'
        ]
        this.editor.config.height = 180//设置高度
        this.editor.create()
    }
    destroy_editor(){
        if(this.state.is_create){
            this.editor.destroy()
        }
    }
    componentWillUnmount(){
        this.destroy_editor()
    }
    async get_list(){
        let res=await this.$api.diary.GET_DIARY({
            page_cur:this.state.page_cur,
            page_size:this.state.page_size
        })
        this.setState({
            diary_list:res.data.list,
            page_total:res.data.page_total
        })
    }
    save=async ()=>{
        if(!this.state.is_create){
            return this.$msg.error('请先点击编辑')
        }
        let txt=this.editor.txt.html()
        if(!txt){
            this.$msg.warning('请输入内容')
        }else{
            let res=await this.$api.diary.ADD_DIARY({
                txt:txt
            })
            this.$msg.success(res.msg)
            this.get_list()
            console.log('提交内容')
        }
    }
    onChange=page=>{
        this.setState({
            page_cur: page,
        },()=>{
            this.get_list()
        });
    }
    render() {
        let word=!this.state.is_create?'编辑':'关闭'
        let type=this.state.is_create?'iconguanbi':'iconbianji'
        let cont
        if(this.state.diary_list.length==0){
            cont=(<Empty description='没有留言哟~'></Empty>)
        }else{
            cont=this.state.diary_list.map((item,index)=>{
                return (
                    <div className='list' key={index}>
                        <div className='left'>
                            <img src={item.src} alt=""/>
                        </div>
                        <div className='right'>
                            <div className='tit'>
                                <span className='name'>{item.user_name}</span>
                                <span className='floor'>{`第${index+1}楼`}</span>
                            </div>
                            {/* 强制必须加{ __html:} */}
                            <div className='edi' dangerouslySetInnerHTML={{ __html: item.body}}></div>
                            <div className='timer'>{this.$common.timestamp(item.time)}</div>
                        </div>
                    </div>
                )
            })
        }
        
        return (
            <div className={`${style.cont}`}>
                <div className='main'>
                    <div className='btns'>
                        <Button type="primary" onClick={this.open.bind(this)} icon={<ICON_CODE type={type}></ICON_CODE>}>{word}</Button>
                        <Button className='save' onClick={this.save.bind(this)} icon={<ICON_CODE type='iconbaocun'></ICON_CODE>}>留言</Button>
                    </div>
                    <div id='editor'></div>
                    <div className='wrap'>
                        {cont}
                    </div>
                    <ConfigProvider locale={zhCN}>
                        <Pagination  
                            showQuickJumper
                            current={this.state.page_cur} 
                            onChange={this.onChange} 
                            total={this.state.page_total} 
                            showTotal={total => `共 ${total} 条`}
                        ></Pagination>
                    </ConfigProvider>
                </div>
            </div>
        );
    }
}

export default Diary;
