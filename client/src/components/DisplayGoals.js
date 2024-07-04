import React from "react";
import { useNavigate } from "react-router-dom";

function DisplayGoals({ allGoals, handleGoal }) {
  const navigate = useNavigate();

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
        <h4>Click on a goal to see it's associated tasks:</h4>
        <ul>
          {allGoals.map((goal) => (
              <div key={goal.id}>
                <h2>{goal.goal}</h2>
                {goal.tasks.map((aTask, index) => (
                  <div key={index}>
                    <li>{aTask.task}</li>
                    <button onClick={()=> handleClickUser()}>{aTask.user.username}</button>
                    <button>Delete</button>
                  </div>
                ))}
              </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayGoals

  // {/* <li onClick={()=> handleClick(goal)}>{goal.goal}</li> */}