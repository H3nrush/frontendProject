import { useEffect, useState } from "react";
import Header from "../../components/Header";
import './style/homePage/style.css';
import './style/homePage/loading/style.css'
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [Movies, setMovies] = useState(null);
  const token = localStorage.getItem('jwt')
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (token) {
      setIsUser(true);
    }
  }, [navigate, token]);

  useEffect(() => {
    // Fetch the list of movies from the API
    (async () => {
      const moviesResponse = await fetch("http://localhost:8080/api/Movies");
      const moviesResponseData = await moviesResponse.json();
      setMovies(moviesResponseData);
    })();
  }, []);

  return (
    <>
      <Header />
      {Movies ? (
        // Display movies if available
        <div className="div-allMovies">
          {Movies.map((movie) => (
            <div className="movie-box" key={movie.id}>
              {isUser ? (
                // If user is authenticated, link to movie details page
                <div><Link to={`/Movie/Details/${movie.id}`}><img src={movie.moviesPoster} alt={movie.moviesName} /></Link></div>
              ) : (
                // If user is not authenticated, link to login page
                <div><Link to="/Login"><img src={movie.moviesPoster} alt={movie.moviesName} /></Link></div>
              )}
              <p>{movie.moviesName}</p>
            </div>
          ))}
          {/* Footer with links */}
          <footer className="footer">
            <Link href="/">Return</Link>
            <p>Copyright is Safe</p>
            <Link to="/Users/FeedBacks">FeedBack</Link>
          </footer>
        </div>
      ) : (
        // Display loading animation while fetching movies
        <div id="loading">
          <div className="loading1"></div>
          <div className="loading1"></div>
          <div className="loading1"></div>
          <div className="loading1"></div>
          <div className="loading1"></div>
          <div className="loading1"></div>
        </div>
      )}
    </>
  )
}

export default HomePage;
