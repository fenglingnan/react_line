import React, { Component } from 'react';
import style from '../style/Index.module.scss'

class Index extends Component {
    constructor(props){
        super(props)
        this.ctx=null;
    }
    // 初始化画布
    init(){
        this.ctx=this.refs.ctx.getContext('2d')
        this.refs.ctx.setAttribute('width',window.screen.width+'px')
        this.refs.ctx.setAttribute('height',window.innerHeight+'px')
        let ctx=this.ctx;
        ctx.beginPath();
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fillStyle='red'
        ctx.fill();
    }
    //画布渲染
    ctx_render(){
        
    }
    //dom挂载完毕
    componentDidMount() {
        this.init()
    }
    componentWillUnmount() {
        
    }
    render() {
        return (
            <div className={`${style.cont}`}>
                <canvas ref='ctx' id='running'></canvas>
            </div>
        );
    }
}

export default Index;
