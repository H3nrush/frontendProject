import { useEffect, useState } from "react";
import Header from "../../components/guest/Header";
import './style/homePage/style.css'
import { Link, useNavigate } from "react-router-dom";

function HomePage(){
  const [Movies , setMovies] = useState(null);

  useEffect(()=>{
    (async () =>{
      const MoviesRespond = await fetch("http://localhost:8080/api/Movies");

      const MoviesRespondData = await MoviesRespond.json();
      setMovies(MoviesRespondData);
    })();
  },[]);
  const [isUser , setIsUser] = useState(false);
const navigat = useNavigate();
useEffect(()=>{
  const token = localStorage.getItem('jwt');
  if(token){
    setIsUser(true)
  }


},[navigat]);

  return(<>
        <Header />
      {Movies ? (
      <div className="div-allMovies">
        {Movies.map((movie)=>{
          return(
            <div className="movie-box">
            {isUser ? (<div><Link to={`/Movie/Details/${movie.id}`}><img src={movie.moviesPoster} alt={movie.moviesName}/></Link></div>) : (<div><Link to="/Login"><img src={movie.moviesPoster} alt={movie.moviesName}/></Link></div>)}
              <p>{movie.moviesName}</p>
            </div>
          );
        })}
      </div>
      ) : (
        <p>Loading...!</p>
      )}
  </>)
}
export default HomePage;