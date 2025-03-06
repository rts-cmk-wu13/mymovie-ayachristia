// header
let headerLeft = document.querySelector(".header__left");
headerLeft.innerHTML = `
<span class="material-symbols-outlined">
keyboard_backspace
</span>
`;

let main = document.querySelector(".main");
let detailsMain = document.createElement("div");
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
