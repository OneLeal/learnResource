/**
 * CORS 允许的方法：GET HEAD POST
 * CORS 允许的 Content-Type: 
 * 1. text/plain 
 * 2. multipart/form-data 
 * 3. application/x-www-form-urlencoded
 * 
 * 除以上方式，需要进行预请求(以下示例测试了自定义请求头 X-Test-Cors)
 */

const http = require('http');
http.createServer(function(request, response) {
    // 避免浏览器因同源策略而拦截请求结果
    // response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
    // response.writeHead(200, { 'Access-Control-Allow-Origin': '127.0.0.1:8000' });

    // CORS 预请求，突破限制
    response.writeHead(200, 
        { 
            'Access-Control-Allow-Origin': 'http://192.168.0.129:8000',
            'Access-Control-Allow-Headers': 'X-Test-Cors',
            'Access-Control-Allow-Methods': 'PUT, DELETE',
            'Access-Control-Max-Age': '10'
        }
    );
    response.end('779965');
}).listen(8001);