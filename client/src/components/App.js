import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";


function App() {
  //Create basic styling
  return (
    <div>
      <h1>Simple Goals Tracker</h1>
      <br></br>
      <ExistingUserLogin />
      <br></br>
      <CreateNewUser />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

// >>>>>>>> '/' route
function ExistingUserLogin(){
//For users who already have an account
  return (
    <div>
      <h2>Returning User Login:</h2>
      <h4>Type Your Username in the form below to create and access your goals.</h4>
      <form>
        <input type="text" placeholder={"Username"}></input>
        <br></br>
        <button>Log In</button>
        <br></br>
      </form>
    </div>
  )
}

function CreateNewUser(){
  return(
    <div>
      <h2>Create An Account:</h2>
      <h4>Create a Username to save your goals. (Usernames must be unique).</h4>
        <form>
          <input type="text" placeholder={"Username"}></input>
          <br></br>
          <button>Create Username</button>
          <br></br>
        </form>
    </div>
  )
}

export default App;


// >>>>>>>> '/goals/id' route

// >>>>>>>> '/tasks/id' route
