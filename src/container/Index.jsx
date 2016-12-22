import React, {Component} from 'react';
import {WhiteSpace, List} from 'antd-mobile';

const Item = List.Item;

export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {info} = this.props;
        return (
            <div className="leave-index">
                <WhiteSpace size="lg" />
                <List>
                    <Item>人员姓名：{info.name}</Item>
                    <Item>员工ID：{info.username}</Item>
                    <Item>年假总量：{info.annualTotal}</Item>
                    <Item>年假剩余：{info.annualLeft}</Item>
                    <Item>所属部门：{info.department}</Item>
                    <Item>上级主管：{info.manager}</Item>
                </List>
            </div>
        );
    }
}