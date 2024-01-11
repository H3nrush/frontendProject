import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import './style/style.css';
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
function Profile(){
  const [userInfo , setUserInfo] = useState('');
  const token = localStorage.getItem('jwt')
  useEffect(()=>{
    setUserInfo(jwtDecode(token))
  },[token])
  return(
    <div className="user-profile">
    <Header />
      <div className="user-infos">
        <h1>{userInfo.data}</h1>
        {userInfo.RoleId === 1 && <div>you are a super admin <br/> <div id="divStars"><span className="stars">&#9733;</span><span className="stars">&#9733;</span><span className="stars">&#9733;</span></div> </div>}
        {userInfo.RoleId === 2 && <div>you are an admin <br/> <div id="divStars"><span className="stars">&#9733;</span><span className="stars">&#9733;</span><span className="stars">&#9734;</span></div> </div>}
        {userInfo.RoleId === 3 && <div>you are an user <br/> <div id="divStars"><span className="stars">&#9733;</span><span className="stars">&#9734;</span><span className="stars">&#9734;</span></div> </div>}
        <Link to="/MyProfile/Settings/Update" className="settings">Settings</Link>
      </div>
    </div>
  )
}
export default Profile;