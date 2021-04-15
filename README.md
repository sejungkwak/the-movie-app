# The Movie App

![screen recording](https://media.giphy.com/media/iSpSS04OXxAxlnf5W8/giphy.gif)

#### project notes

1. HTML

- navbar: search on the right
- container: flex (5 divs in a row at max-width 1400)
- div: 80% poster + 20% title + rate on the right side
- footer includes "This product uses the TMDb API but is not endorsed or certified by TMDb."

2. CSS

- card:hover shows overview
- rating > 8: green, > 5 && < 8: orange, > 5: red

3. JavaScript

- fetch api themoviedb.org (https://api.themoviedb.org/3/movie/top_rated?api_key=<<apikey>>)
- search function
- card mouseover event listener
- change rating text colour

* Challenge from Brad Traversy & Florin Pop on Udemy '50 Projects in 50 Days'

#### Takeaways from the instructor

1. HTML

- header, not nav
- form wrapping input
- img tag, not div with background-img (can add alt)

2. CSS

- overview to hide: `max-height: 100%; transform: translateY(101%)`
- movie:hover .overview: `transform: translateY(0)`

3. JavaScript

```
const API_URL = 'https://api/themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=...';
const IMG_PATH = 'https://image/tmbd.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=...&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach(movie => {
    const { title, poster_path, vote_everage, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `
    main.appendChild(movieEl)
  })
}

function getClassByRate(vote) {
  if ( vote >= 8 ) {
    return 'green'
  } else if ( vote >= 5 ) {
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if ( searchTerm && searchTerm !== '' ) {
    getMovie(SEARCH_API + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})
```
