import { useState } from "react";
import './style/style.css';
import { Link, useNavigate } from "react-router-dom";
function Login(){
  const navigate = useNavigate();
  const [message , setMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;  

    const loginData = {
      username ,
      password ,
    };
    const loginDataJson = JSON.stringify(loginData);

    const loginResponse = await fetch("http://localhost:8080/api/users/login" , {
      method: "POST" ,
      headers: {
        "Content-Type": "application/json" ,
      },
      body: loginDataJson ,
    });

    const loginDataResponse = await loginResponse.json();
    const token = loginDataResponse.data;
    if(token){
      localStorage.setItem("jwt" , token);
      setTimeout(function() {
        navigate("/")
      }, 1500);
      setMessage("Welcome Dear User ;)")
    } else {
      if(!username || !password){
        setMessage("Please enter your user information!")
      }else{
        setMessage("username or password is invalid! :(")
      }
    }

  }

  return(
    <section className="section-login">
    <Link to="/" className="redirectHome"><img src="https://img.icons8.com/fluency-systems-regular/96/circled-left.png" alt="Return to home"/></Link>
      <form onSubmit={handleLogin} className="form-login">
      {message && <p className="message-info">{message}</p>}
        <label>
          <div>username :</div>
            <input type="text" name="username"  className="input-info margin-info"/>
        </label>
        <label>
          <div>password :</div>
            <input type="password" name="password"  className="input-info margin-info"/>
        </label>
        <input type="submit" className="info-submit" value="Login"/>
      </form>
      <Link to="/CreateAccount" className="SignUp">signup</Link>
    </section>
  )
}
export default Login;