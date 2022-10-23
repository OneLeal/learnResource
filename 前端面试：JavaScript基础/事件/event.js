const load1 = document.getElementById('load1');
const load2 = document.getElementById('load2');
const music1 = document.getElementById('music1');
const music2 = document.getElementById('music2');
const temp1 = document.createDocumentFragment();
const temp2 = document.createDocumentFragment();

load1.addEventListener('click', function () {
    for (let i = 0; i < 3; i++) {
        const node = document.createElement('li');
        const elem = document.createElement('a');
        elem.innerText = musicArr(i);
        elem.href = '#';
        node.appendChild(elem);
        temp1.appendChild(node);
    }
    music1.appendChild(temp1);
});

// 使用 jQuery 做事件代理
$(music1).on('click', 'li', function (e) {
   e.preventDefault();
   confirm(e.target.innerText);
});

// 使用 JavaScript 做事件代理
bindEvent('click', load2, function () {
    for (let i = 0; i < 3; i++) {
        const node = document.createElement('li');
        const elem = document.createElement('a');
        elem.innerText = musicArr(i);
        elem.href = '#';
        node.appendChild(elem);
        temp2.appendChild(node);
    }
    music2.appendChild(temp2);
});

bindEvent('click', music2, 'a', function (e) {
    e.preventDefault();
    confirm(e.target.innerText);
});

// 借助事件冒泡做代理
function bindEvent(type, elem, selector, fn) {
    if (fn == null) {
        fn = selector;
        selector = null;
    }

    elem.addEventListener(type, e => {
        if (selector) {
            // 代理模式
            if (e.target.matches(selector)) {
                fn.call(e.target, e);
            }
        } else {
            // 普通绑定模式
            fn.call(e.target, e);
        }
    });
}

function musicArr(index) {
    switch (index) {
        case 0: return '空山新雨后';
        case 1: return '盛夏的果实';
        case 2: return '那女孩对我说';
        default: return '大田后生仔';
    }
}