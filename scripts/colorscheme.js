//root element
let rootEl = document.documentElement;
console.log(rootEl);
//switch element from input
let switchEl = document.querySelector("#switch");
console.log(switchEl);

let darkState = null;

if (darkState) {
  switchEl.checked = true;
  rootEl.setAttribute("data-dark", switchEl.checked);
} else {
  switchEl.checked = false;
  rootEl.setAttribute("data-dark", switchEl.checked);
}

switchEl.addEventListener("change", function () {});
