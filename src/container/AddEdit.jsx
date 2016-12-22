import React, {Component} from 'react';
import {createForm} from 'rc-form';
import {DatePicker, List, Flex, Button, Toast, InputItem, Picker} from 'antd-mobile';
import moment from 'moment';
import _ from 'underscore';
import 'moment/locale/zh-cn';
import fetch from '../common/fetch';

class AddEdit extends Component {
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
        const {form, edit} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const data = {
                    username: edit.info.username,
                    startTime: values.start.unix(),
                    endTime: values.start.unix(),
                    type: 10,
                    reason: values.reason,
                    submitStatus
                };
                this.state.type === 'modify' ? data.id = edit.list[this.state.index].id : console.log('add');
                fetch('/leave/apply/' + this.state.type, {
                    data: data
                }).then((res) => {
                    if (!res) {
                        this.showSuccess('更新成功');
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
        let initialValues = {};
        if (edit.type === 'add') {
            initialValues = {
                type: ['1'],
                start: moment(),
                reason: ''
            };
        } else {
            initialValues = {
                type: ['' + edit.list[this.state.index].type],
                start: moment.unix(parseInt(edit.list[this.state.index].startTime)),
                reason: edit.list[this.state.index].reason,
            };
        }
        return (
            <div className="leave-edit">
                <List {...listProps}>
                    <DatePicker
                        {...startDateProps}
                        {...getFieldProps('start', {
                            rules: [{required: true}],
                            initialValue: initialValues.start
                        })}>
                        <List.Item arrow="horizontal">加班日期</List.Item>
                    </DatePicker>
                    <InputItem
                        {...getFieldProps('reason', {
                            rules: [{required: true}],
                            initialValue: initialValues.reason
                        })}
                        placeholder="输入加班原因"
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

AddEdit = createForm()(AddEdit);
export default AddEdit;