import { useEffect, useState } from "react";
import Header from "../../components/Header";
import './style/homePage/style.css';
import './style/homePage/loading/style.css'
import { Link, useNavigate } from "react-router-dom";

function HomePage(){
  const [Movies , setMovies] = useState(null);
  const token = localStorage.getItem('jwt')
  const [isUser , setIsUser] = useState(false);
  const navigat = useNavigate();


  useEffect(()=>{
 
    if(token){
      setIsUser(true)
    }
  },[navigat,token]);


  useEffect(()=>{
    (async () =>{
      const MoviesRespond = await fetch("http://localhost:8080/api/Movies");

      const MoviesRespondData = await MoviesRespond.json();
      setMovies(MoviesRespondData);
    })();
  },[]);



  return(<>
        <Header />
      {Movies ? (
      <div className="div-allMovies">
        {Movies.map((movie)=>{
          return(
            <div className="movie-box" key={movie.id}>
            {isUser ? (<div><Link to={`/Movie/Details/${movie.id}`}><img src={movie.moviesPoster} alt={movie.moviesName}/></Link></div>) : (<div><Link to="/Login"><img src={movie.moviesPoster} alt={movie.moviesName}/></Link></div>)}
              <p>{movie.moviesName}</p>
            </div>
            
          );
        })}
        <footer className="footer"><Link href="/">Return</Link><p>Copyright is Safe</p><Link to="/Users/FeedBacks">FeedBack</Link></footer>
      </div>
      ) : (
        <div id="loading">
          <div className="loading1"></div>
          <div className="loading1"></div>
          <div className="loading1"></div>
          <div className="loading1"></div>
          <div className="loading1"></div>
          <div className="loading1"></div>
        </div>
      )}
  </>)
}
export default HomePage;