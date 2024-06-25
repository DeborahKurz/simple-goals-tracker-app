import React from "react";

// >>>>>>>> '/tasks/id' route
function TasksRoute(){
    return(
      <>
        <TaskHeader />
        <DisplayTasks />
        <AddTask />
        <CompleteTask />
        <DeleteTask />
      </>
    )
}

export default TasksRoute