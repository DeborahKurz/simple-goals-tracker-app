import React from "react";

function DisplayGoals({ userGoals = [] }) {
  console.log(userGoals)

  if (userGoals.length === 0) {
    return (
      <div>To get started, please add a new goal below.</div>
    )
  } else{
    return (
      <div>
        {userGoals.map((goal) => (
          <div key={goal.id}>
            <li>{goal.goal}</li>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}

export default DisplayGoals