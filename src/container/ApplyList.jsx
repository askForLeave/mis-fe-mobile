import React, {Component} from 'react';
import {List, Accordion, Tabs, Button, Flex, Pagination, WhiteSpace, Icon} from 'antd-mobile';
import moment from 'moment';
import fetch from '../common/fetch';
const Item = List.Item;
export default class ApplyList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize: 20,
            total: 0,
            list: [],
            key: 'draft'
        }
    }

    getData(key, page, pageSize) {
        const {info} = this.props;
        const that = this;
        fetch(`/leave/apply/${key}List`, {
            data: {
                page,
                pageSize,
                username: info.username
            }
        }).then((res) => {
            if (!res.errno) {
                this.setState(Object.assign({}, this.state, res));
            }
        });
    }

    componentWillMount() {
        const {info} = this.props;
        this.getData('draft', 1, 20);
    }

    handleTabChange(key) {
        this.getData(key, 1, 20);
        this.setState({
            key: key
        });
    }

    handlePageChange(e) {
        this.getData(this.state.key, e + 1, 20);
    }
    handleEdit(id) {
        console.log(id);
    }
    handleDelete(id) {
        console.log(id);
        fetch('/leave/apply/delete', {
            data: {
                id: id
            }
        }).then(res => {
            if (!res) {
                this.getData(this.state.key, 1, 20);
            }
        });
    }

    render() {
        const {info} = this.props;
        const accordList = this.state.list.map((value, index) => {
            return (
                <Accordion.Panel header={'申请时间' + moment(parseInt(value.applyTime)).format('YYYY-MM-DD')} key={index}>
                    <List>
                        <Item>申请时间：{moment(parseInt(value.applyTime)).format('YYYY-MM-DD')}</Item>
                        <Item>申请人员：{value.applyUserName}</Item>
                        <Item>所属部门：{value.department}</Item>
                        <Item>开始时间：{moment(parseInt(value.startTime)).format('YYYY-MM-DD HH:mm:ss')}</Item>
                        <Item>结束时间：{moment(parseInt(value.endTime)).format('YYYY-MM-DD HH:mm:ss')}</Item>
                        <Item>请假类型：{info.type[value.type].name}</Item>
                        <Item>当前状态：{info.status[value.status]}</Item>
                        <Item>请假原因：{value.reason}</Item>
                        <Item>审核人员：{value.reviewer}</Item>
                        <Item>
                            <Flex justify="around">
                                <Flex.Item>
                                    <Button onClick={() => this.handleEdit(value.id)} type="primary" >编辑</Button>
                                </Flex.Item>
                                <Flex.Item>
                                    <Button onClick={() => this.handleDelete(value.id)} type="warning">删除</Button>
                                </Flex.Item>
                            </Flex>
                        </Item>
                    </List>
                </Accordion.Panel>
            );
        });
        const publishList = this.state.list.map((value, index) => {
            return (
                <Accordion.Panel header={'申请时间' + moment(parseInt(value.applyTime)).format('YYYY-MM-DD')} key={index}>
                    <List>
                        <Item>申请时间：{moment(parseInt(value.applyTime)).format('YYYY-MM-DD')}</Item>
                        <Item>申请人员：{value.applyUserName}</Item>
                        <Item>所属部门：{value.department}</Item>
                        <Item>开始时间：{moment(parseInt(value.startTime)).format('YYYY-MM-DD HH:mm:ss')}</Item>
                        <Item>结束时间：{moment(parseInt(value.endTime)).format('YYYY-MM-DD HH:mm:ss')}</Item>
                        <Item>请假类型：{info.type[value.type].name}</Item>
                        <Item>当前状态：{info.status[value.status]}</Item>
                        <Item>请假原因：{value.reason}</Item>
                        <Item>审核人员：{value.reviewer}</Item>
                        <Item>审核原因：{value.reviewReason}</Item>
                        <Item>审核时间：{moment(parseInt(value.reviewTime)).format('YYYY-MM-DD HH:mm:ss')}</Item>
                    </List>
                </Accordion.Panel>
            );
        });
        const pageProps = {
            total: this.state.total,
            current: this.state.page - 1,
            prevText: (<Icon type="left" />),
            nextText: (<Icon type="right" />),
            onChange: (e) => this.handlePageChange(e)
        };
        return (
            <div className="leave-apply">
                <Tabs defaultActiveKey="draft" onChange={key => this.handleTabChange(key)}>
                    <Tabs.TabPane tab="草稿箱" key="draft">
                        <Accordion>
                            {accordList}
                        </Accordion>
                        <WhiteSpace/>
                        <Pagination {...pageProps}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="已提交" key="publish">
                        <Accordion>
                            {publishList}
                        </Accordion>
                        <WhiteSpace/>
                        <Pagination {...pageProps}/>
                    </Tabs.TabPane>
                </Tabs>

            </div>
        );
    }
}