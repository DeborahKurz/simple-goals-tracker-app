import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from "./App.js";

import { Box, Button, Input } from '@mui/material';


function EditUsername({ user }){
    const { handleUpdatedUser } = useContext(Context);

    const formschema = yup.object().shape({
        username: yup.string().required("Please enter a new username.").max(20),
    })

    const formik = useFormik({
        initialValues: {
            id: user.id,
            username: ""
        },
        validationSchema: formschema,
        onSubmit: (values, { resetForm }) => {
            const dataToSend = {username: values.username}
            const configObj = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataToSend)
            }
            const url = `http://localhost:5555/${user.id}`;
            fetch(url, configObj)
            .then(r=>r.json())
            .then(userObj=>{
                handleUpdatedUser(userObj);
                resetForm({ username:"" });
            })
            .catch(error => console.error('Error:', error));
        }
    })

    return(
        <Box>
            <Input 
                sx={{ 
                    bgcolor:'white', 
                    marginRight:2, 
                    paddingLeft:1 
                }} 
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder={'New Username...'}>
            </Input>
            <Button 
                variant='contained' 
                sx={{ whiteSpace:'nowrap' }}
                onClick={formik.handleSubmit}
                >Update Username
            </Button>
        </Box>
    )
};

export default EditUsername
