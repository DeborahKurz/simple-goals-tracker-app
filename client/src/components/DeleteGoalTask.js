import React, { useContext } from "react";
import { Context } from "./App.js";

import { Box, Button } from '@mui/material';

function DeleteTask({ taskId }) {
  const { handleGoalsDeleteTask } = useContext(Context);

    function handleDeleteTask(id){
        const url = `http://localhost:5555/tasks/${id}`;

        const configObj = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json'}
        };

        fetch(url, configObj)
        .then(r=>{
          if (!r.ok) {
            throw new Error('Failed to delete task.');
          }

          console.log('Task deleted successfully.');
          handleGoalsDeleteTask(id)
        }) 
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    }

    return (
        <Button variant="contained" 
          sx={{ 
            fontSize:'13px', 
            fontWeight:'bold', 
            bgcolor:"#FF007F", 
            color:'white', 
            margin: 1
          }} 
          onClick={()=> handleDeleteTask(taskId)}>Delete Task</Button>
    )
}
export default DeleteTask