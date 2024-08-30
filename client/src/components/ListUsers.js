import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App.js";

import { Box, Button, Paper, Typography } from '@mui/material';
import bgImg from '../images/backgroundimg.png';

function ListUsers(){
    const navigate = useNavigate();
    const { userList } = useContext(Context);

    function handleProfileClick(userId){
        navigate(`/users/${userId}`);
    };
    
    return(
        <Box>
            <Typography sx={{ 
                fontSize:'20px', 
                fontWeight:'bold', 
                textAlign:'center', 
                margin:3 
            }}>Usernames In Your Team:</Typography>
            <Box sx={{marginRight:2}}>
                {userList?.map((user) => (
                    <Paper key={user.id} sx={{ 
                        display:'flex', 
                        flexDirection:'row', 
                        padding:'5px', 
                        margin:1, 
                        backgroundImage: `url(${bgImg})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        alignItems:'center'
                        }}>
                        <Typography sx={{ flex: 2, textAlign:'center ', fontSize:'18px', fontWeight:'bold', color:'white' }}>{user.username}</Typography>
                        <Button 
                            variant='contained' 
                            sx={{ 
                                flex: 1, 
                                width:'150px', 
                                bgcolor:'#277dfe', 
                                marginRight:3,
                                whiteSpace: 'nowrap'
                            }} 
                            onClick={()=> handleProfileClick(user.id)}>Edit Profile</Button>
                    </Paper>
                ))}
            </Box>
        </Box>
    )
};

export default ListUsers
