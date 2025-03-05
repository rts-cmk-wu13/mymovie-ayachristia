// lav fetches først og append dom inde i de fetches til de fecthes kategorier
"use strict";
let mainContent = document.querySelector(".main");

//----------- API now playing
const playingUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmIyZDVhZDZjMTBkZGYwZjk0N2Q2NWFlNWRlODljYyIsIm5iZiI6MTc0MTAwMjQ2OS4wMTksInN1YiI6IjY3YzU5NmU1YzdjYWJhNDI0YzkxZmU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syFixX53XmNC4Ivc4Eci2Wma89qYRuCZKKQdrBDhCpQ",
  },
};

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
    listContainerShowing.innerHTML += moviesArray
      .map((movie) => {
        return `
        
        <article class="index__showing-movie">
          <div class="index__showing-imgContainer">
            <a href="details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" class="index__showing-img">
            </a>
          </div>
          <h2 class="index__showing-titel">${movie.title}</h2>
          <p class="index__showing-rating"><span class="material-symbols-outlined">star</span> ${movie.vote_average.toFixed(
            1
          )}/10 IMDb</p>
        </article>
      
        `;
      })
      .join("");
  })
  .catch((err) => console.error(err));

// ---------------API genres
let genreList = [];
const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";
fetch(genreUrl, options)
  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((genre) => {
      genreList.push(genre);
    });
  })
  .catch((err) => console.error(err));

//runtime for DOM// let runtimeContainer = document.querySelector(
//   ".index__popular-runtime"
// );
// runtimeContainer.innerHTML = `
//   ${movie.runtime}
// `;

//---------------API popular -fortsætter ned ad siden/intersectionobserver
const popularUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

fetch(popularUrl, options)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("nothing found");
    }
  })
  .then((popular) => {
    let popularArray = popular.results;
    let listContainerPopular = document.querySelector(".index__popular-list");

    listContainerPopular.innerHTML += popularArray
      .map((popular) => {
        // -----------------the DOM
        return `
      <article class="index__popular-movie" data-id="${popular.id}">
        <div class="index__popular-imgContainer">
          <a href="details.html?id=${popular.id}">
          <img src="https://image.tmdb.org/t/p/w500${
            popular.poster_path
          }" alt="${popular.title}" class="index__popular-img">
          </a>
        </div>
        <section class="index__popular-details">
          <h2 class="index__popular-headline">${popular.title}</h2>
          <p class="index__popular-rating"><span class="material-symbols-outlined">star</span> ${popular.vote_average.toFixed(
            1
          )}/10</p>
          <div class="index__popular-genres">
            ${popular.genre_ids.map((id) => {
              return genreList.find((genre) => genre.id == id).name;
            })}
            </div>
            <p class="index__popular-runtime" id="runtime-${popular.id}">
            </p>
          </section>
        </article>
      
      `;
      })
      .join(" ");
    //data-id popular.id added to the object to fetch beneath
    popularArray.forEach((movie) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
        options
      )
        .then((res) => res.json())
        .then((detail) => {
          console.log(detail);
          let runtimeElement = document.querySelector(`#runtime-${movie.id}`);

          runtimeElement.innerHTML = `Runtime: ${detail.runtime} mins`;
        })
        .catch((err) => console.error(err));
    });
  })
  .catch((err) => console.error(err));
// function getGenreNames(ids) {
//   return ids.map((id) => {
//     return genreList.find((genre) => genre.id == id).name;
//   });
// }
// ${getGenreNames(popular.genre_ids)}
// -----------------configuration details api
const configurationUrl = "https://api.themoviedb.org/3/configuration";

fetch(configurationUrl, options)
  .then((res) => res.json())
  .then((json) => {})
  .catch((err) => console.error(err));
