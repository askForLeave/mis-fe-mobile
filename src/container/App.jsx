import React, {Component} from 'react';
import {NavBar, Toast, Icon, Drawer, Button, Menu, WhiteSpace, WingBlank} from 'antd-mobile';

import fetch from '../common/fetch';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            title: {
                'index': '首页',
                'apply': '申请列表',
                'review': '审核列表',
                'help': '帮助文档',
                'add': '加班列表'
            },
            info: {
                annualTotal: 0,
                annualLeft: 0,
                department: '',
                manager: '',
                name: '',
                username: location.search.substring(1).split('=')[1],
                type: {
                    '1': {
                        name: '年假',
                        description: '员工每年可享受12天的带薪年假'
                    },
                    '2': {
                        name: '婚假',
                        description: '婚假为带薪假，正式员工（女满20 岁；男满22岁）享有10个工作日婚假。婚假须在领取结婚证的六个月内享用。'
                    },
                    '3': {
                        name: '产假/陪产假',
                        description: '女性员工生育且符合国家计划生育政策的，享有产假，产假包括：生育产假、流产假、产前检查、哺乳时间，有配偶生育情形的男性员工可享受陪产假。'
                    },
                    '4': {
                        name: '病假',
                        description: '病假以半天为单位计算，不足4小时按半天计。病假年度累计5天以内（含5天），每日扣30%日薪；病假年度累计5天以上、不超过30天（含30天），每日扣50%日薪；病假年度累计超过30天，每日扣80%日薪；如当月病假扣款后工资低于当地最低保障工资的，则按最低保障工资发放当月工资。病假解释如与当地劳动政策冲突，以当地劳动政策为准员工申请病假应向主管上级提交医疗保险指定医院开具的休假证明、病历或诊断证明原件并按照公司规定的流程逐级审批。公司对员工提交的病休证明有异议的，有权要求员工到指定医院复查，员工无正当理由拒绝复查的，公司不予批准病假申请。提供虚假病休证明的，未出勤期间为旷工。5天以下的病假需提前至少2天申请，按照公司要求履行审批手续，5天以上（含5天）需提前至少1周申请。因特殊原因不能提前请假的，应在休假当日上午与直接上级联系请假。口头请假的，应在事后一个工作日内补办请假手续，如5天以上病假，员工本人不能到公司履行请假手续的，可由其委托的直系亲属或紧急联系人代为提交书面休假申请和相关证明。'
                    },
                    '5': {
                        name: '丧假',
                        description: '员工因直系亲属（父母、配偶、子女、岳父母、公婆）丧亡者，可请丧假3个工作日。因祖父母、外祖父母丧亡者，可请丧假1个工作日'
                    },
                    '6': {
                        name: '公假',
                        description: '公假视为正常出勤，带薪'
                    },
                    '7': {
                        name: '事假',
                        description: '事假无薪'
                    },
                    '10': {
                        name: '加班',
                        description: '加班申请'
                    }
                },
                status: {
                    '1': '草稿',
                    '2': '待审核',
                    '3': '审核通过',
                    '4': '驳回'
                }
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
        if (value[0] && value[0] === 'logout') {
            fetch('/leave/auth/logout', {
                data: {
                    username: this.state.info.username
                }
            }).then(res => {
                if (!res) {
                    Toast.success("注销成功");
                    location.href = '/log/log.html';
                } else {
                    Toast.fail('注销失败');
                }
            })
        }
        router.push(value[0] || 'index');
    }
    componentWillMount() {
        const that = this;
        fetch('/leave/apply/info', {
            data: {
                username: this.state.info.username
            }
        }).then(res => {
            that.setState({
                info: Object.assign({}, that.state.info, res)
            });
        });
    }
    handleAdd() {
        const {router} = this.props;
        let path = location.hash.substring(2);
        if (path === 'apply') {
            router.push('/edit');
        } else if (path === 'add') {
            router.push('/addEdit');
        } else {
            Toast.fail('添加请进入加班或请假列表');
        }
    }

    render() {
        const {children, router, location} = this.props;
        const navProps = {
            iconName: 'bars',
            onLeftClick: () => this.handleOpen(),
            mode: 'light',
            rightContent: <Button inline size="small" onClick={() => this.handleAdd()} >+</Button>
        };
        const menuData = [
            {
                label: '首页',
                value: 'index'
            },
            {
                label: '请假申请列表',
                value: 'apply'
            },
            {
                label: '请假审核列表',
                value: 'review'
            },
            {
                label: '加班申请列表',
                value: 'add'
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
        let child = '';
        if (location.pathname.substring(1) === 'addEdit' || location.pathname.substring(1) === 'edit') {
            child = React.cloneElement(children, {
                edit: {
                    info: this.state.info,
                    type: 'add'
                }
            });
        } else {
            child = React.cloneElement(children, {
                info: this.state.info
            });
        }
        return (
            <div className="leave-container" style={{ height: '100%', backgroundColor: '#ffffff' }}>
                <NavBar {...navProps}>{ title || '请假系统'}</NavBar>
                <Drawer {...drawProps} sidebarStyle={{width: '50%'}} className="leave-drawer">
                    <WhiteSpace/>
                    <WingBlank>
                        {child}
                    </WingBlank>
                    <WhiteSpace/>
                </Drawer>
            </div>
        );
    }
}