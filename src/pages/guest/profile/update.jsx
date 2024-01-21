import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style/style.css'

function UpdateUser() {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwn, setIsOwn] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  // Decode and set the authenticated user from the token
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsOwn(decodedToken);
    }
  }, [token]);

  // Set the user state once isOwn is available
  useEffect(() => {
    if (isOwn) {
      setUser(isOwn);
    }
  }, [isOwn]);

  // Check password match and strength
  const passwordCheck = () => {
    let inputPassword = document.querySelector(".password1");
    let inputPassword2 = document.querySelector(".password2");
    let valueInput = inputPassword.value;
    let valueInput2 = inputPassword2.value;
    let fontColor = document.getElementById("alertMatch");

    if (valueInput && valueInput === valueInput2 && valueInput.length > 5) {
      setIsCorrect(true);
    }

    if (valueInput) {
      if (valueInput.length < 5) {
        setMessage('Please choose a strong password! :_:');
        fontColor.style.color = "red";
        return;
      }

      if (valueInput === valueInput2) {
        setMessage('Passwords match :)');
        fontColor.style.color = "green";
      } else {
        setMessage('Passwords do not match!');
        fontColor.style.color = "red";
        return;
      }
    }
  };

  // Handle the user update
  const handleUpdateUser = async (event) => {
    event.preventDefault();

    const username = isOwn.data;
    const password = event.target.password.value;
    const RoleId = isOwn.RoleId;

    const updateData = {
      username,
      password,
      RoleId,
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
        // Remove the token from local storage after successful update
        localStorage.removeItem('jwt');
        navigate('/Login');
      }

    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  // Handle reset button click
  const handleReset = () => {
    document.querySelector(".password1").value = '';
    document.querySelector(".password2").value = '';
  }

  return (
    <div className="user-UpdateUser">
      <form onSubmit={handleUpdateUser} className="form-updateUser">

        {/* Display password strength and match message */}
        <p id="alertMatch" Style={!message && "color:rgb(3, 154, 255)"}>{message ? message : <>Change your password with strong characters<br/>Ex:<br/><strong Style={"color:red;"}>!@#$%&* and AbCd</strong></>}</p>

        {/* Input for entering new password */}
        <label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="password1"
            onChange={passwordCheck}
          />
        </label>

        {/* Input for re-entering the new password */}
        <label>
          <input
            type="password"
            placeholder="Re-enter your password"
            className="password2"
            onChange={passwordCheck}
          />
        </label>

        {/* Display Save button if password is correct, otherwise display Reset button */}
        {isCorrect ? (<input type="submit" value="Save" id="sbtUpdate" />) : (<button id="ResetClick" onClick={handleReset}>Reset</button>)}
      </form>
    </div>
  );
}

export default UpdateUser;
