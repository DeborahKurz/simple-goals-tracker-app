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

//get all goals.tasks
//get all tasks.goals
  // const [userGoals, setUserGoals] = useState([]); //sets 1 user's goals
  // const [goal, setGoal] = useState([]);  //sets 1 goal

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
  }, [user])

  console.log("allGoals ", allGoals)

  const handleUser = (user) => { 
    setUser(user);
    // setUserList(user.goals);
    console.log("App.js handleUser: ", user)
  }

  const handleGoal = (goal) => {
    setAllGoals([...allGoals, goal]);
    // setGoal(newGoal)
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage userList={userList} handleUser={handleUser}/> } />  
        <Route path="/goals" element={<GoalsView allGoals={allGoals} handleGoal={handleGoal}/>} />   
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

        // {/* <Route path="/goals" element={<GoalsView user={user} userGoals={userGoals} handleSetGoal={handleSetGoal} />} /> */}
        // {/* <Route path="/team" element={<TeamView goal={goal} />} /> */}
