// 单例模式
class List {
    constructor(dom, sel) {
        const self = this;
        self.dom = dom;
        self.dom.addEventListener('click', (e) => {
            if (e.target.className === sel) {
                self.removeItem.call(self, e.target);
            }
        });
    }

    removeItem(target) {
        const self = this;
        findParent(target);
        function findParent(node) {
            if (node.parentNode === self.dom) {
                self.dom.removeChild(node);
            } else {
                findParent(node.parentNode);
            }
        }
    }
}

// 集合模式
class ListGather {
    constructor(el, selector) {
        const self = this;
        self.elGroup = Array.from(document.querySelectorAll(el)); // 列表集合
        self.elGroup.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.className === selector) {
                    self.removeItem.call(self, e.target);
                }
            });
        });
    }

    removeItem (target) {
        const self = this;
        findParent(target);
        function findParent(node) {
            const root = self.elGroup.find(item => item === node.parentNode);
            if (root) {
                root.removeChild(node);
            } else {
                findParent(node.parentNode);
            }
        }
    }
}