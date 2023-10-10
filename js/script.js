import { API_KEY, API_URL, IMAGE_PATH, OVERLAY_PATH } from "../secret.js";
const global = {
  currenthPath: window.location.pathname,
};

// display popular movies list
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

// display popular tv shows list
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

//display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieId}`);
  const div = document.createElement("div");

  // overlay for background image
  displayBackgroundImage("movie", movie.backdrop_path);

  div.innerHTML = `
  <div class="details-top">
          <div>
          <img
          src=${
            movie.poster_path
              ? IMAGE_PATH + movie.poster_path
              : "images/no-image.jpg"
          }
          class="card-img-top"
          alt=${movie.title}
        />
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)}/ 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href=${
              movie.homepage
            } target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${moneyFormat(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${moneyFormat(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>
  `;
  document.querySelector("#movie-details").appendChild(div);
}

//display show details
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchAPIData(`tv/${showId}`);
  const div = document.createElement("div");

  console.log(show);

  // overlay for background image
  displayBackgroundImage("show", show.backdrop_path);

  div.innerHTML = `
  <div class="details-top">
          <div>
          <img
          src=${
            show.poster_path
              ? IMAGE_PATH + show.poster_path
              : "images/no-image.jpg"
          }
          class="card-img-top"
          alt=${show.name}
        />
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)}/ 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>${show.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href=${
              show.homepage
            } target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> $${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Last Episode to Air:</span> ${
              show.last_episode_to_air.name
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>
  `;
  document.querySelector("#show-details").appendChild(div);
}

// display details pages background
function displayBackgroundImage(type, backgroudPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url("${OVERLAY_PATH}/${backgroudPath}")`;
  overlayDiv.classList.add("overlay");
  switch (type) {
    case "movie":
      document.querySelector("#movie-details").appendChild(overlayDiv);
      break;
    case "show":
      document.querySelector("#show-details").appendChild(overlayDiv);
      break;
  }
}

// add commas to money
function moneyFormat(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
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
        <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
              1
            )}/ 10
        </h4>
    `;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// fetches data from an API endpoint
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
  SHOW_DETAILS: "/tv-details.html",
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
      displaySlider();
      break;
    case routes.SHOWS:
      displayPopularTVShows();
      break;
    case routes.MOVIE_DETAILS:
      displayMovieDetails();
      break;
    case routes.SHOW_DETAILS:
      displayShowDetails();
      break;
    case routes.SEARCH:
      console.log("Search");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
