/**
 * http 协议发展史：
 * http 0.9：无 header 信息，请求结束立即关闭 TCP 通道，只有 Get 命令；
 * http 1.0：增加 status code、header，及多个命令(post put delete)，支持多字符集发送和缓存等功能；
 * http 1.1：实现持久连接(pipeling)，支持长链接，增加 host 及其他一些命令；
 * http 2.0：通过分帧进行二进制传输(http 1.x 文本传输)，实现多路复用，头信息压缩，服务端推送；
 */

/**
 * TCP/UDP 协议
 */

/**
 * TCP 三次握手
 * 1. 客户端发送数据包 SYN = 1, seq = X;
 * 2. 服务端发送数据包 SYN = 1, ACK = X + 1, Seq = Y;
 * 3. 客户端发送数据包 ACK = Y + 1, Seq = Z;
 */

/**
 * URI/URL/URN
 * URI: 统一资源标志符，包含 URL 和 URN，标识网络上某一信息资源；
 * URL: 统一资源定位器，决定以何种协议、域名、端口、搜索参数去访问资源；
 * URN: 永久统一资源定位符，资源移动之后仍然能被找到；
 */

/**
 * http 报文格式：
 * 请求报文：
 * 1. 首行 method、请求地址、协议版本
 * 2. 请求头信息(Accept...)
 * 
 * 响应报文：
 * 1. 首行: 协议版本、状态码
 * 2. 响应头信息(Content-type...)
 * 3. 主体：响应数据
 */

// 一个简单的 node 服务
const http = require('http');
http.createServer(function (request, response) {
    console.log('request info: ', request.url);
    const data = { code: '200', list: ['JavaScript', 'Vue', 'React'] };
    response.end(JSON.stringify(data));
}).listen(3000);
console.log('Request has completed!');