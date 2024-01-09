import { useEffect, useState } from 'react';
import './style/reply/allReply/style.css';
import { jwtDecode } from 'jwt-decode';

function AllReply(props) {
  const [allMoviesReply, setAllMoviesReply] = useState([]);
  const [ownUser , setOwnUser] = useState();
  const token = localStorage.getItem('jwt')
  useEffect(()=>{
    setOwnUser(jwtDecode(token).id)
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
  

  return (
    <>
      <div className='for-allComments'>
        {allMoviesReply.map((reply) => (
          <div key={reply.id} className='for-eachComment'>
            <p>{reply.content}</p>

      {ownUser === reply.UserId && (<div className='delete-reply' onClick={() => handleDelete(reply.id)}>Delete</div>)}


          </div>
        ))}
      </div>
    </>
  );
}

export default AllReply;
