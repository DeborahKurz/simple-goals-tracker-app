import { NavLink } from "react-router-dom";

import { AppBar, Toolbar, Avatar, Button, Typography } from '@mui/material';
import logo from '../images/logo.png';

function NavBar(){
    return(
        <AppBar sx={{ bgcolor: "black" }}>
            <Toolbar>
                <Avatar atl="Simple Tracker App Logo Art" src={logo}></Avatar>
                <Button sx={{color:"white", width:'100px', '&:hover':{bgcolor:'#343434'}}} component={NavLink} to="/">Home</Button>
                <Typography></Typography>
                <Button sx={{color:"white", width:'100px', '&:hover':{bgcolor:'#343434'}}} component={NavLink} to="/goals">Goals</Button>
                <Button sx={{color:"white", width:'100px', '&:hover':{bgcolor:'#343434'}}} component={NavLink} to="/team">Team View</Button>
            </Toolbar>
        </AppBar>
    )
};

export default NavBar


            // <nav>
            //     <NavLink
            //         to="/"
            //         style={{ color: "black", textDecoration: "none", padding: "15px 25px", marginRight: "15", background: "#BEBEBE",}}
            //     >  Home  </NavLink>
            //     <NavLink
            //         to="/goals"
            //         style={{ color: "black", textDecoration: "none",padding: "15px 25px", marginRight: "15", background: "#BEBEBE",}}
                // >  Goals View  </NavLink>
            //     <NavLink
            //         to="/team"
            //         style={{ color: "black", textDecoration: "none",padding: "15px 25px", marginRight: "15", background: "#BEBEBE",}}
            //     >  Team View  </NavLink>
            // </nav>