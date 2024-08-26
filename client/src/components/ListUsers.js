import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Button, Typography } from '@mui/material';

function ListUsers(){
    const navigate = useNavigate();
    const { userList } = useContext(Context);

    function handleProfileClick(userId){
        navigate(`/user/${userId}`);
    };
    
    return(
        <Box>
            <h3 style={{textAlign:'center'}}>Your Team Includes The Following Usernames:</h3>
            <Box sx={{ paddingRight:'80px' }}>
                {/* <ul> */}
                    {userList?.map((user) => (
                        <Box key={user.id} sx={{display:'flex', flexDirection:'row', padding:'5px'}}>
                            <Typography sx={{ flex: 1, textAlign:'center '}}>{user.username}</Typography>
                            <Button variant='contained'  sx={{ width:'150px'}} onClick={()=> handleProfileClick(user.id)}>Edit Profile</Button>
                        </Box>
                    ))}
                {/* </ul> */}
            </Box>
        </Box>
    )
};

export default ListUsers
