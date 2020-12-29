import React, { Component } from 'react';
import { message } from 'antd';
const hide = message.loading('Action in progress..', 0);
class Loading extends Component {
    componentDidMount(){
        
        // Dismiss manually and asynchronously
        setTimeout(hide, 10);
    }
    render() {
        return (
            <div style={{display:'none'}}>

            </div>
        );
    }
}

export default Loading;
