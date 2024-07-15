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

  return (
    <div>
      <h1> Goals View </h1>
      {userList.length === 0 ? (
        <div>
          <h3>To get started, please create a username.</h3>
          <button onClick={handleClickUser}>Take Me To 'Create Username'</button>
        </div>
      ) : (
        <div>
          <h5>Navigate to Team View to mark tasks as completed.</h5>
          {allGoals.length === 0 ? (
            <div>
              <h3>Please Add A Goal</h3>
              <AddGoal handleGoal={handleGoal}/>
            </div>
          ) : (
            <div>
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
          )}
        </div>
      )}
    </div>
  )
};

export default DisplayGoals
