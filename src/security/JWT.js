import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const JWT = ()=>{
  const token = localStorage.getItem('jwt')
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){ 
      navigate('/')
    }
  },[token,navigate]) 
}
export default JWT;