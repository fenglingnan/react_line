/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: ljx
 * @Date: 2021-05-07 23:52:18
 * @LastEditors: ljx
 * @LastEditTime: 2021-05-07 23:55:25
 */
import React, { useState } from 'react';

function Hooks() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);

    return (
        <div style={{marginLeft:'100px'}}>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default Hooks;