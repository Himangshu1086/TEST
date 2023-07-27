const apiKey = '9815f55';
const moviesPerPage = 10;
let totalResults = 0;
let page = 1

// Initial fetch when the page loads
fetchMovies('hello',page);



//Fetch api
function fetchMovies(searchText, page=1) {
    
    console.log(page)
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchText)}&apiKey=${apiKey}&page=${page}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayMovies(data.Search);
            const totalResults = data.totalResults
            updatePagination(totalResults);
            
        })
        .catch(error => console.error('Error fetching movies:', error));
}




// Listing of Movies from API list
function displayMovies(movies) {
    const movieListElement = document.getElementById('movieList');
    movieListElement.innerHTML = '';
    if (!movies || movies.length === 0) {
        movieListElement.innerHTML = '<div class="no_movie"><p>No movies found.</p></div>';
        return;
    }
   

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title} Poster">
                    <h3>${movie.Title}</h3>`;
        
        movieElement.addEventListener('click', () => showMovieDetails(movie.imdbID));
        movieListElement.appendChild(movieElement);
    });
}



function updatePagination(totalResults) {
    const paginationElement = document.getElementById('pagination');
    const totalPages = Math.ceil(totalResults / moviesPerPage);

    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button onClick ="goToPage(${i})">${i}</button>`;
    }
    paginationElement.innerHTML = paginationHTML;
    if(page==1)
            {
                const prevBtn = document.getElementById("prevBtn");
                prevBtn.disabled = true;
            }
            else if(page==totalPages)
                nextBtn.disabled = true;
            else{
                prevBtn.disabled = false;
                nextBtn.disabled = false;   
            }
     const pageDetail = document.getElementById("pageDetail");
    pageDetail.innerHTML = `Showing ${page} of ${totalPages} pages`
}


function goToPage(currentPage) {
    page = currentPage;
    console.log(page)
    const searchText = document.getElementById('search').value.trim();
    fetchMovies(searchText, page);
}

document.getElementById('search').addEventListener('input', () => {
    page = 1;
    const searchText = document.getElementById('search').value;
    fetchMovies(searchText, page);
});



const showNextPage = () => {
    page += 1

    const searchText = document.getElementById('search').value.trim();
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchText)}&apiKey=${apiKey}&page=${page}`)
        .then(result => result.json())
        .then(data => {
            movies = data.Search
            fetchMovies(searchText, page);
        })
}


const showPreviousPage = () => {
    if(page>1)
        page -= 1
    else
        page=1
    const searchText = document.getElementById('search').value.trim();
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchText)}&apiKey=${apiKey}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            movies = data.Search
            fetchMovies(searchText, page);
        })
}





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

            const rate = localStorage.getItem(`rating_${movieId}`)
            let star = ''
            if(rate==1) star = `⭐`
            if(rate==2) star = `⭐⭐`
            if(rate==3) star = `⭐⭐⭐`
            if(rate==4) star = `⭐⭐⭐⭐`
            if(rate==5) star = `⭐⭐⭐⭐⭐`
            document.getElementById('show_rating').innerHTML = star
            document.getElementById('show_comment').innerHTML = localStorage.getItem(`comment_${movieId}`)
        })
        .catch(error => console.error('Error fetching movie details:', error));
}



function submitRatingAndComment() {
    const movieId = document.getElementById('movieDetails').dataset.movieId;
    const rating = document.getElementById('rating').value;
    if(!rating)
        return alert("rating is empty!")
    
    const comment = document.getElementById('comment').value;
    if(!comment)
        return alert("Please type comment!")

    localStorage.setItem(`rating_${movieId}`, rating);
    localStorage.setItem(`comment_${movieId}`, comment);
    return alert("Rating and comment submitted successfully!");
}














