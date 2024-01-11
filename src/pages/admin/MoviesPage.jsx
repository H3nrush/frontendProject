import { useEffect, useState } from "react";
import Header from "../../components/Header";
import './style/MoviesPage/style.css'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function MoviesPage(){
  const navigat = useNavigate();
  const [Movies , setMovies] = useState(null);
  const [isAdmin , setIsAdmin] = useState('');

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

    setIsAdmin(jwtDecode(token))
    if(isAdmin.RoleId !== 1){
      navigat('/')
    }

  },[navigat,isAdmin]);

  return(
    <>
    <Header />
    {isUser ? (
      <>
      {Movies ? (
      <>
      <div id="allMoviesEdit">
        {Movies.map((movies)=>{
          return(
              
                <div className="eachMoviesEdit">
                  <div><img src={movies.moviesPoster} alt={movies.moviesName} /></div>
                  <p>{movies.moviesName}</p>
                </div>
              
          );
        })}
        </div>
      </>
      ) : (
        <p>Loading...!</p>
      )}
      </>
      ):(
       <h1>Please Login .. !</h1>
      )}
    </>
  )
}
export default MoviesPage;