/**
 * Created by yangmutong on 2016/12/15.
 */
var Mock = require('mockjs');
var Qs = require('qs');

var reviewList = {
    'errno': 0,
    'errmsg': 'success',
    'data': {
        'page|+1': 1,
        'pageSize': 10,
        'total': 100,
        'list|1-10': [{
            'applyTime': '@datetime("T")',
            'applyUserName|3': '姓',
            'department': '天大',
            'startTime': '@datetime("T")',
            'endTime': '@datetime("T")',
            'type|1-7': 1,
            'status|1-4': 1,
            'reason|4': '原因',
            'reviewer': '李明翰',
            'id|+10': 12,
            'reviewReason|5': '审核原因',
            'reviewTime': '@datetime("T")'
        }]
    }
};


var success = {
    'errno': 0,
    'errmsg': 'success'
};

var applyList = {
    'errno': 0,
    'errmsg': 'success',
    'data': {
        'page|+1': 1,
        'pageSize': 10,
        'total': 100,
        'list|1-30': [{
            'applyTime': '@datetime("T")',
            'applyUserName|3': '姓',
            'department': '天大',
            'startTime': '@datetime("T")',
            'endTime': '@datetime("T")',
            'type|1-7': 1,
            'status|1-4': 1,
            'reason|4': '原因',
            'reviewer': '李明翰',
            'id|+10': 12,
            'reviewReason': '驳回原因',
            'reviewTime': 1480746460
        }]
    }
};

var info = {
    'errno': 0,
    'errmsg': 'success',
    'data': {
        'annualTotal': '@integer(2, 12)',
        'annualLeft': '@integer(0, 10)',
        'department': '天大',
        'reviewer': '李明翰',
        'name': '杨牧童'
    }
};


module.exports = {
    'POST /leave/apply/draftList': function (req, res) {
        res.json(Mock.mock(applyList));
    },
    'POST /leave/apply/publishList': function (req, res) {
        res.json(Mock.mock(applyList));
    },
    'POST /leave/review/todoList': function (req, res) {
        res.json(Mock.mock(reviewList));
    },
    'POST /leave/review/doneList': function (req, res) {
        res.json(Mock.mock(reviewList));
    },
    'POST /leave/review/action': function (req, res) {
        res.json(Mock.mock(success));
    },
    'POST /leave/auth/login': function (req, res) {
        var tmp = Object.assign({}, success, {
            'data': {
                'username|+3': 111213
            }
        });
        res.json(Mock.mock(tmp));
    },
    'POST /leave/auth/logout': function (req, res) {
        res.json(Mock.mock(success));
    },
    'POST /leave/apply/add': function (req, res) {
        res.json(Mock.mock(success));
    },
    'POST /leave/apply/modify': function (req, res) {
        res.json(Mock.mock(success));
    },
    'POST /leave/apply/info': function (req, res) {
        res.json(Mock.mock(info))
    },
    'POST /leave/apply/delete': function (req, res) {
        res.json(Mock.mock(success));
    },
    'POST /leave/review/action': function (req, res) {
        res.json(Mock.mock(success));
    }
};