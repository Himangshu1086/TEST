import React from "react";
import { Link } from 'react-router-dom'



function DisplayMovie({ movie }) {

  if(!movie || movie.length === 0)
  return <>No Movie Found</>


  return (
    <div className="movieContainer">
      {movie.map((mov) => {
        return (
          <Link to={`/movie/${mov.imdbID}`}>
            <div className="movieBox">
              <img className="movieImg" src={mov.Poster} alt={mov.Title} />
              <h3 className="movieTitle">{mov.Title}</h3>
            </div>
          </Link>
        );
      })}

    </div>
  );
}

export default DisplayMovie;
