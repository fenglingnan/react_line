import {get,post} from '../api'

export const TEST=(data)=>post('/test/openapi/api',data)

export const IMGCODE=data=>get('/local/captcha',data)


export const ADD=data=>get('/local/addrun11',data)