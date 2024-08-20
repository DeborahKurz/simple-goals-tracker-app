import React from "react";
import { useParams } from "react-router-dom";

function UserInfo({userList}){
    const { userId } = useParams()
    const user = userList.find((u) => u.id === parseInt(userId, 10));

    function handleUpdateClick(){
        console.log("handleUpdateClick triggered")
    };

    return(
        <div>
            <h1>Profile: {user.username}</h1>
            <div>
                <h4>Username Updates For: {user.username}</h4>
                <div style={{ display: "flex", alignItems: "center", width: "1000px", height: "60px" }}>
                    <h5>Update Username:</h5>
                    <input placeholder="New Username..."></input>
                    <button onClick={handleUpdateClick()}>Edit</button>
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