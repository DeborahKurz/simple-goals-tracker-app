import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <>
            <nav>
                <NavLink
                    to="/"
                >  Home  </NavLink>
                <NavLink
                    to="/goals"
                >  Goals View  </NavLink>
                <NavLink
                    to="/team"
                >  Team View  </NavLink>
            </nav>
        </>
    )
}

export default NavBar