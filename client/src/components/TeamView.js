import React from "react";
import { useNavigate } from "react-router-dom";

import CompleteTask from "./CompleteTask.js";

function TeamView({ userList, handleCompletedTask }){
  const navigate = useNavigate();

  function handleClickGoal(){
    navigate("/goals");
  };

  if (userList.length === 0) {
    return (
      <div>
        <h1> Team View </h1>
        <h3>To get started, please add a goal in Goals View.</h3>
        <button onClick={handleClickGoal}> Go To 'Goals View' </button>
      </div>
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
                  {user.tasks.length === 0 ? (
                    <div>
                      <h4> To get started, please add a task in Goals View. </h4>
                      <button onClick={handleClickGoal}> Go To 'Goals View' </button>
                    </div>
                  ) : (
                    user.tasks.map((aTask) => (
                      aTask.completed === false ? (
                      <div key={aTask.id} style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                        <li style={{ width:"500px", height: "50px", border: "2px solid black", marginRight: "-2px" }}>{aTask.task}</li>
                        <button style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }} onClick={()=> handleClickGoal()}>Goal: {aTask.goal.goal}</button>
                        <CompleteTask task={aTask} handleCompletedTask={handleCompletedTask}/>
                      </div>
                      ) : null
                    ))
                  )}
                  <br></br>
                </div>
            ))}
          </ul>
      </div>
    )
  }

}

export default TeamView
