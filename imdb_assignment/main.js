const apiKey = 'e19aeb14';
const moviesPerPage = 10;
let currentPage = 1;
let totalResults = 0;

// Initial fetch when the page loads
fetchMovies('hello', 1);

//Fetch api
function fetchMovies(searchText = '', page = 1) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchText}&page=${page}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.Search);
            totalResults = data.totalResults;
            updatePagination();
        })
        .catch(error => console.error('Error fetching movies:', error));
}


// Listing of Movies from API list
function displayMovies(movies) {
    const movieListElement = document.getElementById('movieList');
    movieListElement.innerHTML = '';
    if (!movies || movies.length === 0) {
        movieListElement.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title} Poster">
                    <h3>${movie.Title}</h3>
                `;
        movieElement.addEventListener('click', () => showMovieDetails(movie.imdbID));
        movieListElement.appendChild(movieElement);
    });
}



function updatePagination() {
    const paginationElement = document.getElementById('pagination');
    const totalPages = Math.ceil(totalResults / moviesPerPage);

    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button onclick="goToPage(${i})">${i}</button>`;
    }
    paginationElement.innerHTML = paginationHTML;
}



function goToPage(page) {
    currentPage = page;
    const searchText = document.getElementById('search').value;
    fetchMovies(searchText, currentPage);
}

document.getElementById('search').addEventListener('input', () => {
    currentPage = 1;
    const searchText = document.getElementById('search').value;
    fetchMovies(searchText, currentPage);
});

function showMovieDetails(movieId) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;
    fetch(url)
        .then(response => response.json())
        .then(movieData => {

            document.getElementById('movieTitle').textContent = movieData.Title;
            document.getElementById('moviePoster').src = movieData.Poster;
            document.getElementById('movieYear').textContent = movieData.Year;
            document.getElementById('movieGenre').textContent = movieData.Genre;
            document.getElementById('moviePlot').textContent = movieData.Plot;

            // Set the movieId in the data attribute of the movieDetails element
            document.getElementById('movieDetails').dataset.movieId = movieId;
            document.getElementById('movieDetails').style.display = 'flex';
            // Load existing user rating and comment from local storage
            const savedRating = localStorage.getItem(`rating_${movieId}`);
            const savedComment = localStorage.getItem(`comment_${movieId}`);

            // Set the rating and comment in the UI if they exist
            const ratingSelect = document.getElementById('rating');
            const commentTextarea = document.getElementById('comment');

            if (savedRating) {
                ratingSelect.value = savedRating;
            } else {
                ratingSelect.value = ""; // Set to default when there's no saved rating
            }

            if (savedComment) {
                commentTextarea.value = savedComment;
            } else {
                commentTextarea.value = ""; // Set to default when there's no saved comment
            }

        })
        .catch(error => console.error('Error fetching movie details:', error));
}

function saveRating() {
    const movieId = document.getElementById('movieDetails').dataset.movieId;
    const rating = document.getElementById('rating').value;
    localStorage.setItem(`rating_${movieId}`, rating);
    window.location.reload()
}

function saveComment() {
    const movieId = document.getElementById('movieDetails').dataset.movieId;
    const comment = document.getElementById('comment').value;
    localStorage.setItem(`comment_${movieId}`, comment);
}
function submitRatingAndComment() {
    saveRating();
    saveComment();
    alert("Rating and comment submitted successfully!");
}