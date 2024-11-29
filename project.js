const API_KEY = 'api_key=c521298dcd6b4625968925fc0f5cd547';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const userCardTemplate = document.querySelector("[data-user-template]");
const searchBar = document.querySelector("[data-search]");
const genreSelect = document.getElementById('genre-select');
const movieContainer = document.querySelector("[data-movie-container]");

let movies = [];

function fetchMovies() {
    const searchText = searchBar.value.toLowerCase();
    const selectedGenre = genreSelect.value;
    let url = API_URL;

    if (selectedGenre && searchText) {
        url = `${BASE_URL}/search/movie?${API_KEY}&query=${searchText}&include_adult=false&with_genres=${selectedGenre}`;
    } else if (selectedGenre) {
        url = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=${selectedGenre}&sort_by=popularity.desc`;
    } else if (searchText) {
        url = `${BASE_URL}/search/movie?${API_KEY}&query=${searchText}&include_adult=false`;
    }

    movieContainer.innerHTML = ``;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            movies = data.results.map(movie => {
                const movieCard = userCardTemplate.content.cloneNode(true).children[0];
                
                const title = movieCard.querySelector("[data-title]");
                const image = movieCard.querySelector("[data-movie-img]");
                const rd = movieCard.querySelector("[data-rd]");
                const rate = movieCard.querySelector("[data-rate]");
                const overview = movieCard.querySelector("[data-over]");
                const movtitle = movieCard.querySelector("[movie-title]");
                const gen = movieCard.querySelector("[genre]");

                title.textContent = movie.original_title;
                image.src = `${IMG_URL + movie.poster_path}`;

                movieCard.addEventListener('dblclick', () => {
                    movtitle.textContent = movie.title;
                    gen.textContent = ' Genre : ' + getGenres(movie.genre_ids);
                    rd.textContent = ' Release Date : ' + movie.release_date;
                    rate.textContent = ' Rating : ' + movie.vote_average;
                    overview.textContent = ' Overview : ' + movie.overview;
                    displayMovieDetails(movie);
                });

                movieCard.addEventListener('click', () => {
                    movtitle.textContent = '';
                    gen.textContent = '';
                    rd.textContent = '';
                    rate.textContent = '';
                    overview.textContent = '';
                    movies.forEach(movie => {
                        movie.element.classList.remove("hide");
                    });
                });

                movieContainer.append(movieCard);
                return { title1: movie.title, title2: movie.id, element: movieCard }; 
            });
        });
}

function displayMovieDetails(_movie) {
    const val1 = _movie.title;
    const val2 = _movie.id;

    movies.forEach(movie => {
        const Visible = (val1 === movie.title1 && val2 === movie.title2);
        movie.element.classList.toggle("hide", !Visible);
    });
}

function getGenres(genreIds) {
    const genres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };
  
    return genreIds.map(id => genres[id]).join(', ');
}

searchBar.addEventListener("input", fetchMovies);
genreSelect.addEventListener("change", fetchMovies);

fetchMovies();
