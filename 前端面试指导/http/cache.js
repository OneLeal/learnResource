/**
 * Cache-Control:
 * public 任何地方都能缓存
 * private 发起请求的浏览器才能缓存
 * no-cache 需要服务器允许才能使用缓存
 * no-store 不使用缓存
 * max-age 缓存时间(second)
 */

const http = require('http');
const fs = require('fs');
http.createServer(function(request, response) {
    const path = request.url;
    const html = fs.readFileSync('index.html', 'utf-8');
    if (path === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    }

    // 缓存测试(强制缓存，缓存在浏览器)：缓存 10s
    // if (path === '/cache.js') {
    //     response.writeHead(200, {
    //         'Content-Type': 'text/javascript',
    //         'Cache-Control': 'max-age=10'
    //     });
    //     response.end("console.log('use cache')");
    // }

    // 协商缓存，资源重定向 + 设置 cookie
    const opts = {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=125000, no-cache',
        'Last-Modified': '100',
        'Etag': '888',
        'Set-Cookie': ['technology=Vue; max-age=10', 'value=777']
    };
    if (path === '/cache.js') {
        const etag = request.headers['if-none-match'];
        if (etag === '888') {
            response.writeHead(304, opts);
            response.end();
        } else {
            response.writeHead(200, opts);
            response.end("console.log('use cache')");
        }
    }
}).listen(3000);