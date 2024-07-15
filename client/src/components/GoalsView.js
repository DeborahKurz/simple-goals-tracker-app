import React from "react";
import { useNavigate } from "react-router-dom";

import AddGoal from "./AddGoal.js";
import AddTask from "./AddTask.js";
import ListGoals from "./ListGoals.js";

function DisplayGoals({ userList, allGoals, handleGoal, handleGoalsDeleteTask, handleTask }) {
  const navigate = useNavigate();

  function handleClickUser(){
    navigate("/");
  }

  if (allGoals.length === 0) {
    return (
      <div>
        <h1> Goals View </h1>
        <h3>To get started, please add a goal.</h3>
        <h4>If you have not added a user yet, you will need to do so first in the Home page.</h4>
        <button onClick={handleClickUser}>Take Me To 'Create Username'</button>
        <AddGoal handleGoal={handleGoal}/>
      </div>
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
                {goal.tasks.length > 0 ? (
                  <ListGoals goal={goal} handleGoalsDeleteTask={handleGoalsDeleteTask}/>
                ) : (
                  <div>
                    <h4> No tasks are assigned to this goal. Please add a task. </h4>
                  </div>
                )}
                <AddTask userList={userList} handleTask={handleTask} goalId={goal.id} />
              </div>
          ))}
        </ul>
      </div>
    );
  };
};

export default DisplayGoals
