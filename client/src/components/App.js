import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar.js";
import GoalsView from "./GoalsView.js";
import WelcomePage from "./WelcomePage.js";
import TeamView from "./TeamView.js";
import ErrorPage from "./ErrorPage.js";

function App() {
  const [userList, setUserList] = useState([]); //all users
  const [user, setUser] = useState([]);  //runs useEffect after CreateNewUser adds a username
  const [allGoals, setAllGoals] = useState([]);
  const [allTasks, setAllTasks] = useState([])
  const [task, setTask] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/")
    .then(r=>r.json())
    .then((users) => {
      setUserList(users)
    })
    .catch((error) => console.error(error));

    fetch("http://127.0.0.1:5555/goals")
    .then(r=>r.json())
    .then((goals) => {
      setAllGoals(goals)
    })

    fetch("http://127.0.0.1:5555/tasks")
    .then(r=>r.json())
    .then((tasks) => {
      setAllTasks(tasks)
    })
  }, [task])


  const handleUser = (user) => { 
    setUserList([...userList, user]);
    // setUser(user);
  }

  const handleGoal = (goal) => {
    setAllGoals([...allGoals, goal]);
  };

  const handleTask = (task) => {
    setAllTasks([...allTasks, task]);
    setTask(task);
  };

  const handleCompletedTask = (task) => {
    setTask(task);
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage userList={userList} handleUser={handleUser}/> } />  
        <Route path="/goals" element={<GoalsView allGoals={allGoals} handleGoal={handleGoal} userList={userList} handleTask={handleTask} setAllGoals={setAllGoals} setUser={setUser}/>} /> 
        <Route path="/team" element={<TeamView userList={userList} allGoals={allGoals} setAllGoals={setAllGoals} setUser={setUser} handleCompletedTask={handleCompletedTask}/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

