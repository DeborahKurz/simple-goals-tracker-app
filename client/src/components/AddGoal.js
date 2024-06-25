import React from "react";

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

export default AddGoal