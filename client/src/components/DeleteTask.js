import React from "react";

function DeleteTask({ taskId, allGoals, setAllGoals}) {

    function handleDeleteTask(id){
        const url = `http://localhost:5555/tasks/${id}`;
        const configObj = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json'}
        };
        fetch(url, configObj)
        .then(r=>{
          if (!r.ok) {
            throw new Error('Failed to delete task.');
          }
          console.log('Task deleted successfully.');
          const updatedGoals = allGoals.map(goal => ({
            ...goal,
            tasks: goal.tasks.filter(task => task.id != taskId)
          }));
          setAllGoals(updatedGoals)
        })
        .catch(error => {
          console.lerror('Error deleting task:', error);
        });
      }

    return (
        <button onClick={()=> handleDeleteTask(taskId)}>Delete Task</button>
    )
}
export default DeleteTask