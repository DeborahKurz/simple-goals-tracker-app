import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AddTask({ handleTask, goalId, userList }){
    const formschema = yup.object().shape({
        task: yup.string().required("Must enter a task.").max(150),
        user: yup.string().required("Must enter a user.")
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
                formik.setFieldError('user', 'User not found. Please enter a valid user.')
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
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input 
                    id="task"
                    name="task"
                    type="text" 
                    value={formik.values.task}
                    placeholder = "New Task"
                    onChange={formik.handleChange}
                />
                <input 
                    id="user"
                    name="user"
                    type="text" 
                    value={formik.values.user}
                    placeholder = "User"
                    onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>{formik.errors.task}</p>
                <p style={{ color: "red" }}>{formik.errors.user}</p>
                <br />
                <button type="submit">Add Task</button>
                <br></br>
            </form>
        </div>
    )
}

export default AddTask
