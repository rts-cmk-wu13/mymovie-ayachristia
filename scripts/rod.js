let rating = "N/A";

if (releasesMovie) {
}
releasesMovie.release_dates.forEach((release) => {
  if (release.certification) {
    rating = release.certification;
    console.log(rating);
    return rating;
  } else {
    rating = "N/A";
  }
});
// console.log(certification);
//returnere et array

releaseCountries = data.results;
originCountry = "US";

console.log(releaseCountries);
let releaseForMovieCountry = releaseCountries.find(
  (releaseInfo) => releaseInfo.iso_3166_1 == originCountry
).release_dates[0].certification;
console.log(releaseForMovieCountry);
// let releaseForMovieCountry = releaseCountries.find(
//   (releaseInfo) => releaseInfo.iso_3166_1 == originCountry
// ).release_dates[0].certification;
// console.log(releaseForMovieCountry);

let moviePG = document.querySelector(".details__PG");
moviePG.textContent = `${releaseForMovieCountry}`;
