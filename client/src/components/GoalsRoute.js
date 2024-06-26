import React from "react";
import SignOut from "./SignOut.js";
import GoalsHeader from "./GoalsHeader.js";
import DisplayGoals from "./DisplayGoals.js";
import AddGoal from "./AddGoal.js";

function GoalsRoute({ user }){
  // console.log("userList: ", userList)
  // console.log("GoalsRoute: ", user)
  return(
    <>
      <SignOut />
      <GoalsHeader username={user.username}/>
      <DisplayGoals userId={user.id}/>
      <AddGoal userId={user.id}/>
    </>
  )
}

export default GoalsRoute