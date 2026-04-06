const inputBox = document.querySelector("#input-box");
const searchBtn = document.querySelector("#search-btn");
const dropdown = document.querySelector("#dropdown");
const modalOverlay = document.querySelector(".modal-overlay");
const movieGrid = document.querySelector(".movie-grid");
modalOverlay.style.display = "none";


modalOverlay.addEventListener("click",(e)=>{

if(e.target == modalOverlay){
  modalOverlay.style.display = "none"
}

})


inputBox.addEventListener("input", () => {
  let query = inputBox.value.trim();
  if (query == "") {
    dropdown.innerHTML = "";
    return;
  } else {
    fetchSuggestion(query);
  }
});

const fetchSuggestion = async (query) => {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=256ef16b`,
  );
  const data = await response.json();


dropdown.innerHTML =  ""
if(data.Search){




data.Search.forEach(movie=>{

let p = document.createElement("p")

p.innerHTML = movie.Title

dropdown.appendChild(p)

p.addEventListener("click",()=>{

  inputBox.value = p.textContent
  dropdown.innerHTML = ""
   fetchMovies()

})



})

}


};

const fetchMovies = async () => {
  const movieName = inputBox.value.trim();

  const response = await fetch(
    `https://www.omdbapi.com/?s=${movieName}&apikey=256ef16b`,
  );
  const data = await response.json();

  displayMovies(data.Search);

};

searchBtn.addEventListener("click", fetchMovies);

const displayMovies = (movies) => {
  movieGrid.innerHTML = "";
console.log(movies)
  if (movies) {
    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

 card.dataset.id = movie.imdbID;


   card.addEventListener("click",()=>{

  let imdbID =  card.dataset.id

   fetchMovieDetails(imdbID)

   })

      card.innerHTML = `<img class="movie-img" src="${movie.Poster}" alt="movie-logo">
  <div class="movie-info">
  <h3>${movie.Title}</h3>
  <p>${movie.Year}</p>
  </div>`;

      movieGrid.appendChild(card);
    });
  }
};


const fetchMovieDetails = async (id) =>{
  let response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=256ef16b`)
  let data = await response.json()
  modalOverlay.style.display = "flex"

  document.querySelector("#modal-details").innerHTML = `
   <h2>${data.Title}</h2>
    <p>⭐imdbRating: ${data.imdbRating}</p>
    <p>📅Year: ${data.Year}</p>
    <p>🎬Director: ${data.Director}</p>
    <p>🕐Release Date: ${data.Runtime}</p>
    <p>📖Plot: ${data.Plot}</p>
`
document.querySelector("#modal-poster").src = data.Poster

} 
