import React from "react";
import ExistingUserLogin from "./ExistingUserLogin.js";
import CreateNewUser from "./CreateNewUser.js";

function LoginRoute({ handleUser, user}){
  return(
    <>
      <ExistingUserLogin handleUser={handleUser} user={user}/>
      <CreateNewUser handleUser={handleUser} user={user}/>
    </>
  )
}

export default LoginRoute