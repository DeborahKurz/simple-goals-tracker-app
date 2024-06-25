import React from "react";

function AddTask(){
//POST request
    return(
        <div>
            <h2>Add A New Task</h2>
            <form>
                <input type="text" placeholder={"The Next Task To Do"}></input>
                <br></br>
                <button>Add My Task</button>
                <br></br>
                </form>
        </div>
    )
}

export default AddTask;