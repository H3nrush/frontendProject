import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import './style/style.css'

function Action(){

  const [Movies , setMovies] = useState(null);
 

  useEffect(()=>{
    (async () =>{
      const MoviesRespond = await fetch("http://localhost:8080/api/Movies");

      const MoviesRespondData = await MoviesRespond.json();
      setMovies(MoviesRespondData);
    })();
  },[]);


  return(
    <>
    <Header />
      <div className="divGenre">
      {Movies ? (
      <>
        {Movies.map((movies)=>{
          return(
            <>
            {movies.moviesGenre.includes(`Action`)  && (
            
                <div className="divGenreMovies">
            
              <Link to={`/Movie/Details/${movies.id}`}><div className="img-div-genre"><img src={movies.moviesPoster} alt={movies.moviesName} /></div></Link>
            
              <p>{movies.moviesName}</p>
             </div>
            )}
            </>
          );
        })}
      </>
      ) : (
        <p>Loading...!</p>
      )}
      </div>
    </>
  )
}
export default Action;