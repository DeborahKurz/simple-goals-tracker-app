import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Paper, Button, Typography } from "@mui/material";

import AddGoal from "./AddGoal.js";
import AddTask from "./AddTask.js";
import ListGoals from "./ListGoals.js";

function DisplayGoals() {
  const navigate = useNavigate();
  const { userList, allGoals } = useContext(Context);

  function handleClickUser(){
    navigate("/");
  }

  return (
    <Box>
      <Typography sx={{fontSize: 'h3.fontSize', marginBottom:2}}> Goals View </Typography>
      {userList.length === 0 ? (
        <Box sx={{ marginBottom: 5 }}>
          <Typography sx={{ fontWeight:'bold', fontSize:'13px' }}>To get started, please create a username.</Typography>
          <Button onClick={handleClickUser}>Take Me To 'Create Username'</Button>
        </Box>
      ) : (
        <Box sx={{ marginBottom: 5 }}>
          <Typography sx={{ marginLeft:2 }}>Navigate to Team View to mark tasks as completed.</Typography>
          {allGoals.length === 0 ? (
            <Box sx={{ marginLeft:2 }}>
              <Typography sx={{ fontWeight:'bold', fontSize:'17px', marginTop:2, marginBottom:2 }}>Please Add A Goal</Typography>
              <AddGoal />
            </Box>
          ) : (
            <Box sx={{ marginLeft:2 }}>
              <Box>
                <AddGoal />
              </Box>
              {allGoals.map((goal) => (
                <Paper key={goal.id} sx={{ 
                  padding:2, 
                  paddingTop:1,
                  paddingBottom:1,
                  marginBottom:2, 
                  bgcolor:'#F0F0F0'
                  }}>
                  <Typography sx={{ fontWeight:'bold', fontSize:'22px', marginTop:2, marginBottom:2, marginLeft:1}}>{goal.goal}</Typography>
                  {goal.tasks.length > 0 ? (
                    <ListGoals goal={goal}/>
                  ) : (
                    <Paper elevation={20} sx={{ 
                      padding:2, 
                      paddingTop:1,
                      marginBottom:2, 
                      }}>
                      <Typography sx={{ margin:2, fontWeight:'bold' }}>Please add a task.</Typography>
                    </Paper>
                  )}
                  <AddTask goalId={goal.id} />
                </Paper>
              ))}

            </Box>
          )}
        </Box>
      )}
    </Box>
  )
};

export default DisplayGoals
