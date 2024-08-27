import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Paper, Button, Typography } from "@mui/material";

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

  function handleSubtaskClick(taskId){
    navigate(`/subtasks/${taskId}`)
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
          <Typography sx={{ marginLeft:2 }}> Please add tasks in Goals View. </Typography>
            {userList.map((user) => (
                <Box key={user.id} sx={{ marginLeft:2 }}>
                  <h2>{user.username}</h2>
                  {user.tasks.length === 0 ? (
                    <Box Box sx={{ marginLeft:2 }}>
                      <h4 style={{ color: "green" }}> <em>Nice Work! You have no outstanding tasks.</em></h4>
                    </Box>
                  ) : (
                    user.tasks.every(task => task.completed === true) ? (
                      <Box>
                        <h4 style={{ color: "green" }}> <em>Nice Work! You have no outstanding tasks.</em></h4>
                      </Box>
                    ):(
                      user.tasks.map((aTask) => (
                        aTask.completed === false ? (
                        <Paper key={aTask.id} elevation={20} sx={{ 
                            padding:2, 
                            paddingTop:1,
                            marginBottom:2,
                            display:'flex',
                            flexDirection:'row' 
                          }}>
                          <li style={{ width:"500px", height: "50px"}}>{aTask.task}</li>
                          <Button variant="outlined" sx={{fontSize:'13px', fontWeight:'bold', color:'black', margin: 1, marginLeft: 'auto', width:'200px'}} onClick={()=> handleClickGoal()}>Goal: {aTask.goal.goal}</Button>
                          <CompleteTask task={aTask}/>
                          <Button 
                            variant="contained" 
                            sx={{ 
                              fontSize:'13px', 
                              fontWeight:'bold', 
                              margin:1,
                              paddingLeft:4,
                              paddingRight:4
                            }} 
                            onClick={()=> handleSubtaskClick(aTask.id)}>View Subtasks</Button>
                        </Paper>
                        ) : null
                      )
                    )
                  )
                )}
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default TeamView
