let headerLeft = document.querySelector(".header__bottom-left");
let headerMiddle = document.querySelector(".header__bottom-middle");
headerLeft.innerHTML = `
<div class="burger__nav">
  <span class="material-symbols-outlined">
menu
</span>
  </div>
`;
headerMiddle.innerHTML = `
<h1>MyMovies</h1>
`;

// main
let main = document.querySelector(".main");
let indexMain = document.createElement("div");
indexMain.classList.add("index__main");
main.appendChild(indexMain);

indexMain.innerHTML = `
<section class="index__showing"></section>
<section class="index__popular"></section>
`;
