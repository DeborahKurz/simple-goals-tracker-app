import React, { useState } from "react";
import DeleteTask from "./DeleteTask.js"

function DisplayTasks({ goal }){
    const [tasks, setTasks] = useState(goal.tasks);
    console.log(tasks)

    const handleDelete = (taskId) => {
        const updateTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updateTasks);
    }

    return (
        <div>
          <ul>
            {tasks.map((task) => (
                <div key={task.id}>
                    <li>{task.task}</li>
                    <DeleteTask taskId={task.id} handleDelete={handleDelete}/>  
                </div>
            ))}
          </ul>
        </div>
      );
}

export default DisplayTasks;