

/*
- Fetch the list of movies from the API using useEffect **
- Use routing to create the likes pages 
- Add filter based on year **
- Add search option which will directly call the API **
- Structure of component is important **

- Add pagination with the current page and 
    the next 2 pages being cached (stored on the local machine) and only call the API 
    if the next page is not cached


- If a filter and pagination is done together then the result 
    should take both of them into account **


- Give the option to edit movie details and store that into localStorage 
    and while loading from the API check if its already available in 
    localStorage then skip the API


- Option to like and remove the like of the movies



*/


import Movie from './component/movie'

function App() {
  return (
        <>
        <Movie/>
        </>
  );
}

export default App;
