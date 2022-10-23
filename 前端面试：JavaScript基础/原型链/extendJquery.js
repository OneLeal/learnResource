class jQuery {
    constructor(selector) {
        const result = document.querySelectorAll(selector);
        const length = result.length;

        this.selector = selector;
        this.length = length;

        for (let i = 0; i < length; i++) {
            this[i] = result[i];
        }
    }

    // 获取某一个 dom 元素
    elem_get(index) {
        return this[index];
    }

    // 遍历 dom 元素
    elem_each(fn) {
        for (let i = 0; i < this.length; i++) {
            const elem = this[i];
            fn(elem);
        }
    }

    // 添加监听事件
    elem_on(type, fn) {
        this.elem_each(elem => {
           elem.addEventListener(type, fn, false);
        });
    }
}

// 拓展机制
jQuery.prototype.dialog = function (index) {
    confirm(this[index].innerHTML);
};

// 复写机制
class myJQuery extends jQuery {
    constructor(selector) {
        super(selector);
    }

    // .......

    set_color(index) {
        let color;
        switch (index) {
            case 0: color = '#ffc419'; break;
            case 1: color = '#ff192f'; break;
            case 2: color = '#8680ff'; break;
            case 3: color = '#ccc'; break;
            case 4: color = '#6168cc'; break;
            default: color = '#000'; break;
        }
        this[index].style.color = color;
    }

    // .......
}

let $p = new myJQuery('p');

for (let i = 0; i < $p.length; i++) {
    $p.set_color(i);
}

$p.elem_each((elem) => {
    elem.style.borderBottom = '1px #333 dashed';
});

$p.elem_on('click', function () {
    alert(this.innerHTML);
});