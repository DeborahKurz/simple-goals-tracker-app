import React from "react";

function DeleteTask({ taskId, handleGoalsDeleteTask }) {
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
          handleGoalsDeleteTask(id)
        }) 
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    }

    return (
        <button onClick={()=> handleDeleteTask(taskId)}>Delete Task</button>
    )
}
export default DeleteTask