import { param } from '../util';
import {Toast} from 'antd-mobile';
/**
 * fetch封装请求函数
 * @param  {function} dispatch redux的store的dispatch函数
 * @return {function}           返回一个
 */
export default (url = '', options) => {
    let defaultOptions = {
        method: 'POST',
        type: 'json',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin',
        data: {}
    };
    options = Object.assign(defaultOptions, options);
    switch (options.method) {
        case 'GET':
            url = url
            + (url.indexOf('?') > 0 ? '&' : '?')
            + param(options.data);
            delete options.data;
            break;
        case 'POST':
            options.body = param(options.data);
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            break;
        default:
    }
    return new Promise((outResolve, outReject) => {
        fetch(url, options)
            .then((req) => {
                return new Promise((resolve, reject) => {
                    if (req.status >= 200 & req.status <= 300 || req.status == 304) {
                        resolve(req);
                    }
                    else if (req.status == 404) {
                        reject('请求地址不存在');
                    }
                    else {
                        reject('网络错误');
                    }
                });
            })
            .then((req) => req.json())
            .then((json) => {
                return new Promise((resolve, reject) => {
                    if (json.errno == '0') {
                        resolve(json.data);
                    }
                    else {
                        // 返回错误处理
                        if (json.errno == 4) {
                            Toast.warning("当前状态未登录，正在带您去登录");
                            setTimeout(() => {
                                location.href = "/log/log.html"
                            }, 2000);
                        } else {
                            reject(json.errmsg);
                        }
                    }
                });
            })
            .then((data) => {
                outResolve(data);
            })
            .catch((error) => {
                Toast.fail(error);
            });
    });
};
