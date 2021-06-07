import React, { Component } from 'react';
import styles from '../style/Home.module.scss';
import { renderRoutes } from 'react-router-config'
import {ICON_CODE} from '../common/ICON_FONT'
import { Menum,Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
class Home extends Component {
    constructor(props){
        super(props)
    }
    state={
        open:false,
        route:this.props.route.routes,
        menu:[
            {
                id:'0',
                icon:"iconhome",
                label:'首页',
                href:'/Home/Index',
                child:[],
                icon_color:'#DCDCDC',
                bg_color:'#000'
            },
            {
                id:'1',
                icon:"iconicon-",
                label:'时钟',
                href:'/Home/Clock',
                child:[],
                icon_color:'#000',
                bg_color:'#fff'
            },
            {
                id:'2',
                icon:"iconaixin",
                label:'表白',
                href:'/Home/Tree',
                child:[],
                icon_color:'#000',
                bg_color:'#fff'
            },
            {
                id:'3',
                icon:"iconliuyanban-05",
                label:'日记',
                href:'/Home/Diary',
                child:[],
                icon_color:'#FFFAFA',
                bg_color:'skyblue'
            },
            {
                id:'4',
                icon:"icontiankongsheding",
                label:'Sky',
                href:'/Home/Cross',
                child:[],
                icon_color:'#000',
                bg_color:'#fff'
            },
            {
                id:'5',
                icon:"iconfalv",
                label:'民法典',
                href:'/Home/Legal',
                child:[],
                icon_color:'#48D1CC',
                bg_color:'#fff'
            },
            {
                id:'6',
                icon:"icongaoji",
                label:'React Hooks',
                href:'/Home/Hooks',
                child:[],
                icon_color:'#000',
                bg_color:'#fff'
            }
        ],
        default_index:1
    }
    air_fly(status){
        this.setState({
            open:status
        })
    }
    jump_info(){
        // console.log(this.props)
        this.props.history.push({
            pathname:'/Info',
            state:{url:this.props.location.pathname}
        });
    }
    jump(item){
        let route=document.querySelector('#route .content');
        let svgs=document.querySelector('#route .svgs');
        route.style.background=item.bg_color;
        svgs.style.color=item.icon_color
        this.props.history.push(item.href);
    }
    logout=()=>{
        this.props.history.push('/');
    }
    componentWillMount(){
        for(let i in this.state.menu){
            if(this.props.location.pathname==this.state.menu[i].href){
                this.setState({
                    default_index:i
                })
                break
            }
        }
    }
    render() {
        let run=this.state.open?'open':'';
        let fly=this.state.open?'fly':'';
        let menu=this.state.menu.map(item=>{
            if(item.child.length<=0){
                return  <Menu.Item key={item.id} onClick={this.jump.bind(this,item)} icon={<ICON_CODE type={item.icon} />}>
                            {item.label}
                        </Menu.Item>
            }
            //有子节点的时候添加下方代码
            let arr=item.child.map(list=>{
                <Menu.Item icon={<ICON_CODE type={list.icon} />} key={list.id}>{list.label}</Menu.Item>
            })

            return  <SubMenu key={item.id} icon={<ICON_CODE type={item.icon} />} title={item.label}>
                        {arr}
                    </SubMenu>
        })
        let slide=(
            <Menu>
                <Menu.Item key="0" onClick={this.jump_info.bind(this)}>
                    个人中心
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" onClick={this.logout}>退出登录</Menu.Item>
            </Menu>
        )
        return (
            <div className={`${styles.cont}`}>
                <div className='user'>
                    <div className='header'>
                        <div className='left'>
                            123456
                        </div>
                        <div className='right'>
                        <Dropdown overlay={slide} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Click me <DownOutlined />
                            </a>
                        </Dropdown>
                        </div>
                    </div>
                    <div className='nav'>
                        <Menu
                            defaultSelectedKeys={[this.state.menu[this.state.default_index].id]}
                            mode="inline"
                            theme="dark"
                            >
                            {menu}
                        </Menu>
                    </div>
                </div>
                <div id='route' className={`${run} routes`}>
                    <div className='icons'><ICON_CODE  className={`svgs ${fly}`} style={{color:this.state.menu[this.state.default_index].icon_color}} onClick={this.air_fly.bind(this,true)} type='iconchilun' /></div>
                    <div className='content'  style={{backgroundColor:this.state.menu[this.state.default_index].bg_color}}  onClick={this.air_fly.bind(this,false)}>
                        {renderRoutes(this.state.route)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
