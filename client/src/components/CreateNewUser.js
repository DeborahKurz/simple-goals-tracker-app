import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Context } from "./App.js";

import { Button, Input, Paper, Typography } from '@mui/material';

function CreateNewUser() {
  const { userList, handleUser } = useContext(Context);

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username").max(20),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: formSchema,

    onSubmit: async (values, { setErrors, resetForm }) => {
      const foundUser = userList.find(user => user.username.toLowerCase() === values.username.toLowerCase());

      if (foundUser){
        setErrors({"username": "This username already exists. Please choose a different one."});
        return;
      }

      const configObj ={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: values.username })
      }
      fetch("http://127.0.0.1:5555/", configObj)
      .then(r => {
        r.json().then((response)=>{handleUser(response)
          resetForm();
        })
      })
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{margin:"30px"}}>
        <Typography sx={{ fontWeight:'bold', textAlign:'center', margin:2 }}>Create A New Username:</Typography>
        <Paper sx={{bgcolor:'#212121', padding:1}}>
          <Input
            id="username"
            username="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Username..."
            sx={{bgcolor:'white'}}
          />
         <p style={{color: "red"}}> {formik.errors.username} </p>
          <Button variant='contained' sx={{bgcolor:'#141414'}} type="submit">Create Username</Button>
        </Paper>
      </form>
    </div>
  )
}

export default CreateNewUser
