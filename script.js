const inputBox = document.querySelector("#input-box");
const searchBtn = document.querySelector("#search-btn");
const dropdown = document.querySelector("#dropdown");
const modalOverlay = document.querySelector(".modal-overlay");

modalOverlay.style.display = "none";

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

searchBtn.addEventListener("click", fetchMovie);

async function fetchMovie() {
  movieName = inputBox.value.trim();

  let response = await fetch(
    `https://www.omdbapi.com/?s=${movieName}&apikey=256ef16b`,
  );

  let data = await response.json();

  displayMovies(data.Search);
}

const displayMovies = (movies) => {
  let movieGrid = document.querySelector(".movie-grid");
  movieGrid.innerHTML = "";

  if (movies) {
    movies.forEach((movie) => {
      let card = document.createElement("div");
      card.classList.add("movie-card");
      card.dataset.id = movie.imdbID;

      card.addEventListener("click", () => {
        let movieId = card.dataset.id;

        modalOverlay.style.display = "flex";

        fetchMovieDetail(movieId);
      });

      card.innerHTML = `<img class="movie-img" src="${movie.Poster}" alt="movie-logo">
    <div class="movie-info">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    </div>`;

      movieGrid.appendChild(card);
    });
  } else {
    console.log("wrong input");
  }
};

const fetchMovieDetail = async (movieId) => {
  const img = document.querySelector("#modal-poster");
  const response = await fetch(
    `https://www.omdbapi.com/?i=${movieId}&apikey=256ef16b`,
  );

  const data = await response.json();
  console.log(data);

  document.querySelector("#modal-details").innerHTML = `
   <h2>${data.Title}</h2>
    <p>⭐imdbRating: ${data.imdbRating}</p>
    <p>📅Year: ${data.Year}</p>
    <p>🎬Director: ${data.Director}</p>
    <p>🕐Release Date: ${data.Runtime}</p>
    <p>📖Plot: ${data.Plot}</p>


`;
  img.src = data.Poster;
};

inputBox.addEventListener("input", () => {
  let query = inputBox.value.trim();

  if (query == "") {
    dropdown.innerHTML = "";
    return;
  }

  fetchSuggestion(query);
});

const fetchSuggestion = async (query) => {
  const div = document.querySelector("#dropdown");
  div.innerHTML = "";
  let response = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=256ef16b`,
  );
  let data = await response.json();

  if (data.Search) {
    data.Search.forEach((movie) => {
      let p = document.createElement("p");
      p.innerHTML = movie.Title;

      div.appendChild(p);
      p.addEventListener("click", () => {
        inputBox.value = p.textContent;
        div.innerHTML = "";
        fetchMovie();
      });
    });
  } else {
    console.log("wrong input");
  }
};
