const isStopPropgation = true; // 是否阻止冒泡
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const box = document.getElementById("box");
const ul = document.getElementById("list");

const eventBtn1 = new EventBind(btn1);
const eventBtn2 = new EventBind(btn2);
const eventBox = new EventBind(box);
const eventUl = new EventBind(ul);

eventBtn1.addEventListener("click", clickBtn1);
eventBtn2.addEventListener("click", clickBtn2);
eventBox.addEventListener("click", clickBox);
eventUl.on("click", "li", clickLi);

function clickBtn1(e) {
  isStopPropgation && EventBind.stopPropgation(e);
  console.log("clickBtn1: ", e);
}

function clickBtn2(e) {
  console.log("clickBtn2: ", e);
  isStopPropgation && EventBind.stopPropgation(e);
  eventBtn1.removeEventListener("click", clickBtn1);
}

function clickBox(e) {
  console.log("clickBox: ", e);
}

function clickLi(e) {
  isStopPropgation && EventBind.stopPropgation(e);
  console.log("clickLi: ", e.target.innerText);
}
