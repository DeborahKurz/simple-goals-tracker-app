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
                    <div key={aTask.id} style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                      <li style={{ width:"500px", height: "50px", border: "2px solid black", marginRight: "-2px" }}>{aTask.task}</li>
                      <button style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }} onClick={()=> handleClickUser()}>Task Owner: {aTask.user.username}</button>
                      <DeleteGoalTask taskId={aTask.id} handleGoalsDeleteTask={handleGoalsDeleteTask}/>
                    </div>
                  ) : (
                    <div key={aTask.id} style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                      <li style={{ textDecoration: 'line-through', width:"500px", height: "50px", border: "2px solid black", marginRight: "-2px" }}>Completed: {aTask.task}</li>
                      <button style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }} onClick={()=> handleClickUser()}>Task Owner: {aTask.user.username}</button>
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
};

export default DisplayGoals
