import React from "react";
import DisplayGoals from "./DisplayGoals.js";
import AddGoal from "./AddGoal.js";

function GoalsView({ allGoals, handleGoal, userList, handleTask, setAllGoals }){
  return(
    <>
      <h1>Goals View</h1>

      <DisplayGoals allGoals={allGoals} handleGoal={handleGoal} userList={userList} handleTask={handleTask} setAllGoals={setAllGoals}/>
    </>
  )
}

export default GoalsView


    // {/* <SignOut />
    // <GoalsHeader username={user?.username}/>
    // <DisplayGoals handleSetGoal={handleSetGoal} userGoals={userGoals} />
    // <AddGoal userId={user.id} handleSetGoal={handleSetGoal}/> */}