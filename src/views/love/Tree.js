import React, { Component } from 'react';
import style from '../../style/Tree.module.scss'
import love_tree from '../../util/tree/love'

class tree extends Component {
    constructor(props){
        super(props)
        this.canvas=null;
        this.ctx=null;
        this.opts = null
        this.tree=null;
        this.seed=null;
        this.foot=null;
        this.hold=null;
    }
    state={
        run:true
    }
    init(){
        this.canvas=document.querySelector('#canvas')
        this.ctx=this.canvas.getContext('2d');
        this.opt={
            seed: {
                x: this.canvas.width / 2 - 20,
                color: "rgb(190, 26, 37)",
                scale: 2
            },
            branch: [
                [535, 680, 570, 250, 500, 200, 30, 100, [
                    [540, 500, 455, 417, 340, 400, 13, 100, [
                        [450, 435, 434, 430, 394, 395, 2, 40]
                    ]],
                    [550, 445, 600, 356, 680, 345, 12, 100, [
                        [578, 400, 648, 409, 661, 426, 3, 80]
                    ]],
                    [539, 281, 537, 248, 534, 217, 3, 40],
                    [546, 397, 413, 247, 328, 244, 9, 80, [
                        [427, 286, 383, 253, 371, 205, 2, 40],
                        [498, 345, 435, 315, 395, 330, 4, 60]
                    ]],
                    [546, 357, 608, 252, 678, 221, 6, 100, [
                        [590, 293, 646, 277, 648, 271, 2, 80]
                    ]]
                ]] 
            ],
            bloom: {
                num: 700,
                width: 1080,
                height: 650,
            },
            footer: {
                width: 1200,
                height: 5,
                speed: 10,
            }
        }
        this.tree = new love_tree(this.canvas, this.canvas.width, this.canvas.height, this.opt);
        this.seed = this.tree.seed;
        this.foot = this.tree.footer;
        this.hold = 1;
        this.runAsync().then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        });
    }
    runAsync = async ()=> {
        await this.seedAnimate();
        await this.growAnimate();
        await this.flowAnimate();
        await this.moveAnimate();
        await this.textAnimate();
        await this.jumpAnimate();
    }
    seedAnimate = async ()=>{
        this.seed.draw();
        while (this.hold) {
            await this.sleep(10)
        }
        while (this.seed.canScale()) {
            this.seed.scale(0.95);
            await this.sleep(10)
        }
        while (this.seed.canMove()) {
            this.seed.move(0, 2);
            this.foot.draw();
            await this.sleep(10)
        }
    }
    growAnimate = async ()=> {
        do {
            this.tree.grow();
            await this.sleep(10)
        } while (this.tree.canGrow());
    }
    flowAnimate = async ()=> {
        do {
            this.tree.flower(2);
            await this.sleep(10)
        } while (this.tree.canFlower());
    }
    moveAnimate = async  ()=> {
        this.tree.snapshot("p1", 240, 0, 610, 680);
        while (this.tree.move("p1", 500, 0)) {
            this.foot.draw();
            await this.sleep(10)
        }
        this.foot.draw();
        this.tree.snapshot("p2", 500, 0, 610, 680);
        // 会有闪烁不得意这样做, (＞﹏＜)
        this.canvas.parentNode.style.background=`url(${this.tree.toDataURL('image/png')})`
        this.canvas.style.background='#ffe'
        await this.sleep(300)
        this.canvas.style.background='#none'
    }
    jumpAnimate = async ()=> {
        while (true) {
            this.tree.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.tree.jump();
            this.foot.draw();
            await this.sleep(300)
        }
    }
    typewriter=()=>{
        var $ele = document.querySelector('#code');
        $ele.style.display='block';
        var str = $ele.innerHTML;
        var progress = 0
        $ele.innerHTML='';
        var timer = setInterval(function() {
            var current = str.substr(progress, 1);
            if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress++;
            }
            $ele.innerHTML=str.substring(0, progress) + (progress & 1 ? '_' : '');
            if (progress >= str.length) {
                clearInterval(timer);
            }
        }, 75);
    }
    textAnimate = async ()=> {
        var together = new Date();
        together.setFullYear(2010,1 , 15); 			//时间年月日
        together.setHours(16);						//小时	
        together.setMinutes(53);					//分钟
        together.setSeconds(0);					//秒前一位
        together.setMilliseconds(2);				//秒第二位
        this.typewriter()
        document.querySelector('#clock-box').style.display='block';
        while (this.state.run) {
            this.timeElapse(together);
            await this.sleep(1000)
        } 
        
    }
    timeElapse=(date)=>{
        var current = Date();
        var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
        var days = Math.floor(seconds / (3600 * 24));
        seconds = seconds % (3600 * 24);
        var hours = Math.floor(seconds / 3600);
        if (hours < 10) {
            hours = "0" + hours;
        }
        seconds = seconds % 3600;
        var minutes = Math.floor(seconds / 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        seconds = seconds % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var result = "第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒"; 
        document.querySelector('#clock').innerHTML=result;
    }
    canvas_click=(e)=>{
        e.persist();
        let offset=this.canvas.getBoundingClientRect()
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        console.log(offset,x,y,this.seed.hover(x, y))
        if (this.seed.hover(x, y)) {
            this.hold = 0; 
            this.canvas.removeEventListener('click',this.canvas_click)
            this.canvas.removeEventListener('mousemove',this.canvas_move)
            this.canvas.classList.remove('hand');
            // this.canvas.unbind("click");
            // this.canvas.unbind("mousemove");
        }
    }
    sleep=(times)=>{
        return new Promise((resolve)=>{
            // setTimeout(resolve, timeountMS);
            setTimeout(()=>{
                resolve()
            },times)
        })
    }
    canvas_move=e=>{
        e.persist();
        let offset=this.canvas.getBoundingClientRect()
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        this.canvas.classList.toggle('hand');
        this.seed.hover(x, y)
    }
    componentDidMount() {
        this.init()
    }
    componentWillUnmount(){
        this.setState({
            run:false
        })
        // this.timeElapse=null;
        // this.textAnimate=null;
    }
    render() {
        return (
            <div className={`${style.cont}`}>
                <div id="error">本页面采用HTML5编辑，目前您的浏览器无法显示，请换成谷歌(<a href="http://www.google.cn/chrome/intl/zh-CN/landing_chrome.html?hl=zh-CN&brand=CHMI">Chrome</a>)或者火狐(<a href="http://firefox.com.cn/download/">Firefox</a>)浏览器，或者其他游览器的最新版本。</div>
                <div id="wrap">
                    <div id="text">
                        <div id='code'>
                            <font>
                                <span className="say">亲爱的宝宝，我爱你</span><br/>
                                <span className="say"> 我知道我不会甜言蜜语，</span><br/>
                                <span className="say"> 但是我会用行动证明一切</span><br/>
                                <span className="say">你说我啰嗦，</span><br/>             
                                <span className="say"> 有些东西因为越在乎所以越怕失去</span><br/>
                                <span className="say">因为我太爱你了，所以我害怕失去你</span><br/>
                                <span className="say">因为我太爱你了，所以我对你总啰嗦</span><br/>
                                <span className="say">希望可以执子之手，与子偕老</span><br/>
                                <span className="say">如果上天让我许三个愿望，</span><br/>
                                <span className="say">第一个是今生今世和你在一起， </span><br/>
                                <span className="say"> 第二个是再生再世和你在一起，</span><br/>
                                <span className="say">第三个是永生永世和你不分离 </span><br/>
                                <span className="say"><span className="space"></span> -- 爱你的老公</span>
                            </font>
                        </div>
                        
                    </div>
                    <div id="clock-box">
                        <span className="STYLE1"></span>
                        <font color="#33CC00">亲爱的，我喜欢你</font>
                        <span className="STYLE1">已经是……</span>
                        <div id="clock"></div>
                    </div>
                    <canvas onClick={this.canvas_click} id="canvas" width="1100" height="680" onMouseMove={this.canvas_move}></canvas>
                </div>
            </div>
        );
    }
}

export default tree;
