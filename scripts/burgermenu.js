let headerLeft = document.querySelector(".header__left");
headerLeft.innerHTML = `

<div class="burger__nav" role="navigation">
    <button class="burger__nav-btn" aria-controles="primaryNavigation" aria-describedby="message-menu-button" aria-expanded="false" aria-label="menuButton">
    <span class="material-symbols-outlined">
menu
</span>
</button>
 

 <nav class="burger__nav-list hidden" id="primaryNavigation" role="navigation">
    <a href="index.html" aria-label="goToMainPage">Main page</a>
    <a href="favorites.html" aria-label="goToFavorites">Favorites</a>
    <button class="burger__nav-close" aria-label="closeMenuButton">X</button>
 </nav>
  </div>
  <div class="burger__nav-overlay hidden"></div>
  <div hidden>
    <span id="message-menu-button">Klik her for at vise menuen</span>
  </div>
`;

const overlay = document.querySelector(".burger__nav-overlay");
const burgerBtn = document.querySelector(".burger__nav-btn");
const navList = document.querySelector(".burger__nav-list");

burgerBtn.addEventListener("click", function () {
  navList.classList.remove("hidden");
  overlay.classList.remove("hidden");

  burgerBtn.setAttribute("aria-expanded", true);
});

const burgerCloseBtn = document.querySelector(".burger__nav-close");
burgerCloseBtn.addEventListener("click", function () {
  navList.classList.add("hidden");
  overlay.classList.add("hidden");
  burgerBtn.setAttribute("aria-expanded", false);
});
