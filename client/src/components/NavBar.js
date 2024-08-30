import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "./App.js";

import { AppBar, Toolbar, Avatar, Box, Button, Typography } from '@mui/material';
import logo from '../images/logo.png';

import CompletedCount from "./CompletedCount.js";

function NavBar(){
    const { userList } = useContext(Context);

    return(
        <AppBar sx={{ bgcolor: "black", display:'flex', flexDirection: 'row', height:'80px' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', width: '100vw' }}>
                <Avatar atl="Simple Tracker App Logo Art" src={logo}></Avatar>
                <Button sx={{color:"white", width:'150px', '&:hover':{bgcolor:'#343434'}}} component={NavLink} to="/">Home</Button>
                <Typography></Typography>
                <Button sx={{color:"white", width:'150px', '&:hover':{bgcolor:'#343434'}}} component={NavLink} to="/goals">Goals</Button>
                <Button sx={{color:"white", width:'150px', '&:hover':{bgcolor:'#343434'}}} component={NavLink} to="/users">Team View</Button>
                {userList.length === 0 ? (
                    <div>
                        <Box sx={{ marginLeft: 'auto', textAlign:'center' }}>
                        <CompletedCount />
                        <h3> Please add a new user to get started. </h3>
                        </Box>
                    </div>
                ) : (
                    <Box sx={{ marginLeft: 'auto', textAlign:'center' }}>
                        <CompletedCount />
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default NavBar