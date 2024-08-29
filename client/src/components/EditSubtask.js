import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from "./App.js";

import { Box, Button, Input } from '@mui/material';

function EditSubtask({ subtask }){
    const { handleEditSubtask } = useContext(Context);

    const formschema = yup.object().shape({
        subtask: yup.string().required("Please type your subtask changes.").max(200),
    })

    const formik = useFormik({
        initialValues: {
            id: subtask.id,
            subtask: "",
            completed: subtask.completed,
            task_id: subtask.task_id
        },
        validationSchema: formschema,
        onSubmit: (values, { resetForm }) => {
            const dataToSend = {
                subtask: values.subtask,
                completed: subtask.completed,
                task_id: subtask.task_id
            }
            const configObj = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            }
            const url = `http://localhost:5555/subtasksid/${subtask.id}`;
            fetch(url, configObj)
            .then(r=>r.json())
            .then(subtaskObj=>{
                handleEditSubtask(subtaskObj);
                resetForm({ subtask:"" });
            })
            .catch(error => console.error('Error:', error));
        }
    })

    return(
        <Box>
            <Input sx={{ 
                bgcolor:'white', 
                marginRight:2, 
                paddingLeft:1 
            }} 
            name="subtask"
            value={formik.values.subtask} 
            onChange={formik.handleChange} 
            placeholder={"Rename Subtask..."}></Input>
            <Button
                variant='contained' 
                sx={{ whiteSpace: 'nowrap' }} 
                onClick={formik.handleSubmit}
            > Edit Subtask </Button>
        </Box>
    )
};

export default EditSubtask
