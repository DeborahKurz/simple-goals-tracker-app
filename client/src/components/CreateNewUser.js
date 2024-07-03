import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNewUser({ handleUser, userList }){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userStatus, setUserStatus] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    const foundUser = userList.find(user => user.username === username);

    if (!foundUser) {
      const configObj ={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username })
      }
      fetch("http://127.0.0.1:5555/", configObj)
      .then(r=>r.json())
      .then(userObj => {
        handleUser(userObj);
        navigate("/goals");
      })
      .catch(error=>{
        console.error('Error: ', error);
      })
    } else {
      setUserStatus("Already Used")
    }
  }

  return(
    <div>
      <h3>Create A New Username:</h3>
      <h4>(Note: Usernames must be unique and case insensitive)</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} placeholder={"Username"} onChange={(e)=> setUsername(e.target.value)}></input>
        <br></br>
        <button type="submit">Create Username</button>
        <h3>{userStatus === "Already Used" ? "This username is already taken. Please create a different username." : ""}</h3>
      </form>
    </div>
  )
}

export default CreateNewUser