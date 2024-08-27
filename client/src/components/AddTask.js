import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from "./App.js";

import { Paper, Box, Typography, Input } from '@mui/material';

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
        <Box style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
            <form onSubmit={formik.handleSubmit}>
                <input 
                    id="task"
                    name="task"
                    type="text" 
                    value={formik.values.task}
                    placeholder = "New Task"
                    onChange={formik.handleChange}
                    style={{ width: "490px", marginRight: "10px" }}
                />
                <input 
                    id="user"
                    name="user"
                    type="text" 
                    value={formik.values.user}
                    placeholder = "User"
                    onChange={formik.handleChange}
                    style= {{ width: "130px", marginRight: "15px" }}
                />
                <button style={{ width: "150px" }} type="submit">Add Task</button>
                <br />
            </form>
            <div style={{ marginLeft: "10px" }}>
                <p style={{ color: "red" }}>{formik.errors.task}</p>
                <p style={{ color: "red" }}>{formik.errors.user}</p>
            </div>
        </Box>
    )
};

export default AddTask