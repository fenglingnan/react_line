/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: ljx
 * @Date: 2021-04-25 14:06:01
 * @LastEditors: ljx
 * @LastEditTime: 2021-04-25 16:17:33
 */
import React, { Component } from 'react';
import style from '../../style/Legal.module.scss'
import { Input,Button  } from 'antd';
const { Search } = Input;
class Legal extends Component {
    onSearch=(val)=>{
        console.log(val)
    }
    render() {
        return (
            <div className={`${style.cont}`}>
                <div>
                    <span>民法典查询</span>
                    <div>
                        <Search placeholder="input search text" onSearch={this.onSearch} style={{ width: 200 }} />
                        <Button href='/static/P020200604428154504696.pdf' download='民法典' type="link">下载</Button>
                    </div>
                </div>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Legal;
