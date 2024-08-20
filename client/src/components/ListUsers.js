import React from "react";
import { useNavigate } from "react-router-dom";

function ListUsers({userList}){
    const navigate = useNavigate();

    function handleProfileClick(){
        navigate("/user");
    };
    
    return(
        <>
            <h3>Your Team Includes The Following Usernames:</h3>
            <div>
                <ul>
                    {userList?.map((user) => (
                        <div key={user.id} >
                            <li>{user.username}</li>
                            <button style={{ width: "150px", height: "54px", background: "white", marginRight: "10px" }} onClick={()=> handleProfileClick()}>Edit Profile</button>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default ListUsers
