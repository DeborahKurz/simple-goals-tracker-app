import React from "react";
import TaskHeader from "./TaskHeader.js";
import DisplayTasks from "./DisplayTasks.js";
import AddTask from "./AddTask.js";
import CompleteTask from "./CompleteTask.js";
import DeleteTask from "./DeleteTask.js";

function TasksRoute({ goal }){

  //get the goal's tasks & put them in a state variable.
  //*********** 
  //pass goal.goal down to TaskHeader
  //pass tasks state variable down to DisplayTasks
  //pass goal.id & task.id down to AddTask
  //pass task.id down to DeleteTask
  return(
    <>
      <TaskHeader goal={goal.goal}/>
      <DisplayTasks />
      <AddTask />
      <CompleteTask />
      <DeleteTask />
    </>
  )
}

export default TasksRoute