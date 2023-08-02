import React, { createContext, useEffect, useState } from 'react'

const MovieContext = createContext();

function MovieProvider({children}) {
    const apiKey = "9815f55";
    let page = 1;
    const [searchText, setSearchText] = useState("hello");

    const [movie , setMovie] = useState('')
    const [loading , setLoading] = useState(true)
    const fetchMovies = async() =>{
        try{
            const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchText)}&apiKey=${apiKey}&page=${page}`;
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

    if(loading)
    return  <h2 className='heading'>LOADING...</h2>

  return (
    <MovieContext.Provider value={{movie}}>
        {children}
    </MovieContext.Provider>
  )
}

export  { MovieContext , MovieProvider }