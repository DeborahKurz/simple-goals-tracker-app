import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from "./App.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import EditUsername from "./EditUsername.js";
import DeleteUser from "./DeleteUser.js";

import { Box, Paper, Button, Input, Typography } from '@mui/material';

function UserInfo(){
    const { userList, handleUpdatedUser, handleDeleteUser, allTasks } = useContext(Context);
    const { userId } = useParams()
    const navigate = useNavigate();

    const [newUsername, setNewUsername] = useState("");
    // const [tasks, setTasks] = useState([]);
    
    // const task = userList.find((u) => u.id === parseInt(userId)).tasks.find((t) => t.id === parseInt(taskId, 10));
    const user = userList.find((u) => u.id === parseInt(userId))
    // const user = userList.find((u) => u.id === parseInt(userId, 10));
    const tasks = allTasks.map((t)=> t.users_id === userId)


    // useEffect(()=>{
    //     fetch(`http://127.0.0.1:5555//usertasks/${userId}`)
    //     .then(r=>r.json())
    //     .then((tasks)=>setTasks(tasks))
    // }, []);

    function handleUpdateClick(){
        const url = `http://localhost:5555/${userId}`

        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    username: newUsername
                }
            )
        };

        fetch(url, configObj)
        .then(r=>r.json())
        .then(userObj=>{
            handleUpdatedUser(userObj)
            setNewUsername("")
        })
    };


    return(
        <Box>
            <Typography sx={{fontSize: 'h3.fontSize'}}>{user.username}'s Profile</Typography>
            <Box sx={{ margin:2, marginBottom: 5 }}>
                <Typography sx={{ fontWeight:'bold', fontSize:'15px' }}>Username: {user.username}</Typography>
                <EditUsername user={user}/>
            </Box>
            <Box sx={{ margin:2, marginBottom: 5 }}>
                <Typography sx={{ fontWeight: 'bold' }}>{user.username}'s Completed Tasks:</Typography>
                {user.tasks.length === 0 ? (
                    <h4><em>{user.username} has no completed tasks. Please check back.</em></h4>
                ) : (
                    <ul>
                        {user.tasks.map((task)=>(
                            <Paper key={task.id} elevation={16} sx={{ padding:1, paddingLeft:3, margin:1 }}>
                                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Task: {task.task}</Typography>
                                {task.subtasks.map((sub)=> sub.completed === true ? (
                                    <Paper key={sub.id} elevation={3} sx={{ margin:1, padding:1, paddingLeft:3 }}>
                                        <li key={sub.id}><em>Subtask: {sub.subtask}</em></li>
                                    </Paper> 
                                ) : null )}
                            </Paper>
                        ))}
                    </ul>
                )}
            </Box>
            <Paper elevation={6} style={{ backgroundColor:"#bf0000", color:"white", alignItems: "center", paddingLeft:'10px', paddingTop:'10px', margin:7 }}>
                <Typography sx={{ fontWeight:'bold', fontSize:'18px' }}>Delete Username:</Typography>
                <Typography sx={{ fontWeight:'bold', fontSize:'13px' }}>Delete this user, their tasks, and subtasks.</Typography>
                <Typography sx={{ fontWeight:'bold', fontSize:'15px', marginTop:2, marginBottom:2 }}>THIS IS A PERMANENT ACTION AND CANNOT BE UNDONE.</Typography>
                <Typography sx={{ fontWeight:'bold', fontSize:'13px' }}>Proceed with caution!</Typography>
                <DeleteUser User user={user}/>
            </Paper>
        </Box>
    )
};

export default UserInfo