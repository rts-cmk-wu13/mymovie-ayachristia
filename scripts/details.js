let params = new URLSearchParams(window.location.search);
let movieId = params.get("id");

const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=release_dates,credits`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmIyZDVhZDZjMTBkZGYwZjk0N2Q2NWFlNWRlODljYyIsIm5iZiI6MTc0MTAwMjQ2OS4wMTksInN1YiI6IjY3YzU5NmU1YzdjYWJhNDI0YzkxZmU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syFixX53XmNC4Ivc4Eci2Wma89qYRuCZKKQdrBDhCpQ",
  },
};
// ---------------API fetching movie detail
fetch(movieUrl, options)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("no movie found");
    }
  })
  .then((movie) => {
    console.log(movie);
    // -------------------------ELEMENTS REGION---------------------------------------------
    let bannerContainer = document.querySelector(".details__banner-container");
    let detailsHeader = document.querySelector(".details__info-header");
    let detailsResume = document.querySelector(".details__info-resume");

    // -----------------------------Rating / release_dates / Age----------------------------
    let countryChosen = "US";

    function movieRating(countryChosen) {
      // let ratingEl = document.querySelector(".details__PG");
      const country = movie.release_dates.results.find(
        (country) => country.iso_3166_1 === countryChosen
      );
      console.log(country);

      let rating = "N/A";
      if (country) {
        country.release_dates.forEach((release) => {
          if (release.certification) {
            rating = release.certification; // ratingEl.textContent = certification;
          }
        });
      } else {
        rating = rating; // ratingEl.textContent = certification;
      }
      return rating;
    }

    // -----------------------------Credits / Cast ----------------------------
    let castArray = movie.credits.cast;
    function getCast(cast) {
      castList = cast
        .map((actor) => {
          return `
            <section class="details__cast-actor">
                <div class="actorCard">
                    <div class="actorCard__img-container">
                        <a href="#">
                        <img src="https://image.tmdb.org/t/p/w154${actor.profile_path}" alt="" class="actorCard__img">
                        </a>
                    </div>
                    <p class="actorCard__name">${actor.character}</p>
                </div>
            </section>
            `;
        })
        .join("");
      return castList;
    }
    //   ----------------------------------DOM REGION----------------------------------------
    //   ----------------------------------DOM REGION----------------------------------------

    //banner backdrop in DOM
    bannerContainer.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}" alt="${movie.backdrop_path}" alt="${movie.title}" class="details__banner-img">
    `;
    //DOM HEADER
    detailsHeader.innerHTML = `
        <section class="details__header-top">
            <h1 class="details__headline">${movie.title}</h1>
            <span class="material-symbols-outlined">
            bookmark
        </span>
        </section>
        <p><span>star</span> ${movie.vote_average.toFixed(1)}</p>
        <section class="details__genres">
                ${movie.genres
                  .map((genre) => {
                    return `
                  <span class="global__genreEl">${genre.name}</span>
                  `;
                  })
                  .join("")}
        </section>
        <section class="details__header-bottom">
                  <table>
                    <tr>
                        <th>Length</th>
                        <th>Language</th>
                        <th>Rating</th>
                    </tr>
                    <tr>
                        <td>${Math.floor(movie.runtime / 60)}h. ${
      movie.runtime % 60
    }min.</td>
                        <td>${movie.spoken_languages[0].english_name}</td>
                        <td class="details__PG">${movieRating(
                          countryChosen
                        )}</td>
                    </tr>
                  </table>
        </section>
    `;
    //DOM DESCRIPTION + CAST
    detailsResume.innerHTML = `
    <section class="details__description">
        <h1 class="details__description-headline">Description</h1>
        <p class="details__description-text">${movie.overview}</p>
    </section>
    <section class="details__cast">
        <header class="details__cast-header">
            <h2 class="details__cast-headline">Cast</h2>
            <button class="details__cast-showmore showmore__btns">See more</button>
        </header>
        <section class="details__cast-actors">${getCast(castArray)}
        </section>
    </section>
    `;
    //DOM CAST EXPAND LIST EVENT
    let castContainer = document.querySelector(".details__cast-actors");
    let btnExpandCastList = document.querySelector(".details__cast-showmore");

    btnExpandCastList.addEventListener("click", function () {
      castContainer.classList.toggle("expanded");
      if (castContainer.classList.contains("expanded")) {
        btnExpandCast.textContent = "Show less";
      } else {
        btnExpandCast.textContent = "Show more";
      }
    });
  })
  .catch((err) => {
    let mainEl = document.querySelector(".main");
    mainEl.innerHTML = `
    <h2>${err}</h2>
    <p>Go back to <span><a href="index.html">main</a></span></p>`;
  });
