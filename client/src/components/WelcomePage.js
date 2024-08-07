import React from "react";

import ListUsers from "./ListUsers.js";
import CompletedCount from "./CompletedCount.js";
import CreateNewUser from "./CreateNewUser.js";

function WelcomePage({ userList, handleUser, allTasks }){

    return (
        <>    
            <h1>Welcome</h1>
            <h3>Instructions:</h3>
            <h4>Get started by creating a username (each username needs to be unique).</h4>
            <h4>Then navigate to the "Goals View" using the navigation bar above. Here you will be able to see all the goals you and your team are working towards, and you can create new goals and tasks.</h4> 
            <h4>You can also navigate to "Team View" using the navigation bar above. There you will find each user listed in alphabetical order with the tasks they are in charge of (for easy viewing).</h4> 
            <h4>If you ever need to create a new user, or see who is already 'registered' as a user in your team, you can navigate back to this page by selecting "Home" in the navbar.</h4>
            <h4>Happy Goal Crushing!</h4>
            <br></br>
            {userList.length === 0 ? (
                <div>
                    <CompletedCount allTasks={allTasks}/>
                    <h3> Please add a new user to get started. </h3>
                    <CreateNewUser userList={userList} handleUser={handleUser}/>
                </div>
            ) : (
                <div>
                    <CompletedCount allTasks={allTasks}/>
                    <ListUsers userList={userList}/>
                    <CreateNewUser userList={userList} handleUser={handleUser}/>
                </div>

            )}
        </>
    )
};

export default WelcomePage