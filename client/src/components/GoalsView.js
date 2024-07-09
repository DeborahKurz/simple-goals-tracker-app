import React from "react";
import { useNavigate } from "react-router-dom";

import AddGoal from "./AddGoal.js";
import AddTask from "./AddTask.js";
import DeleteGoalTask from "./DeleteGoalTask.js";

function DisplayGoals({ userList, allGoals, handleGoal, handleGoalsDeleteTask, handleTask }) {
  const navigate = useNavigate();

  function handleClickUser(){
    navigate("/team");
  };

  if (allGoals.length === 0) {
    return (
      <div>To get started, please add a new goal.</div>
    )
  } else {
    return (
      <div>
        <h1> Goals View </h1>
        <h5>Navigate to Team View to mark tasks as completed.</h5>
        <AddGoal handleGoal={handleGoal}/>
        <ul>
          {allGoals.map((goal) => (
              <div key={goal.id}>
                <h2>{goal.goal}</h2>
                {goal.tasks.map((aTask) => (
                  aTask.completed === false ? (
                    <div key={aTask.id}>
                      <li>{aTask.task}</li>
                      <button onClick={()=> handleClickUser()}>Task Owner: {aTask.user.username}</button>
                      <DeleteGoalTask taskId={aTask.id} handleGoalsDeleteTask={handleGoalsDeleteTask}/>
                    </div>
                  ) : (
                    <div key={aTask.id}>
                      <li style={{textDecoration: 'line-through' }}>Completed: {aTask.task}</li>
                      <button onClick={()=> handleClickUser()}>Task Owner: {aTask.user.username}</button>
                      <DeleteGoalTask taskId={aTask.id} handleGoalsDeleteTask={handleGoalsDeleteTask}/>
                    </div>
                  )
                ))}
                <br></br>
                <AddTask userList={userList} handleTask={handleTask} goalId={goal.id} />
              </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayGoals
