// header
let headerLeft = document.querySelector(".header__bottom-left");
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

`;
