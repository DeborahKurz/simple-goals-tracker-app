import React, { useState } from "react";

function AddTask({ handleTask, goalId, userList}){
    const [newTask, setNewTask] = useState("");
    const [user, setUser] = useState("");
    
    function findUser(findThisUser){
        const foundUser = userList.find(user => findThisUser === user.username);
        const userId = foundUser.id;
        setUser(userId)
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
                    value={userList.find(u=> u.id === user)?.username || ""}
                    placeholder = "User"
                    onChange={(e)=> findUser(e.target.value)}
                />
                <br />
                <button type="submit">Add Task</button>
                <br></br>
            </form>
        </div>
    )
}

export default AddTask


// import React from "react";

// function AddTask(){
// //POST request
//     return(
//         <div>
//             <h2>Add A New Task</h2>
//             <form>
//                 <input type="text" placeholder={"The Next Task To Do"}></input>
//                 <br></br>
//                 <button>Add My Task</button>
//                 <br></br>
//                 </form>
//         </div>
//     )
// }

// export default AddTask;