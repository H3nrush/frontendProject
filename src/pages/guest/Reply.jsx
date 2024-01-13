import { useState } from "react";
import './style/reply/style.css';
import { useNavigate } from "react-router-dom";

function Reply(props){

  const navigat = useNavigate();
  const [Reply , setReply] = useState();


  
  const handleReply = async (event) =>{
    event.preventDefault();
const token = localStorage.getItem('jwt');
if(!token){
  return setTimeout(()=>{
    navigat('/Login')
  },2000)
}
if(event.target.reply.value === ""){
  return setReply("canot put an emty comment!")
}
    const content = event.target.reply.value;
    const MovieId = props.data;
    const replyData = {
      content ,
      MovieId , 
    };
    const replyDataJson = JSON.stringify(replyData);

    const replyRes = await fetch("http://localhost:8080/api/reviews" , {
      method: "POST" , 
      headers: {
        "Content-Type": "application/json" ,
        "Authorization": `Bearer ${token}`,
      },
      body: replyDataJson ,
    });
    const replyUpload = await replyRes.json();
    const replyPosted = replyUpload.data;
    if(replyPosted){
      setReply("(;")
      window.location.reload();
    }else{
      setReply("server connection is lost!")
    }
  }




  return (
    <>
      <div className="comments">
      <div><p>Your comments are important to us :)</p></div>
        <div className="div-reply">
            <form onSubmit={handleReply}>
                <label>
                  <input type="text" name="reply" className="reply" placeholder={Reply && Reply} />
                </label>
                <input type="submit" name="submitReply" className="submit" value="Send"/>
              </form>
        </div>
      </div>
    </>
  )
}
export default Reply;