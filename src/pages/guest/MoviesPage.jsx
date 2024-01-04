import { useEffect, useState } from "react";
import Header from "../../components/guest/Header";
import Login from "./Login";

function MoviesPage(){
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
  },[]);

  return(
    <>
    <Header />
    {isUser ? (
      <>
      Movies page
      <h1>List Of the Movies:</h1>
      {Movies ? (
      <>
        {Movies.map((serie)=>{
          return(
            <article>
              <h2>{serie.moviesName}</h2>
              <iframe width="560" height="315" src={serie.moviesUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </article>
          );
        })}
      </>
      ) : (
        <p>Loading...!</p>
      )}
      </>
      ):(
        <>
          <Login />
        </>
      )}
    </>
  )
}
export default MoviesPage;