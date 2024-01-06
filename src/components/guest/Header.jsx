import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style/style.css'
import './style/styleForBtn.css'

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

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  };

  return (
    <header className="guestHeader">
      <nav>
        <ul>
          <li><Link to='/' className="links">Home</Link></li>
          <li><Link to='/Movies' className="links">Movies</Link></li>
          <li>{isUser ? (
            <div onClick={handleLogout} className="links">logout</div>
          ) : (
            <Link to="/Login" className="links">Login</Link>
          )}</li>
        </ul>
        <div className='label' onClick={themeHandle}></div>
      </nav>
    </header>
  );
}

export default Header;
