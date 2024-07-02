import React from "react";

function DeleteTask({ taskId, handleDelete }) {
    function handleClick() {
        console.log('taskId: ', taskId)
        const configObj = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        const url = `http://localhost:5555/tasks/${taskId}`;
        fetch(url, configObj)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete task.');
                }
                return response.json();
            })
            .then(() => {handleDelete(taskId);})
            .catch(error => {console.error('Error deleting task:', error);});
    }

    return (
        <div>
            <button onClick={handleClick}>Delete Task</button>
        </div>
    );
}

export default DeleteTask;