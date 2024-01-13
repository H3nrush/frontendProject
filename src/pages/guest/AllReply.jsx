import { useEffect, useState } from 'react';
import './style/reply/allReply/style.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function AllReply(props) {
  const [allMoviesReply, setAllMoviesReply] = useState([]);
  const [ownReplyUser , setOwnReplyUser] = useState([]);
  const [ownUser , setOwnUser] = useState();
  const navigat = useNavigate();


  const token = localStorage.getItem('jwt')
  if(!token){
    navigat('/Login');
  }

  

  useEffect(()=>{
    setOwnUser(jwtDecode(token))
  },[token])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reviews/movie/${props.data}`);
        const data = await response.json();
        setAllMoviesReply(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [props.data]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
  
      if (!token) {
        console.error('No token found. User is not authenticated.');
        return;
      }
  
      const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Remove the deleted comment from the state
        setAllMoviesReply((prevComments) => prevComments.filter((comment) => comment.id !== id));
      } else {
        console.error('Error deleting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  
  useEffect(()=>{
    (async () =>{
      const usersRespond = await fetch("http://localhost:8080/api/users");

      const usersRespondData = await usersRespond.json();
      setOwnReplyUser(usersRespondData);
    })();
  },[]);



  return (
    <>
      <div className='for-allComments'>
        {allMoviesReply.map((reply) => (
          <div key={reply.id} className='for-eachComment'>
          <div>
          {ownReplyUser.map((user)=>(
            <h3>{user.id === reply.UserId && user.username}</h3>
          ))}
          <br/>
            <p>{reply.content}</p>
            </div>

            {ownUser.id === reply.UserId || ownUser.RoleId === 1 ? (<div className='delete-reply' onClick={() => handleDelete(reply.id)}>Delete</div>):(null)}


          </div>
        ))}
      </div>
    </>
  );
}

export default AllReply;
