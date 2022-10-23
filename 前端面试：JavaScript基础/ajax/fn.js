/*
 * 函数getOrDestroy参数说明：
 * 1.flag 功能选择位：flag == 0（或为false）销毁cookie；flag == 1（或为true）获取cookie值；
 * 2.name cookie名：函数根据name进行搜索，搜索成功之后根据flag进行获取cookie值或销毁cookie。
 */
function getOrDestroy(name, flag) {
  let arr = document.cookie.split(";");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(name) != -1) {
      if (flag) {
        return arr[i].split("=")[1];
      } else {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  }
}

/*
 * 函数createCookie参数说明：
 * 创建一个cookie：
 * name：cookie名；
 * val：cookie值；
 * type：cookie生存时间类型；
 * num：cookie的生存时间值；
 */
function createCookie(name, val, type, num) {
  let setTime = new Date();
  switch (type) {
    case "sec":
      setTime.setSeconds(setTime.getSeconds() + num);
      break; //设置秒
    case "min":
      setTime.setMinutes(setTime.getMinutes() + num);
      break; //设置分
    case "hour":
      setTime.setHours(setTime.getHours() + num);
      break; //设置时
    case "day":
      setTime.setDate(setTime.getDate() + num);
      break; //设置日
    case "month":
      setTime.setMonth(setTime.getMonth() + num);
      break; //设置月
    case "year":
      setTime.setFullYear(setTime.getFullYear() + num);
      break; //设置年
    default:
      break;
  }
  document.cookie = name + "=" + val + "; expires=" + setTime.toGMTString();
}

function sendRequest(type, url, async = true, params) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url, async);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject();
        }
      }
    };

    if (params && type === "POST") {
      params = JSON.stringify(params);
      xhr.send(params);
    } else {
      xhr.send();
    }
  });
}

function bindEvent(type, elem, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }

  elem.addEventListener(type, (e) => {
    const target = e.target;
    if (selector) {
      if (target.matches(selector)) {
        fn.call(target, e);
      }
    } else {
      fn.call(target, e);
    }
  });
}

function setInnerText(elem, str) {
  if (elem.innerText === "") {
    elem.innerText = str;
  }
}

/*
 * 关于 methods
 * 1. 传统的 methods：
 * 1.1 get 获取数据；
 * 1.2 post 提交数据；
 *
 * 2. 现代的 methods：
 * 2.1 get 获取数据；
 * 2.2 post 新建数据；
 * 2.3 put/patch 更新数据；
 * 2.4 delete 删除数据；
 * 2.5 head 获得报文头部；
 *
 * Restful API：
 * 1. 一种 API 设计方法；
 * 2. 传统 API 设计：把每个 url 当做一个功能；
 * 3. Restful API 设计：把每个 url 当做一个唯一的资源（不使用参数，用 method 表示操作类型）；
 *
 * 常见的 http headers
 * Request Headers：
 * 1. Accept：浏览器可接收的数据格式；
 * 2. Accept-Encoding：浏览器可接收的压缩算法（gzip）；
 * 3. Accept-Language：浏览器可接收的语言（zh-CN）；
 * 4. Connection：keep-alive 一次 TCP 连接重复使用；
 * 5. cookie：存于浏览器中的文本数据；
 * 6. Host：域名；
 * 7. User-Agent：浏览器信息；
 * 8. Content-type：发送的数据格式；
 * 9. If-Modified-since：资源最后修改时间；
 * 10. If-None-Match：资源唯一标识符；
 *
 * Response Headers：
 * 1. Content-type：返回数据的格式；
 * 2. Content-length： 返回数据的大小，多少字节；
 * 3. Content-Encoding：返回数据的压缩算法；
 * 4. Set-Cookie：服务端通过它修改 cookie；
 * 5. Cache-Control：缓存控制（max-age，no-cache，no-store）；
 * 6. ETag：资源唯一标识符；
 * 7. Last-Modified：资源最后修改时间；
 *
 * 浏览器缓存：
 * 可以缓存的资源——静态资源（js/css/img）
 * 强制缓存：使用 Cache-Control 控制，浏览器判断它是否过期
 * （max-age 缓存时间、no-cache 不使用本地缓存 no-store 本地与服务端都不用 private 终端 public 中间路由）
 * 协商缓存：
 * 1. 返回的资源携带资源标识（响应头里的 ETag、Last-Modified）；
 * 2. 服务端判断（请求头携带的资源标识 If-None-Match、If-Modified-since）资源是否过期；
 * 3. 两者同时存在优先使用 ETag，Last-Modified 单位为秒，不精确；
 * */
