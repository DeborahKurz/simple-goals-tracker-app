import React, { useContext } from "react";
import { Context } from "./App.js";

import { Box, Paper, Typography } from "@mui/material";

import ListUsers from "./ListUsers.js";
import CreateNewUser from "./CreateNewUser.js";

function WelcomePage(){
    const { userList } = useContext(Context);

    return (
        <Box sx={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            gap: "40px"
            }}>
            <Box sx={{flex: 1, marginTop:3, marginRight:5 }}>
                <h1>Welcome</h1>
                <h3>Instructions:</h3>
                <h4>Get started by creating a username (each username needs to be unique).</h4>
                <h4>Then navigate to the "Goals View" using the navigation bar above. Here you will be able to see all the goals you and your team are working towards, and you can create new goals and tasks.</h4> 
                <h4>You can also navigate to "Team View" using the navigation bar above. There you will find each user listed in alphabetical order with the tasks they are in charge of (for easy viewing).</h4> 
                <h4>If you ever need to create a new user, or see who is already 'registered' as a user in your team, you can navigate back to this page by selecting "Home" in the navbar.</h4>
                <h4>Happy Goal Crushing!</h4>
            </Box> 
            <Box sx={{flex: 1, marginTop: 2,}}>
                <Paper sx={{ paddingLeft:'15px', paddingBottom: '5px', paddingTop: '1px', bgcolor:'#141414', color:'white' }}>
                    <ListUsers />
                </Paper>
                <Paper sx={{ paddingLeft:'5px', paddingBottom: '3px', paddingTop: '1px', marginTop:'10px', bgcolor:'#141414', color:'white' }}>
                    <CreateNewUser />
                </Paper> 
            </Box>  
        </Box>
    )
};

export default WelcomePage