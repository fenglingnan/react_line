import {get,post} from '../api'

//查询列表
export const GET_DIARY=data=>get('/local/diaryList',data)

//添加日记
export const ADD_DIARY=data=>post('/local/diaryAdd',data);