import React from "react";
import { useNavigate } from "react-router-dom";
import AddGoal from "./AddGoal.js";
import AddTask from "./AddTask.js";
import DeleteTask from "./DeleteTask.js";

function DisplayGoals({ allGoals, handleGoal, userList, handleTask, setAllGoals, setUser}) {
  const navigate = useNavigate();

  function handleClickUser(){
    navigate("/team");
  }

  if (allGoals.length === 0) {
    return (
      <div>To get started, please add a new goal.</div>
    )
  } else {
    return (
      <div>
        <h1> Goals View </h1>
        <h5 onClick={handleClickUser}>Navigate to Team View to mark tasks as completed.</h5>
        <AddGoal handleGoal={handleGoal}/>
        <ul>
          {allGoals.map((goal) => (
              <div key={goal.id}>
                <h2>{goal.goal}</h2>
                {goal.tasks.map((aTask, index) => (
                  aTask.completed === false ? (
                    <div key={index}>
                      <li>{aTask.task}</li>
                      <button onClick={()=> handleClickUser()}>Task Owner: {aTask.user.username}</button>
                      <DeleteTask taskId={aTask.id} allGoals={allGoals} setAllGoals={setAllGoals}/>
                    </div>
                  ) : (
                    <div key={index}>
                      <li style={{textDecoration: 'line-through' }}>Completed: {aTask.task}</li>
                      <button onClick={()=> handleClickUser()}>Task Owner: {aTask.user.username}</button>
                      <DeleteTask taskId={aTask.id} allGoals={allGoals} setAllGoals={setAllGoals} setUser={setUser}/>
                    </div>
                  )
                ))}
                <br></br>
                <AddTask handleTask={handleTask} goalId={goal.id} userList={userList} />
              </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayGoals

  // const [displayAddTask, setDisplayAddTask] = useState("NoTask")

  // function handleTaskForm(){
  //   displayAddTask === "NoTask" ? setDisplayAddTask("AddTask") : setDisplayAddTask("NoTask")
  // }