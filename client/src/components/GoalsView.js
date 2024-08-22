import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App.js";

import AddGoal from "./AddGoal.js";
import AddTask from "./AddTask.js";
import ListGoals from "./ListGoals.js";

function DisplayGoals() {
  const navigate = useNavigate();
  const { userList, allGoals } = useContext(Context);

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
              <AddGoal />
            </div>
          ) : (
            <div>
              <AddGoal />
              <ul>
              {allGoals.map((goal) => (
                <div key={goal.id}>
                  <h2>{goal.goal}</h2>
                  {goal.tasks.length > 0 ? (
                    <ListGoals goal={goal}/>
                  ) : (
                    <div>
                      <h4> No tasks are assigned to this goal. Please add a task. </h4>
                    </div>
                  )}
                  <AddTask goalId={goal.id} />
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
