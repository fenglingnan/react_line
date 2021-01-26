import {get,post} from '../api'

//登录验证码
export const CAPTCHA=data=>get('/login/code',data)
//登录
export const LOGIN=data=>post('/login/login',data,{},true)
//短信验证码图
export const SMS_CODE=data=>get('/login/sms_code',data)
//发送短信
export const SEND_CODE=data=>post('/login/send_code',data,{},false,true)
//注册
export const SIGN=data=>post('/login/sign',data,{},false,true)