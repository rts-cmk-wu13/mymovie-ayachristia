let marginLeftWrapper = document.querySelector(".wrapper");
marginLeftWrapper.classList.add("indexMarginLeft");
let headerMiddle = document.querySelector(".header__middle");
headerMiddle.classList.add("favorites__headline");
headerMiddle.innerHTML = `
<h1 class="favorites__headline">My favorites</h1>
`;

// main
let main = document.querySelector(".main");
let favoritesMain = document.createElement("div");
favoritesMain.classList.add("favorites__main");
main.appendChild(favoritesMain);

favoritesMain.innerHTML = `

`;
