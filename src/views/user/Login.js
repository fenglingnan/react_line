import React, { Component } from 'react';
import styles from '../../style/Login.module.scss'; 
import { Input,Checkbox,Button,message  } from 'antd';
import { UserOutlined,LockOutlined,LoginOutlined  } from '@ant-design/icons';
import {ICON_CODE} from '../../common/ICON_FONT'
import md5 from 'md5'
class Login extends Component {
    constructor(props){
        super(props)
    }
    state={
        code:'https://www.threetong.com/uploads/allimg/160910/9-160910101Z2952.jpg',
        prp:1234,
        username:'',
        password:'',
        img:''
    }
    jump(url){
        this.props.history.push(url);
    }
    check_change(e){
        console.log(e.target.checked)
    }
    async submit(){
        console.log(this.state.password)
        let res=await this.$api.login.LOGIN({
            username:this.state.username,
            password:this.state.password,
            code:this.state.img
        })
        if(res.data.code==200){
            message.success(res.data.msg)
            this.jump('/Home/Index')
        }else{
            message.error(res.data.msg)
            this.get_code()
        }
        console.log(res)
        
    }
    async get_code(){
        let res=await this.$api.login.CAPTCHA();
        this.setState({
            code:res.data.image
        })
    }
    componentDidMount(){
        console.log(this.$common)
        this.get_code()
    }
    render() {
        return (
            <div className={`${styles.cont} flex_center`}>
                <div className='main'>
                    <p className='log'>登录{this.$common.a}</p>
                    <div className='inp'>
                        <Input 
                            size="large" 
                            placeholder="请输入用户名" 
                            prefix={<UserOutlined />} 
                            value={this.state.username} 
                            onChange={this.$common.set_inp.bind(this,'username',this)} 
                        />
                    </div>
                    <div className='inp'>
                        <Input 
                            type='password' 
                            size="large" 
                            placeholder="请输入密码" 
                            prefix={<LockOutlined />} 
                            value={this.state.password} 
                            onChange={this.$common.set_inp.bind(this,'password',this)} 
                        />
                    </div>
                    <div>
                        <Input.Group className='codes' size='large' compact>
                            <Input 
                                placeholder='请输入验证码' 
                                prefix={<ICON_CODE type="iconyanzhengma" />} 
                                value={this.state.img}  
                                onChange={this.$common.set_inp.bind(this,'img',this)} 
                            />
                            <img src={this.state.code} alt="" onClick={this.get_code.bind(this)} />
                        </Input.Group>
                    </div>
                    <div className='flex_bt jump'>
                        <span>
                            <Checkbox onChange={this.check_change.bind(this)}>记住密码</Checkbox>
                        </span>
                        <span>
                            <Button type="link" onClick={this.jump.bind(this,'/Forget')}>忘记密码?</Button>
                            <Button type="link" onClick={this.jump.bind(this,'/Register')}>立即注册</Button>
                        </span>
                    </div>
                    <Button block size='large' type="primary" icon={<LoginOutlined />} onClick={this.submit.bind(this)}>登 录</Button>
                </div>
            </div>
        );
    }
}

export default Login;

