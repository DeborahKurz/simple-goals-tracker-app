import { useRouteError } from "react-router-dom";

import NavBar from "./NavBar.js";

function ErrorPage(){
    const error = useRouteError();
    console.log(error);
    
    return(
        <div>
            <NavBar />
            <div className="App">
                <h1>Sorry, something went wrong!</h1>
                <h2>Please navigate to a different page.</h2>
            </div>
        </div>
    )
};

export default ErrorPage;