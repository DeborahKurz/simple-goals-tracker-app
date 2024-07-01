import React from "react";
import { useNavigate } from "react-router-dom";

function DisplayGoals({ userGoals = [] }) {
  const navigate = useNavigate();

  function handleClick(){
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
        {userGoals.map((goal) => (
          <div key={goal.id} onClick={handleClick}>
            <li>{goal.goal}</li>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}

export default DisplayGoals