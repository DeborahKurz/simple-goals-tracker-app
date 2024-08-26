import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import NavBar from "./NavBar.js";
import GoalsView from "./GoalsView.js";
import WelcomePage from "./WelcomePage.js";
import TeamView from "./TeamView.js";
import SubtasksView from "./SubtasksView.js";
import UserInfo from "./UserInfo.js";
import ErrorPage from "./ErrorPage.js";

export const Context = React.createContext();

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
    if(allTasks.length === 0) {
      setAllTasks(goal.tasks);
    }else{
      const updatedTasks = [...allTasks, ...goal.tasks];
      setAllTasks(updatedTasks);
    }
  };


  const handleGoalsDeleteTask = (taskId) => {
    const updatedTasks = allTasks.filter(task => task.id != taskId);
    setAllTasks(updatedTasks);

    const updatedGoals = allGoals.map(goal => ({
      ...goal,
      tasks: goal.tasks.filter(task => task.id != taskId)
    }));
    setAllGoals(updatedGoals);

    const updatedUsers = userList.map(user => ({
      ...user,
      tasks: user.tasks.filter(task => task.id != taskId)
    }));
    setUserList(updatedUsers);
  };


  const handleTask = (task) => {
    const updatedTasks = allTasks.length > 0 ? [...allTasks, task] : [task];
    setAllTasks(updatedTasks);

    const updatedGoals = allGoals.map((goal) => {
      if(goal.id === task.goals_id) {
        return {
          ...goal,
          tasks: [...goal.tasks, task]
        }
      }
      return goal;
    });
    setAllGoals(updatedGoals);

    const updatedUsers = userList.map((user) => {
      if(user.id === task.users_id) {
        return {
          ...user,
          tasks: [...user.tasks, task]
        }
      }
      return user;
    })
    setUserList(updatedUsers);
  };


  const handleCompletedTask = (taskObj) => {
    setAllTasks(prevTasks => prevTasks.map(task => task.id === taskObj.id ? { 
      ...task, 
      completed: true 
    } : task));

    setAllGoals(prevGoals => prevGoals.map(goal => ({
      ...goal,
      tasks: goal.tasks.map(task => task.id === taskObj.id ? {...task, completed: true } : task)
    })));

    setUserList(prevUsers => prevUsers.map(user => ({
      ...user,
      tasks: user.tasks.map(task => task.id === taskObj.id ? {...task, completed: true } : task)
    })));
  };


  const handleUpdatedUser = (userObj) => {
    setUserList(prevUsers => prevUsers.map(user => user.id === userObj.id ? { 
      ...user, 
      username: userObj.username 
    } : user));
  };


  const handleDeleteUser = (userId) => {
    setUserList(prevUsers => prevUsers.filter(user => user.id !== userId))
  }

  return (
    <Context.Provider value={{ 
        userList, setUserList, handleUser, handleUpdatedUser, handleDeleteUser,
        allTasks, setAllTasks,
        allGoals, handleGoal, handleGoalsDeleteTask,
        handleTask, handleCompletedTask  
        }}>
        <Container>
          <Box sx={{bgcolor: 'white'}}>
            {/* <div style={{marginLeft: "25px"}}> */}
              <NavBar />
              <Routes>
                <Route path="/" element={<WelcomePage /> } /> 
                <Route path="/goals" element={<GoalsView />} /> 
                <Route path="/team" element={<TeamView />} />
                <Route path="/subtasks/:taskId" element = {<SubtasksView />} />
                <Route path="/user/:userId" element = {<UserInfo />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            {/* </div> */}
          </Box>
        {/* <div style={{width: "100%", height: "100px", background: "linear-Gradient(#C0C0C0, white)"}}>
        </div> */}
        </Container>
    </Context.Provider>
  );
};

export default App;
