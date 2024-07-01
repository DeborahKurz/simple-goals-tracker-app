import React, { useState } from "react";

function AddGoal({ userId, handleSetGoal }){
    const [newGoal, setNewGoal] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        const configObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    goal: newGoal,
                    user_id: userId
                }
            )
        }
        const url = `http://localhost:5555/goals/${userId}`
        fetch(url, configObj)
        .then(r=>r.json())
        .then(goalObj => {
            handleSetGoal(goalObj);
            setNewGoal("");
        })
        
    }

    return(
        <div>
            <h3>Add A New Goal</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={newGoal}
                    placeholder = "Set A Measurable Goal"
                    onChange={(e)=> setNewGoal(e.target.value)}
                />
                <br />
                <button type="submit">Add My Goal</button>
                <br></br>
            </form>
        </div>
    )
}

export default AddGoal