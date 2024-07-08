import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export const CreateNewUser = ({handleUser, userList}) => {
  const [refreshPage, setRefreshPage] = useState(false);
  
  useEffect(() => {
    fetch("http://127.0.0.1:5555/")
    .then(r => r.json())
    .then((data) => {
      console.log("CreateNewUser: ",data)
    })
  }, [refreshPage]);

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
        if(r.status == 200){
          setRefreshPage(!refreshPage);
        }
        r.json().then((response)=>{handleUser(response)
          resetForm();
        })
      })
      // .then((userObj) => {
      //   resetForm();
      // })
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{margin:"30px"}}>
        <label htmlFor="username">Username</label>
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
