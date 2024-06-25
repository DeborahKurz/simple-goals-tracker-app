import React from "react";
import ExistingUserLogin from ExistingUserLogin.js;
import CreateNewUser from CreateNewUser.js;

function LoginRoute(){
    return(
      <>
        <ExistingUserLogin />
        <CreateNewUser />
      </>
    )
  }

export default LoginRoute