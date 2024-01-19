import { useEffect, useState } from "react";
import './style/login/style.css';
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";


function Login(){
  const navigate = useNavigate();
  const [message , setMessage] = useState(null);
  const token = localStorage.getItem('jwt');

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token,navigate])
  
  


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
      setTimeout(function() {
        localStorage.setItem("jwt" , token);
        navigate("/")
      }, 1500);
      setMessage("Welcome Dear User ;)")
    } else {
      if(!username){
        setMessage("Please enter your username!")
      }else if(!password){
        setMessage("Please enter your password!")
      }else{
        setMessage("username or password is invalid! :(")
      }
    }
    
  }

  return(
    <>
    <Header />
    <section className="section-login">
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
        <Link to="/CreateAccount" className="SignUp">click here to signup</Link>
      </form>
    </section>
    </>
  )
}
export default Login;