import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CompleteSubtask from "./CompleteSubtask";
import EditSubtask from "./EditSubtask";
import DeleteSubtask from "./DeleteSubtask";

function SubtasksView({ allTasks }){
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
        <div>
            <h1>Task: {task.task}</h1>
            <div>
                <h4>Create A New Subtask:</h4>
                <input
                    placeholder="Subtask..."
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                />
                <button onClick={handleNewSubtask}>Create Subtask</button>
            </div>
            {subtasks.length === 0 ? (
                <div>
                    <h3>To get started, please add a subtask.</h3>
                </div>
            ) : (
                <div>
                    <ul>
                        {subtasks.every((subtask) => subtask.completed === true) ? (
                            <div>
                                <h3 style={{ color: "green" }}>
                                    <em>Great work! You have no outstanding subtasks.</em>
                                </h3>
                            </div>
                        ) : null}
                        {(subtasks.map((subT) => (
                            <div
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

                                <CompleteSubtask
                                    subtask={subT}
                                    handleCompletedSubtask={handleCompletedSubtask}
                                />
                                <EditSubtask subtask={subT} handleEditSubtask={handleEditSubtask}/>
                                <DeleteSubtask
                                    subtask={subT}
                                    handleDeletedSubtask={handleDeletedSubtask}
                                />
                            </div>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SubtasksView