// header
const headerLeft = document.querySelector(".header__left");
headerLeft.classList.add("details__returnToMain");
const footer = document.querySelector(".footer");
footer.classList.add("detailsFooter");

headerLeft.innerHTML = `
<a href="index.html"><span class="material-symbols-outlined">
keyboard_backspace
</span></a>

`;

//main
const main = document.querySelector(".main");
const detailsMain = document.createElement("div");
detailsMain.classList.add("details__main");
main.appendChild(detailsMain);

detailsMain.innerHTML = `
<section class="details__banner">
  <div class="details__banner-container">
  </div>
</section>
<section class="details__info">
<header class="details__info-header"></header>
<section class="details__info-resume"></section>
</section>
</section>
`;

footer.innerHTML = `
<a href="index.html"><button class="details__footer"></button></a>
`;
