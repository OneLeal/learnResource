const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
    const html = fs.readFileSync('index.html', 'utf-8');

    // content-type 的值为 text/plain 时返回的是字符串
    // response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
}).listen(8000);
console.log('node success');