import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {NavLink } from "react-router-dom/cjs/react-router-dom.min";
import LoginRoute from "./LoginRoute.js";
import GoalsRoute from "./GoalsRoute.js";
import TasksRoute from "./TasksRoute.js";
// import { useFormik } from "formik";
// import * as yup from "yup";


function App() {
  //Create basic styling
  return (
    <div>
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
    </div>
  )
}

export default App;