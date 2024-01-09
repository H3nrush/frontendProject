import { useEffect, useState } from "react";
import Header from "../../../components/guest/Header";
import { useNavigate } from "react-router-dom";
function Fantasy(){
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
      <>
      Movies page
      <h1>List Of the Movies:</h1>
      {Movies ? (
      <>
        {Movies.map((movies)=>{
          return(
            <>
            {movies.moviesGenre.includes(`Fantasy`)  && (
              <p>{movies.moviesName}</p>
            )}
            </>
          );
        })}
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
export default Fantasy;