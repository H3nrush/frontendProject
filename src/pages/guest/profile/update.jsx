import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwn, setIsOwn] = useState(null);
  const token = localStorage.getItem('jwt');
  const navigat = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsOwn(decodedToken);
    }
  }, [token]);

  useEffect(() => {
    if (isOwn) {
      setUser(isOwn);
    }
  }, [isOwn]);

  const passwordCheck = () => {
    let inputPassword = document.querySelector(".password1");
    let inputPassword2 = document.querySelector(".password2");
    let valueInput = inputPassword.value;
    let valueInput2 = inputPassword2.value;
    let fontColor = document.querySelector(".alert-match")
    if (valueInput) {
      if (valueInput === valueInput2) {
        setMessage('Passwords match :)');
        fontColor.style.color = "green"
      } else {
        setMessage('Passwords do not match!');
        fontColor.style.color = "red"
      }
    }
    if (valueInput) {
      if (valueInput.linght <= 5) {
        setMessage('please use a strong password!');
        fontColor.style.color = "yellow"
      } else {
        setMessage('wow how strong password :)');
        fontColor.style.color = "green"
      }
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    const username = isOwn.data;
    const password = event.target.password.value;

    const updateData = {
      username,
      password,
    };

    const updateDataJson = JSON.stringify(updateData);

    try {
      const updateResponse = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: updateDataJson,
      });

      if (updateResponse.ok) {
        localStorage.removeItem('jwt');
        navigat('/Login');
      }

      const updateDataResponse = await updateResponse.json();
      console.log(updateDataResponse);

    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="user-UpdateUser">
      <form onSubmit={handleUpdateUser} className="form-updateUser">
        {message && <p className="alert-match">{message}</p>}
        <label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="password1"
            onChange={passwordCheck}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Re-enter your password"
            className="password2"
            onChange={passwordCheck}
          />
        </label>
        <input type="submit" value="Save" className="sbt-update" />
      </form>
    </div>
  );
}

export default UpdateUser;
