import React, { useState, useContext } from "react";
import { SubtaskContext } from "./SubtasksView.js";

import { Box, Button, Typography, Input } from '@mui/material';

function EditSubtask({ subtask }){
    const { handleEditSubtask } = useContext(SubtaskContext);
    const [ newSubtask, setNewSubtask ] = useState("");

    function handleEdit(subId){
        const url = `http://localhost:5555/subtasksid/${subId}`

        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    subtask: newSubtask,
                    completed: subtask.completed,
                    task_id: subtask.task_id
                }
            )
        }

        fetch(url, configObj)
        .then(r=>r.json())
        .then(subtaskObj=>{
            handleEditSubtask(subtaskObj);
            setNewSubtask("");
        })
    }

    return(
        <Box>
            <Input sx={{ 
                bgcolor:'white', 
                marginRight:2, 
                paddingLeft:1 
            }} 
            value={newSubtask} 
            onChange={(e)=> setNewSubtask(e.target.value)} 
            placeholder={"Rename Subtask..."}></Input>
            <Button
                variant='contained' 
                sx={{ }}
                onClick={() => handleEdit(subtask.id)}
            > Edit Subtask </Button>
        </Box>
    )
};

export default EditSubtask