import React, { Component } from 'react';
import styles from '../../style/Login.module.scss'; 
import { Input,Checkbox,Button  } from 'antd';
import { UserOutlined,LockOutlined,LoginOutlined  } from '@ant-design/icons';
import {ICON_CODE} from '../../common/ICON_FONT'
class Login extends Component {
    constructor(props){
        super(props)
    }
    state={
        code:'https://www.threetong.com/uploads/allimg/160910/9-160910101Z2952.jpg',
        prp:1234
    }
    jump(url){
        this.props.history.push(url);
    }
    check_change(e){
        console.log(e.target.checked)
    }
    submit(){
        console.log(22)
    }
    render() {
        return (
            <div className={`${styles.cont} flex_center`}>
                <div className='main'>
                    <p className='log'>登录</p>
                    <div className='inp'>
                        <Input size="large" placeholder="请输入用户名密码" prefix={<UserOutlined />} />
                    </div>
                    <div className='inp'>
                        <Input type='password' size="large" placeholder="请输入用户名密码" prefix={<LockOutlined />} />
                    </div>
                    <div>
                    <Input.Group className='codes' size='large' compact>
                        <Input placeholder='请输入验证码' prefix={<ICON_CODE type="iconyanzhengma" />} />
                        <img src={this.state.code} alt=""/>
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
