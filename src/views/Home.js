import React, { Component } from 'react';
import styles from '../style/Home.module.scss';
import { renderRoutes } from 'react-router-config'
import {ICON_CODE} from '../common/ICON_FONT'

class Home extends Component {
    constructor(props){
        super(props)
    }
    state={
        open:false,
        route:this.props.route.routes
    }
    air_fly(status){
        this.setState({
            open:status
        })
    }
    render() {
        let run=this.state.open?'open':''
        let fly=this.state.open?'fly':'';
        return (
            <div className={`${styles.cont}`}>
                <div className='user'>
                    这里是黄色
                </div>
                <div className={`${run} routes`}>
                    <div className='icons'><ICON_CODE className={`${fly}`} onClick={this.air_fly.bind(this,true)} type='iconchilun' /></div>
                    <div className='content'   onClick={this.air_fly.bind(this,false)}>
                        {renderRoutes(this.state.route)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
