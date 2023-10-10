const global = {
  currenthPath: window.location.pathname,
};

const paths = {
  HOME: "/",
  SHOWS: "/shows.html",
  MOVIE_DETAILS: "/movie-details.html",
  TV_DETAILS: "/tv-details.html",
  SEARCH: "/search.html",
};

function init() {
  switch (global.currenthPath) {
    case "/":
      console.log("Home");
      break;
    case paths.SHOWS:
      console.log("Shows");
      break;
    case paths.MOVIE_DETAILS:
      console.log("Movie Details");
      break;
    case paths.TV_DETAILS:
      console.log("TV Details");
      break;
    case paths.SEARCH:
      console.log("Search");
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
