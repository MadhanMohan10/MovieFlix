const API_KEY = 'api_key=c521298dcd6b4625968925fc0f5cd547';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searc_URL = BASE_URL + '/search/movie?' + API_KEY;
const userCardTemplate = document.querySelector("[data-user-template]");
const searchBar = document.querySelector("[data-search]");
const movieContainer = document.querySelector("[data-movie-container]");

let movies = [];

searchBar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    movies.forEach(movie => {
        const isVisible = movie.title.toLowerCase().includes(value);
        movie.element.classList.toggle("hide", !isVisible);
    });
});



fetch(API_URL)
    .then(response => response.json())

    .then(data => {   
            movies = data.results.map(movie => {       
            const movieCard = userCardTemplate.content.cloneNode(true).children[0];
            console.log(movieCard);
            const title = movieCard.querySelector("[data-title]");
            const image = movieCard.querySelector("[data-movie-img]");
            title.textContent = movie.original_title;
            image.src = `${IMG_URL+movie.poster_path}`;
            movieContainer.append(movieCard);
            return{title: movie.original_title, element: movieCard}; 
        });
    })
