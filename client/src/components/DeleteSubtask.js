import React, { useContext } from "react";
import { SubtaskContext } from "./SubtasksView.js";

import { Box, Button } from '@mui/material';

function DeleteSubtask({ subtask }){
    const { handleDeletedSubtask } = useContext(SubtaskContext);

    function handleDelete(subId){
        const url = `http://localhost:5555/subtasksid/${subId}`

        const configObj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };

        fetch(url, configObj)
        .then(r=>{
            if (!r.ok) {
              throw new Error('Failed to delete task.');
            }
            console.log('Task deleted successfully.');
            handleDeletedSubtask(subId)
        })
        .catch(error => {
            console.error('Error deleting task:', error);
          });
    };

    return(
        <div>
            <Button variant="contained" 
                sx={{ 
                    fontSize:'13px', 
                    fontWeight:'bold', 
                    bgcolor:"#FF007F", 
                    color:'white', 
                    margin: 1
                }} 
                onClick={() => handleDelete(subtask.id)}
            > Delete Subtask </Button>
        </div>
    )
}

export default DeleteSubtask