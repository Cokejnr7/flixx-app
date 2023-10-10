import { API_KEY, API_URL, IMAGE_PATH } from "../secret.js";

const global = {
  currenthPath: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` 
    <a href="movie-details.html?id=${movie.id}">
    <img
      src=${
        movie.poster_path
          ? IMAGE_PATH + movie.poster_path
          : "images/no-image.jpg"
      }
      class="card-img-top"
      alt=${movie.title}
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${movie.release_date}</small>
    </p>
  </div>`;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

async function displayPopularTVShows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` 
    <a href="tv-details.html?id=${show.id}">
    <img
      src=${
        show.poster_path ? IMAGE_PATH + show.poster_path : "images/no-image.jpg"
      }
      class="card-img-top"
      alt=${show.name}
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Air Date: ${show.first_air_date}</small>
    </p>
  </div>`;

    document.querySelector("#popular-shows").appendChild(div);
  });
}

async function fetchAPIData(endpoint) {
  showSpinner();
  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

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
      displayPopularMovies();
      break;
    case routes.SHOWS:
      displayPopularTVShows();
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
