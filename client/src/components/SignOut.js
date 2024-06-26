import React from "react";
import { useNavigate } from "react-router-dom";

function SignOut(){
  // console.log(handleUser)
  const navigate = useNavigate()

  function handleClick(){
    // handleUser("");
    navigate("/");
  }

  return(
    <div>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}

export default SignOut