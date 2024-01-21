import { useEffect, useState } from "react";
import './style/login/style.css';
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem('jwt');

  // Redirect to the home page if the user is already authenticated
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Function to handle the login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Extract username and password from the form
    const username = event.target.username.value;
    const password = event.target.password.value;
    
    // Create an object with login data
    const loginData = {
      username,
      password,
    };
    const loginDataJson = JSON.stringify(loginData);

    // Send a POST request to the login endpoint
    const loginResponse = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginDataJson,
    });

    // Parse the response
    const loginDataResponse = await loginResponse.json();
    const token = loginDataResponse.data;

    // If a token is received, set it in local storage and redirect to the home page
    if (token) {
      setTimeout(function() {
        localStorage.setItem("jwt", token);
        navigate("/");
      }, 1500);
      setMessage("Welcome Dear User ;)");
    } else {
      // Display error message based on the login attempt
      if (!username) {
        setMessage("Please enter your username!");
      } else if (!password) {
        setMessage("Please enter your password!");
      } else {
        setMessage("Username or password is invalid! :(");
      }
    }
  };

  return (
    <>
      <Header />
      <section className="section-login">
        <form onSubmit={handleLogin} className="form-login">
          {message && <p className="message-info">{message}</p>}
          <label>
            <div>username :</div>
            <input type="text" name="username" className="input-info margin-info" />
          </label>
          <label>
            <div>password :</div>
            <input type="password" name="password" className="input-info margin-info" />
          </label>
          <input type="submit" className="info-submit" value="Login" />
          <Link to="/CreateAccount" className="SignUp">click here to signup</Link>
        </form>
      </section>
    </>
  );
}

export default Login;
