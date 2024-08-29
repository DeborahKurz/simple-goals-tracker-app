import React, { useContext } from "react";
import { Context } from "./App.js";

import { Box, Button } from '@mui/material';

function CompleteSubtask({ subtask }){
    const { handleCompletedSubtask } = useContext(Context);

    function handleClick(subtask){
        const id = subtask.id;
        const url = `http://localhost:5555/subtasksid/${id}`;
        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    subtask: subtask.subtask,
                    completed: true,
                    task_id: subtask.task_id,
                }
            )
        };
        
        fetch(url, configObj)
        .then(r=>r.json())
        .then(subtaskObj=>{
            handleCompletedSubtask(subtaskObj)
        })
    };

    return(
        <Box>
            <Button variant="contained" sx={{ 
                fontSize:'13px', 
                fontWeight:'bold', 
                margin:1,
                bgcolor:'#42a5f5'
            }} onClick={()=> handleClick(subtask)}>Task Done</Button>
        </Box>
    )
};

export default CompleteSubtask
