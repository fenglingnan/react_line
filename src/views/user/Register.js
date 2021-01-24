import React, { Component } from 'react';
import styles from '../../style/Register.module.scss'; 
import { Input,Button,message,Form,ConfigProvider   } from 'antd';
import { CloudUploadOutlined,LockOutlined,UnlockOutlined,GithubOutlined,MobileOutlined  } from '@ant-design/icons';
import {ICON_CODE} from '../../common/ICON_FONT'
import md5 from 'md5'
const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 20,
    },
};
const PHONE_REG=/^1\d{10}$/
class Register extends Component {
    constructor(props){
        super(props)
        this.formRef=React.createRef()
        this.time=30
        this.timer=null
    }
    state={
        code:'https://www.threetong.com/uploads/allimg/160910/9-160910101Z2952.jpg',
        pic:'',
        word:'获取验证码',
        dis:false
    }
    send_code=()=>{
        let val=this.formRef.current.getFieldValue('mobile')
        if(!PHONE_REG.test(val)){
            return message.error('手机号格式不正确')
        }
        if(this.state.dis){
            return message.error('您点的太快了~')
        }
        this.setState({
            dis:true
        })
        this.timer=setInterval(()=>{
            this.setState({
                word:`${this.time--}s`
            },()=>{
                if(this.time<=0){
                    clearInterval(this.timer)
                    this.setState({
                        word:'获取验证码',
                        dis:false
                    })
                    this.time=10
                }
            })
        },1000)
    }
    onFinish=async val=>{
        if(val.pwd!=val.conf_pwd){
            return message.error('两次密码不一致')
        }
        let res=await this.$api.login.SIGN({
            user_name:val.user_name,
            mobile:val.mobile,
            code:val.code,
            pwd:md5(val.pwd)
        })
        console.log(res)
        message.success(res.msg)
        this.props.history.push('/');
    }
    onReset=()=>{
        this.formRef.current.resetFields()
    }
    regist(){
        this.props.history.push('/');
    }
    render(){
        const validateMessages = {
            required: "'${label}' 是必填内容",
            // ...
        };
        return (
            <div className={`${styles.cont} flex_center`}>
                <div className='main'>
                    <p className='log'>注册</p>
                    <ConfigProvider form={{ validateMessages }}>
                        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                            <Form.Item
                                name="user_name"
                                label="用户名"
                                rules={[
                                    {
                                        required: '用户名是必选字段',
                                    },
                                ]}
                            >
                                <Input prefix={<GithubOutlined />} placeholder='请输入用户名' />
                            </Form.Item>
                            <Form.Item
                                name="mobile"
                                label="手机号"
                                rules={[
                                    {
                                        required: '手机号是必选字段',
                                        pattern:PHONE_REG,
                                        message: '请输入正确的手机号'
                                    },
                                ]}
                            >
                                <Input prefix={<MobileOutlined />} placeholder='请输入手机号' />
                            </Form.Item>
                            <Form.Item
                                name='code'
                                label="验证码"
                                rules={[
                                    {
                                        required: '验证码是必选字段',
                                    },
                                ]}
                            >
                                <Input placeholder='请输入验证码' prefix={<ICON_CODE type="iconyanzhengma" />} addonAfter={<span className='changes' onClick={this.send_code.bind(this)}>{this.state.word}</span>} />
                            </Form.Item>
                            <Form.Item
                                name="pwd"
                                label="密码"
                                rules={[
                                    {
                                        required: '密码是必选字段',
                                    },
                                ]}
                            >
                                <Input type='password' prefix={<UnlockOutlined />} placeholder='请输入密码' />
                            </Form.Item>
                            <Form.Item
                                name="conf_pwd"
                                label="确认密码"
                                rules={[
                                    {
                                        required: '密码是必选字段',
                                    },
                                ]}
                            >
                                <Input type='password' prefix={<LockOutlined />} placeholder='请输入密码' />
                            </Form.Item>
                            <div className='flex_center'>
                                <Button type="primary" htmlType="submit" className='btn_left'>
                                    注册
                                </Button>
                                <Button htmlType="button" onClick={this.onReset}>
                                    重置
                                </Button>
                            </div>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
        )
    }
}

export default Register;
