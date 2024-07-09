import React from "react";

function DeleteTask({ taskId, allTasks, setAllTasks, userList, setUserList }) {

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

          const updatedTasks = allTasks.filter(task => task.id !== taskId);
          setAllTasks(updatedTasks);

          const updatedUserList = userList.map(user => ({
            ...user,
            tasks: user.tasks.filter(task => task.id != taskId)
          }))
          setUserList(updatedUserList)

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


  // setAllGoals(updatedGoals)
  // if (setUser){
  //   setUser(prevUsers => {
  //     return prevUsers.map(user => ({
  //       ...user,
  //       tasks: user.tasks.filter(task => task.id !== taskId)
  //     }));
  //   });
  // }
