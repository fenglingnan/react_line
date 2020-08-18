import React, { Component } from 'react';
import styles from '../../style/Login.module.scss'; 
import { Input,Checkbox,Button,message  } from 'antd';
import { UserOutlined,LockOutlined,PhoneOutlined,CheckOutlined  } from '@ant-design/icons';
import {ICON_CODE} from '../../common/ICON_FONT'
import md5 from 'md5'
const TIME=60
class Forget extends Component {
    constructor(props){
        super(props)
        this.timer=null
    } 
    state={
        code:'https://www.threetong.com/uploads/allimg/160910/9-160910101Z2952.jpg',
        word:'获取验证码',
        lock:false,
        time_no:TIME,
        pic:''
    }
    confirm(){
        console.log(this.state.pic)
        // console.log(222,url)
        this.props.history.push('/');
    }
    //校验图形码
    check_code(){
        console.log(this.state.pic)
        if(this.state.lock){
            return false
        }
        return true
    }
    //发送验证码
    send_code(){
        if(!this.state.pic) {
            message.warning('请输入图形码');
            return
        }
        let end=this.check_code();
        if(!end) return;
        this.setState({lock:true});
        this.timer=setInterval(()=>{
            if(this.state.time_no==0){
                this.setState({
                    word:'获取验证码',
                    time_no:TIME,
                    lock:false
                })
                clearInterval(this.timer)
                return
            }
            this.setState((state)=>({
                time_no:state.time_no-1,
                word:`${state.time_no}s`
            }))
        },1000)
    }
    change_pic(e){
        this.setState({
            pic:e.target.value
        })
    }
    render() {
        return (
            <div className={`${styles.cont} flex_center`}>
                <div className='main'>
                    <p className='log'>忘记密码</p>
                    <div className='inp'>
                        <Input size="large" placeholder="请输入手机号" prefix={<PhoneOutlined />} />
                    </div> 
                    <div className='inp'>
                        <Input.Group className='codes' size='large' compact>
                            <Input 
                                placeholder='请输入图形码'  
                                value={this.state.pic}  
                                onInput={(e)=>{e.persist();this.change_pic(e)}} 
                                prefix={<ICON_CODE type="iconyanzhengma" />} 
                            />
                            <img src={this.state.code} alt=""/>
                        </Input.Group>
                    </div>
                    <div className='inp'>
                        <Input.Group className='codes' size='large' compact>
                            <Input placeholder='请输入验证码' prefix={<ICON_CODE type="iconyanzhengma" />} />
                            <span className='change' onClick={this.send_code.bind(this)}>{this.state.word}</span>
                        </Input.Group>
                    </div>
                    <div className='inp'>
                        <Input size="large" placeholder="请输入新密码" prefix={<LockOutlined />} />
                    </div> 
                    <div className='inp'>
                        <Input size="large" placeholder="确认新密码" prefix={<LockOutlined />} />
                    </div>
                    <Button block size='large' type="primary" icon={<CheckOutlined />} onClick={this.confirm.bind(this)}>确认修改</Button> 
                </div>             
            </div>
        );
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
}

export default Forget;
