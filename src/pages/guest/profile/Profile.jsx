import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import './style/style.css';
import Header from "../../../components/Header";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    setUserInfo(jwtDecode(token));
  }, [token, navigate]);

  const handleDeleteAccount = async () => {
    const userId = userInfo.id; // Get user ID from userInfo
    const userConfirm = window.confirm(`Are you sure to delete your account?`);
    
    if (userConfirm) {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem('jwt');
          navigate('/');
          // Optionally, you can redirect the user to another page after deletion
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error occurred during user deletion:", error);
      }
    } else {
      alert('Operation cancelled! :)');
    }
  }

  return (
    <div className="user-profile">
      <Header />
      <div className="user-infos">
        <h1>{userInfo.data}</h1>

        {userInfo.RoleId === 1 && <div>you are a super admin <br /> <div id="divStars"><span className="stars">&#9733;</span><span className="stars">&#9733;</span><span className="stars">&#9733;</span></div></div>}
        {userInfo.RoleId === 2 && <div>you are an admin <br /> <div id="divStars"><span className="stars">&#9733;</span><span className="stars">&#9733;</span><span className="stars">&#9734;</span></div> </div>}
        {userInfo.RoleId === 3 && <div>you are a user <br /> <div id="divStars"><span className="stars">&#9733;</span><span className="stars">&#9734;</span><span className="stars">&#9734;</span></div> </div>}
        <Link to="/MyProfile/Settings/Update" className="settings">Settings</Link>
        <button className="deleteAccount" onClick={handleDeleteAccount}>Delete my Account</button>
      </div>
    </div>
  );
}

export default Profile;
