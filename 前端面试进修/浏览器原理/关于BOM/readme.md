# 浏览器原理-BOM

1. location 主要用于操作 url

- location.href 完整的 url 路径
- location.orgin 协议 + 域名
- location.protocol 协议
- location.host 域名
- location.port 端口号
- location.hash 哈希值
- location.search 所有参数
- location.pathname 域名之后的文件路径
- location.reload() 重载页面
- location.assign() 跳转到指定路径
- location.replace() 跳转到指定路径并替换历史记录

2. navigator 对象，主要用于获取当前用户的环境信息

- appVersion 版本信息
- language 使用语言
- userAgent 浏览器种类及内核，用于浏览器兼容性、上报信息

3. screen 可获取整个浏览器窗口大小值及可用值

- width / height: 浏览器窗口本身的宽高
- availWidth / availHeight: 浏览器实际的宽高(一般电脑底部有工具栏，所以 availHeight < height)

4. history

- state 返回一个表示历史堆栈顶部的状态值
- length 浏览器历史中的 url 数量
- onpopstate 每当激活同一文档中不同的历史记录条目时，popstate 事件就会在对应的 window 对象上触发
- go() 加载 history 列表中的某个具体页面
- back() 加载 history 列表中的前一个 url，等价于 go(-1)
- forward() 加载 history 列表中的下一个 url，等价于 go(1)
- pushState() HTML5 新增，将数据 push 进会话历史栈
- replaceState() HTML5 新增，更新 history 栈上最新的条目

5. 两种路由模式

- history:

  1. 通过 HTML5 新增的 pushState()/replaceState() 方法改变页面路径;
  2. 使用 pushState()/replaceState() 方法对历史记录进行修改不会刷新整个页面;
  3. 规范的 URL，有利于做页面推广;
  4. 为防止加载错误 URL 出现的 404 异常需要服务器配置重定向或前端配置 404 页面;

- hash:

  1. 通过监听浏览器的 onhashchange 事件查找路由变化，改变 location.hash 值;
  2. 不是规范的 URL，不于做页面推广;
  3. 后台无法感知 # 后面的内容(不包含在请求中);

*https://developer.mozilla.org/zh-CN/docs/Web/API/History*
