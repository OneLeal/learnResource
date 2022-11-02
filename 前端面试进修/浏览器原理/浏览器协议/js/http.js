/**
 * 封装一个 http 请求:
 * 1. 整理出需要传递的参数(method url params async timeout);
 * 2. 请求参数编码;
 * 3. get 请求时拼接 url;
 * 4. post 请求时设置请求头;
 * 5. 使用 promise;
 */
function requestHttp(opts) {
  const {
    method = "get",
    url = "",
    params = {},
    async = true,
    timeout = 30000,
  } = opts;

  const http = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    let arr = [];
    let sendData = null;
    let encodeData = "";

    // params 请求参数编码
    if (params instanceof Object) {
      for (const key in params) {
        arr.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        );
      }
      encodeData = arr.join("&");
    }

    // 判断请求方式
    if (method === "get") {
      const index = url.indexOf("?");
      if (index === -1) url += "?";
      else if (index != url.length - 1) url += "&";
      url += encodeData;
    } else {
      http.setRequestHeader(
        "content-type",
        "application/x-www-form-urlencoded;charset=UTF-8"
      );
      sendData = encodeData;
    }

    http.timeout = timeout;
    http.open(method, url, async);
    http.send(sendData);
    http.onerror = (error) => reject(error);
    http.ontimeout = () =>
      reject({ code: http.status, message: "http timeout!" });
    http.onreadystatechange = () => {
      if (http.readyState == 4) {
        if ((http.status >= 200 && http.status < 300) || http.status == 304) {
          resolve({
            code: http.status,
            message: "http success!",
            data: JSON.parse(http.responseText),
          });
        } else {
          reject({
            code: http.status,
            message: "http failed!",
          });
        }
      }
    };
  });
}
