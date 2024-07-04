import React from "react";
// import SignOut from "./SignOut.js";
// import GoalsHeader from "./GoalsHeader.js";
import DisplayGoals from "./DisplayGoals.js";
import AddGoal from "./AddGoal.js";

function GoalsView({ allGoals, handleGoal }){
//STRUCTURE:
//h1
//AddGoal
//DisplayGoals

  console.log(allGoals)

  return(
    <>
      <h1>Goals View</h1>

      <DisplayGoals allGoals={allGoals} handleGoal={handleGoal}/>
    </>
  )
}

export default GoalsView


    // {/* <SignOut />
    // <GoalsHeader username={user?.username}/>
    // <DisplayGoals handleSetGoal={handleSetGoal} userGoals={userGoals} />
    // <AddGoal userId={user.id} handleSetGoal={handleSetGoal}/> */}