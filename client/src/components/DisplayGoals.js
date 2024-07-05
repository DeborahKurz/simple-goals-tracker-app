import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddGoal from "./AddGoal.js";
import AddTask from "./AddTask.js";

function DisplayGoals({ allGoals, handleGoal, userList, handleTask, setAllGoals}) {
  const navigate = useNavigate();
  const [displayAddTask, setDisplayAddTask] = useState("NoTask")

  function handleTaskForm(){
    displayAddTask === "NoTask" ? setDisplayAddTask("AddTask") : setDisplayAddTask("NoTask")
  }

  function handleClickUser(){
    navigate("/team");
  }

  function handleDeleteTask(taskId){
    const url = `http://localhost:5555/tasks/${taskId}`;
    const configObj = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'}
    };
    fetch(url, configObj)
    .then(r=>{
      if (!r.ok) {
        throw new Error('Failed to delete task.');
      }
      console.log('Task deleted successfully.');
      const updatedGoals = allGoals.map(goal => ({
        ...goal,
        tasks: goal.tasks.filter(task => task.id != taskId)
      }));
      setAllGoals(updatedGoals)
    })
    .catch(error => {
      console.lerror('Error deleting task:', error);
    });
  }

  if (allGoals.length === 0) {
    return (
      <div>To get started, please add a new goal.</div>
    )
  } else {
    return (
      <div>
        <h5>Click on a username to be taken to the Team View. Please complete tasks in Team View.</h5>
        <AddGoal handleGoal={handleGoal}/>
        <ul>
          {allGoals.map((goal) => (
              <div key={goal.id}>
                <h2>{goal.goal}</h2>
                {goal.tasks.map((aTask, index) => (
                  <div key={index}>
                    <li>{aTask.task}</li>
                    <button onClick={()=> handleClickUser()}>Task Owner: {aTask.user.username}</button>
                    <button onClick={() => handleDeleteTask(aTask.id)}>Delete Task</button>
                  </div>
                ))}
                <br></br>
                {displayAddTask === "AddTask" ? <AddTask handleTask={handleTask} handleTaskForm={handleTaskForm} goalId={goal.id} userList={userList} /> : <button onClick={() => handleTaskForm(goal.id)}>Add A New Task</button>}
              </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayGoals