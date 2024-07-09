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

  const handleUser = (user) => { 
    setUserList([...userList, user]);
  }

  const handleGoal = (goal) => {
    setAllGoals([...allGoals, goal]);
    setAllTasks(allTasks);
  };

  const handleGoalsDeleteTask = (taskId) => {
    const updatedGoals = allGoals.map(goal => ({
      ...goal,
      tasks: goal.tasks.filter(task => task.id != taskId)
    }));

    const updatedTasks = allTasks.filter(task => task.id != taskId);

    setAllGoals(updatedGoals);
    setAllTasks(updatedTasks);
  };

  const handleTask = (task) => {
    const updatedGoals = allGoals.map(goal => ({
      ...goal,
      tasks: [...goal.tasks, task]
    }));

    const updatedTasks = [...allTasks, task];

    setAllGoals(updatedGoals);
    setAllTasks(updatedTasks);
  };

  const handleCompletedTask = (taskObj) => {
    const updatedUsers = userList.map(user => ({
      ...user,
      tasks: user.tasks.map(task => 
        task.id === taskObj.id ? { ...task, completed: true } : task)
    }));

    const updatedTasks = allTasks.map(task => task.id === taskObj.id ? { ...task.task, completed: true } : task);

    setUserList(updatedUsers);
    setAllTasks(updatedTasks);
  };

  return (
    <div style={{width: "100%", height: "100px", background: "linear-Gradient(#C0C0C0, white)"}}>
      <div style={{marginLeft: "25px"}}>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage userList={userList} handleUser={handleUser} allTasks={allTasks}/> } /> 
          <Route path="/goals" element={<GoalsView userList={userList} allGoals={allGoals} handleGoal={handleGoal} handleGoalsDeleteTask={handleGoalsDeleteTask} handleTask={handleTask}/>} /> 
          <Route path="/team" element={<TeamView userList={userList} handleCompletedTask={handleCompletedTask} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
