import React, { useContext } from "react";
import { SubtaskContext } from "./SubtasksView.js";

function CompleteSubtask({ subtask }){
    const { handleCompletedSubtask } = useContext(SubtaskContext);

    function handleCompleted(subId){
        const url = `http://localhost:5555/subtasksid/${subId}`

        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    subtask: subtask.subtask,
                    completed: true,
                    task_id: subtask.task_id
                }
            )
        }

        fetch(url, configObj)
        .then(r=>r.json())
        .then(subtaskObj=>{handleCompletedSubtask(subtaskObj)})
    }

    return(
        <div>
            <button
                style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }}
                onClick={() => handleCompleted(subtask.id)}
            >Completed</button>
        </div>
    )
};

export default CompleteSubtask