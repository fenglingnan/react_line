/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: ljx
 * @Date: 2020-07-24 15:16:27
 * @LastEditors: ljx
 * @LastEditTime: 2021-05-07 23:57:18
 */
// 使用在线iconfont

import { createFromIconfontCN  } from '@ant-design/icons';

export const ICON_CODE=createFromIconfontCN({
    scriptUrl: [
        // process.env.REACT_APP_ICON_URL
        '//at.alicdn.com/t/font_1247967_oiyqd6qxnsd.js'
    ],
});