import React, { useState } from "react";
import TaskHeader from "./TaskHeader.js";
import DisplayTasks from "./DisplayTasks.js";
import AddTask from "./AddTask.js";
import CompleteTask from "./CompleteTask.js";
import DeleteTask from "./DeleteTask.js";

function TasksRoute({ goal }){

  //pass goal.id & task.id down to AddTask
  //pass task.id down to DeleteTask
  return(
    <>
      <h5>Tasks that belong the goal:</h5>
      <TaskHeader goal={goal}/>
      <DisplayTasks goal={goal}/>
      <AddTask />
      <CompleteTask />
      <DeleteTask />
    </>
  )
}

export default TasksRoute