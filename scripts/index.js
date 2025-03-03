// lav fetches først og append dom inde i de fetches til de fecthes kategorier
"use strict";
let mainContent = document.querySelector(".main");

//------------endpoint-------------movie lists: now playing-----------horisontal scroll
const playingUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const playingOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmIyZDVhZDZjMTBkZGYwZjk0N2Q2NWFlNWRlODljYyIsIm5iZiI6MTc0MTAwMjQ2OS4wMTksInN1YiI6IjY3YzU5NmU1YzdjYWJhNDI0YzkxZmU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syFixX53XmNC4Ivc4Eci2Wma89qYRuCZKKQdrBDhCpQ",
  },
};

fetch(playingUrl, playingOptions)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("nothing found");
    }
  })
  .then((json) => console.log(json))
  .catch((err) => console.error(err));

//---------------endpoint------------movie lists: popular----------------fortsætter ned ad siden/intersectionobserver
const popularUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const popularOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmIyZDVhZDZjMTBkZGYwZjk0N2Q2NWFlNWRlODljYyIsIm5iZiI6MTc0MTAwMjQ2OS4wMTksInN1YiI6IjY3YzU5NmU1YzdjYWJhNDI0YzkxZmU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syFixX53XmNC4Ivc4Eci2Wma89qYRuCZKKQdrBDhCpQ",
  },
};

fetch(popularUrl, popularOptions)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("nothing found");
    }
  })
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
