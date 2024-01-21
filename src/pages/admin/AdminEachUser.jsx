import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import './style/AdminAllUsers/style.css'
import { jwtDecode } from "jwt-decode";

function AdminEachUser() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState();
  const [selectedRoleId, setSelectedRoleId] = useState(null); // Initialize with null
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (!token) {
      return navigate('/');
    }
    setIsAdmin(jwtDecode(token).RoleId);
    if (isAdmin === 2 || isAdmin === 3 || isAdmin === null) {
      return navigate('/');
    }
  }, [token, navigate, isAdmin]);

  const handleRoleChange = (event) => {
    setSelectedRoleId(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const theUser = await fetch(`http://localhost:8080/api/users/${id}`);
      const theUserData = await theUser.json();
      setUser(theUserData.data);
      setSelectedRoleId(theUserData.data.RoleId); // Set initial value
    })();
  }, [id]);

  const handleDeleteUser = async () => {
    const adminConfirm = window.confirm(`Are you sure to delete this user (${user.username})`);
    if (adminConfirm) {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("User deleted successfully");
          navigate('/Admin/AllUsers');
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error occurred during user deletion:", error);
      }
    } else {
      alert('Operation cancelled! :)');
    }
  };

  const handleSaveRole = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ RoleId: selectedRoleId }),
      });

      if (response.ok) {
        console.log("User role updated successfully");
        setUser((prevUser) => ({ ...prevUser, RoleId: selectedRoleId }));
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error occurred during user role update:", error);
    }
  };

  return (
    <>
      <Header />
      {user ? (
        <div className="eachUserById">
          <h2>{user.username}</h2>
          {user.RoleId === 1 && (<h3>Super Admin</h3>)}
          {user.RoleId === 2 && (<h3>Admin</h3>)}
          {user.RoleId === 3 && (<h3>User</h3>)}
          {user.RoleId === null && (<h3>guest</h3>)}

          <label>
            Select Role: <br />
            <select value={selectedRoleId} onChange={handleRoleChange} >
              <option value={1}>Super Admin</option>
              <option value={2}>Admin</option>
              <option value={3}>User</option>
            </select>
          </label>
          <button onClick={handleSaveRole} className="updateUser" >Save Role</button>

          <button className="deleteUser" onClick={handleDeleteUser}>
            Delete User
          </button>
        </div>
      ) : (
        <div className="eachUserById">
          <p>We could not find the user by this ID and information!</p>
        </div>
      )}
    </>
  );
}

export default AdminEachUser;
