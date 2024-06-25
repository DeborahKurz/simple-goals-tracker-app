import React from "react";

// >>>>>>>> '/' route
function ExistingUserLogin(){
//For users who already have an account
//GET reuqest
  return (
    <div>
      <h2>Returning User Login:</h2>
      <h4>Type Your Username in the form below to create and access your goals.</h4>
      <form onSubmit={(e) => { e.preventDefault();}}>
        <input type="text" placeholder={"Username"}></input>
        <br></br>
        <button type="submit">Log In</button>
        <br></br>
      </form>
    </div>
  )
}

export default ExistingUserLogin