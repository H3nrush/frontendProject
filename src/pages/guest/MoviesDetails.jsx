import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/guest/Header";
import './style/movieDetails/style.css';
import Reply from "./Reply";
import AllReply from "./AllReply";

const MovieDetails = () => {
  const { id } = useParams();

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    (async () => {
      const moviesResponse = await fetch("http://localhost:8080/api/Movies/" + id);
      const moviesResponseData = await moviesResponse.json();

      setMovies(moviesResponseData);
    })();
  }, [id]);

  useEffect(() => {
    // Load IMDb rating script dynamically
    const script = document.createElement('script');
    script.id = 'imdb-rating-api';
    script.src = 'https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []); // Run only once on component mount


  return (
    <>
      <Header />

      {movies ? (
          <div className="box-details">

            <div className="movie-ifram">
            <div><iframe src={movies.data.moviesUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>
            <Reply data={id}/>
            <AllReply data={id}/>
            </div>
            
            <div className="movie-info">
                <img src={movies.data.moviesPoster} alt={movies.data.moviesName} className="img"/>
                <h3>{movies.data.moviesName}</h3>
                
                    <div>

                            <span className="imdbRatingPlugin" data-user="ur175426859" data-title={movies.data.imdb} data-style="p1">
                            </span>

                    </div>       

 

                <h3>Plot :</h3>
                <p>{movies.data.moviesInfo}</p>
                <h3>Artist :</h3>
                <p>{movies.data.moviesArtits}</p>
                <h3>Genre :</h3>
                <p>{movies.data.moviesGenre}</p>
                <h3>Country :</h3>
                <p>{movies.data.moviesCountry}</p>
                <h3>Subtitle :</h3>
                {movies.data.isSubtitled ? (<p>yes</p>) : (<p>non</p>)}
                <h3>Date of ecran :</h3>
                <p>{movies.data.dateOfEcran}</p>
                <h3>Languege :</h3>
                <p>{movies.data.moviesLanguege}</p>

                

            </div>

          </div>
      ) : (
        <div className="box-details"><p>loading...</p></div>
      )}
    </>
  );
};

export default MovieDetails;