import {get,post} from '../api'

//登录验证码
export const CAPTCHA=data=>get('/login/code',data)
//登录
export const LOGIN=data=>post('/login/login',data,{},true)
//注册验证码
export const SEND_CODE=data=>get('/login/send_code',data)
//注册
export const SIGN=data=>post('/login/sign',data)