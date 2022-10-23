# 浏览器原理-其他

**认识在浏览器运行态下的 JS**

- 浏览器运行态包含三个方面: BOM、DOM、ECMAScript
- ECMAScript - 基础逻辑运算、数据处理
- DOM - 对于浏览器视窗内 dom 元素的相应操作
- BOM - 对于浏览器本身的处理(location/navigator/screen)

**从 url 输入到页面展示发生了什么 - 获取到资源 => 渲染出页面**

1. DNS 解析：域名 → IP 地址；
2. 浏览器根据 IP 地址向服务器发起 http 请求；
3. 服务器处理 http 请求，并将请求结果返回给浏览器；
4. 根据 html 生成 DOM 树；
5. 根据 css 生成 css 对象模型；
6. cssOM 和 DOM 树整合成 Render Tree；
7. 浏览器根据 Render Tree 渲染页面(Layout module 和 Paint module 的工作内容)；
8. 渲染过程中遇到 script 标签，优先加载 js 代码，完成后再继续渲染；

- Layout module: 计算 Render Tree 上每个节点的状态和位置信息;
- Paint module: 对节点进行绘制;

**浏览器(一个 tab 页)中的线程(webAPI)**

- GUI 渲染引擎: 与 JS 引擎互斥，任务队列空闲时才执行
- JS 引擎: 执行脚本，处理及分配执行/待执行事件，阻塞 GUI 引擎
- 定时器触发引擎: 定时任务的处理，接收 JS 引擎分配的定时任务与计数，处理完成后交由 EVENT 引擎触发
- HTTP 请求: 异步执行请求处理，接收 JS 引擎分配的 HTTP 请求，监听回调并交由 EVENT 引擎触发
- EVENT 引擎: 接收定时任务、异步请求、用户操作等事件并将回调任务 push 任务队列，最后把执行权交还给 JS 引擎

**URL & URI**

- URI：Uniform Resource Identifier 统一资源标识符
- 用来标示 一个具体的资源的，我们可以通过 URI 知道一个资源是什么。

- URL：Uniform Resource Location 统一资源定位符
- 用来定位具体的资源的，标示了一个具体的资源位置。互联网上的每个文件都有一个唯一的 URL。

**xss 跨站脚本攻击**

- 原理: 注入了原本网页中不存在的代码并执行
- 预防:
  1. 输入长度限制;
  2. 对 script 标签进行过滤;
  3. 替换特殊字符（转码），例："<" → &lt; ">" → &gt;

**CSRF 跨站请求伪造**

- 原理: 核心是利用用户的 cookie 去骗取服务端的信任(已登陆过某网站)，而后成功请求接口
- 预防:
  1. 请求头中的 Referer 字段记录了请求来源，验证它是否合法;
  2. 请求接口时携带参数 token;
  3. 双重 cookie 验证(url 上和请求时的 cookie 中都携带同一个字段值);
