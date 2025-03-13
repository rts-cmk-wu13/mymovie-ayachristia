let headerLeft = document.querySelector(".header__left");
headerLeft.innerHTML = `
<div class="burger__nav">
    <button class="burger__nav-btn">
    <span class="material-symbols-outlined">
menu
</span>
</button>
 

 <nav class="burger__nav-list">
    <a href="index.html">Main page</a>
    <a href="favorites.html">Favorites</a>
    <button class="burger__nav-close">X</button>
 </nav>
  </div>
`;

let burgerBtn = document.querySelector(".burger__nav-btn");
let navList = document.querySelector(".burger__nav-list");
burgerBtn.addEventListener("click", function () {
  navList.classList.add("active");
});

let burgerCloseBtn = document.querySelector(".burger__nav-close");
burgerCloseBtn.addEventListener("click", function () {
  navList.classList.remove("active");
});
