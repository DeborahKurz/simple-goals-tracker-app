import React from "react";
// import SignOut from "./SignOut.js";
// import GoalsHeader from "./GoalsHeader.js";
import DisplayGoals from "./DisplayGoals.js";
import AddGoal from "./AddGoal.js";

function GoalsView({ allGoals, handleGoal }){
//STRUCTURE:
//h1
//CreateNewGoal
//DisplayGoals

  return(
    <>
      <h1>Goals View</h1>
      {/* <SignOut />
      <GoalsHeader username={user?.username}/>
      <DisplayGoals handleSetGoal={handleSetGoal} userGoals={userGoals} />
      <AddGoal userId={user.id} handleSetGoal={handleSetGoal}/> */}
    </>
  )
}

export default GoalsView