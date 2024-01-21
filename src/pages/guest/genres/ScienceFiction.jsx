import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

function ScienceFiction() {
  // State to store movies
  const [Movies, setMovies] = useState(null);

  // Fetch movies on component mount
  useEffect(() => {
    (async () => {
      try {
        const MoviesRespond = await fetch("http://localhost:8080/api/Movies");
        const MoviesRespondData = await MoviesRespond.json();
        setMovies(MoviesRespondData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <div className="divGenre">
        {Movies ? (
          <>
            {Movies.map((movies) => (
              // Check if the movie belongs to the "ScienceFiction" genre
              <div key={movies.id}>
                {movies.moviesGenre.includes(`ScienceFiction`) && (
                  <div className="divGenreMovies">
                    {/* Link to the details page of the movie */}
                    <Link to={`/Movie/Details/${movies.id}`}>
                      <div className="img-div-genre">
                        <img src={movies.moviesPoster} alt={movies.moviesName} />
                      </div>
                    </Link>
                    <p>{movies.moviesName}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <p>Loading...!</p>
        )}
      </div>
    </>
  );
}

export default ScienceFiction;
