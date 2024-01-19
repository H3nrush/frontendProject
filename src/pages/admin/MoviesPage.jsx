import { useEffect, useState } from "react";
import Header from "../../components/Header";
import './style/MoviesPage/style.css'
import { Link, useNavigate } from "react-router-dom";
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

    setIsAdmin(jwtDecode(token).RoleId)
    if(isAdmin === 3){
      navigat('/')
    }

  },[navigat,isAdmin]);

  const handleDeleteMovie = async(movieId,movieName)=>{
    const token = localStorage.getItem('jwt')
    const roleId = await jwtDecode(token);
    if(!roleId.RoleId === 2){
      return navigat('/')
    }
    const adminConfirm = window.confirm(`are you sure that you wanna delete this movie ( ${movieName} ) ?`)
    if(adminConfirm){

      try {
        const response = await fetch(`http://localhost:8080/api/Movies/${movieId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          // Update the state to remove the deleted movie
          setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
          alert('movie is deleted :( ')
        } else {
          console.error('Failed to delete the movie.');
        }
      } catch (error) {
        console.error('Error occurred during movie deletion:', error);
      }

    }
  }


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
              
                <div className="eachMoviesEdit" key={movies.id}>
<div><img src={movies.moviesPoster} alt={movies.moviesName} /></div>
<p>{movies.moviesName}</p>
<div className="eachMovieBTN">
<Link to={`/EditMovies/EditeMovie/${movies.id}`} ><button className="btnEdite">edite</button></Link>
<button className="btnDelete" onClick={() => handleDeleteMovie(movies.id,movies.moviesName)}>delete</button>
                  </div>
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