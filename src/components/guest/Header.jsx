import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style/style.css';
import './style/styleForBtn.css';
import './style/styleForGenre.css';

function Header() {
  const setTheme = (isDarkMode) => {
    const body = document.querySelector("*");
    const divLabel = document.querySelector(".label");

    if (isDarkMode) {
      body.style.backgroundColor = "#111111";
      body.style.color = "white";
      divLabel.style = "background-color:#111111;  background-image: url('https://img.icons8.com/external-flat-papa-vector/78/external-Light-Mode-interface-flat-papa-vector.png');";
    } else {
      body.style.backgroundColor = "white";
      body.style.color = "black";
      divLabel.style = "background-color:white; background-image: url('https://img.icons8.com/ios-glyphs/60/moon-symbol.png');";
    }
  };

  const themeHandle = () => {
    const isDarkMode = document.querySelector("*").style.backgroundColor === "rgb(17, 17, 17)";
    setTheme(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  };

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsUser(true);
    }

    // Retrieve the theme preference from localStorage on page load
    const storedTheme = localStorage.getItem('isDarkMode');
    if (storedTheme) {
      setTheme(JSON.parse(storedTheme));
    }
  }, []);
const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate("/")
  };

  const handleDisplay = ()=> {
    if(document.querySelector('.userInfo').style.display === "none"){
      document.querySelector('.userInfo').style.display = "flex";
      document.querySelector('.userInfo').style.animationName = "menu";
    }else{
      document.querySelector('.userInfo').style.animationName = "menuClose";
      setTimeout(()=>{
        document.querySelector('.userInfo').style.display = "none";
      },250)
    }
  }
  const DisplayNone = () =>{
    document.querySelector('.userInfo').style.animationName = "menuClose";
    setTimeout(()=>{
      document.querySelector('.userInfo').style.display = "none";
    },250)
  }
  const handleGenreDisplay = () => {
    let genreBox = document.querySelector('.genre');
    if(genreBox.style.display === "none"){
      genreBox.style.display = "flex";
      genreBox.style.animationName = "genreBox";
    } else {
      genreBox.style.animationName = "genreBoxClose";
      setTimeout(()=>{
        genreBox.style = "display:none";
      },250)
    }
  }

  return (
    <header className="guestHeader">
      <nav>
        <ul>
          <li><Link to='/' className="links">Home</Link></li>
          <li>
            <div className="links" onClick={handleGenreDisplay}>Genres</div>
          </li>
          <div className="genre">
            <div><Link className="genreKeys" to="/Movies/Genres/Action">Action</Link></div>
            <div><Link className="genreKeys" to="/Movies/Genres/Fantasy">Fantasy</Link></div>
            <div><Link className="genreKeys" to="/Movies/Genres/Gang">Gang</Link></div>
            <div><Link className="genreKeys" to="/Movies/Genres/Historic" >Historic</Link></div>
            <div><Link className="genreKeys" to="/Movies/Genres/Horror" >Horror</Link></div>
            <div><Link className="genreKeys" to="/Movies/Genres/Mystry" >Mystry</Link></div>
            <div><Link className="genreKeys" to="/Movies/Genres/ScienceFiction" >Science Fiction</Link></div>
          </div>

          <div className="userInfo" onMouseLeave={DisplayNone}>
              <Link to="/MyProfile" className="myProf" >My Profile</Link>
              <div onClick={handleLogout} className="logout">logout</div>
          </div>

          {isUser ? (
            <li><Link className="links" onClick={handleDisplay}><img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/15/000000/external-user-social-media-ui-tanah-basah-basic-outline-tanah-basah.png" alt="user" /></Link></li>
          ) : (
            <li><Link to="/Login" className="links">Login</Link></li>
          )}
        </ul>
        <div className='label' onClick={themeHandle}></div>
      </nav>
    </header>
    // <p className="user-info">{props.data}</p>
  );
}

export default Header;
