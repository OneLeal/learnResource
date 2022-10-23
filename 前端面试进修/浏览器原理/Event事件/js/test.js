const btn1 = document.getElementById("btn1");
const ul = document.getElementById("list");

bindEvent("click", btn1, btnClick);
bindEvent("click", ul, "li", liClick);

function btnClick(e) {
  console.log("btnClick", e);
}

function liClick(e) {
  console.log("liClick: ", e.target, e.target.innerText);
}
