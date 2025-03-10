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
