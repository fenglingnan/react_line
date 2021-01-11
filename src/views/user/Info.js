import React, { Component } from 'react';
import { Button } from 'antd';
class Info extends Component {
    constructor(props){
        super(props)
    }
    save(){
        //保存后跳转
        this.props.history.push(this.props.location.state.url);
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Button onClick={this.save.bind(this)}>保存</Button>
                这里是info
            </div>
        );
    }
}

export default Info;
