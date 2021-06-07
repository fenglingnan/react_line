/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: ljx
 * @Date: 2021-04-25 14:06:01
 * @LastEditors: ljx
 * @LastEditTime: 2021-05-11 00:13:31
 */
import React, { Component } from 'react';
import style from '../../style/Legal.module.scss'
import { Input,Button,Tree  } from 'antd';
const { Search } = Input;
function TreeNode(props){
    if(props.data.length<=0) return '暂无数据'
    return <React.Fragment>
        {
            props.data.map((item,index)=>{
                return <div className={`level${item.level}`} key={index}>
                    <span className='tit'>{item.title}</span>
                    <span className='main'>{item.content}</span>
                    {
                        item.children.length>0?<TreeNode data={item.children}></TreeNode>:''
                    }
                </div>
            })
        }
    </React.Fragment>
}
class Legal extends Component {
    state={
        treeData: [],
        contData:[],
        renderCont:null,
        clickId:null,
        pos:null
    }
    onSearch=(val)=>{
        console.log(val)
    }
    selectTree=(val,data)=>{
        console.log(val,data)
    }
    recurData=(data)=>{
        let val=[]
        for(let i in data){
            let obj=data[i]
            obj.key=obj.id
            val.push(obj)
            if(obj.children&&obj.children.length>0){
                this.recurData(obj.children)
            }
        }
        return val
    }
    getTree=async (id)=>{
        let res=await this.$api.civil.GET_CIVIL({
            id:id
        })
        let data=this.recurData(res.data.list)
        if(!id){
            this.setState({
                treeData:data
            })
            return
        }
        let str=this.state.pos.split('-')
        str.shift()//antUI里的第一级是0-0开始，所以剪掉一层
        let arr=[...this.state.treeData]
        let end;
        function dataval(val,len){
            console.log(val,len)
            if(len>=str.length) return
            if(len==str.length-1){
                console.log('123',str[len])
                console.log(val[str[len]])
                val[str[len]]['children']=data
                return
            }
            if(len<str.length){
                dataval(val[str[len]]['children'],len)
                len++;
            }
            
        }
        dataval(arr,0)
        console.log('6666',arr)
        // arr[val].children=data
        this.setState({
            treeData:arr
        })
        // for(let i in this.state.treeData){
        //     console.log(this.state.treeData[i])
        //     console.log(val)
        //     if(val==this.state.treeData[i].id){
                
        //     }
        // }
    }
    onLoadData=(data)=>{
        return new Promise(async (resolve)=>{
            console.log(data)
            await this.setState({pos:data.pos})
            await this.getTree(data.id)
            resolve()
        })
    }
    componentDidMount(){
        this.getTree()
    }
    render() {
        
        return (
            <div className={`${style.cont}`}>
                <div className='title'>
                    <span>民法典查询</span>
                    <div>
                        <Search size='large' placeholder="搜索内容与目录" onSearch={this.onSearch} className='inp' />
                        <Button href='/static/P020200604428154504696.pdf' download='民法典' type="link">下载</Button>
                    </div>
                </div>
                <div className='wrap'>
                    <div className='left'>
                        <p className='dir'>目录</p>
                        {
                            this.state.treeData.length>0?
                            <Tree
                                loadData={this.onLoadData}
                                onSelect={this.selectTree}
                                treeData={this.state.treeData}
                            ></Tree>
                            :'暂无数据'
                        }
                    </div>
                    <div className='right'>
                        <TreeNode data={this.state.contData}></TreeNode>
                    </div>
                </div>
            </div>
        );
    }
}

export default Legal;
