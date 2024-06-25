import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import {NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import { useFormik } from "formik";
// import * as yup from "yup";

import { Outlet } from "react-router-dom"


function App() {
  const [user, setUser] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/")
    .then(r=>r.json())
    .then(user => setUser(user))
    .catch((error) => console.error(error));
  }, [])


  return (
    <div>
      <h1>Hello</h1>
      <Outlet />
    </div>
  )
}

export default App;





      {/* <header>
        <NavBar />
        <nav>
          <ul>
            <li><NavLink to="/">Login</NavLink></li>
            <li><NavLink to="/goals/id">Goals</NavLink></li>
            <li><NavLink to="/tasks/id">Tasks</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Router>
          <Route path="/" element={<LoginRoute />}></Route>
          <Route path="/goals/:id/*" element={<GoalsRoute />}></Route>
          <Route path="/tasks/:id/*" element={<TasksRoute />}></Route>
        </Router>
      </main> */}