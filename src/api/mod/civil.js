/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: ljx
 * @Date: 2021-05-06 16:47:08
 * @LastEditors: ljx
 * @LastEditTime: 2021-06-19 17:42:52
 */

import {get,post} from '../api'

//查询民法典树
export const GET_CIVIL=data=>get('/civil/civilTree',data)

//民法典内容
export const GET_CIVIL_CONTENT=data=>post('/civil/civilContent',data)