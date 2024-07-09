import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar.js";
import GoalsView from "./GoalsView.js";
import WelcomePage from "./WelcomePage.js";
import TeamView from "./TeamView.js";
import ErrorPage from "./ErrorPage.js";

function App() {
  const [userList, setUserList] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [task, setTask] = useState([]);


  useEffect(()=>{
    fetch("http://127.0.0.1:5555/")
    .then(r=>r.json())
    .then((users) => {setUserList(users)})  
    .catch((error) => console.error(error));

    fetch("http://127.0.0.1:5555/goals")
    .then(r=>r.json())
    .then((goals) => {setAllGoals(goals)})
    .catch((error) => console.error(error));

    fetch("http://127.0.0.1:5555/tasks")
    .then(r=>r.json())
    .then((tasks) => {setAllTasks(tasks)})
    .catch((error) => console.error(error));
  }, []);


  //Needed for WelcomePage updating state
  const handleUser = (user) => { 
    setUserList([...userList, user]);
  }
  //GoalsView needs to see what to display and to add a goal
  const handleGoal = (goal) => {
    setAllGoals([...allGoals, goal]);
  };

  const handleGoalsDeleteTask = (taskId) => {
    const updatedGoals = allGoals.map(goal => ({
      ...goal,
      tasks: goal.tasks.filter(task => task.id != taskId)
    }));
    setAllGoals(updatedGoals);
  };

  //AddTask.js uses this through GoalsView
  const handleTask = (task) => {
    const updatedGoals = allGoals.map(goal => ({
      ...goal,
      tasks: [...goal.tasks, task]
    }))
    setAllGoals(updatedGoals);
  };

  const handleCompletedTask = (taskObj) => {
    console.log(taskObj)
    //udpated taskObj
    //update AllGoals. Remove the old taskObj. Add a new task obj



    // const updatedTasks = allTasks.map(task => ({
    //   ...task,
    //   task: task.filter(task => task.id != taskObj.id)
    // })) //removes updated task
    // setAllGoals(updatedTasks) //updates state array
    // handleTask(taskObj) //adds task back into state array
    // // setTask(task);
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage userList={userList} handleUser={handleUser} allTasks={allTasks}/> } /> 

        <Route path="/goals" element={<GoalsView userList={userList} allGoals={allGoals} handleGoal={handleGoal} handleGoalsDeleteTask={handleGoalsDeleteTask} handleTask={handleTask}/>} /> 

        <Route path="/team" element={<TeamView userList={userList} setUserList={setUserList}  allGoals={allGoals} setAllGoals={setAllGoals} allTasks={allTasks} setAllTasks={setAllTasks} setUser={setUser} handleCompletedTask={handleCompletedTask} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
