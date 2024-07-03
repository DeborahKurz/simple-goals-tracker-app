import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
export const CreateNewUser = ({handleUser, userList}) => {
  // const [username, setUsername] = useState("")
  const [refreshPage, setRefreshPage] = useState(false)
  
  useEffect(() => {
    fetch("http://127.0.0.1:5555/")
    .then(r => r.json())
    .then((data) => {
      console.log("CreateNewUser: ",data)
    })
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username").max(20),
  })

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values, {setErrors}) => {
      const foundUser = userList.find(user => user.username === values);

      const configObj ={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values, null, 2)
      }
      fetch("http://127.0.0.1:5555/", configObj)
      .then(r => {
        if(r.status == 200){
          setRefreshPage(!refreshPage);
        } else {
          const error = r.json()
          setErrors(error.errors)
        }
      })
      .then(userObj => {
        handleUser(userObj)
      })
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{margin:"30px"}}>
        <label htmlFor="username">Username</label>
        <br></br>
        <input
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <p style={{color: "red"}}> {formik.errors.username} </p>
        <button type="submit">Create Username</button>
      </form>
    </div>
  )
}






//     if (!foundUser) {
      // const isUsernameUnique = await checkUsernameUniqueness(values.username);

      // if (!isUsernameUnique) {
      //   formik.setFieldError('username', 'Username must be unique');
      //   return;
      // }

// const checkUsernameUniqueness = async (username) => {
//   try {
//     const response = await fetch(`http://127.0.0.1:5555/check-username/${username}`);
//     const data = await response.json();
//     return data.isUnique;
//   } catch (error) {
//     console.error("Error checking username uniqueness:", error);
//     return false;
//   }
// };

////////////////////


// function CreateNewUser({ handleUser, userList }){
//   const [username, setUsername] = useState("");
//   const [userStatus, setUserStatus] = useState("");

//   function handleSubmit(e){
//     e.preventDefault();
//     const foundUser = userList.find(user => user.username === username);

//     if (!foundUser) {
//       const configObj ={
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ username: username })
//       }
//       fetch("http://127.0.0.1:5555/", configObj)
//       .then(r=>r.json())
//       .then(userObj => {
//         handleUser(userObj);
//       })
//       .catch(error=>{
//         console.error('Error: ', error);
//       })
//     } else {
//       setUserStatus("Already Used")
//     }
//   }

//   return(
//     <div>
//       <h3>Create A New Username:</h3>
//       <h4>(Note: Usernames must be unique and case insensitive)</h4>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={username} placeholder={"Username"} onChange={(e)=> setUsername(e.target.value)}></input>
//         <br></br>
//         <button type="submit">Create Username</button>
//         <h3>{userStatus === "Already Used" ? "This username is already taken. Please create a different username." : ""}</h3>
//       </form>
//     </div>
//   )
// }

// export default CreateNewUser