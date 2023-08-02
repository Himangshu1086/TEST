import React, { useContext, useEffect, useState } from "react";
import DisplayMovie from "./displayMovie";
import { MovieContext } from "./movieContext";

export default function Movie() {
    // const {movie} = useContext(MovieContext)
    
    const moviesPerPage = 10
    const apiKey = "9815f55";
    const [searchText, setSearchText] = useState("hello");
    const [filterResult , setFilterResult] = useState('');
    const [filter , setFilter] = useState('');
    const [loading , setLoading] = useState(true)
    const [page , setPage] = useState(1);
    const [totalResults , setTotalResults] = useState(1)
    const fetchMovies = async() =>{
        try{
            const url = `https://www.omdbapi.com/?s=${searchText}&apiKey=${apiKey}&page=${page}&y=${filter}`;
            const response = await fetch(url)
            const data = await response.json()
            if(data)
            {
                setFilterResult(data.Search)
                console.log(data.totalResults)
                setTotalResults(data.totalResults)
                setLoading(false)
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    
    useEffect( ()=>{
        fetchMovies();
    },[page,searchText,filter])
    
    let totalPages = 0
    !totalResults ? totalPages = 0 : totalPages = Math.ceil(totalResults / moviesPerPage);

    const handleFilter = (e) =>{
        setFilter(e.target.value);
    }




    const handleSearch = (e) =>{
        setSearchText(e.target.value)
    }



    const showPreviousPage = () => {
        if(page>1)
            setPage(page-1);
        else
            setPage(1)
    };
    const showNextPage = () => {
        if(page < totalPages)
            setPage(page+1);
    };

    const handlePagination = (i)=>{
        setPage(i)
    }
    

    
    if(loading)
    return  <h2 className='heading'>LOADING...</h2>

    console.log(page ,totalResults , totalPages, filterResult)
    
    

  return (
    <div>
        <h1 className="heading">Movie App</h1>
        <div>
            <label for="rating">Filter on Year: </label>
            <input type="text" value={filter} onChange={handleFilter}/>
        </div>
        <div>
            <label for="rating">Search: </label>
            <input type="text" value={searchText} onChange={handleSearch}/>
        </div>        
        <DisplayMovie movie = {filterResult}/>


        <div className="pagination">
          <button onClick = {showPreviousPage} id="prevBtn">
            &lt; Previous
          </button>
          <div id="pagination">
            {
                [...Array(totalPages)].map((e, i) => <button key={i} onClick={() => handlePagination(i+1)} >{i+1}</button>)
            }
            </div> 
           

          <button onClick = {showNextPage} id="nextBtn">
            Next &gt;
          </button>
          <span id="pageDetail">Showing {page} of {!totalPages ? 1: totalPages} page</span>
        </div>

    </div>
  );
}
