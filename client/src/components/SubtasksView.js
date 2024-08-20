import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CompleteSubtask from "./CompleteSubtask";

function SubtasksView({ allTasks }){
    const [subtasks, setSubtasks] = useState([]);
    const { taskId } = useParams();

    const task = allTasks.find((t) => t.id === parseInt(taskId, 10));

    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/subtasks/${taskId}`)
        .then(r=>r.json())
        .then((subtasks) => setSubtasks(subtasks))
        .catch((error) => console.error(error))
    }, []);

    console.log(subtasks)

    function handleCompletedSubtask(){
        console.log("handleCompletedSubtask triggered")
    }

    function handleEditedSubtask(){
        console.log("handleEditedSubtask")
    }

    function handleDeletedSubtask(){
        console.log("handleDeletedSubtask triggered")
    }


    return (
        <div>
            <h1>Task: {task ? task.task : 'Loading...'}</h1>
            <div>
                <h4>Create A New Subtask:</h4>
                <input placeholder="Subtask..." />
                <button>Create Subtask</button>
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
                                    <em>Great work! You have no outstanding subtasks!</em>
                                </h3>
                            </div>
                        ) : (
                            subtasks.map((subT) => (
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

                                    <CompleteSubtask subtask={subT} handleCompletedSubtask={handleCompletedSubtask} />
                                    
                                    <button
                                        style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }}
                                        onClick={() => handleDeletedSubtask(subT.id)}
                                    > Delete Subtask </button>
                                </div>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SubtasksView;