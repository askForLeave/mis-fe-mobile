// 将json转换为查询字符串
export default function param(data) { // 因为其他地方也要用到这个所以封装成函数
    var arr = [];
    for (let i in data) {
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    return arr.join('&');
}
