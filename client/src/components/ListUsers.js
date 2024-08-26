import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Button, Paper, Typography } from '@mui/material';

function ListUsers(){
    const navigate = useNavigate();
    const { userList } = useContext(Context);

    function handleProfileClick(userId){
        navigate(`/user/${userId}`);
    };
    
    return(
        <Box>
            <Typography sx={{ fontWeight:'bold', textAlign:'center', margin:3 }}>Your Team Includes The Following Usernames:</Typography>
            <Box>
                    {userList?.map((user) => (
                        <Paper key={user.id} sx={{ bgcolor:'#212121', display:'flex', flexDirection:'row', padding:'5px', margin:1}}>
                            <Typography sx={{ flex: 2, textAlign:'center ', fontSize:'15px', fontWeight:'bold', color:'white' }}>{user.username}</Typography>
                            <Button variant='contained'  sx={{ flex: 1, width:'150px', bgcolor:'#141414'}} onClick={()=> handleProfileClick(user.id)}>Edit Profile</Button>
                        </Paper>
                    ))}
            </Box>
        </Box>
    )
};

export default ListUsers
