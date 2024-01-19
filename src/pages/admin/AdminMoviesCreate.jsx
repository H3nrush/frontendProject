import { useEffect, useState } from 'react';
import './style/AdminMoviesCreate/style.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AdminMoviesCreate = () => {
  const [message, setMessage] = useState(null);
  const action = document.querySelectorAll('.Genre');
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = await jwtDecode(token);
        if (decodedToken.RoleId === 2 || decodedToken.RoleId === 1) {
          setMessage("Hi dear Admin :) Here you can post new Movies please don't forget to fill all the text areas!");
        } else {
          setMessage('Redirect to homepage :(');
          setTimeout(() => {
            navigate('/');
          },500);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, navigate]);

  const dataOfGenre = () => {
    return Array.from(action).map((genre) => {
      if (genre.checked) {
        return genre.value;
      }
      return null;
    }).filter(Boolean);
  };

  const handleColor = () => {
    const actionCheckboxes = document.querySelectorAll('.GenreCheckbox');
    actionCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.parentNode.style.color = 'gold';
      } else {
        checkbox.parentNode.style.color = ''; // Reset color if unchecked
      }
    });
  };

  const handlePostMovie = async (event) => {
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

    const postData = {
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

    const postDataJson = JSON.stringify(postData);
    const postRes = await fetch("http://localhost:8080/api/Movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: postDataJson,
    });

    const postDataResponse = await postRes.json();
    if (postDataResponse) {
      setMessage("New movie information saved successfully!");
    } else {
      setMessage("Server error! Please try again! :(");
    }
  };

  return(
    <>
      <div id="post-movies">
        
          <form onSubmit={handlePostMovie}>
          <p className='mssg'>{message && message}</p>
            <label className='font-blue'>
              <h3>Movie Title : </h3>
              <input type="text" name="movieName" className="input-text-for-movies out-line"/>
            </label>
            <label className='font-blue'>
              <h3>Movie Url : </h3>
              <input type="text" name="movieUrl" className="input-text-for-movies out-line"/>
            </label>
            <label className='font-blue'>
              <h3>Movie Poster (link): </h3>
              <input type="text" name="moviePoster" className="input-text-for-movies out-line"/>
            </label>
            <label className='font-blue'>
              <h3>Plot : </h3>
              <textarea type="text" name="movieInfo" className="out-line plot"/>
            </label>
            <label className='font-blue'>
              <h3>Artists : </h3>
              <input type="text" name="movieArtists" className="input-text-for-movies out-line"/>
            </label>
            <label className='font-blue'>
              <h3>Country : </h3>
              <input type="text" name="movieCountry" className="input-text-for-movies out-line"/>
            </label>
            <label className='font-blue'>
              Subtitle = <input type="checkbox" name="isSubtitled"  className='sub'/>
            </label>
            <label className='font-blue'>
              <h3>Date of ecran : </h3>
              <input type="text" name="dateOfEcran" className="input-text-for-movies out-line"/>
            </label>
            <label className='font-blue'>
              <h3>Languege : </h3>
              <input type="text" name="movieLangauge" className="input-text-for-movies out-line"/>
            </label>
            <label className='font-blue'>
              <h3>IMDB (imdb-id) : </h3>
              <input type="text" name="imdb" className='input-text-for-movies out-line' />
            </label>
              <div>
                <div className='divGenresInput'>
                <h3>Genre (Click and choose): </h3>
                  <div><label className='labelForGenre' onClick={handleColor}>Action <input type="checkbox" className="Genre GenreCheckbox" name="Action" value="Action" /></label></div>
                  <div><label className='labelForGenre' onClick={handleColor}>Fantasy <input type="checkbox" className="Genre GenreCheckbox" name="Fantasy" value="Fantasy" /></label></div>
                  <div><label className='labelForGenre' onClick={handleColor}>Gang <input type="checkbox" className="Genre GenreCheckbox" name="Gang" value="Gang" /></label></div>
                  <div><label className='labelForGenre' onClick={handleColor}>Historic <input type="checkbox" className="Genre GenreCheckbox" name="Historic" value="Historic" /></label></div>
                  <div><label className='labelForGenre' onClick={handleColor}>Horror <input type="checkbox" className="Genre GenreCheckbox" name="Horror" value="Horror" /></label></div>
                  <div><label className='labelForGenre' onClick={handleColor}>Mystry <input type="checkbox" className="Genre GenreCheckbox" name="Mystry" value="Mystry" /></label></div>
                  <div><label className='labelForGenre' onClick={handleColor}>Science <input type="checkbox" className="Genre GenreCheckbox" name="ScienceFiction" value="ScienceFiction" /></label></div>
                </div>
              </div>
            <div><input type="submit" value="Save" className='save-class-name'/></div>
          </form>
      </div>
    </>
  )
}
export default AdminMoviesCreate;