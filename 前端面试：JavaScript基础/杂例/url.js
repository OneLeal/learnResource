// 查询 url 参数
function searchUrlParams(name) {
    const search = location.search;
    const params = new URLSearchParams(search);
    return params.get(name);
}

// 将 url 参数转为对象
const url = 'www.imooc.com?name=James&id=779965&hobby=girls';
function paramsToObject(url) {
    const obj = {};
    const params = url.split('?')[1].split('&');
    params.forEach(item => {
        const group = item.split('=');
        obj[group[0]] = group[1];
    });
    return obj;
}

let getParamsGroup = paramsToObject(url);
console.log(getParamsGroup);
