import React from "react";

function CompletedCount({ allTasks }){
    const completedTasks = allTasks.filter(task => task.completed).length;
    const notCompletedTasks = allTasks.filter(task => !task.completed).length;

    return(
        <h4>
            Your team has completed 
            <span style={{ color: "#3CB043" }}>  {completedTasks}  </span> 
            tasks, and is currently tackling 
            <span style={{ color: "red" }}>  {notCompletedTasks}  </span> 
            tasks.
        </h4>
    )
}

export default CompletedCount