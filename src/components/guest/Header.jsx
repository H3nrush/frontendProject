import { Link } from "react-router-dom";

function Header(){
  return(
    <header>
        <nav>
          <ul>
            <li><Link to='/' >HomePage</Link></li>
            <li><Link to='/Login' >Login</Link></li>
            <li><Link to='/Movies' >Movies</Link></li>
            <li><Link to='/Series' >Series</Link></li>
          </ul>
        </nav>
    </header>
  )
  }
  export default Header;