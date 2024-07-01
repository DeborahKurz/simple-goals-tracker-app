import React from "react";
import { useNavigate } from "react-router-dom";

function DisplayGoals({ handleSetGoal, userGoals = [] }) {
  const navigate = useNavigate();

  function handleClick(goal){
    handleSetGoal(goal)
    navigate("/tasks")
  }

  if (userGoals.length === 0) {
    return (
      <div>To get started, please add a new goal below.</div>
    )
  } else{
    return (
      <div>
        <h4>Click on a goal to see it's associated tasks:</h4>
        <ul>
          {userGoals.map((goal) => (
              <div key={goal.id}>
                <li onClick={()=> handleClick(goal)}>{goal.goal}</li>
              </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayGoals