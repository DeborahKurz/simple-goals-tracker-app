import React from "react";
import TaskHeader from "./TaskHeader.js";
import DisplayTasks from "./DisplayTasks.js";
import AddTask from "./AddTask.js";
import CompleteTask from "./CompleteTask.js";
import DeleteTask from "./DeleteTask.js";

// >>>>>>>> '/tasks/id' route
function TasksRoute(){
  return(
    <>
      <TaskHeader />
      <DisplayTasks />
      <AddTask />
      <CompleteTask />
      <DeleteTask />
    </>
  )
}

export default TasksRoute