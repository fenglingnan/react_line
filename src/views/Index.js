import React, { Component } from 'react';
import style from '../style/Index.module.scss'

class Index extends Component {
    constructor(props){
        super(props);
        this.interval=38;
        this.ctx_ref=React.createRef();
        this.ctx=null;
        this.limit=150;//行间距
        this.word_space=30;//字间距
        this.lineWidth=3;//字宽
        this.color='#fff'//字体颜色
        this.width=this.limit*7+this.word_space*6;
        this.start=window.screen.width/2-this.width/2
        
        //英文四条线
        this.half=window.innerHeight/2;
        this.line_one=window.innerHeight/2-this.limit*1.5;
        this.line_two=window.innerHeight/2-this.limit/2;
        this.line_three=window.innerHeight/2+this.limit/2;
        this.line_four=window.innerHeight/2+this.limit*1.5;
        //w
        this.w_x=this.start
        this.w_y=this.line_two
        this.w_mark=1;
        //e
        this.e_x=this.start+180
        this.e_y=window.innerHeight/2
        this.e_deg=0;
        //l
        this.l_x=this.start+180+255;
        this.l_y=this.line_one;
        //c
        this.c_x=this.start+180+255+180;
        this.c_y=window.innerHeight/2;
        this.c_deg=40;
        //o
        this.o_x=this.start+180+255+180+180;
        this.o_y=window.innerHeight/2;
        this.o_deg=2;
        //m
        this.m_x=this.start+180+255+180+180+105;
        this.m_y=this.line_three;
        console.log(this.m_x,this.m_y)
        //e
        this.e_x_end=this.start+180+255+180+180+105+180
        this.e_y_end=window.innerHeight/2
        this.e_deg_end=0;
    }
    // 初始化画布
    init(){
        this.ctx_ref.current.setAttribute('width',window.screen.width+'px')
        this.ctx_ref.current.setAttribute('height',window.innerHeight+'px')
        this.ctx=this.ctx_ref.current.getContext('2d')
        this.ctx_w();//画w
        this.ctx_e();//画第一个e
        this.ctx_l();//画l
        this.ctx_c();//画c
        this.ctx_o();//画o
        this.ctx_m_left();//画m
        this.ctx_e_end();//画第二个e
    }
    //画w
    ctx_w=()=>{
        let mark;
        if(this.w_mark%2!=0){
            mark=1
        }else{
            mark=-1
        }
        this.ctx_render(mark)
    }
    //渲染w
    ctx_render=(mark)=>{
        this.ctx.beginPath();
        this.ctx.moveTo(this.w_x, this.w_y);
        this.w_y=this.w_y+4*mark;
        this.w_x=this.w_x+1;
        this.ctx.lineTo(this.w_x,this.w_y);
        this.ctx.strokeStyle=this.color;
        this.ctx.lineWidth=this.lineWidth
        this.ctx.stroke();
        this.ctx.closePath();
        if(this.w_x!=this.start+this.interval*this.w_mark){
            requestAnimationFrame(()=>{
                this.ctx_render(mark)
            });
        }else{
            if(this.w_mark==4){
                return
            };
            this.w_mark++;
            this.ctx_w()
        }
    }
    //画e的线
    ctx_e=()=>{
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.e_x, this.e_y);
        this.e_x+=1;
        this.ctx.strokeStyle=this.color;
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.lineTo(this.e_x,this.e_y);
        this.ctx.stroke();
        this.ctx.closePath();
        if(this.e_x<=this.start+180+this.limit){
            requestAnimationFrame(this.ctx_e)
        }else{
            this.ctx_e_round();
        }
    }
    //画e的弧
    ctx_e_round=()=>{
        //画圆弧
        this.ctx.beginPath();
        this.ctx.lineWidth =  this.lineWidth;
        this.ctx.strokeStyle =this.color;
        this.ctx.arc(this.start+255, this.line_two+75, this.limit/2, 0, Math.PI/180*this.e_deg*-1,true);
        this.ctx.stroke();
        this.ctx.closePath();
        this.e_deg+=2;
        if(this.e_deg<320){
            requestAnimationFrame(this.ctx_e_round)
        }
    }
    //画l
    ctx_l=()=>{
        this.ctx.beginPath();
        this.ctx.lineWidth=this.lineWidth*1.5;
        this.ctx.strokeStyle =this.color;
        this.ctx.moveTo(this.l_x, this.l_y);
        this.l_y+=1;
        this.ctx.lineTo(this.l_x,this.l_y);
        this.ctx.stroke();
        this.ctx.closePath();
        if(this.l_y<=this.line_three){
            requestAnimationFrame(this.ctx_l)
        }else{
            this.ctx_e_round();
        }
    }
    //画c
    ctx_c=()=>{
        this.ctx.beginPath();
        this.ctx.lineWidth =  this.lineWidth;
        this.ctx.strokeStyle =this.color;
        this.ctx.arc(this.c_x, this.c_y, this.limit/2, Math.PI/180*-40,  Math.PI/180*-1*this.c_deg,true);
        this.ctx.stroke();
        this.ctx.closePath();
        this.c_deg+=1;
        if(this.c_deg<320){
            requestAnimationFrame(this.ctx_c)
        }
    }
    //画o
    ctx_o=()=>{
        this.ctx.beginPath();
        this.ctx.lineWidth =  this.lineWidth;
        this.ctx.strokeStyle =this.color;
        this.ctx.arc(this.o_x, this.o_y, this.limit/2, 0,  Math.PI/180*-1*this.o_deg,true);
        this.ctx.stroke();
        this.ctx.closePath();
        this.o_deg+=1;
        if(this.o_deg<=360){
            requestAnimationFrame(this.ctx_o)
        }
    }
    //画m左边
    ctx_m_left=()=>{
        //y=ax2+bx+c 
        this.ctx.beginPath();
        this.ctx.lineWidth =  this.lineWidth;
        this.ctx.moveTo(this.m_x, this.m_y);
        this.m_x=this.m_x+0.5;
        this.m_y=  0.10666666666666667*(this.m_x)*(this.m_x) -232.64*(this.m_x) + 127132.96;   
        this.ctx.lineTo(this.m_x,this.m_y);        
        this.ctx.closePath();
        this.ctx.stroke();
        if(this.m_y<=this.line_three+1){
            requestAnimationFrame(this.ctx_m_left)
        }else{
            requestAnimationFrame(this.ctx_m_right)
        }
    }
    //画m的右边
    ctx_m_right=()=>{
        this.ctx.beginPath();
        this.ctx.lineWidth =  this.lineWidth;
        this.ctx.moveTo(this.m_x, this.m_y);
        this.m_x=this.m_x+0.5;
        this.m_y=  0.10666666666666667*(this.m_x)*(this.m_x)-248.64*(this.m_x) + 145180.96;   
        this.ctx.lineTo(this.m_x,this.m_y);            
        this.ctx.closePath();
        this.ctx.stroke();
        if(this.m_y<=this.line_three){
            requestAnimationFrame(this.ctx_m_right)
        }
    }
    ctx_e_end=()=>{
        this.ctx.beginPath();
        this.ctx.moveTo(this.e_x_end, this.e_y_end);
        this.e_x_end+=1;
        this.ctx.strokeStyle=this.color;
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.lineTo(this.e_x_end,this.e_y);
        this.ctx.stroke();
        this.ctx.closePath();
        if(this.e_x_end<=this.start+180+255+180+180+105+180+150){
            requestAnimationFrame(this.ctx_e_end)
        }else{
            this.ctx_e_end_round();
        }
    }
    ctx_e_end_round=()=>{
        //画圆
        this.ctx.beginPath();
        this.ctx.lineWidth =  this.lineWidth;
        this.ctx.strokeStyle =this.color;
        this.ctx.arc(this.start+180+255+180+180+105+105+150, this.line_two+75, this.limit/2, 0, Math.PI/180*this.e_deg_end*-1,true);
        this.ctx.stroke();
        this.ctx.closePath();
        this.e_deg_end+=2;
        if(this.e_deg_end<320){
            requestAnimationFrame(this.ctx_e_end_round)
        }
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
                <canvas ref={this.ctx_ref} id='running'></canvas>
            </div>
        );
    }
}

export default Index;
