let marginLeftWrapper = document.querySelector(".wrapper");
marginLeftWrapper.classList.add("indexMarginLeft");

let headerLeft = document.querySelector(".header__left");
let headerMiddle = document.querySelector(".header__middle");

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
<section class="index__showing">
  <header class="index__showing-header">
  <h2>Now showing</h2>
  <button class="showmore__btns">See more</button>
  </header>
  <section class="index__showing-list"></section>
</section>

<section class="index__popular">
  <header class="index__popular-header">
  <h2>Popular</h2>
  <button class="showmore__btns">See more</button>
  </header>

<section class="index__popular-list">
</section>

</section>
`;
