import React, { useContext } from "react";
import { Context } from "./App.js";
import { useNavigate } from "react-router-dom";

import { Button } from '@mui/material';

function DeleteUser({ user }){
    const { handleDeleteUser } = useContext(Context);
    const navigate = useNavigate();

    function handleDelete(user){
        const url = `http://localhost:5555/${user.id}`
        const configObj = {
            method: 'DELETE'
        };
        fetch(url, configObj)
        .then(()=>{
            handleDeleteUser(user.id);
            navigate('/');
        });
    }

    return(
         <Button variant="contained" 
                sx={{ 
                    fontSize:'13px', 
                    fontWeight:'bold', 
                    bgcolor:'white', 
                    color:'red', 
                    marginTop:1,
                    marginBottom:1,
                    whiteSpace:'nowrap'
                }} 
                onClick={() => handleDelete(user)}
        > Confirm: Delete User </Button>
    )
}

export default DeleteUser