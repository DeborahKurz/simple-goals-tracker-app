import React from "react";
import { useNavigate } from "react-router-dom";

import CompleteTask from "./CompleteTask.js";

function TeamView({ userList, handleCompletedTask }){
  const navigate = useNavigate();

  function handleClickUser(){
    navigate("/");
  };

  function handleClickGoal(){
    navigate("/goals");
  };

  return(
    <div>
      <h1>Team View</h1>
      {userList.length === 0 ? (
        <div>
          <h3>To get started, please create a username.</h3>
          <button onClick={handleClickUser}>Take Me To 'Create Username'</button>
        </div>
      ) : (
        <div>
          <h4> Please add tasks in Goals View. </h4>
          <ul>
              {userList.map((user) => (
                  <div key={user.id}>
                    <h2>{user.username}</h2>
                    {user.tasks.length === 0 ? (
                      <div>
                        <h4 style={{ color: "green" }}> <em>Nice Work! You have no outstanding tasks.</em></h4>
                      </div>
                    ) : (
                      user.tasks.every(task => task.completed === true) ? (
                        <div>
                          <h4 style={{ color: "green" }}> <em>Nice Work! You have no outstanding tasks.</em></h4>
                        </div>
                      ):(
                        user.tasks.map((aTask) => (
                          aTask.completed === false ? (
                          <div key={aTask.id} style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                            <li style={{ width:"500px", height: "50px", border: "2px solid black", marginRight: "-2px" }}>{aTask.task}</li>
                            <button style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }} onClick={()=> handleClickGoal()}>Goal: {aTask.goal.goal}</button>
                            <CompleteTask task={aTask} handleCompletedTask={handleCompletedTask}/>
                          </div>
                          ) : null
                        )
                      )
                    )
                  )}
                  <br></br>
                </div>
              ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default TeamView
