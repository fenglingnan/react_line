/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: ljx
 * @Date: 2021-01-27 14:15:20
 * @LastEditors: ljx
 * @LastEditTime: 2021-03-22 23:34:23
 */
import React, { Component } from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import sky from '../../asset/sky.jpg'
import head from '../../asset/yaya_head.jpg'
const WIDTH=window.screen.width
const HEIGHT=window.innerHeight
const TEST=require('../../asset/sky.jpg')
class Star extends Component {
    constructor(props){
        super(props)
        this.renderer=null
        this.scene=null
        this.camera=null
        this.timer=null
        this.runBack=null
    }
    init(){
        console.log(1)
        this.initRenderer();
        this.initScene();
        this.initCamera();
        this.renderStar();
        
    }
    initRenderer(){
        console.log(2)
        this.renderer = new THREE.WebGLRenderer({ 
            canvas:document.getElementById('canvas'),
            antialias: true,
            alpha:true
        });
        this.renderer.setSize(WIDTH,HEIGHT);
    }
    initScene(){
        console.log(3)
        this.scene = new THREE.Scene();
        const sky_back = new THREE.TextureLoader().load( sky );
        const head_back=new THREE.TextureLoader().load( head );
        
        // scene.background=new THREE.Color(0xffffff)
        const material = new THREE.SpriteMaterial( { map: head_back } );

        const sprite = new THREE.Sprite( material );
        sprite.position.set(0,0,5)
        this.scene.add(sprite )
        this.scene.background=sky_back
    }
    initCamera(){
        console.log(4)
        this.camera = new THREE.PerspectiveCamera(30, WIDTH/HEIGHT,1, 1000);
        // camera.position.y=800/Math.tan(Math.PI/2.5);
        
        this.camera.position.z=30;
    }
    renderStar=()=>{
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.renderStar);
    }
    canvas_down=()=>{
        this.timer=setTimeout(()=>{
            this.run()
        },1000)
        
    }
    canvas_up=()=>{
        clearTimeout(this.timer)
        cancelAnimationFrame(this.runBack)
    }
    run=()=>{
        this.camera.position.z-=0.03
        this.runBack=requestAnimationFrame(this.run)
    }
    componentDidMount(){
        this.init()
    }
    render() {
        return (
            <div id='container' style={{width:WIDTH,height:HEIGHT}}>
                {/* <canvas id='canvas' style={{background:'#f00'}}></canvas> */}
                <canvas id='canvas' onMouseDown={this.canvas_down} onMouseUp={this.canvas_up}></canvas>
            </div>
        );
    }
}

export default Star;
