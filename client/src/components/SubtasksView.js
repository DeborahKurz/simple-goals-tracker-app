import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Paper, Input, Button, Typography } from "@mui/material";

import CompleteSubtask from "./CompleteSubtask";
import EditSubtask from "./EditSubtask";
import DeleteSubtask from "./DeleteSubtask";

export const SubtaskContext = React.createContext();

function SubtasksView(){
    const { allTasks } = useContext(Context);

    const [subtasks, setSubtasks] = useState([]);
    const [newSubtask, setNewSubtask] = useState("");

    const { taskId } = useParams();

    const task = allTasks.find((t) => t.id === parseInt(taskId, 10));

    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/subtasks/${taskId}`)
        .then(r=>r.json())
        .then((subtasks) => setSubtasks(subtasks))
        .catch((error) => console.error(error))
    }, []);

    function handleUpdatedSubtasks(subtaskObj){
        const newList = [...subtasks, subtaskObj];
        setSubtasks(newList);
    }

    function handleNewSubtask(){
        const url = `http://localhost:5555/subtasks`

        const configObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    subtask: newSubtask,
                    task_id: task.id
                }
            )
        };

        fetch(url, configObj)
        .then(r=>r.json())
        .then(subtaskObj=>{
            handleUpdatedSubtasks(subtaskObj)
            setNewSubtask("")
        });
    };

    function handleCompletedSubtask(subtaskObj) {
        const updatedSubtasks = subtasks.map((subT) => {
            if(subT.id === subtaskObj.id){
                return { ...subT, completed: subtaskObj.completed }
            } else {
                return subT
            }
        })
        setSubtasks(updatedSubtasks)
    }

    function handleEditSubtask(subtaskObj){
        const updatedSubtasks = subtasks.map((subT) => {
            if(subT.id === subtaskObj.id){
                return { ...subT, subtask: subtaskObj.subtask }
            } else {
                return subT
            }
        })
        setSubtasks(updatedSubtasks)
    };

    function handleDeletedSubtask(subId){ 
        const newList = subtasks.filter((subT) => {
            if(subT.id !== subId){
                return subT
            }
        })
        setSubtasks(newList)
    };

    return (
        <SubtaskContext.Provider value={{ handleCompletedSubtask,handleEditSubtask, handleDeletedSubtask }}>
            <Box>
                <Typography sx={{fontSize: 'h3.fontSize', marginBottom:2}}>{task.task}</Typography>
                <Box sx={{ marginBottom: 5 }}>
                    <Typography sx={{ fontWeight:'bold', fontSize:'13px' }}>Create A New Subtask:</Typography>
                    <Input
                        placeholder="Subtask..."
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                    />
                    <Button onClick={handleNewSubtask}>Create Subtask</Button>
                </Box>
                {subtasks.length === 0 ? (
                    <Box sx={{ marginBottom: 5 }}>
                        <Typography sx={{ marginLeft:2 }}>To get started, please add a subtask.</Typography>
                    </Box>
                ) : (
                    <Box sx={{ marginBottom: 5 }}>
                        {subtasks.every((subtask) => subtask.completed === true) ? (
                            <Box>
                                <h3 style={{ color: "green" }}>
                                    <em>Great work! You have no outstanding subtasks.</em>
                                </h3>
                            </Box>
                        ) : null}
                        {(subtasks.map((subT) => (
                            <Box
                                key={subT.id}
                                style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}
                            >
                                <li
                                    style={{
                                        textDecoration: subT.completed ? 'line-through' : 'none',
                                        width: "500px",
                                        height: "50px",
                                        border: "2px solid black",
                                        marginRight: "-2px",
                                    }}
                                >
                                    {subT.subtask}
                                </li>

                                <CompleteSubtask subtask={subT}/>
                                <EditSubtask subtask={subT}/>
                                <DeleteSubtask subtask={subT}/>
                            </Box>
                            ))
                        )}
                    </Box>
                )}
            </Box>
            
        </SubtaskContext.Provider>
    );
}

export default SubtasksView