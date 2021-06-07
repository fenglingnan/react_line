/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: ljx
 * @Date: 2021-05-06 16:47:08
 * @LastEditors: ljx
 * @LastEditTime: 2021-05-06 16:48:28
 */

import {get,post} from '../api'

//查询民法典树
export const GET_CIVIL=data=>get('/civil/civilTree',data)