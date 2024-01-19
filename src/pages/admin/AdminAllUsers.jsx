import { useEffect, useState } from "react";
import Header from "../../components/Header";
import './style/AdminAllUsers/style.css';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminAllUsers() {
  const [users, setUsers] = useState([]);
  const [isSuperAdmin , setSuperAdmin] = useState();
  const navigat = useNavigate();


  useEffect(()=>{
    const token = localStorage.getItem('jwt');

    if(!token || isSuperAdmin === 2 || isSuperAdmin === 3){
      return navigat('/')
    }

    setSuperAdmin(jwtDecode(token).RoleId);

  },[isSuperAdmin,navigat])

  useEffect(() => {
    (async () => {
      const allUsers = await fetch("http://localhost:8080/api/users");
      const allUserData = await allUsers.json();
      setUsers(allUserData);
    })();
  }, []);

  return (
    <>
      <Header />
      <div className="allUsers">
        {users.map((user) => {
          return (
            <Link to={`/Admin/AllUsers/${user.id}`} key={user.id} className="eachUserLink">
                    <div key={user.id} className="eachUser"> 
                      <h3>{user.username}</h3>
                      {user.RoleId === 1 && <h5>super admin</h5>}
                      {user.RoleId === 2 && <h5>admin</h5>}
                      {user.RoleId === 3 && <h5>user</h5>}
                      {user.RoleId === null && <h5>guest</h5>}
                      <p>Account created at:</p>
                      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                      <p>Last updated:</p>
                      <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
                    </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default AdminAllUsers;
