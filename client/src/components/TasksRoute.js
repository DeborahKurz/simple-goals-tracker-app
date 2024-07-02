import React, { useState } from "react";
import SignOut from "./SignOut.js";
import TaskHeader from "./TaskHeader.js";
import DisplayTasks from "./DisplayTasks.js";
import AddTask from "./AddTask.js";
import CompleteTask from "./CompleteTask.js";
import DeleteTask from "./DeleteTask.js";

function TasksRoute({ goal }){

  //pass goal.id & task.id down to AddTask
  return(
    <>
      <SignOut />
      <h5>Tasks that belong the goal:</h5>
      <TaskHeader goal={goal}/>
      <DisplayTasks goal={goal}/>
      <AddTask />
      <CompleteTask />
      {/* <DeleteTask  goalId={goal.id}/> */}
    </>
  )
}

export default TasksRoute