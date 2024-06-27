import React, { useState, useEffect } from "react";
import SignOut from "./SignOut.js";
import GoalsHeader from "./GoalsHeader.js";
import DisplayGoals from "./DisplayGoals.js";
import AddGoal from "./AddGoal.js";

function GoalsRoute({ user }){
  const [ userGoals, setUserGoals ] = useState([])

  useEffect(()=>{
    setUserGoals(user.goals);
  }, [user])

  return(
    <>
      <SignOut />
      <GoalsHeader username={user.username}/>
      <DisplayGoals userGoals={userGoals} />
      <AddGoal userId={user.id}/>
    </>
  )
}

export default GoalsRoute