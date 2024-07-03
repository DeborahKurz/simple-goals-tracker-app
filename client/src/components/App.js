import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar.js";
import GoalsView from "./GoalsView.js";
import WelcomePage from "./WelcomePage.js";
import TeamView from "./TeamView.js";
import ErrorPage from "./ErrorPage.js";

function App() {
  const [userList, setUserList] = useState([]); //all users
//get all goals.tasks
//get all tasks.goals


  const [user, setUser] = useState([]);  //sets 1 user
  const [userGoals, setUserGoals] = useState([]); //sets 1 user's goals
  const [goal, setGoal] = useState([]);  //sets 1 goal

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
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage userList={userList}/> } />     
        <Route path="/goals" element={<GoalsView user={user} userGoals={userGoals} handleSetGoal={handleSetGoal} />} />
        <Route path="/team" element={<TeamView goal={goal} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
