import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Paper, Input, Button, Typography } from "@mui/material";
import bgImg from '../images/backgroundimg.png';

import AddSubtask from "./AddSubtask";
import CompleteSubtask from "./CompleteSubtask";
import EditSubtask from "./EditSubtask";
import DeleteSubtask from "./DeleteSubtask";
import ErrorPage from "./ErrorPage";

export const SubtaskContext = React.createContext();

function SubtasksView(){
    const { userId, taskId } = useParams();
    const { userList, handleUpdatedSubtasks, handleNewSubtasks } = useContext(Context);
    const [newSubtask, setNewSubtask] = useState("");

    const task = userList.find((u) => u.id === parseInt(userId)).tasks.find((t) => t.id === parseInt(taskId, 10));
    const subtasks = task.subtasks
    console.log(subtasks)





    return (
        <Box>
            <Typography sx={{ fontSize: 'h3.fontSize', marginBottom: 2 }}>{task.task}</Typography>
            <AddSubtask task={task}/>

            {subtasks.length === 0 ? (
                <Box sx={{ marginBottom: 3 }}>
                    <Paper>
                        <Typography sx={{ marginLeft: 2, padding:2, fontWeight: 'bold' }}>To get started, please add a subtask.</Typography>
                    </Paper>
                </Box>
            ) : (
                <Box sx={{ marginBottom: 3 }}>
                    {subtasks.every(subtask => subtask.completed) ? (
                        <Paper>
                            <Typography sx={{ 
                                color: "green", 
                                textAlign: "center", 
                                padding: 2
                                }}><em>Great work! You have no outstanding subtasks</em></Typography>
                        </Paper>
                    ) : null}
                    {subtasks.map(subT => (
                        <Paper key={subT.id}
                            elevation={10}
                            sx={{
                                padding:1,
                                paddingLeft:2,
                                marginLeft:2,
                                marginBottom:1,
                                marginTop:3,
                                backgroundImage:`url(${bgImg})`,
                                backgroundPosition:'center',
                                backgroundSize:'cover',
                                backgroundRepeat:'no-repeat',
                                color:'white',
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'space-between'
                            }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography
                                    sx={{
                                        textDecoration: subT.completed ? 'line-through' : 'none',
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        overflow:'hidden',
                                        textOverflow:'ellipsis'
                                    }}>{subT.subtask}</Typography>
                                <Box
                                    sx={{
                                        marginLeft: 'auto',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingTop: 4
                                    }}>
                                    {subT.completed ? null : (<CompleteSubtask subtask={subT} />)}
                                    
                                    {/* <DeleteSubtask subtask={subT} /> */}
                                </Box>
                            </Box>
                            {/* <EditSubtask subtask={subT} /> */}
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    ); 
};


export default SubtasksView


        // <Box>
        //     {/* <Typography sx={{ fontSize: 'h3.fontSize', marginBottom: 2 }}>{task.task}</Typography>
        //     <AddSubtask taskId={task.id}/>
//             {subtasks.length === 0 ? (
//                 <Box sx={{ marginBottom: 3 }}>
//                     <Paper>
//                         <Typography sx={{ marginLeft: 2, padding:2, fontWeight: 'bold' }}>To get started, please add a subtask.</Typography>
//                     </Paper>
//                 </Box>
//             ) : (
//                 <Box sx={{ marginBottom: 3 }}>
//                     {subtasks.every(subtask => subtask.completed) ? (
//                         <Paper>
//                             <Typography sx={{ 
//                                 color: "green", 
//                                 textAlign: "center", 
//                                 padding: 2
//                                 }}><em>Great work! You have no outstanding subtasks</em></Typography>
//                         </Paper>
//                     ) : null}
//                     {subtasks.map(subT => (
//                         <Paper key={subT.id}
//                             elevation={10}
//                             sx={{
//                                 padding:1,
//                                 paddingLeft:2,
//                                 marginLeft:2,
//                                 marginBottom:1,
//                                 marginTop:3,
//                                 backgroundImage:`url(${bgImg})`,
//                                 backgroundPosition:'center',
//                                 backgroundSize:'cover',
//                                 backgroundRepeat:'no-repeat',
//                                 color:'white',
//                                 display:'flex',
//                                 flexDirection:'column',
//                                 justifyContent:'space-between'
//                             }}>
//                             <Box sx={{ display: 'flex', flexDirection: 'row' }}>
//                                 <Typography
//                                     sx={{
//                                         textDecoration: subT.completed ? 'line-through' : 'none',
//                                         fontWeight: 'bold',
//                                         fontSize: '20px',
//                                         paddingTop: 2,
//                                         paddingBottom: 2,
//                                         overflow:'hidden',
//                                         textOverflow:'ellipsis'
//                                     }}>{subT.subtask}</Typography>
//                                 <Box
//                                     sx={{
//                                         marginLeft: 'auto',
//                                         display: 'flex',
//                                         flexDirection: 'row',
//                                         alignItems: 'center',
//                                         paddingTop: 4
//                                     }}>
//                                     {subT.completed ? null : (<CompleteSubtask subtask={subT} />)}
                                    
//                                     <DeleteSubtask subtask={subT} />
//                                 </Box>
//                             </Box>
//                             <EditSubtask subtask={subT} />
//                         </Paper>
//                     ))}
//                 </Box>
//             )}
//         </Box>
//     ); */}
// }

// export default SubtasksView

// // if (!userList || !userList.find((u) => u.id === parseInt(userId))){
//     //     return <ErrorPage />;
//     // }

//     // useEffect(()=>{
//     //     //    /tasks/taskId/subtasks
//     //     //    Really use task.subtasks instead of fetching
//     //     fetch(`http://127.0.0.1:5555/subtasks/${taskId}`)
//     //     .then(r=>r.json())
//     //     .then((subtasks) => setSubtasks(Array.isArray(subtasks) ? subtasks : []))
//     //     .catch((error) => {
//     //         console.error(error)
//     //         setSubtasks([])
//     //     })
//     // }, []);



//     // function handleUpdatedSubtasks(subtaskObj){
//     //     const newList = [...subtasks, subtaskObj];
//     //     setSubtasks(newList);
//     // }

//     // function handleNewSubtask(){
//     //     const url = `http://localhost:5555/subtasks`

//     //     const configObj = {
//     //         method: 'POST',
//     //         headers: {'Content-Type': 'application/json'},
//     //         body: JSON.stringify(
//     //             {
//     //                 subtask: newSubtask,
//     //                 task_id: task.id
//     //             }
//     //         )
//     //     };

//     //     fetch(url, configObj)
//     //     .then(r=>r.json())
//     //     .then(subtaskObj=>{
//     //         handleNewSubtask(subtaskObj)
//     //         setNewSubtask("")
//     //     });
//     // };

//     // function handleCompletedSubtask(subtaskObj) {
//     //     // const updatedSubtasks = subtasks.map((subT) => {
//     //     //     if(subT.id === subtaskObj.id){
//     //     //         return { ...subT, completed: subtaskObj.completed }
//     //     //     } else {
//     //     //         return subT
//     //     //     }
//     //     // })
//     //     // setSubtasks(updatedSubtasks)
//     // }

//     // function handleEditSubtask(subtaskObj){
//     //     // const updatedSubtasks = subtasks.map((subT) => {
//     //     //     if(subT.id === subtaskObj.id){
//     //     //         return { ...subT, subtask: subtaskObj.subtask }
//     //     //     } else {
//     //     //         return subT
//     //     //     }
//     //     // })
//     //     // setSubtasks(updatedSubtasks)
//     // };

//     // function handleDeletedSubtask(subId){ 
//     //     // const newList = subtasks.filter((subT) => {
//     //     //     if(subT.id !== subId){
//     //     //         return subT
//     //     //     }
//     //     // })
//     //     // setSubtasks(newList)
//     // };


//     //     {/* <Box sx={{ margin: 3, marginBottom: 5 }}>
//     //     <Typography sx={{ fontWeight: 'bold', fontSize: '15px', marginBottom: 1 }}>Create A New Subtask: </Typography>
//     //     <Input
//     //         placeholder="Subtask..."
//     //         value={newSubtask}
//     //         onChange={(e) => setNewSubtask(e.target.value)}
//     //         sx={{ bgcolor: 'white', marginRight: 2, paddingLeft: 1 }}>
//     //     </Input>
//     //     <Button
//     //         variant="contained"
//     //         sx={{
//     //             fontSize: '13px',
//     //             fontWeight: 'bold',
//     //             margin: 1
//     //         }}
//     //         onClick={handleNewSubtask}>Create Subtask</Button>
//     // </Box> */}