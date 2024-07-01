import React, { useState, useEffect } from "react";
import SignOut from "./SignOut.js";
import GoalsHeader from "./GoalsHeader.js";
import DisplayGoals from "./DisplayGoals.js";
import AddGoal from "./AddGoal.js";

function GoalsRoute({ user, userGoals, handleSetGoal }){
  return(
    <>
      <SignOut />
      <GoalsHeader username={user?.username}/>
      <DisplayGoals handleSetGoal={handleSetGoal} userGoals={userGoals} />
      <AddGoal userId={user.id} handleSetGoal={handleSetGoal}/>
    </>
  )
}

export default GoalsRoute