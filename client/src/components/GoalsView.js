import React from "react";
import DisplayGoals from "./DisplayGoals.js";
import AddGoal from "./AddGoal.js";

function GoalsView({ allGoals, handleGoal, userList }){
//STRUCTURE:
//h1
//AddGoal
//DisplayGoals

  console.log(allGoals)

  return(
    <>
      <h1>Goals View</h1>

      <DisplayGoals allGoals={allGoals} handleGoal={handleGoal} userList={userList}/>
    </>
  )
}

export default GoalsView


    // {/* <SignOut />
    // <GoalsHeader username={user?.username}/>
    // <DisplayGoals handleSetGoal={handleSetGoal} userGoals={userGoals} />
    // <AddGoal userId={user.id} handleSetGoal={handleSetGoal}/> */}