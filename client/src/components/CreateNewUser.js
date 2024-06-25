import React from "react";

function CreateNewUser(){
    //POST request
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

export default CreateNewUser