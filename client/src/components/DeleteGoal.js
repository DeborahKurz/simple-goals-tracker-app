import React, { useContext } from "react";
import { Context } from "./App.js";

import { Button } from '@mui/material';

function DeleteGoal({ goalId }){
    const { handleDeletedGoal } = useContext(Context);

    function handleDelete(goalId){
        const url = `http://localhost:5555/goalid/${goalId}`

        const configObj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };

        fetch(url, configObj)
        .then(r=>{
            if (!r.ok) {
              throw new Error('Failed to delete goal.');
            }
            handleDeletedGoal(goalId)
        })
        .catch(error => {
            console.error('Error deleting goal:', error);
          });
    };

    return(
         <Button variant="contained" 
                sx={{ 
                    fontSize:'13px', 
                    fontWeight:'bold', 
                    bgcolor:"darkgray", 
                    color:'#FF007F', 
                    margin:1,
                    whiteSpace:'nowrap'
                }} 
                onClick={() => handleDelete(goalId)}
        > Delete Goal </Button>
    )
}

export default DeleteGoal