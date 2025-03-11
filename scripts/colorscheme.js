//root element
let rootEl = document.documentElement;
console.log(rootEl);
//switch element from input
let switchEl = document.querySelector("#switch");
console.log(switchEl);
//readfrom local storage what colorscheme is chosen
let isDarkMode = readfromlocalstorage("isDarkMode");
let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

//base state for darktheme
let darkState = null;

//dont know about this
if (isDarkMode == null) {
  darkState = browserDark;
} else {
  darkState = isDarkMode;
}

//setting attribute depending on true or false
if (darkState) {
  switchEl.checked = true;
  rootEl.setAttribute("data-dark", switchEl.checked);
} else {
  switchEl.checked = false;
  rootEl.setAttribute("data-dark", switchEl.checked);
}

//setting event on the switch btn and adding the attribute depending on true or false
switchEl.addEventListener("change", function () {
  if (switchEl.checked) {
    rootEl.setAttribute("data-dark", switchEl.checked);
    saveToLocageStorage("isDarkMode", switchEl.checked);
  } else {
    rootEl.setAttribute("data-dark", switchEl.checked);
    saveToLocageStorage("isDarkMode", switchEl.checked);
  }
});
