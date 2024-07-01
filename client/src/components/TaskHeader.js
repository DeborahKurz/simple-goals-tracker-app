import React from "react";

function TaskHeader({goal}){
    return(
        <div>
            <h1>{goal.goal}</h1>
        </div>
    )
}

export default TaskHeader;