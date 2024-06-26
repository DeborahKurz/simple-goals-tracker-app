import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateNewUser({ handleUser }){
//POST request
  const navigate = useNavigate()
  const [username, setUsername] = useState("")

  function handleSubmit(e){
    e.preventDefault();

    const configObj ={
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          username: username
        }
      )
    }
    fetch("http://127.0.0.1:5555/", configObj)
    .then(r=>r.json())
    .then(userObj => {
      const user = userObj.username;
      handleUser(user);
      console.log("CreateNewUser: ", user)
      navigate("/goals");
    })
    .catch(error=>{
      console.error('Error: ', error);
    })

  }


  useEffect(()=>{
    fetch("http://127.0.0.1:5555/")
    .then(r=>r.json())
    .then((data) => {
      console.log("CreateNewUser", data)
    })
    .catch((error) => console.error(error));
  }, [])

  return(
    <div>
      <h2>Create An Account:</h2>
      <h4>Create a Username to save your goals. (Usernames must be unique and case insensitive).</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} placeholder={"Username"} onChange={(e)=> setUsername(e.target.value)}></input>
        <br></br>
        <button type="submit">Create Username</button>
        <br></br>
      </form>
    </div>
  )
}

export default CreateNewUser