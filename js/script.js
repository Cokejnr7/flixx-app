const global = {
  currenthPath: window.location.pathname,
};

const paths = {
  HOME: "/index.html",
  SHOWS: "/shows.html",
  MOVIE_DETAILS: "/movie-details.html",
  TV_DETAILS: "/tv-details.html",
  SEARCH: "/search.html",
};

function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === global.currenthPath) {
      link.classList.add("active");
    }
  });
}

function init() {
  switch (global.currenthPath) {
    case "/":
    case paths.HOME:
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

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
