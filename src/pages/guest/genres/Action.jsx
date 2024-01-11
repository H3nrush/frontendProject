import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import './style/style.css'
function Action(){
  const navigat = useNavigate();
  const [Movies , setMovies] = useState(null);

  useEffect(()=>{
    (async () =>{
      const MoviesRespond = await fetch("http://localhost:8080/api/Movies");

      const MoviesRespondData = await MoviesRespond.json();
      setMovies(MoviesRespondData);
    })();
  },[]);
  const [isUser , setIsUser] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('jwt');
    if(token){
      setIsUser(true)
    }
    if(!token){
      setTimeout(function(){
        navigat("/Login")
      },2000)
    }

  },[navigat]);

  return(
    <>
    <Header />
    {isUser ? (
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
      ):(
        <div className="divGenre"><h1>Please Login .. !</h1></div>
      )}
    </>
  )
}
export default Action;