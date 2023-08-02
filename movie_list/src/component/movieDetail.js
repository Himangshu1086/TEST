import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


function MovieDetail() {

    const {id} = useParams();
    const apiKey = "9815f55";
    const [movie , setMovie] = useState('')
    const [loading , setLoading] = useState(true)
    const fetchMovies = async() =>{
        try{
            const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
            const response = await fetch(url)
            const data = await response.json()
            setMovie(data)
            setLoading(false)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    useEffect( ()=>{
        fetchMovies();
    },[])

    console.log(movie)
    if(loading)
    return  <h2 className='heading'>LOADING...</h2>





  return (
    <div>
        <div id="movieDetails">
        <div class="movie_img">
            <img id="moviePoster" src={movie.Poster} alt="Movie Poster"/>
            <h2 id="movieTitle"></h2>
        </div>
        <div class="movie_details">
            <h3 style={{display: 'flex'}}>Year: <span id="movieYear">{movie.Title}</span></h3>
        <h4>Genre: <span id="movieYear">{movie.Genre}</span></h4>
        <p><b>Plot: </b> <span id="movieYear">{movie.Plot}</span></p>
        <p><b>Rating: </b><span id="movieYear">{movie.imdbRating}</span></p>
        <p><b>Year: </b><span id="movieYear">{movie.Year}</span></p>
        <p><b>Director: </b> <span id="movieYear">{movie.Director}</span></p>
        <p><b>Actors: </b><span id="movieYear">{movie.Actors}</span></p>
        <p><b>Box Office: </b><span id="movieYear">{movie.BoxOffice}</span></p>

        <p><b>Country: </b> <span id="movieYear">{movie.Country}</span></p>
        <p><b>Language: </b><span id="movieYear">{movie.Language}</span></p>
        <p><b>Rated: </b><span id="movieYear">{movie.Rated}</span></p>
        <p><b>Runtime: </b> <span id="movieYear">{movie.Runtime}</span></p>
        <p><b>Writer: </b><span id="movieYear">{movie.Writer}</span></p>
        <p><b>Votes: </b><span id="movieYear">{movie.imdbVotes}</span></p>

        <div>
            <label for="rating"></label>
            <select id="rating" >
                <option value="">Give Rating</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
        </div>
        <div>
            <label for="comment">Your Comment: </label>
            <textarea id="comment" rows="4" cols="30" onchange="saveComment()"></textarea>
            <button onClick="submitRatingAndComment()">Submit</button>
        </div>
        </div>
    </div>
    </div>
  )
}

export default MovieDetail




