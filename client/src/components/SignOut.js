import React from "react";
import { useNavigate } from "react-router-dom";

function SignOut(){
  const navigate = useNavigate()

  function handleClick(){
    navigate("/");
  }

  return(
    <div>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}

export default SignOut