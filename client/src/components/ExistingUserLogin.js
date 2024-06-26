import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ExistingUserLogin({ handleUser }){
//For users who already have an account
//GET reuqest
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [userStatus, setUserStatus] = useState("Found");

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/")
    .then(r=>r.json())
    .then((data) => setUsers(data))
    .catch((error) => console.error(error));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(user => user.username === username);
    
    if (foundUser) {
      console.log("User found:", foundUser);
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