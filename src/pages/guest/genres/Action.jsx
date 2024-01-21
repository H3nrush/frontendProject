// Import necessary dependencies
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import './style/style.css';

// Functional component for Action genre movies
function Action() {
  // State to store movie data
  const [Movies, setMovies] = useState(null);

  // Fetch movie data on component mount
  useEffect(() => {
    (async () => {
      const MoviesRespond = await fetch("http://localhost:8080/api/Movies");
      const MoviesRespondData = await MoviesRespond.json();
      setMovies(MoviesRespondData);
    })();
  }, []);

  return (
    <>
      {/* Header component */}
      <Header />
      {/* Container for Action genre movies */}
      <div className="divGenre">
        {Movies ? (
          <>
            {/* Map through movies and display only Action genre movies */}
            {Movies.map((movies) => {
              return (
                <>
                  {movies.moviesGenre.includes(`Action`) && (
                    <div className="divGenreMovies" key={movies.id}>
                      {/* Link to movie details page */}
                      <Link to={`/Movie/Details/${movies.id}`}>
                        <div className="img-div-genre">
                          {/* Movie poster */}
                          <img src={movies.moviesPoster} alt={movies.moviesName} />
                        </div>
                      </Link>
                      {/* Movie name */}
                      <p>{movies.moviesName}</p>
                    </div>
                  )}
                </>
              );
            })}
          </>
        ) : (
          // Loading message when movie data is being fetched
          <p>Loading...!</p>
        )}
      </div>
    </>
  );
}

export default Action;
