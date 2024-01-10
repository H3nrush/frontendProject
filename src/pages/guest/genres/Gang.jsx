import { useEffect, useState } from "react";
import Header from "../../../components/guest/Header";
import { Link, useNavigate } from "react-router-dom";
function Gang(){
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
            {movies.moviesGenre.includes(`Gang`)  && (
             <div className="divGenreMovies">
             <Link to={`/Movie/Details/${movies.id}`}><img src={movies.moviesPoster} alt={movies.moviesName} /></Link>
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
export default Gang;