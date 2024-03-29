import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './style/FeedBacks/style.css'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function FeedBacks(){
  const [isNormalUser , setIsNormalUser] = useState([]);
  const [messages , setMessages] = useState([]);
  const token = localStorage.getItem('jwt')
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
     return navigate('/Login')
    }
  },[token,navigate])

  useEffect(()=>{
    setIsNormalUser(jwtDecode(token))
  },[token])


const handleSendFeedBack = async(event) =>{
  event.preventDefault();

  const subject = event.target.subject.value;
  const name = isNormalUser.RoleId === 1 || isNormalUser.RoleId === 2 ? event.target.name.value : isNormalUser.data;
  const text = event.target.text.value;
  const UserId = isNormalUser.RoleId;

  const postFeedback = {
    subject , 
    name ,
    text ,
    UserId , 
  }

  const postFeedData = JSON.stringify(postFeedback);
  const postRes = await fetch('http://localhost:8080/api/feedBacks' , {
    method: "POST" , 
    headers: {
      "Content-Type": "application/json" ,
      "Authorization": `Bearer ${token}`,
    },
    body: postFeedData ,
  });

  const resOfPost = await postRes.json();
  if(resOfPost){
    console.log("massage maked")
    window.location.reload();
  }else{
    console.log("massage didnt send")
  }

}


useEffect(()=>{
  (async () =>{
    const userFeedBacks = await fetch("http://localhost:8080/api/feedBacks");

    const massegesOfUsers = await userFeedBacks.json();
    setMessages(massegesOfUsers);
  })();
},[]);

  return(
    <div className="feedbacks">
      <Header />
      <div className='messagerBox'>
      <div className='conversationBox'>

      
      {messages.map((feedbacks) => {
         if (feedbacks.UserId === isNormalUser.id ) {
    return (
      <div className='eachMassage' style={{ textAlign: 'start', color: 'rgb(3, 154, 255)' }} key={feedbacks.id}>
        <h3>username: {feedbacks.name}</h3>
        <h4>subject: {feedbacks.subject}</h4>
        <p>{feedbacks.text}</p>
      </div>
    );
  }else if (feedbacks.name === isNormalUser.data || isNormalUser.RoleId === 1) {
    return (
      <div className='eachMassage' style={{ textAlign: 'end', color: 'white' }} key={feedbacks.id}>
        <h3>username: {feedbacks.name}</h3>
        <h4>subject: {feedbacks.subject}</h4>
        <p>{feedbacks.text}</p>
      </div>
    );
  }
  // Add a default case or remove this if feedbacks can only fall into one of the above conditions
  return null;
})}

      

      </div>
      <div className='buttonBox'>
        <form onSubmit={handleSendFeedBack}>
          <div>
          {isNormalUser.RoleId === 1 || isNormalUser.RoleId === 2 ? (<label><input className='userName' name='name' placeholder='Which User Do you wanna reply for?'/></label>):(<button className='userName'>{isNormalUser.data}</button>)}

          <label>
              <input type="text" name="subject" className='messageSubject' placeholder='subject'/>
          </label>

          </div>
          <div>
          <label>
              <textarea type="text" name="text" className='messageText' placeholder='Text'/>
          </label>

          <input type='submit' value="Send" className='btnfeedback'/>
          </div>

          
          
        </form>
      </div>
      </div>
    </div>
  )
}
export default FeedBacks;