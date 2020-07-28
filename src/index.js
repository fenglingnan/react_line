import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/common.scss'
import {routeConfig} from './router/router'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from 'react-router-config'

ReactDOM.render(
  <Router basename={process.env.REACT_APP_BASE_URL}>
    <Suspense fallback={<div></div>}>
      {renderRoutes(routeConfig)}
    </Suspense>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
