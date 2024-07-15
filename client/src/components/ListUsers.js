import React from "react";

function ListUsers({userList}){
    
    return(
        <>
            <h3>Your Team Includes The Following Usernames:</h3>
            <div>
                <ul>
                    {userList?.map((user) => (
                        <div key={user.id}>
                            <li>{user.username}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default ListUsers
