import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";


function App() {
  //Create basic styling
  return (
    <div>
      <h1>Simple Goals Tracker</h1>
      <br></br>
      <ExistingUserLogin />
      <CreateNewUser />
      <br></br>
      <br></br>
      <SignOut />
      <br></br>
      <GoalsHeader />
      <DisplayGoals />
      <AddGoal />
      <br></br>
      <br></br>
      <TaskHeader />
      <DisplayTasks />
      <AddTask />
      <CompleteTask />
      <DeleteTask />
    </div>
  )
}

// >>>>>>>> '/' route
function ExistingUserLogin(){
//For users who already have an account
//GET reuqest
  return (
    <div>
      <h2>Returning User Login:</h2>
      <h4>Type Your Username in the form below to create and access your goals.</h4>
      <form>
        <input type="text" placeholder={"Username"}></input>
        <br></br>
        <button>Log In</button>
        <br></br>
      </form>
    </div>
  )
}

function CreateNewUser(){
//POST request
  return(
    <div>
      <h2>Create An Account:</h2>
      <h4>Create a Username to save your goals. (Usernames must be unique).</h4>
        <form>
          <input type="text" placeholder={"Username"}></input>
          <br></br>
          <button>Create Username</button>
          <br></br>
        </form>
    </div>
  )
}

export default App;


// >>>>>>>> '/goals/id' & '/tasks/id' route headers
function SignOut(){
  return(
    <div>
      <button>Sign Out</button>
    </div>
  )
}


// >>>>>>>> '/goals/id' route
function GoalsHeader(){
//Hand user's name and interpolate h1
  return (
    <div>
      <h1>Your Goals:</h1>
    </div>
  )
}

function DisplayGoals(){
//GET request with user id
  return(
    <div>
      <h2>Click on a goal to see it's tasks.</h2>
      <h4>Inside DisplayGoals()</h4>
    </div>
  )
}

function AddGoal(){
//POST request with user id
  return(
    <div>
      <h2>Add A New Goal</h2>
      <form>
          <input type="text" placeholder={"Set A Measurable Goal"}></input>
          <br></br>
          <button>Add My Goal</button>
          <br></br>
        </form>
    </div>
  )
}


// >>>>>>>> '/tasks/id' route
function TaskHeader(){
//Hand goal's name and interpolate h1
  return(
    <div>
      <h1>Your Tasks:</h1>
    </div>
  )
}
function DisplayTasks(){
  //GET request using the goal's id
  return(
    <div>
      <h4>Inside DisplayTasks()</h4>
    </div>
  )
}

function AddTask(){
  //POST request
  return(
    <div>
      <h2>Add A New Task</h2>
      <form>
          <input type="text" placeholder={"The Next Task To Do"}></input>
          <br></br>
          <button>Add My Task</button>
          <br></br>
        </form>
    </div>
  )
}

function CompleteTask(){
//PATCH request using the task's id
  return(
    <div>
      <button>Task Complete!</button>
    </div>
  )
}

function DeleteTask(){
//Delete request using the task's id
  return(
    <div>
      <button>Delete Task</button>
    </div>
  )
}

