import React, { Component } from 'react';
import style from '../style/Index.module.scss'

class Index extends Component {
    render() {
        return (
            <div className={`${style.cont}`}>
                <canvas id='running'></canvas>
            </div>
        );
    }
}

export default Index;
