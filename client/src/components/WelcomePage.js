import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./WelcomeHeader.js";
import ListUsers from "./ListUsers.js";
import CreateNewUser from "./CreateNewUser.js";

function WelcomePage({userList}){
    console.log(userList)
  
    return(
        <>    
            <WelcomeHeader />
            <h3>Instructions:</h3>
            <text>Get started by creating a username for yourself (each username needs to be unique).</text>
            <text>Then navigate to the "Goals View" using the navigation bar above. Here you will be able to see all the goals you and your team are working towards, and you can create new goals and tasks.</text>
            <br></br>   
            <text>You can also navigate to "Team View" using the navigation bar above. There you will find each user listed in alphabetical order with the tasks they are in charge of (for easy viewing).</text> 
            <br></br>
            <text>If you ever need to create a new user, or see who is already 'registered' as a user in your team, you can navigate back to this page by selecting "Home" in the navbar.</text>
            <br></br>
            <h4>Happy Goal Crushing!</h4>
            <br></br>
            <ListUsers userList={userList}/>
            <br></br>
            <CreateNewUser />
        </>
    )
}

export default WelcomePage