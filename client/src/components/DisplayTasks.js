import React from "react";

function DisplayTasks({ goal }){
    const tasks = goal.tasks;
    return (
        <div>
          <ul>
            {tasks.map((task, id) => (
                <li key={id}>{task.task}</li>
            ))}
          </ul>
        </div>
      );
}

export default DisplayTasks;