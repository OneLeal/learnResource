// 面向对象绑定事件

// 集合模式：
class List {
    constructor(selector) {
        const self = this;
        self.el = Array.from(document.querySelectorAll(selector));
        self.el.forEach(item => {
           item.addEventListener('click', (e) => {
               if (e.target.className.indexOf('btn-del') > -1) {
                   self.delItem.call(self, e.target);
               }
           });
        });
    }

    delItem(target) {
        const self = this;
        const findParent = function (node) {
            const root = self.el.find(item => item === node.parentNode);
            if (root) {
                root.removeChild(node);
            } else {
                findParent(node.parentNode);
            }
        };
        findParent(target);
    }
}

// 单例模式：
class List2 {
    constructor(dom, selector) {
        const self = this;
        self.dom = dom;
        self.dom.addEventListener('click', (e) => {
            if (e.target.className.indexOf(selector) > -1) {
                self.removeItem.call(self, e.target);
            }
        });
    }

    removeItem(node) {
        const self = this;
        const findParent = function(son) {
            if (self.dom === son.parentElement) {
                self.dom.removeChild(son);
            } else {
                findParent(son.parentElement);
            }
        };
        findParent(node);
    }
}