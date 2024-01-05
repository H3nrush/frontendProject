import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
}




  return(
    <>
    {message && <p>{message}</p>}
      <form onSubmit={handleCreateAccount} >
        <label >
          <input type="text" name="username" />
        </label>
        <label>
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Create Account"/>
      </form>
    </>
  )
}
export default CreateAccount;