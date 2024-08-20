import React from "react";

function CompleteSubtask({subtask, handleCompletedSubtask}){
    console.log("CompletedSubtask triggered")
    return(
        <div>
            <button
                style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }}
                onClick={() => handleCompletedSubtask()}
            >Completed</button>
        </div>
    )
};

export default CompleteSubtask