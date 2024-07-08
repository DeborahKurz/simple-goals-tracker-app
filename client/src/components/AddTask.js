import React, { useState } from "react";

function AddTask({ handleTask, goalId, userList}){
    const [newTask, setNewTask] = useState("");
    const [userInput, setUserInput] = useState("");
    const [user, setUser] = useState("");
    
    function findUser(findThisUser){
        const foundUser = userList.find(user => findThisUser.toLowerCase() === user.username.toLowerCase());
        if(foundUser) {
            setUser(foundUser.id)
        } else {
            setUser(null)
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        const configObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    task: newTask,
                    completed: false,
                    goals_id: goalId,
                    users_id: user
                }
            )
        }
        const url = 'http://localhost:5555/tasks'
        fetch(url, configObj)
        .then(r=>r.json())
        .then(taskObj => {
            handleTask(taskObj);

            setNewTask("");
            setUserInput("");
        })
        .catch(error => console.error('Error:', error));
    }

    return(
        <div>
            {/* <h3>Add A New Task</h3> */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={newTask}
                    placeholder = "New Task"
                    onChange={(e)=> setNewTask(e.target.value)}
                />
                <input 
                    type="text" 
                    value={userInput}
                    placeholder = "User"
                    onChange={(e) => {
                        setUserInput(e.target.value);
                        findUser(e.target.value);
                    }}
                />
                <br />
                <button type="submit">Add Task</button>
                <br></br>
            </form>
        </div>
    )
}

export default AddTask
