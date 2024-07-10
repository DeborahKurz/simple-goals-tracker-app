import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AddGoal({ handleGoal }){
    const formschema = yup.object().shape({
        goal: yup.string().required("Must enter a goal").max(20)
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
        <>
            <div>
                <form onSubmit={formik.handleSubmit} style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px", marginRight: "10px" }}>
                    <input 
                        id="goal"
                        name="goal"
                        type="text" 
                        value={formik.values.goal}
                        placeholder = "Add A New Goal"
                        onChange={formik.handleChange}
                    />
                    <p style={{ color: "red" }}>{formik.errors.goal}</p>
                    <br />
                    <button type="submit">Add My Goal</button>
                    <br></br>
                </form>
            </div>
        </>
    )
};

export default AddGoal