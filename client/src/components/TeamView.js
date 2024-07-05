import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import CompleteTask from "./CompleteTask.js"
import DeleteTask from "./DeleteTask.js";

function TeamView({ userList, allGoals, setAllGoals, handleTask, setUser }){
  const navigate = useNavigate()
  const [newGoalId, setNewGoalId] = useState(null)

  function handleClickGoal(goalId){
    navigate("/goals");
    setNewGoalId(goalId)
  }

  if (userList.length === 0) {
    return (
      <div>To get started, please add a new goal.</div>
    )
  } else {
    return(
      <div>
        <h1> Team View </h1>
        <h5>Please create goals and tasks in the Goals View in order to undertand how tasks relate to each goal.</h5>
        <ul>
            {userList.map((user) => (
                <div key={user.id}>
                  <h2>{user.username}</h2>
                  {user.tasks.map((aTask, index) => (
                    <div key={index}>
                      <li>{aTask.task}</li>
                      <button onClick={()=> handleClickGoal(aTask.goal.id)}>Goal: {aTask.goal.goal}</button>
                      <CompleteTask task={aTask}/>
                      <DeleteTask taskId={aTask.id} allGoals={allGoals} setAllGoals={setAllGoals} setUser={setUser} userList={userList}/>
                    </div>
                  ))}
                  <br></br>
                </div>
            ))}
          </ul>
      </div>
    )
  }

}

export default TeamView

// import DisplayTasks from "./DisplayTasks.js";
// import AddTask from "./AddTask.js";
// {/* <AddTask handleTask={handleTask} goalId={newGoalId} userList={userList} /> */}
