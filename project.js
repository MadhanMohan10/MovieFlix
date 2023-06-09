const API_KEY = 'api_key=c521298dcd6b4625968925fc0f5cd547';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searc_URL = BASE_URL + '/search/movie?' + API_KEY;
const userCardTemplate = document.querySelector("[data-user-template]");
const searchBar = document.querySelector("[data-search]");
const movieContainer = document.querySelector("[data-movie-container]");

let movies = [];
let url = API_URL;

searchBar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    if (value === '' || value === undefined){
        url = API_URL;
        movieContainer.innerHTML = ``;
        fet(url);
    } else{
        url = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${value}&include_adult=false`;
        movieContainer.innerHTML = ``;
        fet(url);
    }
    console.log(url);
});

function fet(url){
   
    fetch(url)
    .then(response => response.json())

    .then(data => {   
            console.log(data);
            movies = data.results.map(movie => {  
                const movieCard = userCardTemplate.content.cloneNode(true).children[0];
                console.log(movieCard);

                const title = movieCard.querySelector("[data-title]");
                const image = movieCard.querySelector("[data-movie-img]");
                const rd = movieCard.querySelector("[data-rd]");
                const rate = movieCard.querySelector("[data-rate]");
                const overview = movieCard.querySelector("[data-over]");
                const movtitle = movieCard.querySelector("[movie-title]");
                const gen = movieCard.querySelector("[genre]");

                title.textContent = movie.original_title;
                image.src = `${IMG_URL+movie.poster_path}`;

                movieCard.addEventListener('dblclick', () => {
                    movtitle.textContent = movie.title;
                    gen.textContent = ' Genre : '+getGenres(movie.genre_ids);
                    rd.textContent = ' Release Date : '+movie.release_date;
                    rate.textContent = ' Rating : '+movie.vote_average;
                    overview.textContent = ' Overview : '+movie.overview;
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
                return{title1: movie.title, title2: movie.id, element: movieCard}; 
        });
        console.log(movies);
    });

};
fet(url);


function displayMovieDetails(_movie) {
    const val1 = _movie.title;
    const val2 = _movie.id;
    console.log(val1);
    console.log(val2);
    let Visible;
    movies.forEach(movie => {
        if(val1 == movie.title1 && val2 == movie.title2){ Visible= true;}
        else{Visible = false;}
        movie.element.classList.toggle("hide", !Visible);
    });
    
    
};

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
  
    const genreNames = genreIds.map(id => genres[id]);
    return genreNames.join(', ');
  }

