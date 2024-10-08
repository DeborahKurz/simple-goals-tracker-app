import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Footer from '@mui/material/Box';
import bgImgDk from '../images/backgroundimgdark.png';

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
  const allTasks = userList.flatMap(user => user.tasks);

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/")
    .then(r=>r.json())
    .then((users) => {setUserList(users)})  
    .catch((error) => console.error(error));

    fetch("http://127.0.0.1:5555/goals")
    .then(r=>r.json())
    .then((goals) => {setAllGoals(goals)})
    .catch((error) => console.error(error));
  }, []);


  const handleUser = (user) => { 
    setUserList([...userList, user]);
  };


  const handleGoal = (goal) => {
    setAllGoals([...allGoals, goal]);
  };


  const handleGoalsDeleteTask = (taskId) => {
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
  };


  const handleNewSubtask = (subtask) => {;
    const updatedGoals = allGoals.map((goal) => {
      const updatedTasks = goal.tasks.map((task) => {
        if (task.id === subtask.task_id){
          return {
            ...task,
            subtasks: [...task.subtasks, subtask]
          }
        }
        return task;
      })

      return {
        ...goal,
        tasks: updatedTasks
      }
    });
    setAllGoals(updatedGoals);

    const updatedUsers = userList.map((user) => {
      const updatedTasks = user.tasks.map((task) => {
        if (task.id === subtask.task_id){
          return {
            ...task,
            subtasks: [...task.subtasks, subtask]
          }
        }
        return task;
      });

      return {
        ...user,
        tasks: updatedTasks
      };
    });
    setUserList(updatedUsers);
  };


  const handleCompletedSubtask = (subtaskObj) => {
    setAllGoals(prevGoals => prevGoals.map(goal => ({
      ...goal,
      tasks: goal.tasks.map((task) => ({
        ...task,
        subtasks: task.subtasks.map(subtask => subtask.id === subtaskObj.id ? { ...subtask, completed: true } : subtask)
      }))
    })));

    setUserList(prevUsers => prevUsers.map(user => ({
      ...user,
      tasks: user.tasks.map((task) => ({
        ...task,
        subtasks: task.subtasks.map(subtask => subtask.id === subtaskObj.id ? {...subtask, completed: true} : subtask)
      }))
    })));
  };


  const handleEditSubtask = (editedSubtask) => {
    const updatedGoals = allGoals.map((goal) => ({
        ...goal,
        tasks: goal.tasks.map((task) => ({
            ...task,
            subtasks: task.subtasks.map(subtask =>
                subtask.id === editedSubtask.id ? editedSubtask : subtask
            )
        }))
    }));
    setAllGoals(updatedGoals);

    const updatedUsers = userList.map((user) => ({
        ...user,
        tasks: user.tasks.map((task) => ({
            ...task,
            subtasks: task.subtasks.map(subtask =>
                subtask.id === editedSubtask.id ? editedSubtask : subtask
            )
        }))
    }));
    setUserList(updatedUsers);
  };


  const handleDeletedSubtask = (subId) => {
    setAllGoals(prevGoals => prevGoals.map(goal => ({
      ...goal,
      tasks: goal.tasks.map((task) => ({
        ...task,
        subtasks: task.subtasks.filter(subtask => subtask.id !== subId)
      }))
    })));

    setUserList(prevUsers => prevUsers.map(user => ({
      ...user,
      tasks: user.tasks.map((task) => ({
        ...task,
        subtasks: task.subtasks.filter(subtask => subtask.id !== subId)
      }))
    })));
  };

  const handleDeletedGoal = (goalId) => {
    setAllGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId))
  };

  return (
    <Box sx={{
      margin: -1,
      width: '100%',
      padding: 1,
      display:'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundImage: `url(${bgImgDk})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      color: 'white',
      marginTop: 'auto'
      }}>
      <Context.Provider value={{ 
        userList, setUserList, handleUser, handleUpdatedUser, handleDeleteUser,
        allGoals, handleGoal, handleDeletedGoal, handleGoalsDeleteTask,
        allTasks, handleTask, handleCompletedTask,
        handleNewSubtask, handleCompletedSubtask, handleEditSubtask, handleDeletedSubtask  
        }}>
        <Container             
          sx={{
            flex:1,
            width: '100%',
            height: '100vh',
            padding: 1,
            marginTop: 10,
            color: 'white',
            display:'flex',
            flexDirection: 'column',
          }}>
          <Box>
              <NavBar />
              <Box sx={{ flex:1, marginBottom:5 }}>              
                <Routes>
                  <Route path="/" element={<WelcomePage /> } /> 
                  <Route path="/goals" element={<GoalsView />} /> 
                  <Route path="/users" element={<TeamView />} />
                  <Route path="/users/:userId/tasks/:taskId" element = {<SubtasksView />} />
                  <Route path="/users/:userId" element = {<UserInfo />} />
                  <Route path="*" element={<ErrorPage />} />
               </Routes>
              </Box>
          </Box>
        </Container>
      </Context.Provider>
      <Footer>
          <Box 
            sx={{
              height:'8px', 
              padding: 2, 
              bgcolor: 'black', 
              margin: -1, 
              textAlign: 'center', 
              color: '	#606060', 
              fontSize: '12px'
            }}>Copywrite 2024 Deborah Kurz
          </Box>
      </Footer>
    </Box>
  );
};

export default App;