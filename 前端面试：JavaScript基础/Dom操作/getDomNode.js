/*
 * property: 修改对象属性，不会改变 html 结构；
 * attribute: 修改 html 属性，会改变 html 结构；
 * 两者都有可能引起 Dom 重新渲染
 *
 * childNodes parentNode 是 W3C 标准
 * children parentElement 是 IE 标准
 * 普通标签的 nodeType 是 1，文本标签是 3
 *
 * Dom 性能优化：对 Dom 查询进行缓存；使用文档片段 document.createDocumentFragment()；
 */

// 获取 Dom 节点
let musicContainer = document.getElementById('music');
let singer = document.getElementsByClassName('singer');
let songs = document.getElementsByTagName('p');
let words = document.querySelectorAll('span');

for (let i = 1; i < songs.length; i++) {
    songs[i].className = 'songs';
    songs[i].innerText = i + '. ' + songs[i].innerText;
}

musicContainer.style.width = '500px';
musicContainer.style.padding = '20px';
musicContainer.style.backgroundColor = '#f7f7f7';
musicContainer.style.marginBottom = '20px';
musicContainer.style.borderRadius = '8px';

singer[0].style.fontWeight = 'bold';

for (let i = 0; i < words.length; i++) {
    words[i].setAttribute('style', 'font-size: 12px; color: #ff2c39;');
    words[i].setAttribute('data-name', 'wordsOfSong');
}

// 对 Dom 结构进行操作
let pictureL = document.getElementById('pic-left');
let pictureR = document.getElementById('pic-right');

let titleL = document.createElement('div');
let titleR = document.createElement('div');
titleL.innerText = 'Love for You 绮然 ❥(^_-)';
titleR.innerText = '绮然大美女，爱你么么哒 ❥(^_-)';
titleL.className = 'ctx';
titleR.className = 'ctx';

pictureL.appendChild(titleL);
pictureR.appendChild(titleR);

let goods = document.getElementById('goods');
let childList = goods.children;

childList[0].children[0].style.color = 'deeppink';
childList[0].children[1].style.color = 'purple';
childList[0].children[2].style.color = 'yellowgreen';

childList[1].children[0].style.color = 'red';
childList[1].children[1].style.color = 'blue';
childList[1].children[2].style.color = 'orange';

const person = childList[2].children[0];
person.style.color = 'deepskyblue';
person.style.fontSize = '20px';
person.innerText += '爱绮然';
person.parentElement.style.borderTop = '1px #ccc solid';
person.parentElement.removeChild(childList[2].children[2]);
person.parentElement.removeChild(childList[2].children[1]);

// Dom 性能优化
const target = document.getElementById('ctx-left').children;  // 缓存 Dom 查询
const targetLength = target.length;   // 缓存 Dom 查询

for (let i = 0; i < targetLength; i++) {
    target[i].className = 'color-blue';
}

// 一次性操作 Dom
const dom = document.getElementById('ctx-right');
const temp = document.createDocumentFragment();

for (let i = 0; i < 5; i++) {
    const node = document.createElement('div');
    node.className = 'color-red';
    node.innerText = ctxList(i);
    temp.appendChild(node);
}
dom.appendChild(temp);

function ctxList(index) {
    let ctx;
    switch (index) {
        case 0: ctx = '我已经到了幻想的尽头'; break;
        case 1: ctx = '下山'; break;
        case 2: ctx = '大田后生仔'; break;
        case 3: ctx = '那女孩对我说'; break;
        case 4: ctx = '红色高跟鞋'; break;
        default: ctx = '不下雪的广东'; break;
    }
    return ctx;
}