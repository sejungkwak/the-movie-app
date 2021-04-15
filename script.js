const list = document.getElementById('list');
const search = document.getElementById('search');
var apiKey = config.API_KEY;

displayMovie()
search.addEventListener('keyup', searchMovie);

async function displayMovie() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  const data = await res.json();
  const movies = data.results;
  movies.forEach(movie => {
    list.innerHTML += `
      <div class="card">
        <div class="image" style="background-image: url(https://image.tmdb.org/t/p/w500${movie.poster_path});"></div>
        <div class="text">
            <div class="title">${movie.title}</div>
            <div class="rating">${movie.vote_average}</div>
        </div>
        <div class="overview">
          <h4>Overview</h4>
          <p>${movie.overview}</p>
        </div>
      </div>
    `
  }) 
  setTimeout(() => {
    changeRatingColour()
    changeOverviewStatus()
  }, 100)
}

async function searchMovie() {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search.value}`)
  const data = await res.json();
  const results = data.results;
  list.innerHTML = '';
  results.forEach(movie => {
    list.innerHTML += `
    <div class="card">
    <div class="image" style="background-image: url(https://image.tmdb.org/t/p/w500${movie.poster_path});"></div>
    <div class="text">
        <div class="title">${movie.title}</div>
        <div class="rating">${movie.vote_average}</div>
    </div>
    <div class="overview">
      <h4>Overview</h4>
      <p>${movie.overview}</p>
    </div>
  </div>
    `
  })
  setTimeout(() => {
    changeRatingColour()
    changeOverviewStatus()
  }, 100)
  
}

function changeRatingColour() {
  const ratings = document.querySelectorAll('.rating');
  ratings.forEach(rating => {
    if ( rating.innerText >= 8 ) rating.style.color = '#00b8a9';
    if ( rating.innerText < 8 && rating.innerText >= 5 ) rating.style.color = '#f9ed69';
  })
}

function changeOverviewStatus() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mouseover', showOverview);
    card.addEventListener('mouseout', hideOverview);
  })
}

function showOverview() {
  this.lastElementChild.classList.add('show');
}

function hideOverview() {
  this.lastElementChild.classList.remove('show');
}
