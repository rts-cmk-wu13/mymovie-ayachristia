// lav fetches først og append dom inde i de fetches til de fecthes kategorier
"use strict";
let mainContent = document.querySelector(".main");

//movie lists: now playing api-----------horisontal scroll
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
    console.log(moviesArray);
    let listContainerShowing = document.querySelector(".index__showing-list");
    listContainerShowing.innerHTML += moviesArray
      .map((movie) => {
        return `
        <a href="details.html?id=${movie.id}">
        <article class="index__showing-movie">
          <div class="index__showing-imgContainer">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" class="index__showing-img">
          </div>
          <h2 class="index__showing-titel">${movie.title}</h2>
          <p class="index__showing-rating"><span class="material-symbols-outlined">star</span> ${movie.vote_average.toFixed(
            1
          )}/10 IMDb</p>
        </article>
      </a>
        `;
      })
      .join("");
  })
  .catch((err) => console.error(err));

//movie lists: popular api----------------fortsætter ned ad siden/intersectionobserver
// --------------- genres api

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

function getGenreNames(ids) {
  return ids.map((id) => {
    return genreList.find((genre) => genre.id == id).name;
  });
}
// -------------popular api
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
    console.log(popularArray);

    let listContainerPopular = document.querySelector(".index__popular-list");
    listContainerPopular.innerHTML += popularArray
      .map((popular) => {
        console.log(popular);
        // -----------------the DOM
        return `
        <a href="details.html?id=${popular.id}">
      <article class="index__popular-movie">
        <div class="index__popular-imgContainer">
          <img src="https://image.tmdb.org/t/p/w500${
            popular.poster_path
          }" alt="${popular.title}" class="index__popular-img">
        </div>
        <section class="index__popular-details">
          <h2 class="index__popular-headline">${popular.title}</h2>
          <p class="index__popular-rating"><span class="material-symbols-outlined">star</span> ${popular.vote_average.toFixed(
            1
          )}/10</p>
          <div class="index__popular-genres">
            ${getGenreNames(popular.genre_ids)}
          </div>
        </section>
      </article>
    </a>
      `;
      })
      .join(" ");
  })
  .catch((err) => console.error(err));

// -----------------configuration details api
const configurationUrl = "https://api.themoviedb.org/3/configuration";

fetch(configurationUrl, options)
  .then((res) => res.json())
  .then((json) => {})
  .catch((err) => console.error(err));
