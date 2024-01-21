import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style/signup/style.css';
import Header from "../../components/Header";

function CreateAccount() {
  // State to manage messages displayed to the user
  const [message, setMessage] = useState();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle the account creation form submission
  const handleCreateAccount = async (event) => {
    event.preventDefault();

    // Extract username and password from the form
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Check if username and password are provided
    if (!username || !password) {
      setMessage("Please choose your username and password!");
      document.querySelector(".message-signup").style.color = "red";
      return; // Stop execution if not provided
    }

    // Create an object with user data
    const userData = {
      username,
      password,
    };
    const userDataJson = JSON.stringify(userData);

    // Send a POST request to the user creation endpoint
    const userDataRes = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userDataJson,
    });

    // Parse the response
    const resUserData = await userDataRes.json();
    const token = resUserData.data;

    // Update state and display appropriate message based on the response
    if (token) {
      setMessage("You successfully created an account !");
      setTimeout(() => {
        navigate("/");
      }, 10000);
    } else {
      setMessage("An error from the server, please try again later !");
    }
  };

  return (
    <>
      <Header />
      <section className="section-signup">
        <form onSubmit={handleCreateAccount} className="form-signup">
          {message && <p className="message-signup">{message}</p>}
          <label>
            <div>Choose your username :</div>
            <input type="text" name="username" className="input-signup" />
          </label>
          <label>
            <div>Choose your password:</div>
            <input type="password" name="password" className="input-signup" />
          </label>
          <input type="submit" value="Create Account" className="submit-signup" />
          <Link to="/Login" className="back-Login">You have already an account? Click to Login</Link>
        </form>
      </section>
    </>
  );
}

export default CreateAccount;
