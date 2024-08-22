import React, { useState, useContext } from "react";
import { SubtaskContext } from "./SubtasksView.js";

function EditSubtask({ subtask }){
    const { handleEditSubtask } = useContext(SubtaskContext);
    const [ newSubtask, setNewSubtask ] = useState("");

    function handleEdit(subId){
        const url = `http://localhost:5555/subtasksid/${subId}`

        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    subtask: newSubtask,
                    completed: subtask.completed,
                    task_id: subtask.task_id
                }
            )
        }

        fetch(url, configObj)
        .then(r=>r.json())
        .then(subtaskObj=>{
            handleEditSubtask(subtaskObj);
            setNewSubtask("");
        })
    }

    return(
        <div>
            <input value={newSubtask} onChange={(e)=> setNewSubtask(e.target.value)} placeholder={"Rename Subtask..."}></input>
            <button
                style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }}
                onClick={() => handleEdit(subtask.id)}
            > Edit Subtask </button>
        </div>
    )
};

export default EditSubtask