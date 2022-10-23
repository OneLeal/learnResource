const recognition = document.getElementById('recognition');
recognition.children[0].onclick = function () {
  const message = navigator.userAgent;
  confirm(message);
};

const url = document.getElementById('url');
const urlChildren = url.children;
const urlChildrenLength = urlChildren.length;

for (let i = 0; i < urlChildrenLength; i++) {
    urlChildren[i].onclick = function () {
        confirm(urlMessage(i));
    }
}

const screen = document.getElementById('screen');
const screenChildren = screen.children;
const screenChildrenLength = screenChildren.length;

for (let i = 0; i < screenChildrenLength; i++) {
    screenChildren[i].onclick = function () {
        confirm(screenMessage(i))
    }
}

function screenMessage(index) {
    switch (index) {
        case 0: return '屏幕宽度：' + window.screen.width;
        case 1: return '屏幕高度：' + window.screen.height;
        case 2: return '浏览器内部宽度（不含滚动条）：' + innerWidth;
        case 3: return '浏览器内部高度（不含滚动条）：' + innerHeight;
        default: return 'nothing';
    }
}

function urlMessage(index) {
    switch (index) {
        case 0: return '设置或返回完整的 URL：' + location.href;
        case 1: return '设置或返回当前 URL 的协议：' + location.protocol;
        case 2: return '设置或返回当前 URL 的路径部分：' + location.pathname;
        case 3: return '设置或返回从问号 (?) 开始的 URL（查询部分）：' + location.search;
        case 4: return '设置或返回从井号 (#) 开始的 URL（锚）：' + location.hash;
        case 5: return '设置或返回当前 URL 的端口号：' + location.port;
        default: return 'nothing';
    }
}
