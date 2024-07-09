import React from "react";

function CompleteTask({ task, handleCompletedTask }){

    function handleClick(task){
        const id = task.id;
        const url = `http://localhost:5555/tasks/${id}`;
        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    task: task.task,
                    completed: true,
                    goals_id: task.goals_id,
                    users_id: task.users_id
                }
            )
        };
        
        fetch(url, configObj)
        .then(r=>r.json())
        .then(taskObj=>{
            handleCompletedTask(taskObj)
        })
    }

    return(
        <div>
            <button style={{ width: "150px", height: "54px", marginRight: "10px" }} onClick={()=> handleClick(task)}>Task Done</button>
        </div>
    )
};

export default CompleteTask;