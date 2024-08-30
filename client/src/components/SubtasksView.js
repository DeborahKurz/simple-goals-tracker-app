import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Paper, Typography } from "@mui/material";
import bgImg from '../images/backgroundimg.png';

import AddSubtask from "./AddSubtask";
import CompleteSubtask from "./CompleteSubtask";
import EditSubtask from "./EditSubtask";
import DeleteSubtask from "./DeleteSubtask";
import ErrorPage from "./ErrorPage";

export const SubtaskContext = React.createContext();

function SubtasksView(){
    const { userId, taskId } = useParams();
    const { userList } = useContext(Context);

    const task = userList.find((u) => u.id === parseInt(userId)).tasks.find((t) => t.id === parseInt(taskId, 10));
    const subtasks = task.subtasks
   
    return (
        <Box>
            <Typography sx={{ fontSize: 'h3.fontSize', marginBottom: 2 }}>{task.task}</Typography>
            <AddSubtask task={task}/>

            {subtasks.length === 0 ? (
                <Box sx={{ marginBottom: 3 }}>
                    <Paper>
                        <Typography sx={{ marginLeft: 2, padding:2, fontWeight: 'bold' }}>To get started, please add a subtask.</Typography>
                    </Paper>
                </Box>
            ) : (
                <Box sx={{ marginBottom: 3 }}>
                    {subtasks.every(subtask => subtask.completed) ? (
                        <Paper>
                            <Typography sx={{ 
                                color: "green", 
                                textAlign: "center", 
                                padding: 2
                                }}><em>Great work! You have no outstanding subtasks</em></Typography>
                        </Paper>
                    ) : null}
                    {subtasks.map(subT => (
                        <Paper key={subT.id}
                            elevation={10}
                            sx={{
                                padding:1,
                                paddingLeft:2,
                                marginLeft:2,
                                marginBottom:1,
                                marginTop:3,
                                backgroundImage:`url(${bgImg})`,
                                backgroundPosition:'center',
                                backgroundSize:'cover',
                                backgroundRepeat:'no-repeat',
                                color:'white',
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'space-between'
                            }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography
                                    sx={{
                                        textDecoration: subT.completed ? 'line-through' : 'none',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        overflow:'hidden',
                                        textOverflow:'ellipsis'
                                    }}>{subT.subtask}</Typography>
                                <Box
                                    sx={{
                                        marginLeft: 'auto',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingTop: 4
                                    }}>
                                    {subT.completed ? null : (<CompleteSubtask subtask={subT} />)}
                                    <DeleteSubtask subtask={subT} />
                                </Box>
                            </Box>
                            <EditSubtask subtask={subT} />
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    ); 
};

export default SubtasksView
