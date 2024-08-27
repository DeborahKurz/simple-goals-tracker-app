import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from "./App.js";

import { Box, Input, Button } from '@mui/material';

function AddGoal(){
    const { handleGoal } = useContext(Context);

    const formschema = yup.object().shape({
        goal: yup.string().required("Please enter a goal with at least 1 character.").max(20)
    })

    const formik = useFormik({
        initialValues: {
            goal: ""
        },
        validationSchema: formschema,
        onSubmit: (values, { resetForm })=>{

            const configObj = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            }
            const url = `http://localhost:5555/goals`
            fetch(url, configObj)
            .then(r=>r.json())
            .then(goalObj => {
                handleGoal(goalObj);
                resetForm("");
            })
        }
    })

    return(
        <Box sx={{ marginBottom:3 }}>
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px", marginRight: "10px" }}>
                <Input 
                    id="goal"
                    name="goal"
                    type="text" 
                    value={formik.values.goal}
                    placeholder = " New Goal"
                    onChange={formik.handleChange}
                    sx={{ bgcolor:'white' }}
                />
                <br></br>
                <Button type="submit" variant='contained' sx={{ marginLeft:2 }}>Add My Goal</Button>
                <br></br>
                <p style={{ color: "red" }}>{formik.errors.goal}</p>
                <br></br>
            </form>
        </Box>
    )
};

export default AddGoal