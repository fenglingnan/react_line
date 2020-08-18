import React, { Component } from 'react';
import styles from '../../style/Login.module.scss'; 
import { Input,Checkbox,Button,message  } from 'antd';
import { CloudUploadOutlined,LockOutlined,UnlockOutlined,GithubOutlined,MobileOutlined  } from '@ant-design/icons';
import {ICON_CODE} from '../../common/ICON_FONT'
import md5 from 'md5'
class Register extends Component {
    constructor(props){
        super(props)
    }
    state={
        code:'https://www.threetong.com/uploads/allimg/160910/9-160910101Z2952.jpg',
        pic:'',
        word:'获取验证码'
    }
    change_pic(){

    }
    send_code(){

    }
    regist(){
        this.props.history.push('/');
    }
    render() {
        return (
            <div className={`${styles.cont} flex_center`}>
                <div className='main'>
                    <p className='log'>注册</p>
                    <div className='inp'>
                        <Input size="large" placeholder="请输入用户名" prefix={<GithubOutlined />} />
                    </div> 
                    <div className='inp'>
                        <Input size="large" placeholder="请输入手机号" prefix={<MobileOutlined />} />
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
                        <Input type='password' size="large" placeholder="请输入密码" prefix={<UnlockOutlined />} />
                    </div>
                    <div className='inp'>
                        <Input type='password' size="large" placeholder="请确认密码" prefix={<LockOutlined />} />
                    </div>
                    <Button block size='large' type="primary" icon={<CloudUploadOutlined />} onClick={this.regist.bind(this)}>注册</Button> 
                </div>
            </div>
        );
    }
}

export default Register;
