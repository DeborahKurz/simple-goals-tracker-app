import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddGoal from "./AddGoal.js";
import AddTask from "./AddTask.js";

function DisplayGoals({ allGoals, handleGoal, userList }) {
  const navigate = useNavigate();
  const [displayAddTask, setDisplayAddTask] = useState("NoTask")
  // const [userId, setUserId] = useState(null)

  function handleTask(){
    // console.log("Inside handleTask", goalId)
    displayAddTask === "NoTask" ? setDisplayAddTask("AddTask") : setDisplayAddTask("NoTask")
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
        <AddGoal handleGoal={handleGoal}/>
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
                {displayAddTask === "AddTask" ? <AddTask handleTask={handleTask} goalId={goal.id} userList={userList}/> : <button onClick={() => handleTask(goal.id)}>Add A New Task</button>}
              </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayGoals

  // {/* <button onClick={() => handleTask(goal.id)}>Add Task</button> */}
  // {/* <li onClick={()=> handleClick(goal)}>{goal.goal}</li> */}
  // {/* <button onClick={() => handleAddGoal()}>Add Goal</button> */}
  // {/* {displayAddGoal === "AddGoal" ? <AddGoal handleGoal={handleGoal}/> :  <br></br>} */}


  // function handleAddGoal(){
  //   console.log("Inside handleAddGoal")
  //   if(displayAddGoal === "NoGoal"){
  //     setDisplayAddGoal("AddGoal")
  //   } else {
  //     setDisplayAddGoal("NoGoal")
  //   }
  //   //POST to goals no id needed
  // }