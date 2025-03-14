let headerLeft = document.querySelector(".header__left");
headerLeft.innerHTML = `

<div class="burger__nav">
    <button class="burger__nav-btn">
    <span class="material-symbols-outlined">
menu
</span>
</button>
 

 <nav class="burger__nav-list hidden">
    <a href="index.html">Main page</a>
    <a href="favorites.html">Favorites</a>
    <button class="burger__nav-close">X</button>
 </nav>
  </div>
  <div class="burger__nav-overlay hidden"></div>
`;

const overlay = document.querySelector(".burger__nav-overlay");
const burgerBtn = document.querySelector(".burger__nav-btn");
const navList = document.querySelector(".burger__nav-list");

burgerBtn.addEventListener("click", function () {
  navList.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

const burgerCloseBtn = document.querySelector(".burger__nav-close");
burgerCloseBtn.addEventListener("click", function () {
  navList.classList.add("hidden");
  overlay.classList.add("hidden");
});
