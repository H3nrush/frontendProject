import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/guest/Header";

const MovieDetails = () => {
  const { id } = useParams();

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    (async () => {
      const moviesResponse = await fetch("http://localhost:8080/api/Movies/" + id);
      const moviesResponseData = await moviesResponse.json();

      setMovies(moviesResponseData);
      console.log(moviesResponseData)
    })();
  }, [id]);

  return (
    <>
      <Header />

      {movies ? (
          <div>
            <img src={movies.data.moviesPoster} alt={movies.data.moviesName} height="200px"/>
          </div>
      ) : (
        <p>En cours de chargement</p>
      )}
    </>
  );
};

export default MovieDetails;