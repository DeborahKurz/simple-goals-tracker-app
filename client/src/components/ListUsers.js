import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App.js";

function ListUsers(){
    const navigate = useNavigate();
    const { userList } = useContext(Context);

    function handleProfileClick(userId){
        navigate(`/user/${userId}`);
    };
    
    return(
        <>
            <h3>Your Team Includes The Following Usernames:</h3>
            <div>
                <ul>
                    {userList?.map((user) => (
                        <div key={user.id} >
                            <li>{user.username}</li>
                            <button style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }} onClick={()=> handleProfileClick(user.id)}>Edit Profile</button>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default ListUsers
