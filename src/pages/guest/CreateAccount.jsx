import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style/signup/style.css';
import Header from "../../components/Header";

function CreateAccount(){

const [message , setMessage]= useState();

const navigat = useNavigate();

const handleCreateAccount = async(event) => {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;

  const netUserData = {
    username ,
    password ,
  };
  const netUserDataJson = JSON.stringify(netUserData);

  const netUserDataRes = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: netUserDataJson,
  });

const resUserData = await netUserDataRes.json();
const token = resUserData.data;

if(token){
  setMessage("You successfully created an account !")
  setTimeout(() => {
    navigat("/")
  },10000)
}else{
  setMessage("an error from the server , please try again later !")
}
if(!username || !password){
  setMessage("Please choose your username and password!")
  document.querySelector(".message-signup").style.color = "red";
}
}




  return(
    <>
    <Header />
    <section className="section-signup">
      <form onSubmit={handleCreateAccount} className="form-signup" >
      {message && <p className="message-signup">{message}</p>}
        <label >
        <div>Choose your username :</div>
          <input type="text" name="username" className="input-signup"/>
        </label>
        <label>
        <div>Choose your password:</div>
          <input type="password" name="password" className="input-signup"/>
        </label>
        <input type="submit" value="Create Account" className="submit-signup"/>
        <Link to="/Login" className="back-Login" >You have already an account ? click to Login</Link>
      </form>
    </section>
    </>

  )
}
export default CreateAccount;