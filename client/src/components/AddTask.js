import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from "./App.js";

import { Box, Button, Input } from '@mui/material';

function AddTask({ goalId }){
    const { userList, handleTask } = useContext(Context);

    const formschema = yup.object().shape({
        task: yup.string().required("Please enter a task.").max(150),
        user: yup.string().required("Please enter a username.")
    })

    const formik = useFormik({
        initialValues: {
            task: "",
            user: ""
        },
        validationSchema: formschema,
        onSubmit: (values, { resetForm }) => {
            const foundUser = userList.find(
                (user) => values.user.toLowerCase() === user.username.toLowerCase()
                );
            if (!foundUser) {
                formik.setFieldError('user', 'Username not found. Please enter a username that has been created.')
            }
            const dataToSend = {
                task: values.task,
                completed: false,
                goals_id: goalId,
                users_id: foundUser.id
            }
            const configObj = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            }
            const url = 'http://localhost:5555/tasks';
            fetch(url, configObj)
            .then(r=>r.json())
            .then((taskObj) => {
                handleTask(taskObj);
                resetForm({ task:"", user: "" });
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
                <form onSubmit={formik.handleSubmit} style={{display:'flex', flexGrow:1, marginTop:5}}>
                    <Input 
                        id="task"
                        name="task"
                        type="text" 
                        value={formik.values.task}
                        placeholder = "New Task"
                        onChange={formik.handleChange}
                        sx={{ bgcolor:'white', marginRight:2,  width:'160px', padding:1 }}
                    />
                    <Input 
                        id="user"
                        name="user"
                        type="text" 
                        value={formik.values.user}
                        placeholder = "User"
                        onChange={formik.handleChange}
                        sx={{ bgcolor:'white', marginRight:2,  width:'140px', padding:1 }}
                    />
                    <Button type="submit"
                        variant='contained' 
                        sx={{ whiteSpace: 'nowrap' }} 
                        >Add Task</Button>
                </form>
            </Box>
            <Box style={{ marginLeft: "10px" }}>
                <p style={{ color: "red" }}>{formik.errors.task}</p>
                <p style={{ color: "red" }}>{formik.errors.user}</p>
            </Box>
        </Box>     
    )
};

export default AddTask