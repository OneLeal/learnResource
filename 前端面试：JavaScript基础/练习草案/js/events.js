function eventsBind(type, dom, selector, fn) {
    if (fn == null) {
        fn = selector;
        selector = null;
    }

    dom.addEventListener(type, e => {
        if (selector) {
            if (e.target.className.indexOf(selector) > -1) {
                fn.call(e.target, e);
            }
        } else {
            fn.call(e.target, e);
        }
    });
}

function createCache() {
    const data = {};
    return {
        get: key => {
            return data[key];
        },

        set: (key, value) => {
            data[key] = value;
        }
    }
}

// 自定义事件
var msg = { name: '浅芷初夏', music: '世间美好与你环环相扣', info: '听音乐' };
var acceptMsg = new CustomEvent('msg', {     // 声明事件
    detail: msg,
    bubbles: true,
    cancelable: false
});
window.addEventListener('msg', (e) => {    // 注册事件
   console.log(e.detail);
});
setTimeout(() => {
    window.dispatchEvent(acceptMsg);  // 触发事件 dispatchEvent()
}, 1500);

