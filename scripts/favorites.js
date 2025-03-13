let favorites = readfromlocalstorage("favorites");

// let favoritesMain = document.querySelector(".favorites__main");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmIyZDVhZDZjMTBkZGYwZjk0N2Q2NWFlNWRlODljYyIsIm5iZiI6MTc0MTAwMjQ2OS4wMTksInN1YiI6IjY3YzU5NmU1YzdjYWJhNDI0YzkxZmU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syFixX53XmNC4Ivc4Eci2Wma89qYRuCZKKQdrBDhCpQ",
  },
};

favorites.forEach((movieId) => {
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=release_dates,credits,videos`;
  fetch(movieUrl, options)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("no movie found");
      }
    })
    .then((movie) => {
      favoritesMain.innerHTML += `
      

      <article class="favorite__movie" id="movie-${movie.id}">

      <a href="details.html?id=${movie.id}" class="favorite__movie-left">
      <div class="favorite__movie-imgContainer">
      <img src="https://image.tmdb.org/t/p/w780${movie.backdrop_path}" alt="${movie.original_title}" class="favorite__movie-img">
      </div>

      <h1 class="favorite__movie-title">${movie.original_title}</h1>

      <button class="favorite__movie-detailsBtn">
      <span class="material-symbols-outlined">play_circle</span>
      </button>
      </a>

      <div class="favorite__movie-right">
      <button class="favorite__movie-btn">
      <span class="material-symbols-outlined favorite__minus${movie.id}" id="minus-${movie.id}">
      remove
      </span>
      </button>
      

      <button class="favorite__movie-btn">
      <span class="material-symbols-outlined favorite__delete${movie.id}" id="delete-${movie.id}">
      delete
      </span>
      </button>
      </div>

      </article>
      

      
      `;
      //   document.addEventListener("click", function (event) {
      //     if (event.target.classList.contains(`favorite__minus${movie.id}`)) {
      //       let minusBtn = document.querySelector(`#minus-${movie.id}`);
      //       let deleteBtn = document.querySelector(`#delete-${movie.id}`);
      //       deleteBtn.style.display = "block";
      //     }
      //   });
    })
    .catch((err) => {
      let mainEl = document.querySelector(".main");
      mainEl.innerHTML = `
    <h2>${err}</h2>
    <p>Go back to <span><a href="index.html">main</a></span></p>`;
    });
});

document.addEventListener("click", function (event) {
  // Check if we clicked on any minus or delete button
  if (
    event.target.id &&
    (event.target.id.startsWith("minus-") ||
      event.target.id.startsWith("delete-"))
  ) {
    const movieId = event.target.id.split("-")[1];
    let minusBtn = document.querySelector(`#minus-${movieId}`);
    let deleteBtn = document.querySelector(`#delete-${movieId}`);

    deleteBtn.classList.toggle("show-delete-btn");
  }

  if (event.target.id.startsWith("delete-")) {
    const movieId = event.target.id.split("-")[1];
    console.log("clicked delete");

    const deleteMovie = document.querySelector(`#movie-${movieId}`);
    console.log(deleteMovie);
    if (deleteMovie) {
      removeItemFromLocalStorage("favorites", movieId);
      deleteMovie.remove();
    }
  }
});
//  const deleteBtnStyle = window.getComputedStyle(deleteBtn);

//     // Toggle visibility of both buttons
//     if (deleteBtnStyle.display === "none") {
//       minusBtn.style.display = "block";
//       deleteBtn.style.display = "block";
//     } else {
//       minusBtn.style.display = "block";
//       deleteBtn.style.display = "none";
//     }
