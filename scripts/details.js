let params = new URLSearchParams(window.location.search);
console.log(params);
let movieId = params.get("id");
console.log(movieId);

const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmIyZDVhZDZjMTBkZGYwZjk0N2Q2NWFlNWRlODljYyIsIm5iZiI6MTc0MTAwMjQ2OS4wMTksInN1YiI6IjY3YzU5NmU1YzdjYWJhNDI0YzkxZmU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syFixX53XmNC4Ivc4Eci2Wma89qYRuCZKKQdrBDhCpQ",
  },
};

// ---------------API fetching movie detail
fetch(url, options)
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

    // -------------------------INNER FETCH REGION---------------------------------------------
    //retrieve the PG age and attach to the DOM
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/release_dates`;
    fetch(url, options)
      .then((res) => res.json())
      .then((release) => {
        releaseCountries = release.results;
        originCountry = movie.origin_country[0];
        let releaseForMovieCountry = releaseCountries.find(
          (releaseInfo) => releaseInfo.iso_3166_1 === originCountry
        ).release_dates[0].certification;
        console.log(releaseForMovieCountry);

        let moviePG = document.querySelector(".details__PG");
        moviePG.textContent = `${releaseForMovieCountry}`;
      })
      .catch((err) => console.error(err));

    //retrieve the actors
    const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}}/credits?language=en-US`;
    fetch(movieCreditsUrl, options)
      .then((res) => res.json())
      .then((credits) => {
        let cast = credits.cast;
        let actorsEl = document.querySelector(".details__cast-actors");
        actorsEl.innerHTML = `
        ${cast
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
          .join("")}
        `;
      })
      .catch((err) => console.error(err));

    //   ----------------------------------DOM REGION----------------------------------------
    //adding banner backdrop in DOM
    bannerContainer.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}" alt="${movie.backdrop_path}" alt="" class="details__banner-img">
    `;

    //adding info to the DOM
    detailsHeader.innerHTML = `
    
        <section class="details__header-top">
            <h1 class="details__headline">${movie.title}</h1>
            <span>favorite</span>
        </section>
        
            <p><span>star</span> ${movie.vote_average.toFixed(1)}</p>

            <section class="details__genres">
                ${movie.genres
                  .map((genre) => {
                    console.log(genre);
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
                        <td>${movie.runtime}</td>
                        <td>${movie.spoken_languages[0].english_name}</td>
                        <td class="details__PG"></td>
                    </tr>
                  </table>
            </section>
    `;

    detailsResume.innerHTML = `
    <section class="details__description">
        <h1 class="details__description-headline">Description</h1>
        <p class="details__description-text">${movie.overview}</p>
    </section>
    <section class="details__cast">
        <header class="details__cast-header">
            <h2 class="details__cast-headline">Cast</h2>
            <button class="showmore__btns">See more</button>
        </header>
        <section class="details__cast-actors">
        </section>
    </section>
    `;
  })
  .catch((err) => {
    let mainEl = document.querySelector(".main");
    mainEl.innerHTML = `
    <h2>${err}</h2>
    <p>Go back to <span><a href="index.html">main</a></span></p>`;
  });

//guide for image sizing for images above-------------------------------------------------------
const configurationUrl = "https://api.themoviedb.org/3/configuration";

fetch(configurationUrl, options)
  .then((res) => res.json())
  .then((images) => {
    console.log(images);
  })
  .catch((err) => console.error(err));
