import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ExistingUserLogin({ handleUser, userList }){
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [userStatus, setUserStatus] = useState("Found");

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = userList.find(user => user.username.toLowerCase() === username.toLowerCase());
    
    if (foundUser) {
      handleUser(foundUser);
      navigate("/goals");
    } else {
      console.log("User not found");
      setUserStatus("Not Found");
    }
    setUsername("");
  };

  return (
    <div>
      <h2>Returning User Login:</h2>
      <h4>Type Your Username in the form below to create and access your goals.</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder={"Username"} value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <br></br>
        <button type="submit">Log In</button>
        <h3>{userStatus === "Not Found" ? "Username not found (case insensitive). Please try again or create a new account if you have not yet made one." : ""}</h3>
        <br></br>
      </form>
    </div>
  )
}

export default ExistingUserLogin