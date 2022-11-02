# 浏览器原理-http/https、TCP/IP 协议

**Http/Https**

- 常见的 Request Headers

1. Accept：浏览器可接收的数据格式；
2. Accept-Encoding：浏览器可接收的压缩算法（gzip）；
3. Accept-Language：浏览器可接收的语言（zh-CN）；
4. Connection：keep-alive 一次 TCP 连接重复使用；
5. cookie：存于浏览器中的文本数据；
6. Host：域名；
7. User-Agent：浏览器信息；
8. Content-type：发送的数据格式；
9. If-Modified-since：资源最后修改时间；
10. If-None-Match：资源唯一标识符；

- 常见的 Response Headers

1. Content-type：返回数据的格式；
2. Content-length： 返回数据的大小，多少字节；
3. Content-Encoding：返回数据的压缩算法；
4. Set-Cookie：服务端通过它修改 cookie；
5. Cache-Control：缓存控制（max-age，no-cache，no-store）；
6. ETag：资源唯一标识符；
7. Last-Modified：资源最后修改时间；

- Http 的无状态是指: 协议对于事务处理没有记忆，后续处理需要前面的信息，则必须重传。

- readyState 状态码 / Http 状态码

```js
// readyState
// 0: 请求未初始化(new XMLHttpRequest() 实例化完成)
// 1: 服务器连接已建立(open() 已完成)
// 2: 请求已接收(send() 已完成)
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪

// status
// 1xx：服务器收到请求
// 2xx：成功处理请求
// 3xx：需要重定向
// 4xx：客户端错误
// 5xx：服务端错误

// 301：永久重定向，浏览器跳转至新地址
// 302：临时重定向，浏览器跳转至新地址
// 304：资源未改变，自从上次请求后，请求的网页未修改过。
// 401：请求要求身份验证。
// 403：服务器拒绝请求。
// 404：服务器找不到请求的网页。
// 500：服务器遇到错误，无法完成请求。
// 502：服务器作为网关或代理，从上游服务器收到无效响应。
// 503：服务器临时过载或宕机。
// 504：网关超时。
```

- http 协议发展史：

```js
// http 0.9：无 header 信息，请求结束立即关闭 TCP 通道，只有 Get 命令;
// http 1.0：增加 status/code/header 及多个命令(post/put/delete)，支持多字符集发送和缓存等功能;
// http 1.1：实现持久连接，支持长链接，增加 host/cache-control 字段，提出管线化理论;
// http 2.0：通过分帧进行二进制传输(http 1.x 文本传输)，实现多路复用，头信息压缩，服务端推送;
```

- https（http + SSL/TLS）：

1. 服务端拥有用于非对称加密的公钥 A、私钥 A’;
2. 浏览器向服务器请求，服务器把数字证书和公钥 A 明文给传输浏览器;
3. 浏览器随机生成一个用于对称加密的密钥 X，用公钥 A 加密后传给服务器;
4. 服务器拿到后用私钥 A’ 解密得到密钥 X;
5. 至此双方都有密钥 X, 之后双方传输的数据都通过该密钥加密/解密即可;
6. 数字证书是为了预防中间人攻击，即掉包公钥 A;

*https://zhuanlan.zhihu.com/p/43789231*

**TCP/IP & UDP**

- TCP/IP 协议是一个协议簇，里面包括很多协议，UDP 只是其中的一个。

- UDP 协议：

1. 无需建立连接、面向报文(尽力交付、不保证可靠);
2. 传输速率一般只受网络带宽、主机性能决定;
3. 可实现一对一，一对多，多对一，多对多的交互通信;
4. 头部很短(8 字节);
5. 消耗系统资源少;

- TCP 协议:

1. 面向连接;
2. 只能一对一进行通信;
3. 字节流模式;
4. TCP 保证数据正确性，UDP 可能丢包，TCP 保证数据顺序，UDP 不保证。
5. 头部较长(20 字节);
6. 消耗系统资源多;

- 三次握手:

1. 客户端 → 服务端: SYN = 1, seq = x;
2. 服务端 → 客户端: SYN = 1, ACK = 1, seq = y, ack = x + 1;
3. 客户端 → 服务端: ACK = 1, seq = x + 1, ack = y + 1;
4. 连接通道已建立，服务端开始向客户端传输数据;

- 四次挥手:

1. 客户端 → 服务端: FIN = 1, seq = u;
2. 服务端 → 客户端: ACK = 1, seq = v, ack = u + 1;
3. 服务端 → 客户端: FIN = 1, ACK = 1, seq = w, ack = u + 1;
4. 客户端 → 服务端: ACK = 1, seq = u + 1, ack = w + 1;
5. 连接关闭;

*https://zhuanlan.zhihu.com/p/86426969*
