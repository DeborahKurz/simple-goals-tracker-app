import React from "react";

function DeleteSubtask({subtask, handleDeletedSubtask}){

    function handleDelete(subId){
        const url = `http://localhost:5555/subtasksid/${subId}`

        const configObj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };

        fetch(url, configObj)
        .then(r=>{
            if (!r.ok) {
              throw new Error('Failed to delete task.');
            }
            console.log('Task deleted successfully.');
            handleDeletedSubtask(subId)
        })
        .catch(error => {
            console.error('Error deleting task:', error);
          });
    };

    return(
        <div>
            <button
                style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }}
                onClick={() => handleDelete(subtask.id)}
            > Delete Subtask </button>
        </div>
    )
}

export default DeleteSubtask