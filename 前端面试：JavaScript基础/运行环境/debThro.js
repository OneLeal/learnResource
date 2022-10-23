// type = 1: 防抖（debounce）；
// type = 0: 节流（throttle）；
function debounceOrThrottle(fn, delay = 500, type = 1) {
    let timer = null;

    return function () {
        if (timer) {
            if (type) {
                clearTimeout(timer);
            } else {
                return;
            }
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}

// 防抖
function debounce(fn, delay = 500) {
    let timer = null;

    return function () {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}

// 节流
function throttle(fn, delay = 200) {
    let timer = null;

    return function () {
        if (timer) {
            return;
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}

function bindEvent(type, elem, selector, fn) {
    if (fn == null) {
        fn = selector;
        selector = null;
    }

    elem.addEventListener(type, e => {
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