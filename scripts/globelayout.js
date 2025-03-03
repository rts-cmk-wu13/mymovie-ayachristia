let root = document.querySelector(".root");
root.innerHTML = `
<div class="wrapper">
    <header class="header">
        <section class="header__top">
            <div><time datetime="">9:41</time></div>
            <div>
            <span class="material-symbols-outlined">
            signal_cellular_alt
            </span>
            <span class="material-symbols-outlined">
            wifi
            </span>
            <span class="material-symbols-outlined">
            battery_full_alt
            </span>
            </div>
        </section>

        <section class="header__bottom">
            <div class="header__bottom-left"></div>
            <div class="header__bottom-middle"></div>
            <div class="header__bottom-right">
                <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
                </label>
            </div>
        </section>
    </header>

    <main class="main"></main>

    <footer></footer>
</div>
`;
