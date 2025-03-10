let root = document.querySelector(".root");
root.innerHTML = `
<div class="wrapper">
    <header class="header header__details">
        <section class="header__bottom">
            <div class="header__left"></div>
            <div class="header__middle"></div>

            <div class="header__right">
                <label class="switch">
                <input type="checkbox" name="switch" id="switch">
                <span class="slider round"></span>
                </label>
            </div>
            
        </section>
    </header>

    <main class="main"></main>

    <footer></footer>
</div>
`;
