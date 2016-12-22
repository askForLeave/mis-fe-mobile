import React, {Component} from 'react';
import {createForm} from 'rc-form';
import {DatePicker, List, Flex, Button, Toast, InputItem, Picker} from 'antd-mobile';
import moment from 'moment';
import _ from 'underscore';
import 'moment/locale/zh-cn';
import fetch from '../common/fetch';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.params.index || 'add',
            type: props.edit.type || 'add'
        };
    }
    showError(msg) {
        Toast.fail(msg);
    }
    showSuccess(msg) {
        Toast.success(msg);
    }

    handleSubmit(submitStatus) {
        const {form, edit, router} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const data = {
                    username: edit.info.username,
                    startTime: values.start.unix(),
                    endTime: values.end.unix(),
                    type: values.type,
                    reason: values.reason,
                    submitStatus
                };
                this.state.type === 'modify' ? data.id = edit.list[this.state.index].id : console.log('add');
                fetch('/leave/apply/' + this.state.type, {
                    data: data
                }).then((res) => {
                    if (!res) {
                        this.showSuccess('更新成功');
                        router.push('/apply');
                    }
                })
            } else {
                this.showError('请将请假信息填写完整');
            }
        });
    }

    render() {
        const {edit} = this.props;
        const {getFieldProps} = this.props.form;
        const listProps = {
            renderHeader: () => '编辑'
        };
        const startDateProps = {
            minDate: moment(),
            mode: 'date'
        };
        const endDateProps = {
            minDate: moment().add(7, 'day'),
            mode: 'date'
        };
        const types = _.map(edit.info.type, function (value, key) {
            return {
                value: key,
                label: value.name
            };
        }).filter((value) => {
            return value.value != 10
        });
        let initialValues = {};
        if (edit.type === 'add') {
            initialValues = {
                type: ['1'],
                start: moment(),
                end: moment(),
                reason: ''
            };
        } else {
            initialValues = {
                type: ['' + edit.list[this.state.index].type],
                start: moment.unix(parseInt(edit.list[this.state.index].startTime)),
                end: moment.unix(parseInt(edit.list[this.state.index].endTime)),
                reason: edit.list[this.state.index].reason,
            };
        }
        return (
            <div className="leave-edit">
                <List {...listProps}>
                    <Picker data={types} cols="1" {...getFieldProps('type', {
                        rules: [{required: true}],
                        initialValue: initialValues.type
                    })}>
                        <List.Item arrow="horizontal">选择假期类型</List.Item>
                    </Picker>
                    <DatePicker
                        {...startDateProps}
                        {...getFieldProps('start', {
                            rules: [{required: true}],
                            initialValue: initialValues.start
                    })}>
                        <List.Item arrow="horizontal">开始日期</List.Item>
                    </DatePicker>
                    <DatePicker
                        {...endDateProps}
                        {...getFieldProps('end', {
                            rules: [{required: true}],
                            initialValue: initialValues.end
                        })}>
                        <List.Item arrow="horizontal">结束日期</List.Item>
                    </DatePicker>
                    <InputItem
                        {...getFieldProps('reason', {
                            rules: [{required: true}],
                            initialValue: initialValues.reason
                        })}
                        placeholder="输入请假原因"
                    >请假原因</InputItem>
                    <List.Item>
                        <Flex justify="around">
                            <Flex.Item>
                                <Button onClick={() => this.handleSubmit(1)} type="primary" >提交草稿</Button>
                            </Flex.Item>
                            <Flex.Item>
                                <Button onClick={() => this.handleSubmit(2)} type="warning">提交审核</Button>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                </List>
            </div>
        );
    }
}

Edit = createForm()(Edit);
export default Edit;