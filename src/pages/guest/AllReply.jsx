import { useEffect, useState } from 'react';
import './style/reply/allReply/style.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function AllReply(props) {
  const [allMoviesReply, setAllMoviesReply] = useState([]);
  const [ownReplyUser, setOwnReplyUser] = useState([]);
  const [ownUser, setOwnUser] = useState();
  const navigate = useNavigate();

  const token = localStorage.getItem('jwt');

  // Redirect to the login page if no token is found
  useEffect(() => {
    if (!token) {
      navigate('/Login');
    }
  }, [token, navigate]);

  // Decode and set the authenticated user from the token
  useEffect(() => {
    setOwnUser(jwtDecode(token));
  }, [token]);

  // Fetch all reviews for the specified movie
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

  // Handle the deletion of a reply
  const handleDelete = async (id) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('jwt');

      // If no token is found, log an error and return
      if (!token) {
        console.error('No token found. User is not authenticated.');
        return;
      }

      // Send a DELETE request to the server to delete the reply
      const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // If the deletion is successful, remove the reply from the state
      if (response.ok) {
        setAllMoviesReply((prevComments) => prevComments.filter((comment) => comment.id !== id));
      } else {
        console.error('Error deleting comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Fetch user data for all users
  useEffect(() => {
    (async () => {
      const usersResponse = await fetch("http://localhost:8080/api/users");
      const usersResponseData = await usersResponse.json();
      setOwnReplyUser(usersResponseData);
    })();
  }, []);

  return (
    <>
      <div className='for-allComments'>
        {allMoviesReply.map((reply) => (
          <div key={reply.id} className='for-eachComment'>
            <div>
              {/* Display the username of the user who posted the reply */}
              {ownReplyUser.map((user) => (
                <>
                  <p>{user.id === reply.UserId && user.username}</p>
                </>
              ))}
              {/* Display the creation timestamp of the reply */}
              <p className='replyCreatedAt'>at: {new Date(reply.createdAt).toLocaleTimeString()} {new Date(reply.createdAt).toLocaleDateString()}</p>
              <br />
              {/* Display the content of the reply */}
              <p>{reply.content}</p>
            </div>
            {/* Display delete button if the user is the author or a super admin */}
            {(ownUser.id === reply.UserId || ownUser.RoleId === 1) && (
              <div className='delete-reply' onClick={() => handleDelete(reply.id)}>Delete</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AllReply;
