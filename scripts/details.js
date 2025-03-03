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

fetch(url, options)
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("no movie found");
    }
  })
  .then((json) => console.log(json))
  .catch((err) => {
    let mainEl = document.querySelector(".main");
    mainEl.innerHTML = `
    <h2>${err}</h2>
    <p>Go back to <span><a href="index.html">main</a></span></p>`;
  });
