let params = new URLSearchParams(window.location.search);
let movieId = params.get("id");
// collect favorites
const favoriteArray = readfromlocalstorage("favorites") || [];
console.log(favoriteArray);

const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=release_dates,credits,videos`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmIyZDVhZDZjMTBkZGYwZjk0N2Q2NWFlNWRlODljYyIsIm5iZiI6MTc0MTAwMjQ2OS4wMTksInN1YiI6IjY3YzU5NmU1YzdjYWJhNDI0YzkxZmU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syFixX53XmNC4Ivc4Eci2Wma89qYRuCZKKQdrBDhCpQ",
  },
};
////////////////////////////API FETCH MOVIE DETAILS
fetch(movieUrl, options)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("no movie found");
    }
  })
  .then((movie) => {
    let bannerContainer = document.querySelector(".details__banner-container");
    let detailsHeader = document.querySelector(".details__info-header");
    let detailsResume = document.querySelector(".details__info-resume");

    ////////////////////////////AGE, RELEASE DATES
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

    ////////////////////////////CAST, CREDITS
    let castArray = movie.credits.cast;
    function getCast(cast) {
      castList = cast
        .map((actor) => {
          return `
            <section class="details__cast-actor" aria-labelledBy="actor">
              <div class="actorCard">
                <div class="actorCard__img-container">
                  <a href="#">
                    <img src="https://image.tmdb.org/t/p/w154${actor.profile_path}" alt="${actor.name}" class="actorCard__img">
                  </a>
                </div>
                <p class="actorCard__name" id="actor">${actor.name}</p>
              </div>
            </section>
            `;
        })
        .join("");
      return castList;
    }
    ////////////////////////////DOM REGION

    ////////////////////////////BANNER/TRAILER (skulle måske have været i function)
    // (banne imageburde sættes i en function så den kunne kaldes flere gange nedenfor)
    bannerContainer.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}" alt="${movie.backdrop_path}" alt="${movie.title}" class="details__banner-img" aria-labelledby="coverToTrailer">
    `;
    ////////////////////////////TRAILER CREATION
    let trailer = movie.videos.results.filter((result) => {
      if (result.type.includes("Trailer") && result.site.includes("YouTube")) {
        return result;
      }
    });

    const trailerKey = trailer[0]?.key;

    //track if trailer has been loaded
    let hasTrailerLoaded = false;

    bannerContainer.addEventListener("mouseenter", function () {
      if (trailerKey && !hasTrailerLoaded) {
        hasTrailerLoaded = true;

        bannerContainer.innerHTML = `
      <iframe id="trailer" class="details__banner-trailer" frameborder="0" allowfullscreen id="coverToTrailer"></iframe>
      `;

        const iframe = document.querySelector("#trailer");
        iframe.src = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`;
      } else if (!trailerKey) {
        console.log("No trailer found");
        bannerContainer.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}" alt="${movie.backdrop_path}" alt="${movie.title}" class="details__banner-img" aria-labelledby="coverToTrailer">
    `;
      }
    });

    bannerContainer.addEventListener("mouseout", function (event) {
      bannerContainer.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}" alt="${movie.backdrop_path}" alt="${movie.title}" class="details__banner-img" aria-labelledby="coverToTrailer">
    `;

      hasTrailerLoaded = false;
    });
    ////////////////////////////BANNER/TRAILER REGION END
    ////////////////////////////DOM REGION - HEADER
    detailsHeader.innerHTML = `
        <section class="details__info-headerTop">
            <h1 class="details__info-headline" id="overskrift">${
              movie.title
            }</h1>
            <span class="material-symbols-outlined favorite ${
              favoriteArray.includes(movie.id.toString())
                ? "favorite-solid"
                : ""
            }" id="favorite" data-id="${movie.id}" name="${
      movie.original_title
    }" aria-label="saveToFavorites">
            bookmark
        </span>
        </section>
        <p class="details__movie-rating" aria-label="movieRatings"><span class="material-symbols-outlined global__star">star</span> ${movie.vote_average.toFixed(
          1
        )} IMDb</p>
        <section class="details__info-genres" aria-label="movieGenres">
                ${movie.genres
                  .map((genre) => {
                    return `
                  <span class="global__genreEl">${genre.name}</span>
                  `;
                  })
                  .join("")}
        </section>
        <section class="details__info-headerBottom">
                  <table>
                    <tr>
                        <th>Length</th>
                        <th>Language</th>
                        <th>Rating</th>
                    </tr>
                    <tr>
                        <td aria-label="movieRuntime">${Math.floor(
                          movie.runtime / 60
                        )}h. ${movie.runtime % 60}min.</td>
                        <td aria-label="movieLanguage">${
                          movie.spoken_languages[0].english_name
                        }</td>
                        <td class="details__info-PG" aria-label="ageRestrictions">${movieRating(
                          countryChosen
                        )}</td>
                    </tr>
                  </table>
        </section>
    `;
    ////////////////////////////DOM REGION - DESCRIPTION + CAST
    detailsResume.innerHTML = `
    <section class="details__description" aria-label="movieDescription">
        <h1 class="details__description-headline">Description</h1>
        <p class="details__description-text" aria-describedby="overskrift">${
          movie.overview
        }</p>
    </section>
    <section class="details__cast" aria-label="movieCast">
        <header class="details__cast-header" role="header">
            <h2 class="details__cast-headline" id="castList">Cast</h2>
            <button class="details__cast-showmore showmore__btns" aria-label="castButton" aria-controles="castView">See more</button>
        </header>
        <section class="details__cast-actors" aria-describedby="castList" id="castView" aria-expanded="false">${getCast(
          castArray
        )}
        </section>
    </section>
    `;
    //delegering - 1 event listener istedet på alle (hvis mange elementer med samme event)
    //lytter på en parent og fanger alle elementer + nye elementer / ved click på et element, tjekkesom det er det valgte via if(contains)
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("favorite")) {
        let favoriteId = event.target.dataset.id;

        //hvis favoriteArray ikke allerede holder id'et, så push ind i Array, ellers gør intet.
        if (!favoriteArray.includes(favoriteId)) {
          favoriteArray.push(favoriteId);
          event.target.classList.add("favorite-solid");
          console.log(favoriteArray);
        } else {
          const index = favoriteArray.indexOf(favoriteId);
          favoriteArray.splice(index, 1);
          event.target.classList.remove("favorite-solid");
          console.log(favoriteArray);
        }
        saveToLocalStorage("favorites", favoriteArray);
      }
    });

    //DOM CAST EXPAND LIST EVENT
    let castContainer = document.querySelector(".details__cast-actors");
    let btnExpandCastList = document.querySelector(".details__cast-showmore");

    btnExpandCastList.addEventListener("click", function () {
      castContainer.classList.toggle("expanded");
      if (castContainer.classList.contains("expanded")) {
        btnExpandCastList.textContent = "Show less";
        btnExpandCastList.setAttribute("aria-expanded", true);
      } else {
        btnExpandCastList.textContent = "Show more";
        btnExpandCastList.setAttribute("aria-expanded", false);
      }
    });
  })
  .catch((err) => {
    let mainEl = document.querySelector(".main");
    mainEl.innerHTML = `
    <h2>${err}</h2>
    <p>Go back to <span><a href="index.html">main</a></span></p>`;
  });

// ---------------------------
