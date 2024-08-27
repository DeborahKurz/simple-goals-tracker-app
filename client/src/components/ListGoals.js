import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Paper, Button, Typography } from '@mui/material';

import DeleteGoalTask from "./DeleteGoalTask.js";

function ListGoals({ goal }){
    const navigate = useNavigate();

    function handleClickTeam(){
        navigate("/team");
      };

    return (
        <Box>
            {goal.tasks.map((aTask) => (
                    aTask.completed === false ? (
                        <Paper key={aTask.id} elevation={10} sx={{ display: "flex", alignItems: "center", paddingLeft:2, paddingRight:1, marginBottom:1 }}>
                            <Typography sx={{}}>{aTask.task}</Typography>
                            <Button variant="outlined" sx={{fontSize:'13px', fontWeight:'bold', color:'black', margin: 1, marginLeft: 'auto', width:'200px'}} onClick={()=> handleClickTeam()}> {aTask.user.username}</Button>
                        <DeleteGoalTask taskId={aTask.id} />
                        </Paper>
                    ) : (
                        <Paper key={aTask.id} elevation={10} sx={{ display: "flex", alignItems: "center", paddingLeft:2, paddingRight:1, marginBottom:1 }}>
                            <Typography sx={{ textDecoration: 'line-through'}}>Completed: {aTask.task}</Typography>
                            <Button variant="outlined" sx={{fontSize:'13px', fontWeight:'bold', color:'black', margin: 1, marginLeft: 'auto', width:'200px'}} onClick={()=> handleClickTeam()}>{aTask.user.username}</Button>
                            <DeleteGoalTask taskId={aTask.id} />
                        </Paper>
                    )
            ))}
        </Box>
    )
};

export default ListGoals
