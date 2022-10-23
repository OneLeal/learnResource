/**
 * 使用 node.js 写一个 GET 请求和一个 POST 请求
 */
const http = require('http');
const queryString = require ('querystring');
const server = http.createServer((request, responce) => {
    const { method, url } = request;
    const dataUrl = url.split('?');
    const path = dataUrl[0];
    const query = queryString.parse(dataUrl[1]);
    responce.setHeader('Content-Type', 'application/json'); // 设置数据返回的格式
    
    const data = { method, path, query, url };
    if (method === 'GET') {
        responce.end(JSON.stringify(data));
    }

    if (method === 'POST') {
        let postData = '';
        request.on('data', chunk => postData += chunk.toString());
        request.on('end', () => {
            data['postData'] = postData;
            responce.end(JSON.stringify(postData));
        });
    }
}).listen(8000);
console.log('OK');