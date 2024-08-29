import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Paper, Button, Typography } from "@mui/material";
import bgImg from '../images/backgroundimg.png';

import CompleteTask from "./CompleteTask.js";

function TeamView(){
  const navigate = useNavigate();
  const { userList } = useContext(Context);

  function handleClickUser(){
    navigate("/");
  };

  function handleClickGoal(){
    navigate("/goals");
  };

  function handleSubtaskClick(task){
    const usersId = task.users_id
    console.log("usersId: ", usersId)
    navigate(`/users/${usersId}/tasks/${task.id}`)
    // navigate(`/subtasks/${task}`)
  };

  return(
    <Box>
      <Typography sx={{fontSize: 'h3.fontSize', marginBottom:2}}>Team View</Typography>
      {userList.length === 0 ? (
        <Box sx={{ marginBottom: 5 }}>
          <Typography sx={{ fontWeight:'bold', fontSize:'13px' }}>To get started, please create a username.</Typography>
          <Button onClick={handleClickUser}>Take Me To 'Create Username'</Button>
        </Box>
      ) : (
        <Box sx={{ marginBottom: 5 }}>
          <Typography sx={{ marginLeft:2, marginBottom:5 }}> Please add tasks in Goals View. </Typography>
            {userList.map((user) => (
                <Paper key={user.id} elevation={10} sx={{
                  paddingTop:1,
                  paddingBottom:1,
                  paddingLeft:3,
                  paddingRight:3, 
                  marginLeft:2, 
                  marginBottom:8,
                  marginTop:3,
                  backgroundImage: `url(${bgImg})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover', 
                  backgroundRepeat: 'no-repeat', 
                  color:'white'
                  }}>
                  <Typography sx={{ fontWeight:'bold', fontSize:'25px', paddingTop:2, paddingBottom:2 }}>{user.username}</Typography>

                  {user.tasks.length === 0 ? (
                    <Paper sx={{ marginLeft:2, marginBottom:2, padding:2 }}>
                      <Typography sx={{ color:'green', fontWeight:'bold' }}> <em>Nice Work! You have no outstanding tasks.</em></Typography>
                    </Paper>
                    
                  ) : (
                    user.tasks.every(task => task.completed === true) ? (
                      <Paper elevation={10} sx={{ marginLeft:2, marginBottom:2, padding:2 }}>
                        <Typography sx={{ color:'green', fontWeight:'bold' }}> <em>Nice Work! You have no outstanding tasks.</em></Typography>
                      </Paper>

                    ):(
                      user.tasks.map((aTask) => (
                        aTask.completed === false ? (
                        <Paper key={aTask.id} elevation={10} sx={{ 
                            padding:2, 
                            paddingTop:1,
                            paddingBottom:1,
                            marginBottom:2, 
                            bgcolor:'#F0F0F0',
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center' 
                          }}>
                          <Typography sx={{ fontWeight:'bold' }}>{aTask.task}</Typography>
                          <Button variant="outlined" sx={{
                            fontSize:'13px', 
                            fontWeight:'bold', 
                            color:'black', 
                            margin:1, 
                            marginLeft:'auto',
                            width:'300px'
                          }} onClick={()=> handleClickGoal()}>Goal: {aTask.goal.goal}</Button>
                          <CompleteTask task={aTask}/>
                            <Button 
                              variant="contained" 
                              sx={{ 
                                fontSize:'13px', 
                                fontWeight:'bold', 
                                margin:1
                              }} 
                              onClick={()=> handleSubtaskClick(aTask)}>View Subtasks</Button>
                        </Paper>
                        ) : null
                      )
                    )
                  )
                )}
              </Paper>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default TeamView
