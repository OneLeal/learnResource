const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const type = "attach";
const detail = { name: "attach actived!", other: "to do something" };
const opts = { detail };
const attach = selfEvent(type, opts);

// 点击时触发 btn2 上的 attach 事件
bindEvent("click", btn1, () => btn2.dispatchEvent(attach));
bindEvent(type, btn2, (e) => console.log(e.detail, e.target));
