import {get,post} from '../api'

//验证码
export const CAPTCHA=data=>get('/local/code',data)
//登录
export const LOGIN=data=>post('/local/login',data,{},true)