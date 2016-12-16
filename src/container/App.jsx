import React, {Component} from 'react';
import {Link} from 'react-router';
import NavBar from 'antd-mobile/lib/nav-bar';
import Icon from 'antd-mobile/lib/icon';
import Drawer from 'antd-mobile/lib/drawer';
import Menu from 'antd-mobile/lib/menu';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            title: {
                'index': '首页',
                'apply': '申请列表',
                'review': '审核列表',
                'help': '帮助文档'
            }
        };
    }

    handleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleMenuChange(value) {
        const {router} = this.props;
        this.setState({
            isOpen: !this.state.isOpen
        });
        router.push(value[0] || 'index');
    }
    render() {
        const {children, router, location} = this.props;
        const navProps = {
            iconName: 'bars',
            onLeftClick: () => this.handleOpen(),
            mode: 'light'
        };
        const menuData = [
            {
                label: '请假申请列表',
                value: 'apply'
            },
            {
                label: '请假审核列表',
                value: 'review'
            },
            {
                label: '帮助',
                value: 'help'
            },
            {
                label: '登出',
                value: 'logout'
            }
        ];
        const menuProps = {
            data: menuData,
            level: 1,
            onChange: (value) => this.handleMenuChange(value),
            height: Math.round(document.documentElement.clientHeight / 3)
        };
        const side = <Menu {...menuProps}/>;
        const drawProps = {
            sidebar: side,
            open: this.state.isOpen,
            onOpenChange: () => this.handleOpen()
        };
        let title = this.state.title[location.pathname.substring(1)];
        return (
            <div className="leave-container" style={{ height: '100%', backgroundColor: '#ffffff' }}>
                <NavBar {...navProps}>{ title || '请假系统'}</NavBar>
                <Drawer {...drawProps} sidebarStyle={{width: '50%'}} className="leave-drawer">
                    {children && React.cloneElement(children, {
                        test: 'jfndgjndg'
                    })}
                </Drawer>
            </div>
        );
    }
}