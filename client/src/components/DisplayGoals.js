import React from "react";
import { useNavigate } from "react-router-dom";

function DisplayGoals({ allGoals, handleGoal }) {
  const navigate = useNavigate();

  function handleAddGoal(){
    console.log("Inside handleAddGoal")
    //POST to goals no id needed
  }

  function handleAddTask(goalId){
    console.log("Inside handleAddTask", goalId)
    //POST to tasks with goalId
  }

  function handleDeleteTask(taskId){
    console.log("Inside handleDeleteTask", taskId)
    //DELETE to tasks with id
  }

  function handleClickUser(){
    navigate("/team");
  }


  if (allGoals.length === 0) {
    return (
      <div>To get started, please add a new goal below.</div>
    )
  } else {
    return (
      <div>
        <h5>Click on a username to be taken to the Team View. Please complete tasks in Team View.</h5>
        <button onClick={() => handleAddGoal()}>Add Goal</button>
        <ul>
          {allGoals.map((goal) => (
              <div key={goal.id}>
                <h2>{goal.goal}</h2>
                {goal.tasks.map((aTask, index) => (
                  <div key={index}>
                    <li>{aTask.task}</li>
                    <button onClick={()=> handleClickUser()}>Task Owner: {aTask.user.username}</button>
                    <button onClick={() => handleDeleteTask(aTask.id)}>Delete Task</button>
                  </div>
                ))}
                <br></br>
                <button onClick={() => handleAddTask(goal.id)}>Add Task</button>
              </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayGoals

  // {/* <li onClick={()=> handleClick(goal)}>{goal.goal}</li> */}