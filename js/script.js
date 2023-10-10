const global = {
  currenthPath: window.location.pathname,
};

async function fetchAPIData() {}

const routes = {
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
    case routes.HOME:
      console.log("Home");
      break;
    case routes.SHOWS:
      console.log("Shows");
      break;
    case routes.MOVIE_DETAILS:
      console.log("Movie Details");
      break;
    case routes.TV_DETAILS:
      console.log("TV Details");
      break;
    case routes.SEARCH:
      console.log("Search");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
