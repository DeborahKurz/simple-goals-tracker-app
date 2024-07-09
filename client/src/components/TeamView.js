import React from "react";
import { useNavigate } from "react-router-dom";

import CompleteTask from "./CompleteTask.js";
import DeleteTask from "./DeleteTask.js";

function TeamView({ userList, setUserList, allGoals, setAllGoals, allTasks, setAllTasks, setUser, handleCompletedTask }){
  const navigate = useNavigate();

  function handleClickGoal(){
    navigate("/goals");
  };

  if (userList.length === 0) {
    return (
      <div>To get started, please add a new goal.</div>
    )
  } else {
    return(
      <div>
        <h1> Team View </h1>
        <h5>Create goals and tasks in the Goals View in order to undertand how tasks relate to each goal.</h5>
        <ul>
            {userList.map((user) => (
                <div key={user.id}>
                  <h2>{user.username}</h2>
                  {user.tasks.map((aTask) => (
                    aTask.completed === false ? (
                    <div key={aTask.id}>
                      <li>{aTask.task}</li>
                      <button onClick={()=> handleClickGoal()}>Goal: {aTask.goal.goal}</button>
                      <CompleteTask task={aTask} handleCompletedTask={handleCompletedTask}/>
                      <DeleteTask taskId={aTask.id} allGoals={allGoals} setAllGoals={setAllGoals} setUser={setUser} allTasks={allTasks} setAllTasks={setAllTasks} userList={userList} setUserList={setUserList}/>
                    </div>
                    ) : null
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
