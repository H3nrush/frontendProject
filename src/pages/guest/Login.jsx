import { useState } from "react";

function Login(){
  const [message , setMessage] = useState(null);
  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.username.value;  

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
      setMessage("You are connected!")
    } else {
      setMessage("username or password is invalid!")
    }
  }

  return(
    <section>
    {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <label>
          <div>username :</div>
            <input type="text" name="username" />
        </label>
        <label>
          <div>password :</div>
            <input type="password" name="password" />
        </label>
        <input type="submit" />
      </form>
    </section>
  )
}
export default Login;