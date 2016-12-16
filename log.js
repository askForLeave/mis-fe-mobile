/**
 * Created by yangmutong on 2016/12/16.
 */
import React, {Component} from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import ReactDOM from 'react-dom';

class Log extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                测试log
            </div>
        );
    }
}

ReactDOM.render(<Log/>, document.getElementById('root'));