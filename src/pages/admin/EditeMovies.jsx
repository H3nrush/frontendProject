
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditeMovies(){
  const [movies , setMovies] = useState(null);
  const [massage , setMessage]= useState('');
  const [isAdmin , setIsAdmin] = useState([]);
  const action = document.querySelectorAll('.Genre');
  const token = localStorage.getItem('jwt')
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    setIsAdmin(jwtDecode(token).RoleId)
    if(isAdmin === 3){
      return navigate('/');
    }
  },[token,navigate,isAdmin])


  useEffect(() => {
    (async () => {
      const moviesResponse = await fetch(`http://localhost:8080/api/Movies/${id}`);
      const moviesResponseData = await moviesResponse.json();

      setMovies(moviesResponseData);
    })();
  }, [id]);


  const dataOfGenre = () => {
    return Array.from(action).map((genre) => {
      if (genre.checked) {
        return genre.value;
      }
      return null;
    }).filter(Boolean);
  };

  const handlePutMovie = async (event) => {
    event.preventDefault();

    const moviesName = event.target.movieName.value;
    const moviesUrl = event.target.movieUrl.value;
    const moviesPoster = event.target.moviePoster.value;
    const moviesInfo = event.target.movieInfo.value;
    const moviesArtits = event.target.movieArtists.value;
    const moviesCountry = event.target.movieCountry.value;
    const isSubtitled = event.target.isSubtitled.checked;
    const dateOfEcran = event.target.dateOfEcran.value;
    const moviesLanguege = event.target.movieLangauge.value;
    const moviesGenre = dataOfGenre(); // Call the function to get the selected genres
    const imdb = event.target.imdb.value;

    const putData = {
      moviesName,
      moviesUrl,
      moviesPoster,
      moviesInfo,
      moviesArtits,
      moviesCountry,
      isSubtitled,
      dateOfEcran,
      moviesLanguege,
      moviesGenre,
      imdb,
    };

    const putDataJson = JSON.stringify(putData);
    const putRes = await fetch(`http://localhost:8080/api/Movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: putDataJson,
    });

    const putDataResponse = await putRes.json();
    if (putDataResponse) {
      setMessage("New movie information saved successfully!");
      window.location.reload();
    } else {
      setMessage("Server error! Please try again! :(");
    }
  };


  
  return(
    <>
    {movies ? (
      <div id="post-movies">
        
        <form onSubmit={handlePutMovie}>
          <label className='font-blue'>
          <h1>{movies.data.moviesName}</h1>
          <br/>
            <h4>Change Movie Name : </h4>
            <br/>
            <input type="text" name="movieName" className="input-text-for-movies out-line" defaultValue={movies.data.moviesName}/>
          </label>
          <label className='font-blue'>
          <iframe src={movies.data.moviesUrl} className="movieUrl" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <br/>
            <h4>Change Movie (Url) : </h4>
            <br/>
            <input type="text" name="movieUrl" className="input-text-for-movies out-line" defaultValue={movies.data.moviesUrl}/>
          </label>
          <label className='font-blue'>
          <img className="poster" src={movies.data.moviesPoster} alt={movies.data.moviesName} />
            <h4>Change Movie Poster (link): </h4>
            <br/>
            <input type="text" name="moviePoster" className="input-text-for-movies out-line" defaultValue={movies.data.moviesPoster}/>
          </label>
          <label className='font-blue'>
            <h4>Plot : </h4>
            <br/>
            <textarea type="text" name="movieInfo" className="out-line plot" defaultValue={movies.data.moviesInfo}/>
          </label>
          <label className='font-blue'>
            <h4>Artists : </h4>
            <br/>
            <input type="text" name="movieArtists" className="input-text-for-movies out-line" defaultValue={movies.data.moviesArtits}/>
          </label>
          <label className='font-blue'>
            <h4>Country : </h4>
            <br/>
            <input type="text" name="movieCountry" className="input-text-for-movies out-line" defaultValue={movies.data.moviesCountry}/>
          </label>
          <label className='font-blue'>
            Subtitle = <input type="checkbox" name="isSubtitled"  className='sub' defaultChecked={movies.data.isSubtitled}/>
          </label>
          <label className='font-blue'>
            <h4>Date of ecran : </h4>
            <br/>
            <input type="text" name="dateOfEcran" className="input-text-for-movies out-line" defaultValue={movies.data.dateOfEcran}/>
          </label>
          <label className='font-blue'>
            <h4>Languege : </h4>
            <br/>
            <input type="text" name="movieLangauge" className="input-text-for-movies out-line" defaultValue={movies.data.moviesLanguege}/>
          </label>
          <label className='font-blue'>
            <h4>IMDB (imdb-id) : </h4>
            <br/>
            <input type="text" name="imdb" className='input-text-for-movies out-line' defaultValue={movies.data.imdb}/>
          </label>
            <div>
              <div className='divGenresInput'>
              <h4>Genre (Click and choose): </h4>
              <br/>
                <div><label className='labelForGenre' >Action <input type="checkbox" className="Genre" name="Action" value="Action" defaultChecked={movies.data.moviesGenre.includes("Action") && true} /></label></div>
                <div><label className='labelForGenre' >Fantasy <input type="checkbox" className="Genre" name="Fantasy" value="Fantasy" defaultChecked={movies.data.moviesGenre.includes('Fantasy') && true} /></label></div>
                <div><label className='labelForGenre' >Gang <input type="checkbox" className="Genre" name="Gang" value="Gang" defaultChecked={movies.data.moviesGenre.includes('Gang') && true} /></label></div>
                <div><label className='labelForGenre' >Historic <input type="checkbox" className="Genre" name="Historic" value="Historic" defaultChecked={movies.data.moviesGenre.includes('Historic') && true} /></label></div>
                <div><label className='labelForGenre' >Horror <input type="checkbox" className="Genre" name="Horror" value="Horror" defaultChecked={movies.data.moviesGenre.includes('Horror') && true} /></label></div>
                <div><label className='labelForGenre' >Mystry <input type="checkbox" className="Genre" name="Mystry" value="Mystry" defaultChecked={movies.data.moviesGenre.includes('Mystry') && true} /></label></div>
                <div><label className='labelForGenre' >Science <input type="checkbox" className="Genre" name="ScienceFiction" value="ScienceFiction" defaultChecked={movies.data.moviesGenre.includes('ScienceFiction') && true}/></label></div>
              </div>
            </div>
          <div><input type="submit" value="Save" className='save-class-name'/></div>
          <p color="red">{massage && (massage)}</p>
        </form>
    </div>
    ):(
      
      <div id="post-movies">
      <h1>error 404 ! <br/><br/>
      movies by given data is not found !</h1>
      </div>
      
      )}

    </>
  )
}
export default EditeMovies;