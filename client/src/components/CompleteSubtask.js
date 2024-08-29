import React, { useContext } from "react";
// import { SubtaskContext } from "./SubtasksView.js";

// import { Box, Button } from '@mui/material';

function CompleteSubtask({ subtask }){
//     const { handleCompletedSubtask } = useContext(SubtaskContext);

//     function handleCompleted(subId){
//         const url = `http://localhost:5555/subtasksid/${subId}`

//         const configObj = {
//             method: 'PATCH',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(
//                 {
//                     subtask: subtask.subtask,
//                     completed: true,
//                     task_id: subtask.task_id
//                 }
//             )
//         }

//         fetch(url, configObj)
//         .then(r=>r.json())
//         .then(subtaskObj=>{handleCompletedSubtask(subtaskObj)})
//     }

//     return(
//         <Box>
//             <Button variant="contained" sx={{ 
//                 fontSize:'13px', 
//                 fontWeight:'bold', 
//                 margin:1,
//                 bgcolor:'#42a5f5',
//                 whiteSpace:'nowrap'
//             }}
//             onClick={() => handleCompleted(subtask.id)}>Completed</Button>
//         </Box>
//     )
};

export default CompleteSubtask