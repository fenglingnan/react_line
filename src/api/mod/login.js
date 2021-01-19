import {get,post} from '../api'

//验证码
export const CAPTCHA=data=>get('/local/login/code',data)
//登录
export const LOGIN=data=>post('/local/login/login',data,{},true)