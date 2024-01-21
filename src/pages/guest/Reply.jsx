import { useState } from "react";
import './style/reply/style.css';
import { useNavigate } from "react-router-dom";

function Reply(props) {
  const navigate = useNavigate();
  const [replyMessage, setReplyMessage] = useState();

  // Function to handle the submission of a reply
  const handleReply = async (event) => {
    event.preventDefault();

    // Check if user is authenticated
    const token = localStorage.getItem('jwt');
    if (!token) {
      // Redirect to login page if not authenticated
      return setTimeout(() => {
        navigate('/Login');
      }, 2000);
    }

    // Check if the reply content is empty
    if (event.target.reply.value === "") {
      return setReplyMessage("Cannot submit an empty comment!");
    }

    // Extract data from the form
    const content = event.target.reply.value;
    const MovieId = props.data;
    const replyData = {
      content,
      MovieId,
    };
    const replyDataJson = JSON.stringify(replyData);

    // Send a POST request to submit the reply
    const replyRes = await fetch("http://localhost:8080/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: replyDataJson,
    });

    // Parse the response
    const replyUpload = await replyRes.json();
    const replyPosted = replyUpload.data;

    // Update state based on the response
    if (replyPosted) {
      setReplyMessage("(;");
      // Reload the page after successful reply submission
      window.location.reload();
    } else {
      setReplyMessage("Server connection is lost!");
    }
  }

  return (
    <>
      <div className="comments">
        <div><p>Your comments are important to us :)</p></div>
        <div className="div-reply">
          {/* Form for submitting a reply */}
          <form onSubmit={handleReply}>
            <label>
              {/* Input field for entering the reply content */}
              <input type="text" name="reply" className="reply" placeholder={replyMessage && replyMessage} />
            </label>
            {/* Submit button for posting the reply */}
            <input type="submit" name="submitReply" className="submit" value="Send" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Reply;
