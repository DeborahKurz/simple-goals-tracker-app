import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from "./App.js";


import { Box, Button, Input, Typography } from '@mui/material';

function AddTask({ task }){
    const { handleNewSubtask } = useContext(Context);

    const formschema = yup.object().shape({
        subtask: yup.string().required("Please enter a subtask.").max(200),
    })

    const formik = useFormik({
        initialValues: {
            subtask: ""
        },
        validationSchema: formschema,
        onSubmit: (values, { resetForm }) => {
            const dataToSend = {
                subtask: values.subtask,
                completed: false,
                task_id: task.id
            }
            const configObj = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            }
            const url = 'http://localhost:5555/subtasks';
            fetch(url, configObj)
            .then(r=>r.json())
            .then((subtaskObj) => {
                handleNewSubtask(subtaskObj);
                resetForm({ subtask:"" });
            })
            .catch(error => console.error('Error:', error));
        }
    })

    return(
        <Box>
            <Box style={{ 
                display: "flex", 
                alignItems: "center", 
                width: "100%", 
                marginLeft: 3
                }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '15px', marginBottom: 1, marginRight: 2, marginLeft:1 }}>Create A New Subtask: </Typography>
                <form onSubmit={formik.handleSubmit} style={{display:'flex', flexGrow:1, marginTop:5}}>
                    <Input 
                        id="subtask"
                        name="subtask"
                        type="text" 
                        value={formik.values.subtask}
                        placeholder = "New Subtask"
                        onChange={formik.handleChange}
                        sx={{ bgcolor:'white', marginRight:2,  width:'160px', padding:1 }}
                    />
                    <Button type="submit"
                        variant='contained' 
                        sx={{ whiteSpace: 'nowrap' }} 
                        >Add Subtask</Button>
                </form>
            </Box>
            <Box style={{ marginLeft: "10px" }}>
                <p style={{ color: "red" }}>{formik.errors.subtask}</p>
            </Box>
        </Box>     
    )
};

export default AddTask