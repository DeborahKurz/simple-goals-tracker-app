import React, { useState } from "react";
import { useParams } from "react-router-dom";

function UserInfo({ userList, handleUpdatedUser}){
    const [newUsername, setNewUsername] = useState("");

    const { userId } = useParams()
    const user = userList.find((u) => u.id === parseInt(userId, 10));

    function handleUpdateClick(){
        const url = `http://localhost:5555/${user.id}`

        const configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    username: newUsername
                }
            )
        };

        fetch(url, configObj)
        .then(r=>r.json())
        .then(userObj=>{
            handleUpdatedUser(userObj)
            setNewUsername("")
        })
    };

    // function handleDeleteClick(){
    //     const url = 
    // }

    return(
        <div>
            <h1>Profile: {user.username}</h1>
            <div>
                <h4>Username Updates For: {user.username}</h4>
                <div style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                    <h5>Update Username:</h5>
                    <input placeholder="New Username..." value = {newUsername} onChange={(e) => setNewUsername(e.target.value)}></input>
                    <button onClick={handleUpdateClick}>Edit</button>
                </div>
                <div style={{ color:"red", display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                    <h5>Delete Username:</h5>
                    <h5>Delete this user, their tasks, and subtasks. </h5>
                    <h4>This is a permanent action and cannot be undone. </h4>
                    <button onClick={handleUpdateClick}>Confirm: Delete User</button>
                </div>
            </div>
            <div>
                <h4>{user.username}'s Completed Tasks:</h4>
                <div>
                    <h1> Add completed tasks here </h1>
                    <h2> Add completed subtasks here </h2>
                </div>
            </div>
        </div>
    )
};

export default UserInfo