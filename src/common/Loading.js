import React, { Component } from 'react';
import { message } from 'antd';
const hide = message.loading('界面正在赶来..', 0);
class Loading extends Component {
    componentDidMount(){
        
        // Dismiss manually and asynchronously
        setTimeout(hide, 100);
    }
    render() {
        return (
            <div style={{display:'none'}}>

            </div>
        );
    }
}

export default Loading;
