import React, { useContext } from "react";
import { Context } from "./App.js";

import { Box, Button } from '@mui/material';

function CompleteTask({ task }){
    const { handleCompletedTask } = useContext(Context);

    function handleClick(task){
        const id = task.id;
        const url = `http://localhost:5555/tasks/${id}`;
        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    task: task.task,
                    completed: true,
                    goals_id: task.goals_id,
                    users_id: task.users_id
                }
            )
        };
        
        fetch(url, configObj)
        .then(r=>r.json())
        .then(taskObj=>{handleCompletedTask(taskObj)})
    };

    return(
        <Box>
            <Button variant="contained" sx={{ 
                fontSize:'13px', 
                fontWeight:'bold', 
                margin:1,
                bgcolor:'#42a5f5'
            }} onClick={()=> handleClick(task)}>Task Done</Button>
        </Box>
    )
};

export default CompleteTask;