import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage(){
    const navigate = useNavigate()

    function handleReturningUser(){
        navigate("/login");
    }
    function handleNewUser(){
        navigate("/new");
    }

    return(
        <>    
            <h1>Welcome to your simple goals tracker app.</h1>    
            <h1> Ready to sign in? </h1>
            <button type="submit" onClick={handleReturningUser}>Returning User Login</button>
            <button type="submit" onClick={handleNewUser}>Create A New Account</button>
        </>
    )
}

export default WelcomePage