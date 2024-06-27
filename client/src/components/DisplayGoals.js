import React from "react";

function DisplayGoals({ userGoals }){
  console.log("Display Goals: ", userGoals)
  return(
    <div>
      <h2>Click on a goal to see it's tasks.</h2>
      <h4>Inside DisplayGoals()</h4>
    </div>
  )
}

export default DisplayGoals