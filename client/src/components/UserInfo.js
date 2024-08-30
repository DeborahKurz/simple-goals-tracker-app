import React, { useContext } from "react";
import { Context } from "./App.js";
import { useParams } from "react-router-dom";

import EditUsername from "./EditUsername.js";
import DeleteUser from "./DeleteUser.js";

import { Box, Paper, Typography } from '@mui/material';

function UserInfo(){
    const { userList } = useContext(Context);
    const { userId } = useParams()

    const user = userList.find((u) => u.id === parseInt(userId))

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
                <DeleteUser user={user}/>
            </Paper>
        </Box>
    )
};

export default UserInfo