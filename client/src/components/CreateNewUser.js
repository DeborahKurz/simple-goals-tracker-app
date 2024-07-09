import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function CreateNewUser({userList, handleUser }) {

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
        <label htmlFor="username">Create A New Username:</label>
        <br></br>
        <input
          id="username"
          username="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <p style={{color: "red"}}> {formik.errors.username} </p>
        <button type="submit">Create Username</button>
      </form>
    </div>
  )
}

export default CreateNewUser
