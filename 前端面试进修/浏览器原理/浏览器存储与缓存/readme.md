# 浏览器原理-存储与缓存

**cookie 与 session**

- cookie 通过 document.cookie 访问/设置，没有可用的 api;
- 容量 4KB;
- 伴随 http 发送到服务端，增加请求数据量;
- 有一定的时效性;
- session 是由 cookie 辅助而实现的一种机制，即能帮助后台识别发出请求的用户身份;

**localStorage & sessionStorage**

- HTML5 新增特性;
- 容量 5M 甚至更多;
- 不伴随 http 发送到服务端;
- 有 API(getItem/setItem/removeItem);
- localStorage 可实现本地永久性存储，多 tab 页面可共用;
- sessionStorage 只存在于当前的会话窗口;

**强制缓存**

- 利用 Response Headers 中的 Expires(http 1.0) or Cache-Control(http 1.1) 字段来控制;
- Cache-Control 的值: max-age | no-cache | no-store | public | private;
- Cache-Control: max-age=3600 资源的有效期是 3600 秒;
- Cache-Control: no-cache 不使用本地缓存;
- Cache-Control: no-store 直接禁止浏览器缓存数据;
- Cache-Control: public 可以被所有用户缓存，包括终端用户和 cdn 等中间件代理服务器;
- Cache-Control: private 只能被终端用户的浏览器缓存;
- http 状态码返回 200;

**协商缓存**

- Last-Modified/If-Modified-Since or Etag/If-None-Match(资源最后修改时间 or 资源唯一标识符);
- http 状态码返回 304;

**为什么需要 Etag**

- 一些文件也许会周期性的更改，但是内容并不改变，不希望客户端认为这个文件被修改了;
- 某些文件修改非常频繁，比如在秒以下的时间内进行修改(If-Modified-Since 能检查到的粒度是秒级的);
- 某些服务器不能精确的得到文件的最后修改时间;

**优先级：Cache-Control > expires > Etag > Last-Modified**

*https://zhuanlan.zhihu.com/p/111190645*
