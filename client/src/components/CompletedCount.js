import React, { useContext } from "react";
import { Context } from "./App.js";

function CompletedCount(){
    const { allTasks } = useContext(Context);

    if(allTasks.length > 0){
        const completedTasks = allTasks.filter(task => task.completed).length;
        const notCompletedTasks = allTasks.filter(task => !task.completed).length;
    
        return(
            <h4>
                Your team has completed 
                <span style={{ color: "#277dfe" }}>  {completedTasks}  </span> 
                tasks, and is currently tackling 
                <span style={{ color: "#FF007F" }}>  {notCompletedTasks}  </span> 
                tasks.
            </h4>
        )
    } else {
        return(
            <h4>
                Your team has completed 
                <span style={{ color: "#277dfe" }}>  0  </span> 
                tasks, and is currently tackling 
                <span style={{ color: "#FF007F" }}>  0  </span> 
                tasks. Please add a task to get started.
            </h4>
        )
    }

};

export default CompletedCount