import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import ExistingUserLogin from "./ExistingUserLogin.js";
import CreateNewUser from "./CreateNewUser";
import GoalsRoute from "./GoalsRoute.js";
import WelcomePage from "./WelcomePage.js";
import TasksRoute from "./TasksRoute.js";
import ErrorPage from "./ErrorPage.js";

function App() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState([]); 
  const [userGoals, setUserGoals] = useState([]);
  const [goal, setGoal] = useState([]); 

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/")
    .then(r=>r.json())
    .then((users) => {
      setUserList(users)
    })
    .catch((error) => console.error(error));
  }, [])

  const handleUser = (user) => { 
    setUser(user);
    setUserGoals(user.goals);
  }

  const handleSetGoal = (newGoal) => {
    setUserGoals([...userGoals, newGoal]);
    setGoal(newGoal)
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage /> } /> 
        <Route path="/login" element={<ExistingUserLogin handleUser={handleUser} user={user} userList={userList}/>} /> 
        <Route path="/new" element={<CreateNewUser handleUser={handleUser} userList={userList}/>} /> 
        <Route path="/goals" element={<GoalsRoute user={user} userGoals={userGoals} handleSetGoal={handleSetGoal} />} />
        <Route path="/tasks" element={<TasksRoute goal={goal} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
//user needs the userlist and the ability to set the state username
//goals needs to know what the user is & have the ability to set the state goal. From this info it can derive what the goals are.
  //goals should set a app.py goal state variable for tasks route.
//tasks needs to know what the goal is. From this info it can derive what the tasks are.
export default App;
