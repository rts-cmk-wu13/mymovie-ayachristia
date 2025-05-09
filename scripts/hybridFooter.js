const hybridFooter = document.querySelector(".footer");
hybridFooter.classList.add("hybridFooter");
hybridFooter.innerHTML = `
<section class="footer-left">
  <a href="index.html">
  <span class="material-symbols-outlined">
theaters
</span>
</a>
</section>

<section class="footer-middle">
  <a href="#">
  <span class="material-symbols-outlined">
book_online
</span>
</a>
</section>

<section class="footer-right">
  <a href="/favorites.html">
  <span class="material-symbols-outlined">
bookmark
</span>
</a>
</section>
`;
