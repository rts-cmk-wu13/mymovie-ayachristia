// lav fetches først og append dom inde i de fetches til de fecthes kategorier
"use strict";
const favoriteArray = readfromlocalstorage("favorites") || [];
console.log(favoriteArray);
let mainContent = document.querySelector(".main");
////////////////////////////intersecting now playing
let currentPage = 1; //deklareret én gang til nowplaying+popular intersection observers
const nowPlayingOptions = {
  threshold: 1.0,
};
const nowPlayingObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) {
    currentPage++;
    nowPlayingPage(currentPage);
  }
}, nowPlayingOptions);

//////////////////////////API FETCH NOW PLAYING

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmIyZDVhZDZjMTBkZGYwZjk0N2Q2NWFlNWRlODljYyIsIm5iZiI6MTc0MTAwMjQ2OS4wMTksInN1YiI6IjY3YzU5NmU1YzdjYWJhNDI0YzkxZmU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syFixX53XmNC4Ivc4Eci2Wma89qYRuCZKKQdrBDhCpQ",
  },
};
function nowPlayingPage(page) {
  const playingUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
  fetch(playingUrl, options)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("nothing found");
      }
    })
    .then((movies) => {
      let moviesArray = movies.results;
      let listContainerShowing = document.querySelector(".index__showing-list");

      ////////////////////////////DOM REGION
      listContainerShowing.innerHTML += moviesArray
        .map((movie) => {
          return `
          <article class="index__showing-movie" aria-labelledby="movieShowing">
          <div class="index__showing-imgContainer">
            <a href="details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" class="index__showing-img">
            </a>
          </div>
          <h2 class="index__showing-titel" id="movieShowing">${movie.title}</h2>
          <p class="index__showing-rating"><span class="material-symbols-outlined global__star" aria-label="movieReviews">star</span> ${movie.vote_average.toFixed(
            1
          )}/10 IMDb</p>
          <span class="material-symbols-outlined favorite ${
            favoriteArray.includes(movie.id.toString()) ? "favorite-solid" : ""
          }" id="favorite" data-id="${movie.id}" aria-label="addTofavorite">
            bookmark
        </span>
        
        </article>
      
        `;
        })
        .join("");

      let observedNowPlaying = listContainerShowing.querySelector(
        "article:nth-last-child(5)"
      );
      nowPlayingObserver.observe(observedNowPlaying);
    })
    .catch((err) => console.error(err));
}
nowPlayingPage(currentPage);

////////////////////////////INTERSECTING POPULAR MOVIES

const popularOptions = {
  threshold: 1.0,
};

const popularObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) {
    currentPage++;
    fetchPopularMovie(currentPage);
  }
}, popularOptions);
////////////////////////////API FETCH POPULAR GENRES FOR POPULAR MOVIES
let genreList = [];
let genresLoaded = false;

const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";
fetch(genreUrl, options)
  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((genre) => {
      genreList.push(genre);
    });
    genresLoaded = true;

    fetchPopularMovie(currentPage);
  })
  .catch((err) => console.error(err));

////////////////////////////API FETCH POPULAR MOVIES
function fetchPopularMovie(page) {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  fetch(popularUrl, options)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("nothing found");
      }
    })
    .then((popular) => {
      //popular movies in to variabel
      let popularArray = popular.results;
      let listContainerPopular = document.querySelector(".index__popular-list");

      ////////////////////////////DOM REGION
      listContainerPopular.innerHTML += popularArray
        .map((popular) => {
          return `
      <article class="index__popular-movie" data-id="${
        popular.id
      }" aria-labelledby="popularMovie">
        
        <div class="index__popular-imgContainer">
          <a href="details.html?id=${popular.id}">
          <img src="https://image.tmdb.org/t/p/w500${
            popular.poster_path
          }" alt="${popular.title}" class="index__popular-img">
          </a>
        </div>

        <section class="index__popular-details">
          <h2 class="index__popular-titel" id="popularMovie">${
            popular.title
          }</h2>
          <p class="index__popular-rating"><span class="material-symbols-outlined global__star" aria-label="movieReviews">star</span> ${popular.vote_average.toFixed(
            1
          )}/10 IMDb</p>
          <div class="index__popular-genres" aria-label="movieGenres">
            ${popular.genre_ids
              .map((id) => {
                return `<span class="global__genreEl">${
                  genreList.find((genre) => genre.id == id).name
                }</span>`;
              })
              .join("")}
            </div>
            <p class="index__popular-runtime" id="runtime-${
              popular.id
            }" aria-label="movieRuntime">
            </p>
          </section>
          <span class="material-symbols-outlined favorite ${
            favoriteArray.includes(popular.id.toString())
              ? "favorite-solid"
              : ""
          }" id="favorite" data-id="${popular.id}" name="${
            popular.title
          }" aria-label="saveToFavorites">
            bookmark
        </span>
        </article>
      
      `;
        })
        .join(" ");
      let observedPopular = listContainerPopular.querySelector(
        "article:nth-last-child(5)"
      );
      popularObserver.observe(observedPopular);
      //inside the popular fetch => forEach popular of popularArray=> fetch all movies through their popular.id
      //inside forEach popular => fetch all movies => retrieve each popular DOMeL => add movie.runtime
      //adding runtime
      popularArray.forEach((popular) => {
        fetch(
          `https://api.themoviedb.org/3/movie/${popular.id}?language=en-US`,
          options
        )
          .then((res) => res.json())
          .then((movie) => {
            let runtimeElement = document.querySelector(`#runtime-${movie.id}`);

            runtimeElement.innerHTML = `<span class="material-symbols-outlined">
            schedule
            </span> ${Math.floor(movie.runtime / 60)}h. ${
              movie.runtime % 60
            }min.`;
          })
          .catch((err) => console.error(err));
      });
    })
    .catch((err) => console.error(err));
}
// fetchPopularMovie(currentPage);
//guide for image sizing for images above-------------------------------------------------------
const configurationUrl = "https://api.themoviedb.org/3/configuration";

fetch(configurationUrl, options)
  .then((res) => res.json())
  .then((images) => {
    console.log(images);
  })
  .catch((err) => console.error(err));

// --------------------------gathering favorites on index.html

//delegering - 1 event listener istedet på alle (hvis mange elementer med samme event)
//lytter på en parent og fanger alle elementer + nye elementer / ved click på et element, tjekkesom det er det valgte via if(contains)
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("favorite")) {
    let favoriteId = event.target.dataset.id;

    //hvis favoriteArray ikke allerede holder id'et, så push ind i Array, ellers gør intet.
    if (!favoriteArray.includes(favoriteId)) {
      favoriteArray.push(favoriteId);
      event.target.classList.add("favorite-solid");

      console.log(`adds to favorites: ${favoriteId}`);
      console.log(favoriteArray);
    } else {
      const index = favoriteArray.indexOf(favoriteId);
      favoriteArray.splice(index, 1);
      event.target.classList.remove("favorite-solid");
      console.log(`removed from favorite array`);
      console.log(favoriteArray);
    }
    saveToLocalStorage("favorites", favoriteArray);
  }
});

console.log(favoriteArray);

// let array = [1, 2, 3, 4];
// let newArray = [...array];
// console.log(newArray);
// let a = [10, 20];
// let b = [...a, 30, 40];

// console.log(a);
// console.log(b);
