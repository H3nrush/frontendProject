import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style/style.css'


function Header(){
  const [isUser , setIsUser] = useState(false);

useEffect(()=>{
  const token = localStorage.getItem('jwt');
  if(token){
    setIsUser(true)
  }
},[]);

const handleLogout = ()=>{
  localStorage.removeItem('jwt');
  window.location.reload();
}
  return(
    <header className="guestHeader">
        <nav>
          <ul>
            <li><Link to='/' className="links">HomePage</Link></li>
            <li><Link to='/Movies' className="links">Movies</Link></li>
            <li>{isUser ? (<button onClick={handleLogout}>logout</button>):(<Link to="/Login" className="links">Login</Link>)}</li>
          </ul>
        </nav>
    </header>
  )
  }
  export default Header;