import React from "react";
import SignOut from "./SignOut.js";
import GoalsHeader from "./GoalsHeader.js";
import DisplayGoals from "./DisplayGoals.js";
import AddGoal from "./AddGoal.js";

function GoalsRoute(){
  return(
    <>
      <SignOut />
      <GoalsHeader />
      <DisplayGoals />
      <AddGoal />
    </>
  )
}

export default GoalsRoute