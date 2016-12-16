import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import routes from './src/routes/routes.jsx';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css';
ReactDOM.render(<Router history={hashHistory} routes={routes} />, document.getElementById('root'));
