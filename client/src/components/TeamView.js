import React, { useState } from "react";
import SignOut from "./SignOut.js";
import TaskHeader from "./TaskHeader.js";
// import DisplayTasks from "./DisplayTasks.js";
import AddTask from "./AddTask.js";
import CompleteTask from "./CompleteTask.js";

function TeamView({ goal }){

  return(
    <>
      <SignOut />
      <h5>Tasks that belong the goal:</h5>
      <TaskHeader goal={goal}/>
      {/* <DisplayTasks goal={goal}/> */}
      <AddTask />
      <CompleteTask />
    </>
  )
}

export default TeamView