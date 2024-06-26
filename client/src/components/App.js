import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import {NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import { useFormik } from "formik";
// import * as yup from "yup";

// import { Outlet } from "react-router-dom"
import ExistingUserLogin from "./ExistingUserLogin.js";
import CreateNewUser from "./CreateNewUser";
import GoalsRoute from "./GoalsRoute.js";
import WelcomePage from "./WelcomePage.js";
import SignOut from "./SignOut.js";
import ErrorPage from "./ErrorPage.js";

function App() {
  const [user, setUser] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/")
    .then(r=>r.json())
    .then(user => setUser(user))
    .catch((error) => console.error(error));
  }, [])

  const handleUser = (user) => {
    setUser(user);
  }


  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage /> } /> 
        <Route path="/login" element={<ExistingUserLogin handleUser={handleUser} user={user} />} /> 
        <Route path="/new" element={<CreateNewUser handleUser={handleUser} />} /> 
        <Route path="/goals" element={<GoalsRoute user={user}/>} />
        <Route path="/goals" element={<SignOut handleUser={handleUser} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;