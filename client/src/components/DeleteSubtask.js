import React, { useContext } from "react";
import { Context } from "./App.js";

import { Button } from '@mui/material';

function DeleteSubtask({ subtask }){
    const { handleDeletedSubtask } = useContext(Context);

    function handleDelete(subId){
        const url = `http://localhost:5555/subtasksid/${subId}`

        const configObj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };

        fetch(url, configObj)
        .then(r=>{
            if (!r.ok) {
              throw new Error('Failed to delete subtask.');
            }
            handleDeletedSubtask(subId)
        })
        .catch(error => {
            console.error('Error deleting subtask:', error);
          });
    };

    return(
         <Button variant="contained" 
                sx={{ 
                    fontSize:'13px', 
                    fontWeight:'bold', 
                    bgcolor:"#FF007F", 
                    color:'white', 
                    margin:1,
                    whiteSpace:'nowrap'
                }} 
                onClick={() => handleDelete(subtask.id)}
        > Delete Subtask </Button>
    )
}

export default DeleteSubtask