import React from "react";
import TaskHeader from "./TaskHeader.js";
import DisplayTasks from "./DisplayTasks.js";
import AddTask from "./AddTask.js";
import CompleteTask from "./CompleteTask.js";
import DeleteTask from "./DeleteTask.js";

function TasksRoute({ goal }){
  //move goal up to App.js from ExistingUserLogin
  //***********
  //pass goal down to TasksRoute.js
  //use goalId to find the goal.
  //get the goal's tasks & put them in a state variable.
  //*********** 
  //pass goal.goal down to TaskHeader
  //pass tasks state variable down to DisplayTasks
  //pass goal.id & task.id down to AddTask
  //pass task.id down to DeleteTask
  return(
    <>
      <h1> You have made it to the /tasks route </h1>
      <TaskHeader />
      <DisplayTasks />
      <AddTask />
      <CompleteTask />
      <DeleteTask />
    </>
  )
}

export default TasksRoute