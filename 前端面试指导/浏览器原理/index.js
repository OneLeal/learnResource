/**
 * 一、浏览器存储：
 * cookie:
 * 通过 document.cookie 访问/设置，没有可用的 api；
 * 容量 4KB；
 * 伴随 http 发送到服务端，增加请求数据量；
 * 有一定的时效性；
 * 
 * localStorage:
 * H5 专门为存储而被设计出来，容量 5M；
 * 有 api: getItem/setItem；
 * 不伴随 http 发送到服务端；
 * 本地永久性存储；
 * 
 * sessionStorage:
 * H5 专门为存储而被设计出来，容量 5M；
 * 有 api: getItem/setItem；
 * 不伴随 http 发送到服务端；
 * 只存在于当前的会话窗口；
 * 
 * 二、cookie 与 session
 * cookie 是一个小型文本，保存在客户端；
 * session 是由 cookie 辅助而实现的一种机制，即能够识别发出请求的用户身份；
 * http 是无状态协议，服务端无法通过连接知晓发送请求的用户身份；
 * 当用户首次登陆淘宝进行购物时，服务端会为该用户生成一个 session 并配置一个 sessionID；
 * sessionID 经由 cookie 保存于浏览器中；
 * 当用户再次发起请求时，cookie 中所携带的 sessionID 将伴随请求发送到服务端；
 * 服务端凭借 sessionID 能查询到对应的 session 并确定用户身份；
 * 若 cookie 禁用，则通过重写 url/token 的方式实现会话；
 * 
 * 三、TCP/IP
 * 
 * 四、Http 与 Https
 * (1) 常见的请求头和响应头信息
 * (2) http 状态码
 * (3) http 各版本演化趋势
 * 
 * 五、强制缓存/协商缓存
 * 
 * 六、同源策略与跨域
 */