import {get,post} from '../api'

//验证码
export const CAPTCHA=data=>get('/login/code',data)
//登录
export const LOGIN=data=>post('/login/login',data,{},true)