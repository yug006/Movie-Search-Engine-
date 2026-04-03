const inputBox = document.querySelector("#input-box");
const searchBtn = document.querySelector("#search-btn");

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

  movies.forEach((movie) => {
    let card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `<img class="movie-img" src="${movie.Poster}" alt="movie-logo">
    <div class="movie-info">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    </div>`;

    movieGrid.appendChild(card);
  });
};
